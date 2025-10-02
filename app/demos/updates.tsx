import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface UpdateInfo {
  version: string;
  description: string;
  critical: boolean;
  size: string;
  releaseDate: string;
}

export default function UpdatesDemo() {
  const [currentVersion, setCurrentVersion] = useState('1.0.0');
  const [availableUpdate, setAvailableUpdate] = useState<UpdateInfo | null>(null);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStrategy, setUpdateStrategy] = useState<'immediate' | 'background' | 'manual'>('manual');

  // Simulate checking for updates
  const checkForUpdates = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUpdate: UpdateInfo = {
      version: '1.1.0',
      description: 'Bug fixes and performance improvements\n• Fixed crash on Android 12\n• Improved app startup time\n• Updated dependencies',
      critical: Math.random() > 0.7,
      size: '2.5 MB',
      releaseDate: '2024-01-15'
    };

    setAvailableUpdate(mockUpdate);
    Alert.alert('Update Available', `Version ${mockUpdate.version} is available`);
  };

  // Simulate update download and installation
  const installUpdate = async () => {
    setIsUpdating(true);
    setUpdateProgress(0);

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      setUpdateProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate installation
    await new Promise(resolve => setTimeout(resolve, 1000));

    setCurrentVersion(availableUpdate?.version || currentVersion);
    setAvailableUpdate(null);
    setIsUpdating(false);
    setUpdateProgress(0);

    Alert.alert('Update Complete', 'App has been updated successfully!');
  };

  // Auto-check for updates when strategy changes
  useEffect(() => {
    if (updateStrategy === 'background') {
      const interval = setInterval(() => {
        if (!availableUpdate && !isUpdating) {
          checkForUpdates();
        }
      }, 10000); // Check every 10 seconds for demo

      return () => clearInterval(interval);
    }
  }, [updateStrategy, availableUpdate, isUpdating]);

  const otaServices = [
    {
      name: 'Expo Updates',
      description: 'Built-in OTA updates for Expo apps',
      features: ['Instant updates', 'Rollback support', 'Staged rollouts'],
      code: `import * as Updates from 'expo-updates';

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    alert('Error fetching update: ' + error);
  }
}`
    },
    {
      name: 'CodePush',
      description: 'Microsoft CodePush for React Native',
      features: ['Hot updates', 'Conditional updates', 'Metrics'],
      code: `import codePush from 'react-native-code-push';

const App = () => {
  return <YourApp />;
};

export default codePush({
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);`
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Handling Updates in React Native</ThemedText>
      </ThemedView>

      {/* Current App Info */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Current App Information</ThemedText>
        <ThemedView style={styles.infoContainer}>
          <ThemedText style={styles.infoText}>
            Version: {currentVersion}{'\n'}
            Last Updated: {new Date().toLocaleDateString()}{'\n'}
            Update Strategy: {updateStrategy}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Update Strategies */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Update Strategies</ThemedText>
        
        <View style={styles.strategyContainer}>
          {['immediate', 'background', 'manual'].map((strategy) => (
            <TouchableOpacity
              key={strategy}
              style={[
                styles.strategyButton,
                updateStrategy === strategy && styles.activeStrategy
              ]}
              onPress={() => setUpdateStrategy(strategy as any)}
            >
              <ThemedText style={[
                styles.strategyText,
                updateStrategy === strategy && styles.activeStrategyText
              ]}>
                {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedView style={styles.strategyDescription}>
          <ThemedText style={styles.description}>
            {updateStrategy === 'immediate' && 'Updates are downloaded and applied immediately when available.'}
            {updateStrategy === 'background' && 'Updates are checked and downloaded in the background.'}
            {updateStrategy === 'manual' && 'Users manually check and install updates.'}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Update Controls */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Update Controls</ThemedText>
        
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={checkForUpdates}
          disabled={isUpdating}
        >
          <ThemedText style={styles.buttonText}>Check for Updates</ThemedText>
        </TouchableOpacity>

        {availableUpdate && (
          <ThemedView style={styles.updateContainer}>
            <ThemedText type="defaultSemiBold">Update Available: v{availableUpdate.version}</ThemedText>
            <ThemedText style={styles.updateDescription}>
              {availableUpdate.description}
            </ThemedText>
            <ThemedText style={styles.updateMeta}>
              Size: {availableUpdate.size} • Released: {availableUpdate.releaseDate}
            </ThemedText>
            
            {availableUpdate.critical && (
              <ThemedView style={styles.criticalBadge}>
                <ThemedText style={styles.criticalText}>Critical Update</ThemedText>
              </ThemedView>
            )}

            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={installUpdate}
              disabled={isUpdating}
            >
              <ThemedText style={styles.buttonText}>
                {isUpdating ? 'Installing...' : 'Install Update'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        {isUpdating && (
          <ThemedView style={styles.progressContainer}>
            <ThemedText style={styles.progressText}>
              Downloading update... {updateProgress}%
            </ThemedText>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${updateProgress}%` }]} 
              />
            </View>
          </ThemedView>
        )}
      </ThemedView>

      {/* OTA Services */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Over-The-Air (OTA) Update Services</ThemedText>
        
        {otaServices.map((service, index) => (
          <ThemedView key={index} style={styles.serviceContainer}>
            <ThemedText type="defaultSemiBold">{service.name}</ThemedText>
            <ThemedText style={styles.serviceDescription}>
              {service.description}
            </ThemedText>
            
            <ThemedText style={styles.featuresTitle}>Features:</ThemedText>
            {service.features.map((feature, idx) => (
              <ThemedText key={idx} style={styles.featureText}>
                • {feature}
              </ThemedText>
            ))}

            <ThemedView style={styles.codeContainer}>
              <ThemedText style={styles.codeText}>
                {service.code}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Best Practices */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Update Best Practices</ThemedText>
        
        <ThemedView style={styles.practiceContainer}>
          <ThemedText type="defaultSemiBold">1. Version Management</ThemedText>
          <ThemedText style={styles.practiceText}>
            • Use semantic versioning (MAJOR.MINOR.PATCH){'\n'}
            • Maintain version compatibility{'\n'}
            • Test updates thoroughly
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.practiceContainer}>
          <ThemedText type="defaultSemiBold">2. User Experience</ThemedText>
          <ThemedText style={styles.practiceText}>
            • Inform users about updates{'\n'}
            • Allow users to postpone non-critical updates{'\n'}
            • Provide clear update descriptions
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.practiceContainer}>
          <ThemedText type="defaultSemiBold">3. Rollback Strategy</ThemedText>
          <ThemedText style={styles.practiceText}>
            • Implement rollback mechanisms{'\n'}
            • Monitor update success rates{'\n'}
            • Have emergency rollback procedures
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.practiceContainer}>
          <ThemedText type="defaultSemiBold">4. Testing</ThemedText>
          <ThemedText style={styles.practiceText}>
            • Test on multiple devices and OS versions{'\n'}
            • Use staged rollouts{'\n'}
            • Monitor crash reports and user feedback
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Implementation Example */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Implementation Example</ThemedText>
        
        <ThemedView style={styles.codeContainer}>
          <ThemedText style={styles.codeText}>
{`// React Native Update Handler
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppUpdates = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const response = await fetch('/api/check-updates');
      const data = await response.json();
      
      if (data.updateAvailable) {
        setUpdateAvailable(true);
        setUpdateInfo(data.updateInfo);
        
        if (data.critical) {
          Alert.alert(
            'Critical Update Required',
            data.description,
            [{ text: 'Update Now', onPress: installUpdate }]
          );
        }
      }
    } catch (error) {
      console.error('Update check failed:', error);
    }
  };

  const installUpdate = async () => {
    // Install update logic
  };

  return { updateAvailable, updateInfo, installUpdate };
};`}
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
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  infoText: {
    lineHeight: 20,
  },
  strategyContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 8,
  },
  strategyButton: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  activeStrategy: {
    backgroundColor: '#007AFF',
  },
  strategyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeStrategyText: {
    color: 'white',
  },
  strategyDescription: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 4,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  updateButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  updateContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#34C759',
  },
  updateDescription: {
    marginVertical: 8,
    lineHeight: 18,
    opacity: 0.8,
  },
  updateMeta: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  criticalBadge: {
    backgroundColor: '#FF3B30',
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  criticalText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },
  serviceContainer: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 6,
  },
  serviceDescription: {
    marginTop: 4,
    opacity: 0.8,
  },
  featuresTitle: {
    marginTop: 8,
    fontWeight: '600',
  },
  featureText: {
    marginLeft: 8,
    opacity: 0.8,
  },
  codeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 16,
  },
  practiceContainer: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 6,
  },
  practiceText: {
    marginTop: 4,
    opacity: 0.8,
    lineHeight: 18,
  },
});