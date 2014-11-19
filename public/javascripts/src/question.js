//var s = io.connect('http://192.168.100.23:2000'); 

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
//s.on("disconnect", function (client) {});  // 切断時

//クライアントからイベント送信（イベント名は自由に設定できます）
function test() {
    var msg = "test"; //取得
    s.emit("maru_batsu", {value:msg}); //サーバへ送信
}          
//var s = io.connect('http://192.168.100.23:2000'); 

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
//s.on("disconnect", function (client) {});  // 切断時

//クライアントからイベント送信（イベント名は自由に設定できます）
function maru_batsu() {
    var msg = "maru_batsu"; //取得
    s.emit("maru_batsu", {value:msg}); //サーバへ送信
}          

