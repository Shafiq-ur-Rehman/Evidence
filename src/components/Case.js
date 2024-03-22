import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Case = (props) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 20, borderColor: '#172438', borderWidth: 1, borderRadius: 12, }} onPress={()=>{props.onPress()}}>
            <View style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 6, backgroundColor: '#172438' }}  >
                <Image style={{ marginHorizontal: 10, marginVertical: 10, width: 115, height: 150, alignSelf: 'center', resizeMode: 'contain' }} source={props.img} />
            </View>
            <View style={{ flexDirection: 'column', width: '90%' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Case ID: </Text>
                    <Text style={{}}>{props.id} </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, }}>Case Officer: </Text>
                    <Text style={{}}>{props.officer} </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, width: '60%', marginRight: 20, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, }} numberOfLines={5}>{props.details}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

})

export default Case;