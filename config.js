let fs = require('fs')
let chalk = require('chalk')
global.owner = ['6281515589573', '6281515589573']
global.autoread = false
global.selfmode = false
global.thumb = './thumb/itsuki.jpg'
global.fakereplyt = 'Rikka-Botz WhatsApp'
global.mess = {
group : {
welcome : `Welcome @user\n\nSelamat datang di grup @subject`,
bye : `Bye @user`,
promote: '@user Sekarang admin!',
demote: '@user Sekarang bukan admin!'
},
error : 'Terjadi Kesalahan',
success: 'Sukses...'
}
global.server = false
global.prefix = '🐤'
global.author = '@RAMAganz'
global.packname = 'Sefl_Bot'


// LIST APIKEY

global.APIs = { // API Prefix

  clph: 'https://recoders-area.caliph.repl.co',
  rikka: 'https://rikka-api.xyz',
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  lol: 'https://api.lolhuman.xyz',
  vh: 'http://api.vhtear.com',
  zeks: 'https://api.zeks.me',
  caliphAPI: 'https://api.caliph71.xyz'
}

global.APIKeys = { // APIKey Here
   'http://api.vhtear.com': 'FauzanBotz',
   'https://api.lolhuman.xyz': 'WanOff',
  'https://api.xteam.xyz': 'kurrxd09'
,
  'https://api.zeks.me': 'rikkabotwa',
  'https://rikka-api.xyz': 'vKi3BY7N',
   'https://api.caliph71.xyz': 'NICWWUGf'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
