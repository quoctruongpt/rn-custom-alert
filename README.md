# rn-custom-alert

Custom alert

## Installation

```sh
npm install @quoctruongpt/rn-custom-alert
# or
yarn add @quoctruongpt/rn-custom-alert
```

## Usage

1. Initialize `CustomAlertProvider`
   Add `CustomAlertProvider` to the root component to provider context for ther entire application:

```typescript
import { CustomAlertProvider } from '@quoctruongpt/rn-custom-alert';

export default function App() {
  return (
    <CustomAlertProvider>
      {/* Child components */}
    </CustomAlertProvider>
  );
}
```

2. Display an Alert
   Use useCustomAlert to call alerts from any component:

```typescript
import { useCustomAlert } from 'rn-custom-alert';

function ExampleComponent() {
  const alert = useCustomAlert();

  const showAlert = () => {
    alert.show({
      title: 'Notice',
      message: 'This is a custom alert.',
      actions: [
        { label: 'OK', onPress: () => console.log('OK selected') },
        { label: 'Cancel', onPress: () => console.log('Cancel selected') },
      ],
    });
  };

  return (
    <TouchableOpacity onPress={showAlert}>
      <Text>Show Alert</Text>
    </TouchableOpacity>
  );
}
```

## Configuration and Options

Here is a list of properties to customize:

1. Props for `CustomAlertProvider`:

| Property               | Require | Type                                          | Description                                                                                                                                                         |
| ---------------------- | ------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| style                  | false   | ViewStyle                                     | Custom styles for the main alert container. You can use this prop to modify the overall appearance of the alert, including padding, margins, and background color.  |
| titleStyle             | false   | TextStyle                                     | Custom styles for the title text of the alert. Use this prop to adjust font size, color, font weight, and other text properties specific to the title.              |
| messageStyle           | false   | TextStyle                                     | Custom styles for the message text of the alert. Similar to `titleStyle`, this allows you to style the message text, including its font characteristics and color.  |
| buttonContainerStyle   | false   | ViewStyle                                     | Styles for the container that holds the action buttons of the alert. You can customize the layout, spacing, and alignment of the buttons with this prop.            |
| buttonCancelStyle      | false   | ViewStyle                                     | Styles specifically for the cancel button. Use this to define unique styles such as background color, border radius, and padding for the cancel button.             |
| textButtonCancelStyle  | false   | TextStyle                                     | Custom styles for the text of the cancel button. This allows you to set specific text properties like font size, color, and weight for the button's label.          |
| buttonConfirmStyle     | false   | ViewStyle                                     | Styles specifically for the confirm button. Similar to buttonCancelStyle, this prop lets you customize the confirm button's appearance, such as colors and spacing. |
| textButtonConfirmStyle | false   | TextStyle                                     | Custom styles for the text of the confirm button. Use this to adjust font size, color, and weight for the confirm button's label.                                   |
| AlertComponent         | false   | (props: ICustomAlertProps) => React.ReactNode | A custom alert component that can be provided to override the default alert UI.                                                                                     |

**Structure of** actions

```typescript
  id: number;
  onHide: (id: number) => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonCancelStyle?: StyleProp<ViewStyle>;
  textButtonCancelStyle?: StyleProp<TextStyle>;
  buttonConfirmStyle?: StyleProp<ViewStyle>;
  textButtonConfirmStyle?: StyleProp<TextStyle>;
```
