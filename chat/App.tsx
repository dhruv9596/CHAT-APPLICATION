import * as React from 'react';
import "./ignoreWarnings";
import {Provider} from 'react-redux';
import store from './src/store';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Container} from 'native-base';

/* Utils */
import theme from './src/components/theme';
import {createStackNavigator} from '@react-navigation/stack';

/* Routes */
import {AuthNavigator} from './src/components/Authentication';
import {UserNavigator} from './src/components/Users';
import {SplashNavigator} from './src/components/Splash';

/* Import Redux */
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {loadUser} from './src/store/actions/authActions';
import {handleDispatchMsg} from './src/store/actions/chatAction';
import { useFonts } from "expo-font";
import 'localstorage-polyfill'; 


import Navigate from './navigate';

enableScreens();

type SharedStackParams = {
  Users: undefined;
  Auth: undefined;
};

const AppStack = createStackNavigator<SharedStackParams>();

const App = () => {

  
  // const getIsSignedIn = () => {
  //   // console.log(localStorage.getItem('messageapp-user'), 'localStorage.getItem');
  //   return (localStorage.getItem('messageapp-user')) ? true : false;
  // };

  const [loaded] = useFonts({// function for expo-font 
    "Rubik-Black": require('./src/fonts/Rubik-Black.ttf'),
    "Rubik-Bold": require('./src/fonts/Rubik-Bold.ttf'),
    "Rubik-Regular": require('./src/fonts/Rubik-Regular.ttf'),
    "Rubik-Medium": require('./src/fonts/Rubik-Medium.ttf'),
    "Feather": require('./android/app/src/main/assets/fonts/Feather.ttf')
  });
  if (!loaded) {
    return null;
  }

  // const isSignedIn = getIsSignedIn();
  return (
    <Provider store={store}>
      <Navigate />
        <NavigationContainer>
          <ThemeProvider {...{theme}}>
            <Container style={{flex: 1}}>
              <SafeAreaProvider>
                <AppStack.Navigator headerMode="none" initialRouteName="SplashScreen">
                      <AppStack.Screen name="SplashScreen" component={SplashNavigator} />
                  {/* {isSignedIn ? (
                    <> */}
                      <AppStack.Screen name="Users" component={UserNavigator} />
                    {/* </>
                  ) : (
                    <> */}
                     <AppStack.Screen name="Auth" component={AuthNavigator} />
                    {/* </>
                  )} */}
                </AppStack.Navigator>
              </SafeAreaProvider>
            </Container>
          </ThemeProvider>
        </NavigationContainer>
    </Provider>
  );
}

export default App;