# ✅ DEMO CHECKLIST - Quick Reference

## 🚀 PRE-DEMO SETUP (5 phút)

- [ ] `npm start` → chọn platform
- [ ] Test tất cả 3 demo screens
- [ ] Mở Developer Console (F12)
- [ ] Prepare Android emulator (nếu demo trên Android)

---

## 🐛 ERROR HANDLING DEMO (15 phút)

### ⏱️ Thời gian từng phần:

- **Intro + Common Errors** (5 phút)
- **Try-Catch Demo** (3 phút)
- **Error Boundary Demo** (4 phút)
- **Network + Debug Tools** (3 phút)

### 🎯 Key Actions:

1. **Try-Catch**:

   - ✅ Test "Validate Input: test"
   - ❌ Change to "ab" → test validation error

2. **Error Boundary**:

   - ✅ "Break Component" → see error UI
   - ✅ "Try Again" → component recovers

3. **Network**:

   - ✅ "Fetch Success" → green message
   - ❌ "Fetch Error" → red error

4. **Debug**:
   - ✅ "Log Debug Info" → check console

### 💬 Key Talking Points:

- "Error handling prevents crashes và improves UX"
- "Error Boundary catches component errors, try-catch cho logic"
- "Always handle network errors trong mobile apps"

---

## 📦 APK BUILD DEMO (15 phút)

### ⏱️ Thời gian từng phần:

- **Intro + Prerequisites** (3 phút)
- **Keystore Generation** (3 phút)
- **Gradle Configuration** (2 phút)
- **Build Simulation** (5 phút)
- **Troubleshooting** (2 phút)

### 🎯 Key Actions:

1. **Keystore**:

   - ✅ Show command trong code box
   - ✅ "Copy Command" → explain importance

2. **Configuration**:

   - ✅ Review build.gradle code
   - ✅ Review gradle.properties

3. **Build Simulation**:
   - ✅ "Start APK Build" → watch 8-step progress
   - ✅ Final success alert

### 💬 Key Talking Points:

- "APK = Android Package Kit, có Debug và Release"
- "Keystore chứa private key để sign APK - MẤT = không update được"
- "Release APK được optimize và signed cho production"

---

## 🔄 UPDATES DEMO (15 phút)

### ⏱️ Thời gian từng phần:

- **Strategies Overview** (3 phút)
- **Manual Update Flow** (5 phút)
- **Background Strategy** (2 phút)
- **OTA Services** (3 phút)
- **Best Practices** (2 phút)

### 🎯 Key Actions:

1. **Strategies**:

   - ✅ Switch between Manual/Background/Immediate
   - ✅ Read descriptions

2. **Manual Flow**:

   - ✅ "Check for Updates" → see update info
   - ✅ "Install Update" → watch progress bar
   - ✅ Version changes 1.0.0 → 1.1.0

3. **Background**:
   - ✅ Select Background → auto-checking starts
   - ✅ Wait for automatic update notification

### 💬 Key Talking Points:

- "3 strategies: Manual (user control), Background (balanced), Immediate (always latest)"
- "OTA updates = không qua app store, faster deployment"
- "Expo Updates cho Expo, CodePush universal cho RN"

---

## 🎤 PRESENTATION TIPS

### 🗣️ Opening Script:

> "Chào mọi người! Hôm nay chúng ta học 3 kỹ năng quan trọng trong React Native: Error Handling để tránh crashes, APK Build để deploy Android, và App Updates để maintain users."

### 🎯 Engagement Techniques:

- **Poll audience**: "Ai đã từng gặp app crash?"
- **Interactive**: "Hãy guess xem error gì sẽ xảy ra..."
- **Real examples**: "Trong projects của mình, các bạn handle errors như nào?"

### 🔥 Key Messages:

1. **Error Handling** = Professional app development
2. **APK Build** = Understanding deployment process
3. **Updates** = Keeping users happy với latest features

### ⚠️ Common Pitfalls:

- Đừng spend quá nhiều time trên theory
- Focus vào interactive demos
- Always explain "why" not just "how"
- Prepare backup nếu demo fails

### 📱 Demo Device Tips:

- **Web**: Best cho presentation, easy screen sharing
- **Android**: More realistic, need good emulator
- **iOS**: Chỉ nếu có macOS và iOS Simulator

---

## 🆘 TROUBLESHOOTING

### Nếu Demo Crashes:

1. Restart Expo server: `r` trong terminal
2. Clear cache: `Ctrl+C` → `npm start --clear`
3. Fallback: Show code examples

### Nếu Updates Không Work:

- Simulated updates, explain real implementation
- Show code examples trong OTA services section

### Nếu APK Build Simulation Slow:

- Explain từng step while waiting
- Show real gradle commands

### Q&A Preparation:

- **"Có thể update native code OTA không?"** → Không, chỉ JS/assets
- **"Keystore mất thì sao?"** → Không thể update app, phải publish new app
- **"Which update strategy best?"** → Depends on app criticality

---

## 📊 SUCCESS METRICS

### Audience Should Understand:

- [ ] Tại sao error handling important
- [ ] Cách implement try-catch và Error Boundary
- [ ] APK build process từ keystore đến final APK
- [ ] 3 update strategies và khi nào dùng
- [ ] Difference giữa Expo Updates và CodePush

### Demo Completion Checklist:

- [ ] All interactive elements tested
- [ ] Error scenarios demonstrated
- [ ] Build process simulated successfully
- [ ] Update flow completed
- [ ] Code examples explained
- [ ] Q&A questions answered

**🎯 Ready to demo! Good luck! 🚀**
