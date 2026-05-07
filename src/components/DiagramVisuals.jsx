import React from 'react';

const Box = ({ x, y, w, h, fill = '#1e3a5f', stroke = '#3b82f6', rx = 6, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1.5" />
    {children}
  </g>
);

const Label = ({ x, y, text, size = 11, fill = '#f1f5f9', bold = false, anchor = 'middle' }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={bold ? 'bold' : 'normal'} fontFamily="system-ui,sans-serif">{text}</text>
);

const Arrow = ({ x1, y1, x2, y2, color = '#64748b' }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd="url(#arr)" />
);

const Defs = () => (
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
    </marker>
  </defs>
);

export function TECCPhases() {
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="TECC Phases of Care" size={14} bold fill="#f59e0b" />
      {/* Hot Zone */}
      <Box x={20} y={40} w={150} h={200} fill="#7f1d1d" stroke="#ef4444">
        <Label x={95} y={60} text="HOT ZONE" size={12} bold fill="#fca5a5" />
        <Label x={95} y={80} text="Direct Threat Care" size={10} fill="#fca5a5" />
        <rect x={35} y={90} width={120} height={1} fill="#ef4444" opacity="0.5" />
        <Label x={95} y={110} text="● Tourniquet" size={10} fill="#fef2f2" />
        <Label x={95} y={128} text="● Move to cover" size={10} fill="#fef2f2" />
        <Label x={95} y={146} text="● Return fire" size={10} fill="#fef2f2" />
        <Label x={95} y={164} text="● Self-aid if able" size={10} fill="#fef2f2" />
        <Label x={95} y={220} text="Active fire" size={10} fill="#fca5a5" />
      </Box>
      {/* Warm Zone */}
      <Box x={185} y={40} w={150} h={200} fill="#1c3520" stroke="#22c55e">
        <Label x={260} y={60} text="WARM ZONE" size={12} bold fill="#86efac" />
        <Label x={260} y={80} text="Indirect Threat Care" size={10} fill="#86efac" />
        <rect x={200} y={90} width={120} height={1} fill="#22c55e" opacity="0.5" />
        <Label x={260} y={110} text="● MARCH-PAWS" size={10} fill="#f0fdf4" />
        <Label x={260} y={128} text="● Airway" size={10} fill="#f0fdf4" />
        <Label x={260} y={146} text="● IV/IO access" size={10} fill="#f0fdf4" />
        <Label x={260} y={164} text="● TXA within 3h" size={10} fill="#f0fdf4" />
        <Label x={260} y={182} text="● Hypothermia prev." size={10} fill="#f0fdf4" />
        <Label x={260} y={220} text="Potential threat" size={10} fill="#86efac" />
      </Box>
      {/* Cold Zone */}
      <Box x={350} y={40} w={150} h={200} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={425} y={60} text="COLD ZONE" size={12} bold fill="#93c5fd" />
        <Label x={425} y={80} text="Evacuation Care" size={10} fill="#93c5fd" />
        <rect x={365} y={90} width={120} height={1} fill="#3b82f6" opacity="0.5" />
        <Label x={425} y={110} text="● Monitor & reassess" size={10} fill="#eff6ff" />
        <Label x={425} y={128} text="● Definitive care" size={10} fill="#eff6ff" />
        <Label x={425} y={146} text="● Ventilator mgmt" size={10} fill="#eff6ff" />
        <Label x={425} y={164} text="● Prolonged PFC" size={10} fill="#eff6ff" />
        <Label x={425} y={182} text="● MIST handoff" size={10} fill="#eff6ff" />
        <Label x={425} y={220} text="Scene secured" size={10} fill="#93c5fd" />
      </Box>
      <Arrow x1={170} y1={140} x2={183} y2={140} color="#f59e0b" />
      <Arrow x1={335} y1={140} x2={348} y2={140} color="#f59e0b" />
      <Label x={260} y={265} text="Patient flow: Hot → Warm → Cold Zone" size={10} fill="#94a3b8" />
    </svg>
  );
}

