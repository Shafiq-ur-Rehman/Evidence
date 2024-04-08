import { TouchableOpacity, Image, Text, StyleSheet, } from "react-native";

const RightIcon = (props) => {
    return (
        <TouchableOpacity style={[styles.icon, props.styles]} onPress={()=>{props.onPress()}}>
            <Image style={props.styles} source={props.source}  />
        </TouchableOpacity>
    )
}
const styles  = StyleSheet.create({
    icon: {
        marginRight:10,
        marginTop:50,
        justifyContent: 'center'
    },
})

export default RightIcon;