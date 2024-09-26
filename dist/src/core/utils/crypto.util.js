"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = __importStar(require("crypto-js"));
class CryptoUtil {
    static encrypt(key, textToEncrypt) {
        return CryptoJS.AES.encrypt(textToEncrypt, key).toString();
    }
    static decrypt(key, textToDecrypt) {
        try {
            const bytes = CryptoJS.AES.decrypt(textToDecrypt, key);
            if (bytes.sigBytes === 0) {
                throw new Error('Decryption failed. Possibly invalid key or corrupted data.');
            }
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if (!decryptedData) {
                throw new Error('Decrypted data is not valid UTF-8.');
            }
            return decryptedData;
        }
        catch (error) {
            console.error('Decryption Error:', error.message);
            throw new Error('Malformed UTF-8 data');
        }
    }
}
exports.default = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map