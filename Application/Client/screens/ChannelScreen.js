import React, { useState, useContext } from 'react';
import { View, Text, TouchableHighlight, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native-web';
import CreateSvg from '../assets/icons/createSvg';
import useStyles from './styles/mainAuthScreen.module';
import SearchInput from '../components/inputs/searchInput/searchInput';
import HeaderButton from '../components/buttons/headerButton';
import DataInput from '../components/inputs/textInput/textInput';
import SearchBody from '../components/searchBodies/searchBody';
import ShowAvatar from '../components/Avatar/ShowAvatar/showAvatar';
import BorderButton from '../components/buttons/borderButton';
import ForwardMessage from '../components/forwardMessage/forwardMessage';
import MessageBody from '../components/messageBody/messageBody';
import MessageInput from '../components/inputs/messageInput/messageInput';
import SettingsSvg from '../assets/icons/settingsSvg';
import { ImageContext } from '../context/ImageContext';
import AuthContext from '../context/AuthContext';


export default function ChannelScreen({ navigation }) {
    const styles = useStyles();
    const [showPopup, setShowPopup] = useState(false);
    const [inputText, setInputText] = useState({
        nickname: '',
    });
    const { logout } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const { selectedImage } = useContext(ImageContext);
    const handleSend = message => {
        setMessages(prevMessages => [...prevMessages, message]);
    };
    const isFormValid = inputText.nickname;
    const buttons = [
        {
            onPress: ({ }) => navigation.navigate('Profile'),
            text: 'Мой аккаунт'
        },
        {
            onPress: () => logout(),
            text: 'Выйти'
        }
    ]

    const messageBodies = [
        {
            imageUrl: "https://i.ibb.co/6NC7Pms/photo-2023-05-05-23-08-50.jpg",
            nickname: "John Doe",
            channel: false,
            message: "Hellffffffffffffffffffffffffffffffffffffffffffffffffffffffffo world!",
        },
        {
            own: true,
            nickname: "John Doe",
            channel: false,
            message: "Hellffffffffffffffffffffffffffffffffffffffffffffffffffffffffo world!",
        }
    ]

    const [isMember, setIsMember] = useState(false);
    const [showSettings, setShowSettings] = useState(true);

    const handleJoinLeave = () => {
        setIsMember((prev) => !prev);
    };

    

    return (
        <View style={styles.containerMain}>
            <View style={styles.barChanContainer}>
                <Text style={styles.barText}>Channels name</Text>
                <View>
                    <HeaderButton title={isMember ? 'Покинуть' : 'Присоединиться'} onPress={handleJoinLeave} />
                </View>
                {isMember && showSettings && (
                    <View style={{ marginRight: 20 }}>
                        <TouchableHighlight onPress={({ }) => navigation.navigate('Settings')} >
                        <SettingsSvg />
                        </TouchableHighlight>
                    </View>
                )}
            </View >
            <View style={styles.profileContainer}>

                <ShowAvatar imageUrl={selectedImage} profile={true} />
                <Text style={{
                    color: '#000000',
                    fontSize: 48,
                    textAlign: 'center',
                    marginBottom: 13
                }}>Username</Text>
                {buttons.map((data, index) =>
                    <View style={{ width: '70%' }}>
                        <BorderButton key={index} data={data} />
                    </View>
                )}

            </View>
            <View style={styles.historyContainer}>
                <ScrollView style={{ flex: 1, scrollbarWidth: 0, flexDirection: 'column' }}>
                {messageBodies.map((data, index) =>
                        <MessageBody key={index} data={data} />
                    )}
                    {messages.map((message, index) => (
                        <MessageBody
                            key={index}
                            data={message}
                        />
                    ))}
                </ScrollView>

            </View>
            {isMember && (
                <View style={styles.sendContainer}>
                    <MessageInput onSend={handleSend} />
                </View>
            )}
            <View style={styles.bottomLeft}>
                <TouchableHighlight onPress={() => setShowPopup(true)}>
                    <CreateSvg />
                </TouchableHighlight>
            </View>
            <Modal visible={showPopup} transparent={true}>
                <View style={styles.popupContainer}>
                    <Text style={styles.text}>Название канала</Text>
                    <View style={{ marginBottom: 13, alignItems: 'center', }}>
                        <DataInput
                            value={inputText.nickname}
                            setValue={(text) => setInputText({ ...inputText, nickname: text })}
                            placeholder={""}
                            type={"nickname"}
                            flex={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setShowPopup(false)}>
                        <View >
                            <HeaderButton title={"Создать"} onPress={() => console.log()} disabled={!isFormValid} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