export function MARCHPaws() {
  const steps = [
    { letter: 'M', label: 'Massive Hemorrhage', detail: 'Tourniquets, wound packing', color: '#dc2626', bg: '#7f1d1d' },
    { letter: 'A', label: 'Airway', detail: 'NPA, cricothyrotomy', color: '#ea580c', bg: '#7c2d12' },
    { letter: 'R', label: 'Respiration', detail: 'Chest seal, needle decompression', color: '#ca8a04', bg: '#713f12' },
    { letter: 'C', label: 'Circulation', detail: 'IV/IO, fluids, blood', color: '#16a34a', bg: '#14532d' },
    { letter: 'H', label: 'Hypothermia', detail: 'Blankets, warm fluids', color: '#0891b2', bg: '#164e63' },
    { letter: 'P', label: 'Pain', detail: 'Ketamine, OTFC, meloxicam', color: '#7c3aed', bg: '#3b0764' },
    { letter: 'A', label: 'Antibiotics', detail: 'Moxifloxacin / ertapenem', color: '#be185d', bg: '#500724' },
    { letter: 'W', label: 'Wounds', detail: 'Dressing, irrigation', color: '#0369a1', bg: '#0c4a6e' },
    { letter: 'S', label: 'Splinting', detail: 'Fracture stabilization', color: '#047857', bg: '#022c22' },
  ];
  return (
    <svg viewBox="0 0 520 310" className="w-full max-w-lg mx-auto">
      <rect width="520" height="310" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="MARCH-PAWS Algorithm" size={14} bold fill="#f59e0b" />
      {steps.map((s, i) => {
        const col = i < 5 ? 0 : 1;
        const row = i < 5 ? i : i - 5;
        const x = col === 0 ? 15 : 270;
        const y = 38 + row * 50;
        return (
          <g key={i}>
            <rect x={x} y={y} width={240} height={42} rx={5} fill={s.bg} stroke={s.color} strokeWidth="1.5" />
            <rect x={x} y={y} width={36} height={42} rx={5} fill={s.color} />
            <Label x={x + 18} y={y + 26} text={s.letter} size={16} bold fill="#fff" />
            <Label x={x + 44} y={y + 16} text={s.label} size={11} bold fill="#f1f5f9" anchor="start" />
            <Label x={x + 44} y={y + 31} text={s.detail} size={9} fill="#94a3b8" anchor="start" />
          </g>
        );
      })}
      <Label x={260} y={298} text="Priority order: life-threats first, then comfort/wound care" size={9} fill="#64748b" />
    </svg>
  );
}

export function RTFIntegration() {
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Rescue Task Force Integration" size={14} bold fill="#f59e0b" />
      <Box x={10} y={38} w={120} h={50} fill="#7f1d1d" stroke="#ef4444">
        <Label x={70} y={57} text="ACTIVE THREAT" size={10} bold fill="#fca5a5" />
        <Label x={70} y={73} text="Hot Zone" size={9} fill="#fca5a5" />
      </Box>
      <Box x={200} y={38} w={120} h={50} fill="#1c3520" stroke="#22c55e">
        <Label x={260} y={57} text="RTF TEAM" size={10} bold fill="#86efac" />
        <Label x={260} y={73} text="Warm Zone" size={9} fill="#86efac" />
      </Box>
      <Box x={390} y={38} w={120} h={50} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={450} y={57} text="STAGING" size={10} bold fill="#93c5fd" />
        <Label x={450} y={73} text="Cold Zone" size={9} fill="#93c5fd" />
      </Box>
      <Arrow x1={130} y1={63} x2={198} y2={63} color="#f59e0b" />
      <Arrow x1={320} y1={63} x2={388} y2={63} color="#f59e0b" />
      <Box x={170} y={120} w={180} h={130} fill="#1e293b" stroke="#f59e0b">
        <Label x={260} y={140} text="RTF COMPOSITION" size={11} bold fill="#f59e0b" />
        <Label x={260} y={158} text="2-4 EMS providers" size={10} fill="#e2e8f0" />
        <Label x={260} y={175} text="2+ LEO security escorts" size={10} fill="#e2e8f0" />
        <Label x={260} y={192} text="Medical equipment" size={10} fill="#e2e8f0" />
        <Label x={260} y={209} text="Rapid hemorrhage control" size={10} fill="#e2e8f0" />
        <Label x={260} y={226} text="Tourniquet + chest seal" size={10} fill="#e2e8f0" />
        <Label x={260} y={243} text="Airway management" size={10} fill="#e2e8f0" />
      </Box>
      <Label x={260} y={275} text="LEO secures 360° while EMS treats → extract to cold zone" size={10} fill="#94a3b8" />
    </svg>
  );
}

export function TourniquetDecision() {
  return (
    <svg viewBox="0 0 520 310" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="310" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Hemorrhage Control Decision Tree" size={13} bold fill="#f59e0b" />
      <Box x={180} y={35} w={160} h={40} fill="#7f1d1d" stroke="#ef4444">
        <Label x={260} y={60} text="Life-threatening bleeding?" size={11} bold fill="#fca5a5" />
      </Box>
      <Arrow x1={260} y1={75} x2={260} y2={100} />
      <Box x={180} y={100} w={160} h={40} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={260} y={125} text="On a limb?" size={11} fill="#93c5fd" />
      </Box>
      <Arrow x1={180} y1={120} x2={100} y2={165} color="#22c55e" />
      <Arrow x1={340} y1={120} x2={420} y2={165} color="#ef4444" />
      <Label x={130} y={155} text="YES" size={10} fill="#22c55e" />
      <Label x={390} y={155} text="NO" size={10} fill="#ef4444" />
      <Box x={30} y={165} w={140} h={50} fill="#14532d" stroke="#22c55e">
        <Label x={100} y={185} text="TOURNIQUET" size={11} bold fill="#86efac" />
        <Label x={100} y={202} text="High & tight (CUF)" size={9} fill="#d1fae5" />
      </Box>
      <Box x={350} y={165} w={140} h={50} fill="#1c3520" stroke="#f59e0b">
        <Label x={420} y={185} text="Junctional?" size={11} fill="#fde68a" />
        <Label x={420} y={202} text="groin/axilla/neck" size={9} fill="#fde68a" />
      </Box>
      <Arrow x1={420} y1={215} x2={420} y2={245} />
      <Box x={350} y={245} w={140} h={50} fill="#713f12" stroke="#f59e0b">
        <Label x={420} y={265} text="Hemostatic pack" size={10} bold fill="#fde68a" />
        <Label x={420} y={280} text="3 min pressure" size={9} fill="#fef3c7" />
      </Box>
      <Box x={30} y={245} w={140} h={50} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={100} y={263} text="Truncal bleed:" size={10} fill="#93c5fd" />
        <Label x={100} y={279} text="Permissive hypotension" size={9} fill="#93c5fd" />
        <Label x={100} y={293} text="+ blood products" size={9} fill="#93c5fd" />
      </Box>
    </svg>
  );
}

