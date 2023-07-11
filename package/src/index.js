"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatClaimRollOutInput = exports.getRollOutProof = exports.getRollnaInfo = exports.estimateRollInGasPrice = exports.formatRollOutERC20Input = exports.formatRollOutInput = exports.formatRollInERC20Input = exports.formatRollInInput = void 0;
const types_1 = require("../types");
const instanceFactory_1 = require("../contract/instanceFactory");
const Web3 = __importStar(require("web3"));
function formatRollInInput(fromAddr, fromChainId, amount, destAddr, gas) {
    let fromChainInfo = types_1.SupportedChainInfo.getChainInfo(fromChainId);
    if (fromChainInfo != undefined) {
        let contractInstance = instanceFactory_1.ContractInstanceFactory.getContractInstance(false, fromChainId);
        if (contractInstance != undefined) {
            let data = contractInstance.rollIn(fromAddr, destAddr, amount);
            return {
                from: fromAddr,
                to: contractInstance.getRollInContractAddr(),
                gas: gas,
                data: data
            };
        }
    }
    return undefined;
}
exports.formatRollInInput = formatRollInInput;
function formatRollInERC20Input(fromAddr, fromChainId, amount, tokenAddr, destAddr, gas) {
    let fromChainInfo = types_1.SupportedChainInfo.getChainInfo(fromChainId);
    if (fromChainInfo != undefined) {
        let contractInstance = instanceFactory_1.ContractInstanceFactory.getContractInstance(true, fromChainId, tokenAddr);
        if (contractInstance != undefined) {
            let data = contractInstance.rollIn(fromAddr, destAddr, amount);
            return {
                from: fromAddr,
                to: contractInstance.getRollInContractAddr(),
                gas: gas,
                data: data
            };
        }
    }
    return undefined;
}
exports.formatRollInERC20Input = formatRollInERC20Input;
function formatRollOutInput(fromAddr, fromChainId, amount, destAddr, gas) {
    let fromChainInfo = types_1.SupportedChainInfo.getChainInfo(fromChainId);
    if (fromChainInfo != undefined) {
        let contractInstance = instanceFactory_1.ContractInstanceFactory.getContractInstance(false, fromChainId);
        if (contractInstance != undefined) {
            let data = contractInstance.rollOut(fromAddr, destAddr, amount);
            return {
                from: fromAddr,
                to: contractInstance.getRollOutContractAddr(),
                gas: gas,
                data: data
            };
        }
    }
    return undefined;
}
exports.formatRollOutInput = formatRollOutInput;
function formatRollOutERC20Input(fromAddr, fromChainId, amount, tokenAddr, destAddr, gas) {
    let fromChainInfo = types_1.SupportedChainInfo.getChainInfo(fromChainId);
    if (fromChainInfo != undefined) {
        let contractInstance = instanceFactory_1.ContractInstanceFactory.getContractInstance(true, fromChainId, tokenAddr);
        if (contractInstance != undefined) {
            let data = contractInstance.rollOut(fromAddr, destAddr, amount);
            return {
                from: fromAddr,
                to: contractInstance.getRollOutContractAddr(),
                gas: gas,
                data: data
            };
        }
    }
    return undefined;
}
exports.formatRollOutERC20Input = formatRollOutERC20Input;
async function estimateRollInGasPrice(httpProvider, input) {
    var web3 = new Web3.Web3(httpProvider);
    return await web3.eth.estimateGas(input);
    // need gasfee in LR
    // (TODO:mingxuan)need further design with saitama and jessica
}
exports.estimateRollInGasPrice = estimateRollInGasPrice;
async function getRollnaInfo() {
    return await types_1.RollnaChainInfo.getRollNaInfo();
}
exports.getRollnaInfo = getRollnaInfo;
async function getRollOutProof(size, leaf) {
    // need further contract information
    return;
}
exports.getRollOutProof = getRollOutProof;
async function formatClaimRollOutInput(from, txhash, proof, chainid) {
    // need further contract information
    return;
}
exports.formatClaimRollOutInput = formatClaimRollOutInput;