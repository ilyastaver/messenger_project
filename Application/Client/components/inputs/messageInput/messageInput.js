import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native-web';
import useStyles from './messageInput.module';
import SendSvg from '../../../assets/icons/sendSvg';

const MessageInput = ({ curuser, chanInf, channel, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const styles = useStyles();
  const username = 'admin';
  const password = 'root';
  const inputRef = useRef(null); 
  
  const handleSend = async () => {
    if (message) {
      try {
        if (channel) {
          const requestBody = {
            currentUsername: curuser,
            message: message,
            channelName: chanInf.channel.name,
          };
    
          const response = await fetch('https://linking-api.onrender.com/api/channels/add_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            setMessage('');
            onMessageSent(); 
          } else {
            alert('Не удалось отправить сообщение');
          }
        } else {
          const requestBody = {
            currentUsername: curuser,
            otherUsername: chanInf,
            message: message,
          };
    
          const response = await fetch('https://linking-api.onrender.com/api/chats/add_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            setMessage('');
            onMessageSent();
          } else {
            alert('Не удалось отправить сообщение');
          }
        }
      } catch (error) {
        alert('Ошибка отправки', error);
      }
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Сообщение"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        onKeyPress={handleKeyPress}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <SendSvg />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
