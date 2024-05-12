import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getFirestore, serverTimestamp, query, getDocs, getDoc, doc, orderBy, onSnapshot } from "firebase/firestore";
import firebase from "../config/Firebase"


import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";


const Chat = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const item = route.params
    console.log(item)

    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)
    const [data, setData] = useState([])
    const [email, setEmail] = useState([])
    const db = getFirestore(firebase);

    useEffect(() => {
        getUserEmail()
        readMessages()
    }, [])

    const getUserEmail = async () => {
        const email = await AsyncStorage.getItem('email')
        loadUserData(email)
        setEmail(email)
    }
    const loadUserData = async (email) => {
        console.log(email + "//")
        const docRef = doc(db, "Profile", email);
        const docSnap = await getDoc(docRef);
        //console.log(docSnap)
        if (docSnap.exists()) {
            console.log(docSnap.data().name)

            setName(docSnap.data().name)

            // console.log(data)
            // console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    addMessages = async () => {
        try {
            if (message) {
                await addDoc(collection(db, "Chat"), {
                    sender: name,
                    message: message,
                    timestamp: serverTimestamp()
                })
            }
            setMessage(null)
            readMessages()
        }
        catch (e) {
            console.log(e)
        }
    }
    readMessages = async () => {
        try {
            const q = query(collection(db, 'Chat'), orderBy('timestamp', 'asc'))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let d = []
                querySnapshot.forEach((doc) => {
                    d.push(doc.data())
                });
                setData(d)
                console.log(d)
            });

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : null} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Chat' />
                <RightIcon styles={{ marginRight: 30 }} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return (
                                name == item.sender ?
                                    <View style={{
                                        width: '60%',
                                        backgroundColor: '#1CAC79',
                                        padding: 5,
                                        margin: 5,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10
                                    }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.sender}</Text>
                                        <Text>{item.message}</Text>
                                        {item.timestamp ? <Text>{item.timestamp.toDate().toISOString()}</Text> : null}
                                    </View>
                                    : <View style={{
                                        width: '60%',
                                        backgroundColor: '#01CEFF',
                                        padding: 5,
                                        margin: 5,
                                        alignSelf: 'flex-end',
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10
                                    }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.sender}</Text>
                                        <Text>{item.message}</Text>
                                        {item.timestamp ? <Text>{item.timestamp.toDate().toISOString()}</Text> : null}
                                    </View>
                            )
                        }}
                        keyExtractor={item => item.timestamp}
                    />
                    <View style={styles.view}>
                        <TextInput style={styles.input} value={message} placeholder="Type Your Message" onChangeText={(t) => setMessage(t)} />
                        <TouchableOpacity onPress={() => addMessages()}>
                            <Image style={styles.img} source={require('../../assets/send-message.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainview: {
        flex: 1,
        justifyContent: "flex-end",
    },
    inner: {
        flex: 1,
    },
    view: {
        flexDirection: 'row',
    },
    input: {
        margin: 10,
        width: '80%',
        height: 40,
        padding: 5,
        backgroundColor: '#d3d3d3',
        borderColor: '#01CEFF',
        borderWidth: 0.5
    },
    img: {
        marginTop: 5
    }
})
export default Chat;