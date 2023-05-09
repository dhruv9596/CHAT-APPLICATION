import { registerRootComponent } from 'expo';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import store from './src/store';
import {name as appName} from './app.json';

// const AppRedux = () => (
//   // <Provider {...{store}}>
//   //   <App />
//   // </Provider>
// );

// AppRegistry.registerComponent(appName, () => AppRedux);

registerRootComponent(App);