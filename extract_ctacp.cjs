const fs = require('fs');

const rawLines = fs.readFileSync('C:/Users/hpjoh/Documents/ep/ctacp_text.txt', 'utf8').split('\n').map(l => l.trim());

const TOPICS = [
  { name: 'Tactical Medicine Framework', keys: ['tecc','tccc','care under fire','tactical field care','tacevac','warm zone','hot zone','cold zone','rtf','rescue task force','pace','medical threat','direct threat','indirect threat','phase of care'] },
  { name: 'Hemorrhage Control', keys: ['tourniquet','hemorrhage','bleeding','blood loss','txa','tranexamic','combat gauze','hemostatic','junctional','pelvic binder','damage control','whole blood','permissive hypotension','walking blood bank'] },
  { name: 'Airway & Respiratory', keys: ['airway','cricothyrot','npa','nasopharyngeal','chest seal','needle decompress','tension pneumo','pneumo','boyle','flight physiology','chest trauma','ventilat','intubat','bougie','thoracostomy'] },
  { name: 'Shock & Resuscitation', keys: ['shock','resuscitat','fluid','lactated','hextend','blood pressure','hypovolemic','obstructive','neurogenic','trauma triad','lethal triad','coagulopathy','hypothermia','acidosis','ringer'] },
  { name: 'Blast & Ballistics', keys: ['blast','ballistic','cavitation','kinetic energy','ied','explosion','shrapnel','fragmentation','primary blast','secondary blast','tertiary blast','quaternary blast','babt','behind armor','commotio cordis','spalling'] },
  { name: 'Environmental & Prolonged Care', keys: ['heat','cold injury','altitude','hace','hape','burn','rule of 10','austere','prolonged field care','pfc','water purif','decompression','wbgt','rhabdomyolysis','crush syndrome'] },
  { name: 'CBRN & Chemical Threats', keys: ['nerve agent','chemical','cbrn','sludgem','atropine','pralidoxime','2-pam','mustard','lewisite','phosgene','cyanide','hydroxocobalamin','radiation','inverse square','vesicant','blister','organophosphate'] },
  { name: 'K9 Tactical Medicine', keys: ['k9','canine','dog','malinois','veterinary','gdv','gastric','volvulus','trocharize','k9 tourniquet','canine vital'] },
  { name: 'Triage & Mass Casualty', keys: ['triage','salt','start triage','jumpstart','mass casualty','mci','medevac','mist report','9-line','expectant','black tag'] },
  { name: 'Medications & Analgesia', keys: ['ketamine','fentanyl','otfc','moxifloxacin','ertapenem','antibiotic','analges','morphine','midazolam','epinephrine','naloxone','cwmp','medication','pharmacol','dose ','mg '] },
  { name: 'Legal, Ethics & Operations', keys: ['legal','ethics','hipaa','good samaritan','implied consent','refusal','medical neutral','swat','law enforcement','tactical medic','incident commander','rules of engagement','14th amendment','negligent','liability'] },
];

function getTopic(text) {
  const lower = text.toLowerCase();
  let best = { name: 'Tactical Medicine Framework', score: 0 };
  for (const t of TOPICS) {
    let score = 0;
    for (const k of t.keys) if (lower.includes(k)) score++;
    if (score > best.score) best = { name: t.name, score };
  }
  return best.name;
}

function clean(s) {
  return (s || '').replace(/\s+/g, ' ').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/\$[^$\n]{0,60}\$/g, '[formula]').trim();
}

