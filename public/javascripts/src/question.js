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

$question_text = $("#question_text");
s.on("question:send", function (data) {
    $question_text.append($("<li>").append(data.value));
});

/*クライアントから送信(テスト用)
function test() {
    s.emit("question:send", {value: "hogehogehoge"}); //サーバへ送信
} 
*/

var isOpen = false;
$toggle = $("#menu-toggle");
function toggle() {
    isOpen = !isOpen;
    if (isOpen) {
        $toggle.html("Open");
    } else {
        $toggle.html("Close");
    }
}
