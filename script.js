let words = [];
let originalWord = "";
let encryptedWord = "";
let key = 0;

// JSON laden
fetch("words.json")
    .then(response => response.json())
    .then(data => {
        words = data;
        newWord();
    })
    .catch(error => console.error("Fehler beim Laden der Wörter:", error));

// Cäsar-Verschlüsselung
function caesarEncrypt(word, shift) {
    return word.split("").map(char => {
        let code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) { // Kleinbuchstaben a-z
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char;
    }).join("");
}

// Neues Wort generieren
function newWord() {
    originalWord = words[Math.floor(Math.random() * words.length)];
    key = Math.floor(Math.random() * 25) + 1; // Schlüssel zwischen 1 und 25
    encryptedWord = caesarEncrypt(originalWord, key);

    document.getElementById("encryptedWord").textContent = encryptedWord;
    document.getElementById("key").textContent = key;
    document.getElementById("feedback").textContent = "";
    document.getElementById("userGuess").value = "";
}

// Überprüfen
document.getElementById("checkBtn").addEventListener("click", () => {
    const guess = document.getElementById("userGuess").trim().toLowerCase();
    if (guess === originalWord) {
        document.getElementById("feedback").textContent = "✅ Richtig!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").textContent = "❌ Falsch! Richtige Antwort: " + originalWord;
        document.getElementById("feedback").style.color = "red";
    }
});

// Neues Wort Button
document.getElementById("newWordBtn").addEventListener("click", newWord);
