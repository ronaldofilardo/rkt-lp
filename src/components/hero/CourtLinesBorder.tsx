export function CourtLinesBorder() {
  return (
    <>
      <rect
        x="80" y="40" width="640" height="360"
        fill="none" stroke="currentColor" strokeWidth="2"
        className="court-draw"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        style={{ animationDelay: '0s' }}
      />
      <line
        x1="400" y1="40" x2="400" y2="400"
        stroke="currentColor" strokeWidth="2"
        className="court-draw"
        strokeDasharray="360"
        strokeDashoffset="360"
        style={{ animationDelay: '0.5s' }}
      />
      <line
        x1="80" y1="40" x2="80" y2="400"
        stroke="currentColor" strokeWidth="1" strokeOpacity="0.35"
        className="court-draw"
        strokeDasharray="360"
        strokeDashoffset="360"
        style={{ animationDelay: '0.45s' }}
      />
      <line
        x1="720" y1="40" x2="720" y2="400"
        stroke="currentColor" strokeWidth="1" strokeOpacity="0.35"
        className="court-draw"
        strokeDasharray="360"
        strokeDashoffset="360"
        style={{ animationDelay: '0.45s' }}
      />
    </>
  );
}
