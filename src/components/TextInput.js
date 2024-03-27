import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
    return (
        <View style={styles.input_view}>
            <TextInput
                style={[styles.input, props.styles]}
                keyboardType={props.keyboardType}
                numberOfLines={props.numberOfLines}
                placeholder={props.placeholder}
                onChangeText={(t) => props.onChangeText(t)}
                secureTextEntry={props.secureTextEntry}
                
            />
        </View>
    )
}
const styles = StyleSheet.create({
    input_view: {
        marginHorizontal: 30,
    },
    input: {
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#000000'
    }
})
export default Input;