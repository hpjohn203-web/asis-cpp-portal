import React from 'react';

const Box = ({ x, y, w, h, fill = '#1e3a5f', stroke = '#f59e0b', rx = 6, children }) => (
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

export function ESRMModel() {
  const steps = [
    { label: 'Asset Owner identifies assets', sub: 'Business unit leader defines asset value', color: '#f59e0b' },
    { label: 'Security Pro conducts TVRA', sub: 'Threat, Vulnerability & Risk Assessment', color: '#3b82f6' },
    { label: 'Align on risk tolerance', sub: 'Asset owner sets acceptable residual risk', color: '#22c55e' },
    { label: 'Security implements controls', sub: 'Mitigate, transfer, or accept per owner decision', color: '#8b5cf6' },
    { label: 'Asset Owner accepts residual risk', sub: 'Ownership remains with business unit', color: '#ef4444' },
    { label: 'Continuous monitoring', sub: 'Reassess → repeat cycle', color: '#0891b2' },
  ];
  return (
    <svg viewBox="0 0 520 295" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="295" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="ESRM — Risk Ownership Model" size={14} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 40} width={440} height={33} rx={5} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={35 + i * 40} width={8} height={33} rx={3} fill={s.color} />
          <Label x={60} y={50 + i * 40} text={s.label} size={11} bold fill={s.color} anchor="start" />
          <Label x={60} y={63 + i * 40} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={68 + i * 40} x2={260} y2={73 + i * 40} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={285} text="Key principle: Security advises — Asset Owner decides and owns risk" size={10} fill="#64748b" />
    </svg>
  );
}

export function ALECalculation() {
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="ALE Risk Calculation Flow" size={14} bold fill="#f59e0b" />
      <Box x={20} y={38} w={220} h={45} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={130} y={57} text="Asset Value (AV)" size={12} bold fill="#93c5fd" />
        <Label x={130} y={74} text="e.g. $1,000,000 server room" size={9} fill="#64748b" />
      </Box>
      <Box x={280} y={38} w={220} h={45} fill="#1e3a5f" stroke="#8b5cf6">
        <Label x={390} y={57} text="Exposure Factor (EF)" size={12} bold fill="#c4b5fd" />
        <Label x={390} y={74} text="e.g. 0.40 for fire damage" size={9} fill="#64748b" />
      </Box>
      <Arrow x1={130} y1={83} x2={210} y2={118} color="#f59e0b" />
      <Arrow x1={390} y1={83} x2={310} y2={118} color="#f59e0b" />
      <Box x={150} y={118} w={220} h={45} fill="#713f12" stroke="#f59e0b">
        <Label x={260} y={135} text="SLE = AV × EF" size={13} bold fill="#f59e0b" />
        <Label x={260} y={152} text="$1M × 0.40 = $400,000" size={10} fill="#fef3c7" />
      </Box>
      <Box x={20} y={185} w={220} h={45} fill="#14532d" stroke="#22c55e">
        <Label x={130} y={204} text="ARO (Annualized Rate)" size={11} bold fill="#86efac" />
        <Label x={130} y={221} text="e.g. 0.10 (once/10 yrs)" size={9} fill="#64748b" />
      </Box>
      <Arrow x1={150} y1={163} x2={130} y2={183} color="#f59e0b" />
      <Arrow x1={370} y1={163} x2={390} y2={183} color="#f59e0b" />
      <Box x={280} y={185} w={220} h={45} fill="#1c3520" stroke="#22c55e">
        <Label x={390} y={204} text="ALE = SLE × ARO" size={12} bold fill="#86efac" />
        <Label x={390} y={221} text="$400,000 × 0.10 = $40,000/yr" size={9} fill="#d1fae5" />
      </Box>
      <Label x={260} y={258} text="If control costs $15K/yr and reduces ALE to $10K → ROSI = 100%" size={10} fill="#94a3b8" />
    </svg>
  );
}

export function RiskTreatmentMatrix() {
  return (
    <svg viewBox="0 0 520 290" className="w-full max-w-lg mx-auto">
      <rect width="520" height="290" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Risk Treatment Decision Matrix" size={14} bold fill="#f59e0b" />
      <Label x={260} y={42} text="Likelihood →" size={10} fill="#64748b" />
      <Label x={30} y={170} text="Impact" size={10} fill="#64748b" />
      <Label x={30} y={182} text="↑" size={10} fill="#64748b" />
      <rect x={80} y={55} width={200} height={100} rx={4} fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
      <Label x={180} y={95} text="HIGH IMPACT" size={11} bold fill="#fca5a5" />
      <Label x={180} y={112} text="LOW LIKELIHOOD" size={10} fill="#fca5a5" />
      <Label x={180} y={130} text="→ TRANSFER (Insure)" size={10} bold fill="#f59e0b" />
      <rect x={290} y={55} width={200} height={100} rx={4} fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
      <Label x={390} y={95} text="HIGH IMPACT" size={11} bold fill="#fca5a5" />
      <Label x={390} y={112} text="HIGH LIKELIHOOD" size={10} fill="#fca5a5" />
      <Label x={390} y={130} text="→ MITIGATE (Priority)" size={10} bold fill="#ef4444" />
      <rect x={80} y={165} width={200} height={100} rx={4} fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
      <Label x={180} y={205} text="LOW IMPACT" size={11} bold fill="#94a3b8" />
      <Label x={180} y={222} text="LOW LIKELIHOOD" size={10} fill="#94a3b8" />
      <Label x={180} y={240} text="→ ACCEPT (Monitor)" size={10} bold fill="#64748b" />
      <rect x={290} y={165} width={200} height={100} rx={4} fill="#1c3520" stroke="#22c55e" strokeWidth="1.5" />
      <Label x={390} y={205} text="LOW IMPACT" size={11} bold fill="#86efac" />
      <Label x={390} y={222} text="HIGH LIKELIHOOD" size={10} fill="#86efac" />
      <Label x={390} y={240} text="→ MITIGATE/ACCEPT" size={10} bold fill="#22c55e" />
      <Label x={260} y={278} text="4th option: AVOID — eliminate the risk-creating activity entirely" size={10} fill="#64748b" />
    </svg>
  );
}

export function TVRAProcess() {
  const steps = [
    { n: '1', label: 'Asset Inventory & Valuation', sub: 'Identify assets, assign AV and criticality', color: '#3b82f6' },
    { n: '2', label: 'Threat Identification', sub: 'Natural, human accidental, human intentional', color: '#ef4444' },
    { n: '3', label: 'Vulnerability Assessment', sub: 'Gaps in current controls per threat', color: '#f59e0b' },
    { n: '4', label: 'Risk Scoring', sub: 'Likelihood × Consequence per asset/threat pair', color: '#8b5cf6' },
    { n: '5', label: 'Control Recommendations', sub: 'Prioritize by risk score and cost-benefit', color: '#22c55e' },
  ];
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="TVRA Process Flow" size={14} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 44} width={440} height={37} rx={5} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <circle cx={68} cy={53 + i * 44} r={14} fill={s.color} />
          <Label x={68} y={58 + i * 44} text={s.n} size={13} bold fill="#fff" />
          <Label x={92} y={50 + i * 44} text={s.label} size={11} bold fill={s.color} anchor="start" />
          <Label x={92} y={64 + i * 44} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
          {i < 4 && <Arrow x1={260} y1={72 + i * 44} x2={260} y2={77 + i * 44} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={265} text="Output: Prioritized risk register with treatment plans and risk owners" size={10} fill="#64748b" />
    </svg>
  );
}

export function CARVERMatrix() {
  const items = [
    { l: 'C', word: 'Criticality', sub: 'Mission impact if attacked', score: 9 },
    { l: 'A', word: 'Accessibility', sub: 'Ease of physical access', score: 7 },
    { l: 'R', word: 'Recuperability', sub: 'Recovery time after attack', score: 8 },
    { l: 'V', word: 'Vulnerability', sub: 'Susceptibility given defenses', score: 6 },
    { l: 'E', word: 'Effect', sub: 'Collateral / secondary damage', score: 9 },
    { l: 'R', word: 'Recognizability', sub: 'Ease of target identification', score: 7 },
  ];
  return (
    <svg viewBox="0 0 520 285" className="w-full max-w-lg mx-auto">
      <rect width="520" height="285" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="CARVER Matrix — Target Vulnerability Analysis" size={13} bold fill="#f59e0b" />
      {items.map((s, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i < 3 ? i : i - 3;
        const x = col === 0 ? 15 : 268;
        const y = 38 + row * 74;
        const barW = s.score * 18;
        return (
          <g key={i}>
            <rect x={x} y={y} width={238} height={64} rx={5} fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x={x} y={y} width={36} height={64} rx={5} fill="#f59e0b" />
            <Label x={x + 18} y={y + 38} text={s.l} size={18} bold fill="#0f172a" />
            <Label x={x + 44} y={y + 20} text={s.word} size={11} bold fill="#f1f5f9" anchor="start" />
            <Label x={x + 44} y={y + 35} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
            <rect x={x + 44} y={y + 44} width={barW} height={8} rx={3} fill="#f59e0b" opacity="0.6" />
            <Label x={x + 44 + barW + 4} y={y + 52} text={`${s.score}/10`} size={9} fill="#fde68a" anchor="start" />
          </g>
        );
      })}
      <Label x={260} y={275} text="Example total: 46/60 — High Priority target requiring enhanced protection" size={10} fill="#64748b" />
    </svg>
  );
}

