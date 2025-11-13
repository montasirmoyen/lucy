import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type MethodKey = 'WILD' | 'MILD' | 'FILD' | 'ZILD' | 'DILD' | null;

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

  DILD: {
    title: 'DILD (Drawing-Induced Lucid Dream)',
    content: [
      'DILD uses your own drawing or visual creation as a “dream anchor,” helping you enter a scene you designed yourself and realize you’re dreaming.',
      'The process links creativity, visualization, and intention, training your mind to re-create that image in a dream and trigger lucidity.',
      'Steps:',
      '1. Draw or paint a dream scene you’d love to visit—something detailed, calming, or meaningful to you.',
      '2. Spend a few minutes studying your drawing before bed. Focus on the colors, shapes, and atmosphere, imagining yourself walking inside it.',
      '3. Set your intention by thinking: “When I see this place in my dream, I’ll know I’m dreaming.”',
      '4. Place the drawing under your pillow or beside your bed to keep it close to your subconscious focus.',
      '5. As you fall asleep, keep visualizing the scene from your drawing until you drift off naturally.',
      '6. If you find yourself in that place in your dream, remember your intention and perform a quick reality check to confirm lucidity.',
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
          style={({ pressed }) => [styles.cardContainer, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Open ${key} method`}
        >
          <LinearGradient
            colors={['#6B46C1', '#3B82F6', '#6B46C1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{key}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
              <Text style={styles.cardSummary}>{method.content[0]}</Text>
            </View>
          </LinearGradient>
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
    marginBottom: 50,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    fontFamily: 'Font-Bold',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.dark.subtext,
    fontFamily: 'Font-Regular',
    lineHeight: 24,
    flexWrap: 'wrap',
    width: '100%',
    flexShrink: 1,
  },
  cardContainer: {
    borderRadius: 12,
    marginBottom: 4,
    shadowColor: '#6B46C1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    borderRadius: 12,
    padding: 2,
  },
  card: {
    padding: 16,
    backgroundColor: '#0a0a0aff',
    borderRadius: 10,
    borderWidth: 0,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    fontFamily: 'Font-Bold',
  },
  chevron: {
    fontSize: 24,
    color: Colors.dark.subtext,
    fontFamily: 'Font-Regular',
  },
  cardSummary: {
    fontSize: 14,
    color: Colors.dark.subtext,
    lineHeight: 20,
    fontFamily: 'Font-Regular',
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
    fontFamily: 'Font-Regular',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginTop: 8,
    fontFamily: 'Font-Regular',
  },
  paragraph: {
    fontSize: 16,
    color: Colors.dark.subtext,
    lineHeight: 24,
    fontFamily: 'Font-Regular',
  },
});