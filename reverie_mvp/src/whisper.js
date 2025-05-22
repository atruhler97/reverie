
export async function sendToWhisper(audioBlob) {
  const apiKey = process.env.OPENAI_API_KEY;
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.webm");
  formData.append("model", "whisper-1");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: formData
  });

  const data = await response.json();
  return data.text || "No transcription available.";
}
