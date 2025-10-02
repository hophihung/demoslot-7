# 📦 CHI TIẾT: CREATING ANDROID APK FILES

## 🤔 APK LÀ GÌ?

### 🍎 So sánh đơn giản:

- **APK** = **A**ndroid **P**ackage **K**it
- Giống như **hộp quà** chứa tất cả thứ cần thiết cho app
- **iPhone** dùng file **.ipa**, **Android** dùng file **.apk**

### 📦 APK chứa gì?

```
🗂️ File APK (giống hộp quà)
├── 💻 Code của app (Java/Kotlin)
├── 🖼️ Hình ảnh, icon
├── 🎵 Âm thanh, video
├── 📋 Thông tin app (tên, version)
├── 🔐 Chữ ký số (để Android tin tướng)
└── 📝 File cấu hình
```

---

## 🏗️ QUY TRÌNH TẠO APK (8 BƯỚC)

### 1️⃣ **Chuẩn Bị Môi Trường**

```bash
# Kiểm tra Java
java -version

# Kiểm tra Android SDK
echo $ANDROID_HOME

# Cài đặt React Native CLI (nếu chưa có)
npm install -g @react-native-community/cli
```

**❌ Lỗi thường gặp:**

```
⚠️ react-native depends on @react-native-community/cli
```

**✅ Cách sửa:**

```bash
# Thêm vào package.json
npm install --save-dev @react-native-community/cli@latest
```

### 2️⃣ **Tạo Keystore (Chìa Khóa Ký)**

#### 🔑 Keystore là gì?

- Giống **chữ ký** của bạn
- **Android** dùng để biết app này **thật** hay **giả**
- **MẤT KEYSTORE = KHÔNG THỂ UPDATE APP**

#### 📝 Lệnh tạo Keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-upload-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

#### 🎯 Giải thích từng phần:

- `my-upload-key.keystore` = Tên file chìa khóa
- `my-key-alias` = Biệt danh cho chìa khóa
- `RSA 2048` = Loại mã hóa (rất mạnh)
- `10000 days` = Có hiệu lực 27 năm

#### 💬 Hệ thống sẽ hỏi:

```
Enter keystore password: [Nhập mật khẩu]
Re-enter new password: [Nhập lại]
What is your first and last name? [Tên của bạn]
What is your organizational unit? [Tên công ty/trường]
What is your city? [Thành phố]
What is your state? [Tỉnh/Bang]
What is your country code? [VN]
```

### 3️⃣ **Cấu Hình Gradle**

#### 📂 File: `android/gradle.properties`

```properties
# Thông tin Keystore (GIỮ BÍ MẬT!)
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=password123
MYAPP_UPLOAD_KEY_PASSWORD=password123

# Tối ưu hóa
android.useAndroidX=true
android.enableJetifier=true
org.gradle.jvmargs=-Xmx2048m
```

#### 📂 File: `android/app/build.gradle`

```gradle
android {
    compileSdkVersion rootProject.ext.compileSdkVersion

    defaultConfig {
        applicationId "com.yourcompany.yourapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }

    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
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
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### 4️⃣ **Build Debug APK**

#### 🧪 Debug APK - Để Test

```bash
# Cách 1: Qua React Native CLI
npx react-native run-android

# Cách 2: Qua Gradle
cd android
./gradlew assembleDebug
```

#### 📍 Debug APK được tạo ở:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### 🎯 Đặc điểm Debug APK:

- ✅ **Nhanh** để build
- ✅ **Dễ** debug
- ❌ **Chậm** khi chạy
- ❌ **Dung lượng lớn**
- ❌ **Không được tối ưu**

### 5️⃣ **Build Release APK**

#### 🚀 Release APK - Để Phát Hành

```bash
cd android

# Windows
.\gradlew assembleRelease

