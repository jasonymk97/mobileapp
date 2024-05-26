import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

const useAlert = () => {
  const show = useCallback((title, message, type) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  }, []);

  return { show };
};

export default useAlert;
