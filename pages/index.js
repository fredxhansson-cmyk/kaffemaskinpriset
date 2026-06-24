import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ORG_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"HEMguiden\",\"url\":\"https://hemguiden.vercel.app\",\"logo\":\"https://hemguiden.vercel.app/favicon.ico\",\"description\":\"Oberoende jämförelsetjänst för svenska konsumenter inom hem.\",\"foundingDate\":\"2026\",\"inLanguage\":\"sv-SE\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"customer support\",\"url\":\"https://hemguiden.vercel.app/kontakt\"}}";
const WEB_PAGE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Bästa Kaffemaskin 2026 - Jämför & Välj\",\"description\":\"Hitta den bästa kaffemaskinen 2026. Jämför populära modeller som De'Longhi och Nespresso för att göra det perfekta valet för ditt hem.\",\"url\":\"https://hemguiden.vercel.app\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"inLanguage\":\"sv-SE\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"HEMguiden\",\"url\":\"https://hemguiden.vercel.app\"},\"breadcrumb\":{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Hem\",\"item\":\"https://hemguiden.vercel.app\"}]}}";
const ITEM_LIST_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Hitta Bästa Kaffemaskinen 2026 — Jämförelse 2026\",\"description\":\"Jämför och välj den perfekta kaffemaskinen för ditt hem!\",\"numberOfItems\":8,\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"item\":{\"@type\":\"Product\",\"name\":\"Dyson V15 Detect\",\"url\":\"https://www.amazon.se/s?k=Dyson+V15+Detect\",\"description\":\"Laser-detektor visar osynligt damm — kraftfullaste sladdlösa\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.9\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"778\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"7990\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=Dyson+V15+Detect\"}}},{\"@type\":\"ListItem\",\"position\":2,\"item\":{\"@type\":\"Product\",\"name\":\"Roomba j9+\",\"url\":\"https://www.amazon.se/s?k=iRobot+Roomba+j9\",\"description\":\"Självtömmande robot med kamera-navigering och hinder-undvikning\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"246\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"8990\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=iRobot+Roomba+j9\"}}},{\"@type\":\"ListItem\",\"position\":3,\"item\":{\"@type\":\"Product\",\"name\":\"Xiaomi Robot Vacuum S10+\",\"url\":\"https://www.amazon.se/s?k=Xiaomi+Robot+Vacuum+S10\",\"description\":\"Intelligens till bästa pris — moppar och dammsugare i ett\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.6\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"777\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"3490\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=Xiaomi+Robot+Vacuum+S10\"}}},{\"@type\":\"ListItem\",\"position\":4,\"item\":{\"@type\":\"Product\",\"name\":\"De'Longhi Magnifica\",\"url\":\"https://www.amazon.se/s?k=DeLonghi+Magnifica\",\"description\":\"Helautomat med inbyggd kvarn — barista-kaffe hemma varje dag\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"444\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"4490\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=DeLonghi+Magnifica\"}}},{\"@type\":\"ListItem\",\"position\":5,\"item\":{\"@type\":\"Product\",\"name\":\"Nespresso Vertuo Next\",\"url\":\"https://www.amazon.se/s?k=Nespresso+Vertuo+Next\",\"description\":\"Barista-kaffe på 30 sekunder med Nespresso-kapslar\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"786\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1190\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=Nespresso+Vertuo+Next\"}}},{\"@type\":\"ListItem\",\"position\":6,\"item\":{\"@type\":\"Product\",\"name\":\"Philips Airfryer 3000\",\"url\":\"https://www.amazon.se/s?k=Philips+Airfryer+3000\",\"description\":\"Frisk frityrmat med 90% mindre fett — snabb och enkel mat\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"524\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1090\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=Philips+Airfryer+3000\"}}},{\"@type\":\"ListItem\",\"position\":7,\"item\":{\"@type\":\"Product\",\"name\":\"Philips Hue Startkit\",\"url\":\"https://www.amazon.se/s?k=Philips+Hue+Startkit\",\"description\":\"Smarta LED-lampor som synkroniserar med TV och musik\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.6\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"637\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"890\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=Philips+Hue+Startkit\"}}},{\"@type\":\"ListItem\",\"position\":8,\"item\":{\"@type\":\"Product\",\"name\":\"Weber Q2200+\",\"url\":\"https://www.amazon.se/s?k=Weber+Q2200\",\"description\":\"Premium gasgrill för balkong & terrass — kraftfull och kompakt\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"253\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"3290\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/s?k=Weber+Q2200\"}}}]}";
const ARTICLE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Hitta Bästa Kaffemaskinen 2026\",\"description\":\"Jämför och välj den perfekta kaffemaskinen för ditt hem!\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"author\":{\"@type\":\"Organization\",\"name\":\"HEMguiden\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"HEMguiden\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://hemguiden.vercel.app\"}}";
const FAQ_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Vilken kaffemaskin ger bäst smak?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Det beror på dina preferenser, men De'Longhi Magnifica och Nespresso Vertuo Next är populära val.\"}},{\"@type\":\"Question\",\"name\":\"Hur mycket kostar en bra kaffemaskin?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Priserna varierar, men bra kaffemaskiner kan kosta mellan 1000 och 5000 SEK.\"}},{\"@type\":\"Question\",\"name\":\"Är automatiska kaffemaskiner bättre?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Automatiska maskiner erbjuder bekvämlighet, medan manuella kan ge mer kontroll över bryggningen.\"}},{\"@type\":\"Question\",\"name\":\"Kan jag använda malda bönor i en kapselmaskin?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Nej, kapselmaskiner kräver specifika kapslar för att brygga kaffe.\"}},{\"@type\":\"Question\",\"name\":\"Vilka funktioner ska jag leta efter?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sök efter malningsalternativ, bryggstorlek, och rengöringsfunktioner.\"}}]}";

