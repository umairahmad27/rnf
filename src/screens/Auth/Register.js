import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app"

import bg from "../../assets/images/bg.jpg"
import { useAuthContext } from '../../contexts/AuthContext';

const initialState = { email: "", password: "" }

export default function Register({ navigation }) {

    const { dispatch } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))
    }

    const handleRegister = () => {
        let { email, password } = state

        if (!email) {
            alert("Please enter your email")
            return
        }
        if (password.length < 6) {
            alert("Password must be 6 chars")
            return
        }

        setIsProcessing(true)
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
                createUserProfile(user)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
                setIsProcessing(false)
            });
        // console.log("email =>", email)
        // console.log("password =>", password)


    }

    const createUserProfile = (user) => {
        let formData = {
            firstName: "",
            lastName: "",
            email: user.email,
            uid: user.uid,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        }
        firestore()
            .collection('users')
            .doc(user.uid)
            .set(formData)
            .then(() => {
                console.log('User added!');
                dispatch({ type: "LOGIN", payload: { user } })
            })
            .catch(err => {
                console.error(err)
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
                    onChangeText={val => handleChange("email", val)}
                    style={styles.textInput}
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    onChangeText={val => handleChange("password", val)}
                    style={styles.textInput}
                    secureTextEntry={!isPasswordShow ? true : false}
                    right={<TextInput.Icon icon={isPasswordShow ? "eye-off" : "eye"} onPress={() => { setIsPasswordShow(!isPasswordShow) }} />}
                />
                <Button mode="contained" buttonColor='white' textColor='black' style={{ borderRadius: 4 }} loading={isProcessing ? true : false} disabled={isProcessing ? true : false} onPress={handleRegister}>Register</Button>
            </View>
            <View>
                <Button mode="text" textColor='white' onPress={() => { navigation.navigate("Login") }}>Already have an account?</Button>
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