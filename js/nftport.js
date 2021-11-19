// remove loading
document.body.classList.remove('loading');

// custom swet alerts
const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  
  const fixedToast = swal.mixin({
    toast: true,
    position: "top-left",
    showConfirmButton: false,
    showConfirmButton: true
  });
  

// retriebe all nfts per contract
// https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts
// contract
// const token_contract_address = TOKEN_CONTRACT_ADDRESS.toLowerCase();
// console.log(token_contract_address);
// let currentChain = 'rinkeby';
const TOKEN_CONTRACT_ADDRESS = "0xf1CCd9b401cb1b37eEd0fEC58752b0E07bd9A1D7"; // murals1155-v1d.sol 21-2-3-4-5-6-7
// const TOKEN_CONTRACT_ADDRESS = "0x38a554984cf2205f7903123adeb6d560f46625e8"; // creados desde nftport como erc721 en polygon pero los mintea en rinkeby
const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';

fetch(`https://api.nftport.xyz/v0/nfts/${TOKEN_CONTRACT_ADDRESS}?chain=polygon`, {
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
})
.then(response => {
  console.log('NFTs: ',response);
})
.catch(err => {
  console.error(err);
});




// RETRIEBE CONTRACT
fetch("https://api.nftport.xyz/v0/contracts/0xda5b679d0e3fb7ed43c3bf7365d7a48caf1ebe4af09fe9b16ab5a8a0b46f00ab?chain=polygon", {
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
})
.then(response => {
  console.log('CONTRACT: ',response);
})
.catch(err => {
  console.error(err);
});
