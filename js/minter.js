   /*********************************************************************************************
   .) TOAST
   **********************************************************************************************/
     

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
   .) MORALIS (for loggin and other quickfixes)
   **********************************************************************************************/
     

  // 0. Check moralis
  const serverUrl = "https://hyorvrgxcdmm.usemoralis.com:2053/server";
  const appId = "Lx28OvD1jYsfl8Q52brKgUbJ1yGP9kWgffDg2hrU";
  Moralis.start({ serverUrl, appId });
 
   /*********************************************************************************************
   .) LOGIN stuff
   **********************************************************************************************/
     


    /** Add from here down */
    async function login() {
        console.log('login tryied');
        let user = Moralis.User.current();
        if (!user) {
          try {
           let user = await Moralis.authenticate({ signingMessage: "Hello from cryoptomurals!" })
            let userAddress =user.get('ethAddress');
            // document.getElementById("logg").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
            var x = userAddress;
            var shortAddr = x.substring(0, 8) + "...";
            document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
      

            console.log('User address: ',userAddress)
      
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('user is already here...');
          Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
          let userAddress =user.get('ethAddress');
          // document.getElementById("logg").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
          var x = userAddress;
          var shortAddr = x.substring(0, 8) + "...";
          document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
  
          
        }
      }
  
   
  
      async function logOut() {
        await Moralis.User.logOut();
        document.getElementById("logg").innerHTML = `<button  class="btn-grad"   onclick="login();">Connect</button>`
      
        console.log("logged out");
      }
  
      
  /*********************************************************************************************
 .) INITIALIZE DAPP
**********************************************************************************************/

// initializeApp();
  
  async function initializeApp(){
    console.log("iniciar has benn triggered");

    // INICIA USUARIO
    if (typeof web3 !== "undefined") {
      console.log("1- web3 is enabled");
      
      document.getElementById("logg").innerHTML = 	`<button id="login" onclick="login();" class="btn-grad">CONNECT</button>`
      
      let user = Moralis.User.current();
      if (!user) {
       console.log(' user is not loggedbut we do nothing ;) ');
          
      } else {
        console.log('user is already here...');
        Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
        let userAddress =user.get('ethAddress');
        var x = userAddress;
        var shortAddr = x.substring(0, 8) + "...";
        document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
  
      }




    } else {
      console.log("web3 is not found");
      // noWeb3();
      Swal.fire({ title: "web3 is not found", icon: "info", html: 'A web3 enabled browser is needed to use Cryptomurals. ' + '.', showCloseButton: true, focusConfirm: false, confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK', confirmButtonAriaLabel: "Thumbs up, great!" });
    }
}


initializeApp();


  
  ///////////////////////////////////
  // SUBMIT
  //////////////////////////////////
// const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';
// const CHAIN = "polygon"; 

//   async function submit() {
//     console.log('submit clicked');
  
//     //get image data
//     const input = document.querySelector('#input_image');
//     let data = input.files[0];
//     let datax = $('#input_image')[0].files[0];

//   console.log('file to be uploaded:', datax);


  
//     // upload image to ipfs
//     const form = new FormData();
//     form.append("file", datax);
    
//     const settings = {
//       "async": true,
//       "crossDomain": true,
//       "url": "https://api.nftport.xyz/v0/files",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "multipart/form-data",
//         "Authorization": `${NFTPORT_KEY}`
//       },
//       "processData": false,
//       "contentType": false,
//       "mimeType": "multipart/form-data",
//       "data": form
//     };
    
//     $.ajax(settings).d
//     one(function (response) {
//       console.log(response);
//     });
//   }

  // document.getElementById("submit_mint").onclick = submit;
  // initApp();
  

  
  





  // .................................
// MINT FUNCTION
// .................................

// // MINT
// mint.onclick = function() {
//   minterModal.style.display = "block";

// };

// // CLOSE MODAL
// let closeModal = document.getElementsByClassName("closeModal");
// for (i = 0; i < closeModal.length; i++) {
//   closeModal[i].onclick = function() {
//     addTracksModal.style.display = "none";
//     minterModal.style.display = "none";
//     addArtistModal.style.display = "none";
//   };
// }

// uploadImg = async img => {
//   const nftFile = new Moralis.File("nftFile.png", img);
//   await nftFile.saveIPFS(); // upload to ipfs
//   const nftFilePath = nftFile.ipfs();
//   updateDraft(currentDraft, "image", nftFilePath);
//   console.log("image uploaded to ipfs: ", nftFilePath);
// };


// .................................
// MINT FUNCTIONs
// prepareNFT = async () => {
  
//   // 1. Upload img to IPFS

//     // 3. create NFT metadata

//     let name = nftName.value;
//     let description = nftDesc.value;
//     // let image = image.value;//fake
//     let video = vidLink.value;
//     let geo = geoInfo.value;
//     let qr = qrlink.value;


//     const metadata = {
//       name: name,
//       description: description,
//       image: image,
//       videoLink: video,
//       geoInfo: geo,
//       qrLink: qr
//     }; 

//     const nftFileMetadataFile = new Moralis.File("metadata.json", {
//       base64: btoa(JSON.stringify(metadata))
//     });

//     await nftFileMetadataFile.saveIPFS();


//     const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();

//     console.log("BRAVO!: url de metadata: ", nftFileMetadataFilePath);
//     a1.innerHTML += '<a href="' + nftFileMetadataFilePath + '">' + nftFileMetadataFilePath + "</a>"; loadera1.classList.add("success");

//     // 4. make payment
//     a2.style.display = "grid";
//     await mintNFT(nftFileMetadataFilePath);
//     // mintedTimes(globalObjectId);
//   }




  async function submit() {
    console.log('submit clicked');
    if (nftName.value.length == 0) {
      alert("Please this NFT a name");
      return;
    } else if (nftDesc.value.length == 0) {
      alert("Please enter a description");
      return;
    } else if (nftimg.files.length == 0) {
      alert("Please upload an image for this NFT");
      return;
    } else if (vidLink.value.length == 0) {
        alert("Please enter a video link");
        return;
      } else if (geoInfo.value.length == 0) {
        alert("Please geo coordinates like: [83258258297137, 2.3616745019412626]");
        return;
      } else if (qrlink.value.length == 0) {
      alert("Please enter the qr link for this experience");
      return;
    }

    
    //get image data
    // const input = document.querySelector('#nftimg');
    let data = nftimg.files[0];
  
    // upload image to ipfs
    // https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzY-upload-a-file-to-ipfs
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();
    console.log(imageHash);
   let imageLink = "ipfs://" + imageHash;

   // SHOW OPERATION DETAILS;
document.querySelector('#success_message').innerHTML +=`File uploaded to IPFS:<i class="fa fa-check" aria-hidden="true"></i><br> ${imageLink} .<br> <a target="_blank" href="${imageLink}">view FILE</a><br><br>`;
document.querySelector('#success_message').style.display= 'block';


    let metadata = {
      name: nftName.value,
      description: nftDesc.value,
      image: imageLink,
      video: vidLink.value,
      geoInfo: geoInfo.value,
      qrLink: qrlink.value
    }; 

    console.log('metadata: ', metadata);

    
    // UPLOAD METADATA TO IPFS
    const jsonFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata))
    });
    await jsonFile.saveIPFS();
    let metadataHash = jsonFile.hash();
    let metadataLink = "ipfs://" + metadataHash;
    console.log(metadataHash);

