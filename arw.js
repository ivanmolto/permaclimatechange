const Arweave = require('arweave/node')
const fs = require('fs');

// Initialisation options
const arweave = Arweave.init({
    host: 'arweave.net',    // Hostname or IP address for a Arweave host
    port: 443,              // Port
    protocol: 'https',      // Network protocol
    timeout: 20000,         // Network request timeouts in milliseconds
    logging: false,         // Enable network request logging
})

const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'))

// Remember not to expose private keys or make them public as anyone with the key can use the corresponding wallet

module.exports = {

    // Get the wallet address for a private key
    getAddress: function () {
        arweave.wallets.jwkToAddress(jwk).then((address) => {
            //console.log(address)
            return address;
        });
    },

    sendData: async function (title, link, description) {
        let transaction = await arweave.createTransaction({ data: description }, jwk);

        // Tags
        transaction.addTag('title', title);
        transaction.addTag('link', link);
        transaction.addTag('App-Name', 'permaclimatechange');

        // Sign
        await arweave.transactions.sign(transaction, jwk);

        await arweave.transactions.post(transaction);
    }
}
