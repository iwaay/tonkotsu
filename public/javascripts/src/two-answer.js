var maru = 0;
var batsu = 0;

var s = io.connect('http://localhost:2000'); 

render();

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時
s.on("maru:send", function (data) {
    maru = data.value;
    console.log(maru);
    render();
});
s.on("batsu:send", function (data) {
    batsu = data.value;
    console.log(batsu);
    render();
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


var barChartData;

function setdata(){
    barChartData = {
        labels : ["○","×"],
        datasets : [
        {
            fillColor : [
                "rgba(255,87,34,1)",
            "rgba(0,188,180,1)",
            ],
            strokeColor : "rgba(151,187,205,0.8)",
           data : [maru, batsu]
           // data : [100, 50]
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




