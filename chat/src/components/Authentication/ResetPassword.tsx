import React, { useState,useEffect } from 'react'
import {Alert, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRoutes} from '.';
import {Box, Text} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
const {width} = Dimensions.get('window');
import {ForgotPasswordImg} from '../../images';
import {useDispatch, useSelector} from 'react-redux';
import FormTextInput from '../../Utils/FormTextInput';
import Button from '../../Utils/Button';
import {resetPassword} from '../../store/actions/authActions';

interface ResetPasswordProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, 'ResetPassword'>,
    StackNavigationProp<AuthRoutes, 'ForgotPassword'>
  >;
}

function ResetPassword({navigation}: ResetPasswordProps) {

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const error = useSelector((state: any) => state.err);
  const [password, setNewPassword] = useState<string>('');
  const user_id = auth.forgot_user_id;

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const showAlert = () => {  
    Alert.alert('successful!','Your password has been successfully reset.',  
      [  
        {text: 'OK', onPress: () => console.log('OK Pressed')},  
      ]  
    );  
  }  

  const onResetPassword = () => {
    new Promise(function (res) {
      res(dispatch(resetPassword({password, user_id})));
    }).then((res) => {
        console.log(res);
    });
  };

  useEffect(() => {
   if(auth.isResetPassword){
      auth.isResetPassword = false;
      auth.forgot_user_id = null;
      showAlert();
      onLogin();
    }
  }, [auth]);


  return (
    <Box style={styles.container}>
       <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.linearGradient}>
          <Box
            width={width * 0.9}
            borderRadius="l"
            backgroundColor="white"
            padding="l"
            alignItems="center">
            <Image
              source={ForgotPasswordImg}
              style={{
                height: 150,
                width: 150,
              }}
              resizeMode="contain"
            />
            <Text variant="title" color="primary" marginBottom="l" fontSize={25}>
                Reset Password
            </Text>
              {error.id === 'RESET_PASSWORD_FAIL' ? (
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
                placeholder="Enter New Password"
                secureTextEntry
                onChangeText={(password) => setNewPassword(password)}
              />
            </Box>

            <Button label="Reset" variant="primary" onPress={onResetPassword} />
          </Box>
     
      </LinearGradient>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#673AB7',
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",
    height: "100%"
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 25
  },

});

export default ResetPassword
