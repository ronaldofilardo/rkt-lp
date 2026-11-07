'use client';

import { useState } from 'react';
import { MATCH_REPLAY_DATA } from '@/data/match-replay.data';
import { MatchReplay } from '@/components/telemetry-demo/MatchReplay';
import { ReportModal } from '@/components/telemetry-demo/ReportModal';

export function HeroMatchReplay() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <MatchReplay
        fixture={MATCH_REPLAY_DATA}
        onReportClick={() => setModalOpen(true)}
      />
      {modalOpen && <ReportModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
