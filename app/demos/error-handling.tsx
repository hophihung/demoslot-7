import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemedView style={styles.errorContainer}>
          <ThemedText type="title" style={styles.errorTitle}>
            Oops! Something went wrong
          </ThemedText>
          <ThemedText style={styles.errorMessage}>
            {this.state.error?.message}
          </ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <ThemedText style={styles.buttonText}>Try Again</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      );
    }

    return this.props.children;
  }
}

// Component with potential errors
const ProblematicComponent: React.FC<{ shouldError: boolean }> = ({ shouldError }) => {
  if (shouldError) {
    throw new Error('This is a simulated error!');
  }

  return (
    <ThemedView style={styles.successContainer}>
      <ThemedText style={styles.successText}>Component rendered successfully!</ThemedText>
    </ThemedView>
  );
};

// Network Error Simulation
const NetworkDemo: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (shouldFail: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (shouldFail) {
        throw new Error('Network request failed');
      }
      
      setData({ message: 'Data fetched successfully!', timestamp: new Date().toISOString() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.demoContainer}>
      <ThemedText type="subtitle">Network Error Handling</ThemedText>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={() => fetchData(false)}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Loading...' : 'Fetch Success'}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.errorButton]}
          onPress={() => fetchData(true)}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Loading...' : 'Fetch Error'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {error && (
        <ThemedView style={styles.errorMessage}>
          <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        </ThemedView>
      )}

      {data && (
        <ThemedView style={styles.successMessage}>
          <ThemedText style={styles.successText}>
            {data.message}
          </ThemedText>
          <ThemedText style={styles.timestampText}>
            {data.timestamp}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default function ErrorHandlingDemo() {
  const [triggerError, setTriggerError] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Input validation example
  const validateInput = (value: string) => {
    if (!value.trim()) {
      throw new Error('Input cannot be empty');
    }
    if (value.length < 3) {
      throw new Error('Input must be at least 3 characters');
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      throw new Error('Input can only contain letters and spaces');
    }
  };

  const handleValidation = () => {
    try {
      validateInput(inputValue);
      Alert.alert('Success', 'Input is valid!');
    } catch (error) {
      Alert.alert('Validation Error', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Error Handling & Debugging Demo</ThemedText>
      </ThemedView>

      {/* Importance of Error Handling */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">1. Importance of Error Handling</ThemedText>
        <ThemedText style={styles.description}>
          • Prevents app crashes{'\n'}
          • Improves user experience{'\n'}
          • Maintains data integrity{'\n'}
          • Provides meaningful feedback
        </ThemedText>
      </ThemedView>

      {/* Common Error Types */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">2. Common Error Types</ThemedText>
        <ThemedText style={styles.description}>
          • Syntax Errors: Incorrect code structure{'\n'}
          • Runtime Errors: Errors during execution{'\n'}
          • Logic Errors: Incorrect program logic{'\n'}
          • Network Errors: API/connection failures{'\n'}
          • Type Errors: Incorrect data types
        </ThemedText>
      </ThemedView>

      {/* Error Handling Techniques */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">3. Error Handling Techniques</ThemedText>
        
        {/* Try-Catch Demo */}
        <ThemedView style={styles.demoContainer}>
          <ThemedText type="defaultSemiBold">Try-Catch Example:</ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={handleValidation}
          >
            <ThemedText style={styles.buttonText}>Validate Input: "{inputValue}"</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => setInputValue(inputValue === 'test' ? 'ab' : 'test')}
          >
            <ThemedText style={styles.buttonText}>
              Change Input ({inputValue === 'test' ? 'ab' : 'test'})
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Error Boundary Demo */}
        <ThemedView style={styles.demoContainer}>
          <ThemedText type="defaultSemiBold">Error Boundary Example:</ThemedText>
          <TouchableOpacity
            style={[styles.button, triggerError ? styles.errorButton : styles.successButton]}
            onPress={() => setTriggerError(!triggerError)}
          >
            <ThemedText style={styles.buttonText}>
              {triggerError ? 'Fix Component' : 'Break Component'}
            </ThemedText>
          </TouchableOpacity>
          
          <ErrorBoundary>
            <ProblematicComponent shouldError={triggerError} />
          </ErrorBoundary>
        </ThemedView>

        {/* Network Error Handling */}
        <NetworkDemo />
      </ThemedView>

      {/* Debugging Tools */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">4. Debugging Tools</ThemedText>
        <ThemedText style={styles.description}>
          • Console.log() - Basic debugging{'\n'}
          • React DevTools - Component inspection{'\n'}
          • Chrome DevTools - Network, performance{'\n'}
          • Flipper - React Native debugging{'\n'}
          • Breakpoints - Pause execution{'\n'}
          • Error monitoring (Sentry, Bugsnag)
        </ThemedText>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Debug info:', {
              timestamp: new Date().toISOString(),
              currentState: { triggerError, inputValue },
              memoryUsage: 'Available in dev tools'
            });
            Alert.alert('Debug', 'Check console for debug information');
          }}
        >
          <ThemedText style={styles.buttonText}>Log Debug Info</ThemedText>
        </TouchableOpacity>
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
  demoContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: '#666',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  errorButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    gap: 8,
  },
  errorContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: '#FF3B30',
    alignItems: 'center',
  },
  errorTitle: {
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorMessage: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  errorText: {
    color: '#FF3B30',
  },
  successContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderWidth: 1,
    borderColor: '#34C759',
    alignItems: 'center',
  },
  successMessage: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  successText: {
    color: '#34C759',
  },
  timestampText: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
});