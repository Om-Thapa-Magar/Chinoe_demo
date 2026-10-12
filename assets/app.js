/* ===================================================================
   CHINOÉTALES — Shared Application Logic & CMS Engine
   =================================================================== */

/* ===== LOGOS & ASSET PATH HELPERS ===== */
const heroLogo = document.getElementById('heroLogo');
if (heroLogo) heroLogo.src = 'img/wordmark-white.png';

/* ===== DEFAULT CONTENT (overridable by CMS) ===== */
let faq = [
  { q: "What does Chinoétales Productions do?", n: "We are a story-driven film studio based in Kathmandu. We direct, shoot, and edit music videos, commercials, documentaries and visual narratives — from the first treatment through to the final grade." },
  { q: "How many people are on the team?", n: "Thirteen. Direction, cinematography, production design, art direction, editing, styling and the operations that hold it all together are all in-house, and we work with a regular circle of collaborators beyond that." },
  { q: "How many films have you made?", n: "Over 100 music videos released since 2021, for more than 50 artists and bands." },
  { q: "Do you work outside Kathmandu?", n: "Yes. We are based in Kathmandu and available for projects anywhere — shoots have taken us across Nepal, and we take on international work." },
  { q: "What does a project usually involve?", n: "Most begin with a conversation about the song and what it should feel like. From there we build the treatment, assemble the crew, shoot, and deliver the finished film — including the behind-the-scenes cut where the project calls for one." },
  { q: "How do I start a project with you?", n: "Send us the track and a note about what you have in mind through the contact page. Tell us your timeline and any references, and we will come back to you — we typically respond within 48 hours." }
];

window.__projects = [
  { t: "Ajambari Jhari", slug: "ahjambari-jhari" },
  { t: "Alvida", slug: "alvida" },
  { t: "Bhagyamaani", slug: "bhayemani" },
  { t: "Dhun", slug: "dhun" },
  { t: "Fijeko Kesh", slug: "fijeko-kesh" },
  { t: "Fir Kabhi", slug: "fir-khabi" },
  { t: "Ghara Ko Kancho Choro", slug: "ghara-ko-kancho-choro" },
  { t: "Hajar Janma", slug: "hajar-janma" },
  { t: "Hamro Maya", slug: "hamro-maya" },
  { t: "Hereko Herei", slug: "hereko-herai" },
  { t: "Hey Sailaa", slug: "hey-sailaa" },
  { t: "Jay Mahakali", slug: "jay-mahakali" },
  { t: "Jhim Jhimaune Aankha", slug: "jhim-jhimaune-aakha" },
  { t: "K Garu", slug: "k-garu" },
  { t: "Laijau Malai", slug: "laijaw-malai" },
  { t: "Ma Mare Pani", slug: "ma-mare-pani" },
  { t: "Maila Dai", slug: "maila-dai" },
  { t: "Makhamali", slug: "makhamali" },
  { t: "Maana Ko Haal", slug: "mana-ko-haal" },
  { t: "Mandainani Mana", slug: "mandaina-ni-mana" },
  { t: "Maya Ko Aago", slug: "maya-ko-aago" },
  { t: "Maya Ma", slug: "maya-ma" },
  { t: "Nindra Ma", slug: "nindra-ma" },
  { t: "Parichaya", slug: "parichaya" },
  { t: "Sahara", slug: "sahara" },
  { t: "Samau Mero Haat", slug: "samau-mero-haat" },
  { t: "Sisir", slug: "shisir" },
  { t: "Soltini", slug: "soltini" },
  { t: "Sparsha Sangeet", slug: "sparsha-sangeet" },
  { t: "Auchau Vane", slug: "timi-aauchau-vane" }
];
let directors = [
  {
    a: 'Abhi Sampang Rai', role: 'CEO / Director', photo: 'img/team/abhi.jpg', style: 'Cinematic Storytelling',
    about: `Leads Chinoétales as both a company and a creative force, setting the studio's vision while staying hands-on in the director's chair. His signature combines bold visual aesthetics with deeply emotional storytelling, translating lyrical content into powerful visual metaphors.`,
    works: ['<b>Sparsha Sangeet</b> · Purna Rai & Dajubhaiharu', '<b>Ma Mare Pani</b> · Swar', '<b>Soltini</b> · Ekdev Limbu', '<b>Nindra Ma</b> · The Solace', '<b>Maya Ko Aago</b> · Rockheads'],
    q: `"I believe every song carries a visual story waiting to be discovered. Our job is not to create new stories, but to excavate the emotional truth already embedded in the music."`
  },
  {
    a: 'Bikesh Magar', role: 'CTO / DOP', photo: 'img/team/bikesh.jpg', style: 'Light & Composition',
    about: `The technical backbone of Chinoétales' image-making, leading the camera department while shaping the studio's broader technical direction and equipment strategy. A cinematographer with a sharp eye for light and composition.`,
    works: ['<b>Ma Mare Pani</b> · Swar', '<b>Like Jennie</b> · Cover Project', 'Lead DOP across commercials & music videos'],
    q: `"Technical excellence is the foundation upon which artistic vision stands. Every decision, from camera movement to colour temperature, serves the story."`
  },
  {
    a: 'Shristi Rai', role: 'CFO / Production Designer', photo: 'img/team/shristi.jpg', style: 'World-Building',
    about: `Holds the financial backbone of Chinoétales together while shaping the visual world of every set she designs, blending a producer's discipline with a designer's eye for emotional authenticity and cultural sensitivity.`,
    works: ['<b>Jhim Jhimaune Aankha</b> · Ekdev Limbu', '<b>Hey Sailaa</b> · Abhaya & The Steam Engines', 'Production design across flagship projects'],
    q: `"The most powerful stories are the ones that feel inevitable, where every visual choice seems like the only possible choice. That's when art happens."`
  },
  {
    a: 'Aadi Pahari', role: 'Operational Manager', photo: 'img/team/aadi.jpg', style: 'Flawless Execution',
    about: `Keeps Chinoétales running, the person who turns a creative brief into a schedule, a schedule into a shoot day, and a shoot day into a delivered project. Ground-level experience across productions of every scale means nothing falls through the cracks.`,
    works: [],
    q: `"Great productions aren't built on great ideas alone, they're built on flawless execution. My role is making sure the team can focus on the work, not the logistics."`
  },
  {
    a: 'Santosh S. Thakuri', role: 'Creative Head', photo: 'img/team/santosh.jpg', style: 'Contemporary Energy',
    about: `Brings fresh, contemporary energy to Chinoétales' creative direction, shaping the studio's evolving visual language, pushing projects toward dynamic, digital-age storytelling while staying rooted in cultural authenticity.`,
    works: ['Contemporary music video & commercial projects', 'Ongoing creative direction across the pipeline'],
    q: `"Every generation has its own visual language. My goal is to help our stories find expressions that feel true to this moment, honest, dynamic, and authentic."`
  },
  {
    a: 'Devarshi.S', role: 'Creative Director', photo: 'img/team/devarshi.jpg', style: 'Visual Precision',
    about: `Shapes the creative backbone of every production, translating raw concepts into a coherent visual and narrative direction, with meticulous composition, complex technical problem-solving, and an unwavering commitment to artistic integrity.`,
    works: ['<b>Ma Mare Pani</b> · Swar', '<b>Makhamali</b> · The Hulaki', '<b>Mandainani Mana</b> · Ekdev Limbu'],
    q: `"Technology should become invisible so the story can become everything. That's the standard every creative decision has to meet."`
  },
  {
    a: 'Kiwa Khimdung Rai', role: 'Cinematographer', photo: 'img/team/kiwa.jpg', style: 'Motion & Frame',
    about: `Brings a sharp visual instinct to every frame he shoots, serving the story through light, movement, and composition rather than spectacle for its own sake, across music videos, commercials, and documentary-style projects.`,
    works: [],
    q: `"A shot only works if it disappears into the story. My job is to make every frame feel like it couldn't have been captured any other way."`
  },
  {
    a: 'Samasti Rai', role: 'Art Director', photo: 'img/team/samasti.jpg', style: 'Production Design',
    about: `Builds the visual world every Chinoétales project lives in, from set dressing to props to the overall aesthetic language of a production. Art direction is never an afterthought; it's baked into the story from day one.`,
    works: ['<b>Jhim Jhimaune Aankha</b> · Ekdev Limbu', 'Art direction across music video & commercial projects'],
    q: `"Great production design should never call attention to itself, it should just feel like the only world this story could exist in."`
  },
  {
    a: 'Ongdi Moktan', role: 'Art Director', photo: 'img/team/ongdi.jpg', style: 'Detail & Craft',
    about: `Supports the art department across every stage of production, from prep and sourcing through on-set execution. An eye for detail that keeps the art department running smoothly under pressure.`,
    works: [],
    q: `"The details nobody notices are usually the ones holding the whole shot together."`
  },
  {
    a: 'Dipika Rai', role: 'Content Manager', photo: 'img/team/dipika.jpg', style: 'Story & Reach',
    about: `Manages how Chinoétales' work reaches the world, coordinating content across platforms, timelines, and campaigns, from behind-the-scenes documentation to full release strategy for finished projects.`,
    works: [],
    q: `"A great film still needs the right story told about how it reaches people. That's the part of the job I care about most."`
  },
  {
    a: 'Arbind', role: 'DIT', photo: 'img/team/arbind.jpg', style: 'Data Integrity',
    about: `Responsible for the integrity of Chinoétales' footage from the moment it's captured to the moment it reaches the edit suite, data management, on-set backups, and first-pass technical quality checks.`,
    works: [],
    q: `"Nobody notices the DIT until something goes wrong. My job is making sure that never happens."`
  },
  {
    a: 'Nichal Gurung', role: 'Editor', photo: 'img/team/nischal.jpg', style: 'Rhythm & Pacing',
    about: `Shapes the final rhythm of Chinoétales' projects in the edit suite. With an innate sense of pacing and music-visual synchronisation, his editing is where performance, cinematography, and story finally come together.`,
    works: [],
    q: `"Editing is where the story is truly told. When the cuts disappear, that's when the audience stops watching and starts feeling."`
  },
  {
    a: 'Bomi Rai', role: 'Stylist', photo: 'img/team/bomi.jpg', style: 'Character & Look',
    about: `Shapes how every artist and cast member looks on screen, wardrobe, styling, and the visual identity that has to hold up under studio lights and outdoor locations alike, always built for both camera and story.`,
    works: [],
    q: `"Styling isn't decoration, it's characterisation. What someone wears has to tell you who they are before they say a single word."`
  },
];

