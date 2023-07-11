import Contract from 'web3-eth-contract';
import * as web3 from 'web3';
import { Numbers } from "web3";
import interfaceAbi from "../abi/NodeInterface.json"
import claimAbi from "../abi/IOutbox.json"
import {nodeInterfaceContractAddr, SupportedChainInfo, RollnaInfo, RollnaChainInfo, RollOutProof} from "../types";
export class NodeInterfaceContract {
    static async getProof(size : Numbers, leaf : Numbers) : Promise<any> {
        var rollnaInfo = await RollnaChainInfo.getRollNaInfo()
        var contract = new web3.eth.contract.Contract(interfaceAbi, nodeInterfaceContractAddr)
        contract.setProvider(rollnaInfo?.rollnaProvider);
        //@ts-ignore
        return contract.methods.constructOutboxProof(size, leaf).send()       
    }
}
async function formatClaimTokenInput(
    proof : Uint8Array, 
    index : Numbers, 
    lrSender : string, 
    to : string, 
    lrBlock: Numbers, 
    l1Block: Numbers, 
    lrTimestamp: Numbers, 
    value: Numbers
    ) : Promise<any> {
    var rollnaInfo = await RollnaChainInfo.getRollNaInfo()
    var contract = new web3.eth.contract.Contract(claimAbi)
    //@ts-ignore
    return contract.methods.executeTransaction(proof, index, lrSender, to, lrBlock, l1Block, lrTimestamp, value).encodeABI()       
}