export function DCRFlow() {
  const steps = [
    { label: 'Hemorrhage Control', sub: 'TQ + wound packing', color: '#dc2626' },
    { label: 'TXA within 3 hours', sub: '1g IV over 10 min', color: '#ea580c' },
    { label: 'Whole Blood / 1:1:1', sub: 'Preferred over crystalloids', color: '#ca8a04' },
    { label: 'Permissive Hypotension', sub: 'SBP 80-90 (no TBI) | ≥110 (TBI)', color: '#16a34a' },
    { label: 'Prevent Lethal Triad', sub: 'Keep warm, avoid cold NS', color: '#0891b2' },
  ];
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Damage Control Resuscitation" size={13} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={50} y={38 + i * 46} width={420} height={38} rx={6} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={50} y={38 + i * 46} width={8} height={38} rx={3} fill={s.color} />
          <Label x={80} y={54 + i * 46} text={s.label} size={12} bold fill="#f1f5f9" anchor="start" />
          <Label x={80} y={69 + i * 46} text={s.sub} size={10} fill="#94a3b8" anchor="start" />
          {i < 4 && <Arrow x1={260} y1={76 + i * 46} x2={260} y2={86 + i * 46} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={280} text="Goal: prevent hypothermia + acidosis + coagulopathy" size={10} fill="#64748b" />
    </svg>
  );
}

export function LethalTriad() {
  return (
    <svg viewBox="0 0 520 300" className="w-full max-w-lg mx-auto">
      <rect width="520" height="300" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Lethal Triad of Trauma" size={14} bold fill="#f59e0b" />
      <circle cx={260} cy={160} r={55} fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" opacity="0.3" />
      <Label x={260} y={155} text="UNCONTROLLED" size={10} bold fill="#ef4444" />
      <Label x={260} y={170} text="HEMORRHAGE" size={10} bold fill="#ef4444" />
      <Box x={10} y={50} w={150} h={70} fill="#1e1b4b" stroke="#818cf8">
        <Label x={85} y={75} text="HYPOTHERMIA" size={12} bold fill="#a5b4fc" />
        <Label x={85} y={93} text="Impairs clotting" size={10} fill="#c7d2fe" />
        <Label x={85} y={108} text="enzyme function" size={10} fill="#c7d2fe" />
      </Box>
      <Box x={360} y={50} w={150} h={70} fill="#1a2e1a" stroke="#4ade80">
        <Label x={435} y={75} text="COAGULOPATHY" size={11} bold fill="#86efac" />
        <Label x={435} y={93} text="Dilutional from NS" size={10} fill="#bbf7d0" />
        <Label x={435} y={108} text="Clotting fails" size={10} fill="#bbf7d0" />
      </Box>
      <Box x={185} y={210} w={150} h={70} fill="#1c1917" stroke="#f97316">
        <Label x={260} y={235} text="ACIDOSIS" size={12} bold fill="#fdba74" />
        <Label x={260} y={253} text="High Cl⁻ from NS" size={10} fill="#fed7aa" />
        <Label x={260} y={268} text="Impairs coag. factors" size={10} fill="#fed7aa" />
      </Box>
      <line x1={160} y1={85} x2={205} y2={120} stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1={360} y1={85} x2={315} y2={120} stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1={260} y1={210} x2={260} y2={215} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,3" />
      <Label x={260} y={292} text="Broken by: warm blood products + hemorrhage control" size={10} fill="#94a3b8" />
    </svg>
  );
}

