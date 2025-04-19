document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("qrModal");
    const modalContent = modal.querySelector(".modal-content");
    const qrContainer = document.getElementById("qrcode");
    const qrDownload = document.getElementById("qrcode-download");
    const downloadBtn = document.getElementById("download-btn");
    let currentPenerima = "";

    modal.style.display = "none";

    function showModal() {
        modal.style.opacity = 0;
        modal.style.display = "flex";

        requestAnimationFrame(() => {
            modal.style.animation = "fadeIn 0.3s ease forwards";
            modalContent.style.animation = "slideUp 0.3s ease forwards";
        });
    }

    function hideModal() {
        modalContent.style.animation = "slideDown 0.2s ease forwards";
        modal.style.animation = "fadeOut 0.2s ease forwards";
        setTimeout(() => {
            modal.style.display = "none";
            modal.style.animation = "";
            modalContent.style.animation = "";
        }, 200);
    }

    document.getElementById('close-btn').addEventListener('click', () => {
        qrContainer.innerHTML = "";
        hideModal();
    });

    document.getElementById("submit-btn").addEventListener("click", () => {
        const pengirim = document.getElementById("pengirim").value;
        const penerima = document.getElementById("penerima").value;
        const body = document.getElementById("body").value;

        if (!pengirim || !penerima || !body) {
            alert("Lengkapi semua kolom terlebih dahulu.");
            return;
        }

        const json = JSON.stringify({ pengirim, penerima, body });
        const encoded = encodeURIComponent(json);
        const fullUrl = `https://rhyneeai.github.io/letter-envelope/envelope.html?data=${encoded}`;

        currentPenerima = penerima;
        qrContainer.innerHTML = "";
        qrDownload.innerHTML = "";

        showModal();

        setTimeout(() => {
            new QRCode(qrContainer, {
                text: fullUrl,
                width: 256, 
                height: 256,
                correctLevel: QRCode.CorrectLevel.H
            });

        }, 300); 
        
        setTimeout(() => {
            new QRCode(qrDownload, {
                text: fullUrl,
                width: 384, 
                height: 384,
                correctLevel: QRCode.CorrectLevel.H
            });
        }, 300); 
    });

    downloadBtn.addEventListener("click", () => {
        const img = qrDownload.querySelector("img") || qrDownload.querySelector("canvas");
        if (!img) {
            alert("QR Code belum siap. Coba lagi sebentar.");
            return;
        }

        img.style.padding = "20px"
        let dataUrl = (img.tagName.toLowerCase() === "img") ? img.src : img.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "Sylph.art - " + currentPenerima + ".png";
        a.click();
    });
});
