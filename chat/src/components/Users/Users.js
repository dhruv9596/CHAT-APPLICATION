import React, {Fragment, useState, useEffect} from 'react';
import {FlatList, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import theme, {Box, Text} from '../theme';
import {user, Right} from '../../images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {clearActiveMsgs} from '../../store/actions/chatAction';
import {Spinner} from 'native-base';

function Badge({msgs}) {
  return (
    <Box
      width={18}
      height={18}
      top={5}
      right={-4}
      position="absolute"
      backgroundColor="danger"
      padding="s"
      borderRadius="l"
      justifyContent="center"
      alignItems="center">
      <Text variant="body" fontSize={14} color="white">
        {msgs}
      </Text>
    </Box>
  );
}

function UserList({name, time, msg}) {

  const {width} = Dimensions.get('window');
  return (
    <Box
      flexDirection="row"
      marginBottom="s"
      backgroundColor="dgrey"
      alignItems="center"
      flex={1}
      >
      <Box
        paddingVertical="s"
        marginRight="m"
        justifyContent="center"
        position="relative"
        height={52}
        width={52}
        alignItems="center">
        <Image
          source={user}
          style={{
            ...StyleSheet.absoluteFillObject,
            height: 60,
            width: 60,
          }}
          resizeMode="contain"
        />
        <Badge msgs={1} />
      </Box>
      <Box
        flexDirection="column"
        justifyContent="space-between"
        paddingVertical="m">
        <Text
          variant="title"
          color="black"
          fontSize={19}
          textTransform="capitalize">
          {name}
        </Text>
        <Text>{msg}</Text>
      </Box>
      <Box
        marginLeft="s"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-between"
        paddingVertical="m"
        flex={1}
        paddingLeft="m">
        <Image source={Right} style={{marginBottom: 10}} />
        <Text variant="smtitle" fontSize={12}>
          {time}
        </Text>
      </Box>
    </Box>
  );
}

function Users() {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [loadUsers, setLoadUsers] = useState(false);
  const {users, activeRoom, messages, activeUser} = useSelector((state) => state.chat);

  useEffect(() => {
    setTimeout(() => {
      setLoadUsers(true);
    }, 1200);
  }, []);

  // const users = [
  //   {_id: 1, name: 'Samuel Anthony', msg: 'I am comgin now', time: '6:89'},
  //   {_id: 2, name: 'Samuel Anthony', msg: 'I am comgin now', time: '6:89'},
  //   {_id: 3, name: 'Samuel Anthony', msg: 'I am comgin now', time: '6:89'},
  //   {_id: 4, name: 'Samuel Anthony', msg: 'I am comgin now', time: '6:89'},
  //   {_id: 5, name: 'Samuel Anthony', msg: 'I am comgin now', time: '6:89'},
  //   {_id: 6, name: 'Samuel Anthony', msg: 'I am comgin now', time: '6:89'},
  // ];

  return (
    <Box marginTop="l" flex={1}>
      {loadUsers ? (
        <>
          {users.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              showsVerticalScrollIndicator={false}
              data={users}
              numColumns={1}
              renderItem={({item: {_id, name, msg, time, email}}) => {
                return (
                  <Fragment>
                    <TouchableOpacity
                      onPress={() => {
                        navigate('Message', {_id, email, name});
                        dispatch(clearActiveMsgs());
                      }}>
                      <UserList {...{_id, name, msg, time, email}} />
                    </TouchableOpacity>
                  </Fragment>
                );
              }}
              keyExtractor={({_id}) => _id.toString()}
            />
          ) : (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant="title" color="wblack">
                No Contacts Yet
              </Text>
            </Box>
          )}
        </>
      ) : (
        <Spinner color={theme.colors.primary} />
      )}
    </Box>
  );
}

export default Users;