export function RiskRegister() {
  const cols = ['Risk ID', 'Category', 'Likelihood', 'Impact', 'Score', 'Owner', 'Treatment'];
  const rows = [
    ['R-001', 'Physical', '4', '4', '16', 'Ops VP', 'Mitigate'],
    ['R-002', 'Cyber', '3', '5', '15', 'CISO', 'Transfer'],
    ['R-003', 'Personnel', '2', '3', '6', 'HR Dir', 'Accept'],
    ['R-004', 'Legal', '2', '4', '8', 'Legal', 'Mitigate'],
  ];
  const scoreColor = (s) => s >= 15 ? '#ef4444' : s >= 8 ? '#f59e0b' : '#22c55e';
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Risk Register — Sample Structure" size={14} bold fill="#f59e0b" />
      {cols.map((c, i) => {
        const xs = [15, 75, 155, 225, 295, 345, 420];
        return <text key={i} x={xs[i]} y={42} fontSize={9} fill="#64748b" fontFamily="system-ui" fontWeight="bold">{c}</text>;
      })}
      <rect x={10} y={46} width={500} height={1} fill="#334155" />
      {rows.map((r, i) => {
        const xs = [15, 75, 155, 225, 295, 345, 420];
        const score = parseInt(r[4]);
        return (
          <g key={i}>
            <rect x={10} y={52 + i * 48} width={500} height={42} rx={3} fill={i % 2 === 0 ? '#1e293b' : '#0f172a'} />
            {r.map((cell, j) => (
              <text key={j} x={xs[j]} y={78 + i * 48} fontSize={10} fill={j === 4 ? scoreColor(score) : '#e2e8f0'} fontFamily="system-ui" fontWeight={j === 4 ? 'bold' : 'normal'}>{cell}</text>
            ))}
          </g>
        );
      })}
      <Label x={260} y={258} text="Risk Score = Likelihood (1–5) × Impact (1–5) | Red ≥15, Amber 8–14, Green <8" size={9} fill="#64748b" />
    </svg>
  );
}

export function DefenseInDepth() {
  const layers = [
    { label: 'Perimeter / Clear Zone', sub: 'Fence, lighting, PIDS, vehicle barriers', r: 240, color: '#ef4444' },
    { label: 'Building Exterior', sub: 'Hardened doors, vehicle control', r: 190, color: '#f59e0b' },
    { label: 'Building Entry / Lobby', sub: 'Mantrap, reception, visitor mgmt', r: 140, color: '#eab308' },
    { label: 'Interior Access Zones', sub: 'Card + PIN, biometrics, CCTV', r: 90, color: '#22c55e' },
    { label: 'Asset Vault / Server Room', sub: 'Biometric + cipher lock, alarm', r: 40, color: '#3b82f6' },
  ];
  return (
    <svg viewBox="0 0 520 295" className="w-full max-w-lg mx-auto">
      <rect width="520" height="295" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Defense in Depth — Concentric Rings" size={14} bold fill="#f59e0b" />
      {layers.map((l, i) => (
        <g key={i}>
          <circle cx={200} cy={165} r={l.r} fill="none" stroke={l.color} strokeWidth="1.5" opacity="0.6" strokeDasharray={i === 0 ? '1' : '4,3'} />
        </g>
      ))}
      <circle cx={200} cy={165} r={40} fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" />
      <Label x={200} y={162} text="ASSET" size={9} bold fill="#93c5fd" />
      <Label x={200} y={175} text="VAULT" size={9} bold fill="#93c5fd" />
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={320} y={55 + i * 46} width={185} height={38} rx={4} fill="#1e293b" stroke={l.color} strokeWidth="1" />
          <rect x={320} y={55 + i * 46} width={6} height={38} fill={l.color} />
          <text x={334} y={71 + i * 46} fontSize={10} fill={l.color} fontWeight="bold" fontFamily="system-ui">{l.label}</text>
          <text x={334} y={84 + i * 46} fontSize={8} fill="#64748b" fontFamily="system-ui">{l.sub}</text>
        </g>
      ))}
    </svg>
  );
}

export function CPTEDCampus() {
  return (
    <svg viewBox="0 0 520 285" className="w-full max-w-lg mx-auto">
      <rect width="520" height="285" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="CPTED — Three Core Principles" size={14} bold fill="#f59e0b" />
      {[
        { title: 'Natural Surveillance', color: '#3b82f6', items: ['Open sightlines — no hiding spots', 'Lighting at entrances and paths', 'Windows facing parking/common areas', 'Trimmed shrubs <3ft, trees >7ft'] },
        { title: 'Natural Access Control', color: '#22c55e', items: ['Single defined entry/exit path', 'Landscaping channels movement', 'Wayfinding signs direct visitors', 'Fencing deters unintended access'] },
        { title: 'Territorial Reinforcement', color: '#f59e0b', items: ['Signage defines ownership', 'Pavement changes mark transitions', 'Maintained space signals ownership', 'Clearly marked visitor vs staff areas'] },
      ].map((p, i) => (
        <g key={i}>
          <rect x={10 + i * 170} y={38} width={158} height={230} rx={6} fill="#1e293b" stroke={p.color} strokeWidth="1.5" />
          <rect x={10 + i * 170} y={38} width={158} height={28} rx={6} fill={p.color} />
          <Label x={89 + i * 170} y={57} text={p.title} size={10} bold fill="#0f172a" />
          {p.items.map((item, j) => (
            <text key={j} x={20 + i * 170} y={88 + j * 38} fontSize={9} fill="#e2e8f0" fontFamily="system-ui" dominantBaseline="middle">{'• ' + item}</text>
          ))}
        </g>
      ))}
      <Label x={260} y={278} text="CPTED works best combined — no single principle is sufficient alone" size={10} fill="#64748b" />
    </svg>
  );
}

export function AccessControlArch() {
  const nodes = [
    { x: 30, y: 110, label: 'Card/PIN', sub: 'Credential', color: '#3b82f6' },
    { x: 30, y: 175, label: 'Biometric', sub: 'Reader', color: '#8b5cf6' },
    { x: 160, y: 140, label: 'Door\nController', sub: 'Panel', color: '#f59e0b' },
    { x: 290, y: 110, label: 'Access\nControl', sub: 'Server', color: '#22c55e' },
    { x: 290, y: 175, label: 'Event\nLog / SIEM', sub: 'Integration', color: '#0891b2' },
    { x: 420, y: 110, label: 'Alarm\nMonitor', sub: 'SOC', color: '#ef4444' },
    { x: 420, y: 175, label: 'Door\nHardware', sub: 'Strike/Mag', color: '#64748b' },
  ];
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Access Control System Architecture" size={13} bold fill="#f59e0b" />
      <line x1={90} y1={120} x2={155} y2={148} stroke="#3b82f6" strokeWidth="1.5" />
      <line x1={90} y1={185} x2={155} y2={158} stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1={225} y1={148} x2={285} y2={120} stroke="#f59e0b" strokeWidth="1.5" />
      <line x1={225} y1={155} x2={285} y2={180} stroke="#f59e0b" strokeWidth="1.5" />
      <line x1={355} y1={120} x2={415} y2={120} stroke="#22c55e" strokeWidth="1.5" />
      <line x1={355} y1={175} x2={415} y2={175} stroke="#0891b2" strokeWidth="1.5" />
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={65} height={44} rx={5} fill="#1e293b" stroke={n.color} strokeWidth="1.5" />
          <Label x={n.x + 32} y={n.y + 17} text={n.label} size={9} bold fill={n.color} />
          <Label x={n.x + 32} y={n.y + 34} text={n.sub} size={8} fill="#64748b" />
        </g>
      ))}
      <rect x={10} y={230} width={500} height={38} rx={5} fill="#1e293b" stroke="#334155" />
      <Label x={260} y={247} text="Credential types: HID card, smart card, PIN, fingerprint, iris, face, mobile BLE" size={10} fill="#94a3b8" />
      <Label x={260} y={262} text="High security: dual authentication (card + biometric). FIDO2 for logical access." size={10} fill="#94a3b8" />
    </svg>
  );
}

export function BiometricFARFRR() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Biometric Performance — FAR vs FRR" size={14} bold fill="#f59e0b" />
      <line x1={60} y1={40} x2={60} y2={220} stroke="#334155" strokeWidth="1.5" />
      <line x1={60} y1={220} x2={480} y2={220} stroke="#334155" strokeWidth="1.5" />
      <Label x={270} y={240} text="Sensitivity Threshold →" size={10} fill="#64748b" />
      <Label x={25} y={130} text="%" size={10} fill="#64748b" />
      {[0, 25, 50, 75, 100].map((v, i) => (
        <g key={i}>
          <line x1={55} y1={40 + i * 45} x2={480} y2={40 + i * 45} stroke="#1e293b" strokeWidth="1" />
          <text x={48} y={44 + i * 45} fontSize={8} fill="#475569" textAnchor="end" fontFamily="system-ui">{100 - v * 1}%</text>
        </g>
      ))}
      <polyline points="60,220 120,215 180,205 240,185 300,155 360,115 420,70 480,40" fill="none" stroke="#ef4444" strokeWidth="2.5" />
      <polyline points="60,40 120,70 180,110 240,148 300,173 360,195 420,210 480,218" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx={280} cy={163} r={7} fill="#f59e0b" stroke="#f59e0b" />
      <line x1={280} y1={40} x2={280} y2={220} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
      <Label x={310} y={155} text="CER (EER)" size={10} bold fill="#f59e0b" anchor="start" />
      <Label x={310} y={168} text="FAR = FRR" size={9} fill="#fde68a" anchor="start" />
      <Label x={100} y={65} text="FAR (False Accept)" size={10} bold fill="#ef4444" anchor="start" />
      <Label x={300} y={195} text="FRR (False Reject)" size={10} bold fill="#3b82f6" anchor="start" />
      <Label x={260} y={258} text="Lower CER = better accuracy. High security = lower FAR (move threshold right)" size={10} fill="#64748b" />
    </svg>
  );
}

