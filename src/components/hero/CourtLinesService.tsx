export function CourtLinesService() {
  return (
    <>
      <line
        x1="80" y1="160" x2="400" y2="160"
        stroke="currentColor" strokeWidth="1.5"
        className="court-draw"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animationDelay: '0.7s' }}
      />
      <line
        x1="400" y1="160" x2="720" y2="160"
        stroke="currentColor" strokeWidth="1.5"
        className="court-draw"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animationDelay: '0.85s' }}
      />
      <line
        x1="80" y1="280" x2="400" y2="280"
        stroke="currentColor" strokeWidth="1.5"
        className="court-draw"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animationDelay: '0.7s' }}
      />
      <line
        x1="400" y1="280" x2="720" y2="280"
        stroke="currentColor" strokeWidth="1.5"
        className="court-draw"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animationDelay: '0.85s' }}
      />
      <line
        x1="240" y1="160" x2="240" y2="280"
        stroke="currentColor" strokeWidth="1.5"
        className="court-draw"
        strokeDasharray="120"
        strokeDashoffset="120"
        style={{ animationDelay: '1s' }}
      />
      <line
        x1="560" y1="160" x2="560" y2="280"
        stroke="currentColor" strokeWidth="1.5"
        className="court-draw"
        strokeDasharray="120"
        strokeDashoffset="120"
        style={{ animationDelay: '1s' }}
      />
    </>
  );
}
