import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Heading from "../components/Heading";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";

const CaseStatus = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const caseDetails = route.params
    console.log(caseDetails)
    // console.log(caseDate)

    const [status, setStatus] = useState(true)

    useEffect(() => {
        // console.log("Case Status")
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                <Heading title='Case Status' />
                {status ?
                    <RightIcon styles={{ height: 45, width: 45 }} source={require('../../assets/chat.png')} onPress={() => { navigation.navigate("Chat") }} />
                    :
                    <View style={styles.righticon}>
                    </View>
                }
            </View>
            <FlatList
                data={caseDetails}
                renderItem={({ item }) => {
                    // {console.log(caseDetails)}
                    return (
                        <View style={{ flexDirection: 'column', marginLeft: 20, }}>
                            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#1CAC79' }} />
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={{ marginLeft: 10, marginTop: 24, fontSize: 20 }}>{item.caseStatus}</Text>
                                    <Text style={{ marginLeft: 10, fontSize: 15 }}>{item.caseDate}</Text>
                                    <Text style={{ marginLeft: 10, fontSize: 15 }}>{item.officerRemarks}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
                }
                keyExtractor={item => item.caseDate}
            />
            {/* <View style={{ flexDirection: 'column', marginLeft: 20, }}>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#1CAC79' }} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ marginLeft: 10, marginTop: 24, fontSize: 20 }}>{caseStatus}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{caseDate}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{officerRemarks}</Text>
                    </View>
                </View>
            </View> */}
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
export default CaseStatus;