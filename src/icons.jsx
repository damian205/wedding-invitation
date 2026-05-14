// Minimal hand-drawn-feel SVG icons
const Icon = {
  Ring: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="15" r="6"/>
      <path d="M9 9 L12 5 L15 9"/>
      <circle cx="12" cy="6" r="1.2" fill="currentColor"/>
    </svg>
  ),
  Heart: ({size=16, filled=false}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?'currentColor':'none'} stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M12 21s-7-4.5-9-9c-1-2.5 0-5.5 3-6 2-.3 4 1 6 3 2-2 4-3.3 6-3 3 .5 4 3.5 3 6-2 4.5-9 9-9 9z"/>
    </svg>
  ),
  Flower: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <circle cx="12" cy="8" r="3"/>
      <circle cx="7" cy="13" r="3"/>
      <circle cx="17" cy="13" r="3"/>
      <circle cx="9.5" cy="17" r="3"/>
      <circle cx="14.5" cy="17" r="3"/>
      <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Leaf: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/>
      <path d="M5 19 L14 10"/>
    </svg>
  ),
  Champagne: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M8 3 L16 3 L15 11 a3 3 0 0 1 -6 0 z"/>
      <path d="M12 14 L12 20"/>
      <path d="M9 20 L15 20"/>
    </svg>
  ),
  Calendar: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <rect x="4" y="6" width="16" height="14" rx="1"/>
      <path d="M4 10 L20 10"/>
      <path d="M8 4 L8 7 M16 4 L16 7"/>
    </svg>
  ),
  Cake: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <rect x="4" y="11" width="16" height="9" rx="1"/>
      <path d="M4 14 Q8 16 12 14 T20 14"/>
      <path d="M12 6 L12 11"/>
      <path d="M10 5 Q12 3 14 5"/>
    </svg>
  ),
  Camera: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <rect x="3" y="7" width="18" height="13" rx="1.5"/>
      <path d="M9 7 L10 5 L14 5 L15 7"/>
      <circle cx="12" cy="13.5" r="3.5"/>
    </svg>
  ),
  Music: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M9 18 V6 L19 4 V16"/>
      <circle cx="7" cy="18" r="2"/>
      <circle cx="17" cy="16" r="2"/>
    </svg>
  ),
  Dress: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M9 4 L15 4 L14 8 L18 20 L6 20 L10 8 Z"/>
      <path d="M10 8 L14 8"/>
    </svg>
  ),
  Plus: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 5 L12 19 M5 12 L19 12"/>
    </svg>
  ),
  Search: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6"/>
      <path d="M16 16 L20 20"/>
    </svg>
  ),
  Sparkle: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13 10 L21 12 L13 14 L12 22 L11 14 L3 12 L11 10 Z"/>
    </svg>
  ),
  Pin: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 22 S5 14 5 9 a7 7 0 0 1 14 0 c0 5 -7 13 -7 13z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  Mail: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="6" width="18" height="12" rx="1"/>
      <path d="M3 7 L12 13 L21 7"/>
    </svg>
  ),
  Phone: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M5 4 L9 4 L11 9 L8 11 Q10 15 13 17 L15 14 L20 16 L20 20 Q12 21 5 14 Q4 8 5 4z"/>
    </svg>
  ),
  Star: ({filled=true, size=12}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?'currentColor':'none'} stroke="currentColor" strokeWidth="1.2">
      <path d="M12 3 L14.5 9 L21 9.5 L16 14 L17.5 20.5 L12 17 L6.5 20.5 L8 14 L3 9.5 L9.5 9 Z"/>
    </svg>
  ),
  Upload: ({size=18}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M12 16 V4 M7 9 L12 4 L17 9"/>
      <path d="M4 18 L4 20 L20 20 L20 18"/>
    </svg>
  ),
  X: ({size=12}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 6 L18 18 M18 6 L6 18"/>
    </svg>
  ),
};
window.Icon = Icon;
