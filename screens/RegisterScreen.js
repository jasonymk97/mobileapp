import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import authService from '../services/authService';
import Layout from '../components/Layout';
import AppButton from '../components/AppButton';
import IconBrand from '../components/IconBrand';
import useAlert from '../hooks/useAlert';

const validationSchema = yup.object().shape({
  username: yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterScreen({ navigation }) {
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

  const onSubmit = async ({ username, email, password }) => {
    try {
      const response = await authService.register(email, password, username);

      if (response.isError || response.data.error) {
        show('Error', response?.data?.message, 'error');
        return;
      }

      show('Success', 'Account is created successfully !', 'success');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout isBackgroundImage={true}>
      <View style={styles.container}>
        <IconBrand />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="username"
          defaultValue=""
        />
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

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
              keyboardType="default"
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              keyboardType="default"
            />
          )}
          name="confirmPassword"
          defaultValue=""
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

        <AppButton title="Register" onPress={handleSubmit(onSubmit)} containerStyle={{ width: '50%', marginBottom: 10 }} />
        <AppButton title="Back to Login" onPress={() => navigation.navigate('Login')} containerStyle={{ width: '50%' }} />
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
