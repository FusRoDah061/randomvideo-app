# Debug

Generate debug key (with both passwords as "android"):
`keytool -genkeypair -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000`

Generate certificate fingerprint and update the credentials on Google API console
`keytool -list -v -keystore app\debug.keystore -alias androiddebugkey`

# Release

Generate upload key:
`keytool -genkeypair -v -keystore randomvideo-upload-key.keystore -alias randomvideo-key-alias -keyalg RSA -keysize 2048 -validity 10000`

Generate certificate fingerprint and update the credentials on Google API console
`keytool -list -v -keystore app\randomvideo-upload-key.keystore -alias randomvideo-key-alias`

Generate the apk
```shell
cd android
gradlew bundleRelease
```

## Zipalign

zipalign:
`%ANDROID_HOME%\build-tools\29.0.2\zipalign -p 4 app\build\outputs\apk\release\app-release.apk app\build\outputs\apk\release\app-release-aligned.apk`

verify:
`%ANDROID_HOME%\build-tools\29.0.2\zipalign -c 4 app\build\outputs\apk\release\app-release-aligned.apk`

## Sign

sign:
`%ANDROID_HOME%\build-tools\29.0.2\apksigner sign --ks app\randomvideo-upload-key.keystore --ks-key-alias randomvideo-key-alias app\build\outputs\apk\release\app-release-aligned.apk`

verify:
`%ANDROID_HOME%\build-tools\29.0.2\apksigner verify app\build\outputs\apk\release\app-release-aligned.apk`
