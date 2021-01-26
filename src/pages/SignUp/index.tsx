import React, { useRef } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Logo,
  BackToSignIn,
  BackToSignInText,
  Icon,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Logo />

          <Form
            ref={formRef}
            onSubmit={data => {
              console.log(data);
            }}
          >
            <Input name="name" icon="user" placeholder="Name" />
            <Input name="email" icon="mail" placeholder="Email" />
            <Input name="password" icon="lock" placeholder="Password" />

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
