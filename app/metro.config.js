/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
var blacklist = require('metro-config/src/defaults/blacklist');
console.log(path.resolve(__dirname, "../"))
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [path.resolve(__dirname, "../")],
  resolver: {
  blacklistRE: blacklist([/..\/db\/journal.*/,
    /..\/db\/.*/,
    /..\/server\/.*/,])
  }
};
