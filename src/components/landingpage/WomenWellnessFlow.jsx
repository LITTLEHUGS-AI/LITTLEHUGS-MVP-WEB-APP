import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://littlehugs-woman-wellness-api.onrender.com';

// ─── Static data ──────────────────────────────────────────────────────────────

const LIFE_STAGES = [
  'New mother (baby 0–12 months)',
  'Expecting mother',
  'Mother with toddler (1–3 years)',
  'Mother with school-age child',
  'Professional woman',
  'Homemaker',
  'Student',
  'Other',
];

const UAE_CITIES = [
  'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman',
  'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain', 'Other',
];

const MOTHER_TONGUES = [
  'English', 'Arabic', 'Hindi', 'Urdu', 'Tagalog',
  'Malayalam', 'Tamil', 'French', 'Other',
];

const GOAL_OPTIONS = [
  "Understand how I've been feeling lately",
  "Find balance in my daily life",
  "Check in on my emotional wellbeing",
  "Be a better version of myself for me / my family",
  "Reconnect with myself emotionally",
  "Figure out why I'm tired all the time",
];

const PRESCREENING = [
  {
    key: 'What brings you here today?',
    question: 'What brings you here today?',
    type: 'multi',
    options: [
      "I'm curious about how I'm really doing",
      "I want to check in on my emotional and mental well-being",
      "I've been feeling off and want to understand why",
      "I want to be more aware of my wellness needs",
    ],
  },
  {
    key: 'How have you been feeling emotionally this past week?',
    question: 'How have you been feeling emotionally this past week?',
    type: 'single',
    options: ['Thriving', 'Okay', 'A bit low', 'Struggling'],
  },
  {
    key: 'What area of your life feels hardest right now?',
    question: 'What area of your life feels hardest right now?',
    type: 'multi',
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
    key: 'Do you currently feel emotionally supported?',
    question: 'Do you currently feel emotionally supported?',
    type: 'single',
    options: ['Yes, very much', 'Mostly yes', 'Sometimes', 'Not really'],
  },
  {
    key: 'Time for assessment',
    question: 'How much time do you have for this check-in?',
    type: 'single',
    options: ['Quick check-in (5 min)', 'Full wellness check (15 min)'],
    valueMap: {
      'Quick check-in (5 min)': 'Quick Check-in',
      'Full wellness check (15 min)': 'Full Wellness Map',
    },
  },
  {
    key: 'Cycle health history',
    question: 'Do you track your cycle health?',
    type: 'single',
    options: ['Yes', 'No', 'Not applicable'],
    valueMap: { 'Not applicable': 'No' },
  },
];