export function CrichotomySteps() {
  const steps = [
    { n: '1', t: 'Vertical skin incision', d: 'Over cricothyroid membrane' },
    { n: '2', t: 'Palpate membrane', d: 'Identify CTM by feel' },
    { n: '3', t: 'Horizontal stab', d: 'Through CTM — scalpel' },
    { n: '4', t: 'Insert bougie', d: 'Feel rings + carina' },
    { n: '5', t: 'Railroad 6.0mm ETT', d: 'Over bougie into trachea' },
    { n: '6', t: 'Confirm placement', d: 'EtCO₂ + bilateral sounds' },
  ];
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Surgical Cricothyrotomy Steps" size={13} bold fill="#f59e0b" />
      {steps.map((s, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i < 3 ? i : i - 3;
        const x = col === 0 ? 15 : 270;
        const y = 38 + row * 76;
        return (
          <g key={i}>
            <rect x={x} y={y} width={240} height={66} rx={6} fill="#1e293b" stroke="#0891b2" strokeWidth="1.5" />
            <circle cx={x + 22} cy={y + 20} r={14} fill="#0891b2" />
            <Label x={x + 22} y={y + 25} text={s.n} size={13} bold fill="#fff" />
            <Label x={x + 45} y={y + 22} text={s.t} size={11} bold fill="#f1f5f9" anchor="start" />
            <Label x={x + 45} y={y + 38} text={s.d} size={10} fill="#94a3b8" anchor="start" />
          </g>
        );
      })}
      <Box x={165} y={262} w={190} h={22} fill="#7f1d1d" stroke="#ef4444" rx={4}>
        <Label x={260} y={278} text="FALSE AIRWAY: massive SQ emphysema → remove + retry" size={9} fill="#fca5a5" />
      </Box>
    </svg>
  );
}

export function TensionPneumo() {
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Tension Pneumothorax Progression" size={13} bold fill="#f59e0b" />
      {[
        { x: 15, label: 'Penetrating', sub: 'Chest wound', color: '#dc2626' },
        { x: 125, label: 'Air traps', sub: 'in pleural space', color: '#ea580c' },
        { x: 235, label: 'Lung collapse', sub: 'Right side', color: '#ca8a04' },
        { x: 345, label: 'Mediastinal', sub: 'shift left', color: '#7c3aed' },
        { x: 455, label: 'Obstructive', sub: 'shock / arrest', color: '#dc2626' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={40} width={100} height={60} rx={6} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <Label x={s.x + 50} y={68} text={s.label} size={10} bold fill={s.color} />
          <Label x={s.x + 50} y={84} text={s.sub} size={9} fill="#94a3b8" />
          {i < 4 && <Arrow x1={s.x + 100} y1={70} x2={s.x + 123} y2={70} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={130} text="Clinical Signs:" size={12} bold fill="#f59e0b" />
      <rect x={80} y={140} width={360} height={90} rx={6} fill="#1e293b" stroke="#475569" />
      {[
        'Absent breath sounds (ipsilateral side)',
        'Tracheal deviation (contralateral)',
        'Jugular venous distention (JVD)',
        'Hypotension + tachycardia',
      ].map((t, i) => <Label key={i} x={100} y={162 + i * 18} text={'• ' + t} size={10} fill="#e2e8f0" anchor="start" />)}
      <Label x={260} y={255} text="Treatment: 14g needle → 2nd ICS MCL or 4th/5th ICS AAL" size={11} bold fill="#22c55e" />
      <Label x={260} y={273} text="Worsening after vented chest seal → needle decompression" size={10} fill="#86efac" />
    </svg>
  );
}

export function BlastInjuryTypes() {
  const types = [
    { label: 'PRIMARY', sub: 'Overpressure wave', organs: 'Blast lung, TM rupture,\nGI barotrauma', color: '#dc2626', bg: '#7f1d1d' },
    { label: 'SECONDARY', sub: 'Debris / shrapnel', organs: 'Penetrating fragment\nwounds', color: '#ea580c', bg: '#7c2d12' },
    { label: 'TERTIARY', sub: 'Casualty thrown', organs: 'Blunt trauma, fractures,\ntraumatic amputation', color: '#ca8a04', bg: '#713f12' },
    { label: 'QUATERNARY', sub: 'All other effects', organs: 'Burns, inhalation,\ncrush injury', color: '#7c3aed', bg: '#3b0764' },
  ];
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Blast Injury Classification" size={14} bold fill="#f59e0b" />
      {types.map((t, i) => {
        const x = (i % 2) * 258 + 12;
        const y = Math.floor(i / 2) * 120 + 38;
        return (
          <g key={i}>
            <rect x={x} y={y} width={240} height={108} rx={6} fill={t.bg} stroke={t.color} strokeWidth="1.5" />
            <Label x={x + 120} y={y + 22} text={t.label} size={13} bold fill={t.color} />
            <Label x={x + 120} y={y + 40} text={t.sub} size={10} fill="#f1f5f9" />
            <rect x={x + 10} y={y + 48} width={220} height={1} fill={t.color} opacity="0.4" />
            {t.organs.split('\n').map((l, j) => <Label key={j} x={x + 120} y={y + 66 + j * 18} text={l} size={10} fill="#cbd5e1" />)}
          </g>
        );
      })}
      <Label x={260} y={282} text="KE = ½mv²  — velocity is the dominant factor for cavitation damage" size={10} fill="#64748b" />
    </svg>
  );
}

export function WoundBallistics() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Wound Ballistics — Cavitation" size={14} bold fill="#f59e0b" />
      <Label x={130} y={50} text="HIGH-VELOCITY (Rifle)" size={11} bold fill="#ef4444" />
      <ellipse cx={260} cy={90} rx={180} ry={28} fill="#7f1d1d" opacity="0.5" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" />
      <rect x={55} y={83} width={410} height={14} rx={7} fill="#dc2626" opacity="0.8" />
      <Label x={260} y={80} text="← Temporary cavity (tissue stretching) →" size={9} fill="#fca5a5" />
      <Label x={260} y={120} text="Permanent cavity (direct crush)" size={9} fill="#94a3b8" />
      <Label x={130} y={155} text="LOW-VELOCITY (Handgun)" size={11} bold fill="#3b82f6" />
      <rect x={100} y={175} width={320} height={14} rx={7} fill="#1d4ed8" opacity="0.8" />
      <Label x={260} y={200} text="Small permanent cavity — minimal temp. cavitation" size={9} fill="#93c5fd" />
      <rect x={40} y={225} width={440} height={1} fill="#334155" />
      <Label x={260} y={243} text="KE = ½mv²   Doubling velocity = 4× energy transfer" size={11} bold fill="#f59e0b" />
      <Label x={260} y={260} text="Perm. cavity = low-velocity wounding | Temp. cavity = high-velocity" size={9} fill="#64748b" />
    </svg>
  );
}

