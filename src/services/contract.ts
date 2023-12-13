import {BlockchainAddress} from "@partisiablockchain/abi-client-ts";
import BN from "bn.js";
import {config as dotenv_config} from "dotenv";
import {createLot, createOffer, createTender, registerUser as createUser} from "./contracts/root-mvp-contract.js";
import {Client, ZkContract} from "./utils/Client.js";
import {TransactionSender} from "./utils/TransactionSender";
dotenv_config();

export default class ContractClient {
    protected readonly client: Client;
    protected transactionSender: TransactionSender;
    protected adminWallet: BlockchainAddress;
    protected adminNounce?: number | string;
    protected contractAddress: BlockchainAddress;
    protected contractState?: ZkContract;
    protected initCompleted: boolean = false;

    /**
     * Create a new contract client.
     */
    constructor() {
        const TESTNET_URL: string = String(process.env.TESTNET_URL);
        const SENDER_PRIVATE_KEY: string = String(process.env.ROOT_CONTRACT_ADMIN_PRIVATE_KEY);

        this.client = new Client(TESTNET_URL);
        //console.log(`TESTNET_URL: ${TESTNET_URL}`);

        this.adminWallet = BlockchainAddress.fromString(String(process.env.TEST_USER_WALLET_ADDRESS));
        this.contractAddress = BlockchainAddress.fromString(String(process.env.ROOT_CONTRACT_TESTNET_ADDRESS));
        this.transactionSender = TransactionSender.create(this.client, SENDER_PRIVATE_KEY);
        //console.log("transactionSender", this.transactionSender);
    };

    async init() {
        if (this.initCompleted) {
            return Promise.resolve();
        }
        const walletState = await this.client.getAccountState(this.adminWallet);
        this.adminNounce = walletState?.nonce;
        console.log("walletState:", walletState);

        this.contractState = await this.client.getContractState(this.contractAddress);
        //console.log("contractState:", this.contractState);

        this.initCompleted = true;
    };

    async createUser(userId: number): Promise<string> {
        await this.init();
        // @todo placeholder. Should be address of specific user
        const userAddress = this.adminWallet;
        const createTenderPayload = createUser(new BN(userId), userAddress);
        const transactionPointer = await this.transactionSender?.sendAndSign(
            {
                address: this.contractAddress,
                rpc: createTenderPayload
            },
            new BN(100000)
        );
        //console.log("user transactionPointer", transactionPointer);

        const txIdentifier = transactionPointer.transactionPointer.identifier.toString("hex");
        console.log(`Sent User input in transaction: https://testnet.partisiablockchain.com/info/transaction/Shard1/` + txIdentifier);

        return txIdentifier;
    }

    async createTender(ownerId: number, tenderId: number): Promise<string> {
        await this.init();
        const createTenderPayload = createTender(new BN(ownerId), new BN(tenderId));
        const transactionPointer = await this.transactionSender?.sendAndSign(
            {
                address: this.contractAddress,
                rpc: createTenderPayload
            },
            new BN(100000)
        );
        //console.log("transactionPointer", transactionPointer);

        const txIdentifier = transactionPointer.transactionPointer.identifier.toString("hex");
        console.log("Sent Tender input in transaction: https://testnet.partisiablockchain.com/info/transaction/Shard1/" + txIdentifier);

        return txIdentifier;
    }

    async createLot(tenderId: number, criterionId: number, lotId: number): Promise<string> {
        await this.init();
        const createLotPayload = createLot(new BN(tenderId), new BN(criterionId), new BN(lotId));
        const transactionPointer = await this.transactionSender?.sendAndSign(
            {
                address: this.contractAddress,
                rpc: createLotPayload
            },
            new BN(100000)
        );
        //console.log("transactionPointer", transactionPointer);

        const txIdentifier = transactionPointer.transactionPointer.identifier.toString("hex");
        console.log("Sent Lot input in transaction: https://testnet.partisiablockchain.com/info/transaction/Shard1/" + txIdentifier);

        return txIdentifier;
    }

    async createOffer(tenderId: number, lotId: number, offerId: number): Promise<string> {
        await this.init();
        const createLotPayload = createOffer(new BN(tenderId), new BN(lotId), new BN(offerId));
        const transactionPointer = await this.transactionSender?.sendAndSign(
            {
                address: this.contractAddress,
                rpc: createLotPayload
            },
            new BN(100000)
        );
        //console.log("transactionPointer", transactionPointer);

        const txIdentifier = transactionPointer.transactionPointer.identifier.toString("hex");
        console.log("Sent Offer input in transaction: https://testnet.partisiablockchain.com/info/transaction/Shard1/" + txIdentifier);

        return txIdentifier;
    }
}

/*
const transactionPointer = await transactionSender.sign(
            {
                address: contractAddress,
                rpc: createTenderPayload,
            },
            new BN(100000)
        );
        console.log("transactionPointer", transactionPointer);
*/
