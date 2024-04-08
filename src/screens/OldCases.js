import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getFirestore, getDocs, query, doc, addDoc, collection, where } from 'firebase/firestore'
import firebase from "../config/Firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

import Heading from "../components/Heading";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import Case from "../components/Case";

const OldCases = () => {
    
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [caseData, setCaseData] = useState([])
    const [loading, setLoading] = useState(true)

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
        const loadCasesData = async () => {
            if (email) {
                let complaints = []
                const q = query(collection(db, "Cases"), where("email", "==", email))
                try {
                    const casesDetails = await getDocs(q)
                    casesDetails.forEach((doc) => {
                        console.log(doc.id, "==>", doc.data());
                        complaints.push(doc.data())
                    })
                    setCaseData(complaints)
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
                <Heading title='Evidence' />
                <RightIcon styles={{ marginRight: 45 }} />
            </View>
            {loading ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <FlatList
                    data={caseData}
                    renderItem={({ item }) => {
                        // { console.log(item.caseStatus) }
                        // { console.log(item.caseDate) }

                        return (
                            // {data:{item.caseStatus,item.caseDate}}

                            <Case id={item.caseId} img={item.image} title={item.title} details={item.complainText} onPress={() => { navigation.navigate("CaseStatus", {caseStatus: item.caseStatus, caseDate: item.caseDate}) }} />
                        )
                    }
                    }
                    keyExtractor={item => item.caseId}
                />

            }
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default OldCases;