# Mac/Linux
./gradlew assembleRelease
```

#### 📍 Release APK được tạo ở:

```
android/app/build/outputs/apk/release/app-release.apk
```

#### 🎯 Đặc điểm Release APK:

- ✅ **Nhanh** khi chạy
- ✅ **Dung lượng nhỏ**
- ✅ **Được tối ưu**
- ✅ **An toàn** (có chữ ký)
- ❌ **Lâu** để build
- ❌ **Khó** debug

### 6️⃣ **Build App Bundle (AAB)**

#### 📦 App Bundle - Cho Google Play Store

```bash
cd android
./gradlew bundleRelease
```

#### 📍 AAB được tạo ở:

```
android/app/build/outputs/bundle/release/app-release.aab
```

#### 🎯 Tại sao dùng AAB?

- ✅ **Nhỏ hơn APK** 15-20%
- ✅ **Google Play tự tối ưu** cho từng thiết bị
- ✅ **Dynamic delivery** - tải từng phần khi cần
- ❌ **Chỉ dùng được trên Google Play**

### 7️⃣ **Ký APK (Signing)**

#### 🔐 Tại sao phải ký APK?

- **Android** không cài app **không có chữ ký**
- **Chữ ký** chứng minh app **không bị sửa đổi**
- **Google Play** chỉ nhận app **có chữ ký hợp lệ**

#### ✍️ Quá trình ký tự động:

```
📱 Your Code → 🔨 Build → 🔐 Sign → 📦 APK
```

### 8️⃣ **Tối Ưu APK**

#### 🗜️ Giảm dung lượng APK:

**📂 Bật Proguard/R8:**

```gradle
// android/app/build.gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile("proguard-android.txt")
    }
}
```

**🖼️ Tối ưu hình ảnh:**

```bash
# Chuyển PNG sang WebP (nhỏ hơn 25-35%)
# Xóa hình không dùng
# Dùng vector thay bitmap
```

**📚 Tách thư viện:**

```gradle
// Tạo APK riêng cho từng kiến trúc
splits {
    abi {
        enable true
        reset()
        include "x86", "armeabi-v7a", "arm64-v8a"
        universalApk false
    }
}
```

---

## 🔧 XỬ LÝ LỖI THƯỜNG GẶP

### ❌ **Lỗi 1: React Native CLI không có**

```
⚠️ react-native depends on @react-native-community/cli
```

**✅ Cách sửa:**

```bash
# Thêm vào devDependencies
npm install --save-dev @react-native-community/cli@latest

# Hoặc cài global
npm install -g @react-native-community/cli
```

### ❌ **Lỗi 2: Android SDK không tìm thấy**

```
> SDK location not found
```

**✅ Cách sửa:**

```bash
# Tạo file android/local.properties
echo "sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk" > android/local.properties

# Hoặc set environment variable
export ANDROID_HOME=/path/to/android/sdk
```

### ❌ **Lỗi 3: Java version không đúng**

```
> Unsupported Java version
```

**✅ Cách sửa:**

```bash
# Cài JDK 11 hoặc 17
# Windows: Scoop install openjdk11
# Mac: brew install openjdk@11
# Ubuntu: sudo apt install openjdk-11-jdk
```

### ❌ **Lỗi 4: Keystore không tìm thấy**

```
> Keystore file not found
```

**✅ Cách sửa:**

```bash
# Kiểm tra đường dẫn trong gradle.properties
# Đảm bảo file keystore ở đúng vị trí
# Copy keystore vào thư mục android/app/
```

### ❌ **Lỗi 5: Build failed do memory**

```
> OutOfMemoryError
```

**✅ Cách sửa:**

```gradle
// android/gradle.properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
```

### ❌ **Lỗi 6: APK quá lớn**

```
> APK size exceeds limit
```

**✅ Cách sửa:**

```gradle
// Bật minify và shrink
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

---

## 📊 SO SÁNH CÁC LOẠI BUILD

