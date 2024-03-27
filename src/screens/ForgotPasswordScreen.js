import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";



import Heading from "../components/Heading";
import Input from "../components/TextInput";
import Button from "../components/Button";

const ForgotPassword = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState()

    const auth = getAuth()

    const passwordReset = () => {
        try {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password reset email sent on your email")
                })
        } catch (error) {
            const errorCode = error.code;
            alert(error.message);
            alert(error)
        }
    }

    return (
        <View style={styles.container}>
            <Heading title="Forgot Password" />
            <View style={styles.title_view}>
                <Text style={styles.title}>Enter your Phone Number to recover your Password</Text>
            </View>
            <Input styles={{ marginTop: 40, height: 55, }} keyboardType="email-address" placeholder="Email" onChangeText={(t) => setEmail(t)} />
            <Button styles={{ backgroundColor: "#1CAC79", marginTop: 40, }} text="Forgot Passsword" onPress={() => { passwordReset() }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title_view: {
        marginTop: 20,
        alignSelf: 'center'
    },
    title: {
        fontSize: 15
    },
})

export default ForgotPassword;