//TOAST
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
  
 
  
  ///////////////////////////////////
  // initApp
  //////////////////////////////////
  async function initApp() {
    document.querySelector('#app').style.display = 'block';
  
     // CHEQUEA WEB
     if (typeof web3 !== "undefined") {
      console.log("1- web3 is enabled. we continue... ");
    } else {
      console.log("web3 is not found");
      Swal.fire({ title: "web3 is not found", icon: "info", html: 'A web3 enabled browser is needed to use Murals. ' + '.', showCloseButton: true, focusConfirm: false, confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK', confirmButtonAriaLabel: "Thumbs up, great!" });
    }
  
     // INICIA USUARIO
  let user;
    if (!user || user === null){ 
      document.getElementById("logger").innerHTML = 	`<button id="login" onclick="login();" class="btn-grad">CONNECT WALLET</button>`
  
    } else{
      let userAddress = user.get("ethAddress");
      document.getElementById("logger").innerHTML = "<p id='addrss'>"+userAddress +" <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
      console.log("user has already signed in");
      Toast.fire( " Great!", "  You are already logged in", "success" );
    }
    
  
  }
  
  ///////////////////////////////////
  // SUBMIT
  //////////////////////////////////
const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';
const CHAIN = "polygon"; 

 
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const fs = require('fs');
// const fetch = require('node-fetch');
// const FormData = require('form-data');

// const form = new FormData();
// const fileStream = fs.createReadStream('image.jpg');
// form.append('file', fileStream);

// const options = {
//   method: 'POST',
//   body: form,
//   headers: {
//     "Authorization": `${NFTPORT_KEY}`,
//   },
// };

// fetch("https://api.nftport.xyz/v0/files", options)
//   .then(response => {
//     return response.json()
//   })
//   .then(responseJson => {
//     // Handle the response
//     console.log(responseJson);
//   })





  async function submit() {
    console.log('submit clicked');
  
    //get image data
    const input = document.querySelector('#input_image');
    let data = input.files[0];
    let datax = $('#input_image')[0].files[0];

  console.log('file to be uploaded:', datax);


  
    // upload image to ipfs
    const form = new FormData();
    // form.append("file", "");
    // form.append("file",data.name);
    form.append("file", datax);
    
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.nftport.xyz/v0/files",
      "method": "POST",
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": `${NFTPORT_KEY}`
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    };
    
    $.ajax(settings).d
    one(function (response) {
      console.log(response);
    });

    // const settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://api.nftport.xyz/v0/metadata",
    //   "method": "POST",
    //   "headers": {
    //     "Content-Type": "",
    //     "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
    //   },
    //   "processData": false,
    //   "data": "{\n  \"name\": \"Your NFT name\",\n  \"description\": \"Your NFT description\",\n  \"file_url\": \"The ipfs_url you got from the previous request response\"\n}"
    // };
    
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });

    



    // show info of uploaded file
    // console.log(imageHash);
    // document.querySelector('#success_message').innerHTML =`NFT minted. <a target="_blank" href="${url}">view NFT</a>`;
    // document.querySelector('#success_message').style.display= 'block';
    // setTimeout(() => {
    //   document.querySelector('#success_message').style.display= 'none';
    // }, 20000);
  
  }
  
  
  
//   document.getElementById("btn-login").onclick = login;
//   document.getElementById("btn-logout").onclick = logOut;
  document.getElementById("submit_button").onclick = submit;
  initApp();
  


  





  // .................................
// MINT FUNCTION
// .................................
// prepareNFT = async () => {
//   if (globalMintRadio == 0) {
//     console.log("CERO"); // error cuando reseteo la varialble muestra cero!
//     Sweetalert2.fire({
//       icon: "error",
//       title: "Price!: " + "Price is not set"
//     });
//     return;
//   }

//   // JUST MINT
//   if (globalMintRadio == 1) {
//     console.log("JUST MINT");

//     // 1. hide this radio
//     modalfield.classList.add("fase1");
//     TweenMax.staggerTo(
//       "#modalfield, #legend , #btnCreateItem",
//       0.5,
//       {
//         opacity: 0,
//         x: -20,
//         ease: Power2.easeIn
//       },
//       0.1
//     );
//     globalMintRadio = ""; //reseatea la variable
//     document.querySelectorAll('input[name="radio"]').forEach(elem => {
//       elem.disabled = true;
//     });

//     // 2. Display next
//     a1.style.display = "grid";
//     TweenMax.staggerFrom(
//       "#a1 ",
//       0.5,
//       {
//         opacity: 0,
//         x: -20,
//         ease: Power2.easeIn
//       },
//       0.1
//     );

//     // 3. create NFT metadata
//     // 3.a. prepare and arrange track names
//     //SIP, voy a probar esto de guardarlo una sola vez en la database yu reordenarlo aqui al crear la metadata
//     let tracks = currentDraft.get("tracks");
//     let trackNames = [];
//     tracks.forEach(function(tracks, index) {
//       let nftMP3FileTitle = tracks[1];
//       let duration = tracks[3];
//       // trackNames.push(nftMP3FileTitle,duration);
//       trackNames.push([nftMP3FileTitle, duration]);
//       // console.log('trackNames',nftMP3FileTitle,duration);
//     });
//     console.log("trackNames OUTSIDE", trackNames);

//     //3.b. add track names to create NFT metadata
//     let name = currentDraft.get("title");
//     let description = currentDraft.get("description");
//     let descriptionWithTrackNames = description + ", " + trackNames;
//     let image = currentDraft.get("image");
//     // let trackNames = currentDraft.get("trackNames");
//     let draftId = currentDraft.id;
//     const metadata = {
//       name: name,
//       description: descriptionWithTrackNames,
//       image: image,
//       draftId: draftId
//     }; //used to play the tracks from the server which has the distroId - trakcs keypairs
//     // const metadata = { name: name, description: description, image: image, draftId: draftId };//used to play the tracks from the server which has the distroId - trakcs keypairs
//     const nftFileMetadataFile = new Moralis.File("metadata.json", {
//       base64: btoa(JSON.stringify(metadata))
//     });
//     await nftFileMetadataFile.saveIPFS();
//     const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();
//     console.log("BRAVO!: url de metadata: ", nftFileMetadataFilePath);
//     a1.innerHTML +=
//       '<a href="' +
//       nftFileMetadataFilePath +
//       '">' +
//       nftFileMetadataFilePath +
//       "</a>";
//     loadera1.classList.add("success");

//     // 4. make payment
//     a2.style.display = "grid";
//     await mintNFT(nftFileMetadataFilePath);
//     mintedTimes(globalObjectId);
//   }
