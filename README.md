# cordova-plugin-dexkeep

A Cordova plugin that makes sure that plugin classes referenced as features in other plugin.xml files are put in the main dex file.
Because Cordova loads these classess from string class names, they might not end up in the main dex file by default.
Having CordovaPlugin classes outside of the main dex file will cause a ClassNotFoundException on Dalvik.
