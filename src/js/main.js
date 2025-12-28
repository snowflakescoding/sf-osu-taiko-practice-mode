const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// --- LANGUAGE SYSTEM ---
let currentLang = 'en'; 

const translations = {
  vi: {
    settings: '⚙️ Cài Đặt',
    selectOsu: '1. Chọn File .osu',
    selectAudio: '2. Chọn Nhạc',
    notSelected: 'Chưa chọn',
    play: 'CHƠI',
    settingsTitle: '⚙️ CÀI ĐẶT',
    keybindStyle: 'Kiểu Phím Bấm',
    customKeybinds: 'Tùy Chỉnh Phím',
    clickToRebind: 'Nhấp phím để đổi. Dùng nút Đặt Lại để quay về mặc định.',
    position: 'Vị trí',
    close: 'Đóng',
    reset: 'Đặt Lại',
    katBlue: 'KAT (XANH)', donRed: 'DON (ĐỎ)',     
    keybinds: 'Phím bấm', results: 'KẾT QUẢ',
    perfect: 'Hoàn Hảo (300)', good: 'Tốt (100)', miss: 'Trượt',
    maxCombo: 'Combo Tối Đa', accuracy: 'Độ Chính Xác', retry: 'Chơi Lại',
    missingFiles: 'Thiếu File!', volume: 'Âm Lượng', langLabel: '🌐 Ngôn ngữ'
  },
  en: {
    settings: '⚙️ Settings',
    selectOsu: '1. Select .osu File',
    selectAudio: '2. Select Audio',
    notSelected: 'Not selected',
    play: 'PLAY',
    settingsTitle: '⚙️ SETTINGS',
    keybindStyle: 'Keybind Style',
    customKeybinds: 'Custom Keybinds',
    clickToRebind: 'Click to rebind. Use Reset button to restore defaults.',
    position: 'Position',
    close: 'Close',
    reset: 'Reset',
    katBlue: 'KAT (BLUE)', donRed: 'DON (RED)',   
    keybinds: 'Keybinds', results: 'RESULTS',
    perfect: 'Perfect (300)', good: 'Good (100)', miss: 'Miss',
    maxCombo: 'Max Combo', accuracy: 'Accuracy', retry: 'Retry',
    missingFiles: 'Missing Files!', volume: 'Volume', langLabel: '🌐 Language'
  },
  ja: {
    settings: '⚙️ 設定',
    selectOsu: '1. .osuファイルを選択',
    selectAudio: '2. 音楽を選択',
    notSelected: '未選択',
    play: 'プレイ',
    settingsTitle: '⚙️ 設定',
    keybindStyle: 'キー配置スタイル',
    customKeybinds: 'カスタムキー',
    clickToRebind: 'キーをクリックして変更。リセットボタンで初期化。',
    position: '位置',
    close: '閉じる',
    reset: 'リセット',
    katBlue: 'カッ (青)', donRed: 'ドン (赤)',
    keybinds: 'キー設定', results: '結果',
    perfect: '良 (300)', good: '可 (100)', miss: '不可',
    maxCombo: '最大コンボ', accuracy: '精度', retry: 'リトライ',
    missingFiles: 'ファイルがありません！', volume: '音量', langLabel: '🌐 言語'
  }
};

function t(key) { return translations[currentLang][key] || key; }

function updateLanguage() {
  document.querySelector('.settings-btn').innerHTML = t('settings');
  document.querySelectorAll('.controls button')[1].innerHTML = t('selectOsu');
  document.querySelectorAll('.controls button')[2].innerHTML = t('selectAudio');
  document.getElementById('playBtn').innerHTML = t('play');
  
  const osuLabel = document.getElementById('osuLabel');
  const audioLabel = document.getElementById('audioLabel');
  const notSelArr = [translations.vi.notSelected, translations.en.notSelected, translations.ja.notSelected];
  if (notSelArr.includes(osuLabel.innerText)) osuLabel.innerText = t('notSelected');
  if (notSelArr.includes(audioLabel.innerText)) audioLabel.innerText = t('notSelected');
  
  updateKeybindGuide();
  updateSettingsModal();
  updateResultsModal();
  saveSettings();
}

