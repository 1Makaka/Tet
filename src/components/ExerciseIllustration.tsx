import React from 'react';

interface ExerciseIllustrationProps {
  type: string;
}

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({ type }) => {
  // Render a clean, stylized vector biomechanical movement diagram (Dark theme, neon cyan path, emerald anchor)
  switch (type) {
    case 'split_squat':
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          {/* Ground */}
          <line x1="10" y1="88" x2="150" y2="88" stroke="#334b73" strokeWidth="2" strokeDasharray="3 3" />
          {/* Head */}
          <circle cx="80" cy="22" r="7" fill="#38bdf8" />
          {/* Spine (vertical) */}
          <line x1="80" y1="29" x2="80" y2="54" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          {/* Front Leg (knee 90 deg, shin vertical) */}
          <polyline points="80,54 105,58 105,88" fill="none" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Back Leg */}
          <polyline points="80,54 55,68 50,88" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Hand + Dumbbell */}
          <line x1="80" y1="36" x2="80" y2="58" stroke="#94a3b8" strokeWidth="2" />
          <rect x="76" y="58" width="8" height="14" rx="2" fill="#38bdf8" />
          {/* Vertical Trajectory Line (Neon Cyan) */}
          <line x1="125" y1="30" x2="125" y2="75" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M122 35 L125 30 L128 35 M122 70 L125 75 L128 70" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          {/* 90 deg marker */}
          <path d="M100 58 A 6 6 0 0 1 105 64" fill="none" stroke="#22c55e" strokeWidth="1.5" />
          <text x="128" y="55" fill="#38bdf8" fontSize="8" fontFamily="monospace">90°</text>
          <text x="12" y="16" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Вертикаль</text>
        </svg>
      );

    case 'floor_press':
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          {/* Floor */}
          <line x1="10" y1="84" x2="150" y2="84" stroke="#334b73" strokeWidth="2" />
          {/* Torso lying on floor */}
          <line x1="45" y1="80" x2="105" y2="80" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
          {/* Head on floor */}
          <circle cx="36" cy="78" r="7" fill="#38bdf8" />
          {/* Bent knees */}
          <polyline points="105,80 120,60 130,84" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arms pressing up */}
          <line x1="68" y1="80" x2="68" y2="40" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
          {/* Barbell 30kg */}
          <line x1="48" y1="36" x2="88" y2="36" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="48" cy="36" r="6" fill="#38bdf8" />
          <circle cx="88" cy="36" r="6" fill="#38bdf8" />
          {/* Trajectory */}
          <line x1="68" y1="74" x2="68" y2="38" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M65 42 L68 37 L71 42" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Elbow contact marker */}
          <circle cx="68" cy="80" r="3" fill="#22c55e" />
          <text x="75" y="94" fill="#22c55e" fontSize="7" fontFamily="sans-serif">Пауза пола</text>
          <text x="12" y="18" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Угол локтей 45°</text>
        </svg>
      );

    case 'bent_row':
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          <line x1="10" y1="90" x2="150" y2="90" stroke="#334b73" strokeWidth="2" strokeDasharray="3 3" />
          {/* Head & Spine (inclined 45 deg, straight back) */}
          <circle cx="108" cy="30" r="7" fill="#38bdf8" />
          <line x1="102" y1="35" x2="65" y2="55" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          {/* Hips & Legs (Hips back) */}
          <polyline points="65,55 72,72 80,90" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arms pulling barbell */}
          <polyline points="88,42 90,62 82,78" fill="none" stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round" />
          {/* Barbell */}
          <line x1="72" y1="76" x2="92" y2="76" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="72" cy="76" r="5" fill="#38bdf8" />
          <circle cx="92" cy="76" r="5" fill="#38bdf8" />
          {/* Trajectory curve to waist */}
          <path d="M82 82 Q 88 65 88 48" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M85 52 L88 46 L91 52" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Flat spine indicator */}
          <line x1="100" y1="28" x2="60" y2="50" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
          <text x="12" y="18" fill="#22c55e" fontSize="8" fontFamily="sans-serif">Прямая поясница</text>
        </svg>
      );

    case 'romanian_dl':
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          <line x1="10" y1="90" x2="150" y2="90" stroke="#334b73" strokeWidth="2" strokeDasharray="3 3" />
          {/* Torso hinged at hips */}
          <circle cx="106" cy="38" r="7" fill="#38bdf8" />
          <line x1="100" y1="42" x2="62" y2="58" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          {/* Hips pushing BACK arrow */}
          <path d="M60 58 L42 58" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
          <polygon points="42,55 35,58 42,61" fill="#22c55e" />
          {/* Legs with slight knee bend */}
          <polyline points="62,58 68,74 74,90" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arms holding bar touching shins */}
          <line x1="88" y1="46" x2="84" y2="78" stroke="#f1f5f9" strokeWidth="2.5" />
          {/* Barbell 30kg */}
          <line x1="74" y1="78" x2="94" y2="78" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="74" cy="78" r="6" fill="#38bdf8" />
          <circle cx="94" cy="78" r="6" fill="#38bdf8" />
          {/* Vertical trajectory down shins */}
          <line x1="86" y1="52" x2="86" y2="82" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="12" y="16" fill="#22c55e" fontSize="8" fontFamily="sans-serif">Таз строго назад</text>
          <text x="12" y="28" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Гриф скользит по ногам</text>
        </svg>
      );

    case 'overhead_press':
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          <line x1="10" y1="92" x2="150" y2="92" stroke="#334b73" strokeWidth="2" strokeDasharray="3 3" />
          {/* Standing figure */}
          <circle cx="80" cy="34" r="6.5" fill="#38bdf8" />
          <line x1="80" y1="40" x2="80" y2="66" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="66" x2="75" y2="92" stroke="#64748b" strokeWidth="3" />
          <line x1="80" y1="66" x2="85" y2="92" stroke="#64748b" strokeWidth="3" />
          {/* Arms locked overhead */}
          <polyline points="80,44 76,28 78,14" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
          <polyline points="80,44 84,28 82,14" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
          {/* Barbell overhead */}
          <line x1="60" y1="14" x2="100" y2="14" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="60" cy="14" r="5" fill="#38bdf8" />
          <circle cx="100" cy="14" r="5" fill="#38bdf8" />
          {/* Glute lock & core lock highlights */}
          <circle cx="80" cy="64" r="4" fill="#22c55e" opacity="0.8" />
          <text x="12" y="16" fill="#22c55e" fontSize="8" fontFamily="sans-serif">Сжатые ягодицы</text>
          <text x="12" y="27" fill="#38bdf8" fontSize="7" fontFamily="sans-serif">Штанга над затылком</text>
        </svg>
      );

    case 'goblet_squat':
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          <line x1="10" y1="90" x2="150" y2="90" stroke="#334b73" strokeWidth="2" strokeDasharray="3 3" />
          {/* Deep squat */}
          <circle cx="80" cy="38" r="6.5" fill="#38bdf8" />
          <line x1="80" y1="44" x2="80" y2="68" stroke="#f1f5f9" strokeWidth="3.5" />
          {/* Wide knees deep squat */}
          <polyline points="80,68 62,64 64,90" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <polyline points="80,68 98,64 96,90" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          {/* Dumbbell held vertical at chest */}
          <rect x="76" y="46" width="8" height="15" rx="2" fill="#38bdf8" />
          {/* Trajectory */}
          <line x1="120" y1="40" x2="120" y2="75" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
          <text x="12" y="16" fill="#22c55e" fontSize="8" fontFamily="sans-serif">Глубокий сед</text>
          <text x="12" y="27" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Колени в стороны</text>
        </svg>
      );

    default:
      // Generic clean biomechanics diagram
      return (
        <svg viewBox="0 0 160 100" className="w-full h-24 bg-[#0a0f1d] rounded-xl border border-[#22324d]/80">
          <line x1="10" y1="88" x2="150" y2="88" stroke="#334b73" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="80" cy="28" r="7" fill="#38bdf8" />
          <line x1="80" y1="35" x2="80" y2="65" stroke="#f1f5f9" strokeWidth="3.5" />
          <polyline points="80,65 72,90" stroke="#64748b" strokeWidth="3" />
          <polyline points="80,65 88,90" stroke="#64748b" strokeWidth="3" />
          <line x1="65" y1="52" x2="95" y2="52" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="65" cy="52" r="4" fill="#38bdf8" />
          <circle cx="95" cy="52" r="4" fill="#38bdf8" />
          <text x="12" y="18" fill="#22c55e" fontSize="8" fontFamily="sans-serif">Строгая биомеханика</text>
        </svg>
      );
  }
};
