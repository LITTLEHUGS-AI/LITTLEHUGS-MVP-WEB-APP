import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://littlehugs-woman-wellness-api.onrender.com';

// ─── Unified conversational step definitions ──────────────────────────────────
// type: 'text' | 'number' | 'select' | 'single' | 'multi'
// profile fields feed user_profile; prescreening fields feed prescreening_answers; goals feeds goals[]

const STEPS = [
  {
    id: 'name',
    category: 'profile',
    type: 'text',
    question: "Hi! What's your first name?",
    placeholder: 'e.g. Aisha',
    key: 'name',
  },
  {
    id: 'age',
    category: 'profile',
    type: 'number',
    question: 'How old are you?',
    placeholder: '28',
    key: 'age',
    min: 16,
    max: 80,
  },
  {
    id: 'city',
    category: 'profile',
    type: 'select',
    question: 'Which city are you based in?',
    key: 'city',
    options: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain', 'Other'],
  },
  {
    id: 'mother_tongue',
    category: 'profile',
    type: 'select',
    question: 'What is your mother tongue?',
    key: 'mother_tongue',
    options: ['English', 'Arabic', 'Hindi', 'Urdu', 'Tagalog', 'Malayalam', 'Tamil', 'French', 'Other'],
  },
  {
    id: 'occupation',
    category: 'profile',
    type: 'text',
    question: 'What do you do?',
    placeholder: 'e.g. Teacher, Homemaker, Engineer…',
    key: 'occupation',
  },
  {
    id: 'current_life_stage',
    category: 'profile',
    type: 'single',
    question: 'Which best describes your current life stage?',
    key: 'current_life_stage',
    options: [
      'New mother (baby 0–12 months)',
      'Expecting mother',
      'Mother with toddler (1–3 years)',
      'Mother with school-age child',
      'Professional woman',
      'Homemaker',
      'Student',
      'Other',
    ],
  },
  {
    id: 'goals',
    category: 'goals',
    type: 'multi',
    question: 'What do you hope to get from this check-in?',
    subtext: 'Select all that feel true for you',
    key: 'goals',
    options: [
      "Understand how I've been feeling lately",
      "Find balance in my daily life",
      "Check in on my emotional wellbeing",
      "Be a better version of myself for me / my family",
      "Reconnect with myself emotionally",
      "Figure out why I'm tired all the time",
    ],
  },
  {
    id: 'brings_here',
    category: 'prescreening',
    type: 'multi',
    question: 'What brings you here today?',
    subtext: 'Select all that apply',
    key: 'What brings you here today?',
    options: [
      "I'm curious about how I'm really doing",
      "I want to check in on my emotional and mental well-being",
      "I've been feeling off and want to understand why",
      "I want to be more aware of my wellness needs",
    ],
  },
  {
    id: 'feeling_this_week',
    category: 'prescreening',
    type: 'single',
    question: 'How have you been feeling emotionally this past week?',
    key: 'How have you been feeling emotionally this past week?',
    options: ['Thriving', 'Okay', 'A bit low', 'Struggling'],
  },
  {
    id: 'hardest_area',
    category: 'prescreening',
    type: 'multi',
    question: 'What area of your life feels hardest right now?',
    subtext: 'Select all that apply',
    key: 'What area of your life feels hardest right now?',
    options: [
      'Managing my emotions',
      'Taking care of my body',
      'Balancing responsibilities',
      'Relationships and support',
      'Sleep and energy',
      'Finding time for myself',
    ],
  },
  {
    id: 'feel_supported',
    category: 'prescreening',
    type: 'single',
    question: 'Do you currently feel emotionally supported?',
    key: 'Do you currently feel emotionally supported?',
    options: ['Yes, very much', 'Mostly yes', 'Sometimes', 'Not really'],
  },
  {
    id: 'assessment_time',
    category: 'prescreening',
    type: 'single',
    question: 'How much time do you have for this check-in?',
    key: 'Time for assessment',
    options: ['Quick check-in (5 min)', 'Full wellness check (15 min)'],
    valueMap: {
      'Quick check-in (5 min)': 'Quick Check-in',
      'Full wellness check (15 min)': 'Full Wellness Map',
    },
  },
  {
    id: 'cycle_health',
    category: 'prescreening',
    type: 'single',
    question: 'Do you track your cycle health?',
    key: 'Cycle health history',
    options: ['Yes', 'No', 'Not applicable'],
    valueMap: { 'Not applicable': 'No' },
  },
];

