# React Native Demo - Slot 7

## Kịch bản Demo: Error Handling, Debugging, APK Build & Updates

### 📋 Tổng Quan Demo

Demo này bao gồm 4 chủ đề chính:

1. **Error Handling & Debugging** - Xử lý lỗi và debug
2. **Creating Android APK Files** - Tạo file APK Android
3. **Handling App Updates** - Quản lý cập nhật ứng dụng

### 🚀 Chạy Demo

```bash
# Cài đặt dependencies
npm install

# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên Web
npm run web
```

### 📱 Kịch bản Demo Chi Tiết

## 1. Error Handling & Debugging (15 phút)

### A. Tầm quan trọng của Error Handling

**Thời gian: 2 phút**

- Giải thích tại sao cần xử lý lỗi
- Tác động đến user experience
- Bảo vệ dữ liệu và bảo mật

**Demo Script:**

> "Chào mọi người! Hôm nay chúng ta sẽ tìm hiểu về Error Handling trong React Native. Đầu tiên, tại sao chúng ta cần xử lý lỗi?"

### B. Các loại lỗi phổ biến

**Thời gian: 3 phút**

- **Syntax Errors**: Lỗi cú pháp
- **Runtime Errors**: Lỗi khi chạy
- **Logic Errors**: Lỗi logic
- **Network Errors**: Lỗi mạng
- **Type Errors**: Lỗi kiểu dữ liệu

**Demo Script:**

> "Trong React Native, chúng ta thường gặp 5 loại lỗi chính. Hãy xem ví dụ cụ thể..."

### C. Techniques xử lý lỗi

**Thời gian: 8 phút**

1. **Try-Catch Blocks**

   - Demo validation input
   - Thử với input hợp lệ và không hợp lệ

2. **Error Boundaries**

   - Bấm "Break Component" để trigger error
   - Thấy Error Boundary catch lỗi
   - Bấm "Try Again" để phục hồi

3. **Network Error Handling**
   - Demo "Fetch Success" và "Fetch Error"
   - Xem cách handle loading states
   - Hiển thị error messages

**Demo Script:**

> "Bây giờ chúng ta thực hành với các techniques. Đầu tiên là Try-Catch..."

### D. Debugging Tools

**Thời gian: 2 phút**

- Console.log debugging
- React DevTools
- Chrome DevTools
- Flipper
- Breakpoints

**Demo Script:**

> "Để debug hiệu quả, chúng ta có nhiều tools. Hãy thử 'Log Debug Info' để xem console..."

## 2. Creating Android APK Files (15 phút)

### A. Giới thiệu APK

**Thời gian: 2 phút**

**Demo Script:**

> "APK là Android Package Kit - định dạng file cài đặt cho Android. Có 2 loại: Debug APK cho development và Release APK cho production."

### B. Prerequisites

**Thời gian: 1 phút**

- Android Studio/SDK
- JDK 11+
- React Native CLI

### C. Quy trình tạo APK

**Thời gian: 10 phút**

1. **Generate Keystore**

   - Giải thích keystore là gì
   - Copy command để tạo keystore

2. **Configure Gradle**

   - Xem file build.gradle
   - Cấu hình signing

3. **Build Simulation**
   - Bấm "Start APK Build"
   - Xem progress bar và build steps
   - Giải thích từng bước

**Demo Script:**

> "Đầu tiên chúng ta cần tạo keystore để sign APK. Keystore chứa private key..."

### D. Troubleshooting

**Thời gian: 2 phút**

- Common build errors
- Solutions

## 3. Handling App Updates (15 phút)

### A. Update Strategies

**Thời gian: 3 phút**

- **Immediate**: Cập nhật ngay lập tức
- **Background**: Cập nhật nền
- **Manual**: Người dùng chọn

**Demo Script:**

> "Có 3 chiến lược update chính. Hãy thử chuyển đổi giữa các strategies..."

### B. OTA Updates Demo

**Thời gian: 8 phút**

1. **Check for Updates**

   - Bấm "Check for Updates"
   - Xem available update info

2. **Install Update**

   - Bấm "Install Update"
   - Xem progress bar download
   - Version được cập nhật

3. **Critical Updates**
   - Simulate critical update alert

**Demo Script:**

> "Over-The-Air updates cho phép cập nhật app mà không qua app store..."

### C. OTA Services

**Thời gian: 3 phút**

- **Expo Updates**: Built-in cho Expo
- **CodePush**: Microsoft solution
- So sánh features

### D. Best Practices

**Thời gian: 1 phút**

- Version management
- User experience
- Rollback strategy
- Testing

## 🎯 Tips cho Demo

### Preparation Checklist

- [ ] Mở app và test tất cả demos
- [ ] Chuẩn bị Android device/emulator
- [ ] Check console logs hoạt động
- [ ] Test error scenarios

### Demo Flow

1. **Mở trang chính** - Giới thiệu 3 demos
2. **Error Handling** - Thực hành các scenarios
3. **APK Build** - Giải thích quy trình và simulate
4. **Updates** - Demo các update strategies

### Interactive Elements

- Tất cả buttons đều functional
- Error messages hiển thị thực tế
- Progress bars animate
- Console logs để debugging

### Q&A Preparation

**Error Handling:**

- Q: "Khi nào dùng Error Boundary vs try-catch?"
- A: "Error Boundary cho component errors, try-catch cho logic/async operations"

**APK Build:**

- Q: "Sự khác biệt giữa Debug và Release APK?"
- A: "Debug có debug info, Release được optimized và signed"

**Updates:**

- Q: "CodePush vs Expo Updates?"
- A: "CodePush universal cho RN, Expo Updates chỉ cho Expo projects"

### Technical Notes

- Demo app sử dụng Expo Router
- Tất cả code examples có thể copy
- Simulated APIs cho realistic experience
- Error scenarios được design để educational

---

## 📝 Kết Luận Demo

Demo này cung cấp:
✅ Hiểu biết sâu về error handling patterns
✅ Kỹ năng debug thực tế  
✅ Quy trình build APK complete
✅ Chiến lược update apps hiệu quả
✅ Hands-on experience với interactive examples

**Thời gian total: ~45 phút**
**Level: Intermediate**
**Requirements: React Native básics**
