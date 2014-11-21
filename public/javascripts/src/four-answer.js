var ctx = document.getElementById("canvas").getContext("2d");
barChartData = {
        labels : ["A", "B", "C", "D"],
        datasets : [
        {
            fillColor : [
            "rgba(255,87,34,1)",
            "rgba(0,188,180,1)",
            "rgba(255,87,34,1)",
            "rgba(0,188,180,1)"
                ],
            strokeColor : "rgba(151,187,205,0.8)",
            data : [0, 0, 0, 0]
        }      
        ]  
    };

var myBarChart = new Chart(ctx).Bar(barChartData, {
    responsive: true,
    scaleFontSize: 24
 
});

var s = io.connect('http://localhost:2000'); 

s.emit("answer-type", {value:"abcd"}); 

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時

s.on("a:send", function (data) {
    update('a');
});
s.on("b:send", function (data) {
    update('b');
});
s.on("c:send", function (data) {
    update('c');
});
s.on("d:send", function (data) {
    update('d');
});

//クライアントからイベント送信（イベント名は自由に設定できます）
function send2choice_a() {
    var msg = $("#a").val(); //取得
    s.emit("a:send", {value:msg}); //サーバへ送信
}          

function send2choice_b() {
    var msg = $("#b").val(); //取得
    s.emit("b:send", {value:msg}); //サーバへ送信
}

function send2choice_c() {
    var msg = $("#c").val(); //取得
    s.emit("c:send", {value:msg}); //サーバへ送信
}          

function send2choice_d() {
    var msg = $("#d").val(); //取得
    s.emit("d:send", {value:msg}); //サーバへ送信
}

function update(type) {
    if ( type === 'a') {
        myBarChart.datasets[0].bars[0].value++;
    } else if (type == 'b'){
        myBarChart.datasets[0].bars[1].value++;
    } else if (type == 'c'){
        myBarChart.datasets[0].bars[2].value++;
    } else {
        myBarChart.datasets[0].bars[3].value++;
    } 
    myBarChart.update();
}

