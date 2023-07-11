import { Numbers } from "web3";
export abstract class BaseContractInstance {
    protected rollInContractAddr: string;
    protected rollOutContractAddr: string;
    constructor(rollIn: string, rollOut: string) {
        this.rollInContractAddr = rollIn;
        this.rollOutContractAddr = rollOut;
    }
    abstract rollIn(lrTo : string, leFrom?: string, value?: Numbers, refundTo?: string, maxGas?: Numbers, gasPriceBid?: Numbers) : string;
    abstract rollOut(leTo : string, chainId: Number, lrFrom?: string, value?: Numbers) : string;
    abstract getRollInContractAddr() : string
    abstract getRollOutContractAddr() : string
}