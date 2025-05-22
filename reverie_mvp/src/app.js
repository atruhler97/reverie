
import { startRecording, stopRecording } from './recorder.js';
import { sendToWhisper } from './whisper.js';

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const transcriptDiv = document.getElementById('transcript');
const audioPlayback = document.getElementById('audioPlayback');

let mediaRecorder;
let audioChunks = [];

startBtn.onclick = async () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  const result = await startRecording();
  mediaRecorder = result.recorder;
  audioChunks = result.chunks;
};

stopBtn.onclick = async () => {
  stopBtn.disabled = true;
  const { audioBlob, audioUrl } = await stopRecording(mediaRecorder, audioChunks);
  startBtn.disabled = false;
  audioPlayback.src = audioUrl;
  const transcript = await sendToWhisper(audioBlob);
  transcriptDiv.innerText = transcript;
};