export function ShockClasses() {
  const classes = [
    { cl: 'I', loss: '<15%', hr: 'Normal', sbp: 'Normal', ms: 'Normal', tx: 'Monitor', color: '#22c55e' },
    { cl: 'II', loss: '15-30%', hr: '>100', sbp: 'Normal', ms: 'Anxious', tx: 'IV access', color: '#ca8a04' },
    { cl: 'III', loss: '30-40%', hr: '>120', sbp: 'Decreased', ms: 'Confused', tx: 'Blood now', color: '#ea580c' },
    { cl: 'IV', loss: '>40%', hr: '>140', sbp: 'Very low', ms: 'Lethal', tx: 'Massive TX', color: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Hemorrhagic Shock Classification" size={13} bold fill="#f59e0b" />
      {['Class', 'Blood Loss', 'HR', 'SBP', 'Mental Status', 'Treatment'].map((h, i) => (
        <text key={i} x={[15, 78, 180, 237, 295, 400][i]} y={42} fontSize={9} fill="#64748b" fontFamily="system-ui" fontWeight="bold">{h}</text>
      ))}
      <rect x={10} y={46} width={500} height={1} fill="#334155" />
      {classes.map((c, i) => (
        <g key={i}>
          <rect x={10} y={52 + i * 50} width={500} height={44} rx={4} fill={i % 2 === 0 ? '#1e293b' : '#0f172a'} />
          <rect x={10} y={52 + i * 50} width={6} height={44} rx={3} fill={c.color} />
          <Label x={42} y={79 + i * 50} text={'Class ' + c.cl} size={11} bold fill={c.color} anchor="start" />
          <Label x={78} y={79 + i * 50} text={c.loss} size={10} fill="#e2e8f0" anchor="start" />
          <Label x={180} y={79 + i * 50} text={c.hr} size={10} fill="#e2e8f0" anchor="start" />
          <Label x={237} y={79 + i * 50} text={c.sbp} size={10} fill="#e2e8f0" anchor="start" />
          <Label x={295} y={79 + i * 50} text={c.ms} size={10} fill="#e2e8f0" anchor="start" />
          <Label x={400} y={79 + i * 50} text={c.tx} size={10} bold fill={c.color} anchor="start" />
        </g>
      ))}
      <Label x={260} y={260} text="Radial pulse lost at Class III — begin blood products immediately" size={10} fill="#94a3b8" />
    </svg>
  );
}

export function SLUDGEMToxidrome() {
  const items = [
    { l: 'S', word: 'Salivation', sub: 'Excessive drooling' },
    { l: 'L', word: 'Lacrimation', sub: 'Tearing eyes' },
    { l: 'U', word: 'Urination', sub: 'Involuntary urination' },
    { l: 'D', word: 'Defecation', sub: 'Involuntary defecation' },
    { l: 'G', word: 'GI Upset', sub: 'Cramping, vomiting' },
    { l: 'E', word: 'Emesis', sub: 'Vomiting' },
    { l: 'M', word: 'Miosis', sub: 'Pinpoint pupils' },
  ];
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="SLUDGEM — Nerve Agent Toxidrome" size={13} bold fill="#f59e0b" />
      {items.map((s, i) => {
        const col = i < 4 ? 0 : 1;
        const row = i < 4 ? i : i - 4;
        const x = col === 0 ? 15 : 270;
        const y = 38 + row * 58;
        return (
          <g key={i}>
            <rect x={x} y={y} width={240} height={48} rx={5} fill="#1e293b" stroke="#7c3aed" strokeWidth="1.5" />
            <rect x={x} y={y} width={36} height={48} rx={5} fill="#7c3aed" />
            <Label x={x + 18} y={y + 30} text={s.l} size={18} bold fill="#fff" />
            <Label x={x + 44} y={y + 20} text={s.word} size={12} bold fill="#c4b5fd" anchor="start" />
            <Label x={x + 44} y={y + 36} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
          </g>
        );
      })}
      <Box x={15} y={270} w={490} h={18} fill="#1e293b" stroke="#f59e0b" rx={4}>
        <Label x={260} y={283} text="Antidote: Atropine (until secretions dry) + 2-PAM (before aging)" size={10} fill="#fde68a" />
      </Box>
    </svg>
  );
}

