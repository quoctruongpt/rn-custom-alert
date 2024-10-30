import type {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export enum EActionType {
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
}

type TAction = {
  label: string;
  onPress?: () => void;
  type?: EActionType;
};

type TIcon = {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
};

export interface IAlert {
  title?: string;
  message?: string;
  actions?: TAction[];
  hideWhenAction?: boolean;
  icon?: TIcon;
  iconComponent?: React.ReactNode;
}

export interface IAlertState extends IAlert {
  id: number;
}

export interface IAlertContext {
  show: (alert: IAlert) => void;
  hide: (id: number) => void;
  update: (id: number, alert: IAlert) => void;
}

export interface ICustomAlert {
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonCancelStyle?: StyleProp<ViewStyle>;
  textButtonCancelStyle?: StyleProp<TextStyle>;
  buttonConfirmStyle?: StyleProp<ViewStyle>;
  textButtonConfirmStyle?: StyleProp<TextStyle>;
  AlertComponent?: (props: ICustomAlertProps) => React.ReactNode;
}

export interface ICustomAlertProps extends IAlertState, ICustomAlert {
  onHide: (id: number) => void;
}