export function PerimeterLighting() {
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Perimeter Lighting Design Principles" size={13} bold fill="#f59e0b" />
      {[
        { zone: 'Fence Line (Glare Projection)', fc: '2 fc minimum', desc: 'Light projected outward — intruder blinded, responders in shadow', color: '#f59e0b' },
        { zone: 'Entry Points / Gates', fc: '5 fc minimum', desc: 'High illumination for camera color rendition and guard inspection', color: '#22c55e' },
        { zone: 'Parking Areas', fc: '1–2 fc', desc: 'Uniform coverage, avoid deep shadows between vehicles', color: '#3b82f6' },
        { zone: 'Building Perimeter', fc: '2–5 fc', desc: 'Even wash on building face — supports CCTV identification', color: '#8b5cf6' },
        { zone: 'Clear Zone Interior', fc: '0.5 fc min', desc: 'Detect movement on facility side of fence', color: '#0891b2' },
      ].map((z, i) => (
        <g key={i}>
          <rect x={10} y={38 + i * 44} width={500} height={38} rx={4} fill={i % 2 === 0 ? '#1e293b' : '#0f172a'} stroke={z.color} strokeWidth="1" />
          <rect x={10} y={38 + i * 44} width={6} height={38} fill={z.color} />
          <text x={25} y={54 + i * 44} fontSize={10} fill={z.color} fontWeight="bold" fontFamily="system-ui">{z.zone}</text>
          <text x={25} y={68 + i * 44} fontSize={9} fill="#94a3b8" fontFamily="system-ui">{z.desc} | {z.fc}</text>
        </g>
      ))}
      <rect x={10} y={262} width={500} height={10} fill="none" />
      <Label x={260} y={270} text="LED preferred (CRI 80+). Avoid LPS (CRI ~0 — cameras see only grayscale)" size={9} fill="#64748b" />
    </svg>
  );
}

export function MantrapoSequence() {
  const steps = [
    { label: 'Person approaches outer door', color: '#64748b' },
    { label: 'Outer door opens — person enters airlock', color: '#3b82f6' },
    { label: 'Outer door closes and locks', color: '#f59e0b' },
    { label: 'Person authenticates at inner reader', color: '#8b5cf6' },
    { label: 'Access granted: inner door opens', color: '#22c55e' },
    { label: 'Person enters secure area', color: '#22c55e' },
  ];
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Mantrap / Airlock — Operation Sequence" size={13} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 38} width={440} height={31} rx={5} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={35 + i * 38} width={28} height={31} rx={4} fill={s.color} />
          <Label x={54} y={55 + i * 38} text={`${i + 1}`} size={12} bold fill="#0f172a" />
          <Label x={80} y={55 + i * 38} text={s.label} size={11} fill="#f1f5f9" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={66 + i * 38} x2={260} y2={73 + i * 38} color="#475569" />}
        </g>
      ))}
      <rect x={10} y={263} width={500} height={12} fill="none" />
      <Label x={260} y={272} text="Tailgate/piggybacking detected → both doors lock + alarm. Throughput: 1–2 ppm." size={9} fill="#ef4444" />
    </svg>
  );
}

export function CCTVCoverage() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="CCTV Coverage — Key Design Factors" size={13} bold fill="#f59e0b" />
      {[
        { factor: 'Field of View', detail: 'Wide lens (4mm) = large area, less detail | Telephoto (25mm) = narrow, high detail', color: '#3b82f6' },
        { factor: 'Overlap Zones', detail: 'Adjacent cameras should overlap 10–15% — eliminates blind spots at edges', color: '#22c55e' },
        { factor: 'Mounting Height', detail: '8–12 ft ideal: captures face at entry angle. Higher = wide area but loses detail.', color: '#f59e0b' },
        { factor: 'Lighting for CCTV', detail: 'LED (CRI 80+) required for color ID. IR illuminators for night — may need separate zone', color: '#8b5cf6' },
        { factor: 'PTZ vs Fixed', detail: 'Fixed: reliable 24/7 coverage. PTZ: flexible response but misses coverage when panned away.', color: '#ef4444' },
      ].map((f, i) => (
        <g key={i}>
          <rect x={10} y={38 + i * 44} width={500} height={38} rx={4} fill={i % 2 === 0 ? '#1e293b' : '#0f172a'} />
          <rect x={10} y={38 + i * 44} width={6} height={38} fill={f.color} />
          <text x={24} y={54 + i * 44} fontSize={10} fill={f.color} fontWeight="bold" fontFamily="system-ui">{f.factor}</text>
          <text x={24} y={68 + i * 44} fontSize={9} fill="#94a3b8" fontFamily="system-ui">{f.detail}</text>
        </g>
      ))}
      <Label x={260} y={262} text="Dead zone = area not visible to any camera. Requires additional camera, mirror, or guard." size={9} fill="#64748b" />
    </svg>
  );
}

export function VehicleBarriers() {
  const barriers = [
    { rating: 'K4 / ASTM M30', desc: '15,000 lb vehicle at 30 mph', use: 'Low-speed access control', color: '#22c55e' },
    { rating: 'K8 / ASTM M40', desc: '15,000 lb vehicle at 40 mph', use: 'Standard perimeter protection', color: '#f59e0b' },
    { rating: 'K12 / ASTM M50', desc: '15,000 lb vehicle at 50 mph', use: 'High-security facilities', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Vehicle Barrier Classifications (DoS K-Rating)" size={13} bold fill="#f59e0b" />
      {barriers.map((b, i) => (
        <g key={i}>
          <rect x={20} y={40 + i * 65} width={480} height={55} rx={6} fill="#1e293b" stroke={b.color} strokeWidth="2" />
          <rect x={20} y={40 + i * 65} width={100} height={55} rx={6} fill={b.color} opacity="0.2" />
          <Label x={70} y={66 + i * 65} text={b.rating} size={12} bold fill={b.color} />
          <Label x={70} y={83 + i * 65} text="Stops:" size={9} fill="#64748b" />
          <Label x={180} y={66 + i * 65} text={b.desc} size={11} fill="#f1f5f9" anchor="start" />
          <Label x={180} y={83 + i * 65} text={`Use: ${b.use}`} size={9} fill="#94a3b8" anchor="start" />
        </g>
      ))}
      <rect x={20} y={240} width={480} height={22} rx={4} fill="#1e293b" stroke="#334155" />
      <Label x={260} y={255} text="Types: surface-mount bollards | wedge barriers | cable barriers | berms | planters (aesthetic)" size={9} fill="#94a3b8" />
    </svg>
  );
}

export function ChainOfCustody() {
  const steps = [
    { label: 'Scene Discovery', sub: 'Photograph in place before touching', color: '#3b82f6' },
    { label: 'Collection & Packaging', sub: 'Gloves, evidence bag, seal, label (date/time/collector)', color: '#22c55e' },
    { label: 'Tagging & Logging', sub: 'Assign unique evidence number, log in register', color: '#f59e0b' },
    { label: 'Secure Storage', sub: 'Locked evidence room — access restricted and logged', color: '#8b5cf6' },
    { label: 'Transfer (Each Handoff)', sub: 'Signature from releasing and receiving parties + date/time', color: '#ef4444' },
    { label: 'Forensic Examination', sub: 'Work on forensic copy only — original preserved', color: '#0891b2' },
    { label: 'Court Presentation', sub: 'Chain intact → admissible. Any gap = inadmissibility risk.', color: '#f59e0b' },
  ];
  return (
    <svg viewBox="0 0 520 298" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="298" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Chain of Custody — Documentation Flow" size={13} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={32 + i * 36} width={440} height={30} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={32 + i * 36} width={6} height={30} fill={s.color} />
          <Label x={56} y={44 + i * 36} text={s.label} size={10} bold fill={s.color} anchor="start" />
          <Label x={56} y={57 + i * 36} text={s.sub} size={8} fill="#94a3b8" anchor="start" />
          {i < 6 && <Arrow x1={260} y1={62 + i * 36} x2={260} y2={70 + i * 36} color="#475569" />}
        </g>
      ))}
    </svg>
  );
}

export function WZvsReid() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="WZ vs Reid Interview Technique" size={14} bold fill="#f59e0b" />
      <rect x={10} y={35} width={245} height={220} rx={6} fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x={265} y={35} width={245} height={220} rx={6} fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
      <Label x={132} y={55} text="REID TECHNIQUE" size={12} bold fill="#3b82f6" />
      <Label x={387} y={55} text="WZ METHOD" size={12} bold fill="#22c55e" />
      {[
        ['Confrontational', 'Non-confrontational'],
        ['Direct accusation early', 'No direct accusation'],
        ['9-step interrogation', 'Participatory approach'],
        ['Denial mitigation', 'Rationalization used'],
        ['High false confession risk', 'Lower coercion risk'],
        ['BAI behavioral analysis', 'Rapport-first model'],
        ['Police interrogation roots', 'Corporate investigation focus'],
      ].map(([r, w], i) => (
        <g key={i}>
          <text x={22} y={78 + i * 24} fontSize={9} fill="#93c5fd" fontFamily="system-ui">{'• ' + r}</text>
          <text x={278} y={78 + i * 24} fontSize={9} fill="#86efac" fontFamily="system-ui">{'• ' + w}</text>
        </g>
      ))}
      <Label x={260} y={263} text="CPP exam: WZ = non-confrontational, no accusation, rationalization → admission" size={9} fill="#64748b" />
    </svg>
  );
}

