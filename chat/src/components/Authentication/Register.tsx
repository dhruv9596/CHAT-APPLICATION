import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AuthRoutes} from '.';
import {register} from '../../store/actions/authActions';
import Button from '../../Utils/Button';
import FormTextInput from '../../Utils/FormTextInput';
import Loader from '../Loader';
import {Box, Text} from '../theme';
const {width} = Dimensions.get('window');
import {SignUp_Img} from '../../images';
import {LinearGradient} from 'expo-linear-gradient';
import ImagePicker from 'react-native-image-picker'

interface RegisterProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, 'Login'>,
    StackNavigationProp<AuthRoutes, 'Register'>
  >;
}

function Register({navigation}: RegisterProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const error = useSelector((state: any) => state.err);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [photo, setPhoto] = React.useState(null);

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const onRegister = () => {
    dispatch(register({name, email, password}));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      onLogin();
    }
  }, [auth]);

  const handleChoosePhoto = () => {

    // const options = {
    //   noData: true,
    // }
    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.uri) {
    //     setPhoto({ photo: response })
    //   }
    // })
  };

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
            source={SignUp_Img}
            style={{
              height: 150,
              width: 150,
            }}
            resizeMode="contain"
          />
          <Text variant="title" color="primary" marginBottom="l">
            SIGN UP
          </Text>

          {error.id === 'REGISTER_FAIL' ? (
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

          {/* <Button label="Choose Photo" onPress={handleChoosePhoto} /> */}
          <Box style={{width: width * 0.7}} marginBottom="m">
            <FormTextInput
              placeholder="Fullname"
              onChangeText={(name) => setName(name)}
            />
          </Box>

          <Box style={{width: width * 0.7}} marginBottom="m">
            <FormTextInput
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
            />
          </Box>

          <Box style={{width: width * 0.7}} marginBottom="m">
            <FormTextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
            />
          </Box>

          <Button label="Register" variant="primary" onPress={onRegister} />

          <BorderlessButton style={{marginTop: 20}} onPress={onLogin}>
            <Text variant="smtitle" color="primary">
              Login
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
    height: "100%"
  },
});


export default Register;
