import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AchievementsScreen() {
  const [journalEntry, setJournalEntry] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Journal</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your journal entry here..."
          placeholderTextColor={Colors.dark.subtext}
          multiline
          value={journalEntry}
          onChangeText={setJournalEntry}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 32,
  },
  textInput: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    color: Colors.dark.text,
    fontSize: 16,
    lineHeight: 25,
    textAlignVertical: 'top',
  },
});
