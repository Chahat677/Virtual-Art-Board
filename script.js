const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let painting = false;
let brushColor = document.getElementById("colorPicker").value;
let brushSize = document.getElementById("brushSize").value;

function startPosition(e) {
    painting = true;
    draw(e);
}


function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

document.getElementById("colorPicker").addEventListener("change", (e) => {
    brushColor = e.target.value;
});


document.getElementById("brushSize").addEventListener("change", (e) => {
    brushSize = e.target.value;
});


document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("saveBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
});