const W = (t, a, d, y, id, cat) => ({ t, a, d, y, id, cat: cat || 'Music Video' });
let works = [
  W('Maya Ma', 'Purna Rai & Dajubhaiharu', 'Abhi', '2025', '5yuuRveinFc'),
  W('Laijau Malai', 'Tribal Rain', 'Abhi', '2025', 'ntKzGQEDBXs'),
  W('Ma Mare Pani', 'Swar', 'Abhi', '2025', 'lsqbpw67hSs'),
  W('Sparsha Sangeet', 'Purna Rai & Dajubhaiharu', 'Abhi', '2024', 'K-w04FG6eyI'),
  W('Soltini', 'Ekdev Limbu', 'Abhi', '2024', 'HU5oZNvLmw8'),
  W('K Garu', 'John Rai & The Locals', 'Abhi', '2024', 'fGF10RLUm1U'),
  W('Nindra Ma', 'The Solace', 'Abhi', '2024', 'zWVERn9EfWE'),
  W('Jhim Jhimaune Aankha', 'Ekdev Limbu', 'Sisu & Samu', '2024', 'DZ4BtMpaJaU'),
  W('Hey Sailaa', 'Abhaya & The Steam Engines', 'Abhi & Sisu', '2025', '83B-_ibtvYU'),
  W('Bhagyamaani', 'The Hulaki', 'Arshu', '2025', 'zsTjVCaOWw8'),
  W('Saathma', 'Nineties', 'Biku', '2024', 'uuDfIOf1XOE'),
  W('Fasaideu', 'Vek', 'Biku', '2026', 'Mh6AZNA6UzE'),
  W('Yei Maya Ho', 'Vek', 'Biku', '2026', 'eV3V2JHr9sU'),
  W('Makhamali', 'The Hulaki', 'Dev', '2026', 'tVs5gi5vw6w'),
  W('Mandainani Mana', 'Ekdev Limbu', 'Dev', '2025', '4ESj3_wpibA'),
  W('Maila Dai', 'Abhijeet Khadgi', 'Dev', '2024', 'bqqtnsW-zXk'),
  W('Sisir', 'Dibya Distry', 'Dev', '2026', 'dIrLADwvj4A'),
  W('Alvida', 'Mohini', 'Dev', '2025', 'NTKAr2fsO4w'),
  W('Ajambari Jhari', 'Suvam Gurung', 'Aakash', '2025', 'HTYT_6jygJc'),
  W('Kura', 'Freebirds', 'Aakash', '2026', 'o_vFurJR31E'),
  W('Maya Ko Sansaar', 'Deeya Gurung', 'Aakash', '2025', 'fi_rRrrQWGQ'),
  W('Project Deepak', 'Ramesh Uncle', 'Aakash', '2025', '0p2C1QXdxMU'),
  W('Ekohoro Maya', 'Chhewang Lama', 'Aakash', '2024', 'ulQHN-5SU-4'),
  W('Hulaki Dai', 'Aman Basnet', 'Arshu', '2025', '_Rk1Sw7YDDI'),
  W('Sparsha', 'Prabesh Thapa', 'San', '2025', 'J1vZsoG0pUk'),
  W('Timi Vaye Pugcha', 'Rashik Aryal', 'San', '2025', 'jd6jS731EGY'),
  W('Timro Muskan', 'Ekdev Limbu', 'Abhi', '2025', 'lq6DvP7j0Yg'),
  W('Maana Ko Haal', 'Ekdev Limbu', 'Abhi', '2026', 'dPZWY226Jno'),
  W('Fijeko Kesh', 'Ekdev Limbu', 'Abhi', '2025', 'JWI_ngCORdg'),
  W('Fijeko Kesh (Reimagined)', 'Ekdev Limbu', 'Abhi', '2025', 'e9_INHxOIzM'),
  W('Malai Hera', 'Sabin Rai & The Pharaoh', 'Abhi', '2026', 'lBMYIclXWNo'),
  W('Dhun', 'Rockheads', 'Abhi', '2024', 'uXN6wT9Qz18'),
  W('Hajar Janma', 'Rockheads', 'Abhi', '2023', 'm4Tj1EfRKlg'),
  W('Rat Race', 'Suski', 'Abhi', '2024', 'waeHfil_BK0'),
  W('Parichaya', 'Freebird', 'Abhi', '2023', 'vRzjPbyc57g'),
  W('Fir Kabhi', 'PUSHP', 'Abhi & Dev', '2023', 'h0hnbIGl-qA'),
  W('Parkha Hai Maya', 'Saurab Tamang', 'Abhi', '2024', 'Nhvp8WVgHN8'),
  W('Auchau Vane', 'George Gurung', 'Abhi', '2022', 'zgJvKWZh7CI'),
  W('Gorkhali Flo', 'PGGH ft. Professor Trix', 'Abhi', '2022', '8aiJEU9gP_g'),
  W('Hereko Herei', 'SickJam', 'Abhi', '2021', 'yucIleOdT4M'),
  W('Aafno Lagi', 'Rabil Shrestha', 'Sisu', '2021', '2-7WilDZV9Y'),
  W('Niyaali Hera', 'Swoopna Suman', '', '2024', 'LaRqVQ467xo'),
  W('Pagalpan', 'Subani Moktan', '', '2024', 'p7nkmtRdnto'),
  W('Timi Sangai', 'Prabesh Kumar Shrestha', '', '2024', 'WLZpjkvR5EQ'),
  W('Jawaaf', 'Diwas Gurung', '', '2024', 'G9Oci6Xt2cg'),
  W('Tadha Tadha', 'Wangden Sherpa ft. Prajina', '', '2024', '2112ZFrdZBk'),
  W('Timro Bolima', 'Swoopna Suman & Jyotsna Yogi', '', '2024', 'k4Bx9D5M6pQ'),
  W('Hamro Maya', 'The Edge Band', '', '2025', 'NIY9w9glrGQ'),
  W('Sahara', 'Bipul Mahat', '', '2025', 'jsSMgeXPaME'),
  W('Parkhi Rahechu', 'John Rai', '', '2025', 'Ye8NxLnh8qE'),
  W('Bhariya Dai', 'J Limbu', '', '2025', 'dysQh-Ugyxc'),
  W('Tihar Song', 'Melonix', '', '2025', 'i5Rc8l5C-jo'),
  W('Prakriti', 'Bipul Chettri', '', '2025', 'chn_GHs_Hy8'),
  W('Angali Deu', 'Subid Pun', '', '2026', 'c-PPCC45WUc'),
  W('Samau Mero Haat', 'Shuprim Magar', '', '2026', 'aR8PwgXQvpA'),
  W('Aama', 'Kesang Tshering Sherpa', '', '2026', 'vsp0NFB55rM'),
  W('Ghara Ko Kancho Choro', 'Samir Shrestha', 'Aakash', '2025', 'giRSESKZHrg'),
  W('Jay Mahakali', 'Balen Shah', '', '2025', 'Yse0H0mXEuQ'),
  W('Maya Ko Aago', 'Rockheads', 'Abhi', '2026', 'WstiluYoJ7U'),
  W('Kherai Jane Maya', 'Keher Limbo', 'Dev', '2026', 'a_TAnqNru0Q'),
  W('Jhut', 'Tala Anjum & Bibash JK', 'Biku', '2026', 'eAyCZsMFKhM'),
];

