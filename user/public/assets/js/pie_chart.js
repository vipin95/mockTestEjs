function pie_chart(correct,incorrect) {

    var chart = new CanvasJS.Chart("chartContainer", {  
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: correct*5, label: "Correct"},
                {y: incorrect*5, label: "Incorrect"}
            ]
        }]
    });
    chart.render();
    }