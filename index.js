const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const wikipediaHandler = require('./complementos/wikipedia');
const terminalHandler = require('./complementos/terminal');

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "WikiBot" // Un identificador
  }),
  puppeteer: {
    args: [
      "--no-sandbox",
    ],
  },
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('Cargando...');
});

client.on('ready', () => {
  console.log('✅ CONECTADO AL WHATSAPP');
});

client.on('message', async (message) => {
  try {
    const body = message.body.toLowerCase(); // Convertir el contenido del mensaje a minúsculas

    // Verificar si el contenido del mensaje coincide con alguna de las variaciones aceptadas
    if (body === 'creador') {
      // Obtener el medio desde la URL
      const media = await MessageMedia.fromUrl(
        'https://media.discordapp.net/attachments/1102448933608886293/1111892241359851520/My_project-1.png'
      );

      // Responder con el medio
      client.sendMessage(message.from, media, {
        caption: '*Equipo de desarrollo Versión Beta: 1.0.2*',
      });
    } else if (body.startsWith('wiki') || body.startsWith('wikipedia')) {
      // Manejar el comando de Wikipedia
      wikipediaHandler(client, message);
    }
  } catch (error) {
    console.error('❌ Error en el complemento:', error);
  }
});

const gradient = require('gradient-string');

console.log(
  gradient('yellow', 'green')('✅ Iniciando...') + '\n' +
  gradient('yellow', 'red')(`
 █     █░ ██▓ ██ ▄█▀ ██▓    ▄▄▄▄    ▒█████  ▄▄▄█████▓    ███▄ ▄███▓▓█████▄ 
▓█░ █ ░█░▓██▒ ██▄█▒ ▓██▒   ▓█████▄ ▒██▒  ██▒▓  ██▒ ▓▒   ▓██▒▀█▀ ██▒▒██▀ ██▌
▒█░ █ ░█ ▒██▒▓███▄░ ▒██▒   ▒██▒ ▄██▒██░  ██▒▒ ▓██░ ▒░   ▓██    ▓██░░██   █▌
░█░ █ ░█ ░██░▓██ █▄ ░██░   ▒██░█▀  ▒██   ██░░ ▓██▓ ░    ▒██    ▒██ ░▓█▄   ▌
░░██▒██▓ ░██░▒██▒ █▄░██░   ░▓█  ▀█▓░ ████▓▒░  ▒██▒ ░    ▒██▒   ░██▒░▒████▓ 
░ ▓░▒ ▒  ░▓  ▒ ▒▒ ▓▒░▓     ░▒▓███▀▒░ ▒░▒░▒░   ▒ ░░      ░ ▒░   ░  ░ ▒▒▓  ▒ 
  ▒ ░ ░   ▒ ░░ ░▒ ▒░ ▒ ░   ▒░▒   ░   ░ ▒ ▒░     ░       ░  ░      ░ ░ ▒  ▒ 
  ░   ░   ▒ ░░ ░░ ░  ▒ ░    ░    ░ ░ ░ ░ ▒    ░         ░      ░    ░ ░  ░ 
    ░     ░  ░  ░    ░      ░          ░ ░                     ░      ░    
                                 ░                                  ░      
  `) + '\n' +
  gradient('yellow', 'red')(`
  ▄ .▄      .▄▄ · ▄▄▄▄▄▪   ▐ ▄  ▄▄ •     ▄▄▄▄·  ▄· ▄▌    ▄▄▄▄·       ▐▄• ▄ • ▌ ▄ ·. ▪   ▐ ▄ ▄▄▄ .▄▄▌ ▐ ▄▌      ▄▄▄  ▄▄▌  ·▄▄▄▄  
  ██▪▐█▪     ▐█ ▀. •██  ██ •█▌▐█▐█ ▀ ▪    ▐█ ▀█▪▐█▪██▌    ▐█ ▀█▪▪      █▌█▌▪·██ ▐███▪██ •█▌▐█▀▄.▀·██· █▌▐█▪     ▀▄ █·██•  ██▪ ██ 
  ██▀▐█ ▄█▀▄ ▄▀▀▀█▄ ▐█.▪▐█·▐█▐▐▌▄█ ▀█▄    ▐█▀▀█▄▐█▌▐█▪    ▐█▀▀█▄ ▄█▀▄  ·██· ▐█ ▌▐▌▐█·▐█·▐█▐▐▌▐▀▀▪▄██▪▐█▐▐▌ ▄█▀▄ ▐▀▀▄ ██▪  ▐█· ▐█▌
  ██▌▐▀▐█▌.▐▌▐█▄▪▐█ ▐█▌·▐█▌██▐█▌▐█▄▪▐█    ██▄▪▐█ ▐█▀·.    ██▄▪▐█▐█▌.▐▌▪▐█·█▌██ ██▌▐█▌▐█▌██▐█▌▐█▄▄▌▐█▌██▐█▌▐█▌.▐▌▐█•█▌▐█▌▐▌██. ██ 
  ▀▀▀ · ▀█▄▀▪ ▀▀▀▀  ▀▀▀ ▀▀▀▀▀ █▪·▀▀▀▀     ·▀▀▀▀   ▀ •     ·▀▀▀▀  ▀█▄▀▪•▀▀ ▀▀▀▀  █▪▀▀▀▀▀▀▀▀ █▪ ▀▀▀  ▀▀▀▀ ▀▪ ▀█▄▀▪.▀  ▀.▀▀▀ ▀▀▀▀▀•
  `) + '\n' +
  gradient('red', 'firebrick')("		—(••÷[ '𝕎𝕚𝕜𝕚𝔹𝕠𝕥' 𝕓𝕪 𝔸𝕝𝕓𝕖𝕣𝕥𝕚𝕟#𝟠𝟠𝟘𝟚 ]÷••)—")
);

client.on('message', (message) => {
  try {
    terminalHandler(message, { client });
  } catch (error) {
    console.error('❌ Error en el complemento:', error);
  }
});
