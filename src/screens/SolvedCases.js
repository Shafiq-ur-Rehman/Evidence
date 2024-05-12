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


const SolvedCases = () => {
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
                const q = query(collection(db, "Cases"))
                try {
                    const casesDetails = await getDocs(q)
                    casesDetails.forEach((doc) => {
                        // console.log(doc.id, "==>", doc.data());
                        complaints.push(doc.data())
                    })
                    complaints.forEach(element => {
                        // console.log(element.caseDetails)
                        element.caseDetails.forEach(cs => {
                            console.log("cs: ", cs.caseStatus)
                            // check if case status is closed and officer email is same
                            if (cs.caseStatus === "closed") {
                                setCaseData(complaints)
                            }
                            else {
                                console.log(caseData)
                            }
                        })
                        // if (element.fatherName !== fatherName && element.motherName !== motherName) {
                        //     // console.log(element.fatherName)
                        //     setCaseData(complaints)
                        // }
                    });

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
                <Heading title='Solved Cases' />
                <View style={styles.righticon}>
                </View>
            </View>
            {loading ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                (caseData.length !== 0 ?

                    < FlatList
                        data={caseData}
                        renderItem={({ item }) => {
                            return (
                                // {data:{item.caseStatus,item.caseDate}}
                                <Case id={item.caseId} img={item.image} title={item.title} details={item.complainText} onPress={() => { navigation.navigate("SolvedCaseDetails", item) }} />
                            )
                        }
                        }
                        keyExtractor={item => item.caseId}
                    />
                    :
                    // <Button styles={{ backgroundColor: "#1CAC79", marginTop: 40, }} text="Sign In" onPress={() => AccountLogin()} />
                    <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 50 }}>
                        <Text >No Data Available</Text>
                    </View>

                )

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

export default SolvedCases;