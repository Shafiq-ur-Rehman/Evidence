import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


import Heading from "../components/Heading";
import Input from "../components/TextInput";
import Button from "../components/Button";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";

const NewCase = () => {
    const [number, onChangeNumber] = React.useState(null);
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Old Cases'  />
                <RightIcon styles={{marginRight:45}}/>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ marginHorizontal: 30, fontWeight: 'bold' }}>Emirates ID</Text>
                <Input styles={{ marginTop: 10, height: 55, }} keyboardType="numeric" />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginHorizontal: 30, fontWeight: 'bold' }}>Father Name</Text>
                <Input styles={{ marginTop: 10, height: 55, }} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginHorizontal: 30, fontWeight: 'bold' }}>Mother Name</Text>
                <Input styles={{ marginTop: 10, height: 55, }} />
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={{ marginHorizontal: 30, fontWeight: 'bold' }}>Attach File</Text>
                <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 30, alignItems: 'center', backgroundColor: '#f0f0f0', borderColor: '#172438', borderWidth: 1, borderStyle: 'dashed', }}>
                    <Text style={{ marginVertical: 20, color: '#1CAC79', fontSize:20 }}  > Upload Evidence</Text>
                </TouchableOpacity>
            </View>


            <Button styles={{ marginTop: 80, backgroundColor: "#1CAC79", }} text="Submit" onPress={() => { navigation.navigate("Home") }} />

            {/* <Input styles={{marginTop:20,}} numberOfLines={4}  placeholder="Write your complain in details here" /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'

    }
})

export default NewCase;