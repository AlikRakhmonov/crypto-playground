function encrypt() {
    // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = document.getElementById('stacked-key').value;
    var key2 = document.getElementById('stacked-key2').value;

    // Convert text to bytes
    var text = document.getElementById('stacked-text').value;
    var textBytes = aesjs.utils.utf8.toBytes(text);
     
    var aesCrypto = document.getElementById('stacked-mode').value === 'CTR'
        ? new aesjs.ModeOfOperation.ctr(aesjs.utils.utf8.toBytes(key), new aesjs.Counter(Number(key2)))
        : new aesjs.ModeOfOperation.cbc(aesjs.utils.utf8.toBytes(key), aesjs.utils.utf8.toBytes(key2));

    var encryptedBytes = aesCrypto.encrypt(textBytes);
     
    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    document.getElementById('stacked-result').value = encryptedHex;
    console.log(encryptedHex);
}

function decrypt() {
    // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = document.getElementById('stacked-key').value;
    var key2 = document.getElementById('stacked-key2').value;
     
    // When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(document.getElementById('stacked-text').value);
     
    var aesCtr = document.getElementById('stacked-mode').value === 'CTR'
        ? new aesjs.ModeOfOperation.ctr(aesjs.utils.utf8.toBytes(key), new aesjs.Counter(Number(key2)))
        : new aesjs.ModeOfOperation.cbc(aesjs.utils.utf8.toBytes(key), aesjs.utils.utf8.toBytes(key2));

    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
     
    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    document.getElementById('stacked-result').value = decryptedText;
    console.log(decryptedText);
}

function setDefaults() {
    document.getElementById('stacked-key').value = 'test-r7627-lvcm2';

    if (document.getElementById('stacked-mode').value === 'CTR') {
        document.getElementById('stacked-key2').type = 'number';
        document.getElementById('stacked-key2').value = '5';
        document.getElementById('stacked-key2').placeholder = 'Counter';
        document.querySelector('label[for=stacked-key2]').innerHTML = 'Counter';
        document.getElementById('subtext').hidden = true;
    } else {
        document.getElementById('stacked-key2').type = 'text';
        document.getElementById('stacked-key2').value = 'test-k5e52-fb3l6';
        document.getElementById('stacked-key2').placeholder = 'Initialization vector';
        document.querySelector('label[for=stacked-key2]').innerHTML = 'Initialization vector (16 chars)';
        document.getElementById('subtext').hidden = false;
    }
}

document.getElementById('encrypt').addEventListener('click', encrypt);
document.getElementById('decrypt').addEventListener('click', decrypt);
document.getElementById('stacked-mode').addEventListener('change', setDefaults);

setDefaults();