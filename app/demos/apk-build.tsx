import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function APKBuildDemo() {
  const [buildStep, setBuildStep] = useState(0);
  const [buildLog, setBuildLog] = useState<string[]>([]);

  const buildSteps = [
    'Initialize Project',
    'Install Dependencies',
    'Generate Keystore',
    'Configure Gradle',
    'Build Release APK',
    'Sign APK',
    'Optimize APK',
    'Generate Final APK'
  ];

  const simulateBuild = async () => {
    setBuildLog([]);
    setBuildStep(0);

    for (let i = 0; i < buildSteps.length; i++) {
      setBuildStep(i + 1);
      setBuildLog(prev => [...prev, `✓ ${buildSteps[i]} completed`]);
      
      // Simulate build time
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    Alert.alert(
      'Build Complete!', 
      'APK generated successfully!\nLocation: android/app/build/outputs/apk/release/app-release.apk'
    );
  };

  const keystoreCommands = [
    'keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000'
  ];

  const gradleConfig = `android {
  ...
  defaultConfig { ... }
  signingConfigs {
    release {
      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
      }
    }
  }
  buildTypes {
    release {
      ...
      signingConfig signingConfigs.release
    }
  }
}`;

  const gradleProperties = `MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****`;

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Creating Android APK Files</ThemedText>
      </ThemedView>

      {/* Overview */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Overview</ThemedText>
        <ThemedText style={styles.description}>
          APK (Android Package Kit) is the package file format for Android apps.
          {'\n\n'}Process:
          {'\n'}1. Development → Debug APK
          {'\n'}2. Production → Release APK (signed & optimized)
        </ThemedText>
      </ThemedView>

      {/* Prerequisites */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Prerequisites</ThemedText>
        <ThemedView style={styles.codeContainer}>
          <ThemedText style={styles.codeText}>
            • Android Studio / Android SDK{'\n'}
            • Java Development Kit (JDK 11+){'\n'}
            • React Native CLI{'\n'}
            • Android device/emulator
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Step 1: Generate Keystore */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Step 1: Generate Keystore</ThemedText>
        <ThemedText style={styles.description}>
          A keystore contains private keys used to sign your APK:
        </ThemedText>
        
        <ThemedView style={styles.codeContainer}>
          <ThemedText style={styles.codeText}>
            {keystoreCommands[0]}
          </ThemedText>
        </ThemedView>

        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => {
            // In a real app, you would copy to clipboard
            Alert.alert('Copied!', 'Keystore generation command copied to clipboard');
          }}
        >
          <ThemedText style={styles.buttonText}>Copy Command</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Step 2: Configure Gradle */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Step 2: Configure android/app/build.gradle</ThemedText>
        
        <ThemedView style={styles.codeContainer}>
          <ThemedText style={styles.codeText}>
            {gradleConfig}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Step 3: Gradle Properties */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Step 3: android/gradle.properties</ThemedText>
        
        <ThemedView style={styles.codeContainer}>
          <ThemedText style={styles.codeText}>
            {gradleProperties}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Build Commands */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Build Commands</ThemedText>
        
        <ThemedView style={styles.commandContainer}>
          <ThemedText type="defaultSemiBold">Debug APK:</ThemedText>
          <ThemedView style={styles.codeContainer}>
            <ThemedText style={styles.codeText}>
              npx react-native run-android
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.commandContainer}>
          <ThemedText type="defaultSemiBold">Release APK:</ThemedText>
          <ThemedView style={styles.codeContainer}>
            <ThemedText style={styles.codeText}>
              cd android{'\n'}
              ./gradlew assembleRelease
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.commandContainer}>
          <ThemedText type="defaultSemiBold">Bundle for Play Store:</ThemedText>
          <ThemedView style={styles.codeContainer}>
            <ThemedText style={styles.codeText}>
              cd android{'\n'}
              ./gradlew bundleRelease
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Build Simulation */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Build Simulation</ThemedText>
        
        <TouchableOpacity
          style={[styles.button, buildStep > 0 ? styles.disabledButton : styles.primaryButton]}
          onPress={simulateBuild}
          disabled={buildStep > 0}
        >
          <ThemedText style={styles.buttonText}>
            {buildStep > 0 ? 'Building...' : 'Start APK Build'}
          </ThemedText>
        </TouchableOpacity>

        {/* Build Progress */}
        {buildStep > 0 && (
          <ThemedView style={styles.progressContainer}>
            <ThemedText type="defaultSemiBold">
              Build Progress: {buildStep}/{buildSteps.length}
            </ThemedText>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(buildStep / buildSteps.length) * 100}%` }
                ]} 
              />
            </View>

            <ThemedView style={styles.logContainer}>
              {buildLog.map((log, index) => (
                <ThemedText key={index} style={styles.logText}>
                  {log}
                </ThemedText>
              ))}
              {buildStep <= buildSteps.length && buildStep > 0 && (
                <ThemedText style={styles.currentStep}>
                  ⏳ {buildSteps[buildStep - 1]}...
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>

      {/* APK Output Location */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">APK Output Locations</ThemedText>
        
        <ThemedView style={styles.pathContainer}>
          <ThemedText type="defaultSemiBold">Debug APK:</ThemedText>
          <ThemedText style={styles.pathText}>
            android/app/build/outputs/apk/debug/app-debug.apk
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.pathContainer}>
          <ThemedText type="defaultSemiBold">Release APK:</ThemedText>
          <ThemedText style={styles.pathText}>
            android/app/build/outputs/apk/release/app-release.apk
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.pathContainer}>
          <ThemedText type="defaultSemiBold">Bundle (AAB):</ThemedText>
          <ThemedText style={styles.pathText}>
            android/app/build/outputs/bundle/release/app-release.aab
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Troubleshooting */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Common Issues & Solutions</ThemedText>
        
        <ThemedView style={styles.issueContainer}>
          <ThemedText type="defaultSemiBold">Issue: Build failed</ThemedText>
          <ThemedText style={styles.solutionText}>
            • Clean build: ./gradlew clean{'\n'}
            • Check JDK version{'\n'}
            • Verify Android SDK path
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.issueContainer}>
          <ThemedText type="defaultSemiBold">Issue: Keystore not found</ThemedText>
          <ThemedText style={styles.solutionText}>
            • Check keystore path in gradle.properties{'\n'}
            • Ensure keystore file exists{'\n'}
            • Verify passwords are correct
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.issueContainer}>
          <ThemedText type="defaultSemiBold">Issue: APK too large</ThemedText>
          <ThemedText style={styles.solutionText}>
            • Enable Proguard/R8{'\n'}
            • Remove unused resources{'\n'}
            • Use App Bundle format
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  description: {
    marginTop: 8,
    lineHeight: 20,
    opacity: 0.8,
  },
  codeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    lineHeight: 16,
  },
  commandContainer: {
    marginVertical: 8,
  },
  copyButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },
  logContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    maxHeight: 200,
  },
  logText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#34C759',
    marginVertical: 2,
  },
  currentStep: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#FF9500',
    marginVertical: 2,
  },
  pathContainer: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
  },
  pathText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  issueContainer: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#FFC107',
  },
  solutionText: {
    marginTop: 4,
    opacity: 0.8,
    lineHeight: 18,
  },
});