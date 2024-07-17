/* eslint-disable @typescript-eslint/no-explicit-any */
import * as CryptoJS from 'crypto-js';

export default class CryptoUtil {
    static encrypt(key: string, textToEncrypt: string): string {
        return CryptoJS.AES.encrypt(textToEncrypt, key).toString();
    }

    static decrypt(key: string, textToDecrypt: string): any {
        try {
    
          const bytes = CryptoJS.AES.decrypt(textToDecrypt, key);
    
          // Verifica se a decriptação foi bem-sucedida
          if (bytes.sigBytes === 0) {
            throw new Error('Decryption failed. Possibly invalid key or corrupted data.');
          }
    
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
          // Verifica se os dados decriptografados são válidos UTF-8
          if (!decryptedData) {
            throw new Error('Decrypted data is not valid UTF-8.');
          }
    
    
          return decryptedData;
        } catch (error) {
          console.error('Decryption Error:', error.message);
          throw new Error('Malformed UTF-8 data');
        }
      }
}
