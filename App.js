import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, StatusBar } from 'react-native';

import Focus from './src/features/Focus';
import Timer from './src/features/Timer';
import FocusHistory from './src/features/FocusHistory';

import { colors } from './src/utils/colors';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState('');
  const [focusHistory, setFocusHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject
        ? (
          <>
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory focusHistory={focusHistory} />
          </>
        )
        : (
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject) => setFocusHistory([...focusHistory, subject])}
            clearSubject={() => setCurrentSubject(null)}
          />
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  text: {
    color: colors.white
  }
});


