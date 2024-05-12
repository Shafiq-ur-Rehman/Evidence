import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Case = (props) => {
    
    return (
        <TouchableOpacity style={styles.case} onPress={() => { props.onPress() }}>
            <View style={styles.imgview}  >
                <Image style={styles.img} source={{uri:props.img}} />
            </View>
            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>ID: </Text>
                    <Text style={{}}>{props.id} </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, width: '50%', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, }}>Title: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 12,}} numberOfLines={2}>{props.title} </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, width: '60%', marginRight: 20, }}>
                    <Text style={{ fontSize: 12, }} numberOfLines={5}>{props.details}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    case: {
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 20,
        borderColor: '#172438',
        borderWidth: 1,
        borderRadius: 12,
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
        width: 115, height: 150,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    body: {
        flexDirection: 'column',
        width: '90%'
    },
})

export default Case;