export async function getStaticProps() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.toLocaleDateString('sv-SE', { month: 'long' });
  var updated = now.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  var fallback = [{"name":"Dyson V15 Detect","brand":"Dyson","image":"https://logo.clearbit.com/dyson.com","url":"https://www.amazon.se/s?k=Dyson+V15+Detect","network":"amazon","description":"Laser-detektor visar osynligt damm — kraftfullaste sladdlösa","badge":"🏆 Bäst i test","score":"4.9","price":"7 990 kr","priceValue":7990,"pros":["Laser-dammdetektering","60 min batteritid","HEPA-filtrering"]},{"name":"Roomba j9+","brand":"iRobot","image":"https://logo.clearbit.com/irobot.com","url":"https://www.amazon.se/s?k=iRobot+Roomba+j9","network":"amazon","description":"Självtömmande robot med kamera-navigering och hinder-undvikning","badge":"Bäst robot","score":"4.8","price":"8 990 kr","priceValue":8990,"pros":["Självtömmande bas","Kamera-navigering","Hindrar undviker"]},{"name":"Xiaomi Robot Vacuum S10+","brand":"Xiaomi","image":"https://logo.clearbit.com/xiaomi.com","url":"https://www.amazon.se/s?k=Xiaomi+Robot+Vacuum+S10","network":"amazon","description":"Intelligens till bästa pris — moppar och dammsugare i ett","badge":"Bäst budget","score":"4.6","price":"3 490 kr","priceValue":3490,"pros":["Moppning + dammsugning","Laser-navigering","App-styrning"]},{"name":"De'Longhi Magnifica","brand":"De'Longhi","image":"https://logo.clearbit.com/delonghi.com","url":"https://www.amazon.se/s?k=DeLonghi+Magnifica","network":"amazon","description":"Helautomat med inbyggd kvarn — barista-kaffe hemma varje dag","badge":"Bäst kaffe","score":"4.8","price":"4 490 kr","priceValue":4490,"pros":["Inbyggd kvarn","One Touch-knappar","15 bar tryck"]},{"name":"Nespresso Vertuo Next","brand":"Nespresso","image":"https://logo.clearbit.com/nespresso.com","url":"https://www.amazon.se/s?k=Nespresso+Vertuo+Next","network":"amazon","description":"Barista-kaffe på 30 sekunder med Nespresso-kapslar","badge":"Bäst kapsel","score":"4.7","price":"1 190 kr","priceValue":1190,"pros":["30 sek uppvärmningstid","6 kaffestorlekar","Barcode-igenkänning"]},{"name":"Philips Airfryer 3000","brand":"Philips","image":"https://logo.clearbit.com/philips.com","url":"https://www.amazon.se/s?k=Philips+Airfryer+3000","network":"amazon","description":"Frisk frityrmat med 90% mindre fett — snabb och enkel mat","badge":"Bäst airfryer","score":"4.7","price":"1 090 kr","priceValue":1090,"pros":["90% mindre fett","4,1 liter kapacitet","Snabb matlagning"]},{"name":"Philips Hue Startkit","brand":"Philips","image":"https://logo.clearbit.com/philips.com","url":"https://www.amazon.se/s?k=Philips+Hue+Startkit","network":"amazon","description":"Smarta LED-lampor som synkroniserar med TV och musik","badge":"Bäst smart hem","score":"4.6","price":"890 kr","priceValue":890,"pros":["16 milj. färger","Röst- & app-styrning","Synk med TV/musik"]},{"name":"Weber Q2200+","brand":"Weber","image":"https://logo.clearbit.com/weber.com","url":"https://www.amazon.se/s?k=Weber+Q2200","network":"amazon","description":"Premium gasgrill för balkong & terrass — kraftfull och kompakt","badge":"Bäst grill","score":"4.7","price":"3 290 kr","priceValue":3290,"pros":["2600W gasbrännare","Emaljerade grillgaller","Termometer ingår"]}];
  var items = fallback.slice();

  return {
    props: { providers: items, year: year, month: month, updated: updated },
    revalidate: 86400,
  };
}

