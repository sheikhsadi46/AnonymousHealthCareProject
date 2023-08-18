import { Avatar } from '@chakra-ui/avatar';
import { Tooltip } from '@chakra-ui/tooltip';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { useContext, useEffect, useState ,useRef} from 'react';
import { Store } from '../Store';

const ScrollableChat = ({ messages }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollableFeed>
      <div style={{ height: '440px', overflow: 'auto' }} ref={chatContainerRef}>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: 'flex' }} key={m._id}>
              {(isSameSender(messages, m, i, userInfo._id) ||
                isLastMessage(messages, i, userInfo._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === userInfo._id ? '#BEE3F8' : '#B9F5D0'
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, userInfo._id),
                  marginTop: isSameUser(messages, m, i, userInfo._id) ? 3 : 10,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </div>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
