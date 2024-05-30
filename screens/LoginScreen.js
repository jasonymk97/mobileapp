import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../components/Layout';
import AppButton from '../components/AppButton';
import IconBrand from '../components/IconBrand';
import authService from '../services/authService';
import useAlert from '../hooks/useAlert';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const { show } = useAlert();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: async (data) => {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        return {
          values: data,
          errors: {},
        };
      } catch (validationErrors) {
        return {
          values: {},
          errors: validationErrors.inner.reduce((allErrors, currentError) => {
            return {
              ...allErrors,
              [currentError.path]: currentError.message,
            };
          }, {}),
        };
      }
    }
  });

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('Main');
      }
    }
    getToken();
  }, []);

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await authService.login(email, password);

      if (response.isError || response.data.error) {
        show('Error', response?.data?.message, 'error');
        return;
      }
      // save token to AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('email', email);

      // show success message
      show('Success', 'Login successfully !', 'success');

      // navigate to Main screen
      navigation.replace('Main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout isBackgroundImage={true} >
        <View style={styles.container}> 
          <IconBrand />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                keyboardType="numeric"
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <AppButton title="Login" onPress={handleSubmit(onSubmit)} containerStyle={{ width: '50%', marginBottom: 10 }} />
          <AppButton title="Register" onPress={() => navigation.navigate('Register')} containerStyle={{ width: '50%' }} />
        </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderRadius: 20,
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  backgroundImage: {
    flex: 1,
  },
});