export function InvestigationProcess() {
  const steps = [
    { n: '1', label: 'Allegation Receipt', sub: 'Document complaint — who, what, when, where', color: '#3b82f6' },
    { n: '2', label: 'Preliminary Assessment', sub: 'Assess credibility, scope, legal/HR notification', color: '#f59e0b' },
    { n: '3', label: 'Authorization & Scope', sub: 'Management approval, legal counsel briefing', color: '#22c55e' },
    { n: '4', label: 'Evidence Collection', sub: 'Documents, digital, CCTV, access logs', color: '#8b5cf6' },
    { n: '5', label: 'Witness Interviews', sub: 'Chronological: peripheral witnesses first', color: '#0891b2' },
    { n: '6', label: 'Analysis & Findings', sub: 'Corroborate, identify contradictions, draw conclusions', color: '#f59e0b' },
    { n: '7', label: 'Investigation Report', sub: 'Facts only — no opinions unless qualified', color: '#ef4444' },
    { n: '8', label: 'Management Action', sub: 'Discipline, recovery, policy update, referral', color: '#22c55e' },
  ];
  return (
    <svg viewBox="0 0 520 298" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="298" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Internal Investigation Process Map" size={13} bold fill="#f59e0b" />
      {steps.map((s, i) => {
        const col = i < 4 ? 0 : 1;
        const row = i < 4 ? i : i - 4;
        const x = col === 0 ? 15 : 268;
        const y = 35 + row * 62;
        return (
          <g key={i}>
            <rect x={x} y={y} width={238} height={53} rx={5} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
            <circle cx={x + 20} cy={y + 18} r={13} fill={s.color} />
            <Label x={x + 20} y={y + 23} text={s.n} size={12} bold fill="#0f172a" />
            <Label x={x + 42} y={y + 20} text={s.label} size={10} bold fill={s.color} anchor="start" />
            <Label x={x + 42} y={y + 35} text={s.sub} size={8} fill="#94a3b8" anchor="start" />
          </g>
        );
      })}
    </svg>
  );
}

export function DigitalForensics() {
  const steps = [
    { label: 'Legal Hold / Preservation', sub: 'Preserve all relevant ESI — notify custodians', color: '#3b82f6' },
    { label: 'Acquisition', sub: 'Forensic image (bit-for-bit) + MD5/SHA-256 hash verification', color: '#f59e0b' },
    { label: 'Analysis', sub: 'Deleted files, metadata, logs, browser history, email headers', color: '#8b5cf6' },
    { label: 'Documentation', sub: 'Every action logged with timestamp and analyst name', color: '#22c55e' },
    { label: 'Review & Reporting', sub: 'Findings documented — facts only, no speculation', color: '#0891b2' },
    { label: 'Production', sub: 'Deliver evidence with chain of custody intact to counsel', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Digital Forensics Workflow" size={14} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 38} width={440} height={32} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={35 + i * 38} width={6} height={32} fill={s.color} />
          <Label x={56} y={47 + i * 38} text={s.label} size={11} bold fill={s.color} anchor="start" />
          <Label x={56} y={61 + i * 38} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={67 + i * 38} x2={260} y2={73 + i * 38} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={270} text="NEVER work on original — always on forensic copy. Hash mismatch = evidence contaminated." size={9} fill="#ef4444" />
    </svg>
  );
}

export function CPIRModel() {
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Critical Pathway to Insider Risk (CPIR)" size={13} bold fill="#f59e0b" />
      <Box x={20} y={38} w={220} h={65} fill="#1e293b" stroke="#8b5cf6">
        <Label x={130} y={58} text="Predisposing Conditions" size={11} bold fill="#c4b5fd" />
        <Label x={130} y={74} text="Personality traits, grievances," size={9} fill="#a5b4fc" />
        <Label x={130} y={87} text="financial stress, radicalization" size={9} fill="#a5b4fc" />
      </Box>
      <Box x={280} y={38} w={220} h={65} fill="#1e293b" stroke="#f59e0b">
        <Label x={390} y={58} text="Stressors / Triggers" size={11} bold fill="#fde68a" />
        <Label x={390} y={74} text="Job loss, demotion, divorce," size={9} fill="#fef3c7" />
        <Label x={390} y={87} text="debt, disciplinary action" size={9} fill="#fef3c7" />
      </Box>
      <Arrow x1={240} y1={70} x2={278} y2={70} color="#f59e0b" />
      <Arrow x1={260} y1={103} x2={260} y2={123} color="#f59e0b" />
      <Box x={120} y={123} w={280} h={55} fill="#7f1d1d" stroke="#ef4444">
        <Label x={260} y={143} text="Concerning Behaviors" size={12} bold fill="#fca5a5" />
        <Label x={260} y={159} text="Policy violations, access anomalies, behavioral changes" size={9} fill="#fef2f2" />
        <Label x={260} y={172} text="Unusual hours, data exfiltration signs, verbal threats" size={9} fill="#fef2f2" />
      </Box>
      <Arrow x1={260} y1={178} x2={260} y2={200} color="#ef4444" />
      <Box x={150} y={200} w={220} h={55} fill="#450a0a" stroke="#dc2626">
        <Label x={260} y={220} text="MALICIOUS ACT" size={14} bold fill="#ef4444" />
        <Label x={260} y={238} text="Theft | Sabotage | Espionage | Fraud" size={10} fill="#fca5a5" />
      </Box>
      <rect x={390} y={123} width={120} height={55} rx={5} fill="#1c3520" stroke="#22c55e" strokeWidth="1.5" />
      <Label x={450} y={143} text="INTERVENE" size={11} bold fill="#86efac" />
      <Label x={450} y={158} text="EAP referral" size={9} fill="#d1fae5" />
      <Label x={450} y={170} text="HR action" size={9} fill="#d1fae5" />
      <Arrow x1={400} y1={150} x2={400} y2={150} color="#22c55e" />
      <line x1={400} y1={150} x2={398} y2={150} stroke="#22c55e" strokeWidth="1.5" />
      <Label x={260} y={270} text="Early detection at 'concerning behaviors' stage prevents escalation to attack" size={10} fill="#64748b" />
    </svg>
  );
}

export function FCRAAdverseAction() {
  const steps = [
    { n: '1', label: 'Obtain written consent', sub: 'FCRA-compliant authorization form before ordering report', color: '#3b82f6' },
    { n: '2', label: 'Background check completed', sub: 'Consumer Reporting Agency (CRA) delivers report', color: '#64748b' },
    { n: '3', label: 'Adverse information found', sub: 'Criminal record, credit issue, or other disqualifying factor', color: '#f59e0b' },
    { n: '4', label: 'Pre-Adverse Action Notice', sub: 'Send report copy + "Summary of Rights Under FCRA" BEFORE deciding', color: '#ef4444' },
    { n: '5', label: 'Wait reasonable period (3–5 days)', sub: 'Allow applicant to dispute inaccuracies with CRA', color: '#8b5cf6' },
    { n: '6', label: 'Final Adverse Action Notice', sub: 'Include CRA name/contact + statement CRA did not make decision', color: '#22c55e' },
  ];
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="FCRA Adverse Action Process" size={14} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 38} width={440} height={32} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <circle cx={58} cy={51 + i * 38} r={12} fill={s.color} />
          <Label x={58} y={55 + i * 38} text={s.n} size={11} bold fill="#0f172a" />
          <Label x={80} y={47 + i * 38} text={s.label} size={10} bold fill={s.color} anchor="start" />
          <Label x={80} y={61 + i * 38} text={s.sub} size={8} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={67 + i * 38} x2={260} y2={73 + i * 38} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={272} text="Skipping pre-adverse notice = FCRA violation. CRA did not make the decision — employer did." size={9} fill="#ef4444" />
    </svg>
  );
}

export function ClearanceAdjudication() {
  const guidelines = [
    'Allegiance to the US', 'Foreign Influence', 'Foreign Preference', 'Sexual Behavior',
    'Personal Conduct', 'Financial Issues', 'Alcohol Consumption', 'Drug Involvement',
    'Psychological Conditions', 'Criminal Conduct', 'Security Violations', 'Outside Activities', 'IT System Misuse',
  ];
  return (
    <svg viewBox="0 0 520 285" className="w-full max-w-lg mx-auto">
      <rect width="520" height="285" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Security Clearance — 13 Adjudicative Guidelines" size={12} bold fill="#f59e0b" />
      {guidelines.map((g, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 15 : 268;
        const y = 35 + row * 38;
        return (
          <g key={i}>
            <rect x={x} y={y} width={238} height={30} rx={4} fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <rect x={x} y={y} width={22} height={30} fill="#f59e0b" opacity="0.2" />
            <text x={x + 11} y={y + 20} textAnchor="middle" fontSize={10} fill="#f59e0b" fontWeight="bold" fontFamily="system-ui">{i + 1}</text>
            <text x={x + 32} y={y + 20} fontSize={9} fill="#e2e8f0" fontFamily="system-ui">{g}</text>
          </g>
        );
      })}
      <Label x={260} y={275} text="Each guideline has mitigating AND aggravating conditions — whole-person evaluation" size={9} fill="#64748b" />
    </svg>
  );
}

export function DataClassification() {
  const levels = [
    { level: 'PUBLIC', desc: 'Freely shareable — press releases, public website, marketing', color: '#22c55e', y: 228, w: 480 },
    { level: 'INTERNAL USE ONLY', desc: 'Employees only — internal policies, org charts, directories', color: '#3b82f6', y: 178, w: 380 },
    { level: 'CONFIDENTIAL', desc: 'Need-to-know — financial data, client info, contracts. Encrypt at rest.', color: '#f59e0b', y: 128, w: 280 },
    { level: 'RESTRICTED / SECRET', desc: 'Strictest controls — trade secrets, classified, medical/legal. MFA + encryption.', color: '#ef4444', y: 78, w: 180 },
  ];
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Data Classification Pyramid" size={14} bold fill="#f59e0b" />
      {levels.map((l, i) => (
        <g key={i}>
          <rect x={(520 - l.w) / 2} y={l.y} width={l.w} height={44} rx={4} fill="#1e293b" stroke={l.color} strokeWidth="2" />
          <Label x={260} y={l.y + 17} text={l.level} size={11} bold fill={l.color} />
          <Label x={260} y={l.y + 32} text={l.desc} size={8} fill="#94a3b8" />
        </g>
      ))}
      <Label x={260} y={265} text="Classification drives: access controls, encryption, labeling, disposal, and audit requirements" size={9} fill="#64748b" />
    </svg>
  );
}

