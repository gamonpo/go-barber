import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import enUs from 'date-fns/locale/en-US';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    // return format(
    //   routeParams.date,
    //   "EEEE', dia ' dd ' de ' yyyy 'às' HH:mm'h'",
    //   { locale: ptBr },
    // );

    return format(routeParams.date, "MMMM dd, yyyy 'at 'p", {
      locale: enUs,
    });
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d461" />

      <Title>Appointment Created</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
