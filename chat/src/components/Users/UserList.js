import React, {useEffect} from 'react';
import UserHeader from './UserHeader';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {Box, Text} from '../theme';
import TopStatus from './TopSearch/TopStatus';
import Users from './Users';
import {Bot} from '../../images';
import {useDispatch} from 'react-redux';
import {ChatUserList} from '../../store/actions/chatAction';
import {logout} from '../../store/actions/authActions';
import {useNavigation} from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Line } from 'react-native-svg';
import {useSelector} from 'react-redux';

export default function UserList() {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const auth = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    auth.isAuthenticated = false;
    localStorage.clear();
    navigate('Auth');
  };

  useEffect(() => {
    dispatch(ChatUserList());
  }, []);

  return (
    <Box backgroundColor="white" flex={1} position="relative">
      <UserHeader back={false} />
      <TopStatus />
      <Box marginTop="s" flex={1} backgroundColor="dgrey" padding="m">
        <Text fontFamily="Rubik-Bold" variant="title" color="primary" fontSize={20} style={{borderBottomWidth: 3, width: 30, marginLeft: 10,}} >
          All
        </Text>
        <Users />
      </Box>

      <TouchableWithoutFeedback onPress={onLogOut}>
        <Box position="absolute" bottom={15} right={20} backgroundColor="primary" padding="m" style={{borderRadius: 50}}>
            <Feather name="log-in" size={25} color="white" />
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
}