let services = [
  { t: 'Music Video Production', d: 'Our specialty. From concept through final delivery, we treat every song as a visual storytelling opportunity, narrative, performance, experimental, and lyric formats.', tags: ['Narrative', 'Performance', 'Experimental', 'Lyric'] },
  { t: 'Commercial & Branded Content', d: 'Bringing artistic sensibility to commercial work. Proving that commercial and artistic need not be opposed concepts.', tags: ['Brand Films', 'Product Films', 'Ad Spots', 'Digital'] },
  { t: 'Documentary Production', d: 'Visual exploration of real stories, artist documentaries, cultural documentation, and cinematic performance films.', tags: ['Artist Docs', 'Culture', 'Live'] },
  { t: 'Specialized Post', d: 'Sophisticated colour work, VFX that serves story, professional sound design, and the invisible craft of the final cut.', tags: ['Colour', 'VFX', 'Sound', 'Edit'] },
  { t: 'Creative Direction', d: 'No director? Need guidance? We offer concept development, production consulting, and post-production supervision.', tags: ['Consultation', 'Supervision'] },
];

const settings = Object.assign({
  statVideos: '100+', statYears: '2021\u201326', statArtists: '50+', statDirectors: '20+',
  aboutVideos: 70, aboutArtists: 50, aboutDirectors: 20, aboutYears: 10,
  contactEmail1: 'chinoetales@gmail.com',
  phones: ['+977 9700043499', '+977 9700043489', '+977 9700043479'],
  location: 'Based in Kathmandu, Nepal\nAvailable for projects globally',
  playlist: 'https://www.youtube.com/watch?v=DZ4BtMpaJaU&list=PL9Z9We-FA4DdMxamqRL4m3N7bARTvdkwo',
  social: [
    { n: 'YouTube', u: 'https://www.youtube.com/@chinoetalesofficial' },
    { n: 'Instagram', u: 'https://www.instagram.com/chinoetales.productions/' },
    { n: 'Facebook', u: 'https://www.facebook.com/chinoetales.productions' },
    { n: 'LinkedIn', u: 'https://www.linkedin.com/company/chino%C3%A9tales-productions/' },
    { n: 'TikTok', u: 'https://www.tiktok.com/@chinoetalesofficial' },
    { n: 'Pinterest', u: 'https://www.pinterest.com/chinoetalesofficial/' },
    { n: 'Giphy', u: 'https://giphy.com/channel/chinoetalesofficial' }
  ],
  aboutBandId: 'K-w04FG6eyI',
  copyright: '\u00a9 2026 Chino\u00e9tales Films Pvt. Ltd.',
  top10: ['Sparsha Sangeet', 'Maya Ma', 'Jhim Jhimaune Aankha', 'Ma Mare Pani', 'Hey Sailaa', 'K Garu', 'Soltini', 'Nindra Ma', 'Bhagyamaani', 'Makhamali']
}, {});

/* ===== CONTENT LOADER (localStorage -> content.json -> defaults) ===== */
const CMS_KEY = 'chinoe_cms_v1';
function cmsGet(o, path) { return path.split('.').reduce((x, k) => (x == null ? x : x[k]), o); }

const THEME_VARS = ['white', 'black', 'grey', 'font', 's0', 's1', 's2', 's3', 's4', 's5', 'sec', 'ease', 'lineD', 'lineL'];
const VAR_NAME = { lineD: '--line-d', lineL: '--line-l' };

function applyTheme(t) {
  if (!t) return;
  const r = document.documentElement;
  THEME_VARS.forEach(k => {
    const v = t[k];
    if (v !== undefined && v !== '') r.style.setProperty(VAR_NAME[k] || ('--' + k), v);
  });
  if (t.fontFace) {
    let st = document.getElementById('cmsFont');
    if (!st) { st = document.createElement('style'); st.id = 'cmsFont'; document.head.appendChild(st); }
    st.textContent = t.fontFace;
  }
}

function applyPages(c) {
  document.querySelectorAll('[data-cms]').forEach(el => {
    const v = cmsGet(c, el.dataset.cms);
    if (v != null && v !== '') el.innerHTML = v;
  });
}

function applyAssets(c) {
  document.querySelectorAll('[data-cms-src]').forEach(el => {
    const v = cmsGet(c, el.dataset.cmsSrc);
    if (v) {
      if (el.hasAttribute('data-src')) el.dataset.src = v;
      else if (el.getAttribute('src') !== v) el.src = v;
    }
    if (el.dataset.cmsPoster) {
      const pv = cmsGet(c, el.dataset.cmsPoster);
      if (pv) el.poster = pv;
    }
  });
  const hl = cmsGet(c, 'assets.heroLogo');
  if (hl) { const h = document.getElementById('heroLogo'); if (h) h.src = hl; }
}

function applyContent(c) {
  if (!c) return;
  if (Array.isArray(c.works)) works = c.works;
  if (Array.isArray(c.directors)) directors = c.directors;
  if (Array.isArray(c.faq)) faq = c.faq;
  if (Array.isArray(c.services)) services = c.services;
  if (Array.isArray(c.projects)) window.__projects = c.projects;
  if (c.settings) Object.assign(settings, c.settings);
  applyTheme(c.theme);
  applyPages(c);
  applyAssets(c);
}

