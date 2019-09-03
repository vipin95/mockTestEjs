function checkAnswer(question,answer,qNumber,data){
    let obj;
    var array = [];
    var currectAnsStr;
    if(qNumber!=1){
        var arrayStr = localStorage.getItem("quizResult");
        array = JSON.parse(arrayStr);
    }
    currectAnsStr = localStorage.getItem("currect_ans");

    if( (qNumber == 1) ){
        localStorage.setItem('currect_ans',0);
        currectAnsStr = 0;
    }
    for(let i=0 ; i<data.length ; i++){
        if(qNumber == i+1){
            console.log(data[i].answer+"----------"+answer);
            if(data[i].answer == answer){
                
                obj = {question:question,answer:answer,answerStatus:true};
                
                if( currectAnsStr == 0 ){
                    
                    localStorage.setItem('currect_ans','1');
                }else{
                    
                    localStorage.setItem('currect_ans',(parseInt(currectAnsStr)+1));
                }
                alert('right answer');
            }
            else{
                
                obj = {question:question,answer:answer,answerStatus:false};             
                alert('wrong answer');
            }
            array.push(obj);
            localStorage.setItem("quizResult", JSON.stringify(array));
        }
    }
    if(qNumber == data.length){
        return parseInt(localStorage.getItem("currect_ans"));
    }
}