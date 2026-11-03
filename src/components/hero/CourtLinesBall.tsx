export function CourtLinesBall() {
  return (
    <>
      <circle r="8" fill="rgba(204,255,0,0.18)" className="court-ball-trail">
        <animateMotion dur="4s" begin="1.35s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.45 0.05 0.55 0.95"
          keyTimes="0;1"
        >
          <mpath href="#ball-path" />
        </animateMotion>
      </circle>
      <circle r="14" fill="rgba(204,255,0,0.22)" className="court-ball-glow" filter="url(#ball-glow-filter)">
        <animateMotion dur="4s" begin="1.4s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.45 0.05 0.55 0.95"
          keyTimes="0;1"
        >
          <mpath href="#ball-path" />
        </animateMotion>
      </circle>
      <circle r="5" fill="#ccff00" className="court-ball">
        <animateMotion dur="4s" begin="1.4s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.45 0.05 0.55 0.95"
          keyTimes="0;1"
        >
          <mpath href="#ball-path" />
        </animateMotion>
      </circle>
    </>
  );
}
