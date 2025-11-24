# Blueprint: Voice Interface Integration

## 1. Overview
To enhance accessibility and provide a more natural brainstorming experience, we will integrate voice capabilities into the Chat Interface. This includes Speech-to-Text (STT) for input and Text-to-Speech (TTS) for reading AI responses.

## 2. User Experience
*   **Voice Input**: A microphone icon in the chat input area.
    *   Click to start recording.
    *   Visualizer/Waveform to show active listening.
    *   Click again to stop and transcribe.
    *   Auto-submit option (configurable).
*   **Voice Output**: A speaker icon next to AI messages.
    *   Click to read the message aloud.
    *   Stop/Pause controls.

## 3. Technical Strategy

### Phase 1: Browser Native (MVP)
*   **STT**: `window.SpeechRecognition` (Web Speech API).
    *   Pros: Free, no backend required, low latency.
    *   Cons: Browser support varies (Chrome/Safari good, others mixed), requires online connection.
*   **TTS**: `window.speechSynthesis`.
    *   Pros: Free, instant.
    *   Cons: Robotic voices, limited customization.

### Phase 2: Professional API (Future)
*   **STT**: OpenAI Whisper or Deepgram.
    *   Higher accuracy, handles accents/noise better.
*   **TTS**: ElevenLabs or OpenAI TTS.
    *   High-quality, natural-sounding voices.

## 4. Implementation Details (Phase 1)

### Components
1.  `VoiceInputButton`: Handles microphone permission, recording state, and transcription.
2.  `MessageReader`: Handles TTS playback for a specific message.

### State Management
*   Add `isRecording` and `isSpeaking` states to `BrainstormStore` (or a new `VoiceStore` if complex).

### Fallbacks
*   Gracefully hide voice controls if the browser API is not supported.

## 5. Tasks for Parallel Team
1.  Create `useSpeechRecognition` hook.
2.  Create `useSpeechSynthesis` hook.
3.  Build `VoiceInput` component in `@saasfly/ui`.
4.  Integrate into `ChatInterface`.
