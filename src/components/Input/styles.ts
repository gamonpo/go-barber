import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import color from '../../style/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  padding: 0 16px;
  background: ${color.color_five};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: ${color.color_five};

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${color.color_error};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${color.color_three};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 14px;
  font-family: 'Roboto-Regular';
`;

export const Icon = styled(FeatherIcon)<ContainerProps>`
  margin-right: 14px;

  color: ${props =>
    props.isFocused || props.isFilled ? color.color_three : color.color_two};
`;
