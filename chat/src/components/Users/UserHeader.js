import React from 'react';
import {Dimensions} from 'react-native';
import {Back, Hamburger} from '../../Icons';
import Search from '../../Icons/Search';
import {Box, Text} from '../theme';

const {height} = Dimensions.get('window');

function UserHeader({back}) {
  return (
    // <Box
    //   flexDirection="row"
    //   padding="m"
    //   marginTop="m"
    //   height={height * 0.06}
    //   justifyContent="space-between"
    //   alignItems="center">
    //   {back ? <Back size={27} /> : <Hamburger size={20} />}
    //   <Search size={27} />
    // </Box>
    <Box
      backgroundColor='primary'
      flexDirection="row"
      height={height * 0.15}
      borderBottomEndRadius="l"
      borderBottomStartRadius='l'
      borderBottomColor='black'
      justifyContent="space-between"
      alignItems="center">
        <Text color="white"
        fontSize={40}
        padding="m"
        marginTop="m"
        fontWeight='500'>Chats</Text>
    </Box>
  );
}

export default UserHeader;
