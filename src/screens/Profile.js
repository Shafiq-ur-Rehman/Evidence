import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

import Heading from "../components/Heading";
import LeftIcon from "../components/TopLeftIcon";
import RightIcon from "../components/TopRightIcon";
import InfoCard from "../components/InfoCard";
import Button from "../components/Button";





const Profile = () => {
    const navigation = useNavigation()

    const logoutAccount = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View styles={styles.container}>
            <ImageBackground source={require('../../assets/pbimg.png')} style={styles.bg_img} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <LeftIcon source={require('../../assets/backarrow.png')} onPress={() => { navigation.goBack() }} />
                    <View style={{}}>
                        <Heading title='Profile' />
                    </View>
                    <RightIcon source={require('../../assets/edit.png')} onPress={() => { }} />
                </View>
                <Image style={styles.profile_img} source={require('../../assets/ppic.png')} />
                <Text style={styles.txt}>Ayesha Bilal</Text>
                <View style={{ flexDirection: 'column', marginTop: 20, marginHorizontal: 30 }}>
                    <InfoCard title="Father Name" value="Bilal Ahmed" />
                    <InfoCard title="Mother Name" value="Amna Bilal" />
                    <InfoCard title="Emirate ID" value="1122334455" />
                    <InfoCard title="Email" value="example@gmail.com" />
                    <InfoCard title="Phone Number" value="+971 4251254" />
                </View>
                <Button styles={{ marginTop: 30, backgroundColor: "#1CAC79", }} text="Logout" onPress={() => { logoutAccount() }} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bg_img: {
        width: "100%",
        height: "65%"
    },
    profile_img: {
        marginTop: 60,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    txt: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },

})
export default Profile;