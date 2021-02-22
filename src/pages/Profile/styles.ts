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

export const UserModal = styled.Modal``;

export const UserModalView = styled.View`
  margin: 0 20px;
  background-color: rgba(62, 59, 71, 1);
  top: ${`${height * 0.2}px`};

  justify-content: center;
  align-items: center;
`;
export const UserModalButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.color_three};
  height: 20%;
  width: 60%;
  margin: 10px;
`;
export const UserModalText = styled.Text`
  font-size: 20px;
  color: ${colors.color_one};
  font-family: 'Roboto-Medium';
`;
