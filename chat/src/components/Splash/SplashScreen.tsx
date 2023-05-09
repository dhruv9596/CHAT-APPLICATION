import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {useSelector} from 'react-redux';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Splash} from '../../images';
import {AuthRoutes} from '.';
import {Box, Text} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';


interface SplashScreenProps {
    navigation: CompositeNavigationProp<
      StackNavigationProp<AuthRoutes, 'SplashScreen'>
    >;
}
  

function SplashScreen({navigation}: SplashScreenProps) {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const auth = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      if (auth.isAuthenticated) {
        navigation.navigate('Users');
      } else{
        navigation.navigate('Auth');
      }
    }, 4000);
  }, []);

  return (
    <Box style={styles.container}>
      <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.linearGradient}>
        <Image source={Splash} style={styles.image}
        />
        <Text style={styles.splashtext}>Hey Messenger!</Text>
      </LinearGradient>
    </Box>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#673AB7',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    image:{
      width: '80%', 
      resizeMode: 'contain', 
      margin: 5,   
    },
    splashtext: {
      color: "#fff",
      fontSize: 30,
    },
    linearGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      width: "100%",
      height: "100%"
      
    },
  });


export default SplashScreen;

