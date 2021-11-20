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
// let currentChain = 'rinkeby';
const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';
const TOKEN_CONTRACT_ADDRESS = "0x0dB4DF5E0FF20aCF2E3469d5756103A3e03cd1a1"; // creados desde nftport como erc721 en polygon pero los mintea en rinkeby

const metadataURI1 = 'ipfs://QmZUvNsdDabXqJyC47F9AkD3G2x1DAVPdGaGKwtpLjaAF9';
const mint2Address = '';

// RETRIEVE NFTs

// fetch("https://api.nftport.xyz/v0/me/mints?chain=polygon", {
//   "method": "GET",
//   "headers": {
//     "Content-Type": "application/json",
//     "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
//   }
// })
// .then(response => {
//   console.log(response);
//   console.log('LENGTH: ',response.headers.forEach.length);

// })
// .catch(err => {
//   console.error(err);
// });

const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nftport.xyz/v0/nfts/0x0dB4DF5E0FF20aCF2E3469d5756103A3e03cd1a1?chain=polygon",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
  }
};

$.ajax(settings).done(function (response) {
  // console.log(response);
  console.log(response.nfts);
  for ( var i = 0; i < response.nfts.length; i++ ) {
  console.log(response.nfts[i].token_id);
  console.log(response.nfts[i].contract_address);
  console.log(response.nfts[i].chain);
  // $("#main").html(response.nfts[i].token_id,response.nfts[i].contract_address,response.nfts[i].chain);

  document.getElementById("main").innerHTML += "<p>" + response.nfts[i].token_id + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
  

}
});


// $.ajax({url: "demo_test.txt", success: function(result){
//   $("#main").html(result);
// }});



// $.ajax({
//   url: "/get-users",
//   method: "POST",
//   data:{
//       name: input,
//   },
//   success:function(response){
//       html = "";
//       html += '<ul class="list-unstyled">';
//       $.each(response.data, function( index, value ) {
//           html += '<li class="my-2 text-capitalize" style="cursor:pointer" data-id="'+ value.id +'">' + value.name +'</li>';
//       });
//       html += '</ul>';
//       $('#speakerResponse').empty('').append(html);
//       console.log(html);
//   },
//   error: function (xhr, ajaxOptions, thrownError) {
//       console.log(xhr.status);
//       console.log(thrownError);
//   }
// });
