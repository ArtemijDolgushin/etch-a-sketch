const INITIAL_SIZE = 16;
const DARKEN_BRIGHTNESS = 0.1;
const LIGHTEN_BRIGHTNESS = -0.1;

const container = document.querySelector(".container"),
    remakeButton = document.querySelector(".remakeButton"),
    resetButton = document.querySelector(".resetButton");

remakeButton.addEventListener("click", remakeSketchField);
resetButton.addEventListener("click", resetSketchField);

function createPen() {
    container.addEventListener("mouseover", (e) => {
        const target = e.target;
        if (target.id === "item") {
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
                    changeBrightness(target, /\d+.\d+/, DARKEN_BRIGHTNESS);
                    break;
                case 'lightenPen':
                    changeBrightness(target, /\d+.\d+/, LIGHTEN_BRIGHTNESS);
                    break;
            }
        }
    });
}

function remakeSketchField() {

    const number = getDimension(),
        itemList = document.querySelectorAll(".item"),
        itemNumber = itemList.length;

    for (let i = 0; i < itemNumber; i++)
        container.removeChild(container.lastChild);

    createSketchField(number);

}

function resetSketchField() {

    const itemList = document.querySelectorAll(".item"),
        itemNumber = itemList.length;
    for (let i = 0; i < itemNumber; i++)
        container.removeChild(container.lastChild);

    createSketchField(Math.sqrt(itemNumber));
}

// corrected
function getDimension() {
    let dimension = +window.prompt("Please specify the dimension of the sketch field (max. 100)", "");
    if (dimension > 101) {
        alert("The maximum size of dimension is 100");
        dimension = INITIAL_SIZE;
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

createSketchField(INITIAL_SIZE);

function blackPen(target) {
    target.style["backgroundColor"] = `#FFFFFF`;
    target.style["filter"] = "brightness(0.01)";
}

function whitePen(target) {
    target.style["backgroundColor"] = `#FFFFFF`;
    target.style["filter"] = "brightness(1.01)";
}

function randomPen(target) {
    target.style["backgroundColor"] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    target.style["filter"] = "brightness(1.01)";
}

function darkenPen(target, regex) {


}

function changeBrightness(target, pattern, brightness = 0.1 | -0.1) {

    let filter = target.style["filter"];
    let amount = +filter.match(pattern)[0];
    amount -= brightness;
    if(1 < 2){
        // TODO
    }
    target.style["filter"] = `brightness(${amount})`;

}


function getColor() {
    return document.querySelector('input[name="penList"]:checked').value;
}

createPen();