export function K9AssessmentFlow() {
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="K9 Tactical Medicine Assessment" size={13} bold fill="#f59e0b" />
      <Box x={170} y={35} w={180} h={40} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={260} y={60} text="Scene Safety + Handler OK?" size={11} bold fill="#93c5fd" />
      </Box>
      <Arrow x1={260} y1={75} x2={260} y2={98} />
      <Box x={20} y={98} w={220} h={50} fill="#14532d" stroke="#22c55e">
        <Label x={130} y={118} text="MARCH-PAWS (K9 adapted)" size={11} bold fill="#86efac" />
        <Label x={130} y={133} text="Hemorrhage → Airway → Breathing" size={9} fill="#d1fae5" />
      </Box>
      <Box x={280} y={98} w={220} h={50} fill="#1e293b" stroke="#f59e0b">
        <Label x={390} y={115} text="K9 Normal Vitals" size={11} bold fill="#fde68a" />
        <Label x={390} y={130} text="HR: 60-120 | RR: 10-30" size={9} fill="#fef3c7" />
        <Label x={390} y={143} text="Temp: 100.5-102.5°F | CRT <2s" size={9} fill="#fef3c7" />
      </Box>
      <Box x={20} y={170} w={140} h={50} fill="#7f1d1d" stroke="#ef4444">
        <Label x={90} y={190} text="Hemorrhage" size={11} bold fill="#fca5a5" />
        <Label x={90} y={206} text="TQ (limb) or packing" size={9} fill="#fef2f2" />
      </Box>
      <Box x={190} y={170} w={140} h={50} fill="#1c3520" stroke="#22c55e">
        <Label x={260} y={190} text="Shock" size={11} bold fill="#86efac" />
        <Label x={260} y={206} text="10 mg/kg TXA IV" size={9} fill="#f0fdf4" />
      </Box>
      <Box x={360} y={170} w={140} h={50} fill="#1e1b4b" stroke="#818cf8">
        <Label x={430} y={190} text="Pain / Analg." size={11} bold fill="#a5b4fc" />
        <Label x={430} y={206} text="NO human NSAIDs!" size={9} fill="#e0e7ff" />
      </Box>
      <Box x={20} y={240} w={480} h={38} fill="#1e293b" stroke="#ef4444" rx={4}>
        <Label x={260} y={256} text="CRITICAL: Ibuprofen/naproxen = fatal gastric ulceration + renal failure in K9" size={10} bold fill="#ef4444" />
        <Label x={260} y={271} text="Safe alternatives: ketamine, tramadol, fentanyl" size={9} fill="#94a3b8" />
      </Box>
    </svg>
  );
}

export function STARTTriage() {
  return (
    <svg viewBox="0 0 520 300" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="300" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="START Triage Algorithm" size={14} bold fill="#f59e0b" />
      <Box x={185} y={35} w={150} h={38} fill="#1e293b" stroke="#64748b">
        <Label x={260} y={59} text="Casualty encountered" size={11} fill="#e2e8f0" />
      </Box>
      <Arrow x1={260} y1={73} x2={260} y2={90} />
      <Box x={185} y={90} w={150} h={38} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={260} y={114} text="Walking?" size={11} fill="#93c5fd" />
      </Box>
      <Arrow x1={185} y1={109} x2={100} y2={145} color="#22c55e" />
      <Arrow x1={335} y1={109} x2={380} y2={145} color="#ef4444" />
      <Label x={128} y={137} text="YES" size={10} fill="#22c55e" />
      <Label x={358} y={137} text="NO" size={10} fill="#ef4444" />
      <Box x={30} y={145} w={120} h={38} fill="#14532d" stroke="#22c55e">
        <Label x={90} y={169} text="MINOR (Green)" size={10} bold fill="#86efac" />
      </Box>
      <Box x={340} y={145} w={150} h={38} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={415} y={164} text="Respirations?" size={10} fill="#93c5fd" />
        <Label x={415} y={177} text=">30/min or absent" size={9} fill="#64748b" />
      </Box>
      <Arrow x1={415} y1={183} x2={415} y2={205} />
      <Box x={340} y={205} w={150} h={38} fill="#1e293b" stroke="#ca8a04">
        <Label x={415} y={224} text="Cap refill >2s?" size={10} fill="#fde68a" />
      </Box>
      <Arrow x1={415} y1={243} x2={415} y2={260} />
      <Box x={340} y={260} w={150} h={32} fill="#7f1d1d" stroke="#ef4444">
        <Label x={415} y={281} text="IMMEDIATE (Red)" size={10} bold fill="#fca5a5" />
      </Box>
      <Box x={30} y={240} w={120} h={32} fill="#450a0a" stroke="#991b1b">
        <Label x={90} y={261} text="EXPECTANT (Black)" size={9} bold fill="#fca5a5" />
      </Box>
      <Label x={90} y={220} text="No resp after" size={9} fill="#64748b" />
      <Label x={90} y={233} text="repositioning" size={9} fill="#64748b" />
    </svg>
  );
}

