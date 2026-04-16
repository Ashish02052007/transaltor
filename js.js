async function translateText() {
    const apiKey = document.getElementById("apiKey").value.trim();
    const region = document.getElementById("region").value.trim();
    const text = document.getElementById("inputText").value.trim();
    const targetLang = document.getElementById("targetLang").value;

    const output = document.getElementById("outputText");
    const loader = document.getElementById("loader");

    if (!apiKey || !region || !text) {
        output.innerText = "⚠️ Fill all fields!";
        return;
    }

    loader.classList.remove("hidden");
    output.innerText = "";

    const endpoint = `https://${region}.api.cognitive.microsoft.com/translate?api-version=3.0&to=${targetLang}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        if (!response.ok) {
            throw new Error("Invalid API Key or Region");
        }

        const data = await response.json();

        loader.classList.add("hidden");

        output.innerText = "✅ " + data[0].translations[0].text;

    } catch (error) {
        loader.classList.add("hidden");
        output.innerText = "❌ Error: " + error.message;
    }
}