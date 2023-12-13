//import { ec as Elliptic } from "elliptic";
import {BlockchainAddress} from "@partisiablockchain/abi-client-ts";
import BN from "bn.js";
import elliptic from 'elliptic';
import {CryptoUtils} from "./CryptoUtil.js";

import {Client, TransactionPointer} from "./Client.js";
import {SignedTransaction, Transaction} from "./SignedTransaction.js";

/** A client that supports signing and sending transactions on the blockchain. */
export class TransactionSender {
  private readonly client: Client;
  private readonly keyPair: elliptic.ec.KeyPair;
  private readonly transactionValidityDuration: BN;

  private constructor(client: Client, keyPair: elliptic.ec.KeyPair, transactionValidityDuration: BN) {
    this.client = client;
    this.keyPair = keyPair;
    this.transactionValidityDuration = transactionValidityDuration;
  }

  /**
   * Create blockchain transaction client.
   *
   * @param client The blockchain client used for communicating with the blockchain.
   * @param privateKey Authentication of the sender that will sign transactions.
   * @return A blockchain transaction client
   * @param transactionValidityDuration The amount of time, in milliseconds, a signed transaction is
   *     valid for inclusion in a block.
   */
  public static create(
    client: Client,
    privateKey: string,
    transactionValidityDuration: BN = new BN(1800000),
  ): TransactionSender {
    return new TransactionSender(
      client,
      CryptoUtils.privateKeyToKeypair(privateKey),
      transactionValidityDuration,
    );
  }

  /**
   * Sign a transaction in preparation for sending it to the blockchain. The signed transaction has
   * limited validity, since it includes information about the valid-to-time and the next available
   * nonce of the sending user.
   *
   * @param {Transaction} transaction The transaction to sign
   * @param {BN} gasCost The amount of gas to allocate for executing the transaction.
   * @return {Promise<SignedTransaction | undefined>} A signed transaction corresponding to the passed transaction.
   */
  public sign(transaction: Transaction, gasCost: BN): Promise<SignedTransaction | undefined> {
    //console.log(this.keyPair);
    const sender: BlockchainAddress = BlockchainAddress.fromString(
      CryptoUtils.keyPairToAccountAddress(this.keyPair),
    );
    return Promise.all([this.client.getAccountState(sender), this.client.getChainId()])
      .then(
        ([account, chainIdData]) => {
          if (account === undefined || chainIdData === undefined) {
            return undefined;
          }
          const validToTime = new BN(new Date().getTime()).add(
            this.transactionValidityDuration);
          return SignedTransaction.create(
            this.keyPair,
            new BN(account.nonce),
            validToTime,
            gasCost,
            chainIdData.chainId,
            transaction,
          );
        },
      );
  }

  /**
   * Sends a signed transaction to the blockchain for execution and inclusion in a block.
   *
   * @param signedTransaction The signed transaction to send.
   * @return A sent transaction corresponding to the signed transaction.
   */
  public send(signedTransaction: SignedTransaction): Promise<SentTransaction> {
    const fromAddress = this.getAddress();
    return this.client.putTransaction(fromAddress, signedTransaction)
      .then((transactionPointer) => {
        return {signedTransaction, transactionPointer};
      });
  }

  /**
   * Sign and send a transaction to the blockchain for execution.
   *
   * @param transaction The transaction to sign and send
   * @param gasCost The amount of gas to allocate for executing the transaction.
   * @return A sent transaction corresponding to the signed transaction.
   */
  public sendAndSign(transaction: Transaction, gasCost: BN): Promise<SentTransaction> {
    return this.sign(transaction, gasCost)
      .then((signed) => {
        if (signed === undefined) {
          throw new Error("Failed to sign the transaction");
        }
        return this.send(signed);
      });
  }

  /**
   * Gets the address of the sender.
   *
   * @return the address of the sender.
   */
  public getAddress(): BlockchainAddress {
    return BlockchainAddress.fromString(CryptoUtils.keyPairToAccountAddress(this.keyPair));
  }
}

/** A transaction that has been sent on the blockchain. */
export interface SentTransaction {
  /** The signed transaction. */
  signedTransaction: SignedTransaction;
  /** A pointer to the transaction on the blockchain. */
  transactionPointer: TransactionPointer;
}

