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
    addText(text,i); 
});

function addText(text, i) {
    if ( i%4 == 0) {
        $divRow       = $("<div>").addClass("row");
        $divPortfolio = $("<div>").addClass("col-md-3").addClass("portfolio-item");
        $divPortfolio.append($("<h4>").append(i)).append($("<p>").append(text));
        $divRow.append($divPortfolio);
        $("#portfolio").append($divRow);
    } else {
         $divPortfolio = $("<div>").addClass("col-md-3").addClass("portfolio-item");
        $divPortfolio.append($("<h4>").append(i)).append($("<p>").append(text));
        $("#portfolio div.row:last").append($divPortfolio);
    }
}

