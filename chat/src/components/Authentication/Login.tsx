import React, {useState, useEffect} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {AuthRoutes} from '.';
import Button from '../../Utils/Button';
import FormTextInput from '../../Utils/FormTextInput';
import {Box, Text} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import AsysncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');
import {LinearGradient} from 'expo-linear-gradient';

/* Actions */
import {login} from '../../store/actions/authActions';
import Loader from '../Loader';
import {socket} from '../../store/actions/chatAction';
import {Login_Img} from '../../images';
import { position } from '@shopify/restyle';

interface LoginProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, 'Login'>,
    StackNavigationProp<AuthRoutes, 'Register'>
  >;
}

function Login({navigation}: LoginProps) {
  const {navigate: nNavigate} = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const error = useSelector((state: any) => state.err);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onRegister = () => {
    navigation.navigate('Register');
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const onLogin = () => {
    new Promise(function (res) {
      res(dispatch(login({email, password})));
    }).then(() => {
      socket.emit('getUsers');
    });
  };

  const setToken = async (token: string) => {
    if (token) {
      try {
        await AsysncStorage.removeItem('@user_token');
        await AsysncStorage.setItem('@user_token', token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const {isAuthenticated, token} = auth;
    setToken(token);
    if (isAuthenticated) {
      nNavigate('Users');
    }
  }, [auth]);

  return (
    <Box
      flex={1}
      backgroundColor="primary"
      justifyContent="center"
      alignItems="center">
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.linearGradient}>
          <Box
            width={width * 0.9}
            borderRadius="l"
            backgroundColor="white"
            padding="l"
            alignItems="center">
            <Image
              source={Login_Img}
              style={{
                height: 150,
                width: 150,
              }}
              resizeMode="contain"
            />
            <Text variant="title" color="primary" marginBottom="l">
              LOGIN
            </Text>

            {error.id === 'LOGIN_FAIL' ? (
              <>
                {error.msg.msg ? (
                  <Text
                    variant="smtitle"
                    color="danger"
                    textTransform="uppercase"
                    fontSize={12}
                    marginBottom="m">
                    {error.msg.msg}
                  </Text>
                ) : null}
              </>
            ) : null}

            <Box style={{width: width * 0.7}} marginBottom="m">
              <FormTextInput
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
              />
            </Box>

            <Box style={{width: width * 0.7}} marginBottom="m">
              <FormTextInput
                placeholder="Password"
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={{
                  marginBottom: 30,
                }}
              />
            </Box>
            <TouchableOpacity onPress={goToForgotPassword}>
              <Text style={styles.forgot_button}>Forgot Password?</Text> 
            </TouchableOpacity>

            <Button label="Login" variant="primary" onPress={onLogin} />

            <BorderlessButton onPress={onRegister}>
              <Text variant="smtitle" color="primary">
                Register
              </Text>
            </BorderlessButton>
          </Box>
        {auth.regLoading ? <Loader /> : null}
      </LinearGradient>
    </Box>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",
    height: "100%",
  },
  forgot_button: {
    marginTop: -10,
    marginBottom: 20,
    textAlign: 'right',
  }
});

export default Login;
