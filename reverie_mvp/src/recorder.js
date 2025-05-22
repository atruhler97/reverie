
export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks = [];

  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) audioChunks.push(event.data);
  };

  mediaRecorder.start();
  return { recorder: mediaRecorder, chunks: audioChunks };
}

export async function stopRecording(mediaRecorder, audioChunks) {
  return new Promise(resolve => {
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      resolve({ audioBlob, audioUrl });
    };
    mediaRecorder.stop();
  });
}
