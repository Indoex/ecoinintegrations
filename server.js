//Private Key: 5KBwRcQHE5wPZ5bkMykTPRdcq9HHjca294VFG1BM5TbATkeixcy
//Public Key: EOS8VnMZQXuasEnW5nxCo4KRKds4VSsWuZaidfX6nES2Pfbt8CRR8

const { Api, JsonRpc, RpcError } = require('eosjs');
//const JsSignatureProvider = require('eosjs/dist/eosjs-jssig');
 const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
 const fetch = require('node-fetch');
 const { TextEncoder, TextDecoder } = require('util');

const name ='krishnayogi1';  // receiving wallet name
const URL = "https://api.telosfoundation.io";  // api url
const defaultPrivateKey = "5KBwRcQHE5wPZ5bkMykTPRdcq9HHjca294VFG1BM5TbATkeixcy"  // sending wallet  private key  
const senderUsername = "indoextest12";  // sending wallet name 
const recieverUsername = name;
const amount = "2.0000 ECOIN";
const memo="";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc(URL, {fetch});
const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});

(async () => {
    try {
        const result = await api.transact({
            actions: [
                {
                    //account: 'eosio.token',
                    Account:'ecoin1nation',  // this is the Ecoin contract name 
                    name: 'transfer',
                    authorization: [{actor: senderUsername,permission: 'active'}],
                    data: {from: senderUsername,to: recieverUsername,quantity: amount,memo: memo}
                }
            ]
        }, {blocksBehind: 3,expireSeconds: 180});
        console.dir(result);
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) 
            console.log(JSON.stringify(e.json, null, 2));
    }
})();