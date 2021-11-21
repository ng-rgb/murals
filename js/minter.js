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
    // if (!user || user === null){ 
    //   document.getElementById("logger").innerHTML = 	`<button id="login" onclick="login();" class="btn-grad">CONNECT WALLET</button>`
  
    // } else{
    //   let userAddress = user.get("ethAddress");
    //   document.getElementById("logger").innerHTML = "<p>"+userAddress +" <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
    //   console.log("user has already signed in");
    //   Toast.fire( " Great!", "  You are already logged in", "success" );
    // }
    
  
  }
  
  ///////////////////////////////////
  // SUBMIT
  //////////////////////////////////
  async function submit() {
    console.log('submit clicked');
  
    //get image data
    const input = document.querySelector('#input_image');
    let data = input.files[0];
  console.log('file to be uploaded:', data.name);
    // upload image to ipfs
    
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.nftport.xyz/v0/metadata",
      "method": "POST",
      "headers": {
        "Content-Type": "",
        "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
      },
      "processData": false,
      "data": "{\n  \"name\": \"Your NFT name\",\n  \"description\": \"Your NFT description\",\n  \"file_url\": \"The ipfs_url you got from the previous request response\"\n}"
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });

    



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
  
