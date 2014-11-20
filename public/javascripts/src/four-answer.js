var a;
var b;
var c;
var d;

var s = io.connect('http://localhost:2000'); 

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時

s.on("a:send", function (data) {
    a = data.value;
    console.log(a);
    render();
});
s.on("b:send", function (data) {
    b = data.value;
    console.log(b);
    render();
});
s.on("c:send", function (data) {
    c = data.value;
    console.log(c);
    render();
});
s.on("d:send", function (data) {
    d = data.value;
    console.log(d);
    render();
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

var barChartData;

render();

function setdata(){
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
            data : [a, b, c, d]
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