function updateSettingsModal() {
  document.querySelector('.settings-box h2').innerHTML = t('settingsTitle');
  document.getElementById('lblVolume').innerText = t('volume');
  document.getElementById('lblStyle').innerText = t('keybindStyle');
  document.getElementById('lblCustom').innerText = t('customKeybinds');
  document.getElementById('lblBindHelp').innerText = t('clickToRebind');
  document.getElementById('lblLang').innerText = t('langLabel');
  document.querySelectorAll('.btn-close')[0].innerText = t('close');
  document.getElementById('btnReset').innerText = t('reset');
  renderKeybindInputs();
}

function updateResultsModal() {
  document.querySelector('.result-box h2').innerText = t('results');
  document.querySelectorAll('.result-stats .stat-row')[0].querySelector('.perfect').innerText = t('perfect');
  document.querySelectorAll('.result-stats .stat-row')[1].querySelector('.good').innerText = t('good');
  document.querySelectorAll('.result-stats .stat-row')[2].querySelector('.miss').innerText = t('miss');
  document.querySelectorAll('.result-stats .stat-row')[3].firstChild.innerText = t('maxCombo');
  document.querySelectorAll('.result-stats .stat-row')[4].firstChild.innerText = t('accuracy');
  document.querySelectorAll('.result-box .btn-close')[0].innerText = t('close');
  document.querySelector('.btn-retry').innerText = t('retry');
}

// --- PERSISTENCE (LocalStorage) ---
function saveSettings() {
  localStorage.setItem('taiko_vol', currentVolume);
  localStorage.setItem('taiko_style', currentStyle);
  localStorage.setItem('taiko_binds', JSON.stringify(keybinds));
  localStorage.setItem('taiko_lang', currentLang);
}

function loadSettings() {
  const vol = localStorage.getItem('taiko_vol');
  if (vol !== null) {
    currentVolume = parseInt(vol);
    document.getElementById('volumeSlider').value = currentVolume;
    updateVolume(currentVolume);
  }

  const style = localStorage.getItem('taiko_style');
  if (style) currentStyle = style;

  const binds = localStorage.getItem('taiko_binds');
  if (binds) keybinds = JSON.parse(binds);

  const lang = localStorage.getItem('taiko_lang');
  if (lang) currentLang = lang;

  document.querySelectorAll('.style-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.style === currentStyle);
  });
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  updateLanguage();
}

// --- KEYBINDS SYSTEM ---
let currentStyle = 'KDDK';
let keybinds = { key1: 'a', key2: 's', key3: 'k', key4: 'l' };
let currentVolume = 50; 

function updateVolume(value) {
  currentVolume = value;
  if (audio) audio.volume = value / 100;
  document.getElementById('volumeValue').innerText = value + '%';
  updateVolumeIcon(value);
  saveSettings();
}

function updateVolumeIcon(value) {
  const icon = document.getElementById('volumeIcon');
  if (value === 0) icon.innerText = '🔇';
  else if (value < 33) icon.innerText = '🔈';
  else if (value < 66) icon.innerText = '🔉';
  else icon.innerText = '🔊';
}

const STYLE_MAPPINGS = {
  'KDDK': { key1: 'kat', key2: 'don', key3: 'don', key4: 'kat' },
  'DKKD': { key1: 'don', key2: 'kat', key3: 'kat', key4: 'don' },
  'KKDD': { key1: 'kat', key2: 'kat', key3: 'don', key4: 'don' },
  'DDKK': { key1: 'don', key2: 'don', key3: 'kat', key4: 'kat' },
  'KDKD': { key1: 'kat', key2: 'don', key3: 'kat', key4: 'don' },
  'DKDK': { key1: 'don', key2: 'kat', key3: 'don', key4: 'kat' }
};

function getKeyMapping() {
  const mapping = STYLE_MAPPINGS[currentStyle];
  return {
    [keybinds.key1]: mapping.key1,
    [keybinds.key2]: mapping.key2,
    [keybinds.key3]: mapping.key3,
    [keybinds.key4]: mapping.key4
  };
}

