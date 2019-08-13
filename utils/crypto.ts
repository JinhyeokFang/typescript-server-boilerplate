import {createCipher, createDecipher, Cipher, Decipher} from 'crypto';

var encrypt = function (arr: string[], callback: Function): void {
    let result: string[] = [];
    for (let data of arr) {
        const cipher: Cipher = createCipher("aes-256-cbc", "SECRET_KEY");
        let temp: string = cipher.update(data, "utf8", "base64");
        temp += cipher.final("base64");
        result.push(temp);
    }

    callback(result);
}

var decrypt = function (arr: string[], callback: Function): void {
    let result: string[] = [];
    for (let data of arr) {
        const decipher: Decipher = createDecipher("aes-256-cbc", "SECRET_KEY");
        let temp: string = decipher.update(data, "base64", "utf8");
        temp += decipher.final("utf8");
        result.push(temp);
    }

    callback(result);
}

export { encrypt, decrypt };