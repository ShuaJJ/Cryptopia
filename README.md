### To verify contract:

```
forge verify-contract \
    --chain-id <chain_id> \
    --num-of-optimizations 1000000 \
    --watch \
    --compiler-version v0.8.21+commit.d9974bed \
    --constructor-args $(cast abi-encode "constructor(address)" <owner_address>) \
    --etherscan-api-key $API_KEY_ETHERSCAN \
    <contract_address> \
    src/User.sol:User
```

### To verify an address as project owner:

```
ADDRESS=0x92A2E7BA8446400C7407275e8Dc1FDAcED30E2Cf npm run verify:user:<chain>
```

### Subgraph endpoints:

https://api.studio.thegraph.com/query/49276/cryptopia-sepolia/v0.0.1