import { Numbers } from "web3";
import {CommonInput, SupportedChainInfo, RollnaInfo, RollnaChainInfo, RollOutProof} from "../types";
import { ContractInstanceFactory } from "../contract/instanceFactory"
import * as Web3 from "web3"

export function formatRollInInput(
    fromAddr : string, 
    fromChainId: number, 
    amount: Numbers, 
    destAddr: string,
    gas: Numbers
    ) : CommonInput | undefined {
        let fromChainInfo = SupportedChainInfo.getChainInfo(fromChainId)
        if (fromChainInfo != undefined) {
            let contractInstance = ContractInstanceFactory.getContractInstance(false, fromChainId);
            if (contractInstance != undefined) {
               let data = contractInstance.rollIn(fromAddr, destAddr, amount)
               return {
                   from: fromAddr,
                   to: contractInstance.getRollInContractAddr(),
                   gas: gas,
                   data: data
               }
            }
        }
        return undefined
}

export function formatRollInERC20Input(
    fromAddr : string, 
    fromChainId: number, 
    amount: Numbers, 
    tokenAddr: string,
    destAddr: string,
    gas: Numbers
    ) : CommonInput | undefined {
        let fromChainInfo = SupportedChainInfo.getChainInfo(fromChainId)
        if (fromChainInfo != undefined) {
            let contractInstance = ContractInstanceFactory.getContractInstance(true, fromChainId, tokenAddr);
            if (contractInstance != undefined) {
               let data = contractInstance.rollIn(fromAddr, destAddr, amount)
               return {
                   from: fromAddr,
                   to: contractInstance.getRollInContractAddr(),
                   gas: gas,
                   data: data
               }
            }
        }
        return undefined
}

export function formatRollOutInput(
    fromAddr : string, 
    fromChainId: number, 
    amount: Numbers, 
    destAddr: string,
    gas: Numbers
    ) : CommonInput | undefined {
        let fromChainInfo = SupportedChainInfo.getChainInfo(fromChainId)
        if (fromChainInfo != undefined) {
            let contractInstance = ContractInstanceFactory.getContractInstance(false, fromChainId);
            if (contractInstance != undefined) {
               let data = contractInstance.rollOut(fromAddr, destAddr, amount)
               return {
                   from: fromAddr,
                   to: contractInstance.getRollOutContractAddr(),
                   gas: gas,
                   data: data
               }
            }
        }
        return undefined
}

export function formatRollOutERC20Input(
    fromAddr : string, 
    fromChainId: number, 
    amount: Numbers, 
    tokenAddr: string,
    destAddr: string,
    gas: Numbers
    ) : CommonInput | undefined {
        let fromChainInfo = SupportedChainInfo.getChainInfo(fromChainId)
        if (fromChainInfo != undefined) {
            let contractInstance = ContractInstanceFactory.getContractInstance(true, fromChainId, tokenAddr);
            if (contractInstance != undefined) {
               let data = contractInstance.rollOut(fromAddr, destAddr, amount)
               return {
                   from: fromAddr,
                   to: contractInstance.getRollOutContractAddr(),
                   gas: gas,
                   data: data
               }
            }
        }
        return undefined
}

export async function estimateRollInGasPrice(httpProvider: string, input: CommonInput) : Promise<Numbers> {
    var web3 = new Web3.Web3(httpProvider)
    return await web3.eth.estimateGas(input)
    // need gasfee in LR
    // (TODO:mingxuan)need further design with saitama and jessica
}

export async function getRollnaInfo() : Promise<RollnaInfo|undefined> {
    return await RollnaChainInfo.getRollNaInfo()
}

export async function getRollOutProof(size: Numbers, leaf: Numbers) : Promise<RollOutProof|undefined> {
    // need further contract information
    return
}

export async function formatClaimRollOutInput(from: string,txhash: string,proof: string, chainid: Numbers) : Promise<CommonInput|undefined> {
    // need further contract information
    return
}