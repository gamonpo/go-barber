import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../style/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${colors.color_one};
  font-family: 'Roboto-Medium';
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: ${colors.color_seven};
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  background: ${colors.color_three};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 24px;
`;
export const OkButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  color: ${colors.color_four};
  font-size: 18px;
`;
