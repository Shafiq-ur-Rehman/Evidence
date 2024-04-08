import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heading from "../components/Heading";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";

const OfficerHomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/blob.png')} resizeMode="stretch" style={styles.bg_img} >
                <View style={styles.heading}>
                    <LeftIcon source={require('../../assets/notification.png')} onPress={() => { }} />
                    <View style={{}}>
                        <Heading title='Evidence' />
                    </View>
                    <RightIcon styles={{ height: 45, width: 45 }} source={require('../../assets/usericon.png')} onPress={() => { navigation.navigate('Profile') }} />
                </View>
                <View style={styles.illustration}>
                    <Image source={require('../../assets/homeillustration.png')} />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('UnSolvedCases') }}>
                    <Image style={styles.img} source={require('../../assets/moi.jpg')} />
                    <Text style={styles.txt}>Unsolved Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("SolvedCases") }}>
                    <Image style={styles.img} source={require('../../assets/moi.jpg')} />
                    <Text style={styles.txt}>Solved Cases</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bg_img: {
        width: "100%",
        height: "75%"
    },
    notification: {
        marginLeft: 10,
        marginTop: 50,
        justifyContent: 'center'
    },
    user_icon: {
        marginTop: 50,
        marginRight: 10,
        justifyContent: 'center'
    },
    illustration: {
        alignSelf: 'center',
        marginTop: 40,
    },
    img: {
        marginTop: 20,
        height: 160,
        width: 250,
        borderRadius: 20,
        borderWidth: 1,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    txt: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default OfficerHomeScreen;