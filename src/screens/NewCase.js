import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "expo-checkbox";

import LeftIcon from "../components/TopLeftIcon";
import Heading from "../components/Heading";
import Input from "../components/TextInput";
import Button from "../components/Button";
import RightIcon from "../components/TopRightIcon";

const NewCase = () => {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Evidence'  />
                <RightIcon styles={{marginRight:45}}/>
            </View>
            <View style={{ marginTop: 20 }}>
                <TextInput
                    multiline
                    numberOfLines={12}
                    style={{
                        marginHorizontal: 30,
                        borderWidth: 1,
                        textAlignVertical: 'top',
                        borderRadius: 12,
                        padding: 10,
                        backgroundColor: '#F0F0F0'
                    }}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Write your complain in details here"
                />
                <TouchableOpacity style={{ marginTop: 30, marginHorizontal: 30, alignItems: 'center', backgroundColor: '#f0f0f0', borderColor: '#172438', borderWidth: 1, borderStyle: 'dashed', }}>
                    <Image style={{ marginTop: 20, }} source={require("../../assets/upload.png")} />
                    <Text style={{ marginVertical: 20, }}  > Upload Evidence</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 30, justifyContent: 'center', alignItems: 'center', }} >
                    <Text>Is your complain related to old case? Click Here</Text>
                    <CheckBox style={{ marginLeft: 10, }}
                        value={isSelected}
                        onValueChange={() => setSelection(!isSelected)}
                    />
                </View>

                {isSelected
                    ?
                    <View style={{ marginTop: 30, }}><Input styles={{ height: 55, backgroundColor: '#f0f0f0', }} placeholder="Enter Case Id" /></View>
                    :
                    <View style={{ marginTop: 30, height: 55, }}></View>
                }
                <Button styles={{ marginTop: 40, backgroundColor: "#1CAC79", }} text="Continue" onPress={() => { navigation.navigate("NewCase1") }} />
            </View>
            {/* <Input styles={{marginTop:20,}} numberOfLines={4}  placeholder="Write your complain in details here" /> */}
        </View>
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
        marginTop:50,
        marginRight: 10,
        justifyContent: 'center'
    },
})

export default NewCase;