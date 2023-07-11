import { Numbers } from "web3";
import {BaseContractInstance} from "./baseRollUp"
import {NativeContractInstance} from "./nativeRollUp"



class DemoContractInstance extends BaseContractInstance{

    rollIn(le_from : string, lr_to : string, value : Numbers) {
        return ""
    }
    rollOut(le_to : string, chainId : Number, lr_from : string, value : Numbers) {
        return ""
    }
    getRollInContractAddr() {
        return ""
    }
    getRollOutContractAddr() {
        return ""
    }
}

const nativeTokenTypeList = new Map<number, Array<string>>([// mapping from chainid to contract instance construct function
    [5, ["0xaaa", "0xbbb"]], //this is just a demo, waiting for contract abi and interface
]);

const ERC20TokenTypeList = new Map<number, Map<string, Array<string>>>([// mapping from chainid to contract instance construct function
    [5, new Map([
        ["0xfffff", ["0xaaa", "0xbbb"]],//this is just a demo, waiting for contract abi and interface
    ])],
]);



export class ContractInstanceFactory {
    private  constructor() {}
    static getContractInstance(isERC20 : boolean, chainId: number, tokenAddr?: string) : BaseContractInstance|undefined {
        if (isERC20) {
            return ContractInstanceFactory.getNativeInstance(chainId)
        } else {
            if (!tokenAddr) {
                return
            }
            return ContractInstanceFactory.getERC20Instance(chainId, tokenAddr)
        }
    } 
    private static getNativeInstance(chainId: number) : BaseContractInstance|undefined {
        let contractAddrs = nativeTokenTypeList.get(chainId)
        if (contractAddrs != undefined && contractAddrs.length == 2) {
            return new NativeContractInstance(contractAddrs[0], contractAddrs[1])
        }
    }
    private static getERC20Instance(chainId: number, tokenAddr: string) : BaseContractInstance|undefined {
        let inner = ERC20TokenTypeList.get(chainId)
        if (inner != undefined) {
            let contractAddrs = inner.get(tokenAddr)
            if (contractAddrs != undefined && contractAddrs.length == 2) {
                return new DemoContractInstance(contractAddrs[0], contractAddrs[1])
            }
        }

    }
}



