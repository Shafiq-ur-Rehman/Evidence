import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heading from "../components/Heading";
import Input from "../components/TextInput"
import Button from "../components/Button";

const SignIn = () => {
    const navigation = useNavigation();

    // Email
    const [email, setEmail] = useState(null)

    // Password
    const [password, setPassword] = useState(null)

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Heading title='Evidence' />
            </View>
            <View style={styles.title_view}>
                <Text style={styles.title}>Enter your details below to Sign In</Text>
            </View>
            <Input styles={{ marginTop: 40, height: 55, }} keyboardType="email-address" placeholder="Email" onChangeText={(t) => setEmail(t)} />
            <Input styles={{ marginTop: 40, height: 55, }} placeholder="Password" onChangeText={(t) => setPassword(t)} />
            <View style={styles.terms_view}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password</Text>
            </View>
            <Button styles={{ backgroundColor: "#1CAC79", marginTop: 40, }} text="Sign In" onPress={() => { navigation.navigate("Home") }} />
            <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
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
})
export default SignIn;