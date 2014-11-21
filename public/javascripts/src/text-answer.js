
var texts = [
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。",
    "私の名前は塚本だ。どわっはっはっはっはっはっはっはっはっは。"
];
texts.forEach(function(text,i) {
    addText(text, i);
});



var i = 1;

var s = io.connect('http://localhost:2000');

s.emit("answer-type", {value:"text"}); 

s.on("connect", function() {});
s.on("disconnect", function() {});
s.on("text:send", function(data) {
    addText(data.value,i); 
    i++;
});


function addText(text, i) {
    console.log(i);
    if ( (i-1)%4 == 0) {
        $divRow       = $("<div>").addClass("row");
        $divPortfolio = $("<div>").addClass("col-md-3").addClass("portfolio-item").css("padding", "0px");
        $divInside    = $("<div>").css("border", "1px solid #000").css("padding-left", "15px");
        $divPortfolio.append($divInside);
        $divInside.append($("<h4>").append(i)).append($("<p>").append(text));
        $divRow.append($divPortfolio);
        $("#portfolio").append($divRow);
    } else {
        $divPortfolio = $("<div>").addClass("col-md-3").addClass("portfolio-item").css("padding", "0px");
        $divInside    = $("<div>").css("border", "1px solid #000")
                                  .css("padding-left", "15px").css("margin-left", "15px");
        $divPortfolio.append($divInside);
        $divInside.append($("<h4>").append(i)).append($("<p>").append(text));
        $("#portfolio div.row:last").append($divPortfolio);
    }
}