const LOADING_MESSAGES = [
  'Understanding your wellness profile…',
  'Finding the domains that matter most to you…',
  'Crafting personalised questions just for you…',
  'Almost ready…',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const computeWellnessScore = (questions, answers) => {
  if (!questions.length) return 0;
  const total = questions.reduce((sum, _, i) => sum + (answers[i] ?? 0), 0);
  const maxPossible = questions.length * 3;
  return Math.round(((maxPossible - total) / maxPossible) * 100);
};

const scoreColour = (score) => {
  if (score >= 75) return { bg: '#d1fae5', text: '#065f46', label: 'Thriving' };
  if (score >= 50) return { bg: '#fef9c3', text: '#92400e', label: 'Growing' };
  return { bg: '#fee2e2', text: '#991b1b', label: 'Needs Care' };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
    <div
      className="h-1.5 rounded-full transition-all duration-500 bg-[#1E2C2B]"
      style={{ width: `${Math.round((current / total) * 100)}%` }}
    />
  </div>
);

const Tag = ({ children }) => (
  <span className="inline-block bg-[#E8E0F3] text-[#1E2C2B] text-xs font-medium px-3 py-1 rounded-full">
    {children}
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const WomenWellnessFlow = ({ onClose }) => {
  const TOTAL_STEPS = STEPS.length;

  // phase: 'questions' | 'loading' | 'assessment' | 'results'
  const [phase, setPhase] = useState('questions');
  const [stepIdx, setStepIdx] = useState(0);

  // Answers keyed by step id
  const [answers, setAnswers] = useState({});

  // Assessment state
  const [assessment, setAssessment] = useState(null);
  const [apiError, setApiError] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [qAnswers, setQAnswers] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState(0);

  // Rotate loading messages
  useEffect(() => {
    if (phase !== 'loading') return;
    const id = setInterval(() => setLoadingMsg(m => (m + 1) % LOADING_MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, [phase]);

  const currentStep = STEPS[stepIdx];

  // ── Answer helpers ───────────────────────────────────────────────────────────

  const getValue = (step) => answers[step.id];

  const isAnswered = (step) => {
    const val = answers[step.id];
    if (step.type === 'multi') return Array.isArray(val) && val.length > 0;
    if (step.type === 'text') return typeof val === 'string' && val.trim().length > 0;
    if (step.type === 'number') return val !== '' && val !== undefined && Number(val) > 0;
    return !!val;
  };

  const handleTextChange = (step, value) => {
    setAnswers(prev => ({ ...prev, [step.id]: value }));
  };

  const handleSingleSelect = (step, option) => {
    const mapped = step.valueMap ? (step.valueMap[option] ?? option) : option;
    setAnswers(prev => ({ ...prev, [step.id]: mapped }));
    // Auto-advance; if last step, submit instead
    setTimeout(() => advance(), 300);
  };

  const handleMultiToggle = (step, option) => {
    const mapped = step.valueMap ? (step.valueMap[option] ?? option) : option;
    setAnswers(prev => {
      const current = Array.isArray(prev[step.id]) ? prev[step.id] : [];
      const exists = current.includes(mapped);
      return { ...prev, [step.id]: exists ? current.filter(x => x !== mapped) : [...current, mapped] };
    });
  };

  const advance = () => {
    if (stepIdx < TOTAL_STEPS - 1) {
      setStepIdx(i => i + 1);
    } else {
      submitAssessment();
    }
  };

  const goBack = () => {
    if (stepIdx > 0) setStepIdx(i => i - 1);
  };

  // ── Build request from answers ───────────────────────────────────────────────

  const buildRequest = useCallback(() => {
    const profile = {};
    const prescreening = {};
    let goals = [];

    STEPS.forEach(step => {
      const val = answers[step.id];
      if (!val) return;
      if (step.category === 'profile') {
        profile[step.key] = step.id === 'age' ? Number(val) : val;
      } else if (step.category === 'goals') {
        goals = Array.isArray(val) ? val : [val];
      } else if (step.category === 'prescreening') {
        prescreening[step.key] = val;
      }
    });

    // Always include life stage in prescreening too
    prescreening['Which best describes your current role/life stage?'] = profile.current_life_stage || '';

    return {
      user_profile: {
        name: profile.name || 'Anonymous',
        age: profile.age || 25,
        city: profile.city || 'Dubai',
        mother_tongue: profile.mother_tongue || 'English',
        occupation: profile.occupation || 'Not specified',
        current_life_stage: profile.current_life_stage || 'Professional woman',
        tone_preference: 'neutral',
      },
      goals: goals.length > 0 ? goals : ["Understand how I've been feeling lately"],
      prescreening_answers: prescreening,
    };
  }, [answers]);

  // ── Submit ───────────────────────────────────────────────────────────────────

  const submitAssessment = useCallback(async () => {
    setPhase('loading');
    setApiError('');
    try {
      const body = buildRequest();
      const res = await fetch(`${API_URL}/api/assessment/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const detail = err.detail;
        const msg = Array.isArray(detail)
          ? detail.map(d => `${d.loc?.slice(-1)[0] ?? 'field'}: ${d.msg}`).join('; ')
          : (typeof detail === 'string' ? detail : `Server error ${res.status}`);
        throw new Error(msg);
      }

      const data = await res.json();
      setAssessment(data);
      setCurrentQ(0);
      setQAnswers([]);
      setPhase('assessment');
    } catch (e) {
      setApiError(e.message || 'Something went wrong. Please try again.');
      setPhase('questions');
      setStepIdx(TOTAL_STEPS - 1); // back to last step
    }
  }, [buildRequest, TOTAL_STEPS]);

  const handleQAnswer = (idx) => {
    const updated = [...qAnswers];
    updated[currentQ] = idx;
    setQAnswers(updated);
    setTimeout(() => {
      if (currentQ < assessment.questions.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        setPhase('results');
      }
    }, 300);
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  const profileName = answers['name'] || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto relative">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="text-lg">💗</span>
            <span className="font-semibold text-[#1E2C2B] text-sm">Women's Wellness Check-in</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5">

          {/* ── PHASE: Questions (profile + prescreening combined) ── */}
          {phase === 'questions' && currentStep && (() => {
            const step = currentStep;
            const val = getValue(step);

            return (
              <div>
                <ProgressBar current={stepIdx + 1} total={TOTAL_STEPS} />
                <p className="text-xs text-gray-400 mb-3">{stepIdx + 1} of {TOTAL_STEPS}</p>
                <h2 className="text-lg font-bold text-[#1E2C2B] mb-1 leading-snug">{step.question}</h2>
                {step.subtext && <p className="text-xs text-gray-400 mb-4">{step.subtext}</p>}

                {/* Text input */}
                {(step.type === 'text') && (
                  <div className="mt-4">
                    <input
                      type="text"
                      autoFocus
                      placeholder={step.placeholder}
                      value={val || ''}
                      onChange={e => handleTextChange(step, e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && isAnswered(step) && advance()}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B]"
                    />
                  </div>
                )}

                {/* Number input */}
                {step.type === 'number' && (
                  <div className="mt-4">
                    <input
                      type="number"
                      autoFocus
                      placeholder={step.placeholder}
                      min={step.min}
                      max={step.max}
                      value={val || ''}
                      onChange={e => handleTextChange(step, e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && isAnswered(step) && advance()}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B]"
                    />
                  </div>
                )}

                {/* Dropdown select */}
                {step.type === 'select' && (
                  <div className="mt-4">
                    <select
                      value={val || ''}
                      onChange={e => {
                        handleTextChange(step, e.target.value);
                        if (e.target.value) setTimeout(() => advance(), 300);
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B] bg-white"
                    >
                      <option value="">Choose one…</option>
                      {step.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                )}

                {/* Single-select buttons */}
                {step.type === 'single' && (
                  <div className="space-y-2 mt-4">
                    {step.options.map(opt => {
                      const mapped = step.valueMap ? (step.valueMap[opt] ?? opt) : opt;
                      const selected = val === mapped;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleSingleSelect(step, opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                            selected
                              ? 'border-[#1E2C2B] bg-[#E8E0F3] text-[#1E2C2B] font-medium'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {selected ? '✓ ' : ''}{opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Multi-select buttons */}
                {step.type === 'multi' && (
                  <div className="space-y-2 mt-4">
                    {step.options.map(opt => {
                      const mapped = step.valueMap ? (step.valueMap[opt] ?? opt) : opt;
                      const selected = Array.isArray(val) && val.includes(mapped);
                      return (
                        <button
                          key={opt}
                          onClick={() => handleMultiToggle(step, opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                            selected
                              ? 'border-[#1E2C2B] bg-[#E8E0F3] text-[#1E2C2B] font-medium'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {selected ? '✓ ' : ''}{opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {apiError && stepIdx === TOTAL_STEPS - 1 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                    {apiError} — The service may be waking up. Please try again in a moment.
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                  {stepIdx > 0 && (
                    <button
                      onClick={goBack}
                      className="flex-none border border-gray-200 text-gray-500 py-3 px-5 rounded-full text-sm hover:bg-gray-50 transition"
                    >
                      ← Back
                    </button>
                  )}
                  {/* Next / Submit button — always show for text/number/multi, and always on last step */}
                  {(step.type === 'text' || step.type === 'number' || step.type === 'multi' || stepIdx === TOTAL_STEPS - 1) && (
                    <button
                      onClick={advance}
                      disabled={!isAnswered(step)}
                      className="flex-1 bg-[#1E2C2B] text-white py-3 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-[#111818] transition"
                    >
                      {stepIdx === TOTAL_STEPS - 1 ? 'Generate my check-in →' : 'Next →'}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── PHASE: Loading ── */}
          {phase === 'loading' && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-14 h-14 border-4 border-[#E8E0F3] border-t-[#1E2C2B] rounded-full animate-spin mb-6" />
              <p className="text-[#1E2C2B] font-semibold text-base mb-1">{LOADING_MESSAGES[loadingMsg]}</p>
              <p className="text-gray-400 text-xs mt-2">This may take up to 30 seconds</p>
            </div>
          )}

          {/* ── PHASE: Assessment questions ── */}
          {phase === 'assessment' && assessment && (() => {
            const q = assessment.questions[currentQ];
            return (
              <div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500 bg-purple-600"
                    style={{ width: `${Math.round(((currentQ + 1) / assessment.questions.length) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <Tag>{q.domain}</Tag>
                  <span className="text-xs text-gray-400">{currentQ + 1} / {assessment.questions.length}</span>
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-[#1E2C2B] mb-5 leading-snug">{q.question}</h2>

                <div className="space-y-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQAnswer(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                        qAnswers[currentQ] === idx
                          ? 'border-purple-600 bg-[#E8E0F3] text-[#1E2C2B] font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {currentQ > 0 && (
                  <button
                    onClick={() => setCurrentQ(q => q - 1)}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    ← Previous question
                  </button>
                )}
              </div>
            );
          })()}

          {/* ── PHASE: Results ── */}
          {phase === 'results' && assessment && (() => {
            const score = computeWellnessScore(assessment.questions, qAnswers);
            const { bg, text, label } = scoreColour(score);
            const topDomains = assessment.domains.slice(0, 5);
            const name = profileName ? `, ${profileName}` : '';

            return (
              <div>
                <h2 className="text-xl font-bold text-[#1E2C2B] mb-1 text-center">Your Wellness Check-in</h2>
                <p className="text-gray-400 text-xs text-center mb-5">Personalised for you{name}</p>

                {/* Score */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-sm"
                    style={{ background: bg }}
                  >
                    <span className="text-3xl font-bold" style={{ color: text }}>{score}</span>
                    <span className="text-xs font-medium" style={{ color: text }}>/100</span>
                  </div>
                  <span className="mt-2 text-sm font-semibold px-4 py-1 rounded-full" style={{ background: bg, color: text }}>
                    {label}
                  </span>
                </div>

                {/* Overall assessment */}
                <div className="bg-[#FAF3ED] rounded-2xl p-4 mb-4">
                  <p className="text-[#1E2C2B] text-sm leading-relaxed">{assessment.overall_assessment}</p>
                </div>

                {/* Top domains */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your top wellness areas</p>
                  <div className="flex flex-wrap gap-2">
                    {topDomains.map(d => <Tag key={d}>{d}</Tag>)}
                  </div>
                </div>

                {/* Domain breakdown */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Questions by domain</p>
                  <div className="space-y-1.5">
                    {Object.entries(assessment.summary.questions_by_domain).map(([domain, count]) => (
                      <div key={domain} className="flex justify-between text-xs text-gray-600">
                        <span className="truncate max-w-[65%]">{domain}</span>
                        <span className="text-gray-400">{count} question{count !== 1 ? 's' : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 text-center mb-5">
                  This is a wellness reflection tool, not a clinical diagnosis. If you're struggling, please reach out to a qualified professional.
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => { setPhase('questions'); setStepIdx(0); setAnswers({}); setAssessment(null); setQAnswers([]); }}
                    className="w-full border border-[#1E2C2B] text-[#1E2C2B] py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Take another check-in
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-[#1E2C2B] text-white py-3 rounded-full text-sm font-medium hover:bg-[#111818] transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </div>
    </div>
  );
};

export default WomenWellnessFlow;
