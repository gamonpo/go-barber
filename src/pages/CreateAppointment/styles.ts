import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';
import colors from '../../style/colors';

const { height } = Dimensions.get('window');

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  available: boolean;
}

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

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: ${colors.color_one};
  font-family: 'Roboto-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${props =>
    props.selected ? colors.color_three : colors.color_card};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;
export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'Roboto-Medium';
  /* font-size: 16px; */
  color: ${props => (props.selected ? colors.color_five : colors.color_one)};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'Roboto-Medium';
  color: ${colors.color_one};
  font-size: 15px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: ${`${height * 0.08}px`};
  background: ${colors.color_three};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 15px;
  color: ${colors.color_five};
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;
export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: ${colors.color_seven};
  font-family: 'Roboto-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${props =>
    props.selected ? colors.color_three : colors.color_card};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;
export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? colors.color_five : colors.color_one)};
  font-family: 'Roboto-Regular';
  /* font-size: 16px; */
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: ${`${height * 0.08}px`};
  background: ${colors.color_three};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 15px;
  color: ${colors.color_five};
`;
