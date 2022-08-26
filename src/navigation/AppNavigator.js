import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens Frontend
import Home from "../screens/Frontend/Home"
import About from "../screens/Frontend/About"
import Contact from "../screens/Frontend/Contact"

// Screens Auth
import Login from "../screens/Auth/Login"
import Register from "../screens/Auth/Register"
import Forgot from "../screens/Auth/Forgot"
import { useAuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator()

export default function AppNavigator() {

    const { isAuthenticated } = useAuthContext()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated
                    ? <Stack.Group>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="About" component={About} />
                        <Stack.Screen name="Contact" component={Contact} />
                    </Stack.Group>
                    : <Stack.Group
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Forgot" component={Forgot} />
                    </Stack.Group>
                }


            </Stack.Navigator>
        </NavigationContainer>
    )
}