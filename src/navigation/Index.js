import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react"

import BoardingScreen from "../screens/OnBoardingScreen";
import SignUp from "../screens/SignUpScreen";
import SignIn from "../screens/SignInScreen";
import ForgotPassword from "../screens/ForgotPasswordScreen";
import Home from "../screens/HomeScreen";
import NewCase from "../screens/NewCase";
import NewCase1 from "../screens/NewCase1";
import OldCases from "../screens/OldCases";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import CaseStatus from "../screens/CaseStatus";

import OfficerHomeScreen from "../screens/OfficerHomeScreen";

const Index = () => {
    const Stack = createNativeStackNavigator();

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    })
    const AuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="BoardingScreen" component={BoardingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }
    return (
        <NavigationContainer>
            {isLoggedIn ?
                <Stack.Navigator >
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="OldCases" component={OldCases} options={{ headerShown: false }} />
                    <Stack.Screen name="NewCase" component={NewCase} options={{ headerShown: false }} />
                    <Stack.Screen name="NewCase1" component={NewCase1} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                    <Stack.Screen name="CaseStatus" component={CaseStatus} options={{ headerShown: false }} />

                    <Stack.Screen name="OfficerHomeScreen" component={OfficerHomeScreen} options={{ headerShown: false }} />
                </Stack.Navigator>

                :

                <AuthStack />

            }
        </NavigationContainer>
    )
}
export default Index;