export function NineLineMEDEVAC() {
  const lines = [
    { n: '1', label: 'Location (Grid)', detail: '8-digit grid coordinate of pickup' },
    { n: '2', label: 'Radio/Callsign', detail: 'Freq + callsign of requesting unit' },
    { n: '3', label: 'Patients by Precedence', detail: 'Urgent/Priority/Routine (count each)' },
    { n: '4', label: 'Special Equipment', detail: 'Hoist, extraction equipment, ventilator' },
    { n: '5', label: 'Patients by Type', detail: 'Litter vs. ambulatory count' },
    { n: '6', label: 'Security at Site', detail: 'No enemy / possible / enemy / escort' },
    { n: '7', label: 'Marking Method', detail: 'Panels / smoke / lights / other' },
    { n: '8', label: 'Patient Nationality', detail: 'US mil / US civ / non-US mil / EPW' },
    { n: '9', label: 'NBC Contamination', detail: 'Nuclear / Biological / Chemical / None' },
  ];
  return (
    <svg viewBox="0 0 520 295" className="w-full max-w-lg mx-auto">
      <rect width="520" height="295" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="9-Line MEDEVAC Request" size={14} bold fill="#f59e0b" />
      {lines.map((l, i) => (
        <g key={i}>
          <rect x={10} y={32 + i * 28} width={500} height={26} rx={3} fill={i % 2 === 0 ? '#1e293b' : '#0f172a'} />
          <rect x={10} y={32 + i * 28} width={24} height={26} rx={3} fill="#1e3a5f" />
          <Label x={22} y={50 + i * 28} text={l.n} size={11} bold fill="#93c5fd" />
          <Label x={42} y={50 + i * 28} text={l.label} size={10} bold fill="#f1f5f9" anchor="start" />
          <Label x={200} y={50 + i * 28} text={l.detail} size={9} fill="#64748b" anchor="start" />
        </g>
      ))}
    </svg>
  );
}

export function RuleOf10Burns() {
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Rule of 10s — Burn Resuscitation" size={13} bold fill="#f59e0b" />
      <Box x={130} y={35} w={260} h={55} fill="#1e293b" stroke="#f59e0b">
        <Label x={260} y={57} text="IV Rate (mL/hr) = %TBSA × 10" size={14} bold fill="#f59e0b" />
        <Label x={260} y={76} text="Lactated Ringer's — for 70-80 kg adult" size={10} fill="#94a3b8" />
      </Box>
      <Box x={20} y={110} w={225} h={100} fill="#1e293b" stroke="#3b82f6">
        <Label x={132} y={130} text="Urine Output Targets" size={11} bold fill="#93c5fd" />
        <Label x={132} y={150} text="Standard: 30-50 mL/hr" size={10} fill="#e2e8f0" />
        <Label x={132} y={168} text="(0.5 mL/kg/hr)" size={10} fill="#94a3b8" />
        <Label x={132} y={188} text="Rhabdo/Electrical:" size={10} fill="#fde68a" />
        <Label x={132} y={204} text="75-100 mL/hr" size={10} fill="#fde68a" />
      </Box>
      <Box x={275} y={110} w={225} h={100} fill="#1e293b" stroke="#22c55e">
        <Label x={387} y={130} text="Adjust Hourly" size={11} bold fill="#86efac" />
        <Label x={387} y={150} text="UO <30 → increase 20%" size={10} fill="#e2e8f0" />
        <Label x={387} y={168} text="UO >50 → decrease 20%" size={10} fill="#e2e8f0" />
        <Label x={387} y={188} text="Fluid creep = risk of" size={10} fill="#fca5a5" />
        <Label x={387} y={204} text="compartment syndrome" size={10} fill="#fca5a5" />
      </Box>
      <Box x={60} y={225} w={400} h={44} fill="#1e293b" stroke="#f59e0b" rx={4}>
        <Label x={260} y={244} text="Example: 35% TBSA burn, 75kg adult" size={11} fill="#fde68a" />
        <Label x={260} y={261} text="35 × 10 = 350 mL/hr LR → monitor UO and adjust" size={10} fill="#94a3b8" />
      </Box>
    </svg>
  );
}

