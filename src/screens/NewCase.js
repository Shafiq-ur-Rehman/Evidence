import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView, Keyboard, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import CheckBox from "expo-checkbox";

import LeftIcon from "../components/TopLeftIcon";
import Heading from "../components/Heading";
import Input from "../components/TextInput";
import Button from "../components/Button";
import RightIcon from "../components/TopRightIcon";
import { list } from "firebase/storage";

const NewCase = () => {
    const navigation = useNavigation()

    const [caseId, setCaseId] = useState("")
    const [complainText, setComplainText] = useState("");
    const [title, setTitle] = useState("")
    const [email, setEmail] = useState("")
    const [isSelected, setSelection] = useState(false);
    const [loading, setLoading] = useState(false)

    const [caseDetails, setCaseDetails] = useState([])
    const [caseStatus, setCaseStatus] = useState(null);
    const [image, setImage] = useState("")

    const db = getFirestore(firebase);

    useEffect(() => {
        getUserEmail()
    }, [])

    const getUserEmail = async () => {
        const email = await AsyncStorage.getItem('email')
        setEmail(email)
        // console.log(email)
    }

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
                setImage(result.assets[0].uri);
            }
            else {
                alert("you did not select any images")
            }
        } catch (error) {
            alert(error)
        }
    };
    // check the old case status if case is solved then allow to put the new complaints
    const submitComplaint = async () => {
        setLoading(true)
        try {
            if (caseId !== "") {
                // get the previous case value
                const caseData = await getDoc(doc(db, "Cases", caseId))
                if (caseData.exists()) {
                    setCaseDetails(caseData.data().caseDetails)
                    const caseValue = caseData.data().caseDetails
                    // console.log("caseValue, ", caseValue)
                    // console.log(caseDetails.length )
                    if (caseValue.length > 0) {
                        // console.log("caseList : ", caseDetails[caseDetails.length - 1])
                        let caseobj = caseValue[caseValue.length - 1]
                        if (caseobj.caseStatus === "solved") {
                            if (title !== "" && complainText !== "" && image !== "") {
                                await updateDoc(doc(db, "Cases", caseId), { title, complainText, image })
                                    .then(() => {
                                        setLoading(false)
                                        alert('Your complaint has been submitted')
                                    }).catch((e) => {
                                        console.log(e)
                                    })
                            } else {
                                setLoading(false)
                                throw new Error("Please Complete the form")
                            }
                        } else {
                            setLoading(false)
                            throw new Error("Your case is in process")
                        }

                    } else {
                        setLoading(false)
                        throw new Error("The provided caseId is incorrect or does not exist in the database.");
                    }

                } else {
                    throw new Error("Please Enter a valid Case Id")
                }

            } else {
                setLoading(false)
                throw new Error("Case Id can not be empty")

            }

        } catch (error) {
            alert(error)
        }
    }

    const nextScreen = () => {
        try {
            if (title !== "" && complainText !== "" && image !== "") {
                navigation.navigate("NewCase1", { data: { title, email, image, complainText } })
            } else {
                throw new Error("Please Complete the form");
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container} onPress={Keyboard.dismiss}>
            <ScrollView  >
                <View style={styles.container} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                        <Heading title='Evidence' />
                        <RightIcon styles={{ marginRight: 45 }} />
                    </View>
                    {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                    <Input styles={styles.input} placeholder="Title" onChangeText={(t) => setTitle(t)} />
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(t) => setComplainText(t)}
                            placeholder="Write your complain in details here"
                        />
                        {
                            image ?
                                <Image style={styles.image} source={{ uri: image }} />
                                :
                                <TouchableOpacity style={styles.uploadDocuments} onPress={() => pickImage()}>
                                    <View>
                                        <Image style={styles.uploadicon} source={require("../../assets/upload.png")} />
                                        <Text style={{ marginTop: 20 }}  > Upload Evidence</Text>
                                    </View>
                                </TouchableOpacity>
                        }
                        <View style={styles.oldcase} >
                            <Text>Is your complain related to old case? Click Here</Text>
                            <CheckBox style={{ marginLeft: 10, }}
                                value={isSelected}
                                onValueChange={() => setSelection(!isSelected)}

                            />
                        </View>
                        {isSelected
                            ?
                            <View>
                                <View style={{ marginTop: 30, }}>
                                    <Input styles={{ height: 55, backgroundColor: '#f0f0f0', }} placeholder="Enter Case Id" onChangeText={(t) => setCaseId(t)} />
                                </View>
                                <Button styles={{ marginTop: 40, backgroundColor: "#1CAC79", }} text="Submit" onPress={() => submitComplaint()} />
                            </View>
                            :
                            <View>
                                <View style={{ marginTop: 30, height: 55, }}></View>
                                <Button styles={{ marginTop: 40, backgroundColor: "#1CAC79", }} text="Continue" onPress={() => { nextScreen() }} />
                            </View>
                        }
                    </View>
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
    notification: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    user_icon: {
        marginTop: 50,
        marginRight: 10,
        justifyContent: 'center'
    },
    input: {
        marginTop: 40,
        height: 55,
        backgroundColor: '#F0F0F0'
    },
    textInput: {
        marginHorizontal: 30,
        borderWidth: 1,
        textAlignVertical: 'top',
        borderRadius: 12,
        padding: 10,
        height: 150,
        backgroundColor: '#F0F0F0'
    },
    uploadDocuments: {
        marginTop: 30,
        marginHorizontal: 30,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderColor: '#172438',
        borderWidth: 1,
        height: 150,
        borderStyle: 'dashed',
    },
    image: {
        marginTop: 10,
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    uploadicon: {
        marginTop: 20,
        alignSelf: 'center'
    },
    oldcase: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default NewCase;