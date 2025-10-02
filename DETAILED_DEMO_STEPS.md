# 📋 Hướng Dẫn Demo Chi Tiết - Từng Bước

## 🎯 CHUẨN BỊ DEMO (5 phút)

### Bước 1: Khởi động ứng dụng

```bash
cd f:\MMA\demo_b7\slot7Demo
npm start
```

### Bước 2: Chọn platform

- **Web**: Nhấn `w` trong terminal
- **Android**: Nhấn `a` (cần emulator/device)
- **iOS**: Nhấn `i` (chỉ trên macOS)

### Bước 3: Kiểm tra màn hình chính

- ✅ Thấy 3 demo cards
- ✅ Title: "React Native Demo Slot 7"
- ✅ Các demo: Error Handling, APK Build, Updates

---

## 🐛 PHẦN 1: ERROR HANDLING & DEBUGGING (15 phút)

### **BƯỚC 1: Giới thiệu (2 phút)**

**Script:**

> "Chào mọi người! Hôm nay chúng ta sẽ học về Error Handling trong React Native. Đây là kỹ năng quan trọng để tạo ra ứng dụng ổn định."

**Thao tác:**

1. Tap vào **"🐛 Error Handling & Debugging"** card
2. Scroll xuống xem overview

**Giải thích:**

- Tầm quan trọng của error handling
- Tác động đến user experience
- 4 điểm chính: Prevents crashes, improves UX, maintains data integrity, provides feedback

### **BƯỚC 2: Common Error Types (3 phút)**

**Script:**

> "Trong React Native, chúng ta thường gặp 5 loại lỗi chính. Hãy xem từng loại..."

**Thao tác:**

1. Đọc section "2. Common Error Types"
2. Giải thích từng loại:

**Syntax Errors:**

```javascript
// Lỗi: thiếu dấu }
const obj = {
  name: "test"
  // Missing }
```

**Runtime Errors:**

```javascript
// Lỗi: Cannot read property of undefined
const user = null;
console.log(user.name); // Error!
```

**Logic Errors:**

```javascript
// Lỗi: Logic sai
const age = 25;
if (age > 18) {
  console.log("Underage"); // Should be "Adult"
}
```

### **BƯỚC 3: Try-Catch Demo (3 phút)**

**Script:**

> "Bây giờ chúng ta thực hành với Try-Catch. Đây là cách cơ bản nhất để handle errors."

**Thao tác:**

1. Scroll đến "3. Error Handling Techniques"
2. Tìm "Try-Catch Example"
3. **Demo 1 - Valid Input:**
   - Nhấn **"Validate Input: test"**
   - ✅ Thấy alert "Success - Input is valid!"
4. **Demo 2 - Invalid Input:**
   - Nhấn **"Change Input (ab)"**
   - Nhấn **"Validate Input: ab"**
   - ❌ Thấy alert "Validation Error - Input must be at least 3 characters"

**Explain Code:**

```javascript
const validateInput = (value) => {
  if (!value.trim()) {
    throw new Error("Input cannot be empty");
  }
  if (value.length < 3) {
    throw new Error("Input must be at least 3 characters");
  }
  // More validations...
};

try {
  validateInput(inputValue);
  Alert.alert("Success", "Input is valid!");
} catch (error) {
  Alert.alert("Validation Error", error.message);
}
```

### **BƯỚC 4: Error Boundary Demo (4 phút)**

**Script:**

> "Error Boundary là React component đặc biệt để catch JavaScript errors ở bất kỳ đâu trong component tree."

**Thao tác:**

1. Tìm "Error Boundary Example"
2. **Demo 1 - Normal State:**
   - Component hiển thị: "Component rendered successfully!"
3. **Demo 2 - Trigger Error:**
   - Nhấn **"Break Component"**
   - ✅ Thấy Error Boundary UI:
     - Title: "Oops! Something went wrong"
     - Error message: "This is a simulated error!"
     - Button: "Try Again"
4. **Demo 3 - Recovery:**
   - Nhấn **"Try Again"**
   - ✅ Component quay về normal state

**Explain Code:**

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUI error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### **BƯỚC 5: Network Error Demo (2 phút)**

**Script:**

> "Network errors là loại lỗi phổ biến nhất trong mobile apps. Hãy xem cách handle chúng."

**Thao tác:**

1. Tìm "Network Error Handling"
2. **Demo 1 - Success Case:**
   - Nhấn **"Fetch Success"**
   - Loading... → ✅ Green success message với timestamp
3. **Demo 2 - Error Case:**
   - Nhấn **"Fetch Error"**
   - Loading... → ❌ Red error message: "Network request failed"

