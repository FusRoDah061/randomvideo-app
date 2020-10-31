# Build Android release

Run gradle build to generate final aab: `gradlew clean bundleRelease`

## Manually install on device

Requires [Google's bundletool](https://github.com/google/bundletool/releases)

After running the release build, use te following commands to install on device:

```shell
java -jar bundletool-all-1.3.0.jar ^
build-apks ^
--bundle=app/build/outputs/bundle/release/app-release.aab ^
--output=app-release.apks ^
--ks=your_keystore.keystore ^
--ks-key-alias=your_keystore_alias ^
--ks-pass=pass:keystore-pass
```

Adjust the keystore parameters to your environment.
