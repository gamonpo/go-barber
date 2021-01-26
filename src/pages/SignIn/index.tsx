import React, { useCallback, useRef } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
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

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSign = useCallback(data => {
    console.log(data);
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

          <Form ref={formRef} onSubmit={handleSign}>
            <Input
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="Email"
            />
            <Input name="password" icon="lock" placeholder="Password" />

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
