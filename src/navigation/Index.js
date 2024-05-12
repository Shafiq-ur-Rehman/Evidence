import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getAuth, onAuthStateChanged } from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserContextProvider from "../store/context/UserContext";
// import { UserContext } from "../store/context/UserContext";

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
import UnSolvedCases from "../screens/UnSolvedCases";
import SolvedCases from "../screens/SolvedCases";
import CaseDetails from "../screens/CaseDetails";
import CaseProgress from "../screens/CaseProgress";
import Chat from "../screens/Chat";
import SolvedCaseDetails from "../screens/SolvedCaseDetails";

const Index = () => {
    // const { state } = React.useContext(UserContext)
    const Stack = createNativeStackNavigator();

    const [userType, setUserType] = React.useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    const getUserAccountType = async () => {
        const user = await AsyncStorage.getItem("userType")
        setUserType(user)
        // console.log("getUserAccountType : ", user)
    }

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            getUserAccountType()
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
    const VictimStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="OldCases" component={OldCases} options={{ headerShown: false }} />
                <Stack.Screen name="NewCase" component={NewCase} options={{ headerShown: false }} />
                <Stack.Screen name="NewCase1" component={NewCase1} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="CaseStatus" component={CaseStatus} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }
    const OfficerStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="OfficerHomeScreen" component={OfficerHomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UnSolvedCases" component={UnSolvedCases} options={{ headerShown: false }} />
                <Stack.Screen name="SolvedCases" component={SolvedCases} options={{ headerShown: false }} />
                <Stack.Screen name="CaseDetails" component={CaseDetails} options={{ headerShown: false }} />
                <Stack.Screen name="CaseProgress" component={CaseProgress} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                <Stack.Screen name="SolvedCaseDetails" component={SolvedCaseDetails} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />

            </Stack.Navigator>
        )
    }
    return (
        <NavigationContainer>
            {isLoggedIn ?
                (userType === 'officer' ?
                    <UserContextProvider>
                        <OfficerStack />
                    </UserContextProvider>
                    :
                    <UserContextProvider>
                        <VictimStack />
                    </UserContextProvider>
                )
                :
                <UserContextProvider>
                    <AuthStack />
                </UserContextProvider>

            }
        </NavigationContainer>
    )
}
export default Index;