**Explain Pattern:**

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async (shouldFail = false) => {
  setLoading(true);
  setError(null);

  try {
    await simulateNetworkRequest();
    if (shouldFail) throw new Error("Network request failed");
    setData(response);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### **BƯỚC 6: Debugging Tools (1 phút)**

**Script:**

> "Để debug hiệu quả, chúng ta có nhiều tools. Hãy thử logging..."

**Thao tác:**

1. Scroll đến "4. Debugging Tools"
2. Nhấn **"Log Debug Info"**
3. ✅ Alert: "Debug - Check console for debug information"
4. **Mở Developer Console** (F12 trên web)
5. ✅ Thấy debug object trong console:

```javascript
{
  timestamp: "2024-01-15T10:30:00.000Z",
  currentState: { triggerError: false, inputValue: "test" },
  memoryUsage: "Available in dev tools"
}
```

**Giải thích Tools:**

- **Console.log**: Basic debugging
- **React DevTools**: Component inspection
- **Chrome DevTools**: Network, performance
- **Flipper**: React Native debugging
- **Breakpoints**: Pause execution

---

## 📦 PHẦN 2: CREATING ANDROID APK FILES (15 phút)

### **BƯỚC 1: Giới thiệu APK (2 phút)**

**Script:**

> "APK là Android Package Kit - định dạng file để cài đặt ứng dụng Android. Có 2 loại chính..."

**Thao tác:**

1. Quay về home, tap **"📦 Creating Android APK Files"**
2. Đọc "Overview" section

**Giải thích:**

- **Debug APK**: Cho development, có debug info
- **Release APK**: Cho production, được optimize và signed
- Process: Development → Debug APK → Production → Release APK

### **BƯỚC 2: Prerequisites (1 phút)**

**Script:**

> "Để build APK, chúng ta cần một số tools cơ bản..."

**Thao tác:**

1. Scroll đến "Prerequisites"
2. Đọc checklist:

**Requirements:**

- ✅ Android Studio / Android SDK
- ✅ Java Development Kit (JDK 11+)
- ✅ React Native CLI
- ✅ Android device/emulator

### **BƯỚC 3: Generate Keystore (3 phút)**

**Script:**

> "Keystore là file chứa private key để sign APK. Đây là bước quan trọng cho release build."

**Thao tác:**

1. Scroll đến "Step 1: Generate Keystore"
2. Đọc command trong code box:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

3. Nhấn **"Copy Command"**
4. ✅ Alert: "Copied! Keystore generation command copied to clipboard"

**Giải thích:**

- **Keystore**: Chứa certificate và private key
- **Validity 10000 days**: Key valid trong ~27 năm
- **RSA 2048**: Encryption algorithm và key size
- **Keep secure**: Mất keystore = không thể update app

### **BƯỚC 4: Configure Gradle (2 phút)**

**Script:**

> "Sau khi có keystore, chúng ta cần configure Gradle để sử dụng nó..."

**Thao tác:**

1. Scroll đến "Step 2: Configure android/app/build.gradle"
2. Xem gradle config code
3. Scroll đến "Step 3: android/gradle.properties"
4. Xem properties example

**Explain Configuration:**

**build.gradle:**

```gradle
android {
  signingConfigs {
    release {
      storeFile file(MYAPP_UPLOAD_STORE_FILE)
      storePassword MYAPP_UPLOAD_STORE_PASSWORD
      keyAlias MYAPP_UPLOAD_KEY_ALIAS
      keyPassword MYAPP_UPLOAD_KEY_PASSWORD
    }
  }
  buildTypes {
    release {
      signingConfig signingConfigs.release
    }
  }
}
```

**gradle.properties:**

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

### **BƯỚC 5: Build Commands (2 phút)**

**Script:**

> "Có 3 loại build chính. Hãy xem commands cho từng loại..."

**Thao tác:**

1. Scroll đến "Build Commands"
2. Đọc 3 command types:

**Debug APK:**

```bash
npx react-native run-android
```

**Release APK:**

```bash
cd android
./gradlew assembleRelease
```

**Bundle for Play Store:**

```bash
cd android
./gradlew bundleRelease
```

**Giải thích:**

- **Debug**: Fast build cho development
- **Release**: Optimized APK cho distribution
- **Bundle**: AAB format cho Google Play Store (smaller size)

### **BƯỚC 6: Build Simulation (3 phút)**

**Script:**

> "Bây giờ chúng ta sẽ simulate quá trình build APK để hiểu các bước..."

**Thao tác:**

1. Scroll đến "Build Simulation"
2. Nhấn **"Start APK Build"**
3. ✅ Xem animated progress:

**Build Steps (8 steps):**

1. ✓ Initialize Project completed
2. ✓ Install Dependencies completed
3. ✓ Generate Keystore completed
4. ✓ Configure Gradle completed
5. ✓ Build Release APK completed
6. ✓ Sign APK completed
7. ✓ Optimize APK completed
8. ✓ Generate Final APK completed

9. ✅ Final Alert: "Build Complete! APK generated successfully!"

**Explain Process:**

- **Initialize**: Setup build environment
- **Dependencies**: Install required packages
- **Keystore**: Generate/use signing key
- **Configure**: Setup build configuration
- **Build**: Compile code to APK
- **Sign**: Add digital signature
- **Optimize**: Compress and optimize
- **Generate**: Create final APK file

### **BƯỚC 7: APK Locations (1 phút)**

**Script:**

> "Sau khi build, APK files sẽ được tạo ở các locations này..."

**Thao tác:**

1. Scroll đến "APK Output Locations"
2. Đọc 3 paths:

**Output Paths:**

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`
- **Bundle (AAB)**: `android/app/build/outputs/bundle/release/app-release.aab`

### **BƯỚC 8: Troubleshooting (1 phút)**

**Script:**

> "Một số lỗi phổ biến và cách fix..."

**Thao tác:**

1. Scroll đến "Common Issues & Solutions"
2. Đọc 3 common issues:

**Common Problems:**

1. **Build failed** → `./gradlew clean`, check JDK, verify SDK path
2. **Keystore not found** → Check path, verify file exists, correct passwords
3. **APK too large** → Enable Proguard/R8, remove unused resources, use Bundle

---

## 🔄 PHẦN 3: HANDLING APP UPDATES (15 phút)

### **BƯỚC 1: Current App Info (1 phút)**

**Script:**

> "Trước khi học về updates, hãy xem thông tin app hiện tại..."

**Thao tác:**

1. Quay về home, tap **"🔄 Handling App Updates"**
2. Xem "Current App Information":

**App Info:**

- Version: 1.0.0
- Last Updated: [Current date]
- Update Strategy: manual

### **BƯỚC 2: Update Strategies (3 phút)**

**Script:**

> "Có 3 chiến lược update chính. Mỗi strategy phù hợp với các use case khác nhau..."

**Thao tác:**

1. Scroll đến "Update Strategies"
2. **Demo Strategy Switching:**

**Strategy 1 - Manual:**

- Tap **"Manual"** button (active by default)
- Description: "Users manually check and install updates"

**Strategy 2 - Background:**

- Tap **"Background"** button
- Description: "Updates are checked and downloaded in the background"
- ⚡ Auto-checking starts (every 10s for demo)

**Strategy 3 - Immediate:**

- Tap **"Immediate"** button
- Description: "Updates are downloaded and applied immediately when available"

**Explain Each Strategy:**

- **Manual**: User control, less intrusive, good for non-critical apps
- **Background**: Balance between UX and freshness, good for most apps
- **Immediate**: Always latest, good for critical business apps

### **BƯỚC 3: Manual Update Check (2 phút)**

**Script:**

> "Bây giờ chúng ta sẽ demo manual update process..."

**Thao tác:**

1. Ensure "Manual" strategy is selected
2. Scroll đến "Update Controls"
3. Nhấn **"Check for Updates"**
4. ⏳ Loading... (1.5 seconds)
5. ✅ Alert: "Update Available - Version 1.1.0 is available"
6. ✅ Update card appears với:

**Update Info:**

- **Version**: 1.1.0
- **Description**: Bug fixes and performance improvements
  - Fixed crash on Android 12
  - Improved app startup time
  - Updated dependencies
- **Size**: 2.5 MB
- **Released**: 2024-01-15
- **Critical Badge**: Có thể có hoặc không (random)

### **BƯỚC 4: Install Update Demo (3 phút)**

**Script:**

> "Khi có update available, user có thể chọn install. Hãy xem quá trình..."

**Thao tác:**

1. Nhấn **"Install Update"** (green button)
2. ✅ Progress animation bắt đầu:

**Update Progress:**

- "Downloading update... 0%"
- Progress bar fills: 10% → 20% → ... → 100%
- "Installing..." (1 second)

3. ✅ Update complete:

- Version updated: 1.0.0 → 1.1.0
- Update card disappears
- Alert: "Update Complete - App has been updated successfully!"

**Explain Process:**

```javascript
const installUpdate = async () => {
  setIsUpdating(true);

  // Download phase
  for (let i = 0; i <= 100; i += 10) {
    setUpdateProgress(i);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  // Install phase
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Complete
  setCurrentVersion(availableUpdate.version);
  setIsUpdating(false);
};
```

### **BƯỚC 5: Background Strategy Demo (2 phút)**

**Script:**

> "Background strategy tự động check updates. Hãy thử..."

**Thao tác:**

1. Tap **"Background"** strategy button
2. ⚡ Auto-checking starts immediately
3. Wait ~10 seconds
4. ✅ Update notification appears automatically
5. Install process same as manual

**Explain Background Logic:**

```javascript
useEffect(() => {
  if (updateStrategy === "background") {
    const interval = setInterval(() => {
      if (!availableUpdate && !isUpdating) {
        checkForUpdates();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }
}, [updateStrategy]);
```

### **BƯỚC 6: OTA Services (3 phút)**

**Script:**

> "Trong thực tế, chúng ta sử dụng các OTA services. Có 2 options chính..."

**Thao tác:**

1. Scroll đến "Over-The-Air (OTA) Update Services"
2. Đọc 2 services:

**Expo Updates:**

```javascript
import * as Updates from "expo-updates";

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    alert("Error fetching update: " + error);
  }
}
```

**Features**: Instant updates, Rollback support, Staged rollouts

**CodePush:**

```javascript
import codePush from "react-native-code-push";

const App = () => {
  return <YourApp />;
};

export default codePush({
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
```

**Features**: Hot updates, Conditional updates, Metrics

**So sánh:**

- **Expo Updates**: Built-in cho Expo projects, dễ setup
- **CodePush**: Universal cho tất cả RN projects, nhiều features hơn

### **BƯỚC 7: Best Practices (1 phút)**

**Script:**

> "Cuối cùng, một số best practices cho app updates..."

**Thao tác:**

1. Scroll đến "Update Best Practices"
2. Đọc 4 categories:

**1. Version Management:**

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Maintain version compatibility
- Test updates thoroughly

**2. User Experience:**

- Inform users about updates
- Allow postponing non-critical updates
- Provide clear update descriptions

**3. Rollback Strategy:**

- Implement rollback mechanisms
- Monitor update success rates
- Have emergency rollback procedures

**4. Testing:**

- Test on multiple devices/OS versions
- Use staged rollouts
- Monitor crash reports and feedback

---

## 🎯 TỔNG KẾT DEMO (2 phút)

### **Recap Key Points:**

**Error Handling:**

- ✅ Try-catch cho sync errors
- ✅ Error boundaries cho component errors
- ✅ Proper network error handling
- ✅ Comprehensive logging

**APK Building:**

- ✅ Keystore generation và security
- ✅ Gradle configuration
- ✅ Build process understanding
- ✅ Troubleshooting skills

**App Updates:**

- ✅ Multiple update strategies
- ✅ OTA services comparison
- ✅ User experience considerations
- ✅ Best practices implementation

### **Q&A Time:**

**Common Questions:**

1. **"Khi nào dùng Error Boundary vs try-catch?"**

   - Error Boundary: Component rendering errors
   - Try-catch: Logic errors, async operations

2. **"Có thể build APK without Android Studio không?"**

   - Cần ít nhất Android SDK, có thể dùng command line tools

3. **"CodePush vs Expo Updates - chọn cái nào?"**

   - Expo Updates: Nếu dùng Expo
   - CodePush: Nếu bare React Native hoặc cần advanced features

4. **"Update strategy nào tốt nhất?"**
   - Depends on app type: Business critical → Immediate, Consumer → Background/Manual

### **Next Steps:**

- Practice với real projects
- Setup error monitoring (Sentry, Bugsnag)
- Implement CI/CD for automated builds
- Plan update rollout strategy

---

## 📝 NOTES CHO PRESENTER

### **Timing Management:**

- **Total**: 45 minutes
- **Error Handling**: 15 min (có thể extend nếu nhiều questions)
- **APK Build**: 15 min (focus on keystore và signing)
- **Updates**: 15 min (emphasize strategy selection)

### **Technical Backup:**

- Tất cả demos đã được test
- Fallback: Show code nếu UI không work
- Console logs available for debugging
- Error scenarios designed to be educational

### **Engagement Tips:**

- Ask audience về experiences với crashes
- Poll: "Ai đã từng build APK?"
- Interactive: "Thử break component này xem sao?"
- Real examples: Show actual APK files nếu có

**Demo sẵn sàng! 🚀**
