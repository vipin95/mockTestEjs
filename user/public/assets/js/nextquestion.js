function nextQuestion(){
    let question =document.getElementById("question").innerHTML;
    let options_radio = document.getElementsByClassName("radio_button_cls");
    let options_value = document.getElementsByClassName("radio_test");
    let answers ;
    let qNumberStr = document.getElementById('questionNumber').innerHTML;
    let qNumber = parseInt(qNumberStr);
    
    for(let i=0 ; i<options_radio.length ; i++){
        if(options_radio[i].checked){
            answers = options_value[options_radio[i].value].innerHTML;
        }
    }
    let datastr = document.getElementById('hiddenData').innerHTML;
    let data = JSON.parse(datastr)
    let nextQuestion = qNumber+1+" of 20";
     
    let currect_ans = checkAnswer(question,answers,qNumber,data);

    for(let i=0 ; i<data.length ; i++){
        if(i==qNumber){
            document.getElementById("question").innerHTML = data[i].question;
            options_value[0].innerHTML = data[i].option0;
            options_value[1].innerHTML = data[i].option1;
            options_value[2].innerHTML = data[i].option2;
            options_value[3].innerHTML = data[i].option3;
            document.getElementById('questionNumber').innerHTML = nextQuestion;
        }
    }
    if(qNumber == data.length){
        window.location.href=`/test/result?Curr_ans=${currect_ans}&path=${window.location.pathname}`;
    }
    if(qNumber == data.length-1){
        document.getElementById('next-btn').setAttribute("style","display:none")
        document.getElementById('success-btn').setAttribute("style","display:inline-block")
    }
}