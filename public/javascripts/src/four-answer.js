var barChartData;

render();

function setdata(){
    barChartData = {
        labels : ["1", "2", "3", "4"],
        datasets : [
        {
            fillColor : [
            "rgba(255,87,34,1)",
            "rgba(0,188,180,1)",
            "rgba(255,87,34,1)",
            "rgba(0,188,180,1)"
                ],
            strokeColor : "rgba(151,187,205,0.8)",
            // data : [maru, batsu]
            data : [100, 50, 60, 40]
        }      
        ]  
    }
} 

function render(){
    setdata();
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true
    });
}