function updateKeybindGuide() {
  const mapping = STYLE_MAPPINGS[currentStyle];
  const guide = document.getElementById('keybindGuide');
  let html = `${t('keybinds')} (${currentStyle}): `;
  for (let i = 1; i <= 4; i++) {
    const key = keybinds[`key${i}`];
    let displayKey = key.toUpperCase();
    if(key === ' ') displayKey = 'SPACE';
    else if(key === 'escape') displayKey = 'ESC';
    else if(key === 'enter') displayKey = 'ENTER';
    else if(key === 'backspace') displayKey = 'BS';
    else if(key.includes('arrow')) displayKey = key.replace('arrow', '').toUpperCase();

    const type = mapping[`key${i}`];
    const color = type === 'kat' ? '#00aaff' : '#ff4000';
    const label = type === 'kat' ? (currentLang === 'ja' ? 'カッ' : 'Kat') : (currentLang === 'ja' ? 'ドン' : 'Don');
    html += `<span style="color:${color}; font-weight:bold">${displayKey}</span> = ${label}`;
    if (i < 4) html += ' | ';
  }
  guide.innerHTML = html;
}

function openSettings() {
  document.getElementById('settingsOverlay').style.display = 'flex';
  renderKeybindInputs();
}

function closeSettings() {
  document.getElementById('settingsOverlay').style.display = 'none';
  updateKeybindGuide();
}

function resetKeybinds() {
  keybinds = { key1: 'a', key2: 's', key3: 'k', key4: 'l' };
  currentStyle = 'KDDK';
  document.querySelectorAll('.style-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.style === 'KDDK');
  });
  saveSettings();
  renderKeybindInputs();
  updateKeybindGuide();
}

function renderKeybindInputs() {
  const container = document.getElementById('keybindInputs');
  const mapping = STYLE_MAPPINGS[currentStyle];
  let html = '';
  for (let i = 1; i <= 4; i++) {
    const type = mapping[`key${i}`];
    const colorClass = type === 'kat' ? 'key-kat' : 'key-don';
    const labelClass = type === 'kat' ? 'label-kat' : 'label-don';
    const typeName = type === 'kat' ? t('katBlue') : t('donRed');
    
    let displayValue = keybinds[`key${i}`].toUpperCase();
    const k = keybinds[`key${i}`];
    if (k === ' ') displayValue = 'SPACE';
    else if (k === 'escape') displayValue = 'ESC';
    else if (k === 'enter') displayValue = 'ENTER';
    else if (k === 'tab') displayValue = 'TAB';
    else if (k === 'backspace') displayValue = 'BS';
    else if (k.startsWith('arrow')) displayValue = k.replace('arrow', '').toUpperCase();
    
    html += `
      <div class="key-input-group">
        <div class="key-type-label ${labelClass}">${typeName}</div>
        <input type="text" class="${colorClass}" id="key${i}" value="${displayValue}" readonly title="Click to change key" />
        <div class="key-position">${t('position')} ${i}</div>
      </div>
    `;
  }
  container.innerHTML = html;
  
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById(`key${i}`);
    input.addEventListener('click', function() {
      this.value = '?';
      this.style.background = '#ff6600';
      this.style.transform = 'scale(1.1)';
      const handler = (e) => {
        e.preventDefault();
        const rawKey = e.key.toLowerCase();
        keybinds[`key${i}`] = rawKey;
        this.style.background = '#1a1a1a';
        this.style.transform = 'scale(1)';
        document.removeEventListener('keydown', handler);
        saveSettings();
        renderKeybindInputs(); 
        updateKeybindGuide();
      };
      document.addEventListener('keydown', handler);
    });
  }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadSettings(); 

  document.querySelectorAll('.style-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      currentStyle = this.dataset.style;
      saveSettings();
      renderKeybindInputs();
      updateKeybindGuide();
    });
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentLang = this.dataset.lang;
      updateLanguage();
    });
  });

  const volumeSlider = document.getElementById('volumeSlider');
  volumeSlider.addEventListener('input', (e) => {
    updateVolume(parseInt(e.target.value));
  });
});

// --- DRAG & DROP SUPPORT ---
const dragOverlay = document.getElementById('dragOverlay');

window.addEventListener('dragover', (e) => {
  e.preventDefault();
  dragOverlay.style.display = 'flex';
});

