import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Input from "../components/TextInput"
import Button from "../components/Button";
import Heading from "../components/Heading";

const SignUp = () => {
    const navigation = useNavigation();

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
    const [confirm, setConfirm] = useState(null);
    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    const signInWithPhoneNumber = async () => {
        console.log('signin')
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        console.log(confirmation)
        // navigation.navigate("Home")
    }

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Heading title='Evidence' />
            </View>
            <View style={styles.title_view}>
                <Text style={styles.title}>Enter your details below to Sign Up</Text>
            </View>
            <Input styles={{ marginTop: 20, height: 55, }} placeholder="Name" onChangeText={(t) => setName(t)} />
            <Input styles={{ marginTop: 20, height: 55, }} placeholder="Emirates ID" onChangeText={(t) => setEmiratesID(t)} />
            <Input styles={{ marginTop: 20, height: 55, }} keyboardType="email-address" placeholder="Email" onChangeText={(t) => setEmail(t)} />

            <Input styles={{ marginTop: 20, height: 55, }} keyboardType="phone-pad" placeholder="Phone Number" onChangeText={(t) => setPhoneNumber(t)} />

            <Input styles={{ marginTop: 20, height: 55, }} placeholder="Password" onChangeText={(t) => setPassword(t)} />
            <Input styles={{ marginTop: 20, height: 55, }} placeholder="Retype Password" onChangeText={(t) => setConfirmPassword(t)} />
            <View style={styles.terms_view}>
                <Text style={styles.terms}>By Clicking Register you are agree with</Text>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Terms & Conditions</Text>
            </View>
            <Button styles={{ backgroundColor: "#1CAC79", }} text="Sign Up" onPress={() => signInWithPhoneNumber()} />
            <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
                <Text>Already have an account?  </Text>
                <Text onPress={() => { navigation.navigate("SignIn") }} style={{ fontWeight: 'bold' }}>Sign In</Text>
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
        alignSelf: 'center'
    },
    terms: {
        fontSize: 15
    },
})
export default SignUp;