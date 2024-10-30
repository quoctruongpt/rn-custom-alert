import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { EActionType, type IAlertState } from './types';
import { useCallback } from 'react';

interface ICustomAlertProps extends IAlertState {
  onHide: (id: number) => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonCancelStyle?: StyleProp<ViewStyle>;
  textButtonCancelStyle?: StyleProp<TextStyle>;
  buttonConfirmStyle?: StyleProp<ViewStyle>;
  textButtonConfirmStyle?: StyleProp<TextStyle>;
  AlertComponent?: React.ReactNode;
}

export function CustomAlert({
  title,
  message,
  actions,
  onHide,
  hideWhenAction = true,
  id,
  style,
  titleStyle,
  messageStyle,
  buttonCancelStyle,
  textButtonCancelStyle,
  icon,
  iconComponent,
  buttonContainerStyle,
  buttonConfirmStyle,
  textButtonConfirmStyle,
  AlertComponent,
}: ICustomAlertProps) {
  const renderIcon = useCallback(() => {
    if (iconComponent) {
      return iconComponent;
    }
    if (icon) {
      return <Image source={icon.source} style={icon.style} />;
    }
    return null;
  }, [icon, iconComponent]);

  return (
    <Modal transparent visible={true} animationType="slide">
      <View style={styles.overlay}>
        {AlertComponent ? (
          AlertComponent
        ) : (
          <View style={[styles.alertBox, style]}>
            {renderIcon()}
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <Text style={[styles.message, messageStyle]}>{message}</Text>
            <View style={[styles.buttonContainer, buttonContainerStyle]}>
              {actions?.map(({ label, onPress, type }, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    type === EActionType.CANCEL ? buttonCancelStyle : null,
                    type === EActionType.CONFIRM ? buttonConfirmStyle : null,
                  ]}
                  onPress={() => {
                    onPress?.();
                    hideWhenAction && onHide(id);
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      type === EActionType.CANCEL
                        ? textButtonCancelStyle
                        : null,
                      type === EActionType.CONFIRM
                        ? textButtonConfirmStyle
                        : null,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    minWidth: '40%',
    maxWidth: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
