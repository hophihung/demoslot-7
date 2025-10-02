import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">React Native Demo Slot 7</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📱 Demo Topics</ThemedText>
        <ThemedText>
          Explore React Native error handling, debugging, APK building, and app updates
        </ThemedText>
      </ThemedView>

      {/* Error Handling Demo */}
      <ThemedView style={styles.demoContainer}>
        <Link href="/demos/error-handling" style={styles.demoLink}>
          <ThemedView style={styles.demoCard}>
            <ThemedText type="subtitle" style={styles.demoTitle}>
              🐛 Error Handling & Debugging
            </ThemedText>
            <ThemedText style={styles.demoDescription}>
              • Error boundaries and try-catch{'\n'}
              • Common error types{'\n'}
              • Debugging tools{'\n'}
              • Interactive examples
            </ThemedText>
          </ThemedView>
        </Link>
      </ThemedView>

      {/* APK Build Demo */}
      <ThemedView style={styles.demoContainer}>
        <Link href="/demos/apk-build" style={styles.demoLink}>
          <ThemedView style={styles.demoCard}>
            <ThemedText type="subtitle" style={styles.demoTitle}>
              📦 Creating Android APK Files
            </ThemedText>
            <ThemedText style={styles.demoDescription}>
              • Keystore generation{'\n'}
              • Gradle configuration{'\n'}
              • Build simulation{'\n'}
              • Troubleshooting guide
            </ThemedText>
          </ThemedView>
        </Link>
      </ThemedView>

      {/* Updates Demo */}
      <ThemedView style={styles.demoContainer}>
        <Link href="/demos/updates" style={styles.demoLink}>
          <ThemedView style={styles.demoCard}>
            <ThemedText type="subtitle" style={styles.demoTitle}>
              🔄 Handling App Updates
            </ThemedText>
            <ThemedText style={styles.demoDescription}>
              • OTA (Over-The-Air) updates{'\n'}
              • Update strategies{'\n'}
              • Expo Updates & CodePush{'\n'}
              • Best practices
            </ThemedText>
          </ThemedView>
        </Link>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🎯 Demo Instructions</ThemedText>
        <ThemedText>
          1. Tap any demo card above to explore{'\n'}
          2. Each demo includes interactive examples{'\n'}
          3. Check console logs for debugging info{'\n'}
          4. Try different scenarios to see error handling
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  demoContainer: {
    marginBottom: 16,
  },
  demoLink: {
    textDecorationLine: 'none',
  },
  demoCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
  demoTitle: {
    marginBottom: 8,
    color: '#007AFF',
  },
  demoDescription: {
    lineHeight: 20,
    opacity: 0.8,
  },
});