/* ===== FAST CACHE-FIRST / SWR HYDRATION ===== */
const CONTENT_CACHE_KEY = 'chinoe_site_cache_v1';
let lastAppliedSignature = '';

function getCachedContent() {
  try {
    const s = localStorage.getItem(CONTENT_CACHE_KEY) || localStorage.getItem(CMS_KEY);
    if (s) {
      const parsed = JSON.parse(s);
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length) return parsed;
    }
  } catch (e) { }
  return null;
}

function setCachedContent(data) {
  try {
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data));
  } catch (e) { }
}

function loadContentSync() {
  const cached = getCachedContent();
  if (cached) {
    lastAppliedSignature = JSON.stringify(cached);
    applyContent(cached);
    return true;
  }
  return false;
}

async function revalidateContent() {
  // Non-blocking background revalidation from Supabase
  if (window.ChinoeData && window.ChinoeData.fetchSiteContent) {
    try {
      const cloudData = await window.ChinoeData.fetchSiteContent();
      if (cloudData && Object.keys(cloudData).length) {
        const newSig = JSON.stringify(cloudData);
        if (newSig !== lastAppliedSignature) {
          lastAppliedSignature = newSig;
          setCachedContent(cloudData);
          applyContent(cloudData);
          buildAll();
        }
        return;
      }
    } catch (err) {
      console.warn('Background Supabase refresh failed:', err);
    }
  }

  // Fallback to local content.json if cache was empty
  if (!lastAppliedSignature) {
    try {
      const r = await fetch('content.json', { cache: 'no-store' });
      if (r.ok) {
        const j = await r.json();
        setCachedContent(j);
        applyContent(j);
        buildAll();
      }
    } catch (e) { }
  }
}
window.loadContent = revalidateContent;

/* ===== RENDERERS ===== */
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function dirAvatarHTML(d) {
  return d.photo
    ? `<img src="${esc(d.photo)}" alt="${esc(d.a)}" loading="lazy" decoding="async" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src=(this.src.includes('assets/')?this.src.replace('assets/',''):'assets/'+this.getAttribute('src'));}">`
    : `<span>${(d.a || '?')[0]}</span>`;
}

function renderDirectors() {
  const dirList = document.getElementById('dirList');
  if (!dirList) return;
  dirList.innerHTML = '';
  directors.forEach((d, i) => {
    const c = document.createElement('button');
    c.className = 'dir-card'; c.type = 'button';
    c.setAttribute('aria-label', `${d.a || ''}${d.role ? ', ' + d.role : ''} — open profile`);
    c.title = 'Double-click to open profile';
    c.innerHTML = `<span class="dir-avatar${d.photo ? ' has-photo' : ''}" data-style="${esc(d.style)}">${dirAvatarHTML(d)}</span>
      <span class="dir-name">${d.a || ''}</span>
      <span class="dir-role">${d.role || ''}</span>`;
    c.onclick = () => dirCardClick(i);
    c.ondblclick = () => dirCardOpen(i);
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dirCardOpen(i); }
    });
    c.addEventListener('focus', () => dirCentre(i));
    dirList.appendChild(c);
  });
  dirInit();
}

/* ===== TEAM COVERFLOW ===== */
let dirPos = 0, dirTarget = 0, dirRAF = 0;
const DIR_STILL = matchMedia('(prefers-reduced-motion: reduce)');

function dirWrapped(i) {
  const dirList = document.getElementById('dirList');
  if (!dirList) return 0;
  const N = dirList.children.length;
  let d = (i - dirPos) % N;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

function dirRender() {
  const dirList = document.getElementById('dirList');
  if (!dirList) return;
  const cards = dirList.children, N = cards.length;
  if (!N) return;
  const spread = cards[0].offsetWidth * 0.62;
  let h = 0;
  for (let i = 0; i < N; i++) {
    const c = cards[i], d = dirWrapped(i), ad = Math.abs(d);
    if (ad > 2.6) { c.style.visibility = 'hidden'; c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; continue; }
    c.style.visibility = ''; c.removeAttribute('aria-hidden'); c.tabIndex = 0;
    const scale = Math.max(.7, 1 - .14 * ad);
    c.style.transform = `translateX(${(d * spread).toFixed(1)}px) scale(${scale.toFixed(3)})`;
    c.style.zIndex = String(100 - Math.round(ad * 10));
    c.style.filter = ad < .12 ? 'none' : `blur(${Math.min(6, ad * 2.6).toFixed(1)}px) brightness(${Math.max(.55, 1 - ad * .2).toFixed(2)})`;
    c.style.opacity = ad > 2 ? Math.max(0, 1 - (ad - 2) / .6).toFixed(2) : '1';
    c.classList.toggle('is-front', ad < .5);
    h = Math.max(h, c.offsetHeight);
  }
  if (h) dirList.style.height = h + 'px';
}

function dirStep() {
  const diff = dirTarget - dirPos;
  if (Math.abs(diff) < .002) { dirSettle(); dirRAF = 0; return; }
  dirPos += diff * .14;
  dirRender();
  dirRAF = requestAnimationFrame(dirStep);
}

function dirKick() {
  if (DIR_STILL.matches) { dirSettle(); return; }
  cancelAnimationFrame(dirRAF);
  dirRAF = requestAnimationFrame(dirStep);
}

function dirSettle() {
  const dirList = document.getElementById('dirList');
  if (!dirList) return;
  const N = dirList.children.length || 1;
  dirPos = dirTarget = ((dirTarget % N) + N) % N;
  dirRender();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  cancelAnimationFrame(dirRAF); dirRAF = 0;
  dirSettle();
});

function dirCentre(i) {
  const d = dirWrapped(i);
  if (Math.abs(d) > .05) { dirTarget = dirPos + d; dirKick(); }
}

function dirCardClick(i) {
  if (dirDragged()) return;
  if (Math.abs(dirWrapped(i)) >= .5) dirCentre(i);
}

function dirCardOpen(i) {
  if (dirDragged()) return;
  if (Math.abs(dirWrapped(i)) < .5) openDir(i);
  else dirCentre(i);
}

function dirInit() {
  dirPos = dirTarget = 0;
  dirRender();
  dirPrimePhotos();
  setTimeout(dirRender, 80);
}

const dirPrev = document.getElementById('dirPrev');
const dirNext = document.getElementById('dirNext');
if (dirPrev) dirPrev.onclick = () => { dirTarget = Math.round(dirTarget) - 1; dirKick(); };
if (dirNext) dirNext.onclick = () => { dirTarget = Math.round(dirTarget) + 1; dirKick(); };
addEventListener('resize', dirRender);

let dirPrimed = false;
function dirPrimePhotos() {
  const dirList = document.getElementById('dirList');
  if (!dirList || dirPrimed) return;
  dirPrimed = true;
  dirList.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
}

const dirDragged = (() => {
  const dirList = document.getElementById('dirList');
  if (!dirList) return () => false;
  let down = false, dragged = false, x0 = 0, t0 = 0;
  dirList.addEventListener('pointerdown', e => {
    down = true; dragged = false; x0 = e.clientX; t0 = dirTarget = dirPos;
    cancelAnimationFrame(dirRAF); dirRAF = 0;
  });
  addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - x0;
    if (!dragged && Math.abs(dx) > 8) { dragged = true; dirList.classList.add('dragging'); }
    if (dragged) {
      dirPos = dirTarget = t0 - dx / (dirList.children[0].offsetWidth * 0.62);
      dirRender();
    }
  });
  addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    if (dragged) {
      dirList.classList.remove('dragging');
      dirTarget = Math.round(dirPos);
      dirKick();
    }
  });
  dirList.addEventListener('click', () => { setTimeout(() => { dragged = false; }, 0); }, true);
  return () => dragged;
})();

