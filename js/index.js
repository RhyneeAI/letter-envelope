document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("qrModal");
    const modalContent = modal.querySelector(".modal-content");
    
    function showModal() {
        modal.style.display = "flex";
        modalContent.style.animation = "slideUp 0.3s ease forwards";
    }
    
    function hideModal() {
        modalContent.style.animation = "slideDown 0.2s ease forwards";
        modal.style.animation = "fadeOut 0.2s ease forwards";
        setTimeout(() => {
            modal.style.display = "none";
        }, 200);
    }

    document.getElementById('close-btn').addEventListener('click', () => {
        hideModal()
        
        setTimeout(() => {
            window.location.reload()
        }, 500);
    })

    document.getElementById("submit-btn").addEventListener("click", () => {
        showModal()
        const pengirim = document.getElementById("pengirim").value;
        const penerima = document.getElementById("penerima").value;
        const body = document.getElementById("body").value;

        const json = JSON.stringify({ pengirim, penerima, body });
        const encoded = encodeURIComponent(json);
        const fullUrl = `https://rhyneeai.github.io/letter-envelope/envelope.html?data=${encoded}`;

        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = ""; 

        const qr = new QRCode(qrContainer, {
            text: fullUrl,
            width: 256,
            height: 256,
            correctLevel: QRCode.CorrectLevel.H
        });

        document.getElementById("qrModal").style.display = "flex";

        document.getElementById("download-btn").onclick = () => {
            const img = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");
            let dataUrl;

            if (img.tagName.toLowerCase() === "img") {
                dataUrl = img.src;
            } else {
                dataUrl = img.toDataURL("image/png");
            }

            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "letter_qrcode.png";
            a.click();
        };
    });
});