window.addEventListener('dragleave', (e) => {
  if (e.clientX === 0 && e.clientY === 0) {
    dragOverlay.style.display = 'none';
  }
});

window.addEventListener('drop', (e) => {
  e.preventDefault();
  dragOverlay.style.display = 'none';

  if (e.dataTransfer.files.length > 0) {
    for (const file of e.dataTransfer.files) {
      if (file.name.endsWith('.osu')) {
        document.getElementById('osuLabel').innerText = file.name;
        const r = new FileReader();
        r.onload = ev => parseOsu(ev.target.result);
        r.readAsText(file);
      } else if (file.type.startsWith('audio/') || file.name.endsWith('.mp3') || file.name.endsWith('.ogg')) {
        document.getElementById('audioLabel').innerText = file.name;
        if(audio) audio.pause();
        audio = new Audio(URL.createObjectURL(file));
        audio.volume = currentVolume / 100;
        audio.onended = () => finishGame();
      }
    }
  }
});

// --- GAME ENGINE ---
const BASE_SPEED = 0.5; 
const HIT_X = 160;

let audio = null;
let notes = [];
let hitErrors = []; 
let playing = false;
let isFinished = false;

let score = 0;
let combo = 0;
let maxCombo = 0;
let hpCurrent = 0; 
const HP_MAX = 100;
let hitEffects = [];

let stats = { perfect: 0, good: 0, miss: 0, totalNotes: 0 };
let meta = { od: 5, hp: 5, sv: 1.4 };
let window300 = 50;
let window100 = 120;
let cachedOsuText = null;

function parseOsu(text) {
  cachedOsuText = text;
  notes = [];
  hitErrors = [];
  meta = { od: 5, hp: 5, sv: 1.4 };
  stats = { perfect: 0, good: 0, miss: 0, totalNotes: 0 };
  score = 0; combo = 0; maxCombo = 0; hpCurrent = 0;
  hitEffects = [];
  const lines = text.split(/\r?\n/);
  let section = '';
  for (let line of lines) {
    line = line.trim();
    if (line === '') continue;
    if (line.startsWith('[')) { section = line; continue; }
    if (section === '[Difficulty]') {
      const parts = line.split(':');
      if (parts.length < 2) continue;
      const key = parts[0].trim();
      const val = parseFloat(parts[1].trim());
      if (key === 'OverallDifficulty') meta.od = val;
      if (key === 'HPDrainRate') meta.hp = val;
      if (key === 'SliderMultiplier') meta.sv = val;
    }
    if (section === '[HitObjects]') {
      const parts = line.split(',');
      const time = parseInt(parts[2]);
      const hitSound = parseInt(parts[4]) || 0;
      const isKat = (hitSound & 2) || (hitSound & 8); 
      const isBig = (hitSound & 4); 
      notes.push({ time, type: isKat ? 'kat' : 'don', isBig: !!isBig, hit: false, missed: false });
    }
  }
  notes.sort((a, b) => a.time - b.time);
  stats.totalNotes = notes.length;
  document.getElementById('disp-od').innerText = `OD: ${meta.od}`;
  document.getElementById('disp-hp').innerText = `HP: ${meta.hp}`;
  document.getElementById('disp-sv').innerText = `SV: ${meta.sv}`;
  window300 = 80 - 6 * meta.od;
  window100 = 140 - 8 * meta.od;
  if (window300 < 20) window300 = 20;
  if (window100 < 50) window100 = 50;
}

function update() {
  if (!playing) return;
  const now = (audio.currentTime * 1000);
  for (let n of notes) {
    if (!n.hit && !n.missed && n.time < now - window100) {
      n.missed = true;
      triggerHitEffect('MISS', 0);
      combo = 0;
      hpCurrent = Math.max(0, hpCurrent - (meta.hp * 0.5));
    }
  }
}

