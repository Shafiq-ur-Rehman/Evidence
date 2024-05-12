import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView, Keyboard, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, setDoc, doc, serverTimestamp, addDoc, collection, Timestamp } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';


import Heading from "../components/Heading";
import Input from "../components/TextInput";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";

const NewCase = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { title, email, image, complainText } = route.params.data;

    const [caseId, setCaseId] = useState("")
    const [emiratesID, setEmiratesID] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const [idCardImage, setIdCardImage] = useState("")
    const [loading, setLoading] = useState(false)

    const [caseDetails, setCaseDetails] = useState([])
    const [caseStatus, setCaseStatus] = useState('submitted');
    const [caseDate, setCaseDate] = useState("")
    const [remarks, setRemarks] = useState('');


    const db = getFirestore(firebase);

    useEffect(() => {
        geIdandDate()
    }, [])

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            // console.log(result.assets[0].uri);

            if (!result.canceled) {
                setIdCardImage(result.assets[0].uri);
            }
            else {
                alert("you did not select any images")
            }
        } catch (error) {
            alert(error)
        }
    };
    // case submission date ----> date function and generate case id
    const geIdandDate = async () => {
        let objectDate = new Date()
        let day = objectDate.getDate()
        let month = objectDate.getMonth()
        let year = objectDate.getFullYear()
        let hour = objectDate.getHours()
        let minutes = objectDate.getMinutes()
        let seconds = objectDate.getSeconds()
        let milisecond = objectDate.getMilliseconds()
        let fullDate = day + "/" + (month + 1) + "/" + year;
        let time = hour+":"+minutes+":"+seconds;
        let id = day + "-" + (month + 1) + "-" + year + "-" + hour + "-" + minutes + "-" + seconds + "-" + milisecond;
        // set case date
        setCaseDate(fullDate+"-"+time)

        // if (caseStatus !== "" && caseDate !== "") {
        //     const newCase = { "caseStatus": caseStatus, "caseDate": caseDate, "remarks": remarks }
        //     setCaseDetails([...caseDetails, newCase])
        // }
        //set case id
        setCaseId(id)

    }
    // const addCaseInformation = async () => {
    //     setCaseStatus("Submitted")
    //     setRemarks("")

    //     if (caseStatus !== "" && caseDate !== "") {
    //         const newCase = { "caseStatus": caseStatus, "caseDate": caseDate, "remarks": remarks }
    //         setCaseDetails([...caseDetails, newCase])
    //     }
    //     console.log("caseDetails: ", caseDetails)

    // }

    useEffect(() => {
        geIdandDate()
    }, [])

    const submitComplaint = async () => {
        await geIdandDate()
        // set case status 
        // await addCaseInformation()
        try {
            if (title !== "" && complainText !== "" && image !== "" && emiratesID !== ""
                && fatherName !== "" && motherName !== "" && idCardImage !== "" && !caseId !== "") {
                setLoading(true)
                // set Case Id and date

                console.log("submitted button clicked")
                // set complete case details in firestore database

                console.log(caseDetails)
                const document = doc(db, "Cases", caseId)
                await setDoc(document, { caseId, title, email, complainText, image, emiratesID, fatherName, motherName, idCardImage, caseDetails:[{"caseStatus": caseStatus, "caseDate": caseDate, "remarks": remarks}] })
                    .then(() => {
                        setLoading(false)
                        alert('Your Complaint has been submitted')
                        navigation.navigate("Home")
                    })
                    .catch((error) => {
                        throw new error
                    })
            }
            else {
                throw new Error("Please Complete the form")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <ScrollView style={styles.container} onPress={Keyboard.dismiss}>
                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                        <Heading title='New Case' />
                        <RightIcon styles={{ marginRight: 45 }} />
                    </View>
                    {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.title}>Emirates ID</Text>
                        <Input styles={styles.input} keyboardType="numeric" onChangeText={(t) => setEmiratesID(t)} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.title}>Father Name</Text>
                        <Input styles={styles.input} onChangeText={(t) => setFatherName(t)} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.title}>Mother Name</Text>
                        <Input styles={styles.input} onChangeText={(t) => setMotherName(t)} />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.title}>Attach File</Text>
                        {idCardImage ?
                            <Image style={styles.image} source={{ uri: idCardImage }} />
                            :
                            <TouchableOpacity style={styles.uploadImg} onPress={() => pickImage()}>
                                <Text style={styles.uploadtxt}  > Upload Evidence</Text>
                            </TouchableOpacity>
                        }

                    </View>

                    <Button styles={styles.submitButton} text="Submit" onPress={() => submitComplaint()} />

                    {/* <Input styles={{marginTop:20,}} numberOfLines={4}  placeholder="Write your complain in details here" /> */}
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    title: {
        marginHorizontal: 30,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        height: 55,
    },
    uploadtxt: {
        marginVertical: 20,
        color: '#1CAC79',
        fontSize: 20
    },
    uploadImg: {
        marginTop: 10,
        marginHorizontal: 30,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderColor: '#172438',
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    image: {
        alignSelf: 'center',
        width: 150,
        height: 150,
    },
    submitButton: {
        marginTop: 80,
        backgroundColor: "#1CAC79",
    }
})

export default NewCase;