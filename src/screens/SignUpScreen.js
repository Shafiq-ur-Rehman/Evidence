import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Platform, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import firebase from "../config/Firebase"

import Input from "../components/TextInput"
import Button from "../components/Button";
import Heading from "../components/Heading";

const SignUp = () => {
    const navigation = useNavigation();

    const [userType, setUserType] = useState('victim');
    // Name
    const [name, setName] = useState(null)
    // Emirates ID
    const [emiratesID, setEmiratesID] = useState(null)
    // Email
    const [email, setEmail] = useState(null)
    // Phone Number
    const [phoneNumber, setPhoneNumber] = useState(null)
    // Password
    const [password, setPassword] = useState(null)
    // Confirm Password
    const [confirmPassword, setConfirmPassword] = useState(null)
    // confirmaiton
    const [loading, setLoading] = useState(false);
    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    const auth = getAuth()
    const db = getFirestore(firebase);

    const createAccountWithEmail = async () => {
        try {
            console.log('Sign Up')
            if (name !== "" && emiratesID !== "" && email !== "" && password !== "" && confirmPassword !== "" && phoneNumber !== "") {
                if (password !== confirmPassword) {
                    throw new Error("Password Doest not match");
                }
                else {
                    setLoading(true)
                     await createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user
                             setDoc(doc(db, "Profile", email), { name, userType, emiratesID, phoneNumber, email })
                                .then(() => {
                                    setLoading(false)
                                    navigation.navigate("Home")
                                    alert('your account has been created')
                                }).catch((e) => {
                                    console.log(e)
                                })
                        })
                        .catch((error) => {
                            const errorCode = error.code
                            const errorMessage = error.message
                            alert(error)
                        });
                }
            }

        } catch (error) {
            alert(error)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <ScrollView onPress={Keyboard.dismiss}>
                <View >
                    <View style={{}}>
                        <Heading title='Evidence' />
                    </View>
                    <View style={styles.title_view}>
                        <Text style={styles.title}>Enter your details below to Sign Up</Text>
                    </View>
                    {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}

                    <Input styles={styles.input} placeholder="Name" onChangeText={(t) => setName(t)} />
                    <Input styles={styles.input} placeholder="Emirates ID" onChangeText={(t) => setEmiratesID(t)} />
                    <Input styles={styles.input} keyboardType="email-address" placeholder="Email" autoCapitalize='none' autoCorrect={false} onChangeText={(t) => setEmail(t)} />

                    <Input styles={styles.input} keyboardType="phone-pad" placeholder="Phone Number" onChangeText={(t) => setPhoneNumber(t)} />

                    <Input styles={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(t) => setPassword(t)} />
                    <Input styles={styles.input} placeholder="Retype Password" secureTextEntry={true} onChangeText={(t) => setConfirmPassword(t)} />
                    <View style={styles.terms_view}>
                        <Text style={styles.terms}>By Clicking Register you are agree with</Text>
                        <Text style={styles.condition}>Terms & Conditions</Text>
                    </View>
                    <Button styles={{ backgroundColor: "#1CAC79", }} text="Sign Up" onPress={() => createAccountWithEmail()} />
                    <View style={styles.signin}>
                        <Text>Already have an account?  </Text>
                        <Text onPress={() => { navigation.navigate("SignIn") }} style={{ fontWeight: 'bold' }}>Sign In</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        alignSelf: 'center'
    },
    terms: {
        fontSize: 15
    },
    input: {
        marginTop: 20,
        height: 55,
    },
    condition: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    signin: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center'
    }
})
export default SignUp;