/* ===== FAQ ACCORDION ===== */
function renderFaq() {
  const list = document.getElementById('faqList');
  const wrap = document.getElementById('faq');
  const items = (typeof faq !== 'undefined' && faq.length) ? faq : [];
  if (!wrap || !list) return;
  if (!items.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = '';
  list.innerHTML = items.map((f, i) =>
    `<div class="faq-item">
       <button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-a${i}">
         <span>${esc(f.q)}</span><i aria-hidden="true"></i>
       </button>
       <div class="faq-a" id="faq-a${i}" hidden><p>${esc(f.n)}</p></div>
     </div>`).join('');
  list.querySelectorAll('.faq-q').forEach(b => {
    b.onclick = () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      list.querySelectorAll('.faq-q').forEach(o => {
        o.setAttribute('aria-expanded', 'false');
        o.parentElement.classList.remove('open');
        o.nextElementSibling.hidden = true;
      });
      if (!open) {
        b.setAttribute('aria-expanded', 'true');
        b.parentElement.classList.add('open');
        b.nextElementSibling.hidden = false;
      }
    };
  });
}

(function faqInit() {
  const t = document.getElementById('faqToggle'), l = document.getElementById('faqList');
  if (!t || !l) return;
  t.onclick = () => {
    const open = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', open ? 'false' : 'true');
    t.classList.toggle('on', !open);
    l.hidden = open;
  };
})();

/* ===== TEAM PROFILE MODAL ===== */
let lastDirTrigger = null;
function openDir(i) {
  const dirModal = document.getElementById('dirModal');
  if (!dirModal) return;
  const d = directors[i]; if (!d) return;
  const dirMAvatar = document.getElementById('dirMAvatar');
  const dirMName = document.getElementById('dirMName');
  const dirMRole = document.getElementById('dirMRole');
  const dirMAbout = document.getElementById('dirMAbout');
  const dirMWorks = document.getElementById('dirMWorks');
  const dirMWorksLabel = document.getElementById('dirMWorksLabel');
  const dirMQ = document.getElementById('dirMQ');
  const dirClose = document.getElementById('dirClose');

  if (dirMAvatar) {
    dirMAvatar.dataset.style = d.style || '';
    dirMAvatar.classList.toggle('has-photo', !!d.photo);
    dirMAvatar.innerHTML = dirAvatarHTML(d);
  }
  if (dirMName) dirMName.textContent = d.a || '';
  if (dirMRole) { dirMRole.textContent = d.role || ''; dirMRole.style.display = d.role ? '' : 'none'; }
  if (dirMAbout) { dirMAbout.textContent = d.about || ''; dirMAbout.style.display = d.about ? '' : 'none'; }
  const wks = d.works || [];
  if (dirMWorks) { dirMWorks.innerHTML = wks.map(w => `<li>${w}</li>`).join(''); dirMWorks.style.display = wks.length ? '' : 'none'; }
  if (dirMWorksLabel) dirMWorksLabel.style.display = wks.length ? '' : 'none';
  if (dirMQ) { dirMQ.textContent = d.q || ''; dirMQ.style.display = d.q ? '' : 'none'; }

  lastDirTrigger = document.activeElement;
  dirModal.classList.add('show');
  if (dirClose) dirClose.focus();
}

function closeDir() {
  const dirModal = document.getElementById('dirModal');
  if (!dirModal || !dirModal.classList.contains('show')) return;
  dirModal.classList.remove('show');
  if (lastDirTrigger && lastDirTrigger.focus) lastDirTrigger.focus();
  lastDirTrigger = null;
}

const dirCloseBtn = document.getElementById('dirClose');
const dirModalEl = document.getElementById('dirModal');
if (dirCloseBtn) dirCloseBtn.onclick = closeDir;
if (dirModalEl) dirModalEl.onclick = e => { if (e.target === dirModalEl) closeDir(); };

/* ===== INQUIRY FORM MODAL ===== */
let lastFormTrigger = null;
let formOpenedAt = 0;
function openForm() {
  const formModal = document.getElementById('formModal');
  if (!formModal) return;
  lastFormTrigger = document.activeElement;
  formOpenedAt = Date.now();
  formModal.classList.add('show');
  const first = document.getElementById('f-name');
  if (first) first.focus();
}

function closeForm() {
  const formModal = document.getElementById('formModal');
  if (!formModal || !formModal.classList.contains('show')) return;
  formModal.classList.remove('show');
  if (lastFormTrigger && lastFormTrigger.focus) lastFormTrigger.focus();
  lastFormTrigger = null;
}

const cformOpenBtn = document.getElementById('cformOpen');
const formCloseBtn = document.getElementById('formClose');
const formModalEl = document.getElementById('formModal');
if (cformOpenBtn) cformOpenBtn.onclick = openForm;
if (formCloseBtn) formCloseBtn.onclick = closeForm;
if (formModalEl) formModalEl.onclick = e => { if (e.target === formModalEl) closeForm(); };

/* ===== WORK CATALOGUE GRID & FILTERS ===== */
let curFilter = 'All', curSearch = '';
const CAT = w => (w.cat || 'Music Video').trim();
const YEAR = w => String(w.y || '').trim();

function renderGrid() {
  const workGrid = document.getElementById('workGrid');
  if (!workGrid) return;
  workGrid.innerHTML = '';
  const q = curSearch.toLowerCase();
  const list = works.filter(w => (curFilter === 'All' || YEAR(w) === curFilter) && (!q || w.t.toLowerCase().includes(q) || w.a.toLowerCase().includes(q)));

  const countEl = document.getElementById('searchCount');
  if (countEl) {
    if (q) {
      countEl.textContent = list.length ? `${list.length} ${list.length === 1 ? 'film' : 'films'}` : '0 results';
    } else {
      countEl.textContent = '';
    }
  }

  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {
    clearBtn.hidden = !q;
  }

  if (!list.length) {
    const msg = q ? 'No films match that search.' : 'No films from ' + curFilter + '.';
    workGrid.innerHTML = '<div class="no-res">' + msg + '</div>';
    return;
  }
  list.forEach((w, i) => {
    const c = document.createElement('div');
    c.className = 'work-card reveal';
    c.style.transitionDelay = (i % 9 * 40) + 'ms';
    const thumb = w.id
      ? `<img loading="lazy" src="https://i.ytimg.com/vi/${w.id}/hqdefault.jpg" alt="${esc(w.t)}">`
      : `<div class="no-thumb"><span>Coming soon</span></div>`;
    c.innerHTML = `${thumb}
     ${w.id ? '<div class="play">\u25b6</div>' : ''}
     <div class="ov">
       <div class="ttl">${esc(w.t)}</div>
       <div class="art">${esc(w.a)}${w.d && w.d !== '\u2014' ? ' \u00b7 Dir. ' + esc(w.d) : ''} \u00b7 ${esc(w.y)}</div>
     </div>`;
    if (w.id) c.onclick = () => openModal(w);
    else c.classList.add('unreleased');
    workGrid.appendChild(c);
  });
  observeReveals();
}

function buildFilters() {
  const filters = document.getElementById('filters');
  if (!filters) return;
  filters.innerHTML = '';
  const years = [...new Set(works.map(YEAR).filter(Boolean))]
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  if (years.length < 2) { filters.style.display = 'none'; curFilter = 'All'; return; }
  filters.style.display = '';
  ['All', ...years].forEach(f => {
    const b = document.createElement('button');
    b.className = 'filter' + (f === curFilter ? ' on' : '');
    b.textContent = f;
    b.onclick = () => {
      curFilter = f;
      document.querySelectorAll('.filter').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      renderGrid();
    };
    filters.appendChild(b);
  });
}

