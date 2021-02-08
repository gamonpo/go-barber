import React, { useCallback, useRef } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

// import { useAuth } from '../../hooks/auth'; ***API***

import getValidationErrors from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Logo,
  CreateAccount,
  CreateAccountText,
  ForgotPassword,
  ForgotPasswordText,
  Icon,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  // const { signIn } = useAuth() ***API***

  const handleSign = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email required')
          .email('Type a valid email'),
        password: Yup.string().required('Password required'),
      });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      navigation.navigate('Dashboard');

      // await signIn({         ***API***
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
  }, []); // [signIn] ***API***

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Logo />

          <Form ref={formRef} onSubmit={handleSign}>
            <Input
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
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Enter
            </Button>
          </Form>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Forgot password?</ForgotPasswordText>
          </ForgotPassword>

          <CreateAccount onPress={() => navigation.navigate('SignUp')}>
            <Icon name="log-in" size={20} />
            <CreateAccountText>Create Account</CreateAccountText>
          </CreateAccount>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
