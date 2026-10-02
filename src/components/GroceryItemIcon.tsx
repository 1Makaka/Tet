import React from 'react';

interface GroceryItemIconProps {
  iconKey: string;
}

export const GroceryItemIcon: React.FC<GroceryItemIconProps> = ({ iconKey }) => {
  switch (iconKey) {
    case 'chicken':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <path d="M10 20C10 15 15 11 22 11C26 11 27 14 27 17C27 21 23 25 17 25C13 25 10 23 10 20Z" fill="#fda4af" opacity="0.8" />
          <path d="M12 19C14 16 19 14 24 14" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'quark':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <path d="M10 14H26L24 26H12L10 14Z" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M9 14H27" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="20" r="3" fill="#ffffff" />
        </svg>
      );

    case 'eggs':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <ellipse cx="14" cy="20" rx="4.5" ry="6" fill="#fde047" opacity="0.85" />
          <ellipse cx="22" cy="19" rx="4.5" ry="6" fill="#fef08a" opacity="0.9" />
        </svg>
      );

    case 'milk':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <path d="M14 9H22V13H14V9Z" fill="#60a5fa" />
          <path d="M12 13H24L25 27H11L12 13Z" stroke="#60a5fa" strokeWidth="1.5" fill="#1e3a8a" opacity="0.4" />
          <path d="M14 20C16 18 20 22 22 20" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'veggies':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <circle cx="15" cy="16" r="4.5" fill="#22c55e" />
          <circle cx="21" cy="16" r="4.5" fill="#16a34a" />
          <circle cx="18" cy="21" r="4.5" fill="#15803d" />
          <path d="M18 24V27" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'beans':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <rect x="12" y="11" width="12" height="15" rx="3" fill="#991b1b" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
          <line x1="12" y1="16" x2="24" y2="16" stroke="#fca5a5" strokeWidth="1" />
          <ellipse cx="18" cy="21" rx="2.5" ry="1.5" fill="#ffffff" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <path d="M11 25C13 25 24 23 25 11C23 14 17 17 11 25Z" fill="#facc15" stroke="#eab308" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'rice':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <ellipse cx="18" cy="18" rx="8" ry="4" stroke="#e2e8f0" strokeWidth="1.5" fill="#ffffff" opacity="0.3" />
          <path d="M10 18C10 23 13 26 18 26C23 26 26 23 26 18" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="16" cy="17" r="1" fill="#ffffff" />
          <circle cx="20" cy="17" r="1" fill="#ffffff" />
        </svg>
      );

    case 'pasta':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <path d="M11 14L22 25" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <path d="M15 11L26 22" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'oats':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <circle cx="18" cy="19" r="7" stroke="#fdba74" strokeWidth="1.5" fill="#fed7aa" opacity="0.3" />
          <path d="M15 17L17 19M19 17L21 19M17 21L19 23" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'tuna':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <ellipse cx="18" cy="19" rx="7" ry="5" fill="#0284c7" opacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M23 19L27 16V22L23 19Z" fill="#38bdf8" />
          <circle cx="14" cy="18" r="1" fill="#ffffff" />
        </svg>
      );

    case 'peanut_butter':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <rect x="12" y="14" width="12" height="12" rx="2" fill="#d97706" opacity="0.4" stroke="#d97706" strokeWidth="1.5" />
          <rect x="13" y="11" width="10" height="3" rx="1" fill="#b45309" />
          <text x="14" y="22" fill="#fde68a" fontSize="6" fontWeight="bold">PB</text>
        </svg>
      );

    case 'toast':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <path d="M12 16C12 13 14 11 18 11C22 11 24 13 24 16V24H12V16Z" fill="#b45309" opacity="0.5" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="16" cy="17" r="1" fill="#fef3c7" />
          <circle cx="20" cy="20" r="1" fill="#fef3c7" />
        </svg>
      );

    case 'apple':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <circle cx="18" cy="20" r="6" fill="#ef4444" opacity="0.8" />
          <path d="M18 14C18 12 20 11 21 11" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'oil':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <rect x="16" y="9" width="4" height="4" rx="1" fill="#facc15" />
          <path d="M14 13H22L23 27H13L14 13Z" fill="#facc15" opacity="0.4" stroke="#eab308" strokeWidth="1.5" />
          <circle cx="18" cy="20" r="2" fill="#ffffff" opacity="0.7" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <rect width="36" height="36" rx="8" fill="#1e293b" />
          <circle cx="18" cy="18" r="5" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );
  }
};
