import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, useRoute } from "@react-navigation/native";
import {doc, updateDoc, getFirestore, getDoc } from 'firebase/firestore'
import firebase from "../config/Firebase"


import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";


const CaseProgress = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const item = route.params
    console.log(item.caseDetails)

    const db = getFirestore(firebase);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [caseDetails, setCaseDetails] = useState([])
    const [caseDate, setCaseDate] = useState("")
    const [caseStatus, setCaseStatus] = useState("")
    const [remarks, setRemarks] = useState("")

    const data = [
        { label: 'Under Investigation', value: 'Under Investigation' },
        { label: 'Under Trial', value: 'Under Trial' },
        { label: 'solved', value: 'solved' },

    ];

    const getDate = async () => {
        let objectDate = new Date()
        let day = objectDate.getDate()
        let month = objectDate.getMonth()
        let year = objectDate.getFullYear()
        
        let fullDate = day + "-" + (month + 1) + "-" + year;
        
        // set case date
        setCaseDate(fullDate)
        //set case id
        
        await addCaseInformation()
    }

    const addCaseInformation = async () => {
        setCaseStatus(value)
        setCaseDetails([...caseDetails, { "caseStatus": caseStatus, "caseDate": caseDate, "remarks": remarks }])
        console.log(caseDetails)

    }
    const updateCase = async () => {
        getDate()
        const document = doc(db, "Cases", item.caseId);
        // Set the "capital" field of the city 'DC'
        await updateDoc(document, { caseDetails });
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <ScrollView onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                        <Heading title='Case Progress' />
                        <View style={styles.righticon}>
                        </View>
                    </View>
                    <View>
                        <View style={styles.titleView}  >
                            <Text style={styles.title} >ID</Text>
                            <Text style={styles.titleText} >{item.caseId}</Text>
                        </View>
                        <View style={styles.titleView} >
                            <Text style={styles.title} >Title</Text>
                            <Text style={styles.titleText} >{item.title}</Text>
                        </View>
                        <View style={styles.descriptionview}  >
                            <Text style={styles.description}>Officer Remarks</Text>
                        </View>

                        <View style={{ borderWidth: 1, marginHorizontal: 10, marginVertical: 10, height: 180, borderStyle: 'dashed', alignContent: "stretch" }}>
                            <TextInput
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(t) => setRemarks(t)}
                                placeholder="Write your Remarks here"
                            />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Case Status' : '...'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}

                            />
                        </View>
                        <Button styles={{ marginTop: 30, backgroundColor: "#1CAC79", }} text="Submit" onPress={() => updateCase()} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})

export default CaseProgress