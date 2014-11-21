var s = io.connect('http://localhost:2000'); 

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
//s.on("disconnect", function (client) {});  // 切断時

//クライアントからイベント送信（イベント名は自由に設定できます）
/*残骸
function maru_batsu() {
    var msg = "maru_batsu"; //取得
    s.emit("maru_batsu", {value:msg}); //サーバへ送信
}          
*/

function getQuestionLength(){
    var i=0; 
    while(getQuestions(i)!==null){++i;} return i;}

function getQuestions(i){return localStorage.getItem("question"+i); }

$question_text = $("#question_text");

for(var j = 0; j < getQuestionLength(); j++){
    $question_text.append($("<li>").append(getQuestions(j)));
}

s.on("question:send", function (data) {
    i = getQuestionLength();
    localStorage.setItem("question"+i,data.value);
    $question_text.append($("<li>").append(data.value));
});

/*クライアントから送信(テスト用)
function test() {
    s.emit("question:send", {value: "hogehogehoge"}); //サーバへ送信
} 
*/

//ローカルストレージをからっぽくするの。
function resetLocalStorage()
{
    console.log("clear LocalStorage");
    localStorage.clear();//バルス
}

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