export function ZeroTrustArch() {
  const pillars = [
    { label: 'Identity', sub: 'MFA every session\nFIDO2 / SSO', color: '#8b5cf6' },
    { label: 'Device', sub: 'Posture check\nMDM compliance', color: '#3b82f6' },
    { label: 'Network', sub: 'Micro-segmentation\nSDN / ZTNA', color: '#0891b2' },
    { label: 'Application', sub: 'Least-privilege\nApp-level auth', color: '#22c55e' },
    { label: 'Data', sub: 'Classify + encrypt\nDLP monitoring', color: '#f59e0b' },
  ];
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Zero Trust Architecture" size={14} bold fill="#f59e0b" />
      <rect x={20} y={35} width={480} height={30} rx={5} fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5" />
      <Label x={260} y={55} text='"Never Trust, Always Verify" — Continuous verification at every layer' size={11} bold fill="#f59e0b" />
      {pillars.map((p, i) => (
        <g key={i}>
          <rect x={16 + i * 98} y={78} width={88} height={130} rx={6} fill="#1e293b" stroke={p.color} strokeWidth="1.5" />
          <rect x={16 + i * 98} y={78} width={88} height={28} rx={6} fill={p.color} opacity="0.3" />
          <Label x={60 + i * 98} y={97} text={p.label} size={11} bold fill={p.color} />
          {p.sub.split('\n').map((line, j) => (
            <text key={j} x={60 + i * 98} y={120 + j * 18} textAnchor="middle" fontSize={9} fill="#94a3b8" fontFamily="system-ui">{line}</text>
          ))}
        </g>
      ))}
      <rect x={20} y={220} width={480} height={30} rx={5} fill="#1e293b" stroke="#334155" />
      <Label x={260} y={240} text="Continuous monitoring (SIEM/UEBA) + Analytics → Automated response" size={10} fill="#94a3b8" />
      <Label x={260} y={260} text="Encrypted communications at all layers — assume breach posture" size={9} fill="#64748b" />
    </svg>
  );
}

export function NISTIncidentResponse() {
  const phases = [
    { n: '1', label: 'Preparation', sub: 'IR plan, tools, training, contacts', color: '#3b82f6' },
    { n: '2', label: 'Detection & Analysis', sub: 'Identify incident type, scope, impact', color: '#f59e0b' },
    { n: '3', label: 'Containment', sub: 'Short-term: isolate. Long-term: patch.', color: '#ef4444' },
    { n: '4', label: 'Eradication', sub: 'Remove malware, close attack vectors', color: '#8b5cf6' },
    { n: '5', label: 'Recovery', sub: 'Restore systems, monitor for recurrence', color: '#22c55e' },
    { n: '6', label: 'Post-Incident Activity', sub: 'Lessons learned → update preparation', color: '#0891b2' },
  ];
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="NIST SP 800-61 Incident Response Lifecycle" size={12} bold fill="#f59e0b" />
      {phases.map((p, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 38} width={440} height={32} rx={4} fill="#1e293b" stroke={p.color} strokeWidth="1.5" />
          <circle cx={58} cy={51 + i * 38} r={12} fill={p.color} />
          <Label x={58} y={55 + i * 38} text={p.n} size={11} bold fill="#0f172a" />
          <Label x={80} y={47 + i * 38} text={p.label} size={11} bold fill={p.color} anchor="start" />
          <Label x={80} y={61 + i * 38} text={p.sub} size={9} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={67 + i * 38} x2={260} y2={73 + i * 38} color="#475569" />}
        </g>
      ))}
      <rect x={40} y={263} width={440} height={10} fill="none" />
      <Label x={260} y={270} text="Phase 6 feeds back to Phase 1 — continuous improvement cycle" size={9} fill="#64748b" />
    </svg>
  );
}

export function RansomwareKillChain() {
  const stages = [
    { stage: 'Initial Access', attack: 'Phishing, RDP brute force, vuln exploit', defense: 'Email filtering, MFA, patch management', color: '#ef4444' },
    { stage: 'Execution', attack: 'Malicious script/macro runs', defense: 'Application whitelisting, EDR', color: '#ea580c' },
    { stage: 'Lateral Movement', attack: 'Pass-the-hash, credential dumping', defense: 'Network micro-segmentation, least privilege', color: '#f59e0b' },
    { stage: 'Data Exfiltration', attack: 'Exfil before encrypting (double extortion)', defense: 'DLP, network monitoring, SIEM alerts', color: '#8b5cf6' },
    { stage: 'Encryption', attack: 'Files encrypted, ransom note dropped', defense: 'Air-gapped immutable backups', color: '#dc2626' },
    { stage: 'Ransom Demand', attack: 'Cryptocurrency demand, data leak threat', defense: 'Check OFAC list before any payment', color: '#64748b' },
  ];
  return (
    <svg viewBox="0 0 520 285" className="w-full max-w-lg mx-auto">
      <rect width="520" height="285" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Ransomware Kill Chain & Defenses" size={13} bold fill="#f59e0b" />
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={10} y={35 + i * 40} width={500} height={34} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1" />
          <rect x={10} y={35 + i * 40} width={120} height={34} rx={4} fill={s.color} opacity="0.2" />
          <text x={20} y={57 + i * 40} fontSize={10} fill={s.color} fontWeight="bold" fontFamily="system-ui">{s.stage}</text>
          <text x={140} y={49 + i * 40} fontSize={8} fill="#ef4444" fontFamily="system-ui">{'Atk: ' + s.attack}</text>
          <text x={140} y={63 + i * 40} fontSize={8} fill="#22c55e" fontFamily="system-ui">{'Def: ' + s.defense}</text>
        </g>
      ))}
      <Label x={260} y={278} text="OFAC compliance: paying sanctioned groups may create criminal liability" size={9} fill="#f59e0b" />
    </svg>
  );
}