document.querySelector('#success_message').innerHTML +=`Metadata uploaded to IPFS:<i class="fa fa-check" aria-hidden="true"></i><br> ${metadataLink} .<br> <a target="_blank" href="${metadataLink}">view METADATA</a>`;

  
    //CUSTOMIZABLE MINTING NFT with NFTPORT
    // https://nftport.stoplight.io/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting



  }

  document.getElementById('submit_mint').onclick = submit;

  




// // MINT!
// mintNFT = async metadataUrl => {
//   const receipt = await tokenContract.methods
//     .createItem(metadataUrl)
//     .send({
//       from: ethereum.selectedAddress
//     })
//     .then(function(result) {
//       console.log("RECEIPT RECEIVED!: ", result);
//       let NFTId = result.events.Transfer.returnValues.tokenId;
//       let NFTETHContractAndId = TOKEN_CONTRACT_ADDRESS + "?a=" + NFTId;
//       let NFTMATICContractAndId = TOKEN_CONTRACT_ADDRESS + "/instance/" + NFTId;
//       let network = window.ethereum.networkVersion;

//       // add a different link according to network
//       if (network == 1) {
//         a2.innerHTML +=
//           '<a target="_blank" href="https://etherscan.io/token/' +
//           NFTETHContractAndId +
//           '"> Token Contract: ' +
//           NFTETHContractAndId +
//           "</a>";
//       } //eth
//       if (network == 3) {
//         a2.innerHTML +=
//           '<a target="_blank" href="https://ropsten.etherscan.io/token/' +
//           NFTETHContractAndId +
//           '"> Token Contract: ' +
//           NFTETHContractAndId +
//           "</a>";
//       } //ropten
//       if (network == 80001) {
//         a2.innerHTML +=
//           '<a target="_blank" href="https://explorer-mumbai.maticvigil.com/tokens/' +
//           NFTMATICContractAndId +
//           '"> Token Contract: ' +
//           NFTMATICContractAndId +
//           "</a>";
//       } //mumbai
//       if (network == 137) {
//       } //matic
//       if (network == 5777) {
//         a2.innerHTML +=
//           "<a> Contrato:" +
//           TOKEN_CONTRACT_ADDRESS +
//           ", Token ID: " +
//           NFTId +
//           "</a>";
//       } //ganache

//       Swal.fire( 'Good job!', 'Item minted!', 'success' )
    

//       return NFTId;
//     })
//     .catch(function(error) {
//       console.error(error);
    
//     }); //
//   console.log("receipt from mintNFT(): ", receipt);

//   // aca con un condicional escuchando undefined puedo ejecutar el codigo de la siguiente seccion
//   if (receipt === undefined) {
//     console.log("RESULTADO INDEFINIDO from mintNFT()");
//   }
//   return receipt;
// };


// .................................
// AUTOFILL PARA TESTING!
// .................................

// document.getElementById('input_tokenid').value = 'tokenid';
// document.getElementById('input_tokencontract').value = 'tokencontract';
document.getElementById('nftName').value = 'DFACE';
document.getElementById('nftDesc').value = 'NAME OF THE PAINT: Motion design by @serial_looper. When you buy this NFT you support 4 parts: The artist, the motion designer, the festival and the murals project';
document.getElementById('vidLink').value = 'https://ng-rgb.github.io/murals/Turncoat%20-DFaceV01%2BJMAURIN.mp4';
document.getElementById('geoInfo').value = '48.83258258297137, 2.3616745019412626';
document.getElementById('qrlink').value = 'https://rdsb.link/r/600a4699ad532';

