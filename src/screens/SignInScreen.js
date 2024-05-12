import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from "../store/context/UserContext";

import Heading from "../components/Heading";
import Input from "../components/TextInput"
import Button from "../components/Button";

const SignIn = () => {
    const navigation = useNavigation();
    const {state, setUser} = useContext(UserContext)
    // console.log(state)

    const [userType, setUserType] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const auth = getAuth();
    const db = getFirestore(firebase)

    const setUserAccountType = async (u) => {
        await AsyncStorage.setItem("userType", u)
    }

    const getUserAccountType = async () => {
        const user = await AsyncStorage.getItem("userType")
        setUserType(user)
        // console.log("getUserAccountType : ", user)
    }

    const setUserEmail = async () => {
        await AsyncStorage.setItem('email', email)
    }
    const getUserEmail = async () => {
        const email = await AsyncStorage.getItem('email')
        setEmail(email)
    }

    useEffect(() => {
        getUserEmail()
    }, [])


    const getUserProfile = async () => {
        // Fetch user data from Firestore to determine userType
        console.log("getUserProfile")
        const userDocSnapshot = await getDoc(doc(db, 'Profile', email));
        const userData = userDocSnapshot.data()
        const user = userData.userType
        console.log(user)
        setUser(user)
        setUserType(user)
        setUserAccountType(user)
        getUserAccountType()
        if (userType === "victim") {
            navigation.navigate("Home")
        } else {
            navigation.navigate("OfficerHomeScreen")
        }
    }

    // function for account login
    const AccountLogin = async () => {
        try {
            // console.log("login")
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            setUserEmail() //set user email in the async storage
            getUserProfile() // get user type (victim or officer) from the firestore database

            // when user signin move to the usertype screen
            // if (userType === "victim") {
            //     navigation.navigate("Home")
            // }
            // else {
            //     navigation.navigate("OfficerHomeScreen")
            // }
        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Heading title='Evidence' />
            </View>
            <View style={styles.title_view}>
                <Text style={styles.title}>Enter your details below to Sign In</Text>
            </View>
            <Input styles={styles.input} keyboardType="email-address" placeholder="Email" onChangeText={(t) => setEmail(t)} />
            <Input styles={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(t) => setPassword(t)} />
            <View style={styles.terms_view}>
                <Text style={styles.forgotpwd} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password</Text>
            </View>
            <Button styles={{ backgroundColor: "#1CAC79", marginTop: 40, }} text="Sign In" onPress={() => AccountLogin()} />
            <View style={styles.signup}>
                <Text>Already have an account?  </Text>
                <Text onPress={() => { navigation.navigate("SignUp") }} style={{ fontWeight: 'bold' }}>Sign Up</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    heading_view: {
        alignSelf: 'center'
    },
    heading: {
        fontSize: 40
    },
    title_view: {
        marginTop: 20,
        alignSelf: 'center'
    },
    title: {
        fontSize: 15
    },
    terms_view: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    terms: {
        fontSize: 15
    },
    input: {
        marginTop: 40,
        height: 55,
    },
    forgotpwd: {
        textAlign: 'right',
        fontWeight: 'bold'
    },
    signup: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center'
    }
})
export default SignIn;