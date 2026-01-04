import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";
import { useTextReader } from "../hooks/useTextReader";
import {
  Terminal,
  Radio,
  Activity,
  ChevronRight,
  ChevronLeft,
  Cpu,
  Zap,
  Shield,
  ExternalLink,
  Loader2,
  Pause,
  Play,
} from "lucide-react";
import { ParticleCanvas } from "./ParticleCanvas";
import styles from "./NewsConsole.module.css";

const topics = [
  { id: "gen-ai", label: "Generative AI", icon: <Zap size={18} /> },
  { id: "robotics", label: "Robotics", icon: <Cpu size={18} /> },
  { id: "ai-ethics", label: "AI Ethics", icon: <Shield size={18} /> },
];

interface Source {
  uri: string;
  title: string;
}

const NewsConsole: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState(topics[0]);
  const [newsItems, setNewsItems] = useState<string[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { speak, pause, resume, cancel, isSpeaking, isPaused } = useTextReader();

  const fetchNews = useCallback(async (topicLabel: string) => {
    setIsLoading(true);
    setIsError(false);
    setNewsItems([]);
    setSources([]);
    setCurrentIndex(0);

    // Mock data fallback for when API quota is exceeded
    const mockNewsData: Record<string, { items: string[], sources: Source[] }> = {
      "Generative AI": {
        items: [
          "OpenAI announces GPT-5 with enhanced reasoning capabilities and multimodal understanding. The new model demonstrates significant improvements in complex problem-solving and creative tasks.",
          "Google DeepMind unveils breakthrough in protein structure prediction using AI. The technology promises to accelerate drug discovery and personalized medicine development.",
          "Major tech companies form alliance for responsible AI development. The coalition focuses on safety standards, ethical guidelines, and transparent deployment of generative AI systems."
        ],
        sources: [
          { uri: "https://example.com/ai-news-1", title: "AI Research Quarterly" },
          { uri: "https://example.com/ai-news-2", title: "Tech Innovation Today" }
        ]
      },
      "Robotics": {
        items: [
          "Tesla's Optimus robot demonstrates advanced dexterity in factory settings. The humanoid robot successfully completed complex assembly tasks with minimal human supervision.",
          "Boston Dynamics releases Atlas 2.0 with enhanced mobility and AI integration. The robot showcases unprecedented agility and real-time decision-making capabilities.",
          "Collaborative robots revolutionize manufacturing with adaptive learning. New cobots use machine learning to optimize workflow and improve worker safety across industries."
        ],
        sources: [
          { uri: "https://example.com/robotics-1", title: "Robotics Weekly" },
          { uri: "https://example.com/robotics-2", title: "Automation Insider" }
        ]
      },
      "AI Ethics": {
        items: [
          "EU AI Act enters enforcement phase with strict compliance requirements. Companies must now ensure transparency, accountability, and human oversight in AI systems.",
          "Research reveals bias in facial recognition systems across demographic groups. Study calls for improved training data and algorithmic fairness in AI deployment.",
          "Global summit establishes framework for AI safety and governance. International experts agree on principles for ethical AI development and responsible innovation."
        ],
        sources: [
          { uri: "https://example.com/ethics-1", title: "AI Policy Journal" },
          { uri: "https://example.com/ethics-2", title: "Tech Ethics Review" }
        ]
      }
    };

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Find the latest breaking news about ${topicLabel}. Provide 3 distinct, concise summaries of the most important recent developments. Each summary must be 2-3 sentences long maximum. Separate each summary with the string "|||". Do not use markdown formatting, bullet points, or numbering. Just the raw text separated by the delimiter.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const items = text
        .split("|||")
        .map((s) => s.trim())
        .filter((s) => s.length > 10);

      if (items.length === 0) {
        throw new Error("No items returned from API");
      }

      setNewsItems(items);

      const chunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedSources = chunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title) as Source[];

      const uniqueSources = extractedSources
        .filter(
          (source, index, self) =>
            index === self.findIndex((t) => t.uri === source.uri)
        )
        .slice(0, 3);

      setSources(uniqueSources);
    } catch (error) {
      console.warn("API unavailable, using mock data:", error);

      // Use mock data based on topic
      const mockData = mockNewsData[topicLabel] || {
        items: [
          "Demo Mode: Live API quota exceeded. Displaying sample content.",
          "This is mock data for demonstration purposes.",
          "Switch topics to see different sample news items."
        ],
        sources: []
      };

      setNewsItems(mockData.items);
      setSources(mockData.sources);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(currentTopic.label);
  }, [currentTopic, fetchNews]);

  const handleNext = useCallback(() => {
    setNewsItems((currentItems) => {
      if (currentItems.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % currentItems.length);
      }
      return currentItems;
    });
  }, []);

  useEffect(() => {
    if (!isLoading && newsItems.length > 0) {
      speak(newsItems[currentIndex], handleNext);
    } else {
      cancel();
    }
  }, [currentIndex, isLoading, newsItems, speak, handleNext, cancel]);

  const handleManualNext = () => {
    handleNext();
  };

  const handlePrevious = () => {
    if (newsItems.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + newsItems.length) % newsItems.length
      );
    }
  };

  const togglePause = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  return (
    <section className={styles.section}>
      <ParticleCanvas className="absolute inset-0 opacity-40" />
      <div className="container">
        <div className={styles.console}>
          <div className={styles.glowBorder}></div>

          <div className={styles.consoleFrame}>
            {/* Header Bar */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <Terminal size={20} className={styles.terminalIcon} />
                <span className={styles.headerTitle}>
                  NET_WATCH // V.2.0.4
                </span>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.liveIndicator}>
                  <Activity size={16} className={styles.liveIcon} />
                  <span className={styles.liveText}>LIVE</span>
                </div>
                <div className={styles.time}>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Main Display Area */}
            <div className={styles.displayArea}>
              <div className={styles.scanline}></div>

              <div className={styles.content}>
                {isLoading ? (
                  <div className={styles.loading}>
                    <Loader2 className={styles.loadingSpinner} size={32} />
                    <span className={styles.loadingText}>
                      ESTABLISHING UPLINK...
                    </span>
                  </div>
                ) : (
                  <div className={styles.newsContent} key={currentIndex}>
                    <h3 className={styles.newsHeader}>
                      Incoming Transmission [{currentIndex + 1}/{newsItems.length}]
                    </h3>
                    <p className={styles.newsText}>{newsItems[currentIndex]}</p>

                    {sources.length > 0 && (
                      <div className={styles.sources}>
                        <span className={styles.sourceLabel}>Source:</span>
                        {sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.sourceLink}
                          >
                            <ExternalLink size={12} />
                            {source.title.length > 25
                              ? source.title.substring(0, 25) + "..."
                              : source.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Controls Footer */}
            <div className={styles.controls}>
              <div className={styles.topics}>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setCurrentTopic(topic)}
                    className={`${styles.topicButton} ${currentTopic.id === topic.id ? styles.topicActive : ""
                      }`}
                  >
                    {topic.icon}
                    {topic.label}
                  </button>
                ))}
              </div>

              <div className={styles.navigation}>
                <button
                  onClick={handlePrevious}
                  disabled={isLoading || newsItems.length <= 1}
                  className={styles.navButton}
                  title="Previous"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={togglePause}
                  disabled={isLoading || newsItems.length <= 1}
                  className={`${styles.navButton} ${isPaused
                    ? `${styles.pauseButton} ${styles.pauseButtonPaused}`
                    : styles.pauseButton
                    }`}
                  title={isPaused ? "Resume" : "Pause"}
                >
                  {isPaused ? (
                    <Play size={24} className="fill-current ml-1" />
                  ) : (
                    <Pause size={24} className="fill-current" />
                  )}
                </button>

                <button
                  onClick={handleManualNext}
                  disabled={isLoading || newsItems.length <= 1}
                  className={styles.navButton}
                  title="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsConsole;