export function BCPDevelopment() {
  const phases = [
    { n: '1', label: 'Project Initiation', sub: 'Scope, team, executive sponsorship', color: '#3b82f6' },
    { n: '2', label: 'Business Impact Analysis', sub: 'MTD, RTO, RPO per critical process', color: '#f59e0b' },
    { n: '3', label: 'Recovery Strategy', sub: 'Hot/warm/cold site, backup frequency', color: '#8b5cf6' },
    { n: '4', label: 'Plan Development', sub: 'Written procedures, call trees, roles', color: '#22c55e' },
    { n: '5', label: 'Training & Testing', sub: 'Tabletop, functional, full-scale exercises', color: '#0891b2' },
    { n: '6', label: 'Maintenance & Update', sub: 'Annual review, post-incident update', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="BCP Development Process" size={14} bold fill="#f59e0b" />
      {phases.map((p, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 37} width={440} height={31} rx={4} fill="#1e293b" stroke={p.color} strokeWidth="1.5" />
          <circle cx={58} cy={51 + i * 37} r={12} fill={p.color} />
          <Label x={58} y={55 + i * 37} text={p.n} size={11} bold fill="#0f172a" />
          <Label x={80} y={47 + i * 37} text={p.label} size={11} bold fill={p.color} anchor="start" />
          <Label x={80} y={61 + i * 37} text={p.sub} size={9} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={66 + i * 37} x2={260} y2={72 + i * 37} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={260} text="Phase 2 (BIA) outputs drive Phase 3 strategy selection — do not skip BIA" size={10} fill="#64748b" />
    </svg>
  );
}

export function RecoverySiteSelection() {
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Recovery Site Selection Decision Tree" size={13} bold fill="#f59e0b" />
      <Box x={170} y={38} w={180} h={38} fill="#1e293b" stroke="#f59e0b">
        <Label x={260} y={62} text="What is your RTO?" size={12} bold fill="#f59e0b" />
      </Box>
      <Arrow x1={200} y1={76} x2={120} y2={105} color="#f59e0b" />
      <Arrow x1={260} y1={76} x2={260} y2={105} color="#f59e0b" />
      <Arrow x1={320} y1={76} x2={390} y2={105} color="#f59e0b" />
      <Label x={120} y={100} text="< 1 hour" size={10} fill="#ef4444" />
      <Label x={255} y={100} text="Hours–Days" size={10} fill="#f59e0b" />
      <Label x={370} y={100} text="> 72 hours" size={10} fill="#22c55e" />
      <Box x={50} y={108} w={130} h={70} fill="#7f1d1d" stroke="#ef4444">
        <Label x={115} y={130} text="HOT SITE" size={12} bold fill="#fca5a5" />
        <Label x={115} y={148} text="Fully operational" size={9} fill="#fef2f2" />
        <Label x={115} y={163} text="Real-time replication" size={9} fill="#fef2f2" />
        <Label x={115} y={175} text="Highest cost" size={9} fill="#fca5a5" />
      </Box>
      <Box x={195} y={108} w={130} h={70} fill="#713f12" stroke="#f59e0b">
        <Label x={260} y={130} text="WARM SITE" size={12} bold fill="#fde68a" />
        <Label x={260} y={148} text="Partial equipment" size={9} fill="#fef3c7" />
        <Label x={260} y={163} text="Hours to set up" size={9} fill="#fef3c7" />
        <Label x={260} y={175} text="Moderate cost" size={9} fill="#fde68a" />
      </Box>
      <Box x={340} y={108} w={130} h={70} fill="#1c3520" stroke="#22c55e">
        <Label x={405} y={130} text="COLD SITE" size={12} bold fill="#86efac" />
        <Label x={405} y={148} text="Empty facility" size={9} fill="#d1fae5" />
        <Label x={405} y={163} text="Days/weeks to activate" size={9} fill="#d1fae5" />
        <Label x={405} y={175} text="Lowest cost" size={9} fill="#86efac" />
      </Box>
      <Box x={130} y={200} w={260} h={55} fill="#1e293b" stroke="#8b5cf6">
        <Label x={260} y={220} text="MUTUAL AID AGREEMENT" size={11} bold fill="#c4b5fd" />
        <Label x={260} y={237} text="Share facility with partner organization" size={9} fill="#a5b4fc" />
        <Label x={260} y={250} text="Risk: both companies affected in regional disaster" size={9} fill="#94a3b8" />
      </Box>
    </svg>
  );
}

export function ICSStructure() {
  return (
    <svg viewBox="0 0 520 285" className="w-full max-w-lg mx-auto">
      <rect width="520" height="285" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="ICS — Incident Command Structure" size={13} bold fill="#f59e0b" />
      <Box x={170} y={35} w={180} h={38} fill="#1e3a5f" stroke="#f59e0b">
        <Label x={260} y={59} text="Incident Commander" size={12} bold fill="#f59e0b" />
      </Box>
      {[
        { label: 'Safety Officer', x: 20 },
        { label: 'Liaison Officer', x: 190 },
        { label: 'Public Info Officer', x: 360 },
      ].map((s, i) => (
        <g key={i}>
          <line x1={260} y1={73} x2={s.x + 75} y2={95} stroke="#64748b" strokeWidth="1" />
          <rect x={s.x} y={95} width={150} height={28} rx={4} fill="#1e293b" stroke="#64748b" />
          <Label x={s.x + 75} y={114} text={s.label} size={9} fill="#94a3b8" />
        </g>
      ))}
      <Label x={260} y={145} text="General Staff (Section Chiefs)" size={11} bold fill="#f1f5f9" />
      {[
        { label: 'Operations', sub: 'Tactical actions', color: '#ef4444', x: 15 },
        { label: 'Planning', sub: 'Situation status', color: '#3b82f6', x: 140 },
        { label: 'Logistics', sub: 'Resources/support', color: '#22c55e', x: 265 },
        { label: 'Finance/Admin', sub: 'Cost tracking', color: '#f59e0b', x: 390 },
      ].map((s, i) => (
        <g key={i}>
          <line x1={260} y1={133} x2={s.x + 55} y2={155} stroke="#475569" strokeWidth="1" />
          <rect x={s.x} y={155} width={110} height={45} rx={4} fill="#1e293b" stroke={s.color} />
          <Label x={s.x + 55} y={175} text={s.label} size={10} bold fill={s.color} />
          <Label x={s.x + 55} y={190} text={s.sub} size={8} fill="#64748b" />
        </g>
      ))}
      <rect x={10} y={218} width={500} height={25} rx={4} fill="#1e293b" stroke="#334155" />
      <Label x={260} y={235} text="Span of control: 3–7 per supervisor (optimal 5). Exceeding → create branches/divisions." size={9} fill="#94a3b8" />
      <rect x={10} y={250} width={500} height={25} rx={4} fill="#1e293b" stroke="#334155" />
      <Label x={260} y={267} text="Operations is largest section. PIO handles ALL external communications." size={9} fill="#94a3b8" />
    </svg>
  );
}

export function BIATimeline() {
  return (
    <svg viewBox="0 0 520 265" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="265" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="BIA — MTD / RTO / RPO Relationship" size={13} bold fill="#f59e0b" />
      <line x1={30} y1={140} x2={490} y2={140} stroke="#475569" strokeWidth="2" />
      <Arrow x1={488} y1={140} x2={495} y2={140} color="#475569" />
      <Label x={490} y={152} text="Time →" size={9} fill="#64748b" />
      <circle cx={60} cy={140} r={6} fill="#ef4444" />
      <Label x={60} y={125} text="Incident" size={10} bold fill="#ef4444" />
      <line x1={60} y1={140} x2={200} y2={140} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
      <line x1={200} y1={125} x2={200} y2={155} stroke="#f59e0b" strokeWidth="1.5" />
      <Label x={200} y={120} text="RPO" size={10} bold fill="#f59e0b" />
      <Label x={200} y={108} text="Max data loss" size={9} fill="#fde68a" />
      <Label x={130} y={165} text="← data loss window →" size={9} fill="#f59e0b" />
      <line x1={60} y1={140} x2={340} y2={140} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,3" />
      <line x1={340} y1={120} x2={340} y2={160} stroke="#3b82f6" strokeWidth="1.5" />
      <Label x={340} y={115} text="RTO" size={10} bold fill="#3b82f6" />
      <Label x={340} y={103} text="System restored" size={9} fill="#93c5fd" />
      <line x1={60} y1={140} x2={450} y2={140} stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3" />
      <line x1={450} y1={115} x2={450} y2={165} stroke="#ef4444" strokeWidth="2" />
      <Label x={450} y={110} text="MTD" size={10} bold fill="#ef4444" />
      <Label x={450} y={98} text="Business fails" size={9} fill="#fca5a5" />
      <rect x={30} y={180} width={460} height={70} rx={5} fill="#1e293b" stroke="#334155" />
      <Label x={260} y={198} text="RTO must be less than MTD — recovery must occur before business failure" size={10} fill="#f1f5f9" />
      <Label x={260} y={215} text="RPO drives backup frequency — RPO=1hr means backups every hour minimum" size={10} fill="#94a3b8" />
      <Label x={260} y={232} text="Hot site: RTO minutes | Warm: hours-days | Cold: days-weeks" size={10} fill="#64748b" />
    </svg>
  );
}

export function CrisisCommunications() {
  const steps = [
    { label: 'Incident Detected', sub: 'Security/Operations team confirms incident', color: '#ef4444' },
    { label: 'Activate Crisis Mgmt Team', sub: 'CMT convenes — assess media/public interest level', color: '#f59e0b' },
    { label: 'Draft Initial Statement', sub: 'PIO prepares — focus: what we know, what we\'re doing', color: '#3b82f6' },
    { label: 'Legal & Executive Review', sub: 'Approve messaging — avoid admitting liability', color: '#8b5cf6' },
    { label: 'Release Statement (1 hour)', sub: 'Media, employees, customers — tailored messages', color: '#22c55e' },
    { label: 'Update Every 2 Hours', sub: 'Consistent cadence — silence breeds rumors', color: '#0891b2' },
  ];
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Crisis Communications Decision Flow" size={13} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 38} width={440} height={32} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={35 + i * 38} width={6} height={32} fill={s.color} />
          <Label x={56} y={47 + i * 38} text={s.label} size={11} bold fill={s.color} anchor="start" />
          <Label x={56} y={61 + i * 38} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={67 + i * 38} x2={260} y2={73 + i * 38} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={270} text="Stakeholders: employees, media, customers, regulators, shareholders — each needs tailored message" size={9} fill="#64748b" />
    </svg>
  );
}

export function ThreatTriage() {
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="ASIS WVPI — Threat Triage Process" size={13} bold fill="#f59e0b" />
      <Box x={170} y={38} w={180} h={38} fill="#1e293b" stroke="#ef4444">
        <Label x={260} y={62} text="Threat Report Received" size={11} bold fill="#fca5a5" />
      </Box>
      <Arrow x1={260} y1={76} x2={260} y2={95} color="#f59e0b" />
      <Box x={130} y={95} w={260} h={45} fill="#1e293b" stroke="#f59e0b">
        <Label x={260} y={113} text="Initial Triage" size={12} bold fill="#f59e0b" />
        <Label x={260} y={129} text="Imminence | Specificity | Plausibility | Intent" size={9} fill="#fef3c7" />
      </Box>
      <Arrow x1={200} y1={140} x2={100} y2={165} color="#22c55e" />
      <Arrow x1={260} y1={140} x2={260} y2={165} color="#f59e0b" />
      <Arrow x1={320} y1={140} x2={420} y2={165} color="#ef4444" />
      <Label x={70} y={160} text="LOW" size={10} bold fill="#22c55e" />
      <Label x={248} y={160} text="MED" size={10} bold fill="#f59e0b" />
      <Label x={410} y={160} text="HIGH" size={10} bold fill="#ef4444" />
      <Box x={30} y={165} w={120} h={65} fill="#1c3520" stroke="#22c55e">
        <Label x={90} y={185} text="Monitor" size={10} bold fill="#86efac" />
        <Label x={90} y={200} text="EAP referral" size={9} fill="#d1fae5" />
        <Label x={90} y={215} text="Supervisor alert" size={9} fill="#d1fae5" />
        <Label x={90} y={228} text="Document" size={9} fill="#d1fae5" />
      </Box>
      <Box x={195} y={165} w={130} h={65} fill="#713f12" stroke="#f59e0b">
        <Label x={260} y={185} text="Investigate" size={10} bold fill="#fde68a" />
        <Label x={260} y={200} text="TMT convenes" size={9} fill="#fef3c7" />
        <Label x={260} y={215} text="HR + Legal" size={9} fill="#fef3c7" />
        <Label x={260} y={228} text="Access review" size={9} fill="#fef3c7" />
      </Box>
      <Box x={370} y={165} w={130} h={65} fill="#7f1d1d" stroke="#ef4444">
        <Label x={435} y={185} text="Escalate" size={10} bold fill="#fca5a5" />
        <Label x={435} y={200} text="Law enforcement" size={9} fill="#fef2f2" />
        <Label x={435} y={215} text="Restrict access" size={9} fill="#fef2f2" />
        <Label x={435} y={228} text="Protective measures" size={9} fill="#fef2f2" />
      </Box>
      <Label x={260} y={265} text="First step is ALWAYS triage — NOT immediate suspension or TRO" size={10} fill="#f59e0b" />
    </svg>
  );
}

