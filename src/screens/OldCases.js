import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import Case from "../components/Case";

const OldCases = () => {
    const navigation = useNavigation()
    const DATA = [
        {
            id: 'bd7acbea1',
            title: 'First Item',
            officer: 'Saim',
            img: require('../../assets/fingerprint.png'),
            move: 'CaseStatus',
            details: 'Complaint: Someone hack my computer my personal and steal my  data, now he is blackmailing me.'
        },
        {
            id: 'bd7accea2',
            officer: 'Ali',
            img: require('../../assets/fingerprint.png'),
            move: 'CaseStatus',
            details: 'Complaint: Someone hack my computer my personal and steal my  data, now he is blackmailing me.'
        },
        {
            id: 'bd7acdea3',
            officer: 'Ahmed',
            img: require('../../assets/fingerprint.png'),
            move: 'CaseStatus',
            details: 'Complaint: Someone hack my computer my personal and steal my  data, now he is blackmailing me.'
        },
    ];


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Evidence' />
                <RightIcon styles={{ marginRight: 45 }} />
            </View>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Case id={item.id} img={item.img} officer={item.officer} details={item.details} onPress={() => { navigation.navigate(item.move) }} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default OldCases;