const LOADING_MESSAGES = [
  'Understanding your wellness profile…',
  'Finding the domains that matter most to you…',
  'Crafting personalised questions…',
  'Almost ready for you…',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const computeWellnessScore = (questions, answers) => {
  if (!questions.length) return 0;
  const total = questions.reduce((sum, q, i) => sum + (answers[i] ?? 0), 0);
  const maxPossible = questions.length * 3;
  // 0 = best answer → high score; 3 = worst answer → low score
  return Math.round(((maxPossible - total) / maxPossible) * 100);
};

const scoreColour = (score) => {
  if (score >= 75) return { bg: '#d1fae5', text: '#065f46', label: 'Thriving' };
  if (score >= 50) return { bg: '#fef9c3', text: '#92400e', label: 'Growing' };
  return { bg: '#fee2e2', text: '#991b1b', label: 'Needs Care' };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProgressBar = ({ current, total, color = '#1E2C2B' }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
    <div
      className="h-2 rounded-full transition-all duration-500"
      style={{ width: `${(current / total) * 100}%`, background: color }}
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
  // Steps: 0=profile, 1=goals, 2=prescreening, 3=loading, 4=questions, 5=results
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '', age: '', city: 'Dubai', mother_tongue: 'English',
    occupation: '', current_life_stage: '', tone_preference: 'neutral',
  });
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [prescreeningAnswers, setPrescreeningAnswers] = useState({});
  const [prescreenIdx, setPrescreenIdx] = useState(0);
  const [assessment, setAssessment] = useState(null);
  const [apiError, setApiError] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [qAnswers, setQAnswers] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState(0);

  // Rotate loading messages
  useEffect(() => {
    if (step !== 3) return;
    const id = setInterval(() => setLoadingMsg(m => (m + 1) % LOADING_MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, [step]);

  // ── Validation ──────────────────────────────────────────────────────────────

  const profileValid =
    profile.name.trim() &&
    profile.age &&
    Number(profile.age) > 0 &&
    profile.city &&
    profile.mother_tongue &&
    profile.occupation.trim() &&
    profile.current_life_stage;

  const goalsValid = selectedGoals.length > 0;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const toggleGoal = (g) =>
    setSelectedGoals(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );

  const handlePrescreenAnswer = (q, answer) => {
    if (q.type === 'multi') {
      const mapped = q.valueMap ? (q.valueMap[answer] ?? answer) : answer;
      setPrescreeningAnswers(prev => {
        const current = Array.isArray(prev[q.key]) ? prev[q.key] : [];
        const exists = current.includes(mapped);
        return {
          ...prev,
          [q.key]: exists ? current.filter(x => x !== mapped) : [...current, mapped],
        };
      });
    } else {
      const mapped = q.valueMap ? (q.valueMap[answer] ?? answer) : answer;
      setPrescreeningAnswers(prev => ({ ...prev, [q.key]: mapped }));
    }
  };

  const prescreenAnswered = (q) => {
    const val = prescreeningAnswers[q.key];
    if (q.type === 'multi') return Array.isArray(val) && val.length > 0;
    return !!val;
  };

  const advancePrescreen = () => {
    if (prescreenIdx < PRESCREENING.length - 1) {
      setPrescreenIdx(i => i + 1);
    } else {
      submitAssessment();
    }
  };

  const submitAssessment = useCallback(async () => {
    setStep(3);
    setApiError('');
    try {
      const body = {
        user_profile: {
          name: profile.name.trim(),
          age: Number(profile.age),
          city: profile.city,
          mother_tongue: profile.mother_tongue,
          occupation: profile.occupation.trim(),
          current_life_stage: profile.current_life_stage,
          tone_preference: profile.tone_preference,
          height: null,
          weight: null,
        },
        goals: selectedGoals,
        prescreening_answers: {
          ...prescreeningAnswers,
          // Ensure "Which best describes your current role/life stage?" is set
          'Which best describes your current role/life stage?': profile.current_life_stage,
        },
      };

      const res = await fetch(`${API_URL}/api/assessment/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error ${res.status}`);
      }

      const data = await res.json();
      setAssessment(data);
      setCurrentQ(0);
      setQAnswers([]);
      setStep(4);
    } catch (e) {
      setApiError(e.message || 'Something went wrong. Please try again.');
      setStep(2); // back to last prescreening question
    }
  }, [profile, selectedGoals, prescreeningAnswers]);

  const handleQAnswer = (idx) => {
    const updated = [...qAnswers];
    updated[currentQ] = idx;
    setQAnswers(updated);
    setTimeout(() => {
      if (currentQ < assessment.questions.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        setStep(5);
      }
    }, 300);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="text-lg">💗</span>
            <span className="font-semibold text-[#1E2C2B] text-sm">Women's Wellness Check-in</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5">

          {/* ── STEP 0: Profile ─────────────────────────────────────────────── */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#1E2C2B] mb-1">Tell us a little about you</h2>
              <p className="text-gray-500 text-sm mb-5">This helps us personalise your check-in experience.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aisha"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      placeholder="28"
                      min="16" max="80"
                      value={profile.age}
                      onChange={e => setProfile(p => ({ ...p, age: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      value={profile.city}
                      onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B] bg-white"
                    >
                      {UAE_CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother tongue</label>
                    <select
                      value={profile.mother_tongue}
                      onChange={e => setProfile(p => ({ ...p, mother_tongue: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B] bg-white"
                    >
                      {MOTHER_TONGUES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <input
                      type="text"
                      placeholder="e.g. Teacher"
                      value={profile.occupation}
                      onChange={e => setProfile(p => ({ ...p, occupation: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current life stage</label>
                  <select
                    value={profile.current_life_stage}
                    onChange={e => setProfile(p => ({ ...p, current_life_stage: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2C2B] bg-white"
                  >
                    <option value="">Select your life stage…</option>
                    {LIFE_STAGES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                disabled={!profileValid}
                className="mt-6 w-full bg-[#1E2C2B] text-white py-3 rounded-full font-medium text-sm disabled:opacity-40 hover:bg-[#111818] transition"
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 1: Goals ────────────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-[#1E2C2B] mb-1">What do you hope to get from this?</h2>
              <p className="text-gray-500 text-sm mb-5">Select all that feel true for you.</p>

              <div className="space-y-2">
                {GOAL_OPTIONS.map(g => (
                  <button
                    key={g}
                    onClick={() => toggleGoal(g)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                      selectedGoals.includes(g)
                        ? 'border-[#1E2C2B] bg-[#E8E0F3] text-[#1E2C2B] font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {selectedGoals.includes(g) ? '✓ ' : ''}{g}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full text-sm hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => { setPrescreenIdx(0); setStep(2); }}
                  disabled={!goalsValid}
                  className="flex-1 bg-[#1E2C2B] text-white py-3 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-[#111818] transition"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Prescreening ─────────────────────────────────────────── */}
          {step === 2 && (() => {
            const q = PRESCREENING[prescreenIdx];
            const isMulti = q.type === 'multi';
            const selected = prescreeningAnswers[q.key];
            const answered = prescreenAnswered(q);

            return (
              <div>
                <ProgressBar current={prescreenIdx + 1} total={PRESCREENING.length} />
                <p className="text-xs text-gray-400 mb-3">Question {prescreenIdx + 1} of {PRESCREENING.length}</p>
                <h2 className="text-lg font-bold text-[#1E2C2B] mb-1">{q.question}</h2>
                {isMulti && <p className="text-xs text-gray-400 mb-4">Select all that apply</p>}

                <div className="space-y-2 mt-4">
                  {q.options.map(opt => {
                    const mapped = q.valueMap ? (q.valueMap[opt] ?? opt) : opt;
                    const isSelected = isMulti
                      ? Array.isArray(selected) && selected.includes(mapped)
                      : selected === mapped;
                    return (
                      <button
                        key={opt}
                        onClick={() => handlePrescreenAnswer(q, opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                          isSelected
                            ? 'border-[#1E2C2B] bg-[#E8E0F3] text-[#1E2C2B] font-medium'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{opt}
                      </button>
                    );
                  })}
                </div>

                {apiError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {apiError} — The service may be waking up (free tier). Please try again in a moment.
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => prescreenIdx === 0 ? setStep(1) : setPrescreenIdx(i => i - 1)}
                    className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full text-sm hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={advancePrescreen}
                    disabled={!answered}
                    className="flex-1 bg-[#1E2C2B] text-white py-3 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-[#111818] transition"
                  >
                    {prescreenIdx < PRESCREENING.length - 1 ? 'Next →' : 'Generate my check-in →'}
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ── STEP 3: Loading ──────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 border-4 border-[#E8E0F3] border-t-[#1E2C2B] rounded-full animate-spin mb-6" />
              <p className="text-[#1E2C2B] font-semibold text-base mb-1">{LOADING_MESSAGES[loadingMsg]}</p>
              <p className="text-gray-400 text-xs mt-2">This may take up to 30 seconds</p>
            </div>
          )}

          {/* ── STEP 4: Questions ────────────────────────────────────────────── */}
          {step === 4 && assessment && (() => {
            const q = assessment.questions[currentQ];
            return (
              <div>
                <ProgressBar current={currentQ + 1} total={assessment.questions.length} color="#7C3AED" />
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
                          ? 'border-[#7C3AED] bg-[#E8E0F3] text-[#1E2C2B] font-medium'
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

          {/* ── STEP 5: Results ──────────────────────────────────────────────── */}
          {step === 5 && assessment && (() => {
            const score = computeWellnessScore(assessment.questions, qAnswers);
            const { bg, text, label } = scoreColour(score);
            const topDomains = assessment.domains.slice(0, 5);

            return (
              <div>
                <h2 className="text-xl font-bold text-[#1E2C2B] mb-1 text-center">Your Wellness Check-in</h2>
                <p className="text-gray-400 text-xs text-center mb-5">Personalised for {profile.name}</p>

                {/* Score circle */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-sm"
                    style={{ background: bg }}
                  >
                    <span className="text-3xl font-bold" style={{ color: text }}>{score}</span>
                    <span className="text-xs font-medium" style={{ color: text }}>/100</span>
                  </div>
                  <span
                    className="mt-2 text-sm font-semibold px-4 py-1 rounded-full"
                    style={{ background: bg, color: text }}
                  >
                    {label}
                  </span>
                </div>

                {/* Overall assessment */}
                <div className="bg-[#FAF3ED] rounded-2xl p-4 mb-4">
                  <p className="text-[#1E2C2B] text-sm leading-relaxed">{assessment.overall_assessment}</p>
                </div>

                {/* Top wellness domains */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your top wellness areas</p>
                  <div className="flex flex-wrap gap-2">
                    {topDomains.map(d => <Tag key={d}>{d}</Tag>)}
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">By domain</p>
                  <div className="space-y-2">
                    {Object.entries(assessment.summary.questions_by_domain).map(([domain, count]) => (
                      <div key={domain} className="flex justify-between items-center text-xs text-gray-600">
                        <span className="truncate max-w-[60%]">{domain}</span>
                        <span className="text-gray-400">{count} question{count !== 1 ? 's' : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-400 text-center mb-5">
                  This is a wellness reflection tool — not a clinical diagnosis. If you're struggling, please reach out to a qualified professional.
                </p>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => { setStep(0); setQAnswers([]); setAssessment(null); setPrescreeningAnswers({}); setSelectedGoals([]); }}
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
