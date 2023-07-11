"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractInstanceFactory = exports.BaseContractInstance = void 0;
class BaseContractInstance {
}
exports.BaseContractInstance = BaseContractInstance;
class DemoContractInstance extends BaseContractInstance {
    rollIn(le_from, lr_to, value) {
        return "";
    }
    rollOut(lr_from, le_to, value) {
        return "";
    }
    getRollInContractAddr() {
        return "";
    }
    getRollOutContractAddr() {
        return "";
    }
}
const nativeTokenTypeList = new Map([
    [5, DemoContractInstance], //this is just a demo, waiting for contract abi and interface
]);
const ERC20TokenTypeList = new Map([
    [5, new Map([
            ["0xfffff", DemoContractInstance], //this is just a demo, waiting for contract abi and interface
        ])],
]);
class ContractInstanceFactory {
    constructor() { }
    static getContractInstance(isERC20, chainId, tokenAddr) {
        if (isERC20) {
            return ContractInstanceFactory.getNativeInstance(chainId);
        }
        else {
            if (!tokenAddr) {
                return;
            }
            return ContractInstanceFactory.getERC20Instance(chainId, tokenAddr);
        }
    }
    static getNativeInstance(chainId) {
        let constructFunc = nativeTokenTypeList.get(chainId);
        if (constructFunc != undefined) {
            return new constructFunc();
        }
    }
    static getERC20Instance(chainId, tokenAddr) {
        let inner = ERC20TokenTypeList.get(chainId);
        if (inner != undefined) {
            let constructFunc = inner.get(tokenAddr);
            if (constructFunc != undefined) {
                return new constructFunc();
            }
        }
    }
}
exports.ContractInstanceFactory = ContractInstanceFactory;
