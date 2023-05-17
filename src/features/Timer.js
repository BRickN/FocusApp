//Native
import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

//Custom
import Countdown from '../components/Countdown';
import RoundedButton from '../components/RoundedButton';
import Timing from './Timing';

//Utils
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;

const VIBRATE_PATTERN = [
    0 * ONE_SECOND_IN_MS,
    0.5 * ONE_SECOND_IN_MS, //V
    0.5 * ONE_SECOND_IN_MS,
    0.5 * ONE_SECOND_IN_MS, //V
    0.5 * ONE_SECOND_IN_MS,
    0.5 * ONE_SECOND_IN_MS, //V
    0.5 * ONE_SECOND_IN_MS,
    0.5 * ONE_SECOND_IN_MS //V
]

function Timer({ focusSubject, onTimerEnd, clearSubject }) {
    useKeepAwake();
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(0.05)

    function onEnd(reset) {
        Vibration.vibrate(VIBRATE_PATTERN);
        setIsStarted(false);
        setProgress(1);
        onTimerEnd(focusSubject);
        reset();
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.countdown}>
                    <Countdown
                        isPaused={!isStarted}
                        // onProgress={(progress) => { setProgress(progress) }}
                        onProgress={setProgress}
                        onEnd={(reset) => onEnd(reset)}
                        minutes={minutes}
                    />
                    <View style={styles.statusWrapper}>
                        <Text style={styles.title}>Focusing on:</Text>
                        <Text style={styles.task}>{focusSubject}</Text>
                    </View>
                </View>
                <View style={styles.progressBarWrapper}>
                    <ProgressBar style={styles.progressBar}
                        progress={progress}
                        color={colors.lightBlue} />
                </View>
                <View style={styles.timingWrapper}>
                    <Timing onChangeTime={setMinutes} />
                </View>
                <View style={styles.buttonWrapper}>
                    {isStarted
                        ? <RoundedButton
                            title="pause"
                            onPress={() => {
                                setIsStarted(false);
                            }}
                        />
                        :
                        <RoundedButton
                            title="start"
                            onPress={() => {
                                setIsStarted(true);
                            }}
                        />
                    }
                </View>
                <View style={styles.clearSubjectWrapper}>
                    <RoundedButton
                        size={50}
                        title="-"
                        onPress={clearSubject}
                    />
                </View>
            </View>
        </>
    )

}

export default Timer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    countdown: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 0.2,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timingWrapper: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusWrapper: {
        paddingTop: spacing.md,
    },
    clearSubjectWrapper: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        textAlign: 'center',
    },
    progressBarWrapper: {
        paddingTop: spacing.lg,
    },
    progressBar: {
        height: spacing.sm,
    }
})