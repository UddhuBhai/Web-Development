const qrInput = document.getElementById("qrInput");
const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrContainer");
const downloadBtn = document.getElementById("downloadBtn");

let qrImageURL = "";

generateBtn.addEventListener("click", generateQR);

qrInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        generateQR();
    }
});

downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.href = qrImageURL;
    link.download = `artifact-${Date.now()}.png`;

    link.click();

});

async function generateQR() {

    const text = qrInput.value.trim();

    if (text === "") {
        alert("Please enter a command.");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "⚔ EXTRACTING...";

    qrContainer.innerHTML = `
        <div class="loading">
            Extracting Artifact...
        </div>
    `;

    try {

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        qrImageURL = data.qr;

        qrContainer.innerHTML = `
            <div class="summon">
                <img src="${qrImageURL}" alt="Generated QR Code">
            </div>
        `;

        downloadBtn.style.display = "block";

    } catch (error) {

        qrContainer.innerHTML = `
            <p style="color:#ff6b6b;">
                Artifact Extraction Failed.
            </p>
        `;

        console.error(error);

    } finally {

        generateBtn.disabled = false;
        generateBtn.textContent = "⚔ ARISE";

    }

}