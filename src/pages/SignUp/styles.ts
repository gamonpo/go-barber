import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform, Dimensions } from 'react-native';
import logo from '../../assets/Logo.png';

import colors from '../../style/colors';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.color_four};
  padding: 0 30px ${Platform.OS === 'android' ? `${height * 0.16}` : 40}px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  margin: 50px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  color: ${colors.color_six};
  border-top-width: 1px;
  border-color: ${colors.color_five};
  padding: 16px 0 ${16 + getBottomSpace()}px;

  background-color: ${colors.color_four};
  align-items: center;
  justify-content: center;
  flex-direction: row;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BackToSignInText = styled.Text`
  color: ${colors.color_three};
  font-size: 13px;
  font-family: 'Roboto-Regular';
  margin-left: 10px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
  color: ${colors.color_six};
`;
