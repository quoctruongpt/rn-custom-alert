import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

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
}
