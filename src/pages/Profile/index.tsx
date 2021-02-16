import React, { useRef, useCallback, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  View,
} from 'react-native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import * as ImagePicker from 'react-native-image-picker/src';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles';
import { useAuth } from '../../hooks/auth';
import colors from '../../style/colors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface RouteParams {
  avatar: string;
}

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [photo, setPhoto] = useState(routeParams.avatar);

  // const { user, updateUser } = useAuth()
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string()
          .required('Email required')
          .email('Type a valid email'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Field required'),
          })
          .oneOf([Yup.ref('password'), null], 'Incorrect confirmation')
          .min(6, 'Minimum 6 characters')
          .required('Password required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // const {
      //   name,
      //   email,
      //   old_password,
      //   password,
      //   password_confirmation,
      // } = data;

      // const formData = {
      //   name,
      //   email,
      //   ...(old_password
      //     ? {
      //         old_password,
      //         password,
      //         password_confirmation,
      //       }
      //     : {}),
      // };

      // const response = await api.put('profile', formData);

      // updateUser(response.data);

      Alert.alert('Profile updated with sucess');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Unable to update',
        'An error occurred while updating the profile',
      );
    }
  }, []);

  const handleUpdateAvatar = useCallback(() => {
    // ImagePicker.launchCamera(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     maxHeight: 500,
    //     maxWidth: 500,
    //   },
    //   response => {
    //     console.log('entrou');
    //     if (response.didCancel) {
    //       return;
    //     }
    //     if (response.errorCode) {
    //       Alert.alert('Update error');
    //     }

    //     console.log(response.uri);

    //     setPhoto(response.uri);

    //     // const data = new FormData();

    //     // data.append('avatar', {
    //     //   type: 'image/jpg',
    //     //   name: `${user.id}.jpg`,
    //     //   uri: response.uri,
    //     // });

    //     // ***API***
    //     // api.patch('users/avatar', data).then((apiResponse) => {
    //     //   updateUser(apiResponse.data);
    //     // })
    //   },
    // );

    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
      },
      response => {
        console.log('entrou');
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          Alert.alert('Update error');
        }

        console.log(response.uri);

        setPhoto(response.uri);

        // const data = new FormData();

        // data.append('avatar', {
        //   type: 'image/jpg',
        //   name: `${user.id}.jpg`,
        //   uri: response.uri,
        // });

        // ***API***
        // api.patch('users/avatar', data).then((apiResponse) => {
        //   updateUser(apiResponse.data);
        // })
      },
    );
  }, []); // ***API***updateUser, user.id

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color={colors.color_seven} />
          </BackButton>

          <UserAvatarButton onPress={handleUpdateAvatar}>
            <UserAvatar source={{ uri: photo }} />
          </UserAvatarButton>

          <View>
            <Title>My profile</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            {/* initialData={user} */}
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Name"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordInputRef.current?.focus();
              }}
            />
            <Input
              ref={oldPasswordInputRef}
              name="old_password"
              icon="lock"
              placeholder="Current Password"
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="next"
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Password"
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordInputRef.current?.focus();
              }}
            />
            <Input
              ref={confirmPasswordInputRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirm Password"
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Save changes
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
