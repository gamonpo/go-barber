import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

import colors from '../../style/colors';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  /* padding-top: ${getStatusBarHeight() + 24}px; */
  background: ${colors.color_header};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${colors.color_one};
  font-size: 20px;
  font-family: 'Roboto-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: ${colors.color_three};
  font-family: 'Roboto-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background: ${colors.color_card};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
`;

export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${colors.color_one};
  font-family: 'Roboto-Medium';
`;

export const ProviderAvatar = styled.Image`
  width: ${`${width * 0.17}px`};
  height: ${`${height * 0.1}px`};
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
`;

export const ProviderName = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  margin-left: 10px;
  color: ${colors.color_one};
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 10px;
`;
export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: ${colors.color_seven};
  font-family: 'Roboto-Regular';
`;
