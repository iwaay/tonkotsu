var maru = 0;
    var batsu = 0;
    var ctx = document.getElementById("canvas").getContext("2d");
    var barChartData = {
        labels : ["○","×"],
        datasets : [
        {
            fillColor : [
                "rgba(255,87,34,1)",
                "rgba(0,188,180,1)",
            ],
            strokeColor : "rgba(151,187,205,0.8)",
            data : [0, 0]
        }      
        ]  
    }

    var myBarChart = new Chart(ctx).Bar(barChartData, {
        responsive : true
    });

    var s = io.connect('http://localhost:2000'); 

    s.on("connect", function (){});
    s.on("disconnect");
    s.on("maru:send", function (data) {
        update('maru');
    });

    s.on("batsu:send", function (data) {
        update('batsu');
    });

//クライアントからイベント送信（イベント名は自由に設定できます）
function send2choice_maru() {
    var msg = $("#maru").val(); //取得
    s.emit("maru:send", {value:msg}); //サーバへ送信
}          

function send2choice_batsu() {
    var msg = $("#batu").val(); //取得
    s.emit("batsu:send", {value:msg}); //サーバへ送信
}

function update(type) {
    console.log(myBarChart.datasets[0]);
    if ( type === 'maru') {
        myBarChart.datasets[0].bars[0].value++;
    } else {
        myBarChart.datasets[0].bars[1].value++;
    } 
    myBarChart.update();
}