const searchEl = document.getElementById('search');
const searchClear = document.getElementById('searchClear');

if (searchEl) {
  searchEl.addEventListener('input', e => {
    curSearch = e.target.value.trim();
    if (searchClear) searchClear.hidden = !curSearch;
    renderGrid();
  });

  searchEl.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (searchEl.value) {
        searchEl.value = '';
        curSearch = '';
        if (searchClear) searchClear.hidden = true;
        renderGrid();
      } else {
        searchEl.blur();
      }
    }
  });
}

if (searchClear && searchEl) {
  searchClear.onclick = () => {
    searchEl.value = '';
    curSearch = '';
    searchClear.hidden = true;
    searchEl.focus();
    renderGrid();
  };
}

/* ===== SETTINGS -> DOM ===== */
function ytUrl() { const y = (settings.social || []).find(x => x.n === 'YouTube'); return y ? y.u : '#'; }

const SOCIAL_SVG = {
  youtube: '<path d="M23.5 6.9a3 3 0 0 0-2.1-2.1C19.5 4.2 12 4.2 12 4.2s-7.5 0-9.4.6A3 3 0 0 0 .5 6.9 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.1 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.1zM9.6 15.6V8.4l6.3 3.6z"/>',
  instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.8-.1zm0 3.3A6.5 6.5 0 1 0 18.5 12 6.5 6.5 0 0 0 12 5.5zm0 10.7A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2zm8.3-11a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"/>',
  facebook: '<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>',
  linkedin: '<path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9.5h3zM6.5 8.2a1.8 1.8 0 1 1 1.8-1.8 1.8 1.8 0 0 1-1.8 1.8zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3h.1a3.2 3.2 0 0 1 2.8-1.5c3 0 3.5 2 3.5 4.5z"/>',
  tiktok: '<path d="M21 8.6a6.5 6.5 0 0 1-4.2-1.5v6.8a5.9 5.9 0 1 1-5.1-5.8v3a2.9 2.9 0 1 0 2.1 2.8V2h3a3.6 3.6 0 0 0 4.2 3.4z"/>',
  pinterest: '<path d="M12 2a10 10 0 0 0-3.6 19.3 9.6 9.6 0 0 1 .2-2.9l1.2-5.1a3.6 3.6 0 0 1-.3-1.5c0-1.4.8-2.4 1.8-2.4a1.3 1.3 0 0 1 1.3 1.4c0 .9-.6 2.2-.8 3.4a1.5 1.5 0 0 0 1.5 1.9c1.9 0 3.2-2.4 3.2-5.2 0-2.2-1.5-3.8-4.1-3.8a4.7 4.7 0 0 0-4.9 4.7 2.9 2.9 0 0 0 .7 2 .5.5 0 0 1 .1.5l-.2.8c-.1.3-.2.4-.5.2a4.4 4.4 0 0 1-2-3.7c0-3 2.5-6.6 7.4-6.6a6.2 6.2 0 0 1 6.5 6c0 3.9-2.2 6.8-5.4 6.8a2.9 2.9 0 0 1-2.5-1.2l-.7 2.6a11 11 0 0 1-1.2 2.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"/>',
};
const SOCIAL_TEXT = { giphy: 'GIF' };

function socialKey(n) {
  const k = String(n || '').toLowerCase().replace(/[^a-z]/g, '');
  return Object.keys(SOCIAL_SVG).find(s => k.includes(s)) || '';
}

function socialIcon(n) {
  const k = String(n || '').toLowerCase().replace(/[^a-z]/g, '');
  const txt = Object.keys(SOCIAL_TEXT).find(t => k.includes(t));
  if (txt) return '<span class="social-word">' + SOCIAL_TEXT[txt] + '</span>';
  const key = socialKey(n);
  if (key) return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + SOCIAL_SVG[key] + '</svg>';
  return '<span class="social-fallback">' + esc(String(n || '?').trim().charAt(0).toUpperCase()) + '</span>';
}

function applySettings() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('wsV', settings.statVideos); set('wsY', settings.statYears); set('wsA', settings.statArtists); set('wsD', settings.statDirectors);
  const e1 = document.getElementById('cEmail1'); if (e1) { e1.textContent = settings.contactEmail1; e1.href = 'mailto:' + settings.contactEmail1; }
  const lc = document.getElementById('cLoc'); if (lc) lc.innerHTML = String(settings.location).replace(/\n/g, '<br>');
  const pl = document.getElementById('wPlaylist'); if (pl) pl.href = settings.playlist || ytUrl();
  const ph = document.getElementById('cPhone');
  if (ph) ph.innerHTML = (settings.phones || []).map(n => `<a href="tel:${n.replace(/\s/g, '')}">${n}</a>`).join('<br>');
  const so = document.getElementById('cSocial');
  if (so) so.innerHTML = (settings.social || []).map(x =>
    `<a href="${esc(x.u)}" target="_blank" rel="noopener" aria-label="${esc(x.n)}" title="${esc(x.n)}">` +
    socialIcon(x.n) + `</a>`).join('');
  const fc = document.getElementById('frameCopy'); if (fc) fc.textContent = settings.copyright;
}

/* ===== CONTACT FORM ===== */
(function contactForm() {
  const form = document.getElementById('cform');
  if (!form) return;
  const btn = document.getElementById('csend');
  const status = document.getElementById('cformStatus');
  const say = (msg, cls) => {
    if (status) {
      status.textContent = msg;
      status.className = 'cform-status' + (cls ? ' ' + cls : '');
    }
  };

  // Clear error messages dynamically when user starts editing
  form.addEventListener('input', () => {
    if (status && status.classList.contains('err')) {
      say('');
    }
  });

  function validateInquiryData(d) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // 1. Name validation
    if (!d.name || d.name.length < 2) {
      return 'Please enter your full name (at least 2 characters).';
    }

    // 2. Email validation
    if (!d.email || !emailPattern.test(d.email)) {
      return 'Please provide a valid email address (e.g. name@domain.com).';
    }

    // 3. Project type
    if (!d.type) {
      return 'Please select a project type (e.g. Music Video, Commercial).';
    }

    // 4. Brief length
    if (!d.brief || d.brief.length < 15) {
      return 'Please provide a brief with at least 15 characters describing your project.';
    }

    // 5. Anti-spam: Excessive external URLs in creative brief (phishing protection)
    const urlCount = (d.brief.match(/https?:\/\//gi) || []).length;
    if (urlCount > 3) {
      return 'Please limit external links in your initial brief to prevent spam filtering.';
    }

    // 6. Anti-spam: Unsolicited commercial solicitation keyword check
    const spamKeywords = /(seo ranking|crypto|bitcoin|guest post|backlink|telegram channel|whatsapp group)/i;
    if (spamKeywords.test(d.brief)) {
      return 'Your inquiry could not be sent. If this is a genuine inquiry, please contact us directly via email.';
    }

    return null;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const fd = new FormData(form);

    // 1. Honeypot trap check (hidden 'company' field)
    if ((fd.get('company') || '').trim()) {
      console.warn('Bot detected via honeypot trap');
      say('Thank you — we’ll be in touch shortly.', 'ok');
      form.reset();
      return;
    }

    // 2. Time-trap check: real humans take > 1.8 seconds from opening modal to submitting
    if (typeof formOpenedAt !== 'undefined' && formOpenedAt > 0) {
      const elapsed = Date.now() - formOpenedAt;
      if (elapsed < 1800) {
        console.warn('Submission throttled: submitted too fast (' + elapsed + 'ms)');
        say('Please review your inquiry details before submitting.', 'err');
        return;
      }
    }

    // 3. Extract and sanitize input data
    const d = {
      name: (fd.get('name') || '').trim(),
      email: (fd.get('email') || '').trim(),
      type: (fd.get('type') || '').trim(),
      timeline: (fd.get('timeline') || '').trim(),
      artist: (fd.get('artist') || '').trim(),
      brief: (fd.get('brief') || '').trim()
    };

    // 4. Client validation check
    const validationError = validateInquiryData(d);
    if (validationError) {
      say(validationError, 'err');
      return;
    }

    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Sending…';
    say('');

    let sent = false;
    let submitErrorMsg = '';

    if (window.ChinoeData && window.ChinoeData.submitInquiry) {
      try {
        await window.ChinoeData.submitInquiry(d);
        sent = true;
      } catch (err) {
        console.warn('Supabase inquiry submission failed:', err);
        submitErrorMsg = (err && err.message) || '';
      }
    }

    if (sent) {
      btn.textContent = 'Sent';
      btn.classList.add('ok');
      say('Thank you for connecting with us. We appreciate your interest and will be in touch with next steps shortly.', 'ok');
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = label;
        btn.classList.remove('ok');
      }, 4000);
      return;
    }

    // Secondary attempt only if not already sent
    try {
      const r = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd).toString()
      });
      if (r.ok) sent = true;
    } catch (e) { }

    if (sent) {
      btn.textContent = 'Sent';
      btn.classList.add('ok');
      say('Thank you — we’ve received your inquiry and will be in touch shortly.', 'ok');
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = label;
        btn.classList.remove('ok');
      }, 4000);
      return;
    }

    // Keep draft in localStorage so data is never lost
    try {
      const backup = JSON.parse(localStorage.getItem('chinoe_inquiries_backup') || '[]');
      backup.push({ ...d, timestamp: new Date().toISOString() });
      localStorage.setItem('chinoe_inquiries_backup', JSON.stringify(backup));
    } catch (e) { }

    btn.disabled = false;
    btn.textContent = label;
    say(submitErrorMsg || 'Unable to submit inquiry right now. Please check your connection and try again.', 'err');
  });
})();

