import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment.prod';
export const encrypt = (msg: string): any => {
    if (msg != null) {
        let cipherPhrase = environment.angularCipherKeyIvPhrase;
        var key = CryptoJS.enc.Utf8.parse(cipherPhrase.split("|")[0]);
        var iv = CryptoJS.enc.Utf8.parse(cipherPhrase.split("|")[1]);
        var encrypted: any = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(msg), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        //replace the special characters with any of text
        encrypted = encrypted.toString();
        for (let i = 0; i < encrypted.length; i++) {
            if (encrypted.charAt(i) == '+') {
                encrypted = encrypted.replace('+', 'xMl3Jk');
            }
            if (encrypted.charAt(i) == '/') {
                encrypted = encrypted.replace('/', 'Por21Ld');
            }
            if (encrypted.charAt(i) == '=') {
                encrypted = encrypted.replace('=', 'Ml32');
            }
        }
        return encrypted.toString();
    }
}

export const decrypt = (encryptedText: string): any => {
    if (encryptedText != null) {
        let cipherPhrase = environment.angularCipherKeyIvPhrase;
        var key = CryptoJS.enc.Utf8.parse(cipherPhrase.split("|")[0]);
        var iv = CryptoJS.enc.Utf8.parse(cipherPhrase.split("|")[1]);

        // replace these strings back with special characters
        encryptedText = encryptedText.toString();
        encryptedText = encryptedText.replace(/xMl3Jk/g, '+');
        encryptedText = encryptedText.replace(/Por21Ld/g, '/');
        encryptedText = encryptedText.replace(/Ml32/g, '=');
        var decrypted = CryptoJS.AES.decrypt(encryptedText, key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}