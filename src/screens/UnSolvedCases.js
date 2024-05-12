import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getFirestore, getDocs, getDoc, query, doc, addDoc, collection, where } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import Case from "../components/Case";


const UnSolvedCases = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [caseData, setCaseData] = useState([])
    const [loading, setLoading] = useState(true)
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const db = getFirestore(firebase)

    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const email = await AsyncStorage.getItem('email')
                setEmail(email)
                // Fetch vicitm cases details from cloude firestore database
                // loadCasesData()
            } catch (error) {
                alert("Error fetching email from local storage: ", error)
            }
        }
        getUserEmail()
    }, [])

    useEffect(() => {
        const loadProfileData = async () => {
            if (email) {
                const victimRef = doc(db, "Profile", email)
                try {
                    const victimProfile = await getDoc(victimRef)

                    setFatherName(victimProfile.data().fatherName)
                    setMotherName(victimProfile.data().motherName)

                } catch (error) {
                    console.log("Error fetching cases details", error)
                }
            }
        }
        loadProfileData()
    }, [email])

    useEffect(() => {
        const loadCasesData = async () => {
            if (email) {
                let complaints = []
                const q = query(collection(db, "Cases"))
                try {
                    const casesDetails = await getDocs(q)
                    casesDetails.forEach((doc) => {
                        complaints.push(doc.data())
                    })
                    complaints.forEach(element => {
                        if (element.fatherName !== fatherName && element.motherName !== motherName) {
                            console.log(element.fatherName)
                            setCaseData(complaints)
                        }
                    });
                    console.log(complaints.length)
                    setLoading(false)

                } catch (error) {
                    console.log("Error fetching cases details", error)
                }
            }
        }
        loadCasesData()
    }, [email])


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='UnSolved Cases' />
                <View style={styles.righticon}>
                </View>
            </View>
            {loading ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <FlatList
                    data={caseData}
                    renderItem={({ item }) => {
                        return (
                            <Case id={item.caseId} img={item.image} title={item.title} details={item.complainText} onPress={() => { navigation.navigate("CaseDetails", item) }} />
                        )
                    }}
                    keyExtractor={item => item.caseId}
                />
            }
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    righticon: {
        marginRight: 50,
    },
})

export default UnSolvedCases;