const fs = require('fs');

const CRC16_CCITT = (payload) => {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

const buildPixPayload = (chave, nome, cidade, valor) => {
  const format = (id, value) => {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
  };

  const merchantAccountInfo = format('00', 'br.gov.bcb.pix') + format('01', chave);
  
  let payload = 
    format('00', '01') +
    format('26', merchantAccountInfo) +
    format('52', '0000') +
    format('53', '986') +
    format('54', valor.toFixed(2)) +
    format('58', 'BR') +
    format('59', nome) +
    format('60', cidade) +
    format('62', format('05', '***'));

  payload += '6304';
  payload += CRC16_CCITT(payload);

  return payload;
};

const pixName = 'Fabio Russo De Azevedo';
const pixCity = 'Sao Paulo';
const pixKey = '14792297842';

let dbContent = fs.readFileSync('src/data/ebooks.ts', 'utf8');
const arrayStart = dbContent.indexOf('export const ebooks: Ebook[] = ') + 31;
const beforeArray = dbContent.substring(0, arrayStart);
let arrayString = dbContent.substring(arrayStart);
arrayString = arrayString.substring(0, arrayString.lastIndexOf(';'));

let ebooks = eval(arrayString);

ebooks.forEach(e => {
  if (e.title === 'Ele Convencerá o Mundo do Pecado') {
    e.price = 'R$ 3,01';
    e.pixPayload = buildPixPayload(pixKey, pixName, pixCity, 3.01);
  } else if (e.title === 'O Que Significa Ser Co Participantes da Natureza Divina?') {
    e.price = 'R$ 3,02';
    e.pixPayload = buildPixPayload(pixKey, pixName, pixCity, 3.02);
  } else if (e.title === 'Um familiar vai reconhecer o outro na Eternidade?') {
    e.price = 'R$ 3,03';
    e.pixPayload = buildPixPayload(pixKey, pixName, pixCity, 3.03);
  }
});

const newContent = beforeArray + JSON.stringify(ebooks, null, 2) + ';\n';
fs.writeFileSync('src/data/ebooks.ts', newContent);
console.log('Unique prices generated and saved!');
