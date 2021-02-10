import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

// import { useAuth } from '../../hooks/auth'; ***API***

import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
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

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  // const { user } = useAuth(); ***API***
  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([
    {
      hour: 8,
      available: true,
    },
    {
      hour: 9,
      available: true,
    },
    {
      hour: 10,
      available: true,
    },
    {
      hour: 11,
      available: true,
    },
    {
      hour: 12,
      available: false,
    },
    {
      hour: 13,
      available: true,
    },
    {
      hour: 14,
      available: true,
    },
    {
      hour: 15,
      available: true,
    },
  ]);
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
  const [selectedHour, setSelectedHour] = useState(0);
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

  // useEffect(() => {
  //   api
  //     .get(`providers/${selectedProvider}/day-availability`, {
  //       params: {
  //         year: selectedDate.getFullYear(),
  //         month: selectedDate.getMonth() + 1,
  //         day: selectedDate.getDate(),
  //       },
  //     })
  //     .then(response => {
  //       setAvailability(response.data);
  //     });
  // }, [setSelectedDate, selectedProvider]);

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

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(() => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      // await api.post('appointments', {
      //   provider_id: selectedProvider,
      //   date,
      // })

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert('Error', 'The appointment could not be created, try again');
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Hairdressers</HeaderTitle>

        <UserAvatar source={img} />
      </Header>

      <Content>
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
            <OpenDatePickerButtonText>
              Select other date
            </OpenDatePickerButtonText>
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

        <Schedule>
          <Title>Choose a time</Title>

          <Section>
            <SectionTitle>Morning</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Afternoon</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, hour, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    available={available}
                    key={hourFormatted}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>
            Confirm appointment
          </CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