function draw() {
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 100, canvas.width, 120); 
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 100); ctx.lineTo(canvas.width, 100);
  ctx.moveTo(0, 220); ctx.lineTo(canvas.width, 220);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ddd'; 
  ctx.beginPath();
  ctx.arc(HIT_X, 160, 35, 0, Math.PI*2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fill();

  if (!playing && !isFinished) return;
  const now = audio ? (audio.currentTime * 1000) : 0;
  const currentSpeed = BASE_SPEED * meta.sv;

  for (let i = notes.length - 1; i >= 0; i--) {
    let n = notes[i];
    if (n.hit) continue;
    const x = HIT_X + (n.time - now) * currentSpeed;
    if (x < -60 || x > canvas.width + 60) continue;
    const radius = n.isBig ? 50 : 30;
    const color = n.type === 'don' ? '#ff4000' : '#00aaff';
    ctx.beginPath();
    ctx.arc(x, 160, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  updateAndDrawEffects();
  drawUI();
  drawURBar();
  if (playing) {
    requestAnimationFrame(() => { update(); draw(); });
  }
}

function triggerHitEffect(text, points) {
  hitEffects.push({ text: text, spawnTime: performance.now() });
  if (text === 'MISS') {
    stats.miss++;
  } else {
    combo++;
    if (combo > maxCombo) maxCombo = combo;
    score += points + Math.min(combo, 100) * 10;
    if (text === '300') stats.perfect++;
    else if (text === '100') stats.good++;
    const gain = (200 / (stats.totalNotes || 100)) * (1 + (10 - meta.hp)/20);
    hpCurrent = Math.min(HP_MAX, hpCurrent + (text === '300' ? gain : gain * 0.5));
  }
}

function finishGame() {
  playing = false;
  isFinished = true;
  const totalHits = stats.perfect + stats.good + stats.miss;
  const acc = totalHits === 0 ? 0 : 
    ((stats.perfect * 100 + stats.good * 50) / (totalHits * 100)) * 100;
  let rank = 'D';
  let rankClass = 'rank-D';
  if (acc === 100) { rank = 'SS'; rankClass = 'rank-S'; }
  else if (acc >= 95) { rank = 'S'; rankClass = 'rank-S'; }
  else if (acc >= 90) { rank = 'A'; rankClass = 'rank-A'; }
  else if (acc >= 80) { rank = 'B'; rankClass = 'rank-B'; }
  else if (acc >= 70) { rank = 'C'; rankClass = 'rank-C'; }
  
  document.getElementById('resScore').innerText = score.toLocaleString();
  document.getElementById('resRank').innerText = rank;
  document.getElementById('resRank').className = 'result-rank ' + rankClass;
  document.getElementById('res300').innerText = stats.perfect;
  document.getElementById('res100').innerText = stats.good;
  document.getElementById('resMiss').innerText = stats.miss;
  document.getElementById('resCombo').innerText = maxCombo;
  document.getElementById('resAcc').innerText = acc.toFixed(2) + '%';
  document.getElementById('resultOverlay').style.display = 'flex';
}

function closeResults() {
  document.getElementById('resultOverlay').style.display = 'none';
  isFinished = false;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  draw(); 
}

function retryGame() {
  closeResults();
  if (cachedOsuText && audio) {
    parseOsu(cachedOsuText);
    audio.volume = currentVolume / 100; 
    audio.currentTime = 0;
    audio.play();
    playing = true;
    isFinished = false;
    requestAnimationFrame(() => { update(); draw(); });
  }
}

function drawUI() {
  // Score
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(score.toString().padStart(7, '0'), canvas.width - 20, 50);

  // Combo (MOVED to Track)
  if (combo > 0) {
    ctx.save(); 
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 60px Arial'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    // Draw at X=80 (left of hit circle), Y=160 (center of track)
    ctx.fillText(combo, 80, 160);
    ctx.restore(); 
  }

  // HP Bar
  const hpW = 400; const hpH = 15; const hpX = HIT_X; const hpY = 30;
  ctx.fillStyle = '#444'; ctx.fillRect(hpX, hpY, hpW, hpH);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.strokeRect(hpX, hpY, hpW, hpH);
  const fillPct = hpCurrent / HP_MAX;
  let hpColor = fillPct >= 0.5 ? '#ffd700' : '#ff4444';
  ctx.fillStyle = hpColor; ctx.fillRect(hpX, hpY, hpW * fillPct, hpH);
  ctx.fillStyle = '#fff'; ctx.fillRect(hpX + hpW * 0.5, hpY - 5, 2, hpH + 10);
}

function updateAndDrawEffects() {
  const now = performance.now();
  for (let i = hitEffects.length - 1; i >= 0; i--) {
    let eff = hitEffects[i];
    const age = now - eff.spawnTime;
    if (age > 400) { hitEffects.splice(i, 1); continue; }
    const yOffset = age * 0.15; 
    const alpha = 1 - (age / 400);
    ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = 'center';
    if (eff.text === '300') { 
        ctx.fillStyle = '#f6d123'; ctx.font = 'bold 45px Arial'; ctx.fillText("良", HIT_X, 100 - yOffset);
    } else if (eff.text === '100') {
        ctx.fillStyle = '#fff'; ctx.font = 'bold 40px Arial'; ctx.fillText("可", HIT_X, 100 - yOffset);
    } else {
        ctx.fillStyle = '#666'; ctx.font = 'bold 40px Arial'; ctx.fillText("不可", HIT_X, 100 - yOffset);
    }
    ctx.restore();
  }
}

function drawURBar() {
  const barW = 300; const barH = 10;
  const barX = (canvas.width - barW) / 2; const barY = 360;
  const center = barX + barW / 2;
  const scale = (barW / 2) / window100; 
  ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = '#fff'; ctx.fillRect(center - 1, barY - 5, 2, barH + 10);
  const range300 = window300 * scale;
  ctx.fillStyle = 'rgba(255, 204, 0, 0.3)'; ctx.fillRect(center - range300, barY, range300 * 2, barH);
  ctx.globalAlpha = 0.8;
  for (let err of hitErrors) {
    const x = center + (err * scale);
    let c = '#ff4444'; 
    const absErr = Math.abs(err);
    if (absErr <= window300) c = '#33ccff';
    else if (absErr <= window100) c = '#66ff66';
    ctx.fillStyle = c; ctx.fillRect(x - 1, barY, 2, barH);
  }
  ctx.globalAlpha = 1.0;
  if (hitErrors.length > 30) hitErrors.shift();
}

function tryHit(inputType) {
  if (!playing) return;
  const now = (audio.currentTime * 1000);
  for (let n of notes) {
    if (n.hit || n.missed) continue;
    const diff = n.time - now; 
    const absDiff = Math.abs(diff);
    if (absDiff <= window100) {
      if (n.type === inputType) {
        n.hit = true;
        hitErrors.push(diff);
        if (absDiff <= window300) triggerHitEffect('300', 300);
        else triggerHitEffect('100', 100);
      } else {
        n.missed = true;
        triggerHitEffect('MISS', 0);
        combo = 0;
        hpCurrent = Math.max(0, hpCurrent - 2);
      }
      return; 
    }
  }
}

window.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === ' ') { e.preventDefault(); } 
  const k = e.key.toLowerCase();
  const keyMap = getKeyMapping();
  if (keyMap[k]) {
    tryHit(keyMap[k]);
  }
});

document.getElementById('osuFile').addEventListener('change', e => {
  const f = e.target.files[0];
  if(f) {
    document.getElementById('osuLabel').innerText = f.name;
    const r = new FileReader();
    r.onload = ev => { parseOsu(ev.target.result); };
    r.readAsText(f);
    e.target.blur();
  }
});

document.getElementById('audioFile').addEventListener('change', e => {
  const f = e.target.files[0];
  if(f) {
    document.getElementById('audioLabel').innerText = f.name;
    if(audio) { audio.pause(); }
    audio = new Audio(URL.createObjectURL(f));
    audio.volume = currentVolume / 100; 
    audio.onended = () => { finishGame(); };
    e.target.blur();
  }
});

const playBtn = document.getElementById('playBtn');
playBtn.onclick = () => {
  playBtn.blur();
  if (!notes.length || !audio) { alert(t('missingFiles')); return; }
  if (cachedOsuText) parseOsu(cachedOsuText);
  audio.volume = currentVolume / 100; 
  audio.currentTime = 0;
  audio.play();
  playing = true;
  isFinished = false;
  requestAnimationFrame(() => { update(); draw(); });
};

draw();