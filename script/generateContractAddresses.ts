import * as fs from "fs";
import * as path from "path";

const rootFolder = path.join(__dirname, '..');
const getAbi = (type: string) =>
    JSON.parse(fs.readFileSync(`${rootFolder}/out/${type}.sol/${type}.json`, "utf8")).abi;
const getBlob = (type: string, chainId: string) => 
    JSON.parse(fs.readFileSync(`${rootFolder}/broadcast/Deploy${type}.s.sol/${chainId}/run-latest.json`, "utf8"));

const supportedChains = [31337, 11155111, 80001, 421613, 534351]
const contracts = ['User', 'Post'];
const result: any = {};

for (let i=0; i<contracts.length; i++) {
    const contractName = contracts[i];
    const abi = getAbi(contractName);
    result[contractName] = { abi, deployments: {} };
    for (let j=0; j<supportedChains.length; j++) {
        const chainId = supportedChains[j].toString();
        try {
            const deployInfo = getBlob(contractName, chainId);
            result[contractName]["deployments"][chainId] = deployInfo.transactions[0].contractAddress;
        } catch {
            
        }
    }
}

fs.writeFile(`${rootFolder}/frontend/contract/contracts.json`, JSON.stringify(result), (err) => {
    if (err) {
      console.error(err);
      return;
    }
});