export function PathwayToViolence() {
  const stages = [
    { label: 'Grievance', sub: 'Real or perceived injustice', color: '#3b82f6', note: 'Most common starting point' },
    { label: 'Ideation', sub: 'Considers violence as solution', color: '#8b5cf6', note: 'Fixation on target begins' },
    { label: 'Research / Planning', sub: 'Studies methods, targets, timing', color: '#f59e0b', note: 'May show in browser history' },
    { label: 'Preparation', sub: 'Acquires means, finalizes plan', color: '#ea580c', note: 'Weapons acquisition, location visit' },
    { label: 'Probing', sub: 'Tests security response', color: '#ef4444', note: 'Surveillance, trial approaches' },
    { label: 'Attack', sub: 'Violence occurs', color: '#dc2626', note: 'Prevention failed' },
  ];
  return (
    <svg viewBox="0 0 520 280" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="280" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Pathway to Targeted Violence" size={14} bold fill="#f59e0b" />
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 38} width={440} height={32} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={35 + i * 38} width={6} height={32} fill={s.color} />
          <Label x={56} y={47 + i * 38} text={s.label} size={11} bold fill={s.color} anchor="start" />
          <Label x={56} y={61 + i * 38} text={s.sub} size={9} fill="#94a3b8" anchor="start" />
          <Label x={440} y={54 + i * 38} text={s.note} size={8} fill="#64748b" anchor="end" />
          {i < 5 && <Arrow x1={260} y1={67 + i * 38} x2={260} y2={73 + i * 38} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={275} text="Leakage occurs at most stages — intervention possible at ideation through probing" size={9} fill="#22c55e" />
    </svg>
  );
}

export function RunHideFight() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Active Shooter Response — Run, Hide, Fight" size={13} bold fill="#f59e0b" />
      {[
        { action: 'RUN', color: '#22c55e', bg: '#14532d', items: ['Evacuate immediately if path is clear', 'Leave belongings behind', 'Help others escape if possible', 'Prevent others from entering', 'Call 911 when safe'] },
        { action: 'HIDE', color: '#f59e0b', bg: '#713f12', items: ['Lock / barricade the door', 'Silence your phone completely', 'Stay away from doors', 'Turn off lights and be quiet', 'Stay until law enforcement clears area'] },
        { action: 'FIGHT', color: '#ef4444', bg: '#7f1d1d', items: ['Last resort only — if cornered', 'Act aggressively and commit fully', 'Improvise weapons (fire extinguisher, chair)', 'Target eyes, nose, throat', 'Do not stop until threat is neutralized'] },
      ].map((p, i) => (
        <g key={i}>
          <rect x={10 + i * 170} y={38} width={158} height={215} rx={6} fill={p.bg} stroke={p.color} strokeWidth="2" />
          <rect x={10 + i * 170} y={38} width={158} height={32} rx={6} fill={p.color} />
          <Label x={89 + i * 170} y={59} text={p.action} size={16} bold fill="#0f172a" />
          {p.items.map((item, j) => (
            <text key={j} x={20 + i * 170} y={92 + j * 32} fontSize={8.5} fill="#f1f5f9" fontFamily="system-ui" dominantBaseline="middle">{'• ' + item}</text>
          ))}
        </g>
      ))}
      <Label x={260} y={265} text="DHS protocol. RUN preferred. FIGHT is last resort. Call 911 at first opportunity." size={9} fill="#64748b" />
    </svg>
  );
}

export function NegligenceElements() {
  const elements = [
    { n: '1', label: 'Duty of Care', sub: 'A legal duty existed between defendant and plaintiff', color: '#3b82f6', example: 'Business owes duty to invitees on premises' },
    { n: '2', label: 'Breach of Duty', sub: 'Defendant failed to meet standard of care', color: '#f59e0b', example: 'Ignored prior similar incidents (foreseeability)' },
    { n: '3', label: 'Causation', sub: 'Breach was the proximate cause of harm', color: '#8b5cf6', example: 'Lack of lighting → assault that could have been prevented' },
    { n: '4', label: 'Damages', sub: 'Plaintiff suffered actual harm or loss', color: '#ef4444', example: 'Physical injury, financial loss, emotional distress' },
  ];
  return (
    <svg viewBox="0 0 520 265" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="265" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Negligence — Four-Element Test" size={14} bold fill="#f59e0b" />
      {elements.map((e, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 52} width={440} height={46} rx={5} fill="#1e293b" stroke={e.color} strokeWidth="1.5" />
          <circle cx={62} cy={58 + i * 52} r={15} fill={e.color} />
          <Label x={62} y={63 + i * 52} text={e.n} size={13} bold fill="#0f172a" />
          <Label x={88} y={50 + i * 52} text={e.label} size={11} bold fill={e.color} anchor="start" />
          <Label x={88} y={64 + i * 52} text={e.sub} size={9} fill="#f1f5f9" anchor="start" />
          <Label x={88} y={75 + i * 52} text={'Ex: ' + e.example} size={8} fill="#64748b" anchor="start" />
          {i < 3 && <Arrow x1={260} y1={81 + i * 52} x2={260} y2={87 + i * 52} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={258} text="Plaintiff must prove ALL four elements. Missing any one = no negligence claim." size={10} fill="#f59e0b" />
    </svg>
  );
}

export function UseOfForceContinuum() {
  const levels = [
    { level: 'Officer Presence', response: 'Visible, professional appearance', color: '#22c55e' },
    { level: 'Verbal Commands', response: 'Direct, calm, clear instructions', color: '#84cc16' },
    { level: 'Soft Control', response: 'Guiding, escort holds, compliance techniques', color: '#f59e0b' },
    { level: 'Hard Control', response: 'Restraint, takedown, handcuffing', color: '#ea580c' },
    { level: 'Less-Lethal Force', response: 'OC spray, taser, baton', color: '#ef4444' },
    { level: 'Lethal Force', response: 'Firearm — imminent threat of death or serious injury', color: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Use of Force Continuum" size={14} bold fill="#f59e0b" />
      {levels.map((l, i) => (
        <g key={i}>
          <rect x={40 + i * 6} y={38 + i * 35} width={480 - i * 6} height={29} rx={4} fill="#1e293b" stroke={l.color} strokeWidth="1.5" />
          <rect x={40 + i * 6} y={38 + i * 35} width={8} height={29} fill={l.color} />
          <Label x={58 + i * 6} y={50 + i * 35} text={l.level} size={10} bold fill={l.color} anchor="start" />
          <Label x={58 + i * 6} y={62 + i * 35} text={l.response} size={9} fill="#94a3b8" anchor="start" />
        </g>
      ))}
      <Label x={260} y={258} text="Response must be proportional — one level above subject's resistance. Escalate/de-escalate as needed." size={9} fill="#64748b" />
    </svg>
  );
}

export function EPTeamPositions() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Executive Protection — Team Positions" size={13} bold fill="#f59e0b" />
      <Label x={260} y={45} text="Motorcade Formation (3 vehicles)" size={11} fill="#94a3b8" />
      {[
        { label: 'LEAD VEHICLE', sub: 'Route scout, comms, advance', x: 60, y: 60, color: '#3b82f6' },
        { label: 'PRINCIPAL VEHICLE', sub: 'Agent + Principal (protected person)', x: 200, y: 60, color: '#f59e0b' },
        { label: 'FOLLOW VEHICLE', sub: 'Reaction force, medical kit', x: 340, y: 60, color: '#22c55e' },
      ].map((v, i) => (
        <g key={i}>
          <rect x={v.x} y={v.y} width={120} height={55} rx={6} fill="#1e293b" stroke={v.color} strokeWidth="2" />
          <Label x={v.x + 60} y={v.y + 22} text={v.label} size={9} bold fill={v.color} />
          <Label x={v.x + 60} y={v.y + 37} text={v.sub} size={8} fill="#94a3b8" />
          {i < 2 && <rect x={v.x + 122} y={v.y + 25} width={78} height={2} fill={v.color} opacity="0.5" />}
        </g>
      ))}
      <Label x={260} y={140} text="On-Foot Close Protection Formation" size={11} fill="#94a3b8" />
      {[
        { pos: 'POINT', role: 'Walks ahead — clear path', x: 220, y: 155, color: '#3b82f6' },
        { pos: 'RIGHT FLANK', role: 'Right side of principal', x: 330, y: 175, color: '#8b5cf6' },
        { pos: 'PRINCIPAL', role: 'Protected person (center)', x: 220, y: 175, color: '#f59e0b' },
        { pos: 'LEFT FLANK', role: 'Left side of principal', x: 110, y: 175, color: '#8b5cf6' },
        { pos: 'TRAIL', role: 'Rear guard — countersurveillance', x: 220, y: 195, color: '#22c55e' },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={90} height={32} rx={4} fill="#1e293b" stroke={p.color} strokeWidth="1.5" />
          <Label x={p.x + 45} y={p.y + 13} text={p.pos} size={8} bold fill={p.color} />
          <Label x={p.x + 45} y={p.y + 25} text={p.role} size={7} fill="#64748b" />
        </g>
      ))}
      <Label x={260} y={255} text="Advance agent pre-positions at destination before principal arrives." size={9} fill="#64748b" />
    </svg>
  );
}

export function EPThreatAssessment() {
  const steps = [
    { label: 'Intelligence Collection', sub: 'OSINT, social media, law enforcement liaison, reporting hotline', color: '#3b82f6' },
    { label: 'Threat Identification', sub: 'Disgruntled employees, activists, organized crime, stalkers, nation-state', color: '#ef4444' },
    { label: 'Vulnerability Analysis', sub: 'Schedule patterns, residence, routes, public appearances', color: '#f59e0b' },
    { label: 'Risk Rating', sub: 'Likelihood × Consequence per identified threat actor', color: '#8b5cf6' },
    { label: 'Countermeasure Selection', sub: 'Detail size, route variation, advance work requirements', color: '#22c55e' },
    { label: 'Advance Briefing', sub: 'Brief detail on threats, venues, medical facilities, emergency protocols', color: '#0891b2' },
  ];
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="EP Threat Assessment Cycle" size={14} bold fill="#f59e0b" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={40} y={35 + i * 37} width={440} height={31} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <rect x={40} y={35 + i * 37} width={6} height={31} fill={s.color} />
          <Label x={56} y={47 + i * 37} text={s.label} size={10} bold fill={s.color} anchor="start" />
          <Label x={56} y={61 + i * 37} text={s.sub} size={8} fill="#94a3b8" anchor="start" />
          {i < 5 && <Arrow x1={260} y1={66 + i * 37} x2={260} y2={72 + i * 37} color="#475569" />}
        </g>
      ))}
      <Label x={260} y={263} text="Protective intelligence is ongoing — not a one-time assessment" size={9} fill="#64748b" />
    </svg>
  );
}

