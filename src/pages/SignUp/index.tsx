import React, { useRef, useCallback } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Logo,
  BackToSignIn,
  BackToSignInText,
  Icon,
} from './styles';

interface SignUpForData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpForData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string()
          .required('Email required')
          .email('Type a valid email'),
        password: Yup.string()
          .min(6, 'Minimum 6 characters')
          .required('Password required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({
      //   email: data.email,
      //   password: data.password,
      // });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        const message = Object.entries(errors);

        Alert.alert(`Error!`, `${message[0][1]}`);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Authentication Error',
        'An authentication error has ocurred.',
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Logo />

          <Form ref={formRef} onSubmit={handleSignUp}>
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
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Confirm
            </Button>
          </Form>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} />
            <BackToSignInText>Back to Login</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
