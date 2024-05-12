import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { useNavigation, useRoute } from "@react-navigation/native";

import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import Case from "../components/Case";

const SolvedCaseDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const item = route.params

    const [status, setStatus] = useState(true)
    console.log(item)

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Case Solved' />
                <View style={styles.righticon}>
                </View>
            </View>
            <View>
                <View style={styles.titleView} >
                    <Text style={styles.title} >Title</Text>
                    <Text style={styles.titleText} >{item.title}</Text>
                </View>
                <View style={styles.imgview}  >
                    <Image style={styles.img} source={{ uri: item.image }} />
                </View>
                <View style={styles.descriptionview}  >
                    <Text style={styles.description}>Case Description</Text>

                </View>
                <View style={{ borderWidth: 1, marginHorizontal: 10, marginVertical: 10, borderStyle: 'dashed', height: 180, alignContent: "stretch" }}>
                    <Text style={styles.descriptionText}>{item.complainText}</Text>
                </View>
            </View>
        </View>
    )
}

export default SolvedCaseDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    righticon: {
        marginRight: 50,
    },
    titleView: {
        margin: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleText: {
        marginTop: 10,
        fontSize: 17,
    },
    righticon: {
        marginRight: 55,
    },
    imgview: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 6,
        backgroundColor: '#172438'
    },
    img: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: "80%", height: 250,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    descriptionview: {
        marginLeft: 10,
        marginTop: 10,
    },
    description: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    descriptionText: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
})