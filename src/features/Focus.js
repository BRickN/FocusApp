import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper'
import RoundedButton from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';

function Focus({ addSubject }) {
    const [subject, setSubject] = useState('test');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    label="What would you like to focus on?"
                    onChangeText={(text) => {
                        setSubject(text)
                    }} />
                <RoundedButton
                    style={styles.button}
                    title="+"
                    size={50}
                    onPress={() => addSubject(subject)}
                />
            </View>
        </View>
    )
}
export default Focus

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        padding: spacing.lg,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    button: {
        justifyContent: 'center',
    },
    textInput: {
        flex: 1,
        marginRight: spacing.sm,
    },
    text: {
        color: colors.white
    }
})