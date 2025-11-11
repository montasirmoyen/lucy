import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MethodKey = 'WILD' | 'MILD' | 'FILD' | 'ZILD' | null;

const methodDescriptions: Record<Exclude<MethodKey, null>, { title: string; content: string[] }> = {
  WILD: {
    title: 'WILD (Wake-Initiated Lucid Dream)',
    content: [
      'WILD is about staying aware as you fall asleep so you move straight from waking into a dream.',
      'You keep your mind calm while your body falls asleep, watching the transition until dream imagery forms.',
      'Steps:',
      '1. Set your alarm to wake up after 4–6 hours of sleep (WBTB helps a lot).',
      '2. When you wake up, stay relaxed and lie back in a comfortable position.',
      '3. Focus lightly on something simple—your breathing, a soft count, or the feeling of your body sinking.',
      '4. As you start to feel your body go numb or see flashes of color or shapes (hypnagogic imagery), just observe without reacting.',
      '5. When a scene becomes stable, imagine moving within it or perform a small reality check (like pinching your nose and trying to breathe).',
      '6. Once you confirm it’s a dream, stay calm and begin exploring.',
    ],
  },

  MILD: {
    title: 'MILD (Mnemonic Induction of Lucid Dreams)',
    content: [
      'MILD works by using memory and intention so you notice when you’re dreaming.',
      'It’s best done right after waking from a dream when the memory is fresh.',
      'Steps:',
      '1. When you wake from a dream, recall it clearly—especially any moment where you could have realized it was a dream.',
      '2. Set a strong intention by saying in your mind: “Next time I’m dreaming, I’ll realize I’m dreaming.”',
      '3. Picture yourself back in that same dream, spotting a dream sign, and becoming lucid.',
      '4. Feel certain it’ll happen, then fall back asleep with that thought in mind.',
      '5. Keep a dream journal every morning to build recall and awareness.',
      '6. During the day, do reality checks and question whether you’re dreaming to make it a habit.',
      '7. Combining MILD with WBTB (wake up after 4–6 hours, then use MILD) greatly increases success.',
    ],
  },

  FILD: {
    title: 'FILD (Finger-Induced Lucid Dream)',
    content: [
      'FILD is a quick lucid dreaming technique that uses tiny finger movements to slip into a dream.',
      'Steps:',
      '1. Go to bed normally and set an alarm for 4–6 hours later so you wake during REM sleep.',
      '2. When you wake up, stay still and relaxed. Try to drift back to sleep without moving too much.',
      '3. Rest one hand on a flat surface (like your mattress) and lightly move your index and middle fingers as if pressing piano keys.',
      '4. Keep the movement very small—just enough to feel the motion without tensing up.',
      '5. Focus on the rhythm of your fingers and imagine playing the piano. Let your body relax and breathing slow naturally.',
      '6. After about 30 seconds, stop and do a quiet reality check (for example, pinch your nose and see if you can breathe).',
      '7. If you can, you’re dreaming. Stay calm and begin exploring.',
    ],
  },

  ZILD: {
    title: 'ZILD (Zeigarnik-Induced Lucid Dream)',
    content: [
      'ZILD uses the Zeigarnik effect—the mind’s habit of holding onto unfinished thoughts—to trigger lucidity.',
      'You plant an unfinished sentence that carries into your dreams as an unresolved task.',
      'Steps:',
      '1. Before bed, write in your journal: “I realized I was lucid dreaming because…” and stop there. Leave it unfinished.',
      '2. Think to yourself: “I’ll find the answer to that sentence in my dream.” Keep it light and effortless.',
      '3. As you fall asleep, let the incomplete phrase linger in your mind. If it pops up, do a small mental reality check.',
      '4. In the dream, your mind will try to finish the sentence, which often makes you realize you’re dreaming.',
      '5. Once lucid, stabilize the dream with a simple action—rub your hands, look around, or speak clearly.',
      '6. After waking, if you were lucid, finish the sentence with what triggered it. If not, reuse the same prompt next night.',
      'Extra tips: Do a calm reality check anytime the sentence comes to mind during the day. If the effect feels weak, try a stronger hook like “Tonight I’ll realize I’m dreaming when…”',
      'ZILD works best with consistency, journaling, and patience—it builds on your natural memory patterns.',
    ],
  },
};

export default function MethodsScreen() {
  const [openMethod, setOpenMethod] = useState<MethodKey>(null);

  const renderList = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lucid Dreaming Methods</Text>
      <Text style={styles.subtitle}>Explore various techniques that are proven to help you achieve lucidity in your dreams</Text>

      {Object.entries(methodDescriptions).map(([key, method]) => (
        <Pressable
          key={key}
            onPress={() => setOpenMethod(key as MethodKey)}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Open ${key} method`}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{key}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
          <Text style={styles.cardSummary}>{method.content[0]}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  const renderDetails = () => {
    if (!openMethod) return null;
    const method = methodDescriptions[openMethod];

    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => setOpenMethod(null)}
          style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backBtnText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.detailTitle}>{method.title}</Text>
        {method.content.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>{paragraph}</Text>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {openMethod ? renderDetails() : renderList()}
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
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.dark.subtext,
    marginBottom: 12,
  },
  card: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  chevron: {
    fontSize: 24,
    color: Colors.dark.subtext,
  },
  cardSummary: {
    fontSize: 14,
    color: Colors.dark.subtext,
    lineHeight: 20,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#151515',
  },
  backBtnPressed: {
    opacity: 0.9,
  },
  backBtnText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginTop: 8,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.dark.subtext,
    lineHeight: 24,
  },
});