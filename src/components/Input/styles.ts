import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import color from '../../style/colors';

export const Container = styled.View`
  width: 100%;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 14px;
  font-family: 'Roboto-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 14px;
  color: ${color.color_two};
`;
