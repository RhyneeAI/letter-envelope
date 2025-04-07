document.getElementById("submit-btn").addEventListener("click", () => {
    const pengirim = document.getElementById("pengirim").value;
    const penerima = document.getElementById("penerima").value;
    const body = document.getElementById("body").value;

    document.cookie = `letterData=${JSON.stringify({ pengirim, penerima, body })}; path=/; max-age=86400`; 
    window.location.href = 'envelope.html';
});
