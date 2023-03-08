import { AES_GCM } from './gcm/index';
import { string_to_bytes,bytes_to_base64 } from './gcm/utils';

// // 加密
function aesDecrypt(word, keys = "XTYHN17FN7JKFC8PAW5VJU32VFPBGFWR") {
    const key = string_to_bytes(keys, "utf-8");
    const nonce = string_to_bytes(
        "TCUFJBJHIOGFY3DRUJFYQAXCFJOBFRG2", "utf-8"
    );
    const message = string_to_bytes(
        word, "utf-8"
    );
    const tagSize = 32;

    //const enMessage = asmcrypto.AES_GCM.encrypt(message, key, nonce, adata, tagSize);
    const enMessage = AES_GCM.encrypt(message, key, nonce, tagSize);
    const hex = bytes_to_base64(enMessage);
    return hex
}

export { aesDecrypt }