/* ===== PROJECT MODAL ===== */
const YT_POSTER = (id, q) => `https://img.youtube.com/vi/${id}/${q || 'maxresdefault'}.jpg`;

function posterInto(img, w, id) {
  if (!id || !img) return;
  img.onerror = () => { img.onerror = null; img.src = YT_POSTER(id, 'hqdefault'); };
  img.onload = () => { if (img.naturalWidth <= 120) img.src = YT_POSTER(id, 'hqdefault'); };
  img.src = (w && w.poster) ? w.poster : YT_POSTER(id);
}

function mountPlayer(host, id) {
  if (!id || !host) return;
  host.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id +
    '?autoplay=1&rel=0&playsinline=1&origin=' + encodeURIComponent(location.origin) +
    '" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Video player"></iframe>';
  const st = host.closest('.proj-stage'); if (st) st.classList.add('playing');
}

function clearPlayer(host) {
  if (!host) return;
  host.innerHTML = '';
  const st = host.closest('.proj-stage'); if (st) st.classList.remove('playing');
}

function creditNames(v) {
  return String(v || '').split(' & ').map(n => {
    const i = directors.findIndex(d => d.a === n.trim());
    return i < 0 ? esc(n)
      : '<button type="button" class="cred-link" data-dir="' + i + '">' + esc(n) + '</button>';
  }).join(' <span class="cred-amp">&amp;</span> ');
}

document.addEventListener('click', e => {
  const b = e.target.closest('.cred-link'); if (!b) return;
  const i = +b.dataset.dir;
  closeModal();
  setTimeout(() => openDir(i), 160);
});

let curWork = null;
function openModal(w) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  curWork = w;
  const projPlayer = document.getElementById('projPlayer');
  const btsPlayer = document.getElementById('btsPlayer');
  const projPoster = document.getElementById('projPoster');
  const projPlay = document.getElementById('projPlay');
  const projCat = document.getElementById('projCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalArtist = document.getElementById('modalArtist');
  const modalYt = document.getElementById('modalYt');
  const projStory = document.getElementById('projStory');
  const projQuote = document.getElementById('projQuote');
  const projQuoteText = document.getElementById('projQuoteText');
  const projQuoteWho = document.getElementById('projQuoteWho');
  const projCredits = document.getElementById('projCredits');
  const projCreditsBlock = document.getElementById('projCreditsBlock');
  const projKeyart = document.getElementById('projKeyart');
  const projKeyartImg = document.getElementById('projKeyartImg');
  const projHead = document.getElementById('projHead');
  const btsPoster = document.getElementById('btsPoster');
  const projBtsBlock = document.getElementById('projBtsBlock');
  const projNotes = document.getElementById('projNotes');
  const projNotesBlock = document.getElementById('projNotesBlock');
  const modalClose = document.getElementById('modalClose');

  clearPlayer(projPlayer); clearPlayer(btsPlayer);
  if (projPoster) {
    posterInto(projPoster, w, w.id);
    projPoster.alt = w.t ? w.t + ' — poster frame' : '';
  }
  if (projPlay) projPlay.style.display = 'none';
  if (projCat) projCat.textContent = [w.cat, w.y].filter(Boolean).join('  ·  ');
  if (modalTitle) modalTitle.textContent = w.t || '';
  if (modalArtist) { modalArtist.textContent = w.a || ''; modalArtist.style.display = w.a ? '' : 'none'; }
  if (modalYt) {
    modalYt.href = w.id ? 'https://www.youtube.com/watch?v=' + w.id : '#';
    modalYt.style.display = w.id ? '' : 'none';
    if (!modalYt.querySelector('.yt-icon')) {
      modalYt.innerHTML = '<svg class="yt-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg><span>Watch on YouTube</span>';
    }
  }
  if (projStory) { projStory.textContent = w.story || ''; projStory.style.display = w.story ? '' : 'none'; }

  const q = (w.quote || '').trim();
  if (projQuote) {
    if (projQuoteText) projQuoteText.textContent = q ? ('\u201C' + q.replace(/^["\u201C]|["\u201D]$/g, '') + '\u201D') : '';
    if (projQuoteWho) projQuoteWho.textContent = q ? (w.quoteBy || w.a || '') : '';
    projQuote.style.display = q ? '' : 'none';
  }

  const credits = [['Director', w.d], ['Director of Photography', w.dop], ['Editor', w.e],
  ['Producer', w.p], ['Production Design', w.pd], ['Colourist', w.col]]
    .filter(function (x) { return x[1] && x[1] !== '—'; })
    .concat((w.credits || []).filter(c => c && c.r && c.n).map(c => [c.r, c.n]));

  if (projCredits) projCredits.innerHTML = credits.map(c => '<div><dt>' + esc(c[0]) + '</dt><dd>' + creditNames(c[1]) + '</dd></div>').join('');
  if (projCreditsBlock) projCreditsBlock.style.display = credits.length ? '' : 'none';

  const art = w.keyart || '';
  if (projKeyartImg) {
    if (art) { projKeyartImg.src = art; projKeyartImg.alt = w.t ? w.t + ' — poster' : ''; }
    else projKeyartImg.removeAttribute('src');
  }
  if (projKeyart) projKeyart.style.display = art ? '' : 'none';
  if (projHead) projHead.classList.toggle('no-art', !art);

  const bts = w.bts || '';
  if (btsPoster && bts) {
    posterInto(btsPoster, { poster: w.btsPoster }, bts);
    btsPoster.alt = 'Behind the scenes — poster frame';
  }
  if (projBtsBlock) projBtsBlock.style.display = bts ? '' : 'none';

  const notes = (w.notes || []).filter(Boolean);
  if (projNotes) projNotes.innerHTML = notes.map(n => '<p>' + esc(n) + '</p>').join('');
  if (projNotesBlock) projNotesBlock.style.display = notes.length ? '' : 'none';

  modal.classList.add('show');
  const box = modal.querySelector('.proj-box'); if (box) box.scrollTop = 0;
  if (modalClose) modalClose.focus();
}

