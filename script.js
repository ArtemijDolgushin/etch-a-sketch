const container = document.querySelector(".container");
const remakeButton = document.querySelector(".remakeButton");
const resetButton = document.querySelector(".resetButton");

remakeButton.addEventListener("click", remakeSketchField);
resetButton.addEventListener("click", resetSketchField);
function createPen(){
    container.addEventListener("mouseover", (e) => {
        const target = e.target;
        if (target.id==="item") {
            const color = getColor();
            switch (color) {
                case 'blackPen':
                    blackPen(target);
                    break;
                case 'whitePen':
                    whitePen(target);
                    break;
                case 'randomPen':
                    randomPen(target);
                    break;
                case 'darkenPen':
                    darkenPen(target, /\d+.\d+/);
                    break;
                case 'lightenPen':
                    lightenPen(target, /\d+.\d+/);
                    break;
            }
        }
    });
}

function remakeSketchField(){
    const number = getDimension();
    const itemList = document.querySelectorAll(".item");
    const itemNumber = itemList.length;
    for (let i=0;i<itemNumber;i++) container.removeChild(container.lastChild);
    createSketchField(number);
}
function resetSketchField(){
    const itemList = document.querySelectorAll(".item");
    const itemNumber = itemList.length;
    for (let i=0;i<itemNumber;i++) container.removeChild(container.lastChild);
    createSketchField(Math.sqrt(itemNumber));
}
function getDimension(){
    let dimension=0;
    for (;;){
        dimension= +window.prompt("Please specify the dimension of the sketch field (max. 100)", "");
        if (dimension<101) break;
        alert("The maximum size of dimension is 100");
    }
    return dimension;
}

function createSketchField(number) {
    for (let i = 0; i < Math.pow(number, 2); i++) {
        const item = document.createElement("div");
        item.setAttribute("class", "item");
        item.setAttribute("id", "item");
        item.style["backgroundColor"] = `#FFFFFF`;
        item.style["filter"] = "brightness(1.01)";
        container.append(item);
    }
    container.style.gridTemplateColumns = `repeat(${number}, auto)`;
}


createSketchField(16);

function blackPen (target){
    target.style["backgroundColor"] = `#FFFFFF`;
    target.style["filter"] = "brightness(0.01)";
}
function whitePen (target){
    target.style["backgroundColor"] = `#FFFFFF`;
    target.style["filter"] = "brightness(1.01)";
}
function randomPen (target){
    target.style["backgroundColor"]=`#${Math.floor(Math.random()*16777215).toString(16)}`;
    target.style["filter"] = "brightness(1.01)";
}
function darkenPen (target, regex){
    let filter = target.style["filter"];
    let amount = +filter.match(regex)[0];
    amount-= 0.1;
    target.style["filter"] = `brightness(${amount})`;
}
function lightenPen (target, regex){
    if ((target.style["backgroundColor"]!=="rgb(255, 255, 255)")||(target.style["filter"] !== "brightness(1.01)")){
    let filter = target.style["filter"];
    let amount = +filter.match(regex)[0];
    amount+= 0.1;
    target.style["filter"] = `brightness(${amount})`;
    }
}
function getColor(){
    return document.querySelector('input[name="penList"]:checked').value;
}

createPen();

