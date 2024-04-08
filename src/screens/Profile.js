import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

import Heading from "../components/Heading";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import InfoCard from "../components/InfoCard";
import Button from "../components/Button";
import Input from "../components/TextInput";
import EditProfile from "./EditProfile";


const Profile = () => {
    const navigation = useNavigation()
    const db = getFirestore(firebase)

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [emiratesID, setEmiratesID] = useState("")
    const [name, setName] = useState("")
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
                    setLoading(false)
                    setName(victimProfile.data().name)
                    setEmiratesID(victimProfile.data().emiratesID)
                    setPhoneNumber(victimProfile.data().phoneNumber)
                    setUserType(victimProfile.data().userType)
                    if (victimProfile.data().profileImage !== "" && victimProfile.data().fatherName !== "" && victimProfile.data().motherName !== "") {
                        setProfileImage(victimProfile.data().profileImage)
                        setFatherName(victimProfile.data().fatherName)
                        setMotherName(victimProfile.data().motherName)
                    }
                } catch (error) {
                    console.log("Error fetching cases details", error)
                }
            }
        }
        loadProfileData()
    }, [email])

    const logoutAccount = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View styles={styles.container}>
            <ImageBackground source={require('../../assets/pbimg.png')} style={styles.bg_img} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                    <View style={{}}>
                        <Heading title='Profile' />
                    </View>
                    <RightIcon source={require('../../assets/edit.png')} onPress={() => { navigation.navigate("EditProfile") }} />
                </View>

                {loading ? <ActivityIndicator size={"small"} color={"blue"} /> : null}

                <View style={styles.profile_img} >
                    {
                        profileImage ?
                            <Image style={styles.image} source={{ uri: profileImage }} />
                            :
                            <Image style={styles.imageicon} source={require('../../assets/imageicon.png')} />
                    }
                </View>

                <Text style={styles.txt}>{name}</Text>
                <View style={{ flexDirection: 'column', marginTop: 10, marginHorizontal: 30 }}>
                    <InfoCard title="Emirate ID" value={emiratesID} />
                    <InfoCard title="Email" value={email} />
                    <InfoCard title="Phone Number" value={phoneNumber} />
                    <InfoCard title="Father Name" value={fatherName} />
                    <InfoCard title="Mother Name" value={motherName} />
                </View>

                <Button styles={{ marginTop: 30, backgroundColor: "#1CAC79", }} text="Logout" onPress={() => { logoutAccount() }} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bg_img: {
        width: "100%",
        height: "65%"
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
    txt: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },

})
export default Profile;