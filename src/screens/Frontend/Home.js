import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import auth from "@react-native-firebase/auth"
import { View, Text } from 'react-native'
import { Button } from "react-native-paper"

export default function Home() {

    const { user, dispatch } = useAuthContext()
    console.log("user at home screen =>", user)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleLogout = () => {

        setIsProcessing(true)

        auth().signOut()
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Text style={{ marginBottom: 32 }}>{user.firstName} {user.lastName}</Text>
            <Button mode='contained' style={{ borderRadius: 4 }} loading={isProcessing ? true : false} disabled={isProcessing ? true : false} onPress={handleLogout}>Logout</Button>
        </View>
    )
}