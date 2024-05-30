document.addEventListener('DOMContentLoaded', function() {
  const text = document.getElementById('text');
  const voiceSelect = document.getElementById('voice');
  const synth = window.speechSynthesis;
  let voices = [];
  let replayInterval;
  let isReplaying = false;

  function populateVoiceList() {
      voices = synth.getVoices();
      voiceSelect.innerHTML = '';
      voices.forEach((voice, i) => {
          if (voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')) {
              const option = document.createElement('option');
              option.value = i;
              option.innerHTML = `${voice.name} (${voice.lang})`;
              voiceSelect.appendChild(option);
          }
      });

      // Load the last selected voice from localStorage
      const savedVoiceIndex = localStorage.getItem('selectedVoiceIndex');
      if (savedVoiceIndex !== null && voices[savedVoiceIndex]) {
          voiceSelect.value = savedVoiceIndex;
      }
  }

  function speak() {
      if (synth.speaking) {
          console.error('SpeechSynthesisUtterance instance is already speaking.');
          return;
      }
      if (text.value !== '') {
          const utterThis = new SpeechSynthesisUtterance(text.value);
          utterThis.voice = voices[voiceSelect.value];
          synth.speak(utterThis);
      }
  }

  function stopSpeech() {
      if (synth.speaking) {
          synth.cancel();
      }
      if (isReplaying) {
          clearInterval(replayInterval);
          isReplaying = false;
      }
  }

  function replay() {
      if (isReplaying) {
          console.error('Replay is already in progress.');
          return;
      }
      isReplaying = true;
      replayInterval = setInterval(() => {
          if (!synth.speaking && text.value !== '') {
              speak();
          }
      }, 5000); // Replay every 5 seconds
  }

  // Event listeners
  document.querySelector('.speak-btn').addEventListener('click', speak);
  document.querySelector('.stop-btn').addEventListener('click', stopSpeech);
  document.querySelector('.replay-btn').addEventListener('click', replay);

  // Save the selected voice to localStorage
  voiceSelect.addEventListener('change', () => {
      localStorage.setItem('selectedVoiceIndex', voiceSelect.value);
  });

  populateVoiceList();
  if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
  }
});

