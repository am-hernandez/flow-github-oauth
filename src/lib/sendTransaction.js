import * as fcl from '@onflow/fcl';
import { magic } from './magic';

// CONFIGURE ACCESS NODE
fcl.config().put('accessNode.api', 'https://rest-testnet.onflow.org');

// CONFIGURE WALLET
// replace with your own wallets configuration
// Below is the local environment configuration for the dev-wallet
fcl.config().put('challenge.handshake', 'http://access-001.devnet9.nodes.onflow.org:8000');



const AUTHORIZATION_FUNCTION = magic.flow.authorization;

const getReferenceBlock = async () => {
    const response = await fcl.send([fcl.getBlock()]);
    const data = await fcl.decode(response);
    return data.id;
};

export async function sendTransaction () {
    console.log('SENDING TRANSACTION...');

    try{
        const response = await fcl.send([
        fcl.transaction`
            transaction {
                prepare() {
                    log("Transaction prepared")
                }
                execute {
                    log("Transaction executed")
                }
            }
        `,
        fcl.ref(await getReferenceBlock()),
        // fcl.authorizations([AUTHORIZATION_FUNCTION]), // <-- not auth needed for this transaction
        fcl.proposer(AUTHORIZATION_FUNCTION),
        fcl.payer(AUTHORIZATION_FUNCTION),
      ]);
      console.log('TRANSACTION SENT');
      console.log('TRANSACTION RESPONSE', response);
  
      console.log('WAITING FOR TRANSACTION TO BE SEALED');
      const data = await fcl.tx(response).onceSealed();
      console.log('TRANSACTION SEALED', data);
  
      if (data.status === 4 && data.statusCode === 0) {
        console.log('Congrats!!! I Think It Works');
        return data;
      } else {
        console.log(`Oh No: ${data.errorMessage}`);
      }
    } catch (error) {
      console.error('FAILED TRANSACTION', error);
    }
}