if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false


//global.net = require('react-native-tcp');
//global.tls = require('react-native-tcp/tls');
global.net = require('./src/ngu_modules/net');
global.tls = require('./src/ngu_modules/tls');

// use testnet or mainnet. enable true for testing
global.useTestnet = true;

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto')
