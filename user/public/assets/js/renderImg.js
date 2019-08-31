function printImg(getFrom,addOn){
    let input = document.getElementById(getFrom).files[0];
    
      fr = new FileReader();
      fr.onload = function (e) {
        document.querySelector("#"+addOn).innerHTML += `<div class="col-md-12" ><img style="width:100%" class="imgTag" name="profileImg${i}" src="${e.target.result}"/></div>`;
      };
      fr.readAsDataURL(input);
}