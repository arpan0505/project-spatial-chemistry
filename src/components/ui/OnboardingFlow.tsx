// ============================================================
// OnboardingFlow — Multi-step form to create thought nodes
// ============================================================

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODE_VISUAL_MAP, NodeType } from '@/types';
import { useSpaceStore } from '@/stores/spaceStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  placeholder: string;
  category: NodeType;
  icon: string;
}

const questions: Question[] = [
  {
    id: 'q1',
    text: "What's something you could talk about for hours?",
    placeholder: 'e.g., The future of space exploration, music production...',
    category: 'interest',
    icon: '◉',
  },
  {
    id: 'q2',
    text: "What's a belief that shapes how you see the world?",
    placeholder: 'e.g., Everyone has a unique story worth hearing...',
    category: 'belief',
    icon: '◆',
  },
  {
    id: 'q3',
    text: "What's a goal you're working toward right now?",
    placeholder: 'e.g., Learning a new language, starting a podcast...',
    category: 'goal',
    icon: '▲',
  },
  {
    id: 'q4',
    text: "Describe a memory that changed you.",
    placeholder: 'e.g., The first time I saw the ocean...',
    category: 'memory',
    icon: '○',
  },
  {
    id: 'q5',
    text: "What value do you hold most sacred?",
    placeholder: 'e.g., Honesty, creativity, compassion...',
    category: 'value',
    icon: '⬟',
  },
  {
    id: 'q6',
    text: "What's another passion or fascination of yours?",
    placeholder: 'e.g., Generative art, philosophy, cooking...',
    category: 'interest',
    icon: '◉',
  },
  {
    id: 'q7',
    text: "What's something you want to achieve in the next year?",
    placeholder: 'e.g., Run a marathon, publish research, travel...',
    category: 'goal',
    icon: '▲',
  },
];


export default function OnboardingFlow() {
  const [step, setStep] = useState(0); // 0 = name, 1+ = questions
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { setSpace } = useSpaceStore();
  const { setCurrentUser, setOnboarded } = useUserStore();
  const router = useRouter();

  const currentQuestion = step > 0 ? questions[step - 1] : null;
  const totalSteps = questions.length + 1; // name + questions
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 0) {
      if (!name.trim()) return;
      setStep(1);
    } else if (currentQuestion) {
      if (!currentAnswer.trim()) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: currentAnswer }));
      setCurrentAnswer('');
      if (step < questions.length) {
        setStep(step + 1);
      } else {
        // Generate space
        handleGenerate();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    const allAnswers = questions
      .filter((q) => answers[q.id] || (q.id === currentQuestion?.id && currentAnswer))
      .map((q) => ({
        question: q.text,
        answer: q.id === currentQuestion?.id ? currentAnswer : answers[q.id],
        category: q.category,
      }));

    try {
      const res = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          answers: allAnswers,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate space');
      }
      
      const data = await res.json();
      
      // Fetch the newly created space to populate Zustand store
      const spaceRes = await fetch(`/api/spaces/${data.userId}`);
      if (!spaceRes.ok) throw new Error('Failed to fetch space');
      
      const spaceData = await spaceRes.json();
      
      setCurrentUser(spaceData.user);
      setOnboarded(true);
      setSpace(spaceData.space, spaceData.nodes, spaceData.edges);

      router.push('/space/me');
    } catch (error: any) {
      console.error(error);
      setIsGenerating(false);
      alert('Error: ' + error.message);
    }
  };

  const handleSkip = () => {
    if (step > 1) {
      // Skip current question
      setCurrentAnswer('');
      if (step < questions.length) {
        setStep(step + 1);
      } else {
        handleGenerate();
      }
    }
  };

  return (
    <div className="onboarding-container">
      {/* Progress bar */}
      <div className="onboarding-progress">
        <motion.div
          className="onboarding-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Background particles animation */}
      <div className="onboarding-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="onboarding-particle"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="generating"
            className="onboarding-generating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="generating-spinner" />
            <h2 className="generating-title">Generating Your Space</h2>
            <p className="generating-subtitle">Transforming your thoughts into a 3D constellation...</p>
          </motion.div>
        ) : step === 0 ? (
          <motion.div
            key="name-step"
            className="onboarding-step"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="onboarding-step-icon">✦</div>
            <h2 className="onboarding-step-title">Welcome to Spatial Chemistry</h2>
            <p className="onboarding-step-subtitle">
              Let&#39;s create your personal thought space. First, what should we call you?
            </p>
            <input
              type="text"
              className="onboarding-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className="onboarding-next-btn"
              onClick={handleNext}
              disabled={!name.trim()}
            >
              Begin Your Journey →
            </button>
          </motion.div>
        ) : currentQuestion ? (
          <motion.div
            key={`question-${step}`}
            className="onboarding-step"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="onboarding-step-icon" style={{ color: NODE_VISUAL_MAP[currentQuestion.category].defaultColor }}>
              {currentQuestion.icon}
            </div>
            <span className="onboarding-step-count">
              {step} of {questions.length}
            </span>
            <h2 className="onboarding-step-title">{currentQuestion.text}</h2>
            <textarea
              className="onboarding-textarea"
              placeholder={currentQuestion.placeholder}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              autoFocus
            />
            <div className="onboarding-actions">
              {step > 1 && (
                <button className="onboarding-skip-btn" onClick={handleSkip}>
                  Skip
                </button>
              )}
              <button
                className="onboarding-next-btn"
                onClick={handleNext}
                disabled={!currentAnswer.trim()}
              >
                {step === questions.length ? 'Generate Space ✦' : 'Next →'}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
