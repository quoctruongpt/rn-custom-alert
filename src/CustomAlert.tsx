import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EActionType, type ICustomAlertProps } from './types';
import { useCallback, useEffect, useRef } from 'react';

export function CustomAlert(props: ICustomAlertProps) {
  const {
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
  } = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide(id);
    });
  };

  const renderIcon = useCallback(() => {
    if (iconComponent) {
      return iconComponent;
    }
    if (icon) {
      return <Image source={icon.source} style={icon.style} />;
    }
    return null;
  }, [icon, iconComponent]);

  useEffect(() => {
    fadeIn();
  }, [id]);

  return (
    <View style={styles.overlay}>
      <Animated.View style={{ transform: [{ scale: fadeAnim }] }}>
        {AlertComponent ? (
          AlertComponent(props)
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
                    hideWhenAction && fadeOut();
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
      </Animated.View>
    </View>
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
