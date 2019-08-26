
function result_show_to_user(){
    let dataStr = localStorage.getItem("quizResult");
    let data = JSON.parse(dataStr);
    
    let html='<div class="card-block"><div><a href="" class="btn btn-primary btn-arrow-left fa fa-arrow-left" style="width:144px;height:63px;font-size:41px;padding:9px;text-align:left;margin-bottom: 30px;"><i style="margin-left:10px">Back</i></a></div><ul>';
    for (let index = 0; index < data.length; index++) {
        if(data[index].answerStatus)
        html += `<li class="display-1" style='display:block;font-size:17px;margin-bottom:10px' ><strong>Question ${index+1} : </strong>${data[index].question}<p style="color:green">Answer : ${data[index].answer}</p></li>`;
        else html += `<li <li class="display-1" style='display:block;font-size:17px;margin-bottom:10px' ><strong>Question ${index+1} : </strong>${data[index].question}<p style="color:red">Answer : ${data[index].answer}</p></li>`;
    }
    html += "</ul></div>";
    document.querySelector('#content').innerHTML =html;
}