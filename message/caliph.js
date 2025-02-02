/*
Info Author

github : caliph91
YouTube : caliph71
Website : https://caliph71.xyz 

*/
let util = require('util')
let fs = require('fs')
let chalk = require('chalk')
let getBuffer = require('../lib/fetcher').buffer
let getJson = require('../lib/fetcher').json
let getText = require('../lib/fetcher').text
let tahta = require('../lib/tahta')
let tahta2 = require('../lib/tahta2')
let axios = require('axios')
let brainly = require ('brainly-scraper')
let ocr = require('../lib/ocr')
let {
MessageType: mType
} = require('@adiwajshing/baileys')
let { sticker, addExif } = require('../lib/sticker')
let antidelete = JSON.parse(fs.readFileSync('./database/chat/antidelete.json').toString())
let welcome = JSON.parse(fs.readFileSync('./database/chat/welcome.json').toString())
let left = JSON.parse(fs.readFileSync('./database/chat/left.json').toString())
let detect = JSON.parse(fs.readFileSync('./database/chat/detect.json').toString())
let { exec } = require("child_process")
let { color } = require('../lib/color')
let moment = require('moment')
module.exports = async function connect(caliph, m) {
try {
if (m.isBaileys) return
let groupMetadata = m.isGroup ? await caliph.groupMetadata(m.chat) : ''
let groupMem = m.isGroup ? groupMetadata.participants : ''
let groupAdm = m.isGroup ? groupMem.filter(a => a.isAdmin) : []
let isBotAdm = m.isGroup ? groupMem.find(a => a.jid == caliph.user.jid).isAdmin : false
let isAdmin = m.isGroup ? groupMem.find(a => a.jid == m.sender).isAdmin : false
let budy = (typeof m.text == 'string' ? m.text : '')
let body = budy
let isVideo = (m.quoted ? m.quoted.mtype : m.mtype) == mType.video
let isImage = (m.quoted ? m.quoted.mtype : m.mtype) == mType.image
let args = body.trim().split(/ +/).slice(1)
let command = (budy.toLowerCase().split(/ +/)[0] || '')
let prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~`,*zxcv!?@#$%^&.\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓=|~`,*zxcv!?@#$%^&.\/\\©^]/gi) : global.prefix
let isCmd = body.startsWith(prefix)
let { ffmpeg } = require('../lib/converter')
let isOwner = global.owner.includes(m.sender.split('@')[0]) || m.key.fromMe
if (isCmd && !m.isGroup) {console.log(color('[EXEC]', 'cyan'), color(moment(m.messageTimestamp.low * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(caliph.getName(m.sender)))}
if (isCmd && m.isGroup) {console.log(color('[EXEC]', 'cyan'), color(moment(m.messageTimestamp.low * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(caliph.getName(m.sender)), 'in', color(groupMetadata.subject))}
let text = q = args.join(' ')

if (m.mentionedJid.includes(caliph.user.jid)) {
// function kalo ngetag bakal ngirim stiker sendiri
caliph.sendMessage(m.chat, { url: 'https://i.ibb.co/sFbdXfj/6984d8315885.webp' }, 'stickerMessage', { quoted: m, fileLength: 99999999999999 })
} 

/* Fake Reply */
function freply(texts = fakereplyt, thumbnail = Buffer.alloc(0)) {
return {key:{ fromMe:false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: {

					"productMessage": {
						"product": {
							"productImage": {
                                                                "jpegThumbnail": thumbnail
		},
							"productId": "0",
							"title": texts,
							"currencyCode": "USD",
							"priceAmount1000": "99",
							"productImageCount": 1
						},
						"businessOwnerJid": "0@s.whatsapp.net"}}}
}
/* Ends Fake Reply */
						 switch(command) {
case prefix+'help': case prefix+'menu':
caliph.updatePresence(m.chat, 'composing')
var menu = `*WHATSAPP BOT*

Source code : https://clph.pw/m9oU
Author : @caliph91
Lib : Baileys
Battery : ${caliph.battery ? caliph.battery.value +'%' : 'Belum kedetect'} ${caliph.battery ? caliph.battery.live ? '🔌 Charging...' : '⚡ Discharging' : ''}

Group Menu
- ${prefix}kick @tag/reply message
- ${prefix}add 628×××××/reply message
- ${prefix}demote @tag/reply message
- ${prefix}antidelete enable/disable
- ${prefix}welcome enable/disable
- ${prefix}left enable/disable
- ${prefix}promote @tag/reply message
- ${prefix}hidetag text
- ${prefix}linkgroup 

Owner Menu
- ${prefix}block @tag/reply message
- ${prefix}unblock @tag/reply message
- ${prefix}setname text
- ${prefix}setbio text
- ${prefix}join linkgroup
- > JavaScript Code
- => JavaScript Code
- ${prefix}public
- ${prefix}self

Other Menu
- ${prefix}toimg (reply sticker)
- ${prefix}tahta (teks)
- ${prefix}tahta2 (teks)
- ${prefix}ttp (teks)
- ${prefix}attp (teks)
- ${prefix}attp2 (teks)
- ${prefix}attp3 (teks)
- ${prefix}sticker (reply image/video)

Search Menu
- ${prefix}pinterest (query)
- ${prefix}wiki (query)
- ${prefix}playvid (query)
- ${prefix}play (query)

Education Menu
- ${prefix}brainly (pertanyaan)
- ${prefix}wiki (query)
- ${prefix}wikipedia (query)
- ${prefix}calc 10-3

Convert Menu 
- ${prefix}tomp3 (Reply/Kirim Video)
- ${prefix}toimg (Reply Sticker)
- ${prefix}togif (Reply Sticker GIF)
- ${prefix}tovideo (Reply Sticker GIF)

Random Menu 
- ${prefix}ppcouple
- ${prefix}loli
- ${prefix}waifu
- ${prefix}katabijak
- ${prefix}dare
- ${prefix}truth
- ${prefix}dadu 
- ${prefix}lolivid

`.trim()
var img = fs.readFileSync(global.thumb)
caliph.sendMessage(m.chat, img, mType.image, { quoted: freply('Rikka-Botz WhatsApp', img), caption: menu })
break 
case prefix+'ocr':
case prefix+'imgtotext':
case prefix+'img2text':
if (!isImage) throw `Reply Gambar Dengan Caption ${command} Untuk Menjadikan Gambar ke teks`
med = m.quoted ? m.quoted.fakeObj : m
dl = await caliph.downloadAndSaveMediaMessage(med)
result = await ocr(dl)
m.reply(`*IMAGE TO TEXT*:\n\nResult : \`\`\`${result}\`\`\``)
break
case prefix+'lolivid':
case prefix+'asupanloli':
m.reply(`_*Tunggu permintaan anda sedang diproses..*_`)
var url = global.API('caliphAPI', '/api/asupan/loli', {}, 'apikey')
caliph.sendMessage(m.chat, { url }, mType.video, { quoted: m })
break
case prefix+'waifu':
m.reply(`_*Tunggu permintaan anda sedang diproses..*_`)
var url = global.API('caliphAPI', '/api/waifu', {}, 'apikey')
caliph.sendMessage(m.chat, { url }, mType.image, { quoted: m , caption: 'Larii Ada Wibu...'})
break
case prefix+'public':
if (!isOwner) throw `Perintah Ini Khusus Owner Bot!`
global.selfmode = false
m.reply(`\`\`\`STATUS : PUBLIC\`\`\``)
break
case prefix+'self':
if (!isOwner) throw `Perintah Ini Khusus Owner Bot!`
global.selfmode = true
m.reply(`\`\`\`STATUS : SELF\`\`\``)
break
case prefix+'nulis':
if (!text) throw `Teksnya ko gada mhank?`
var { result } = await getJson(`https://pythonapis.clph.me/api/nulis?text=${encodeURIComponent(text)}`)
caliph.sendMessage(m.chat, { url: result }, mType.image, { quoted: m, fileLength: 999999999999999, caption: 'Neh mhank. Dah Jadi Ni...' })
break
case prefix+'loli':
m.reply(`_*Tunggu permintaan anda sedang diproses..*_`)
var url = global.API('caliphAPI', '/api/loli', {}, 'apikey')
caliph.sendMessage(m.chat, { url }, mType.image, { quoted: m , caption: 'Lolinya banh...'})
break
case prefix+'setthumb':
if (!isOwner) return
if (!isImage) throw `Kirim/Reply Foto Dengan Caption ${command}`
yoi = m.quoted ? m.quoted : m
 buffer = await yoi.download()
fs.writeFileSync(global.thumb, buffer)
caliph.reply(m.chat, 'Sukses Mengganti Thumbnail...', freply(null, buffer))
break
case prefix+'tomp3':
if (!isVideo) return m.reply(`Reply/Kirim Video Dengan Caption ${command}`)
m.reply('Mohon tunggu sebentar')
json = m.quoted ? m.quoted.fakeObj : m
det = new Date / 1000
var media = await caliph.downloadAndSaveMediaMessage(json, `./tmp/${det}`)
exec(`ffmpeg -i ${media} ./tmp/${det}.mp3`, async (err) => {
if (err) return m.reply('Error!')
await caliph.sendMessage(m.chat, { url: `./tmp/${det}.mp3` }, mType.audio, { quoted: m, mimetype: 'audio/mpeg' })
fs.unlinkSync(media)
fs.unlinkSync(`./tmp/${det}.mp3`)
})
break
case prefix+'calc':
caliph.updatePresence(m.chat, 'composing')
if (!text) return m.reply(`Teksnya Mana ajg!!!`)
var val = text

    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
 var formats = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')

result = require('mathjs').evaluate(val)

m.reply(`_${formats}_ = ${result}`)
break
case prefix+'ping': 
old = new Date
await m.reply(`Testing ping...`)
m.reply('Speed : '+String(new Date - old) + 'ms')
break
case prefix+'ppcouple': 
m.reply('Mohon tunggu sebentar...')
data = await getJson(global.API('caliphAPI', '/api/ppcouple', null, 'apikey'))
caliph.sendMessage(m.chat, { url: data.result.male }, 'imageMessage', { quoted: m })
caliph.sendMessage(m.chat, { url: data.result.female }, 'imageMessage', { quoted: m })
break
case prefix+'katabijak': 
data = await getText('https://raw.githubusercontent.com/Caliph91/txt/main/katabijak.txt')
array = data.split('\n')
random = array[Math.floor(Math.random() * array.length)]
m.reply(random)
break
case prefix+'play':
if (!q) throw 'Cari apa?'
var { video, result } = await getJson(global.API('caliphAPI', '/api/ytplaymp3', { text }, 'apikey'))
var caption = `Title : ${video.title}\nDuration : ${video.timestamp}\nUrl : https://youtu.be/${video.videoId}\nViews : ${video.views}\nUpload by : ${video.author.name}\nLink Channel : ${video.author.url}`.trim()
caliph.sendMessage(m.chat, { url: video.image }, 'imageMessage', { quoted: m, caption })
caliph.sendMessage(m.chat, { url: result.url }, 'audioMessage', { quoted: m, mimetype: 'audio/mpeg' })
break
case prefix+'playvid':
if (!q) throw 'Cari apa?'
var { video, result } = await getJson(global.API('caliphAPI', '/api/ytplaymp4', { text }, 'apikey'))
var caption = `Title : ${video.title}\nDuration : ${video.timestamp}\nUrl : https://youtu.be/${video.videoId}\nViews : ${video.views}\nUpload by : ${video.author.name}\nLink Channel : ${video.author.url}`.trim()
caliph.sendMessage(m.chat, { url: video.image }, 'imageMessage', { quoted: m, caption })
caliph.sendMessage(m.chat, { url: result.url }, 'videoMessage', { quoted: m })
break
case prefix+'togif':
if (!m.quoted && m.quoted.mtype != mType.sticker) throw 'Reply Stikernya!'
if (!m.quoted.isAnimated) throw 'Reply Sticker Yang berbentuk gif!'
m.reply('Mohon tunggu sebentar~')
var url = await require('../lib/webp2mp4').webp2mp4(await m.quoted.download())
caliph.sendMessage(m.chat, { url }, 'videoMessage', { caption: `Sukses~`, mimetype: 'video/gif', quoted: m })
break
case prefix+'tovideo':
case prefix+'tovid':
case prefix+'tomp4':
if (!m.quoted) throw 'Reply Stiker/video Yang ingin dijadikan video!'
if (m.quoted.mtype == mType.audio) {
m.reply('```Tunggu bentar...```')
media = await ffmpeg(await m.quoted.download(), [
            '-filter_complex', 'color',
            '-pix_fmt', 'yuv420p',
            '-crf', '51',
            '-c:a', 'copy',
            '-shortest'
        ], 'mp3', 'mp4')

caliph.sendMessage(m.chat, media, mType.video, { quoted: m, caption: `Sukses~` })
} else if (m.quoted.mtype == mType.sticker && m.quoted.isAnimated) {
m.reply('```Tunggu bentar```')
var url = await require('../lib/webp2mp4').webp2mp4(await m.quoted.download())
caliph.sendMessage(m.chat, { url }, 'videoMessage', { caption: `Sukses~`, mimetype: 'video/mp4', quoted: m })
} else throw 'Reply Stiker/Audio Yang Mau dijadiin video!'
break
case prefix+'dadu':
var array_dadu = ["https://storage.caliph71.xyz/dadu/v2/1.webp", "https://storage.caliph71.xyz/dadu/v2/2.webp", "https://storage.caliph71.xyz/dadu/v2/3.webp", "https://storage.caliph71.xyz/dadu/v2/4.webp", "https://storage.caliph71.xyz/dadu/v2/5.webp", "https://storage.caliph71.xyz/dadu/v2/6.webp" ]
var random = array_dadu[Math.floor(Math.random() * array_dadu.length)]
caliph.sendMessage(m.chat, { url: random }, mType.sticker, { quoted: m })
break
case prefix+'dare': 
data = await getJson('https://raw.githubusercontent.com/Caliph91/txt/main/dare.json')
array = data
random = array[Math.floor(Math.random() * array.length)]
m.reply(random)
break
case prefix+'truth': 
data = await getJson('https://raw.githubusercontent.com/Caliph91/txt/main/truth.json')
array = data
random = array[Math.floor(Math.random() * array.length)]
m.reply(random)
break
case prefix+'brainly':
if (!q) return m.reply('Soalnya?')
m.reply('*_Tunggu permintaan anda sedang diproses..._*')
brainly(q, 10)
.then(async bren => {
 teks = '*「 _BRAINLY_ 」*\n\n'

	no = 0
   for (let data of bren.data) {
   hem = data.jawaban
    no += 1
	teks += `\n*➸ Pertanyaan ${no}:* ${data.pertanyaan}\n\n*➸ Jawaban ${no}:* ${data.jawaban[0].text}\n\n❉───────────❉\n`
	}
	caliph.sendMessage(m.chat, teks, 'conversation', {quoted: m, detectLinks: false})
    }).catch(console.error)
break
case prefix+'pinterest':
case prefix+'pin':
if (!q) throw `Cari apa?`
m.reply('_*Tunggu permintaan anda sedang diproses...*_')
var { result } = await getJson(global.API('caliphAPI', '/api/pinterest', { q }, 'apikey'))
caliph.sendMessage(m.chat, { url: result[Math.floor(Math.random() * result.length)] }, mType.image, { quoted: m, caption: `Hasil pencarian : ${q}` })
break
case prefix+'wiki':
case prefix+'wikipedia':
if (!q) return m.reply(`Contoh Penggunaan\n${prefix}wiki google`)
m.reply(`_*Tunggu permintaan anda sedang diproses..._*`)
result = await require('wikijs').default({ apiUrl: 'https://id.wikipedia.org/w/api.php' }).page(text).then(page => page.rawContent())
hasil = `*${text}*\n\n${result}`.trim()
m.reply(hasil)
break
case prefix+'darkjokes':
url = global.API('caliphAPI',  '/api/darkjokes', null, 'apikey')
caliph.sendMessage(m.chat,  { url }, mType.image,  { quoted: m })
break
case prefix+'tiktok':
case prefix+'tiktokdl':
if (!q) throw 'URLnya Mana kak?'
if (!/https?:\/\//.test(q) && !q.includes('tiktok.com')) throw `Silahkan masukkan URL yang valid!`
m.reply(`Mohon tunggu sebentar....`)
url = global.API('caliphAPI', '/api/tiktok', { url : q }, 'apikey') 
json = await axios.get(url)
if (json.data.result == {}) throw 'URL tidak valid!'
yeh = await getBuffer(json.data.result.nowatermark).catch(err => {
throw `File Gagal Di Download...\nSilahkan Download Sendiri\nLink : ${json.data.result.nowatermark}`
})
caliph.sendMessage(m.chat, yeh,'videoMessage', { quoted: m, caption:'Video Berhasil didownload!' })
break
case '>':
if (!isOwner) return 
try {
ev = await eval(`(async () => {
 ${args.join(' ')}
 })()`)
m.reply(util.format(ev))
} catch (e) {
m.reply(util.format(e))
}
break
case '=>':
if (!isOwner) return 
try {
ev = await eval(`(async () => {
 return ${args.join(' ')}
 })()`)
m.reply(util.format(ev))
} catch (e) {
m.reply(util.format(e))
}
break
case prefix+'sc': 
case prefix+'script':
m.reply(`Bot ini menggunakan script :\nhttps://github.com/caliph91/bot-whatsapp`)
break
case prefix+'kick': 
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!isBotAdm) return m.reply('Jadikan bot sebagai admin terlebih dahulu!')
isQuod = m.quoted ? [m.quoted.sender] : m.mentionedJid
if (!isQuod[0]) return m.reply('Tag member yang ingin dikick!')
isQuod.map(a => {
caliph.groupRemove(m.chat, [a]).catch(() => m.reply('Gagal!'))
})
break
case prefix+'bcgc': 
if (!isOwner) return m.reply('Perintah ini khusus Owner bot!')
if (!args[0]) return m.reply('Teksnya mana amsu!')
var chats = caliph.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message && !v.announce).map(v => v.jid)
  var content = await caliph.cMod(m.chat, m, /bc|broadcast/i.test(text) ? text : text + '\n' + '' + '*「 BROADCAST 」*')
  for (let id of chats) await caliph.copyNForward(id, content, true)
  caliph.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} group_`, m)
break
case prefix+'promote': 
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!isBotAdm) return m.reply('Jadikan bot sebagai admin terlebih dahulu!')
isQuod = m.quoted ? [m.quoted.sender] : m.mentionedJid
if (!isQuod[0]) return m.reply('Tag member yang ingin di promote!')
isQuod.map(a => {
caliph.groupMakeAdmin(m.chat, [a]).catch(() => m.reply('Gagal!'))
})
break
case prefix+'join':
if (!isOwner) return
if (!args[0]) return m.reply('Linknya?')
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let [_, code] = args[0].match(linkRegex) || []
if (!code) return m.reply('Link Invalid.')
caliph.acceptInvite(code).then(a => {
m.reply(mess.success)
}).catch(a => {
m.reply(mess.error)
})
break
case prefix+'tahta':
case prefix+'hartatahta':
if (!args[0]) return m.reply('Teksnya?')
m.reply(`_*Tunggu permintaan anda sedang diproses....*_`)
var hasil = global.support.magick || global.support.convert ? await tahta(q) : await getBuffer(global.API('zeks', '/api/hartatahta', { text }, 'apikey'))
caliph.sendMessage(m.chat, hasil, 'imageMessage', { quoted: m, caption: 'Harta Tahta '+args.join(' ') })
break
case prefix+'tahta2':
case prefix+'hartatahta2':
if (!args[0]) return m.reply('Teksnya?')
m.reply(`_*Tunggu permintaan anda sedang diproses....*_`)
var hasil = global.support.magick || global.support.convert ? await tahta2(q) : await getBuffer(global.API('zeks', '/api/hartatahta', { text }, 'apikey'))
caliph.sendMessage(m.chat, hasil, 'imageMessage', { quoted: m, caption: 'Harta Tahta '+args.join(' ') })
break
case prefix+'stiker':
case prefix+'sticker':
case prefix+'s':
case prefix+'sgif':
case prefix+'stikergif':
case prefix+'stickergif':
if (args[0] && /https?:\/\//.test(args[0])) return caliph.sendSticker(m.chat, args[0], m, { packname, author })
json = m.quoted ? m.quoted : m
if (!/image|video/.test(json.mtype)) return m.reply(`Balas Video/Gambar dengan caption *${prefix + command}*!`)
caliph.sendSticker(m.chat, await json.download(), m, { packname, author })
break
case prefix+'ttp':
  if (!args[0]) return m.reply('Teksnya?')
  caliph.sendSticker(m.chat, global.API('xteam', '/ttp', { text, file: '' }, 'APIKEY'), m, { packname, author })
  break
  case prefix+'attp':
  if (!args[0]) return m.reply('Teksnya?')
  buffer = await getBuffer(global.API('lol', '/api/attp', { text }, 'apikey'))
  webp = await addExif(buffer, packname, author, ["😀", "😆", "🙂"])
  caliph.sendMessage(m.chat, webp, mType.sticker, { quoted: m })
  break
  case prefix+'attp2':
  if (!args[0]) return m.reply('Teksnya?')
  buffer = await getBuffer(global.API('xteam', '/attp', { text, file:''}, 'APIKEY'))
  webp = await addExif(buffer, packname, author, ["😀", "😆", "🙂"])
  caliph.sendMessage(m.chat, webp, mType.sticker, { quoted: m })
  break 
  case prefix+'attp3':
  if (!args[0]) return m.reply('Teksnya?')
  buffer = await getBuffer(global.API('rikka', '/attp', { text }, 'apikey'))
  caliph.sendSticker(m.chat, buffer, m, { packname, author })
  break
case prefix+'toimg':
case prefix+'stoimg':
if (m.quoted && m.quoted.mtype !== 'stickerMessage') return caliph.reply(m.chat, 'Reply stikernya..', m)
json = m.quoted.fakeObj 
m.reply('Mohon tunggu sebentar~')
det = new Date * 1
var media = await caliph.downloadAndSaveMediaMessage(json, `./tmp/${det}`)
exec(`ffmpeg -i ${media} ./tmp/${det}.png`, async (err) => {
if (err) return m.reply('Error!')
await caliph.sendMessage(m.chat, { url: `./tmp/${det}.png` }, 'imageMessage', { quoted: m, caption: '>//<' })
fs.unlinkSync(media)
fs.unlinkSync(`./tmp/${det}.png`)
})
break
case prefix+'antidelete':
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!args[0]) {
  let buttons = [
  {buttonId: '/antidelete enable', buttonText: {displayText: 'Enable'}, type: 1},
  {buttonId: '/antidelete disable', buttonText: {displayText: 'Disable'}, type: 1}
]
const buttonsMessage = {
    contentText: `Pilih Enable atau Disable
`.trim(),    
footerText: `🔰 ${caliph.user.name} By Caliph71🔰`,
    buttons: buttons,
    headerType: 1
}
const sendMsg = await caliph.prepareMessageFromContent(m.chat,{buttonsMessage},{ contextInfo: { mentionedJid: [] }, sendEphemeral: true})

caliph.relayWAMessage(sendMsg)
} else if (args[0].toLowerCase() == 'enable') {
if (antidelete.includes(m.chat)) return m.reply('Antidelete Telah Diaktifkan Sebelumnya')
antidelete.push(m.chat) 
fs.writeFileSync('./database/chat/antidelete.json', JSON.stringify(antidelete, null, 2))
m.reply('Sukses mengaktifkan antidelete di grup ini....')
} else if (args[0].toLowerCase() == 'disable') {
index = antidelete.indexOf(m.chat)
antidelete.splice(index, 1) 
m.reply('Sukses menonaktifkan antidelete di grup ini....')
fs.writeFileSync('./database/chat/antidelete.json', JSON.stringify(antidelete, null, 2))
} else m.reply('Pilih enable atau disable')
break
case prefix+'welcome':
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!args[0]) {
  let buttons = [
  {buttonId: '/welcome enable', buttonText: {displayText: 'Enable'}, type: 1},
  {buttonId: '/welcome disable', buttonText: {displayText: 'Disable'}, type: 1}
]
const buttonsMessage = {
    contentText: `Pilih Enable atau Disable
`.trim(),    
footerText: `🔰 ${caliph.user.name} By Caliph71🔰`,
    buttons: buttons,
    headerType: 1
}
const sendMsg = await caliph.prepareMessageFromContent(m.chat,{buttonsMessage},{ contextInfo: { mentionedJid: [] }, sendEphemeral: true})

caliph.relayWAMessage(sendMsg)
} else if (/on|enable/gi.test(args[0])) {
if (welcome.includes(m.chat)) return m.reply('Welcome Telah Diaktifkan Sebelumnya')
welcome.push(m.chat) 
fs.writeFileSync('./database/chat/welcome.json', JSON.stringify(welcome, null, 2))
m.reply('Sukses mengaktifkan welcome di grup ini....')
} else if (/off|disable/gi.test(args[0])) {
index = welcome.indexOf(m.chat)
welcome.splice(index, 1) 
m.reply('Sukses menonaktifkan welcome di grup ini....')
fs.writeFileSync('./database/chat/welcome.json', JSON.stringify(welcome, null, 2))
} else m.reply('Pilih enable atau disable')
break
case prefix+'left':
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!args[0]) {
  let buttons = [
  {buttonId: '/left enable', buttonText: {displayText: 'Enable'}, type: 1},
  {buttonId: '/left disable', buttonText: {displayText: 'Disable'}, type: 1}
]
const buttonsMessage = {
    contentText: `Pilih Enable atau Disable
`.trim(),    
footerText: `🔰 ${caliph.user.name} By Caliph71🔰`,
    buttons: buttons,
    headerType: 1
}
const sendMsg = await caliph.prepareMessageFromContent(m.chat,{buttonsMessage},{ contextInfo: { mentionedJid: [] }, sendEphemeral: true})

caliph.relayWAMessage(sendMsg)
} else if (/on|enable/gi.test(args[0])) {
if (left.includes(m.chat)) return m.reply('Left Telah Diaktifkan Sebelumnya')
left.push(m.chat) 
fs.writeFileSync('./database/chat/left.json', JSON.stringify(left, null, 2))
m.reply('Sukses mengaktifkan left di grup ini....')
} else if (/off|disable/gi.test(args[0])) {
index = left.indexOf(m.chat)
left.splice(index, 1) 
m.reply('Sukses menonaktifkan welcome di grup ini....')
fs.writeFileSync('./database/chat/left.json', JSON.stringify(left, null, 2))
} else m.reply('Pilih enable atau disable')
break
case prefix+'hidetag': 
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
let users = groupMem.map(u => u.jid)

  let qz = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  let msg = caliph.cMod(
    m.chat,
    caliph.prepareMessageFromContent(
      m.chat,
      { [c.toJSON ? qz.mtype : mType.extendedText]: c.toJSON ? c.toJSON() : {
        text: c || ''
      } },
      {
        contextInfo: {
          mentionedJid: users
        },
        quoted: m
      }
    ),
    text || qz.text 
  )
  await caliph.relayWAMessage(msg)
break
case prefix+'linkgc': 
case prefix+'linkgrup': 
case prefix+'link': 
case prefix+'linkgroup': 
case prefix+'grouplink': 
case prefix+'gruplink': 
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
//if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!isBotAdm) return m.reply('Jadikan bot sebagai Admin terlebih dahulu')
caliph.sendMessage(m.chat, `https://chat.whatsapp.com/${await caliph.groupInviteCode(m.chat)}\n\nLink Grup *${groupMetadata.subject}*`, 'conversation', { detectLinks: false, quoted: m})
break
case prefix+'demote': 
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!isBotAdm) return m.reply('Jadikan bot sebagai admin terlebih dahulu!')
isQuod = m.quoted ? [m.quoted.sender] : m.mentionedJid
if (!isQuod[0]) return m.reply('Tag admin yang ingin di demote!')
isQuod.map(a => {
caliph.groupDemoteAdmin(m.chat, [a]).catch(() => m.reply('Gagal!'))
})
break
case prefix+'block': 
case prefix+'blok': 
if (!isOwner) return
isQuod = m.quoted ? [m.quoted.sender] : m.mentionedJid
if (!isQuod[0]) return m.reply('Tag member yang ingin di block!')
isQuod.map(a => {
caliph.blockUser(a).catch(() => {})
})
break
case prefix+'setname': 
if (!isOwner) return
if (!args[0]) return m.reply('Teksnya?')
caliph.updateProfileName(args.join(' ')).then(a => {
m.reply(mess.success)
}).catch(a => {
m.reply(mess.error)
})
break
case prefix+'setppbot': 
if (!isOwner) return
ye = m.quoted ? m.quoted : m
if (!/image/.test(ye.mtype)) return m.reply('Fotonya?')
caliph.updateProfilePicture(caliph.user.jid, await ye.download()).then(a => {
m.reply(mess.success)
}).catch(a => {
m.reply(mess.error)
})
break
case prefix+'setbio': 
if (!isOwner) return
if (!args[0]) return m.reply('Teksnya?')
caliph.setStatus(args.join(' ')).then(a => {
m.reply(mess.success)
}).catch(a => {
m.reply(mess.error)
})
break
case prefix+'unblock': 
case prefix+'unblok': 
//if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
//if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!isOwner) return
isQuod = m.quoted ? [m.quoted.sender] : m.mentionedJid
if (!isQuod[0]) return m.reply('Tag member yang ingin di block!')
isQuod.map(a => {
caliph.blockUser(a, 'remove').catch(() => {})
})
break
case prefix+'add': 
if (!m.isGroup) return m.reply('Perintah ini khusus didalam grup!')
if (!isAdmin) return m.reply('Perintah ini khusus admin grup!')
if (!isBotAdm) return m.reply('Jadikan bot sebagai admin terlebih dahulu!')
isQuod = m.quoted ? [m.quoted.sender] : text.split(',').map(v => v.replace(/[^0-9]/gi, '') +'@s.whatsapp.net')
if (!isQuod[0]) return m.reply(`Siapa Yang Mau Di Add?`)
caliph.groupAdd(m.chat, isQuod)
break
case prefix+'owner': 
case prefix+'creator':
if(owner.length == 1) return caliph.sendContact(m.chat, owner[0], caliph.getName(owner[0] + '@s.whatsapp.net'), m)
caliph.sendContactArray(m.chat, owner.map(a => a + '@s.whatsapp.net'),{ quoted: m })
break
case '$':
if (!text) return
if (!isOwner) throw `Perintah Ini Khusus Owner Bot Ya ajg!!!!`
m.reply('```Executing...```')
exec(text, async (e, q, s) => {
if (e) return m.reply(util.format(e), null, { detectLinks: false })
if (q) m.reply(util.format(q), null, { detectLinks: false })
if (s) m.reply(util.format(s), null, { detectLinks: false })
})
break
default: 
//if (isCmd) m.reply(`Command *${command}* not found`)
}

} catch (e) {
//caliph.reply(m.chat, 'Ada Yang Error!', m)
m.reply(util.format(e.message ? e.message : e))
}
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update './lib/caliph.js'"))
  delete require.cache[file]
  require(file)
})
