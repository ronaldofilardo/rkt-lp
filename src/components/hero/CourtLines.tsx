/**
 * CourtLines — fundo animado do Hero.
 *
 * Efeitos (todos CSS/SVG puro, zero JS, zero dependência):
 *  1. Perspectiva 3D isométrica via CSS (court-3d-wrapper / court-3d-inner)
 *  2. Respiro suave do SVG inteiro (court-breathe)
 *  3. Draw-on: cada linha se desenha sequencialmente com stroke-dashoffset
 *  4. Bolinha amarela percorre a diagonal longa com glow e rastro
 *
 * Puramente decorativo: aria-hidden em tudo.
 */
import { CourtLinesBorder } from './CourtLinesBorder';
import { CourtLinesService } from './CourtLinesService';
import { CourtLinesNet } from './CourtLinesNet';
import { CourtLinesBall } from './CourtLinesBall';

export function CourtLines() {
  return (
    <div aria-hidden="true" className="court-3d-wrapper court-parallax-layer absolute inset-0 h-full w-full overflow-hidden">
      <div className="court-3d-inner absolute inset-0 h-full w-full">
        <svg
          viewBox="0 0 800 440"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="court-lines-svg h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <path
              id="ball-path"
              d="M 110 380 Q 400 60 690 380"
              fill="none"
            />
            <filter id="ball-glow-filter" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CourtLinesBorder />
          <CourtLinesService />
          <CourtLinesNet />
          <CourtLinesBall />
        </svg>
      </div>
    </div>
  );
}
