const canvas = document.getElementById("bannerCanvas");
const ctx = canvas.getContext("2d");

let background = new Image();
let logo = new Image();
logo.src = "logo.png"; // circular company/trolley logo
let currentTemplate = "banner1.jpg";
let selectedBanner = document.querySelector(".banner-thumb.selected");
const largePreview = document.getElementById("largePreview");

// Load default banner
loadBackground(currentTemplate);

// Banner selection
function selectBanner(element, template) {
    if(selectedBanner) selectedBanner.classList.remove("selected");
    element.classList.add("selected");
    selectedBanner = element;

    currentTemplate = template;
    largePreview.src = template;
    loadBackground(currentTemplate);
}

// Load banner into canvas
function loadBackground(template) {
    background.src = template;
    background.onload = function () {
        drawCanvas(""); // empty name initially
    };
}

// Draw banner on canvas with circular logo
function drawCanvas(name) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw circular logo
    const logoX = canvas.width - 100; // center X
    const logoY = canvas.height - 50; // center Y
    const logoRadius = 40;

    ctx.save();
    ctx.beginPath();
    ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(logo, logoX - logoRadius, logoY - logoRadius, logoRadius*2, logoRadius*2);
    ctx.restore();

    // Draw user name if entered
    if(name){
        ctx.font = "bold 60px 'Times New Roman'";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(name, canvas.width / 2, 500);
        ctx.shadowColor = "transparent";
    }
}

// Generate banner
function generateBanner() {
    const name = document.getElementById("username").value;
    drawCanvas(name);

    // Update large preview with name
    largePreview.src = canvas.toDataURL("image/jpeg", 0.9);
}

// Download JPEG
function downloadBanner() {
    const link = document.createElement('a');
    link.download = "banner.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
}
