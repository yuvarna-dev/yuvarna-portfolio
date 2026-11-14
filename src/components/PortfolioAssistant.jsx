
import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Mic,
  Volume2
} from "lucide-react";

import "./PortfolioAssistant.css";

// Connect to backend
const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/chat"
  : import.meta.env.VITE_API_URL;

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! Welcome to Yuvarna's portfolio. I'm your AI assistant. Ask me anything about her skills, projects, education or experience!"
    }
  ]);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

// NATURAL FEMALE VOICE ASSISTANT
const speak = (text) => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  // Remove Markdown and formatting symbols
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/#{1,6}\s?/g, "")
    .replace(/[`~]/g, "")
    .replace(/^\s*[-•]\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  const voices = window.speechSynthesis.getVoices();

  const femaleVoice =
    voices.find((voice) =>
      /heera|zira|samantha|neerja|priya|female/i.test(
        voice.name
      )
    ) ||
    voices.find((voice) =>
      voice.lang.toLowerCase() === "en-in"
    ) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("en")
    );

  const speech = new SpeechSynthesisUtterance(cleanText);

  if (femaleVoice) {
    speech.voice = femaleVoice;
  }

  speech.lang = femaleVoice?.lang || "en-IN";
  speech.rate = 0.88;
  speech.pitch = 1.12;
  speech.volume = 1;

  speech.onstart = () => {
  setSpeaking(true);
  window.dispatchEvent(
    new CustomEvent("avatar-speaking", {
      detail: { speaking: true }
    })
  );
};

const stopAvatar = () => {
  setSpeaking(false);
  window.dispatchEvent(
    new CustomEvent("avatar-speaking", {
      detail: { speaking: false }
    })
  );
};

speech.onend = stopAvatar;
speech.onerror = stopAvatar;

  window.speechSynthesis.speak(speech);
};


  // SEND MESSAGE TO GEMINI AI
  const sendMessage = async (e) => {
    e?.preventDefault();

    const question = message.trim();

    if (!question || loading) return;

    setMessage("");
    setLoading(true);

    // Add visitor message
    setMessages((previous) => [
      ...previous,
      {
        from: "user",
        text: question
      }
    ]);

    try {
      // Prepare conversation history
      const history = messages
        .filter((item) => item.from !== "system")
        .slice(-8)
        .map((item) => ({
          role: item.from === "bot" ? "model" : "user",
          text: item.text
        }));

      // Connect to backend
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          history
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to get AI response."
        );
      }

      const answer = data.reply;

      // Display Gemini response
      setMessages((previous) => [
        ...previous,
        {
          from: "bot",
          text: answer
        }
      ]);

      // Speak AI response
      speak(answer);

    } catch (error) {
      console.error("AI Assistant Error:", error);

      const errorMessage =
        "Sorry! I'm unable to connect to the AI assistant right now. Please try again.";

      setMessages((previous) => [
        ...previous,
        {
          from: "bot",
          text: errorMessage
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  // VOICE INPUT
  const startListening = () => {
    if (loading) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0].transcript;

      setMessage(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Voice input failed. Please try again.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // STOP SPEAKING
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  return (
    <>
      {/* CHAT LAUNCHER */}
      <button
        className="assistant-launcher"
        onClick={() => setOpen(!open)}
        aria-label="Open portfolio assistant"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div className="assistant-window">

          {/* HEADER */}
          <div className="assistant-header">
            <div>
              <strong>Yuvarna's AI Assistant</strong>

              <p>
                {loading
                  ? "Thinking..."
                  : speaking
                  ? "Speaking..."
                  : "AI Portfolio Assistant"}
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <X />
            </button>
          </div>

          {/* CHAT MESSAGES */}
          <div className="assistant-messages">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`assistant-message ${item.from}`}
              >
                {item.text}

                {item.from === "bot" && (
                  <button
                    className="speak-button"
                    onClick={() => speak(item.text)}
                    aria-label="Speak response"
                  >
                    <Volume2 size={15} />
                  </button>
                )}
              </div>
            ))}

            {/* LOADING INDICATOR */}
            {loading && (
              <div className="assistant-message bot">
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* INPUT AREA */}
          <form
            className="assistant-input"
            onSubmit={sendMessage}
          >
            <button
              type="button"
              onClick={startListening}
              title="Speak your question"
              disabled={loading}
            >
              <Mic size={19} />
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about Yuvarna..."
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              <Send size={19} />
            </button>
          </form>

          {speaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="speak-button"
            >
              Stop speaking
            </button>
          )}

        </div>
      )}
    </>
  );
}
