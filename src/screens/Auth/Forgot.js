import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import bg from "../../assets/images/bg.jpg"
import { useAuthContext } from '../../contexts/AuthContext';

export default function Forgot({ navigation }) {

  const { dispatch } = useAuthContext()

  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleResetPassword = () => {

    if (!email) {
      alert("Please enter your email")
      return
    }

    setIsProcessing(true)

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password sent")
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <ImageBackground source={bg} style={[styles.container, { paddingHorizontal: 16 }]}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          onChangeText={val => setEmail(val)}
          style={styles.textInput}
          keyboardType="email-address"
        />
        <Button mode="contained" buttonColor='white' textColor='black' style={{ borderRadius: 4 }} loading={isProcessing ? true : false} disabled={isProcessing ? true : false} onPress={handleResetPassword}>Send Password</Button>
      </View>
      <View>
        <Button mode="text" textColor='white' onPress={() => { navigation.navigate("Login") }}>Back to Login</Button>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingHorizontal: 16
  },
  textInput: {
    marginBottom: 16
  }
})