const projPlayBtn = document.getElementById('projPlay');
const btsPlayBtn = document.getElementById('btsPlay');
const modalCloseBtn = document.getElementById('modalClose');
const modalEl = document.getElementById('modal');
const projPosterEl = document.getElementById('projPoster');

if (projPosterEl) {
  projPosterEl.onclick = () => {
    const myt = document.getElementById('modalYt');
    if (myt && myt.href && myt.href !== '#' && !myt.href.endsWith('#')) {
      window.open(myt.href, '_blank', 'noopener,noreferrer');
    }
  };
}

if (projPlayBtn) projPlayBtn.onclick = () => { const projPlayer = document.getElementById('projPlayer'); if (curWork && curWork.id && projPlayer) mountPlayer(projPlayer, curWork.id); };
if (btsPlayBtn) btsPlayBtn.onclick = () => { const btsPlayer = document.getElementById('btsPlayer'); if (curWork && curWork.bts && btsPlayer) mountPlayer(btsPlayer, curWork.bts); };

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('show');
  clearPlayer(document.getElementById('projPlayer'));
  clearPlayer(document.getElementById('btsPlayer'));
}

if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
if (modalEl) modalEl.onclick = e => { if (e.target === modalEl) closeModal(); };

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeDir();
    closeForm();
  }
});

/* ===== REVEALS / OBSERVERS / CONTRAST ===== */
let io;
function observeReveals() {
  if (io) io.disconnect();
  io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .14 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}

function updateContrast() {
  let onDark = false; const y = 66;
  document.querySelectorAll('.dark-band, .work-cat').forEach(b => {
    const r = b.getBoundingClientRect();
    if (r.top <= y && r.bottom >= y) onDark = true;
  });
  document.body.classList.toggle('logo-on-dark', onDark);
}
window.addEventListener('scroll', updateContrast, { passive: true });

function updateFade() {
  const isLanding = document.getElementById('home') != null;
  document.body.classList.toggle('fade-on', !isLanding);
  if (isLanding) return;
  const y = innerHeight - 8;
  let dark = false;
  document.querySelectorAll('.dark-band, .work-cat').forEach(b => {
    const r = b.getBoundingClientRect();
    if (r.top <= y && r.bottom >= y) dark = true;
  });
  document.body.classList.toggle('fade-dark', dark);
}
addEventListener('scroll', updateFade, { passive: true });
addEventListener('resize', updateFade);

function fitHeadlines() {
  document.querySelectorAll('.fit').forEach(el => {
    el.style.fontSize = '';
    const avail = el.clientWidth;
    if (!avail) return;
    const full = el.scrollWidth;
    if (full > avail) {
      const base = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = Math.max(14, Math.floor(base * (avail / full) * 0.98)) + 'px';
    }
  });
}
addEventListener('resize', fitHeadlines);
addEventListener('load', fitHeadlines);

/* Section background videos */
function syncWorkBg(active) {
  const v = document.getElementById('workBg');
  if (!v) return;
  if (active) {
    if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src;
    const p = v.play(); if (p && p.catch) p.catch(() => { });
  } else { try { v.pause(); } catch (e) { } }
}

function initSectionVideos() {
  const vids = [...document.querySelectorAll('video.vid[data-src]')];
  if (!vids.length || !('IntersectionObserver' in window)) return;
  const vio = new IntersectionObserver(es => {
    es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.getAttribute('src')) v.src = v.dataset.src;
        const p = v.play(); if (p && p.catch) p.catch(() => { });
      } else { try { v.pause(); } catch (err) { } }
    });
  }, { threshold: .12 });
  vids.forEach(v => vio.observe(v));
}

/* Nav Dissolve */
(function navDissolve() {
  const EDGE = 96; let last = window.scrollY, nearEdge = false, ticking = false;
  function update() {
    const y = window.scrollY, down = y > last + 2, up = y < last - 2;
    const onHome = document.getElementById('home') != null;
    if (onHome || y < 100 || up || nearEdge) document.body.classList.remove('nav-dissolved');
    else if (down) document.body.classList.add('nav-dissolved');
    last = y; ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('mousemove', e => {
    const n = e.clientY < EDGE || e.clientY > innerHeight - EDGE || e.clientX < EDGE || e.clientX > innerWidth - EDGE;
    if (n !== nearEdge) { nearEdge = n; if (n) document.body.classList.remove('nav-dissolved'); }
  }, { passive: true });
})();

/* Subpage Hero Section / Logo Scroll Behavior (work.html, team.html, contact.html) */
(function heroScrollBehavior() {
  const isLanding = document.getElementById('home') != null;
  if (isLanding) return;

  const logo = document.querySelector('.zb-logo');
  if (!logo) return;

  let lastY = window.scrollY || window.pageYOffset || 0;
  let ticking = false;

  function show() {
    logo.classList.remove('scroll-hidden');
    document.body.classList.remove('hero-scroll-hidden');
  }

  function hide() {
    logo.classList.add('scroll-hidden');
    document.body.classList.add('hero-scroll-hidden');
  }

  function onScroll() {
    const y = window.scrollY || window.pageYOffset || 0;
    const diff = y - lastY;

    // 1. Show when back near top of the page
    if (y <= 30) {
      show();
    }
    // 2. Hide when scrolling down past top zone
    else if (diff > 4 && y > 60) {
      hide();
    }
    // 3. Show when scrolling up
    else if (diff < -4) {
      show();
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
})();

/* Intro Video Animation */
(function intro() {
  const el = document.getElementById('intro');
  if (!el) return;
  const done = () => document.body.classList.add('loaded');
  const finish = () => { if (el) el.classList.add('ended'); setTimeout(done, 700); };
  const v = document.getElementById('introVid');
  if (!v) { done(); return; }
  v.addEventListener('ended', finish);
  v.addEventListener('error', done);
  const p = v.play();
  if (p && p.catch) p.catch(done);
  setTimeout(done, 5200);
})();

/* Menu active highlighting */
function syncNavState() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const route = path === '' || path === 'index.html' ? 'home'
    : path.includes('work') ? 'work'
      : path.includes('team') ? 'team'
        : path.includes('contact') ? 'contact' : 'home';

  document.querySelectorAll('.zb-nav a, .zb-menu a').forEach(a => {
    a.classList.toggle('on', a.dataset.route === route);
  });
}

/* Master Build */
function buildAll() {
  applySettings();
  renderDirectors();
  renderFaq();
  buildFilters();
  renderGrid();
  initSectionVideos();
  syncNavState();
  if (document.getElementById('work')) syncWorkBg(true);
  if (window.__zb && typeof window.__zb.rebuild === 'function') {
    window.__zb.rebuild();
  }
  setTimeout(() => {
    fitHeadlines();
    observeReveals();
    updateContrast();
    updateFade();
  }, 60);
}

(function init() {
  // 1. Instant 0ms synchronous render from cache or defaults
  loadContentSync();
  buildAll();

  // 2. Non-blocking background revalidation from Supabase
  revalidateContent();
})();

// Cross-tab live synchronization: when changes are saved in the Admin Dashboard,
// all other open tabs immediately reflect the new content without requiring manual refresh.
window.addEventListener('storage', e => {
  if (e.key === CONTENT_CACHE_KEY || e.key === CMS_KEY) {
    if (e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        lastAppliedSignature = JSON.stringify(parsed);
        applyContent(parsed);
        buildAll();
      } catch (err) { }
    }
  }
});
