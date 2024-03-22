import { View, Text, StyleSheet } from "react-native";

const InfoCard = (props) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 30, }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, width: '35%' }}>{props.title}: </Text>
            <View style={{ borderBottomWidth: 0.2, width: '65%' }}>
                <Text style={{ marginTop: 20, fontSize: 15, }} >{props.value}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
})
export default InfoCard;