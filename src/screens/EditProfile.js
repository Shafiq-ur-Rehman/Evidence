import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, ScrollView, Platform, ImageBackground, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import Input from '../components/TextInput'
import LeftIcon from '../components/TopLeftIcon'
import RightIcon from '../components/TopRightIcon'
import Heading from '../components/Heading'
import Button from '../components/Button'

export default function EditProfile() {

    const navigation = useNavigation()
    const db = getFirestore(firebase)

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [emiratesID, setEmiratesID] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [userType, setUserType] = useState("");

    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const email = await AsyncStorage.getItem('email')
                setEmail(email)
            } catch (error) {
                alert("Error fetching email from local storage: ", error)
            }
        }
        getUserEmail()
    }, [])

    useEffect(() => {
        const loadProfileData = async () => {
            if (email) {
                const victimRef = doc(db, "Profile", email)
                try {
                    const victimProfile = await getDoc(victimRef)
                    console.log(victimProfile.data())
                    setEmiratesID(victimProfile.data().emiratesID)
                    setName(victimProfile.data().name)
                    setPhoneNumber(victimProfile.data().phoneNumber)
                    setFatherName(victimProfile.data().fatherName)
                    setMotherName(victimProfile.data().motherName)
                    setProfileImage(victimProfile.data().profileImage)
                    setUserType(victimProfile.data().userType)
                    setLoading(false)
                } catch (error) {
                    console.log("Error fetching cases details", error)
                }
            }
        }
        loadProfileData()
    }, [email])

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            // console.log(result.assets[0].uri);

            if (!result.canceled) {
                setProfileImage(result.assets[0].uri);
            }
            else {
                alert("you did not select any images")
            }
        } catch (error) {
            alert(error)
        }
    };

    const updateProfile = async () => {
        try {
            if (name !== "" && emiratesID !== "" && phoneNumber !== "" && fatherName !== "" && motherName !== "" && profileImage !== "") {
                setLoading(true)
                await setDoc(doc(db, "Profile", email), { name, emiratesID, phoneNumber, fatherName, motherName, profileImage, userType })
                    .then(() => {
                        setLoading(false)
                        alert('your Profile has been Update')
                        navigation.navigate("Profile")
                    }).catch((e) => {
                        console.log(e)
                    })
            } else {
                throw new Error("Error! All input field must be completed.")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container} >
            <ScrollView onPress={Keyboard.dismiss}>
                <ImageBackground source={require('../../assets/pbimg.png')} style={styles.bg_img} >

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                        <View style={{}}>
                            <Heading title='Edit Profile' />
                        </View>
                        <View style={styles.righticon}>
                        </View>

                    </View>

                    {loading ? <ActivityIndicator size={"small"} color={"blue"} />
                        :
                        <View>

                            <TouchableOpacity style={styles.profile_img} onPress={() => pickImage()}>
                                {
                                    profileImage ?
                                        <Image style={styles.image} source={{ uri: profileImage }} />
                                        :
                                        <Image style={styles.imageicon} source={require('../../assets/imageicon.png')} />
                                }
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column', marginTop: 20, }}>
                                <Input styles={styles.input} value={emiratesID} placeholder="Emirate ID" onChangeText={(t) => setEmiratesID(t)} />
                                <Input styles={styles.input} value={name} onChangeText={(t) => setName(t)} />
                                <Input styles={styles.input} value={phoneNumber} onChangeText={(t) => setPhoneNumber(t)} />
                                <Input styles={styles.input} value={fatherName} placeholder="Father Name" onChangeText={(t) => setFatherName(t)} />
                                <Input styles={styles.input} value={motherName} placeholder="Mother Name" onChangeText={(t) => setMotherName(t)} />
                            </View>
                        </View>
                    }
                    <Button styles={{ marginTop: 30, backgroundColor: "#1CAC79", }} text="Update" onPress={() => { updateProfile() }} />
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    bg_img: {
        width: "100%",
        height: "60%"
    },
    righticon: {
        marginRight: 50,
    },
    profile_img: {
        marginTop: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 200,
        width: 200,
        borderWidth: 1,
        overflow: "hidden",
    },
    image: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    imageicon: {
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    input: {
        marginTop: 10,
        height: 55,
    },
    txt: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
})