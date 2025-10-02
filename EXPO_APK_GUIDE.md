# 📱 CHI TIẾT: TẠO APK CHO EXPO PROJECT

## 🎯 PHÁT HIỆN QUAN TRỌNG

Dự án này là **EXPO PROJECT**, không phải **bare React Native**!

```json
{
  "main": "expo-router/entry",    ← Đây là dấu hiệu Expo
  "scripts": {
    "start": "expo start",        ← Dùng Expo CLI
    "android": "expo start --android"
  }
}
```

---

## 🏗️ 3 CÁCH TẠO APK CHO EXPO

### 🥇 **CÁCH 1: EAS BUILD (KHUYÊN DÙNG)**

#### 📋 Bước 1: Cài đặt EAS CLI

```bash
npm install -g @expo/cli
npm install -g eas-cli
```

#### 📋 Bước 2: Đăng nhập Expo

```bash
expo login
# Nhập username và password Expo
```

#### 📋 Bước 3: Cấu hình EAS

```bash
eas build:configure
```

Lệnh này sẽ tạo file `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

#### 📋 Bước 4: Build APK

```bash
# Preview APK (để test)
eas build --platform android --profile preview

# Production APK
eas build --platform android --profile production
```

#### 📋 Bước 5: Tải APK về

- Vào https://expo.dev/accounts/[username]/projects/[project-name]/builds
- Tải file APK về máy
- Cài đặt trên Android device

---

### 🥈 **CÁCH 2: EXPO BUILD (CŨ - DEPRECATED)**

```bash
# Cách cũ - không khuyên dùng
expo build:android
```

⚠️ **Lưu ý:** Expo đã ngừng hỗ trợ `expo build`, chuyển sang `eas build`

---

### 🥉 **CÁCH 3: EJECT RA BARE REACT NATIVE**

#### ⚠️ **Cảnh báo:** Eject là **KHÔNG THỂ HOÀN TÁC**!

```bash
# Eject ra bare React Native
npx expo eject

# Sau đó build như bare RN
cd android
./gradlew assembleRelease
```

#### 💭 **Khi nào eject?**

- ✅ Cần native modules không có trong Expo
- ✅ Cần custom native code
- ✅ Cần control hoàn toàn build process
- ❌ Chỉ muốn tạo APK đơn giản

---

## 🔧 HƯỚNG DẪN CHI TIẾT EAS BUILD

### 📱 **Cấu hình app.json/app.config.js**

```json
{
  "expo": {
    "name": "Slot 7 Demo",
    "slug": "slot7demo",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "android": {
      "package": "com.yourname.slot7demo",
      "versionCode": 1,
      "compileSdkVersion": 34,
      "targetSdkVersion": 34,
      "buildToolsVersion": "34.0.0"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### 🔑 **Tạo Keystore cho Production**

#### Tự động (khuyên dùng):

```bash
eas credentials
```

#### Thủ công:

```bash
# Tạo keystore
keytool -genkey -v -keystore my-upload-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Upload lên EAS
eas credentials
```

### 📦 **Các Profile Build**

#### 🧪 **Development Profile:**

```json
"development": {
  "developmentClient": true,
  "distribution": "internal",
  "android": {
    "gradleCommand": ":app:assembleDebug"
  }
}
```

#### 🎯 **Preview Profile:**

```json
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

#### 🚀 **Production Profile:**

```json
"production": {
  "android": {
    "buildType": "aab"
  }
}
```

---

## 🛠️ SỬA LỖI REACT NATIVE CLI

Lỗi ban đầu của bạn:

```
⚠️ react-native depends on @react-native-community/cli
```

### ✅ **Giải pháp cho Expo:**

**Không cần React Native CLI** vì đây là Expo project!

```bash
# Thay vì
npx react-native run-android

# Dùng
expo start --android
# hoặc
npm run android
```

### 📱 **Chạy trên Android với Expo:**

#### Cách 1: Expo Go (dễ nhất)

```bash
expo start
# Scan QR code bằng Expo Go app
```

#### Cách 2: Development Build

```bash
eas build --profile development --platform android
# Cài APK development build
# Chạy expo start --dev-client
```

#### Cách 3: Android Emulator

```bash
expo start --android
# Tự động mở emulator và install
```

---

## 📊 SO SÁNH EXPO VS BARE REACT NATIVE

| Tính năng          | Expo         | Bare React Native     |
| ------------------ | ------------ | --------------------- |
| **Setup**          | 🟢 Rất dễ    | 🔴 Phức tạp           |
| **Build APK**      | 🟢 EAS Build | 🔴 Cần setup keystore |
| **Native Modules** | 🔴 Giới hạn  | 🟢 Không giới hạn     |
| **Size APK**       | 🔴 Lớn hơn   | 🟢 Nhỏ hơn            |
| **OTA Updates**    | 🟢 Built-in  | 🔴 Cần setup          |
| **CI/CD**          | 🟢 EAS Build | 🔴 Tự setup           |

---

## 🎯 QUYẾT ĐỊNH: NÊN DÙNG CÁCH NÀO?

### 🎯 **Cho dự án này (Demo):**

**👍 Khuyên dùng EAS Build**

**Lý do:**

- ✅ Dự án đã là Expo → giữ nguyên
- ✅ Demo đơn giản → không cần eject
- ✅ EAS Build dễ setup
- ✅ Không cần custom native code

### 📋 **Các bước cụ thể:**

#### Bước 1: Cài đặt tools

```bash
npm install -g @expo/cli eas-cli
```

#### Bước 2: Đăng nhập

```bash
expo login
```

#### Bước 3: Cấu hình

```bash
eas build:configure
```

#### Bước 4: Build APK

```bash
eas build --platform android --profile preview
```

#### Bước 5: Tải về và test

- Vào expo.dev dashboard
- Download APK
- Install trên device

---

## 📝 **DEMO SCRIPT CẬP NHẬT**

### 🎤 **Script cho presenter:**

> "Trong demo này, chúng ta đang dùng **Expo framework**. Expo làm cho việc tạo APK **đơn giản hơn rất nhiều** so với bare React Native.
>
> Thay vì phải setup Android SDK, keystore, gradle... chúng ta chỉ cần:
>
> 1. **Một lệnh** `eas build`
> 2. **Chờ cloud build**
> 3. **Tải APK về**
>
> Đây là lý do tại sao nhiều developer chọn Expo cho các dự án không cần custom native code."

### 🛠️ **Live Demo Steps:**

1. **Show terminal error:**

   ```bash
   npx react-native run-android  # ❌ Lỗi
   ```

2. **Explain why:**

   > "Lỗi này vì đây là Expo project, không phải bare React Native"

3. **Show correct way:**

   ```bash
   expo start --android  # ✅ Đúng
   ```

4. **Demo build simulation:**
   - Bấm "Start APK Build" trong demo app
   - Giải thích từng bước tương ứng với EAS Build

---

## 🚀 **KẾT LUẬN**

### ✅ **Cho Expo Projects:**

- Dùng **EAS Build**
- Không cần setup Android SDK/keystore phức tạp
- Build trên cloud, tải APK về

### ⚠️ **Lưu ý quan trọng:**

- Expo có **size limit** cho APK
- Một số **native modules** không support
- **EAS Build** cần **internet** và **Expo account**

### 🎯 **Demo takeaway:**

> "Expo giúp việc tạo APK **dễ dàng hơn**, nhưng đánh đổi **tính linh hoạt**. Chọn tool phù hợp với nhu cầu project!"

**🎉 Bây giờ bạn đã hiểu cách tạo APK cho cả Expo và bare React Native!**
