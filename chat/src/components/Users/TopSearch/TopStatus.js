import React, {Fragment, useState, useEffect}  from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import theme, {Box, Text} from '../../theme';
import {Img1, Img2, Img3, Img4, Img5, Img6, status, user} from '../../../images';
import {useSelector} from 'react-redux';
import {Spinner} from 'native-base';
import {UserList} from './../Users'

const topSearchImage = [
  {src: Img1, notification: true},
  {src: Img2, notification: false},
  {src: Img3, notification: true},
  {src: Img4, notification: true},
  {src: Img5, notification: false},
  {src: Img6, notification: false},
];

function TopStatus() {

  const [loadUsers, setLoadUsers] = useState(false);
  const {users} = useSelector((state) => state.chat);

  useEffect(() => {
    setTimeout(() => {
      setLoadUsers(true);
    }, 1200);
  }, []);

  return (
    <Box marginTop="xs" padding="m">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map(({src, notification}, index) => (
          <Box
            key={index}
            justifyContent="flex-end"
            alignItems={'center'}
            marginRight="s"
            position="relative">
            <Image source={user} style={{
              height: 100,
              width: 100,
            }} resizeMode="contain"/>
            {topSearchImage[0].notification ? (
              <Box style={{position: 'absolute', top: -8, right: -8}}>
                <Image source={status} />
              </Box>
            ) : null}
          </Box>
        ))}
        
      
      </ScrollView>
    </Box>
  );
}

export default TopStatus;
