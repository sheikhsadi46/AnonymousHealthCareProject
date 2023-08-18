import { Box } from '@chakra-ui/layout';
import { useContext, useEffect, useState } from 'react';
import Chatbox from '../../components/Chatbox';
import MyChats from '../../components/MyChats';
import SideDrawer from '../../components/miscellaneous/SideDrawer';
// import { ChatState } from '../../Context/ChatProvider.js';
import { Store } from '../../Store';
import './chat.css';
import { Helmet } from 'react-helmet-async';

export default function ChatScreen() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  userInfo } = state;

  return (
    <div>
      <Helmet>
        <title>Chats</title>
      </Helmet>

      <div style={{ width: '100%' }}>
        {userInfo && <SideDrawer />}
        <Box className="layout-box">
          {userInfo && <MyChats fetchAgain={fetchAgain} />}
          {userInfo && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </div>
  );
}
