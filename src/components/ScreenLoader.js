import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

export default function ScreenLoader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="white" size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.85)"
    }
})