const questions = [];
const SKIP_PATTERNS = /^(Section|Certified Tactical|End of Batch|This batch|For this batch|Here are|You're|I have|Note:|Batch \d)/i;

// ─────────────────────────────────────────────────────────────
// FORMAT 1: MCQ Q1-Q100 (lines 0-1049) embedded "Correct Answer: X"
// ─────────────────────────────────────────────────────────────
const f1text = rawLines.slice(0, 1050).join(' ');
const f1blocks = f1text.split(/(?=\b[1-9]\d*\. (?=[A-Z"']))/g);

for (const block of f1blocks) {
  const b = block.trim();
  if (!b.match(/^\d+\. /)) continue;
  const caPos = b.search(/Correct Answer:/);
  if (caPos < 0) continue;

  const optOrder = [];
  for (const letter of ['A','B','C','D']) {
    const re = new RegExp('(?<![A-Z])\\b' + letter + '\\. ');
    const pos = b.search(re);
    if (pos >= 0) optOrder.push({ letter, pos });
  }
  if (optOrder.length < 4) continue;
  optOrder.sort((a, b) => a.pos - b.pos);

  const qText = clean(b.substring(b.indexOf('. ') + 2, optOrder[0].pos));
  if (qText.length < 15) continue;

  const optTexts = {};
  for (let i = 0; i < 4; i++) {
    const start = optOrder[i].pos + 3;
    const end = i < 3 ? optOrder[i+1].pos : caPos;
    optTexts[optOrder[i].letter] = clean(b.substring(start, end));
  }
  if (!optTexts['A'] || !optTexts['D']) continue;

  const ansM = b.substring(caPos).match(/Correct Answer:\s*([A-D])/);
  if (!ansM) continue;

  const exPos = b.search(/Explanation:/);
  const explanation = exPos >= 0 ? clean(b.substring(exPos + 12, exPos + 2000)) : '';

  const combined = qText + ' ' + Object.values(optTexts).join(' ');
  questions.push({ id:0, topic: getTopic(combined), question: qText,
    options: ['A','B','C','D'].map(l => optTexts[l] || ''),
    answer: ansM[1], explanation: explanation || 'See TCCC/TECC guidelines.', videoUrl: '' });
}
console.log('F1 MCQ:', questions.length);

// ─────────────────────────────────────────────────────────────
// FORMAT 2a: "N. Question: ... Answer/Explanation: ..." (lines 1050-6666)
// ─────────────────────────────────────────────────────────────
const f2aText = rawLines.slice(1050, 6666).join(' ');
const f2aBlocks = f2aText.split(/(?=\b\d{1,3}\. Question:)/g);

for (const block of f2aBlocks) {
  const b = block.trim();
  if (!b.match(/^\d{1,3}\. Question:/)) continue;
  const qStart = b.indexOf('Question:') + 9;
  const aePos = b.search(/Answer\/Explanation:/);
  if (aePos < 0) continue;
  const qText = clean(b.substring(qStart, aePos));
  if (qText.length < 15) continue;
  const explanation = clean(b.substring(aePos + 20));
  questions.push({ id:0, topic: getTopic(qText+' '+explanation), question: qText,
    options: [], answer: '', explanation: explanation || 'See TCCC/TECC guidelines.', videoUrl: '' });
}
console.log('F2a open-ended:', questions.length);

// ─────────────────────────────────────────────────────────────
// FORMAT 2b: "N. Question (tag): ... Answer: ..." (lines 6666-8808)
// ─────────────────────────────────────────────────────────────
const f2bText = rawLines.slice(6666, 8808).join(' ');
const f2bBlocks = f2bText.split(/(?=\b\d{1,3}\. Question\b)/g);

for (const block of f2bBlocks) {
  const b = block.trim();
  if (!b.match(/^\d{1,3}\. Question/)) continue;
  const qColonPos = b.indexOf(':');
  if (qColonPos < 0) continue;
  const aePos = b.search(/\bAnswer:/);
  if (aePos < 0 || aePos <= qColonPos) continue;
  const qText = clean(b.substring(qColonPos + 1, aePos));
  if (qText.length < 15) continue;
  const explanation = clean(b.substring(aePos + 7));
  questions.push({ id:0, topic: getTopic(qText+' '+explanation), question: qText,
    options: [], answer: '', explanation: explanation || 'See TCCC/TECC guidelines.', videoUrl: '' });
}
console.log('F2b open-ended:', questions.length);

// ─────────────────────────────────────────────────────────────
// FORMAT 3: Full exam MCQ (lines 8808-9498) — line-by-line opt parser
// ─────────────────────────────────────────────────────────────
const f3lines = rawLines.slice(8808, 9498);
const f3AnsText = rawLines.slice(9498).join(' ');

// Parse answer section: "N. Answer: X." -> map qNum -> {letter, explanation}
const answerMap = {};
// Section 1-3 answers (lines 9498-)
const ansText1 = rawLines.slice(9498, 9812).join(' ');
const ansText2 = rawLines.slice(9812, 10094).join(' ');
const ansText3 = rawLines.slice(10094, 10398).join(' ');
const allAnsText = ansText1 + ' ' + ansText2 + ' ' + ansText3;

// Match all "N. Answer: X" patterns
const globalAnsRe = /\b(\d{1,3})\. Answer:\s*([A-D])[\. ]/g;
let am;
while ((am = globalAnsRe.exec(allAnsText)) !== null) {
  const n = parseInt(am[1]);
  const letter = am[2];
  if (!answerMap[n]) {
    // Get explanation: text between this "N. Answer:" and next "(N+1). Answer:"
    const blockStart = am.index;
    const nextRe = new RegExp('\\b' + (n+1) + '\\. Answer:');
    const nextM = allAnsText.substring(blockStart+1).search(nextRe);
    const blockEnd = nextM >= 0 ? blockStart + 1 + nextM : blockStart + 1500;
    const block = allAnsText.substring(blockStart, blockEnd);
    const exPos = block.search(/Explanation:/);
    const explanation = exPos >= 0 ? clean(block.substring(exPos + 12)) : '';
    answerMap[n] = { letter, explanation };
  }
}
console.log('Answer map entries:', Object.keys(answerMap).length);

// Line-by-line MCQ parser for full exam
let qSeq = 0; // sequential question counter
let i = 0;

while (i < f3lines.length) {
  const line = f3lines[i];
  // Skip structural lines
  if (!line || SKIP_PATTERNS.test(line)) { i++; continue; }

  // Detect start of option A (signals start of MCQ block)
  if (line.match(/^A\. /)) {
    // Collect question text by looking backwards
    const qLines = [];
    let back = i - 1;
    while (back >= 0 && back >= i - 8) {
      const bl = f3lines[back];
      if (!bl || SKIP_PATTERNS.test(bl) || bl.match(/^D\. /)) break;
      // Stop if this looks like a numbered question start
      if (bl.match(/^\d+\. [A-Z]/)) { qLines.unshift(bl.replace(/^\d+\. /, '')); back--; break; }
      qLines.unshift(bl);
      back--;
    }
    const qText = clean(qLines.join(' '));

    // Collect A B C D
    const opts = {};
    let j = i;
    for (const letter of ['A','B','C','D']) {
      if (j < f3lines.length && f3lines[j].match(new RegExp('^' + letter + '\\. '))) {
        // Collect option text (may span multiple lines)
        let optText = f3lines[j].substring(3);
        j++;
        while (j < f3lines.length && !f3lines[j].match(/^[A-D]\. /) && !f3lines[j].match(/^\d+\. [A-Z]/) && f3lines[j] && !SKIP_PATTERNS.test(f3lines[j])) {
          optText += ' ' + f3lines[j];
          j++;
        }
        opts[letter] = clean(optText);
      }
    }

    if (opts['A'] && opts['B'] && opts['C'] && opts['D'] && qText.length >= 15) {
      qSeq++;
      const ans = answerMap[qSeq];
      if (ans) {
        const combined = qText + ' ' + Object.values(opts).join(' ');
        questions.push({ id:0, topic: getTopic(combined), question: qText,
          options: ['A','B','C','D'].map(l => opts[l] || ''),
          answer: ans.letter, explanation: ans.explanation || 'See TCCC/TECC guidelines.', videoUrl: '' });
      }
    }
    i = j;
    continue;
  }
  i++;
}

console.log('After F3 full exam:', questions.length);

// ─────────────────────────────────────────────────────────────
// Deduplicate and output
// ─────────────────────────────────────────────────────────────
const seen = new Set();
const deduped = questions.filter(q => {
  const key = q.question.substring(0, 80).toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
deduped.forEach((q, idx) => q.id = idx + 1);

console.log('\nFINAL:', deduped.length, 'questions');
console.log('MCQ (4 options):', deduped.filter(q => q.options.length === 4).length);
console.log('Open-ended:', deduped.filter(q => q.options.length === 0).length);

const dist = {};
deduped.forEach(q => dist[q.topic] = (dist[q.topic]||0)+1);
console.log('\nTopic distribution:');
for (const [t,c] of Object.entries(dist)) console.log('  ' + t + ': ' + c);

fs.writeFileSync(
  'C:/Users/hpjoh/Documents/ep/apexcertportals/ctacp-portal/src/data/questions.json',
  JSON.stringify(deduped, null, 2)
);
console.log('\nWritten questions.json');
