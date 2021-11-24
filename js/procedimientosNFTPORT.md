1 crear el contracto erc721
https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract

const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/contracts",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  },
  "processData": false,
  "data": "{\n  \"chain\": \"polygon\",\n  \"name\": \"CRYPTOMURALS\",\n  \"symbol\": \"C\",\n  \"owner_address\": \"0x9031FDE86c3c9115d302043316E97dD9ef5d3e66\"\n}"
};

$.ajax(settings).done(function (response) {
  console.log(response);
});



{
  "response": "OK",
  "chain": "polygon",
  "transaction_hash": "0x9d07d22c38548fff394e6564b6a158827d26c4024d350505cae1a28d9026d479",
  "transaction_external_url": "https://polygonscan.com/tx/0x9d07d22c38548fff394e6564b6a158827d26c4024d350505cae1a28d9026d479",
  "owner_address": "0x9031FDE86c3c9115d302043316E97dD9ef5d3e66",
  "name": "CRYPTOMURALS",
  "symbol": "C"
}

2. retrieve deployed contract
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/contracts/0x9d07d22c38548fff394e6564b6a158827d26c4024d350505cae1a28d9026d479?chain=polygon",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

{
  "response": "OK",
  "chain": "polygon",
  "contract_address": "0x23620BC1ce5FA0d55b767061a7307CC44Ab7099B",
  "transaction_hash": "0x9d07d22c38548fff394e6564b6a158827d26c4024d350505cae1a28d9026d479",
  "error": null
}


3. mint it con nft port y moralis
A. create metadata on ipfs with moralis


B. nftpor:
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/mints/customizable",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  },
  "processData": false,
  "data": "{\n  \"chain\": \"polygon\",\n  \"contract_address\": \"0xC8D297D7b496f86673551c933815B47973FC4a0e\",\n  \"metadata_uri\": \"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4\",\n  \"mint_to_address\": \"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42\"\n}"
};

$.ajax(settings).done(function (response) {
  console.log(response);
});


# DINAMIC NFTs
<https://docs.nftport.xyz/docs/nftport/ZG9jOjI4NzY0NTY1-how-to-create-dynamic-nf-ts>
# 1 crear contrato
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/contracts",
  "method": "POST",
  "headers": {
    "Content-Type": "",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  },
  "processData": false,
  "data": "{\n  \"chain\": \"polygon\",\n  \"name\": \"CRYPTOMURALS\",\n  \"symbol\": \"CM\",\n  \"owner_address\": \"0x9031FDE86c3c9115d302043316E97dD9ef5d3e66\",\n  \"metadata_updatable\": true\n}"
};

$.ajax(settings).done(function (response) {
  console.log(response);
});


200 OK
{
  "response": "OK",
  "chain": "polygon",
  "transaction_hash": "0xcde8681b6fb235dd29c36089b7b11133ca5bf556e221a357ece1f02675098aa8",
  "transaction_external_url": "https://polygonscan.com/tx/0xcde8681b6fb235dd29c36089b7b11133ca5bf556e221a357ece1f02675098aa8",
  "owner_address": "0x9031FDE86c3c9115d302043316E97dD9ef5d3e66",
  "name": "CRYPTOMURALS",
  "symbol": "CM"
}

# 2 retrieve deployed contract

const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/contracts/0xcde8681b6fb235dd29c36089b7b11133ca5bf556e221a357ece1f02675098aa8?chain=polygon",
  "method": "GET",
  "headers": {
    "Content-Type": "",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});


200 OK
{
  "response": "OK",
  "chain": "polygon",
  "contract_address": "0x95c5B3a20e6f8a352B82236271756Ed83d4030b0",
  "transaction_hash": "0xcde8681b6fb235dd29c36089b7b11133ca5bf556e221a357ece1f02675098aa8",
  "error": null
}

# 3 Upload your assets to IPFS
<http://192.168.43.95:8011/minter.html>


# 4 Mint NFTs to your contract

const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/mints/customizable",
  "method": "POST",
  "headers": {
    "Content-Type": "",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  },
  "processData": false,
  "data": "{\n  \"chain\": \"polygon\",\n  \"contract_address\": \"The contract address which you got from step 1 A\",\n  \"metadata_uri\": \"Metadata URI that you got from the response of uploading metadata to IPFS\",\n  \"mint_to_address\": \"Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself\"\n}"
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

200 OK
{
  "response": "OK",
  "chain": "polygon",
  "contract_address": "0x95c5B3a20e6f8a352B82236271756Ed83d4030b0",
  "transaction_hash": "0x8169412a95d3a5a4a004602c38189538f5a979d482ad699d1b57e602364a7acc",
  "transaction_external_url": "https://polygonscan.com/tx/0x8169412a95d3a5a4a004602c38189538f5a979d482ad699d1b57e602364a7acc",
  "metadata_uri": "https://bafybeid7bpyuhksskjnq62s2fs2floz6ix7uf2lyjwwzpphfrjovawdvte.ipfs.dweb.link/",
  "mint_to_address": "0x9031FDE86c3c9115d302043316E97dD9ef5d3e66",
  "error": null
}

# 5 Get token ID of the minted NFT
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/mints/0xcde8681b6fb235dd29c36089b7b11133ca5bf556e221a357ece1f02675098aa8?chain=polygon",
  "method": "GET",
  "headers": {
    "Content-Type": "",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
200 OK
{
  "response": "OK",
  "chain": "polygon",
  "contract_address": "0x95c5B3a20e6f8a352B82236271756Ed83d4030b0",
  "token_id": "201133565150118754560977004178089485324316348149",
  "error": null
}


### How to update the metadata of the NFT
