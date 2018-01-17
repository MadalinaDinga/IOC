var selected = null;
var pics = new Array(0);
function goBack(){
    location.href="natura.html";
}
function startNewGame(){
    location.reload();
}
function loadPuzzle() {
    pics = new Array(11);
    for(i=1; i<10; i++) {
        gasit = true;
        while (gasit==true) {
            x = 1 + Math.floor(Math.random() * 1000) % 9;
            gasit = false;
            for (j=1; j<i; j++)
                if (pics[j]==x) gasit = true;
        }
        pics[i] = x;
    }

    var cell;
    for(i=1; i<10; i++) {
        cell = document.getElementById(i);
        if (cell) {
            img = document.createElement("img");
            img.setAttribute("src", "resources/ti"+pics[i]+".jpg");
            cell.appendChild(img);
        }
    }
}

function select(cellID, cell) {
    // console.log("this=",this," cell=",cell);
    if (!selected) {
        selected = cellID
        console.log("select=",selected)
        cell.firstChild.setAttribute("class", "selected")
        return;
    }
    if (selected == cellID) {
        cell.firstChild.setAttribute("class", "");
        selected = null;
        return;
    }
    cell1 = document.getElementById(selected);
    img1 = cell1.firstChild;
    img = cell.firstChild;
    cell.removeChild(cell.firstChild);
    cell1.removeChild(cell1.firstChild);
    cell.appendChild(img1);
    cell1.appendChild(img);
    img1.setAttribute("class", "");
    selected = null;
    if (isSolved()) {
        setInterval(alert("FELICITĂRI!"), 2000)

    }
}

function isSolved() {
    var re = new RegExp("ti([0-9]+)\.jpg");
    console.log(re);
    for (i=1; i<10; ++i) {
        src = document.getElementById(i).firstChild.getAttribute("src");
        console.log("i=", i, "src=", src)
        if (re.exec(src)[1] != i)
            return false;
    }
    return true;
}
