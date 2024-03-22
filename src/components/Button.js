import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = (props) => {
    return (
        <TouchableOpacity onPress={() =>props.onPress() } style={[styles.button, props.styles]}>
            <Text style={styles.txt}>{props.text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        marginHorizontal: 30,
        height: 60,
        borderRadius:45,
        justifyContent: 'center',
    },
    txt: {
        color: "#fff",
        alignSelf: 'center',
        fontSize: 25,
    }
})

export default Button;