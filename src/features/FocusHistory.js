import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

export default function FocusHistory({ focusHistory }) {
    if (!focusHistory || !focusHistory.length) {
        return (
            <Text style={styles.title}>
                We haven't focused on anything yet
            </Text>);
    }

    const renderItem = ({ item }) => {
        return <Text style={styles.item}>- {item}</Text>
    }


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Things we've focused on:</Text>
                <FlatList
                    data={focusHistory}
                    renderItem={renderItem}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
    },
    title: {
        color: colors.white,
        fontSize: fontSizes.lg,
        padding: spacing.md,
    },
    item: {
        fontSize: fontSizes.md,
        color: colors.white,
        paddingTop: spacing.sm,

    },
})