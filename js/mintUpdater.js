
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
   let imageLinknftport = "/ipfs/" + imageHash;

   // SHOW OPERATION DETAILS;
    document.querySelector('#success_message').innerHTML +=`File uploaded to IPFS:<i class="fa fa-check" aria-hidden="true"></i><br> ${imageLink} .<br> <a target="_blank" href="${imageLink}">view FILE</a><br><br>`;
    document.querySelector('#success_message').style.display= 'block';

// CONTINUE TO UPLOAD METADATA
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
    let metadataLinknftport = "/ipfs/" + metadataHash;
    console.log(metadataHash);
   
    // SHOW OPERATION DETAILS;
    document.querySelector('#success_message').innerHTML +=`Metadata uploaded to IPFS:<i class="fa fa-check" aria-hidden="true"></i><br> ${metadataLink} .<br> <a target="_blank" href="${metadataLink}">view METADATA</a>`;



      
  /*********************************************************************************************
 .) MINT UPDATER
//  https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft
**********************************************************************************************/
const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';
const TOKEN_CONTRACT_ADDRESS = "0x95c5B3a20e6f8a352B82236271756Ed83d4030b0"; // creado con nftport
const TOKEN_ID = "1370968920948363123531424230230201071445727871152"; // creado con nftport
const TO_ADDRESS = "0x23620BC1ce5FA0d55b767061a7307CC44Ab7099B"; // creado con nftport
const CHAIN = "polygon"; 

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.nftport.xyz/v0/mints/customizable",
    "method": "PUT",
    "headers": {
      "Content-Type": "",
      "Authorization": `${NFTPORT_KEY}`

    },
    "processData": false,
    "data": `{\n  \"chain\": \"${CHAIN}\",\n  \"contract_address\": \"${TOKEN_CONTRACT_ADDRESS}\",\n  \"token_id\": \"${TOKEN_ID}\",\n  \"metadata_uri\": \"The new metadata uri with which you want your NFT to be linked\"\n}`
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

}

document.getElementById('mintupdater').onclick = submit;

// .................................
// AUTOFILL PARA TESTING!
// .................................
const TOKEN_CONTRACT_ADDRESS = "0x95c5B3a20e6f8a352B82236271756Ed83d4030b0"; // creado con nftport
const TOKEN_ID = "1370968920948363123531424230230201071445727871152"; //

document.getElementById('input_tokenid').value = `${TOKEN_ID}`;
document.getElementById('input_tokencontract').value = `${TOKEN_CONTRACT_ADDRESS}`;
document.getElementById('nftName').value = 'DFACE_V2';
document.getElementById('nftDesc').value = 'NAME OF THE PAINT: Motion design by @serial_looper. When you buy this NFT you support 4 parts: The artist, the motion designer, the festival and the murals project';
document.getElementById('vidLink').value = 'https://ng-rgb.github.io/murals/Turncoat%20-DFaceV01%2BJMAURIN.mp4';
document.getElementById('geoInfo').value = '48.83258258297137, 2.3616745019412626';
document.getElementById('qrlink').value = 'https://rdsb.link/r/600a4699ad532';