export function CTAPTFramework() {
  const criteria = [
    { label: 'Business Partner Vetting', sub: 'Screen all importers, exporters, manufacturers, carriers', color: '#3b82f6' },
    { label: 'Procedural Security', sub: 'Documentation controls — bill of lading, cargo manifests, seal logs', color: '#22c55e' },
    { label: 'Physical Security', sub: 'Facility perimeter, access control, lighting per C-TPAT minimum standards', color: '#f59e0b' },
    { label: 'Access Controls', sub: 'Personnel ID, visitor management, IT access for supply chain systems', color: '#8b5cf6' },
    { label: 'Personnel Security', sub: 'Background checks for employees with cargo/conveyance access', color: '#0891b2' },
    { label: 'Conveyance & Seal Security', sub: 'ISO 17712 high-security seals, inspect conveyances before loading', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="C-TPAT Supply Chain Security Framework" size={12} bold fill="#f59e0b" />
      {criteria.map((c, i) => (
        <g key={i}>
          <rect x={10} y={35 + i * 38} width={500} height={32} rx={4} fill={i % 2 === 0 ? '#1e293b' : '#0f172a'} stroke={c.color} strokeWidth="1" />
          <rect x={10} y={35 + i * 38} width={6} height={32} fill={c.color} />
          <text x={24} y={49 + i * 38} fontSize={10} fill={c.color} fontWeight="bold" fontFamily="system-ui">{c.label}</text>
          <text x={24} y={61 + i * 38} fontSize={8} fill="#94a3b8" fontFamily="system-ui">{c.sub}</text>
        </g>
      ))}
      <Label x={260} y={268} text="C-TPAT members receive expedited CBP processing — validated every 3 years" size={9} fill="#64748b" />
    </svg>
  );
}

export function FireTriangle() {
  return (
    <svg viewBox="0 0 520 270" className="w-full max-w-lg mx-auto">
      <rect width="520" height="270" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Fire Triangle / Tetrahedron & Suppression" size={13} bold fill="#f59e0b" />
      <polygon points="260,45 170,175 350,175" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
      <Label x={260} y={100} text="HEAT" size={13} bold fill="#fca5a5" />
      <Label x={200} y={160} text="OXYGEN" size={11} bold fill="#93c5fd" />
      <Label x={310} y={160} text="FUEL" size={11} bold fill="#86efac" />
      <Label x={260} y={130} text="+ Chain" size={9} fill="#fde68a" />
      <Label x={260} y={143} text="Reaction" size={9} fill="#fde68a" />
      {[
        { method: 'Water / CO₂', removes: 'HEAT', example: 'Sprinklers, CO₂ systems', color: '#3b82f6', x: 20 },
        { method: 'Smothering / Foam', removes: 'OXYGEN', example: 'CO₂, foam, blanket', color: '#0891b2', x: 145 },
        { method: 'Fuel Removal', removes: 'FUEL', example: 'Shutoff valves, backfire', color: '#22c55e', x: 270 },
        { method: 'FM-200 / Halon', removes: 'Chain Reaction', example: 'Clean agents — data centers', color: '#f59e0b', x: 395 },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={194} width={115} height={60} rx={4} fill="#1e293b" stroke={s.color} strokeWidth="1.5" />
          <Label x={s.x + 57} y={210} text={s.method} size={9} bold fill={s.color} />
          <Label x={s.x + 57} y={224} text={`Removes: ${s.removes}`} size={8} fill="#94a3b8" />
          <Label x={s.x + 57} y={238} text={s.example} size={7} fill="#64748b" />
        </g>
      ))}
      <Label x={260} y={262} text="FM-200 (HFC-227ea) replaced Halon 1301 — safe for occupied spaces, no residue" size={9} fill="#64748b" />
    </svg>
  );
}

export function IntegratedSecurity() {
  return (
    <svg viewBox="0 0 520 275" className="w-full max-w-lg mx-auto">
      <Defs />
      <rect width="520" height="275" fill="#0f172a" rx="8" />
      <Label x={260} y={22} text="Integrated Physical-Cyber Security Architecture" size={12} bold fill="#f59e0b" />
      <Box x={15} y={38} w={220} h={130} fill="#1e3a5f" stroke="#3b82f6">
        <Label x={125} y={58} text="PHYSICAL SECURITY" size={11} bold fill="#93c5fd" />
        <Label x={125} y={76} text="Access Control (PACS)" size={9} fill="#e2e8f0" />
        <Label x={125} y={91} text="CCTV / Video Analytics" size={9} fill="#e2e8f0" />
        <Label x={125} y={106} text="Intrusion Detection" size={9} fill="#e2e8f0" />
        <Label x={125} y={121} text="Guard Patrol Systems" size={9} fill="#e2e8f0" />
        <Label x={125} y={136} text="Perimeter Sensors" size={9} fill="#e2e8f0" />
        <Label x={125} y={151} text="Visitor Management" size={9} fill="#e2e8f0" />
      </Box>
      <Box x={285} y={38} w={220} h={130} fill="#1c3520" stroke="#22c55e">
        <Label x={395} y={58} text="CYBER SECURITY" size={11} bold fill="#86efac" />
        <Label x={395} y={76} text="SIEM / UEBA" size={9} fill="#e2e8f0" />
        <Label x={395} y={91} text="DLP / Endpoint EDR" size={9} fill="#e2e8f0" />
        <Label x={395} y={106} text="Identity / IAM / MFA" size={9} fill="#e2e8f0" />
        <Label x={395} y={121} text="Vulnerability Mgmt" size={9} fill="#e2e8f0" />
        <Label x={395} y={136} text="Network Monitoring" size={9} fill="#e2e8f0" />
        <Label x={395} y={151} text="Threat Intelligence" size={9} fill="#e2e8f0" />
      </Box>
      <Arrow x1={235} y1={103} x2={283} y2={103} color="#f59e0b" />
      <Arrow x1={283} y1={113} x2={235} y2={113} color="#f59e0b" />
      <Label x={259} y={108} text="API" size={8} bold fill="#f59e0b" />
      <Box x={100} y={185} w={320} h={70} fill="#450a0a" stroke="#f59e0b">
        <Label x={260} y={205} text="UNIFIED SECURITY OPERATIONS CENTER (SOC)" size={11} bold fill="#f59e0b" />
        <Label x={260} y={222} text="Correlated alerts across physical + cyber domains" size={9} fill="#fef3c7" />
        <Label x={260} y={237} text="Physical badge anomaly → triggers cyber investigation (and vice versa)" size={9} fill="#94a3b8" />
        <Label x={260} y={250} text="Convergence prevents siloed blind spots" size={9} fill="#94a3b8" />
      </Box>
    </svg>
  );
}

export const DIAGRAM_VISUALS = {
  'ESRM Model':               ESRMModel,
  'ALE Calculation':          ALECalculation,
  'Risk Treatment Matrix':    RiskTreatmentMatrix,
  'TVRA Process':             TVRAProcess,
  'CARVER Matrix':            CARVERMatrix,
  'Risk Register':            RiskRegister,
  'Defense in Depth':         DefenseInDepth,
  'CPTED Campus':             CPTEDCampus,
  'Access Control Architecture': AccessControlArch,
  'Biometric FAR FRR':        BiometricFARFRR,
  'Perimeter Lighting':       PerimeterLighting,
  'Mantrap Sequence':         MantrapoSequence,
  'CCTV Coverage':            CCTVCoverage,
  'Vehicle Barriers':         VehicleBarriers,
  'Chain of Custody':         ChainOfCustody,
  'WZ vs Reid':               WZvsReid,
  'Investigation Process':    InvestigationProcess,
  'Digital Forensics':        DigitalForensics,
  'CPIR Model':               CPIRModel,
  'FCRA Adverse Action':      FCRAAdverseAction,
  'Clearance Adjudication':   ClearanceAdjudication,
  'Data Classification':      DataClassification,
  'Zero Trust Architecture':  ZeroTrustArch,
  'NIST Incident Response':   NISTIncidentResponse,
  'Ransomware Kill Chain':    RansomwareKillChain,
  'BCP Development':          BCPDevelopment,
  'Recovery Site Selection':  RecoverySiteSelection,
  'ICS Structure':            ICSStructure,
  'BIA MTD RTO RPO':          BIATimeline,
  'Crisis Communications':    CrisisCommunications,
  'Threat Triage':            ThreatTriage,
  'Pathway to Violence':      PathwayToViolence,
  'Run Hide Fight':           RunHideFight,
  'Negligence Elements':      NegligenceElements,
  'Use of Force Continuum':   UseOfForceContinuum,
  'EP Team Positions':        EPTeamPositions,
  'EP Threat Assessment':     EPThreatAssessment,
  'C-TPAT Framework':         CTAPTFramework,
  'Fire Triangle':            FireTriangle,
  'Integrated Security':      IntegratedSecurity,
};
