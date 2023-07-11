import { Numbers } from "web3";
import { BaseContractInstance } from "./baseRollUp";
import rollInAbi from "../abi/src/bridge/IInBox.sol/IInbox.json"
import rollOutAbi from "../abi/src/precompiles/ArbSys.sol/ArbSys.json"
import {Contract} from 'web3-eth-contract';

export class NativeContractInstance extends BaseContractInstance {
    rollIn(lrTo : string) {
        var contract = new Contract(rollInAbi);
        //@ts-ignore
        return contract.methods.rollinEth(lrTo).encodeABI();
    }
    rollOut(leTo : string, chainId : Number) {
        var contract = new Contract(rollOutAbi);
        //@ts-ignore
        return contract.methods.withdrawEth(chainId, leTo).encodeABI()
    }
    getRollInContractAddr() {
        return this.rollInContractAddr
    }
    getRollOutContractAddr() {
        return this.rollOutContractAddr
    }
}

