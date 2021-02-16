import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

import colors from '../../style/colors';

const { height, width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${colors.color_four};
  padding: 0 30px ${Platform.OS === 'android' ? `${height * 0.16}` : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 15px;
  color: ${colors.color_one};
  font-family: 'Roboto-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: ${`${width * 0.5}px`};
  height: ${`${height * 0.3}px`};
  border-radius: 98px;

  align-self: center;
`;