| Loại        | Thời gian build     | Dung lượng          | Tốc độ chạy | Dùng để     |
| ----------- | ------------------- | ------------------- | ----------- | ----------- |
| **Debug**   | 🟢 Nhanh (1-2 phút) | 🔴 Lớn (50-100MB)   | 🔴 Chậm     | Test, debug |
| **Release** | 🔴 Chậm (5-10 phút) | 🟢 Nhỏ (10-30MB)    | 🟢 Nhanh    | Phát hành   |
| **Bundle**  | 🔴 Chậm (5-10 phút) | 🟢 Rất nhỏ (8-25MB) | 🟢 Nhanh    | Google Play |

---

## 🗂️ CẤU TRÚC THƯ MỤC BUILD

```
android/
├── app/
│   ├── build/
│   │   ├── outputs/
│   │   │   ├── apk/
│   │   │   │   ├── debug/
│   │   │   │   │   └── app-debug.apk          ← Debug APK
│   │   │   │   └── release/
│   │   │   │       └── app-release.apk       ← Release APK
│   │   │   └── bundle/
│   │   │       └── release/
│   │   │           └── app-release.aab       ← App Bundle
│   │   └── intermediates/                    ← File tạm
│   ├── src/main/                            ← Source code
│   └── build.gradle                         ← Config build
├── gradle.properties                        ← Config global
└── local.properties                         ← SDK path
```

---

## 🎯 CHECKLIST TẠO APK

### ✅ **Trước khi build:**

- [ ] Cài đặt Android SDK
- [ ] Cài đặt JDK 11+
- [ ] Tạo keystore
- [ ] Cấu hình gradle.properties
- [ ] Test app trên emulator/device

### ✅ **Khi build:**

- [ ] Clean project: `./gradlew clean`
- [ ] Build debug trước: `./gradlew assembleDebug`
- [ ] Test debug APK
- [ ] Build release: `./gradlew assembleRelease`
- [ ] Kiểm tra file APK được tạo

### ✅ **Sau khi build:**

- [ ] Test APK trên thiết bị thật
- [ ] Kiểm tra dung lượng file
- [ ] Test các chức năng chính
- [ ] Backup keystore an toàn
- [ ] Upload lên store hoặc distribute

---

## 🚀 AUTOMATION BUILD

### 📜 Script tự động build:

```bash
#!/bin/bash
# build-apk.sh

echo "🚀 Bắt đầu build APK..."

# Clean project
echo "🧹 Cleaning project..."
cd android && ./gradlew clean

# Build debug
echo "🧪 Building debug APK..."
./gradlew assembleDebug

# Build release
echo "📦 Building release APK..."
./gradlew assembleRelease

# Build bundle
echo "🎁 Building app bundle..."
./gradlew bundleRelease

echo "✅ Build hoàn thành!"
echo "📂 Files tạo ra:"
echo "  Debug: android/app/build/outputs/apk/debug/app-debug.apk"
echo "  Release: android/app/build/outputs/apk/release/app-release.apk"
echo "  Bundle: android/app/build/outputs/bundle/release/app-release.aab"
```

### 🏃‍♂️ Chạy script:

```bash
chmod +x build-apk.sh
./build-apk.sh
```

---

## 📝 TÓM TẮT

### 🎯 **Mục tiêu:** Tạo file APK để cài đặt app Android

### 🛠️ **Tools cần:** Android SDK + JDK + React Native CLI

### 📦 **3 loại build:**

1. **Debug** - Để test (nhanh, lớn, chậm)
2. **Release** - Để phát hành (chậm, nhỏ, nhanh)
3. **Bundle** - Cho Google Play (nhỏ nhất)

### 🔑 **Keystore:** Chìa khóa ký APK (QUAN TRỌNG - không được mất!)

### 📂 **Output:** APK files trong `android/app/build/outputs/`

### 🎉 **Kết quả:** File APK có thể cài đặt trên Android device!

**💡 Lưu ý:** Build lần đầu có thể mất 10-15 phút, những lần sau sẽ nhanh hơn!