export function AnalgesiaAlgorithm() {
  return (
    <svg viewBox="0 0 520 295" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="295" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="TCCC Analgesia Decision Algorithm" size={13} bold fill="#f59e0b" />
      <Box x={170} y={35} w={180} h={40} fill="#1e293b" stroke="#f59e0b">
        <Label x={260} y={60} text="Pain assessment needed" size={11} fill="#e2e8f0" />
      </Box>
      <Arrow x1={260} y1={75} x2={260} y2={98} />
      <Box x={170} y={98} w={180} h={40} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={260} y={118} text="Hemodynamically stable?" size={11} fill="#93c5fd" />
        <Label x={260} y={132} text="BP OK, alert, RR >12" size={9} fill="#64748b" />
      </Box>
      <Arrow x1={170} y1={118} x2={85} y2={160} color="#22c55e" />
      <Arrow x1={350} y1={118} x2={435} y2={160} color="#ef4444" />
      <Label x={100} y={152} text="YES" size={10} fill="#22c55e" />
      <Label x={415} y={152} text="NO" size={10} fill="#ef4444" />
      <Box x={20} y={160} w={130} h={50} fill="#14532d" stroke="#22c55e">
        <Label x={85} y={178} text="Mild pain" size={10} bold fill="#86efac" />
        <Label x={85} y={194} text="Meloxicam 15mg" size={9} fill="#d1fae5" />
        <Label x={85} y={207} text="PO (CWMP)" size={9} fill="#d1fae5" />
      </Box>
      <Box x={165} y={160} w={130} h={50} fill="#1c3520" stroke="#f59e0b">
        <Label x={230} y={178} text="Mod. pain" size={10} bold fill="#fde68a" />
        <Label x={230} y={194} text="OTFC 800 mcg" size={9} fill="#fef3c7" />
        <Label x={230} y={207} text="(intact airway)" size={9} fill="#fef3c7" />
      </Box>
      <Box x={370} y={160} w={130} h={50} fill="#7f1d1d" stroke="#ef4444">
        <Label x={435} y={178} text="Unstable" size={10} bold fill="#fca5a5" />
        <Label x={435} y={194} text="Ketamine" size={9} fill="#fef2f2" />
        <Label x={435} y={207} text="20-30mg IV" size={9} fill="#fef2f2" />
        <Label x={435} y={220} text="50mg IM" size={9} fill="#fef2f2" />
      </Box>
      <Box x={20} y={230} w={480} h={55} fill="#1e293b" stroke="#7c3aed" rx={4}>
        <Label x={260} y={248} text="OTFC Contraindications: AMS, RR <12, unable to protect airway" size={10} fill="#c4b5fd" />
        <Label x={260} y={265} text="Ketamine: preserves BP + airway reflexes → always safe in tactical settings" size={10} fill="#a5b4fc" />
        <Label x={260} y={280} text="Meloxicam: never give if GI bleed suspected or anticoagulated" size={10} fill="#c4b5fd" />
      </Box>
    </svg>
  );
}

export function GasLawsFlight() {
  return (
    <svg viewBox="0 0 520 285" className="w-full max-w-lg mx-auto">
      <rect width="520" height="285" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Gas Laws in Flight Medicine" size={14} bold fill="#f59e0b" />
      {[
        {
          name: "Boyle's Law", formula: 'P₁V₁ = P₂V₂',
          effect: 'Pressure ↓ at altitude → Gas volume ↑',
          relevance: 'ETT cuff → pneumothorax → sinus air → intracranial air',
          color: '#3b82f6'
        },
        {
          name: "Dalton's Law", formula: 'P_total = ΣP_partial',
          effect: 'P_O₂ falls at altitude (21% stays same)',
          relevance: 'Hypoxic hypoxia → O₂ mandatory for TBI >10,000 ft',
          color: '#22c55e'
        },
        {
          name: "Henry's Law", formula: 'Gas solubility ∝ Pressure',
          effect: 'Rapid pressure drop → dissolved N₂ bubbles',
          relevance: 'Decompression sickness — "the bends"',
          color: '#f59e0b'
        },
      ].map((l, i) => (
        <g key={i}>
          <rect x={15} y={38 + i * 78} width={490} height={70} rx={6} fill="#1e293b" stroke={l.color} strokeWidth="1.5" />
          <Label x={35} y={60 + i * 78} text={l.name} size={13} bold fill={l.color} anchor="start" />
          <rect x={200} y={42 + i * 78} width={170} height={26} rx={4} fill="#0f172a" />
          <Label x={285} y={61 + i * 78} text={l.formula} size={12} bold fill={l.color} />
          <Label x={35} y={78 + i * 78} text={'→ ' + l.effect} size={10} fill="#e2e8f0" anchor="start" />
          <Label x={35} y={96 + i * 78} text={'Clinical: ' + l.relevance} size={9} fill="#94a3b8" anchor="start" />
        </g>
      ))}
    </svg>
  );
}

export const DIAGRAM_VISUALS = {
  'TECC Phases':          TECCPhases,
  'MARCH-PAWS':           MARCHPaws,
  'RTF Integration':      RTFIntegration,
  'Tourniquet Decision':  TourniquetDecision,
  'DCR Flow':             DCRFlow,
  'Lethal Triad':         LethalTriad,
  'Cricothyrotomy Steps': CrichotomySteps,
  'Tension Pneumo':       TensionPneumo,
  'Blast Injury Types':   BlastInjuryTypes,
  'Wound Ballistics':     WoundBallistics,
  'Shock Classes':        ShockClasses,
  'Crush Syndrome Timeline': ShockClasses,
  'SLUDGEM Toxidrome':    SLUDGEMToxidrome,
  'Chemical Agent Types': SLUDGEMToxidrome,
  'K9 Assessment Flow':   K9AssessmentFlow,
  'START Triage':         STARTTriage,
  '9-Line MEDEVAC':       NineLineMEDEVAC,
  'Rule of 10s Burns':    RuleOf10Burns,
  'Analgesia Algorithm':  AnalgesiaAlgorithm,
  'Gas Laws Flight':      GasLawsFlight,
};
