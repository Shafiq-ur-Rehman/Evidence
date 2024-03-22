import { View, Text, StyleSheet } from "react-native";

const Heading = (props) => {
    return (
        <View style={[styles.heading_view, props.styles]}>
            <Text style={styles.heading}>{props.title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    heading_view: {
        alignSelf: 'center',
        marginTop:50,
    },
    heading: {
        fontSize: 40,
    },
})
export default Heading;