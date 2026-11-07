'use client';

import { useState } from 'react';
import type { SimulatedMatchFixture } from '@/types/telemetry.types';
import { StatBar } from './StatBar';
import { MomentumDots } from './MomentumDots';
import { TabIndicator } from './TabIndicator';

type Tab = 'saque' | 'devolucao' | 'pressao' | 'momentum';
const TABS: { id: Tab; label: string }[] = [
  { id: 'saque',     label: 'Saque'      },
  { id: 'devolucao', label: 'Devolução'  },
  { id: 'pressao',   label: 'Pressão'    },
  { id: 'momentum',  label: 'Momentum'   },
];

interface Props { match: SimulatedMatchFixture }

export function TelemetryPanel({ match }: Props) {
  const [tab, setTab] = useState<Tab>('saque');
  const activeIndex = TABS.findIndex((t) => t.id === tab);
  const { player1: p1Obj, player2: p2Obj, serve, returnStats, pressure } = match;
  const [p1, p2] = [p1Obj.initials, p2Obj.initials];
  const [s1, s2] = [serve.player1, serve.player2];
  const [r1, r2] = [returnStats.player1, returnStats.player2];
  const [pr1, pr2] = [pressure.player1, pressure.player2];

  return (
    <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card">
      {/* Tabs */}
      <div role="tablist" aria-label="Categorias de telemetria" className="relative flex border-b border-telemetry-border/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`relative z-10 flex-1 py-3 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-telemetry-blue ${
              tab === t.id ? 'text-telemetry-text-primary' : 'text-telemetry-text-muted hover:text-telemetry-text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
        <TabIndicator tabIndex={activeIndex >= 0 ? activeIndex : 0} totalTabs={TABS.length} />
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-between border-b border-telemetry-border/10 px-5 py-2">
        <span className="font-mono text-xs font-bold text-telemetry-volt">{match.player1.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-telemetry-text-muted">vs</span>
        <span className="font-mono text-xs font-bold text-telemetry-text-muted">{match.player2.name}</span>
      </div>

      {/* Conteúdo das abas com crossfade */}
      <div className="relative min-h-[190px] p-5">
        {tab === 'saque' && (
          <div id="panel-saque" role="tabpanel" className="tab-pane-enter space-y-4">
            <StatBar label="1º Saque %" p1Value={s1.firstServePct} p2Value={s2.firstServePct} p1Label={p1} p2Label={p2} />
            <StatBar label="Pts ganhos 1S" p1Value={s1.firstServePointsWonPct} p2Value={s2.firstServePointsWonPct} p1Label={p1} p2Label={p2} />
            <StatBar label="Aces" p1Value={s1.aces} p2Value={s2.aces} p1Label={p1} p2Label={p2} format="int" />
            <StatBar label="BP Salvos %" p1Value={s1.breakPointsSavedPct} p2Value={s2.breakPointsSavedPct} p1Label={p1} p2Label={p2} />
          </div>
        )}
        {tab === 'devolucao' && (
          <div id="panel-devolucao" role="tabpanel" className="tab-pane-enter space-y-4">
            <StatBar label="Ret. 1S %" p1Value={r1.firstServeReturnPointsWonPct} p2Value={r2.firstServeReturnPointsWonPct} p1Label={p1} p2Label={p2} />
            <StatBar label="Ret. 2S %" p1Value={r1.secondServeReturnPointsWonPct} p2Value={r2.secondServeReturnPointsWonPct} p1Label={p1} p2Label={p2} />
            <StatBar label="BP Conv. %" p1Value={r1.breakPointsConvertedPct} p2Value={r2.breakPointsConvertedPct} p1Label={p1} p2Label={p2} />
            <StatBar label="Games dev. ganhos" p1Value={r1.returnGamesWonPct} p2Value={r2.returnGamesWonPct} p1Label={p1} p2Label={p2} />
          </div>
        )}
        {tab === 'pressao' && (
          <div id="panel-pressao" role="tabpanel" className="tab-pane-enter space-y-4">
            <StatBar label="GP ganhos %" p1Value={pr1.gamePointsWonPct} p2Value={pr2.gamePointsWonPct} p1Label={p1} p2Label={p2} />
            <StatBar label="SP ganhos %" p1Value={pr1.setPointsWonPct} p2Value={pr2.setPointsWonPct} p1Label={p1} p2Label={p2} />
            <StatBar label="BP salvos" p1Value={pr1.breakPointsSaved} p2Value={pr2.breakPointsSaved} p1Label={p1} p2Label={p2} format="int" />
            <StatBar label="BP convertidos" p1Value={pr1.breakPointsConverted} p2Value={pr2.breakPointsConverted} p1Label={p1} p2Label={p2} format="int" />
          </div>
        )}
        {tab === 'momentum' && (
          <div id="panel-momentum" role="tabpanel" className="tab-pane-enter space-y-4">
            <MomentumDots
              totalPoints={pr1.totalPointsWon + pr2.totalPointsWon}
              p1Points={pr1.totalPointsWon}
              p1Initials={p1}
              p2Initials={p2}
              longestStreak={match.momentum.longestWinningStreak}
            />
            <StatBar label="Pts totais" p1Value={pr1.totalPointsWon} p2Value={pr2.totalPointsWon} p1Label={p1} p2Label={p2} format="int" />
          </div>
        )}
      </div>
    </div>
  );
}
