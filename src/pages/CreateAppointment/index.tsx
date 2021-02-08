import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

// import { useAuth } from '../../hooks/auth'; ***API***

import { Platform } from 'react-native';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

import img from '../../assets/Logo.png';
import api from '../../services/api';

// import { useAuth } from './hooks/auth'; ***API***

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
}

const CreateAppointment: React.FC = () => {
  // const { user } = useAuth(); ***API***
  const route = useRoute();
  const { goBack } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: '1',
      name: 'Santino Pereira',
    },
    {
      id: '2',
      name: 'Marquinho da Silva',
    },
    {
      id: '3',
      name: 'Paulinho Cabral',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  // useEffect(() => {
  //   api.get('providers').then((response) => {
  //     setProviders(response.data);
  //   })
  // })

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Hairdressers</HeaderTitle>

        <UserAvatar source={img} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={img} />

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Choose a day</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>Select other date</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            onChange={handleDateChanged}
            display="calendar"
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
