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

