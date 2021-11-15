keytool -genkey -v -keystore mitigasi.keystore -alias mitigasi -keyalg RSA -keysize 2048 -validity 10000

change into the /platforms/android folder and run ./gradlew bundleRelease. 
On Windows, the file might be called gradlew.bat instead.

./zipalign -v 4 D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\apk\release\app-release.apk
./apksigner sign --ks D:\PROGRAMS\IONIC\mitigasi\mitigasi.keystore D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\apk\release\app-release.apk
./apksigner verify D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\apk\release\app-release.apk

./zipalign -v 4 D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\bundle\release\app-release.aab D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\bundle\release\app-release-uploaded.aab
./apksigner sign --min-sdk-version 21 --ks D:\PROGRAMS\IONIC\mitigasi\mitigasi.keystore D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\bundle\release\app-release.aab
./apksigner verify D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\bundle\release\app-release-uploaded.aab

java -jar bundletool.jar build-apks --bundle=D:\PROGRAMS\IONIC\mitigasi\platforms\android\app\build\outputs\bundle\release\app-release.aab --output=out_bundle_archive_set.apks
java -jar bundletool.jar install-apks --apks=out_bundle_archive_set.apks