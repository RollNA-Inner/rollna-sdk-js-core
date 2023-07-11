import { BigNumberish } from "@ethersproject/bignumber";

export abstract class BaseContractInstance {
    abstract rollIn(le_from : string, lr_to : string, value : BigNumberish) : string;
    abstract rollOut(lr_from : string, le_to : string, value : BigNumberish) : string;
    abstract getRollInContractAddr() : string
    abstract getRollOutContractAddr() : string
}

class DemoContractInstance extends BaseContractInstance{

    rollIn(le_from : string, lr_to : string, value : BigNumberish) {
        return ""
    }
    rollOut(lr_from : string, le_to : string, value : BigNumberish) {
        return ""
    }
    getRollInContractAddr() {
        return ""
    }
    getRollOutContractAddr() {
        return ""
    }
}

const nativeTokenTypeList = new Map<number, any>([// mapping from chainid to contract instance construct function
    [5, DemoContractInstance], //this is just a demo, waiting for contract abi and interface
]);

const ERC20TokenTypeList = new Map<number, Map<string, any>>([// mapping from chainid to contract instance construct function
    [5, new Map([
        ["0xfffff", DemoContractInstance],//this is just a demo, waiting for contract abi and interface
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
        let constructFunc = nativeTokenTypeList.get(chainId)
        if (constructFunc != undefined) {
            return new constructFunc()
        }
    }
    private static getERC20Instance(chainId: number, tokenAddr: string) : BaseContractInstance|undefined {
        let inner = ERC20TokenTypeList.get(chainId)
        if (inner != undefined) {
            let constructFunc = inner.get(tokenAddr)
            if (constructFunc != undefined) {
                return new constructFunc()
            }
        }

    }
}



