import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../../style/colors';

import img from '../../assets/Logo.png';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  // const { signOut } = useAuth;

  // return (
  //   <View>
  //     <Button title="Sair" onPress={signOut} />
  //   </View>
  // );

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: '1',
      name: 'Santino Pereira',
      avatar_url: `${img}`,
    },
    {
      id: '2',
      name: 'Marquinho da Silva',
      avatar_url: `${img}`,
    },
    {
      id: '3',
      name: 'Paulinho Cabral',
      avatar_url: `${img}`,
    },
  ]);

  const { navigate } = useNavigation();

  // useEffect(() => {
  //   api.get('providers').then(response => {
  //     setProviders(response.data)
  //   })
  // },[])

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Welcome,
          {'\n'}
          <UserName>Gabriel</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={img} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Hairdressers</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={provider.avatar_url} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color={colors.color_three} />
                <ProviderMetaText>Monday to friday</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color={colors.color_three} />
                <ProviderMetaText>8 am to 18 pm</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
