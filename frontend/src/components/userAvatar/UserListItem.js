import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';

const UserListItem = ({user, handleFunction }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;


  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      
      <><Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic} /><Box>
            <Text>{user.name}</Text>
          </Box></>
      
    </Box>
  );
};

export default UserListItem;
