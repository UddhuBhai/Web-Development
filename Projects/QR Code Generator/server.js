const express = require("express");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate", async (req, res) => {

    try {

        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "No command provided."
            });
        }

        const qrImage = await QRCode.toDataURL(text);

        res.json({
            success: true,
            qr: qrImage
        });

    } catch (error) {

        console.error("❌ QR Generation Error:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Artifact Extraction Failed."
        });

    }

});

app.listen(PORT, () => {
    console.log("⚔️ SYSTEM ONLINE");
    console.log(`🚪 Listening at http://localhost:${PORT}`);
});