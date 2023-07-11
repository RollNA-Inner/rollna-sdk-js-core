import { BigNumberish } from "@ethersproject/bignumber";
import { Numbers } from "web3";
var https_request = require('request');

const rollnaInfoUrl = "https://rollna.io/get_rollna_info";
const chainInfosUrl = "https://rollna.io/get_chain_infos";

export type AccountType = 'EOA' | 'AA';

export interface CommonInput {
    from: string;
    to?: string;
    value?: string;
    gas?: Numbers;
    gasPrice?: Numbers;
    data?: string;
}

export interface EstimateGasInfo {
    from: string;
    gaslimit?: Numbers;
    value?: Numbers; 
}

export interface RollOutProof {
    send: string;
    root: string;
    proof: string;
}

export type RollnaInfo = {
    rollnaProvider: string;
    rollnaChainId: number;
    rollnaTokenSymbols: string;
}

export type NativeContractInfo = {
    RollnaContractAddr: string;
    TokenSymbol: string;
}

export type ChainInfo = {
    Provider?: string;
    ContractInfos: Map<string, NativeContractInfo>;
}

export class RollnaChainInfo {
    public static readonly rollnaInfo : RollnaInfo;
    private  constructor() {}
    static async getRollNaInfo() {
        if (!RollnaChainInfo.rollnaInfo) {
           await https_request({url: rollnaInfoUrl}, function(err: any, response: any, body: any) {
                if(!err && response.statusCode == 200)  {
                    const infoJson = JSON.parse(body);
                    if (infoJson.provider && infoJson.chainId && infoJson.symbol) {
                        RollnaChainInfo.rollnaInfo.rollnaProvider = infoJson.provider;
                        RollnaChainInfo.rollnaInfo.rollnaChainId = infoJson.chainId;
                        RollnaChainInfo.rollnaInfo.rollnaTokenSymbols = infoJson.symbol;
                        return RollnaChainInfo.rollnaInfo;
                    } 
                }
           })
           return undefined
        }
        return RollnaChainInfo.rollnaInfo;
    }
}

export class SupportedChainInfo {
    protected static ChainInfos : Map<number, ChainInfo>;
    private  constructor() {}
    static async updateChainInfos() {
        await https_request({url: chainInfosUrl}, function(err: any, response: any, body: any) {
            if(!err && response.statusCode == 200)  {
                const infoJson = JSON.parse(body) as Map<number, ChainInfo>;
                SupportedChainInfo.ChainInfos = infoJson;
            }
       })
    }

    static async getChainInfo(chainId : number) {
        if (!SupportedChainInfo.ChainInfos) {
            await SupportedChainInfo.updateChainInfos();
        }
        return SupportedChainInfo.ChainInfos.get(chainId)
    }
}