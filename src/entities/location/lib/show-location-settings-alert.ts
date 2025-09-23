import { Alert, Linking } from 'react-native';

export const showLocationSettingsAlert = () => {
  Alert.alert(
    'Требуется геолокация',
    'Для работы приложения необходимо разрешить доступ к геолокации в настройках устройства.',
    [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Настройки',
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]
  );
};
