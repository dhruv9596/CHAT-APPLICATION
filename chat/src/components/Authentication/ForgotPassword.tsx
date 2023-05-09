import React, { useState,useEffect } from 'react'
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
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
import Loader from '../Loader';
import {forgotPassword} from '../../store/actions/authActions';

interface ForgotPasswordProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, 'ForgotPassword'>,
    StackNavigationProp<AuthRoutes, 'Login'>
  >;
}

function ForgotPassword({navigation}: ForgotPasswordProps) {

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const error = useSelector((state: any) => state.err);
  const [email, setEmail] = useState<string>('');

  const onResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const onForgotPassword = () => {
    new Promise(function (res) {
      res(dispatch(forgotPassword({email})));
    }).then(() => {
      
    });
  };

  useEffect(() => {
    if(auth.forgot_user_id){
      onResetPassword();
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
                Forgot Password?
            </Text>
            {error.id === 'FORGOT_FAIL' ? (
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

            <Button label="Submit" variant="primary" onPress={onForgotPassword} />
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

export default ForgotPassword
