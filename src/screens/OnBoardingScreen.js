import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Button from "../components/Button";
import Heading from "../components/Heading";

const BoardingScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{}}>
                <Heading title='Evidence' />
            </View>
            <View style={{ marginTop: 15, marginHorizontal: 40 }}>
                <Text style={styles.title}>We care about your privacy and security</Text>
            </View>
            <View style={{ marginTop: 25, marginHorizontal: 40 }}>
                <Image style={styles.img} source={require('../../assets/logo.png')} />
            </View>
            <View style={{ marginTop: 25, marginHorizontal: 40 }}>
                <View>
                    <Text style={styles.slogan}>Our Duty</Text>
                </View>
                <View>
                    <Text style={styles.slogan1}>Your Safety</Text>
                </View>
                <View>
                    <Text style={styles.slogan}>A Bond We Hold Sacred</Text>
                </View>
            </View>
            <Button styles={{ backgroundColor: "#172438", width: 216, alignSelf: 'center', }} text="Sign Up" onPress={() => { navigation.navigate('SignUp') }} />
            <Button styles={{ backgroundColor: "#1CAC79", width: 216, alignSelf: 'center', }} text="Sign In" onPress={() => { navigation.navigate('SignIn') }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        alignSelf: "center",
        textAlign: 'center',
        fontSize: 20,
    },
    img: {
        alignSelf: 'center',
    },
    slogan: {
        alignSelf: "center",
        textAlign: 'center',
        fontSize: 26,
    },
    slogan1: {
        alignSelf: "center",
        textAlign: 'center',
        color: "#1CAC79",
        fontSize: 26,
    },
});

export default BoardingScreen;