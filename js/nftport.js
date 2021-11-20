// REMOVE LOADING
document.body.classList.remove('loading');

// CUSTOM SWEET ALERTS
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
  

   /*********************************************************************************************
   .) NAVBAR
   **********************************************************************************************/
   var navb = document.getElementById('button');
   var sideBar = document.getElementById('sideBar');
   var content= document.getElementById('main');
   navb.onclick = navbar;
   
   function navbar() {
     if (navb.classList.contains('is-active')) { // if user is no defined
         console.log('CIERRA');
         navb.classList.remove('is-active');
         sideBar.classList.remove('isOpen');
         content.classList.remove('isOpen');
   
         TweenMax.to(".nav", 0.5, { xPercent: -100, display: 'none', ease: Expo.easeOut });
         window.removeEventListener("click", listener, false);
   
     } else {
         console.log('ABRE');
         navb.classList.add('is-active');
         sideBar.classList.add('isOpen');
         content.classList.add('isOpen');
         TweenMax.fromTo(".nav", 0.5, { xPercent: -100 }, { xPercent: 0, display: 'block', ease: Expo.easeOut });
         TweenMax.staggerFrom('.nav li', 0.5, { opacity: 0, y: 20, ease: Power2.easeInOut }, 0.1);
         setTimeout(() => { window.addEventListener("click", listener, false); }, 100);
   
     }
   }
   
   function listener(e) {
     if (sideBar.contains(e.target)) {
         console.log("clicked A Inside" + e.target);
     } else {
         console.log("clicked B outside" + e.target);
         navb.classList.remove('is-active');
         sideBar.classList.remove('isOpen');
         content.classList.remove('isOpen');
         TweenMax.to(".nav", 0.5, { xPercent: -100, display: 'none', ease: Expo.easeOut });
         window.removeEventListener("click", listener, false);
     }
   }
  

// retriebe all nfts per contract
// https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts
// contract
// const token_contract_address = TOKEN_CONTRACT_ADDRESS.toLowerCase();
// console.log(token_contract_address);
// let currentChain = 'rinkeby';
// const TOKEN_CONTRACT_ADDRESS = "0xf1CCd9b401cb1b37eEd0fEC58752b0E07bd9A1D7"; // murals1155-v1d.sol 21-2-3-4-5-6-7
// const TOKEN_CONTRACT_ADDRESS = "0x38a554984cf2205f7903123adeb6d560f46625e8"; // creados desde nftport como erc721 en polygon pero los mintea en rinkeby
const TOKEN_CONTRACT_ADDRESS = "0x0dB4DF5E0FF20aCF2E3469d5756103A3e03cd1a1"; // creados desde nftport como erc721 en polygon pero los mintea en rinkeby
const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';

// RETRIEVE NFTs
// fetch(`https://api.nftport.xyz/v0/nfts/${TOKEN_CONTRACT_ADDRESS}?chain=polygon`, {
//   "method": "GET",
//   "headers": {
//     "Content-Type": "application/json",
//     "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
//   }
// })
// .then(response => {
//   console.log('NFTs: ',response);
// })
// .catch(err => {
//   console.error(err);
// });
fetch("https://api.nftport.xyz/v0/me/mints?chain=polygon", {
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
})
.then(response => {
  console.log(response);
  console.log('LENGTH: ',response.headers.forEach.length);

})
.catch(err => {
  console.error(err);
});




// RETRIEVE CONTRACT
fetch(`https://api.nftport.xyz/v0/contracts/${TOKEN_CONTRACT_ADDRESS}?chain=polygon`, {
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
