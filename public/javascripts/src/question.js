var s = io.connect('http://localhost:2000'); 

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
//s.on("disconnect", function (client) {});  // 切断時

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
//s.on("disconnect", function (client) {});  // 切断時

//クライアントからイベント送信（イベント名は自由に設定できます）
function maru_batsu() {
    var msg = "maru_batsu"; //取得
    s.emit("maru_batsu", {value:msg}); //サーバへ送信
}          

s.on("question:send", function (data) {
    console.log(data.value);
    display(data.value);
});

function display(questionArray){
questionArray.forEach(function(text, i){
    console.log(text);
    $("div#question_text").append("<li><p>"+text+"</p></li>");
});
}

//クライアントから送信(テスト用)
function send2question() {
    var msg = "aaa" //取得
    s.emit("question:send", {value:msg}); //サーバへ送信
}          


