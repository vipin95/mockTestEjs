function pie_chart(correct,incorrect,totelQues) {
    console.log(parseInt(totelQues)+"fdf");
    var chart = new CanvasJS.Chart("chartContainer", {  
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: (correct*100/totelQues), label: "Correct"},
                {y: (incorrect*100/totelQues), label: "Incorrect"}
                // {y: 10.5, label: "Correct"},
                // {y: 80.5, label: "Incorrect"}
            ]
        }]
    });
    chart.render();
    }