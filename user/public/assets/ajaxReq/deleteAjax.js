function deleteAjax(id,question){
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function(){
        if(this.readyState ==4 && this.status==200){    
            
            let result = JSON.parse(this.responseText);
            if(result.statusCode){
                document.getElementById(id).style.display = "none";
            }
        }
    }
    if(confirm(`Are you Sure ? \n\nDelete : ${question}`)){
        xHttp.open('POST',"/admin/delete",true);
        xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xHttp.send(`id=${id}`);
    }
}