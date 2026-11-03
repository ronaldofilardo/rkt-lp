export function CourtLinesNet() {
  return (
    <>
      <line
        x1="80" y1="220" x2="720" y2="220"
        stroke="currentColor" strokeWidth="3"
        strokeDasharray="6 4"
        className="court-draw"
        style={{
          strokeDashoffset: 640,
          animationDelay: '1.1s',
        }}
      />
      <line
        x1="80" y1="205" x2="80" y2="235"
        stroke="currentColor" strokeWidth="3"
        className="court-draw"
        strokeDasharray="30"
        strokeDashoffset="30"
        style={{ animationDelay: '1.15s' }}
      />
      <line
        x1="720" y1="205" x2="720" y2="235"
        stroke="currentColor" strokeWidth="3"
        className="court-draw"
        strokeDasharray="30"
        strokeDashoffset="30"
        style={{ animationDelay: '1.15s' }}
      />
    </>
  );
}