export default function Home({ providers, year, month, updated }) {
  const [sortBy, setSortBy] = useState('betyg');
  const [visibleCount, setVisibleCount] = useState(5);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  

  var extractNum = function(p) {
    if (p.rateValue) return parseFloat(p.rateValue);
    if (p.priceValue) return parseFloat(p.priceValue);
    var m = String(p.price||'').match(/[0-9]+[.,]?[0-9]*/);
    return m ? parseFloat(m[0].replace(',','.')) : 9999;
  };
  var sorted = [...providers].sort(function(a, b) {
    if (sortBy === 'pris') return extractNum(a) - extractNum(b);
    if (sortBy === 'namn') return a.name.localeCompare(b.name, 'sv');
    return parseFloat(b.score||b.rating||0) - parseFloat(a.score||a.rating||0);
  });
  var visible = sorted.slice(0, visibleCount);
  var toggleSelect = function(name) {
    setSelected(function(prev) {
      return prev.includes(name) ? prev.filter(function(n){return n!==name;}) : prev.length < 3 ? prev.concat([name]) : prev;
    });
  };
  var selectedProviders = providers.filter(function(p){return selected.includes(p.name);});

  const pc = '#0891b2';
  const pcLight = '#0891b214';
  const pcMed = '#0891b230';

  const TRACK_BASE = 'https://axiom-engine-production-54c3.up.railway.app/r';
  const SITE_SLUG = 'hemguiden';
  const AffBtn = ({ url, name, primary, network }) => {
    var href = TRACK_BASE && TRACK_BASE.startsWith('http')
      ? TRACK_BASE + '?p=' + encodeURIComponent(name) + '&url=' + encodeURIComponent(url) + '&site=' + SITE_SLUG + (network && network !== 'adtraction' ? '&network=' + encodeURIComponent(network) : '')
      : url;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer sponsored"
        style={{ display:'inline-block', background: primary ? pc : '#0f172a', color:'#fff',
          padding:'11px 22px', borderRadius:9, fontWeight:700, fontSize:14,
          textDecoration:'none', whiteSpace:'nowrap', transition:'opacity .15s' }}>
        {network === 'amazon' ? 'Köp på Amazon →' : 'Välj ' + name + ' →'}
      </a>
    );
  };

  const Stars = ({ score }) => {
    const n = parseFloat(score);
    return (
      <span style={{ fontSize:15, letterSpacing:1 }}>
        <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(n))}</span>
        <span style={{ color:'#d1d5db' }}>{'★'.repeat(5 - Math.floor(n))}</span>
        <span style={{ color:'#64748b', fontSize:12, marginLeft:6, fontWeight:600 }}>{score}</span>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Bästa Kaffemaskin 2026 - Jämför & Välj</title>
        <meta name="description" content="Hitta den bästa kaffemaskinen 2026. Jämför populära modeller som De'Longhi och Nespresso för att göra det perfekta valet för ditt hem." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://hemguiden.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bästa Kaffemaskin 2026 - Jämför & Välj" />
        <meta property="og:description" content="Hitta den bästa kaffemaskinen 2026. Jämför populära modeller som De'Longhi och Nespresso för att göra det perfekta valet för ditt hem." />
        <meta property="og:url" content="https://hemguiden.vercel.app" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:site_name" content="HEMguiden" />
        <meta property="og:image" content="https://hemguiden.vercel.app/api/og?title=B%C3%A4sta%20Kaffemaskin%202026%20-%20J%C3%A4mf%C3%B6r%20%26%20V%C3%A4lj&niche=hem" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bästa Kaffemaskin 2026 - Jämför & Välj" />
        <meta name="twitter:description" content="Hitta den bästa kaffemaskinen 2026. Jämför populära modeller som De'Longhi och Nespresso för att göra det perfekta valet för ditt hem." />
        <meta name="twitter:image" content="https://hemguiden.vercel.app/api/og?title=B%C3%A4sta%20Kaffemaskin%202026%20-%20J%C3%A4mf%C3%B6r%20%26%20V%C3%A4lj&niche=hem" />
        <link rel="alternate" hreflang="sv" href="https://hemguiden.vercel.app" />
        <link rel="alternate" hreflang="x-default" href="https://hemguiden.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEB_PAGE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ITEM_LIST_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      </Head>

      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px',
        height:60, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>
          HEMguiden
        </Link>
        <div style={{ display:'flex', gap:28, fontSize:14 }}>
          <a href="#jamfor" style={{ color:'#64748b', textDecoration:'none' }}>Jämförelse</a>
          <a href="#guide" style={{ color:'#64748b', textDecoration:'none' }}>Guide</a>
          <Link href="/om-oss" style={{ color:'#64748b', textDecoration:'none' }}>Om oss</Link>
        </div>
      </nav>

      <section style={{ background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#f8fafc 100%)',
        padding:'72px 20px 56px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center',
          gap:48, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:pcLight, color:pc, padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Uppdaterad {updated}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:'#f0fdf4', color:'#15803d', padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Oberoende jämförelse
              </div>
            </div>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:800,
              lineHeight:1.14, marginBottom:18, color:'#0f172a' }}>
              Hitta Bästa Kaffemaskinen 2026
            </h1>
            <p style={{ fontSize:18, color:'#475569', lineHeight:1.72,
              marginBottom:32, maxWidth:540 }}>
              Jämför och välj den perfekta kaffemaskinen för ditt hem!
            </p>
            <a href="#jamfor" style={{ display:'inline-block', background:pc, color:'#fff',
              padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16,
              textDecoration:'none', boxShadow:'0 4px 24px '+pc+'44' }}>
               →
            </a>
            <p style={{ marginTop:14, fontSize:13, color:'#94a3b8' }}>
              Gratis &middot; Oberoende &middot; Ingen prenumeration
            </p>
          </div>
          <div style={{ flexShrink:0 }} dangerouslySetInnerHTML={{ __html: "<svg width=\"260\" height=\"210\" viewBox=\"0 0 260 210\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"18\" y=\"130\" width=\"34\" height=\"68\" rx=\"5\" fill=\"#0891b2\" opacity=\"0.18\"/><rect x=\"64\" y=\"98\" width=\"34\" height=\"100\" rx=\"5\" fill=\"#0891b2\" opacity=\"0.38\"/><rect x=\"110\" y=\"58\" width=\"34\" height=\"140\" rx=\"5\" fill=\"#0891b2\" opacity=\"0.65\"/><rect x=\"156\" y=\"76\" width=\"34\" height=\"122\" rx=\"5\" fill=\"#0891b2\" opacity=\"0.82\"/><rect x=\"202\" y=\"36\" width=\"34\" height=\"162\" rx=\"5\" fill=\"#0891b2\"/><path d=\"M35 124 L81 93 L127 53 L173 71 L219 31\" stroke=\"#0891b2\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"35\" cy=\"124\" r=\"5\" fill=\"#0891b2\"/><circle cx=\"81\" cy=\"93\" r=\"5\" fill=\"#0891b2\"/><circle cx=\"127\" cy=\"53\" r=\"5\" fill=\"#0891b2\"/><circle cx=\"173\" cy=\"71\" r=\"5\" fill=\"#0891b2\"/><circle cx=\"219\" cy=\"31\" r=\"5\" fill=\"#0891b2\"/><circle cx=\"228\" cy=\"178\" r=\"24\" fill=\"#0891b2\" opacity=\"0.12\" stroke=\"#0891b2\" stroke-width=\"2\"/><text x=\"228\" y=\"184\" text-anchor=\"middle\" fill=\"#0891b2\" font-family=\"Inter,sans-serif\" font-size=\"13\" font-weight=\"700\">kr</text></svg>" }} />
        </div>
      </section>

      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0',
        padding:'16px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex',
          gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#0891b2',fontWeight:800,flexShrink:0}}>✓</span><span>Spara tid och pengar med vårt jämförelseverktyg.</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#0891b2',fontWeight:800,flexShrink:0}}>✓</span><span>Få detaljerade recensioner och betyg från experter och användare.</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#0891b2',fontWeight:800,flexShrink:0}}>✓</span><span>Upptäck den senaste teknologin och funktioner som förbättrar din kaffeupplevelse.</span></div>
        </div>
      </div>

      <section id="jamfor" style={{ padding:'64px 20px', maxWidth:980,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:30, fontWeight:800, marginBottom:10, color:'#0f172a' }}>
            Jämför de Bästa Kaffemaskinerna 2026
          </h2>
          <p style={{ color:'#64748b', fontSize:15 }}>
            Vi har granskat {providers.length} alternativ &mdash; senast uppdaterat {updated}
          </p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:20,
          flexWrap:'wrap', justifyContent:'center' }}>
          {['betyg','pris','namn'].map(function(s) { return (
            <button key={s} onClick={() => setSortBy(s)}
              style={{ padding:'7px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                cursor:'pointer', fontFamily:'Inter,sans-serif', border:'none',
                background: sortBy===s ? pc : '#f1f5f9',
                color: sortBy===s ? '#fff' : '#64748b' }}>
              {s==='betyg' ? '⭐ Bäst betyg' : s==='pris' ? '💰 Lägst pris' : '🔤 Namn A–Ö'}
            </button>
          ); })}
        </div>


        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {visible.map((p, i) => (
            <div key={p.name} style={{ background:'#fff', border: i===0 ? '2px solid '+pc : '1px solid #e2e8f0', borderRadius:16, padding:'22px 26px', position:'relative', boxShadow: i===0 ? '0 4px 24px '+pc+'18' : '0 1px 4px #0000000a' }}>
              <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12, background: i===0 ? pcLight : '#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color: i===0 ? pc : '#64748b', flexShrink:0, border:'1px solid '+(i===0 ? pcMed : '#e2e8f0') }}>
                  {['1','2','3','4','5'][i] || (i+1)}
                </div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:800, fontSize:18, color:'#0f172a', marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:'#64748b', marginBottom:10 }}>{p.description}</div>
                  {p.pros && <div style={{ display:'flex', flexDirection:'column', gap:5 }}>{p.pros.map((pro, j) => (<div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13 }}><span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ color:'#374151' }}>{pro}</span></div>))}</div>}
                </div>
                <div style={{ textAlign:'right', minWidth:190, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:pc }}>{p.currentPrice || p.price}</div>
                  <Stars score={p.score} />
                  <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:8 }}>{p.badge}</div>
                  <AffBtn url={p.url} name={p.name} primary={i===0} network={p.network} />
                  <button onClick={() => toggleSelect(p.name)} style={{ padding:'7px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor: selected.includes(p.name) || selected.length < 3 ? 'pointer' : 'not-allowed', fontFamily:'Inter,sans-serif', border:'1px solid', borderColor: selected.includes(p.name) ? pc : '#e2e8f0', background: selected.includes(p.name) ? pcLight : '#fff', color: selected.includes(p.name) ? pc : '#64748b', opacity: !selected.includes(p.name) && selected.length >= 3 ? 0.4 : 1 }}>
                    {selected.includes(p.name) ? '✓ Vald' : '+ Jämför'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:20, marginBottom:4, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {visibleCount < sorted.length && (
            <button onClick={() => setVisibleCount(function(c){ return Math.min(c + 5, sorted.length); })}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid '+pc, background:'#fff', color:pc }}>
              Visa 5 fler ↓ &nbsp;<span style={{ fontWeight:400, fontSize:13, opacity:0.7 }}>({sorted.length - visibleCount} återstår)</span>
            </button>
          )}
          {visibleCount >= sorted.length && sorted.length > 5 && (
            <button onClick={() => setVisibleCount(5)}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid #e2e8f0', background:'#fff', color:'#64748b' }}>
              Visa färre ↑
            </button>
          )}
          <p style={{ margin:0, fontSize:13, color:'#94a3b8' }}>
            Visar {visible.length} av {sorted.length} alternativ
            {selected.length > 0 && <span style={{ marginLeft:12, color:pc, fontWeight:600 }}>{selected.length} valda för jämförelse</span>}
          </p>
          <p style={{ margin:0, fontSize:11, color:'#cbd5e1' }}>
            Priser är riktpriser — klicka på ett alternativ för aktuellt pris hos respektive leverantör
          </p>
        </div>

        {selected.length >= 2 && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:80,
            background:'#0f172a', padding:'14px 20px', fontFamily:'Inter,sans-serif',
            display:'flex', alignItems:'center', justifyContent:'center', gap:14, flexWrap:'wrap',
            boxShadow:'0 -4px 32px rgba(0,0,0,0.25)' }}>
            <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:14 }}>
              {selected.length} valda: {selected.join(' vs ')}
            </span>
            <button onClick={() => setShowCompare(true)}
              style={{ background:pc, color:'#fff', border:'none', borderRadius:8,
                padding:'9px 22px', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Jämför nu →
            </button>
            <button onClick={() => setSelected([])}
              style={{ background:'transparent', color:'#94a3b8', border:'1px solid #334155',
                borderRadius:8, padding:'9px 14px', fontSize:13, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Rensa
            </button>
          </div>
        )}

        {showCompare && (
          <div onClick={() => setShowCompare(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.72)', zIndex:200,
            display:'flex', alignItems:'flex-start', justifyContent:'center',
            padding:'24px 16px', overflowY:'auto', fontFamily:'Inter,sans-serif' }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16,
              width:'100%', maxWidth: selectedProviders.length === 2 ? 700 : 940,
              padding:28, marginTop:12, marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h3 style={{ fontSize:20, fontWeight:800, margin:0, color:'#0f172a' }}>
                  Jämförelse — {selectedProviders.map(function(p){return p.name;}).join(' vs ')}
                </h3>
                <button onClick={() => setShowCompare(false)}
                  style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#94a3b8' }}>✕</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns: selectedProviders.map(function(){return '1fr';}).join(' '), gap:14 }}>
                {selectedProviders.map(function(p) { return (
                  <div key={p.name} style={{ border:'2px solid '+pc+'30', borderRadius:12, padding:'20px 18px',
                    display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ fontWeight:800, fontSize:17, color:'#0f172a', borderBottom:'1px solid #f1f5f9', paddingBottom:10 }}>{p.name}</div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>PRIS</div>
                      <div style={{ fontSize:20, fontWeight:800, color:pc }}>{p.currentPrice||p.price||'—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>BETYG</div>
                      <Stars score={p.score} />
                    </div>
                    {p.badge && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>UTMÄRKELSE</div>
                        <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:8, display:'inline-block' }}>{p.badge}</div>
                      </div>
                    )}
                    {p.description && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>OM TJÄNSTEN</div>
                        <div style={{ fontSize:13, color:'#475569', lineHeight:1.5 }}>{p.description}</div>
                      </div>
                    )}
                    {p.pros && p.pros.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:6 }}>FÖRDELAR</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                          {p.pros.map(function(pro,j){return(
                            <div key={j} style={{ display:'flex', gap:6, fontSize:13 }}>
                              <span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span>
                              <span style={{ color:'#374151' }}>{pro}</span>
                            </div>
                          );})}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop:'auto', paddingTop:10 }}>
                      <AffBtn url={p.url} name={p.name} primary={true} network={p.network} />
                    </div>
                  </div>
                );})}
              </div>
              <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
                * Stäng för att välja fler alternativ eller byta urval.
              </p>
            </div>
          </div>
        )}

        <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
          * Vi kan erhålla provision vid val via våra länkar. Det påverkar aldrig priset för dig eller våra oberoende betyg.
          Se vår <Link href="/om-oss" style={{ color:pc }}>redaktionspolicy</Link>.
        </p>
      </section>

      

      <section id="guide" style={{ background:'#f8fafc',
        borderTop:'1px solid #e2e8f0', padding:'64px 20px',
        fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20, color:'#0f172a' }}>
            Så Väljer Du Rätt Kaffemaskin
          </h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>
            Att välja rätt kaffemaskin kan vara en utmaning med så många alternativ på marknaden. Först och främst, fundera på vad du värdesätter mest i en kaffemaskin. Vill du ha en maskin som gör snabbt och enkelt kaffe eller söker du en som erbjuder mer avancerade funktioner som malning av bönor? Tänk också på storleken och designen av maskinen, särskilt om du har begränsat utrymme i ditt kök. En annan viktig aspekt är underhåll och rengöring; vissa maskiner kräver mer arbete än andra. Läs recensioner och jämför olika modeller för att se vad andra användare tyckt. Tänk på din budget och hur mycket du är villig att spendera för att få den perfekta kaffemaskinen för ditt hem. Slutligen, överväg om du vill ha en manuell eller automatisk maskin, beroende på din erfarenhet och preferenser.
          </p>
          <h3 style={{ fontSize:22, fontWeight:700, marginBottom:16, color:'#0f172a', marginTop:40 }}>Top 5 Kaffemaskiner Att Jämföra</h3>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>Några av de mest populära kaffemaskinerna 2026 inkluderar De'Longhi Magnifica och Nespresso Vertuo Next. De'Longhi Magnifica är känd för sin mångsidighet och kapacitet att skapa både espresso och vanligt kaffe, medan Nespresso Vertuo Next erbjuder en snabb och bekväm lösning för dem som älskar kapselkaffe. Om du är ute efter något mer avancerat kan du överväga Philips Airfryer 3000, som även erbjuder en bryggfunktion för kaffe. För dem som föredrar automatisk rengöring och smarta funktioner, är Dyson V15 Detect och Roomba j9+ också värda att titta på. Xiaomi Robot Vacuum S10+ är perfekt för dem som vill kombinera rengöring med kaffe, och Weber Q2200+ ger en utomhusupplevelse för kaffeälskare.</p>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:'#0f172a' }}>
            Vad ska du tänka på?
          </h3>
          <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0891b215',color:'#0891b2',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>1</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Värdera dina kaffepreferenser.</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0891b215',color:'#0891b2',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>2</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Jämför funktioner och priser.</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0891b215',color:'#0891b2',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>3</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Läs användarrecensioner.</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#0891b215',color:'#0891b2',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>4</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Tänk på underhåll och rengöring.</p></div>
        </div>
      </section>

      <section style={{ padding:'64px 20px', maxWidth:760,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:32, color:'#0f172a' }}>
          Vanliga frågor
        </h2>
        <details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vilken kaffemaskin ger bäst smak?<span style={{color:'#0891b2',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Det beror på dina preferenser, men De'Longhi Magnifica och Nespresso Vertuo Next är populära val.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Hur mycket kostar en bra kaffemaskin?<span style={{color:'#0891b2',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Priserna varierar, men bra kaffemaskiner kan kosta mellan 1000 och 5000 SEK.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Är automatiska kaffemaskiner bättre?<span style={{color:'#0891b2',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Automatiska maskiner erbjuder bekvämlighet, medan manuella kan ge mer kontroll över bryggningen.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Kan jag använda malda bönor i en kapselmaskin?<span style={{color:'#0891b2',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Nej, kapselmaskiner kräver specifika kapslar för att brygga kaffe.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vilka funktioner ska jag leta efter?<span style={{color:'#0891b2',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Sök efter malningsalternativ, bryggstorlek, och rengöringsfunktioner.</p></details>
      </section>

      <section style={{ background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding:'32px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <p style={{ fontSize:14, color:'#64748b', marginBottom:12, fontWeight:600 }}>Läs mer:</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <a href="/robotdammsugare" style={{color:'#0891b2',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa robotdammsugare</a>
            · <a href="/kaffemaskin" style={{color:'#0891b2',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa kaffemaskin</a>
            · <a href="/luftrenare" style={{color:'#0891b2',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa luftrenare</a>
            · <a href="/airfryer" style={{color:'#0891b2',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa airfryer</a>
          </div>
        </div>
      </section>

      <footer style={{ background:'#0f172a', color:'#94a3b8',
        padding:'52px 20px 32px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:48, flexWrap:'wrap', marginBottom:36 }}>
            <div style={{ maxWidth:260 }}>
              <div style={{ fontWeight:800, color:'#fff', fontSize:18, marginBottom:10 }}>HEMguiden</div>
              <p style={{ fontSize:13, lineHeight:1.75 }}>
                Oberoende jämförelsetjänst för svenska konsumenter. Vi jämför 8 alternativ inom hem.
              </p>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Sidor</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Jämförelse</Link>
                <Link href="/om-oss" style={{ color:'#94a3b8', textDecoration:'none' }}>Om oss</Link>
                <Link href="/kontakt" style={{ color:'#94a3b8', textDecoration:'none' }}>Kontakt</Link>
                <Link href="/integritetspolicy" style={{ color:'#94a3b8', textDecoration:'none' }}>Integritetspolicy</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Se även</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/robotdammsugare" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa robotdammsugare</Link>
                <Link href="/kaffemaskin" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa kaffemaskin</Link>
                <Link href="/luftrenare" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa luftrenare</Link>
                <Link href="/airfryer" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa airfryer</Link>
                <Link href="/smarta-hem" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa smarta hem-produkter</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Jämförelser</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/jamfor/dyson-v15-detect-vs-roomba-j9" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Dyson V15 Detect vs Roomba j9+</Link>
                <Link href="/jamfor/dyson-v15-detect-vs-xiaomi-robot-vacuum-s10" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Dyson V15 Detect vs Xiaomi Robot Vacuum S10+</Link>
                <Link href="/jamfor/dyson-v15-detect-vs-de-longhi-magnifica" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Dyson V15 Detect vs De'Longhi Magnifica</Link>
                <Link href="/jamfor/dyson-v15-detect-vs-nespresso-vertuo-next" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Dyson V15 Detect vs Nespresso Vertuo Next</Link>
                <Link href="/jamfor/dyson-v15-detect-vs-philips-airfryer-3000" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Dyson V15 Detect vs Philips Airfryer 3000</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:12, lineHeight:1.75 }}>
            <p style={{ marginBottom:8 }}>
              &copy; {year} HEMguiden. Oberoende jämförelsetjänst utan koppling till listade
              varumärken utöver eventuella affiliate-provisioner.
            </p>
            <p>
              <strong style={{ color:'#e2e8f0' }}>Affiliateinformation:</strong> Sidan innehåller
              affiliate-länkar via Adtraction Sverige. Vi kan ta emot provision från annonsörer.
              Det påverkar aldrig priset för dig eller våra oberoende betyg.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}