import { TouchableOpacity, Image, Text, StyleSheet, } from "react-native";

const LeftIcon = (props) => {
    return (
        <TouchableOpacity style={[styles.icon, props.styles]} onPress={()=>{props.onPress()}}>
            <Image source={props.source}  />
        </TouchableOpacity>
    )
}
const styles  = StyleSheet.create({
    icon: {
        marginLeft:10,
        marginTop:50,
        justifyContent: 'center'
    },
})

export default LeftIcon;