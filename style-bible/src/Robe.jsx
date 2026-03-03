import { useState } from "react";

const C = {
  blk:"#1B1B1B",char:"#3A3A3A",navy:"#1B3A5C",burg:"#722F37",must:"#D4A017",
  jgrn:"#1B5E20",olv:"#4A6741",terra:"#B85C38",camel:"#C09868",brn:"#4A3728",
  cognac:"#704214",ofwht:"#FAF0E6",ivory:"#F0E8DC",dindigo:"#1B3050",
  dgold:"#B8860B",wht:"#FAFAF8",lblu:"#B0C4DE",
};
const CN = {
  kr:{blk:"블랙",char:"차콜",navy:"남색",burg:"버건디",must:"머스터드",jgrn:"주얼그린",olv:"올리브",terra:"테라코타",camel:"카멜",brn:"다크브라운",cognac:"코냑",ofwht:"오프화이트",ivory:"아이보리",dindigo:"다크인디고",dgold:"다크골드",wht:"화이트",lblu:"라이트블루"},
  en:{blk:"Black",char:"Charcoal",navy:"Navy",burg:"Burgundy",must:"Mustard",jgrn:"Jewel Green",olv:"Olive",terra:"Terracotta",camel:"Camel",brn:"Dark Brown",cognac:"Cognac",ofwht:"Off-White",ivory:"Ivory",dindigo:"Dark Indigo",dgold:"Dark Gold",wht:"White",lblu:"Light Blue"},
};

/* ── COMPONENTS ── */
function Dot({c,size=16}) {
  const l=parseInt(c.slice(1,3),16)*.299+parseInt(c.slice(3,5),16)*.587+parseInt(c.slice(5,7),16)*.114>180;
  return (<div style={{width:size,height:size,borderRadius:"50%",background:c,border:l?"1px solid #d0d0cc":"1px solid transparent",flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}/>);
}
function Pal({keys,lang}) {
  return (<div style={{display:"flex",flexWrap:"wrap",gap:8,margin:"8px 0 14px"}}>{keys.map(k=>(<div key={k} style={{display:"flex",alignItems:"center",gap:4}}><Dot c={C[k]} size={14}/><span style={{fontSize:9.5,color:"#888"}}>{CN[lang][k]}</span></div>))}</div>);
}
function CBar({colors}) {
  return (<div style={{display:"flex",gap:0,marginRight:8,borderRadius:4,overflow:"hidden",boxShadow:"0 1px 2px rgba(0,0,0,0.06)"}}>{colors.map((c,i)=>(<div key={i} style={{width:18,height:18,background:C[c]}}/>))}</div>);
}
function OCard({n,colors,desc,note}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #eae6e0"}}>
      <span style={{fontSize:9,fontWeight:700,color:"#8B7050",minWidth:18,fontFamily:"'Karla',sans-serif"}}>{String(n).padStart(2,'0')}</span>
      <CBar colors={colors}/>
      <div style={{flex:1}}>
        <div style={{fontSize:10.5,color:"#303030",lineHeight:1.5}}>{desc}</div>
        {note && <div style={{fontSize:9,color:"#a89880",marginTop:1}}>✦ {note}</div>}
      </div>
    </div>
  );
}
function Sec({title,emoji,children}) {
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
        {emoji && <span style={{fontSize:14}}>{emoji}</span>}
        <div style={{fontSize:9.5,fontWeight:700,letterSpacing:2,color:"#8B7050",fontFamily:"'Karla',sans-serif"}}>{title}</div>
      </div>
      {children}
    </div>
  );
}
function IRow({name,colors,emoji}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:8,marginBottom:3,background:"#f8f6f2",border:"1px solid #f0ece4"}}>
      {emoji && <span style={{fontSize:11}}>{emoji}</span>}
      <div style={{display:"flex",gap:2}}>{colors.map((c,i)=>(<Dot key={i} c={C[c]} size={12}/>))}</div>
      <span style={{fontSize:10,color:"#404040",flex:1}}>{name}</span>
    </div>
  );
}
function T({children}) { return (<div style={{fontSize:10.5,color:"#404040",lineHeight:1.7,marginBottom:6}}>{children}</div>); }
function B({children}) { return (<strong style={{color:"#202020"}}>{children}</strong>); }
function Tag({children,bg="#f4ece0",color="#8B7050"}) { return (<span style={{padding:"3px 9px",borderRadius:20,fontSize:8.5,fontWeight:500,background:bg,color,display:"inline-block",margin:"2px 2px"}}>{children}</span>); }

/* ── PROFILE ── */
function ProfileTab({lang}) {
  const kr = lang==="kr";
  return (<div>
    <Sec title={kr?"퍼스널 컬러":"PERSONAL COLOR"} emoji="🎨">
      <T><B>{kr?"딥 오텀 (Deep Autumn)":"Deep Autumn"}</B> · {kr?"웜 올리브 (70:30) · 고대비":"Warm Olive (70:30) · High Contrast"}</T>
      <T>{kr?"올리브 톤 웜 피부 + 다크 컬리 장발 + 밝은 눈(그린~헤이즐) = 깊고 진한 색이 가장 잘 어울림. 좋아하는 색이 팔레트와 완벽 일치 — 직감이 정확함.":"Olive warm skin + dark curly long hair + bright eyes (green-hazel) = deep, rich colors work best. Favorite colors match the palette perfectly."}</T>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginTop:12,marginBottom:4}}>🔥 {kr?"파워 컬러":"POWER COLORS"}</div>
      <Pal keys={["blk","burg","must","jgrn","navy","terra","camel"]} lang={lang}/>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginBottom:4}}>🪨 {kr?"베이스":"BASE"}</div>
      <Pal keys={["blk","char","navy","ofwht","brn"]} lang={lang}/>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginBottom:4}}>✨ {kr?"포인트":"ACCENT"}</div>
      <Pal keys={["must","terra","dgold","cognac"]} lang={lang}/>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginBottom:4}}>🚫 {kr?"피해야 할 것":"AVOID"}</div>
      <T>{kr?"파스텔, 네온, 라벤더, 바닐라 — 탁하거나 연한 색 전부 ❌":"Pastels, neons, lavender, vanilla — all muted/light colors ❌"}</T>
    </Sec>
    <Sec title={kr?"체형 & 실루엣":"BODY & SILHOUETTE"} emoji="📐">
      <T><B>185cm / 95kg</B> · {kr?"넓은 어깨 · 중간부 볼륨 · 장신":"Broad shoulders · Midsection volume · Tall"}</T>
      <T>👉 {kr?"핵심: 레이어링으로 실루엣을 잡아라":"Core: Shape the silhouette with layering"}</T>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,margin:"8px 0"}}>
        {(kr?["📏 레귤러핏","🔻 V넥/오픈칼라","🧥 구조감 아우터","⬛ 다크 하의","🧅 레이어링","📐 스트레이트 팬츠","🧶 질감 소재"]:["📏 Regular Fit","🔻 V-Neck/Open Collar","🧥 Structured Outer","⬛ Dark Bottoms","🧅 Layering","📐 Straight Pants","🧶 Textured Fabric"]).map(t=>(<Tag key={t}>{t}</Tag>))}
      </div>
      <T>{kr?"❌ 타이트 티(볼륨 강조), 오버사이즈(더 커보임), 스키니진, 짧은 자켓":"❌ Tight tees, oversized, skinny jeans, cropped jackets"}</T>
    </Sec>
    <Sec title={kr?"두 가지 무드":"TWO MOODS"} emoji="🎭">
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1,padding:14,background:"linear-gradient(135deg,#f4ece0,#ece4d4)",borderRadius:12,textAlign:"center",border:"1px solid #e4dcd0"}}>
          <div style={{fontSize:20,marginBottom:4}}>🎸</div>
          <div style={{fontSize:11,fontWeight:700,color:"#5C3A1E"}}>{kr?"어반 보헤미안":"Urban Bohemian"}</div>
          <div style={{fontSize:8.5,color:"#8a7060",marginTop:4}}>{kr?"장발·수염·어스톤·가죽·부츠":"Long hair·Beard·Earth·Leather·Boots"}</div>
        </div>
        <div style={{flex:1,padding:14,background:"linear-gradient(135deg,#f0f0f4,#e8e8ee)",borderRadius:12,textAlign:"center",border:"1px solid #dcdce0"}}>
          <div style={{fontSize:20,marginBottom:4}}>🖤</div>
          <div style={{fontSize:11,fontWeight:700,color:"#2C2C2C"}}>{kr?"다크 스마트캐주얼":"Dark Smart Casual"}</div>
          <div style={{fontSize:8.5,color:"#808090",marginTop:4}}>{kr?"올블랙·니트+셔츠·블레이저·로퍼":"All-black·Knit+Shirt·Blazer·Loafers"}</div>
        </div>
      </div>
    </Sec>
    <Sec title={kr?"그루밍":"GROOMING"} emoji="🧔">
      <T><B>{kr?"수염":"Beard"}</B> — {kr?"비어드 오일 매일 + 비어드 밤. 2~3주마다 목/볼라인 정리.":"Beard oil daily + balm. Trim neck/cheek line every 2-3 weeks."}</T>
      <T><B>{kr?"머리":"Hair"}</B> — {kr?"다크 컬리 장발 = 시그니처. 디퓨저 드라이. 주 1~2회 딥 컨디셔닝.":"Dark curly long hair = signature. Diffuser dry. Deep conditioning 1-2x/week."}</T>
      <T><B>{kr?"헤어 스타일":"Styles"}</B> — {kr?"내림(기본) / 맨번(강한 인상) / 하프번(출근/포멀)":"Down (default) / Man bun (strong) / Half bun (work/formal)"}</T>
    </Sec>
  </div>);
}

/* ── SEASON DATA ── */
const SP = {
  palette:["must","olv","terra","ofwht","navy","blk","camel","burg","brn"],
  items:{
    kr:{outer:[["🧥","카멜 코튼 자켓",["camel"]],["🧥","남색 하프코트",["navy"]],["🧥","올리브 봄버 자켓",["olv"]],["🧥","다크브라운 가죽 자켓",["brn"]]],top:[["👔","버건디 V넥 니트",["burg"]],["👔","머스터드 크루넥 니트",["must"]],["👔","오프화이트 옥스포드 셔츠",["ofwht"]],["👔","남색 린넨 셔츠",["navy"]],["👔","블랙 헨리넥",["blk"]],["👔","차콜 V넥 니트",["char"]]],bottom:[["👖","블랙 치노",["blk"]],["👖","다크인디고 데님",["dindigo"]],["👖","차콜 울 팬츠",["char"]],["👖","올리브 치노",["olv"]],["👖","남색 치노",["navy"]]],shoe:[["👞","다크브라운 가죽 부츠",["brn"]],["👞","블랙 가죽 로퍼",["blk"]],["👞","화이트 가죽 스니커즈",["wht"]]]},
    en:{outer:[["🧥","Camel Cotton Jacket",["camel"]],["🧥","Navy Half Coat",["navy"]],["🧥","Olive Bomber Jacket",["olv"]],["🧥","Dark Brown Leather Jacket",["brn"]]],top:[["👔","Burgundy V-Neck Knit",["burg"]],["👔","Mustard Crewneck Knit",["must"]],["👔","Off-White Oxford Shirt",["ofwht"]],["👔","Navy Linen Shirt",["navy"]],["👔","Black Henley",["blk"]],["👔","Charcoal V-Neck Knit",["char"]]],bottom:[["👖","Black Chinos",["blk"]],["👖","Dark Indigo Denim",["dindigo"]],["👖","Charcoal Wool Pants",["char"]],["👖","Olive Chinos",["olv"]],["👖","Navy Chinos",["navy"]]],shoe:[["👞","Dark Brown Leather Boots",["brn"]],["👞","Black Leather Loafers",["blk"]],["👞","White Leather Sneakers",["wht"]]]},
  },
  outfits:[
    {c:["burg","ofwht","blk"],d:{kr:"버건디 니트 + 오프화이트 셔츠 레이어 + 블랙 치노 + 브라운 부츠",en:"Burgundy knit + off-white shirt layer + black chinos + brown boots"},n:{kr:"봄 시그니처",en:"Spring signature"}},
    {c:["camel","must","dindigo"],d:{kr:"카멜 자켓 + 머스터드 니트 + 다크인디고 데님 + 로퍼",en:"Camel jacket + mustard knit + dark indigo denim + loafers"},n:{kr:"봄 포인트",en:"Spring accent"}},
    {c:["brn","navy","blk"],d:{kr:"브라운 가죽자켓 + 남색 셔츠 + 블랙 치노 + 부츠",en:"Brown leather jacket + navy shirt + black chinos + boots"},n:{kr:"보헤미안 시크",en:"Bohemian chic"}},
    {c:["olv","ofwht","olv"],d:{kr:"올리브 봄버 + 오프화이트 셔츠 + 올리브 치노 + 스니커즈",en:"Olive bomber + off-white shirt + olive chinos + sneakers"},n:{kr:"캐주얼",en:"Casual"}},
    {c:["blk","dindigo"],d:{kr:"블랙 헨리넥 + 다크인디고 데님 + 브라운 부츠",en:"Black henley + dark indigo denim + brown boots"},n:{kr:"미니멀",en:"Minimal"}},
    {c:["char","ofwht","navy"],d:{kr:"차콜 니트 + 오프화이트 셔츠 + 남색 치노 + 로퍼",en:"Charcoal knit + off-white shirt + navy chinos + loafers"},n:{kr:"스마트캐주얼",en:"Smart casual"}},
    {c:["camel","burg","char"],d:{kr:"카멜 자켓 + 버건디 니트 + 차콜 울팬츠 + 부츠",en:"Camel jacket + burgundy knit + charcoal wool pants + boots"},n:{kr:"버건디+카멜",en:"Burgundy+camel"}},
    {c:["navy","olv"],d:{kr:"남색 셔츠 + 올리브 치노 + 스니커즈",en:"Navy shirt + olive chinos + sneakers"},n:{kr:"어스톤 믹스",en:"Earth tone mix"}},
    {c:["brn","blk","blk"],d:{kr:"가죽자켓 + 블랙 헨리넥 + 블랙 치노 + 부츠",en:"Leather jacket + black henley + black chinos + boots"},n:{kr:"올블랙+가죽",en:"All-black+leather"}},
    {c:["navy","must","blk"],d:{kr:"남색 하프코트 + 머스터드 니트 + 블랙 치노 + 부츠",en:"Navy half coat + mustard knit + black chinos + boots"},n:{kr:"머스터드 강조",en:"Mustard accent"}},
    {c:["camel","ofwht","navy"],d:{kr:"카멜 자켓 + 오프화이트 셔츠 + 남색 치노",en:"Camel jacket + off-white shirt + navy chinos"},n:{kr:"밝고 깔끔",en:"Bright+clean"}},
    {c:["char","ofwht","dindigo"],d:{kr:"차콜 V넥 + 오프화이트 셔츠 + 데님 + 로퍼",en:"Charcoal V-neck + off-white shirt + denim + loafers"},n:{kr:"레이어",en:"Layered"}},
    {c:["burg","olv"],d:{kr:"버건디 니트 + 올리브 치노 + 부츠",en:"Burgundy knit + olive chinos + boots"},n:{kr:"가을톤 봄",en:"Autumn-toned spring"}},
    {c:["navy","blk","char"],d:{kr:"남색 하프코트 + 블랙 헨리넥 + 차콜 울팬츠 + 로퍼",en:"Navy coat + black henley + charcoal pants + loafers"},n:{kr:"시크",en:"Chic"}},
    {c:["olv","must","navy"],d:{kr:"올리브 봄버 + 머스터드 니트 + 남색 치노 + 스니커즈",en:"Olive bomber + mustard knit + navy chinos + sneakers"},n:{kr:"컬러풀",en:"Colorful"}},
    {c:["ofwht","dindigo"],d:{kr:"오프화이트 셔츠(소매 걷기) + 데님 + 브라운 부츠",en:"Off-white shirt (rolled sleeves) + denim + brown boots"},n:{kr:"캐주얼 셔츠",en:"Casual shirt"}},
    {c:["camel","navy","char"],d:{kr:"카멜 자켓 + 남색 셔츠 + 차콜 울팬츠 + 로퍼",en:"Camel jacket + navy shirt + charcoal pants + loafers"},n:{kr:"비즈캐주얼",en:"Biz casual"}},
    {c:["brn","char","blk"],d:{kr:"가죽자켓 + 차콜 니트 + 블랙 치노",en:"Leather jacket + charcoal knit + black chinos"},n:{kr:"다크 레이어",en:"Dark layer"}},
    {c:["navy","burg","dindigo"],d:{kr:"남색 하프코트 + 버건디 니트 + 데님 + 부츠",en:"Navy coat + burgundy knit + denim + boots"},n:{kr:"딥톤",en:"Deep tones"}},
    {c:["must","char"],d:{kr:"머스터드 니트 + 차콜 울팬츠 + 블랙 로퍼 + 선글라스",en:"Mustard knit + charcoal pants + black loafers + sunglasses"},n:{kr:"주말 브런치",en:"Weekend brunch"}},
  ]
};

const SU = {
  palette:["blk","navy","ofwht","terra","olv","camel","must","char","ivory"],
  items:{
    kr:{outer:[["🧥","남색 린넨 자켓",["navy"]],["🧥","오프화이트 린넨 셔츠(오픈)",["ofwht"]]],top:[["👔","블랙 V넥 티",["blk"]],["👔","남색 린넨 반팔",["navy"]],["👔","오프화이트 린넨 셔츠",["ofwht"]],["👔","올리브 헨리넥",["olv"]],["👔","테라코타 폴로",["terra"]],["👔","차콜 V넥 티",["char"]]],bottom:[["👖","블랙 린넨 팬츠",["blk"]],["👖","남색 치노",["navy"]],["👖","올리브 쇼츠",["olv"]],["👖","다크인디고 데님(얇은)",["dindigo"]]],shoe:[["👞","다크브라운 샌들",["brn"]],["👞","화이트 스니커즈",["wht"]],["👞","남색 에스파드리유",["navy"]]]},
    en:{outer:[["🧥","Navy Linen Jacket",["navy"]],["🧥","Off-White Linen Shirt (open)",["ofwht"]]],top:[["👔","Black V-Neck Tee",["blk"]],["👔","Navy Linen Short-Sleeve",["navy"]],["👔","Off-White Linen Shirt",["ofwht"]],["👔","Olive Henley",["olv"]],["👔","Terracotta Polo",["terra"]],["👔","Charcoal V-Neck Tee",["char"]]],bottom:[["👖","Black Linen Pants",["blk"]],["👖","Navy Chinos",["navy"]],["👖","Olive Shorts",["olv"]],["👖","Dark Indigo Denim (light)",["dindigo"]]],shoe:[["👞","Dark Brown Sandals",["brn"]],["👞","White Sneakers",["wht"]],["👞","Navy Espadrilles",["navy"]]]},
  },
  outfits:[
    {c:["blk","blk"],d:{kr:"블랙 V넥 + 블랙 린넨 팬츠 + 브라운 샌들",en:"Black V-neck + black linen pants + brown sandals"},n:{kr:"올블랙 여름",en:"All-black summer"}},
    {c:["navy","ofwht"],d:{kr:"남색 린넨 반팔 + 오프화이트 린넨 팬츠 + 스니커즈",en:"Navy linen shirt + off-white pants + sneakers"},n:{kr:"린넨 여름",en:"Linen summer"}},
    {c:["ofwht","blk","navy"],d:{kr:"오프화이트 셔츠(오픈) + 블랙 V넥 + 남색 치노",en:"Off-white shirt (open) + black V-neck + navy chinos"},n:{kr:"레이어 여름",en:"Layered summer"}},
    {c:["olv","blk"],d:{kr:"올리브 헨리넥 + 블랙 린넨 팬츠 + 브라운 샌들",en:"Olive henley + black linen pants + brown sandals"},n:{kr:"어스 캐주얼",en:"Earth casual"}},
    {c:["terra","dindigo"],d:{kr:"테라코타 폴로 + 다크인디고 데님 + 스니커즈",en:"Terracotta polo + dark indigo denim + sneakers"},n:{kr:"폴로 포인트",en:"Polo accent"}},
    {c:["char","olv"],d:{kr:"차콜 V넥 + 올리브 쇼츠 + 스니커즈",en:"Charcoal V-neck + olive shorts + sneakers"},n:{kr:"쇼츠 캐주얼",en:"Shorts casual"}},
    {c:["navy","blk"],d:{kr:"남색 린넨 셔츠 + 블랙 린넨 팬츠 + 에스파드리유",en:"Navy linen shirt + black linen pants + espadrilles"},n:{kr:"남색+블랙",en:"Navy+black"}},
    {c:["blk","navy"],d:{kr:"블랙 V넥 + 남색 치노 + 블랙 로퍼",en:"Black V-neck + navy chinos + black loafers"},n:{kr:"미니멀",en:"Minimal"}},
    {c:["ofwht","olv"],d:{kr:"오프화이트 셔츠 + 올리브 쇼츠 + 스니커즈",en:"Off-white shirt + olive shorts + sneakers"},n:{kr:"주말",en:"Weekend"}},
    {c:["terra","blk"],d:{kr:"테라코타 폴로 + 블랙 린넨 팬츠 + 브라운 샌들",en:"Terracotta polo + black linen pants + brown sandals"},n:{kr:"테라코타",en:"Terracotta"}},
    {c:["navy","blk","blk"],d:{kr:"남색 반팔 + 블랙 치노 + 블랙 로퍼",en:"Navy short-sleeve + black chinos + black loafers"},n:{kr:"저녁 외출",en:"Evening out"}},
    {c:["olv","dindigo"],d:{kr:"올리브 헨리넥 + 다크인디고 데님 + 스니커즈",en:"Olive henley + dark indigo denim + sneakers"},n:{kr:"캐주얼",en:"Casual"}},
    {c:["navy","char","navy"],d:{kr:"남색 자켓 + 차콜 V넥 + 남색 치노 + 로퍼",en:"Navy jacket + charcoal V-neck + navy chinos + loafers"},n:{kr:"스마트 여름",en:"Smart summer"}},
    {c:["blk","olv"],d:{kr:"블랙 V넥 + 올리브 쇼츠 + 브라운 샌들 + 선글라스",en:"Black V-neck + olive shorts + brown sandals + shades"},n:{kr:"릴랙스",en:"Relaxed"}},
    {c:["ofwht","blk"],d:{kr:"오프화이트 셔츠 + 블랙 린넨 팬츠 + 블랙 로퍼",en:"Off-white shirt + black linen pants + black loafers"},n:{kr:"여름 디너",en:"Summer dinner"}},
    {c:["navy","olv"],d:{kr:"남색 반팔 + 올리브 쇼츠 + 에스파드리유",en:"Navy short-sleeve + olive shorts + espadrilles"},n:{kr:"바캉스",en:"Vacation"}},
    {c:["navy","blk","dindigo"],d:{kr:"남색 자켓 + 블랙 V넥 + 데님 + 로퍼",en:"Navy jacket + black V-neck + denim + loafers"},n:{kr:"여름 밤",en:"Summer night"}},
    {c:["terra","navy"],d:{kr:"테라코타 폴로 + 남색 치노 + 스니커즈",en:"Terracotta polo + navy chinos + sneakers"},n:{kr:"컬러 매칭",en:"Color matching"}},
    {c:["char","blk"],d:{kr:"차콜 V넥 + 블랙 린넨 팬츠 + 브라운 샌들",en:"Charcoal V-neck + black linen pants + brown sandals"},n:{kr:"다크 릴랙스",en:"Dark relaxed"}},
    {c:["ofwht","blk","olv"],d:{kr:"오프화이트 셔츠(오픈) + 블랙 V넥 + 올리브 쇼츠",en:"Off-white shirt (open) + black V-neck + olive shorts"},n:{kr:"레이어 캐주얼",en:"Layered casual"}},
  ]
};

const FA = {
  palette:["burg","blk","must","jgrn","navy","brn","terra","olv","camel","ofwht"],
  items:{
    kr:{outer:[["🧥","카멜 울 오버코트",["camel"]],["🧥","블랙 울 피코트",["blk"]],["🧥","다크브라운 가죽 자켓",["brn"]],["🧥","남색 울 블레이저",["navy"]],["🧥","올리브 필드 자켓",["olv"]]],top:[["👔","버건디 V넥 울 니트",["burg"]],["👔","머스터드 크루넥 니트",["must"]],["👔","주얼그린 터틀넥",["jgrn"]],["👔","오프화이트 옥스포드 셔츠",["ofwht"]],["👔","블랙 터틀넥",["blk"]],["👔","차콜 V넥 니트",["char"]],["👔","남색 플란넬 셔츠",["navy"]]],bottom:[["👖","블랙 울 슬랙스",["blk"]],["👖","다크인디고 데님",["dindigo"]],["👖","버건디 코듀로이",["burg"]],["👖","차콜 울 팬츠",["char"]],["👖","올리브 치노",["olv"]]],shoe:[["👞","다크브라운 첼시부츠",["brn"]],["👞","블랙 가죽 부츠",["blk"]],["👞","코냑 더비슈즈",["cognac"]],["👞","블랙 로퍼",["blk"]]]},
    en:{outer:[["🧥","Camel Wool Overcoat",["camel"]],["🧥","Black Wool Peacoat",["blk"]],["🧥","Dark Brown Leather Jacket",["brn"]],["🧥","Navy Wool Blazer",["navy"]],["🧥","Olive Field Jacket",["olv"]]],top:[["👔","Burgundy V-Neck Wool Knit",["burg"]],["👔","Mustard Crewneck Knit",["must"]],["👔","Jewel Green Turtleneck",["jgrn"]],["👔","Off-White Oxford Shirt",["ofwht"]],["👔","Black Turtleneck",["blk"]],["👔","Charcoal V-Neck Knit",["char"]],["👔","Navy Flannel Shirt",["navy"]]],bottom:[["👖","Black Wool Trousers",["blk"]],["👖","Dark Indigo Denim",["dindigo"]],["👖","Burgundy Corduroy",["burg"]],["👖","Charcoal Wool Pants",["char"]],["👖","Olive Chinos",["olv"]]],shoe:[["👞","Dark Brown Chelsea Boots",["brn"]],["👞","Black Leather Boots",["blk"]],["👞","Cognac Derby Shoes",["cognac"]],["👞","Black Loafers",["blk"]]]},
  },
  outfits:[
    {c:["camel","burg","blk"],d:{kr:"카멜 코트 + 버건디 니트 + 오프화이트 셔츠 + 블랙 슬랙스 + 첼시부츠",en:"Camel coat + burgundy knit + off-white shirt + black trousers + chelsea boots"},n:{kr:"가을 킬링",en:"Fall killer"}},
    {c:["navy","must","dindigo"],d:{kr:"남색 블레이저 + 머스터드 니트 + 데님 + 로퍼",en:"Navy blazer + mustard knit + denim + loafers"},n:{kr:"보색 대비",en:"Complementary"}},
    {c:["blk","jgrn","blk"],d:{kr:"블랙 피코트 + 주얼그린 터틀넥 + 블랙 슬랙스 + 블랙 부츠",en:"Black peacoat + jewel green turtleneck + black trousers + boots"},n:{kr:"주얼그린",en:"Jewel green"}},
    {c:["brn","blk","burg"],d:{kr:"가죽자켓 + 블랙 터틀넥 + 버건디 코듀로이 + 첼시부츠",en:"Leather jacket + black turtleneck + burgundy corduroy + chelsea boots"},n:{kr:"가죽+코듀로이",en:"Leather+corduroy"}},
    {c:["olv","char","olv"],d:{kr:"올리브 필드자켓 + 차콜 니트 + 오프화이트 셔츠 + 올리브 치노 + 부츠",en:"Olive field jacket + charcoal knit + shirt + olive chinos + boots"},n:{kr:"밀리터리",en:"Military"}},
    {c:["camel","navy","blk"],d:{kr:"카멜 코트 + 남색 플란넬 + 블랙 슬랙스 + 더비슈즈",en:"Camel coat + navy flannel + black trousers + derby shoes"},n:{kr:"스마트",en:"Smart"}},
    {c:["blk","must","blk"],d:{kr:"블랙 피코트 + 머스터드 니트 + 블랙 슬랙스 + 부츠",en:"Black peacoat + mustard knit + black trousers + boots"},n:{kr:"머스터드+블랙",en:"Mustard+black"}},
    {c:["brn","burg","dindigo"],d:{kr:"가죽자켓 + 버건디 니트 + 데님 + 첼시부츠",en:"Leather jacket + burgundy knit + denim + chelsea boots"},n:{kr:"보헤미안",en:"Bohemian"}},
    {c:["navy","blk","char"],d:{kr:"남색 블레이저 + 블랙 터틀넥 + 차콜 팬츠 + 로퍼",en:"Navy blazer + black turtleneck + charcoal pants + loafers"},n:{kr:"모던",en:"Modern"}},
    {c:["camel","jgrn","dindigo"],d:{kr:"카멜 코트 + 주얼그린 터틀넥 + 데님",en:"Camel coat + jewel green turtleneck + denim"},n:{kr:"그린+카멜",en:"Green+camel"}},
    {c:["navy","ofwht","blk"],d:{kr:"남색 블레이저 + 오프화이트 셔츠 + 블랙 슬랙스 + 더비슈즈",en:"Navy blazer + off-white shirt + black trousers + derby shoes"},n:{kr:"비즈캐주얼",en:"Biz casual"}},
    {c:["blk","char","burg"],d:{kr:"블랙 피코트 + 차콜 니트 + 버건디 코듀로이 + 부츠",en:"Black peacoat + charcoal knit + burgundy corduroy + boots"},n:{kr:"질감 믹스",en:"Texture mix"}},
    {c:["brn","navy","olv"],d:{kr:"가죽자켓 + 남색 플란넬 + 올리브 치노 + 부츠",en:"Leather jacket + navy flannel + olive chinos + boots"},n:{kr:"어스 레이어",en:"Earth layer"}},
    {c:["camel","blk","blk"],d:{kr:"카멜 코트 + 블랙 터틀넥 + 블랙 슬랙스 + 첼시부츠",en:"Camel coat + black turtleneck + black trousers + chelsea boots"},n:{kr:"올블랙+카멜",en:"All-black+camel"}},
    {c:["olv","must","olv"],d:{kr:"올리브 필드자켓 + 머스터드 니트 + 올리브 치노 + 부츠",en:"Olive field jacket + mustard knit + olive chinos + boots"},n:{kr:"웜 어스",en:"Warm earth"}},
    {c:["navy","burg","char"],d:{kr:"남색 블레이저 + 버건디 니트 + 차콜 팬츠 + 로퍼",en:"Navy blazer + burgundy knit + charcoal pants + loafers"},n:{kr:"레이어 포멀",en:"Layered formal"}},
    {c:["brn","jgrn","blk"],d:{kr:"가죽자켓 + 주얼그린 터틀넥 + 블랙 슬랙스 + 블랙 부츠",en:"Leather jacket + jewel green turtleneck + black trousers + boots"},n:{kr:"그린+블랙",en:"Green+black"}},
    {c:["camel","char","dindigo"],d:{kr:"카멜 코트 + 차콜 니트 + 오프화이트 셔츠 + 데님",en:"Camel coat + charcoal knit + off-white shirt + denim"},n:{kr:"클래식 레이어",en:"Classic layer"}},
    {c:["blk","navy","blk"],d:{kr:"블랙 피코트 + 남색 플란넬 + 블랙 슬랙스 + 로퍼",en:"Black peacoat + navy flannel + black trousers + loafers"},n:{kr:"남색+블랙",en:"Navy+black"}},
    {c:["olv","blk","dindigo"],d:{kr:"올리브 필드자켓 + 블랙 터틀넥 + 데님 + 첼시부츠",en:"Olive field jacket + black turtleneck + denim + chelsea boots"},n:{kr:"다크 필드",en:"Dark field"}},
  ]
};

const WI = {
  palette:["blk","char","navy","burg","camel","must","jgrn","ofwht","brn"],
  items:{
    kr:{outer:[["🧥","카멜 울 오버코트 (롱)",["camel"]],["🧥","블랙 울 롱코트",["blk"]],["🧥","남색 피코트 (더블)",["navy"]],["🧥","블랙 가죽자켓 (코트 안에)",["blk"]]],top:[["👔","버건디 울 터틀넥",["burg"]],["👔","머스터드 캐시미어 니트",["must"]],["👔","주얼그린 울 니트",["jgrn"]],["👔","블랙 캐시미어 터틀넥",["blk"]],["👔","오프화이트 케이블니트",["ofwht"]],["👔","차콜 V넥 니트",["char"]]],bottom:[["👖","블랙 울 슬랙스 (두꺼운)",["blk"]],["👖","차콜 울 팬츠",["char"]],["👖","다크인디고 데님 (두꺼운)",["dindigo"]],["👖","남색 울 팬츠",["navy"]],["👖","버건디 코듀로이",["burg"]]],shoe:[["👞","블랙 첼시부츠",["blk"]],["👞","다크브라운 레이스업 부츠",["brn"]],["👞","블랙 방한부츠",["blk"]]]},
    en:{outer:[["🧥","Camel Wool Overcoat (long)",["camel"]],["🧥","Black Wool Long Coat",["blk"]],["🧥","Navy Peacoat (double-breasted)",["navy"]],["🧥","Black Leather Jacket (under coat)",["blk"]]],top:[["👔","Burgundy Wool Turtleneck",["burg"]],["👔","Mustard Cashmere Knit",["must"]],["👔","Jewel Green Wool Knit",["jgrn"]],["👔","Black Cashmere Turtleneck",["blk"]],["👔","Off-White Cable Knit",["ofwht"]],["👔","Charcoal V-Neck Knit",["char"]]],bottom:[["👖","Black Wool Trousers (heavy)",["blk"]],["👖","Charcoal Wool Pants",["char"]],["👖","Dark Indigo Denim (heavy)",["dindigo"]],["👖","Navy Wool Pants",["navy"]],["👖","Burgundy Corduroy",["burg"]]],shoe:[["👞","Black Chelsea Boots",["blk"]],["👞","Dark Brown Lace-Up Boots",["brn"]],["👞","Black Winter Boots",["blk"]]]},
  },
  outfits:[
    {c:["camel","burg","blk"],d:{kr:"카멜 코트 + 버건디 터틀넥 + 블랙 슬랙스 + 버건디 머플러 + 첼시부츠",en:"Camel coat + burgundy turtleneck + black trousers + burgundy scarf + boots"},n:{kr:"겨울 최고",en:"Winter best"}},
    {c:["blk","blk","blk"],d:{kr:"블랙 롱코트 + 블랙 터틀넥 + 블랙 슬랙스 + 머스터드 머플러",en:"Black long coat + black turtleneck + black trousers + mustard scarf"},n:{kr:"올블랙+머스터드",en:"All-black+mustard"}},
    {c:["navy","must","dindigo"],d:{kr:"남색 피코트 + 머스터드 니트 + 데님 + 브라운 부츠",en:"Navy peacoat + mustard knit + denim + brown boots"},n:{kr:"머스터드+남색",en:"Mustard+navy"}},
    {c:["camel","jgrn","blk"],d:{kr:"카멜 코트 + 주얼그린 니트 + 블랙 슬랙스 + 블랙 장갑",en:"Camel coat + jewel green knit + black trousers + black gloves"},n:{kr:"그린+카멜",en:"Green+camel"}},
    {c:["blk","ofwht","char"],d:{kr:"블랙 롱코트 + 오프화이트 케이블니트 + 차콜 팬츠 + 차콜 머플러",en:"Black long coat + off-white cable knit + charcoal pants + charcoal scarf"},n:{kr:"밝은 안+다크 밖",en:"Light in, dark out"}},
    {c:["camel","blk","burg"],d:{kr:"카멜 코트 + 블랙 터틀넥 + 버건디 코듀로이 + 브라운 부츠",en:"Camel coat + black turtleneck + burgundy corduroy + brown boots"},n:{kr:"질감 믹스",en:"Texture mix"}},
    {c:["navy","char","blk"],d:{kr:"남색 피코트 + 차콜 니트 + 오프화이트 셔츠 + 블랙 슬랙스",en:"Navy peacoat + charcoal knit + off-white shirt + black trousers"},n:{kr:"레이어 겨울",en:"Layered winter"}},
    {c:["blk","burg","navy"],d:{kr:"블랙 롱코트 + 버건디 터틀넥 + 남색 팬츠 + 첼시부츠",en:"Black long coat + burgundy turtleneck + navy pants + chelsea boots"},n:{kr:"버건디+남색",en:"Burgundy+navy"}},
    {c:["blk","must","blk"],d:{kr:"블랙 롱코트 + 머스터드 니트 + 블랙 슬랙스 + 블랙 비니",en:"Black long coat + mustard knit + black trousers + black beanie"},n:{kr:"머스터드 포인트",en:"Mustard point"}},
    {c:["camel","blk","blk"],d:{kr:"카멜 코트 + 블랙 터틀넥 + 블랙 슬랙스 + 브라운 머플러",en:"Camel coat + black turtleneck + black trousers + brown scarf"},n:{kr:"미니멀 럭셔리",en:"Minimal luxury"}},
    {c:["navy","jgrn","dindigo"],d:{kr:"남색 피코트 + 주얼그린 니트 + 데님 + 올리브 비니",en:"Navy peacoat + jewel green knit + denim + olive beanie"},n:{kr:"그린 레이어",en:"Green layer"}},
    {c:["camel","ofwht","blk"],d:{kr:"카멜 코트 + 오프화이트 케이블니트 + 블랙 슬랙스 + 버건디 머플러",en:"Camel coat + off-white cable knit + black trousers + burgundy scarf"},n:{kr:"화이트+버건디",en:"White+burgundy"}},
    {c:["blk","blk","char"],d:{kr:"블랙 롱코트 + 가죽자켓 + 블랙 터틀넥 + 차콜 팬츠",en:"Black long coat + leather jacket + black turtleneck + charcoal pants"},n:{kr:"더블 레이어",en:"Double layer"}},
    {c:["blk","burg","blk"],d:{kr:"블랙 롱코트 + 버건디 터틀넥 + 블랙 슬랙스 + 블랙 장갑",en:"Black long coat + burgundy turtleneck + black trousers + black gloves"},n:{kr:"버건디 시크",en:"Burgundy chic"}},
    {c:["camel","char","dindigo"],d:{kr:"카멜 코트 + 차콜 니트 + 데님 + 카멜 머플러",en:"Camel coat + charcoal knit + denim + camel scarf"},n:{kr:"카멜 톤온톤",en:"Camel tonal"}},
    {c:["navy","must","char"],d:{kr:"남색 피코트 + 머스터드 니트 + 차콜 팬츠 + 남색 머플러",en:"Navy peacoat + mustard knit + charcoal pants + navy scarf"},n:{kr:"웜+쿨 믹스",en:"Warm+cool mix"}},
    {c:["camel","blk","navy"],d:{kr:"카멜 코트 + 블랙 터틀넥 + 남색 팬츠",en:"Camel coat + black turtleneck + navy pants"},n:{kr:"3색 조합",en:"Three-color"}},
    {c:["blk","jgrn","blk"],d:{kr:"블랙 롱코트 + 주얼그린 니트 + 블랙 슬랙스 + 주얼그린 머플러",en:"Black coat + jewel green knit + black trousers + green scarf"},n:{kr:"그린 시그니처",en:"Green signature"}},
    {c:["navy","ofwht","navy"],d:{kr:"남색 피코트 + 오프화이트 케이블니트 + 남색 팬츠 + 브라운 부츠",en:"Navy peacoat + off-white cable knit + navy pants + brown boots"},n:{kr:"오프화이트+남색",en:"Off-white+navy"}},
    {c:["blk","burg","dindigo"],d:{kr:"블랙 롱코트 + 가죽자켓 + 버건디 터틀넥 + 데님",en:"Black coat + leather jacket + burgundy turtleneck + denim"},n:{kr:"풀 레이어",en:"Full layer"}},
  ]
};

/* ── WORK ── */
function WorkTab({lang}) {
  const kr=lang==="kr";
  const d={ss:[
    {c:["navy","ofwht","navy"],d:kr?"오프화이트 셔츠 + 남색 슬랙스 + 남색 블레이저 + 코냑 더비":"Off-white shirt + navy trousers + navy blazer + cognac derby",n:kr?"클래식":"Classic"},
    {c:["char","lblu","blk"],d:kr?"차콜 블레이저 + 라이트블루 셔츠 + 블랙 슬랙스 + 블랙 더비":"Charcoal blazer + light blue shirt + black trousers + black derby",n:kr?"모노톤":"Monotone"},
    {c:["navy","ofwht","char"],d:kr?"남색 블레이저 + 오프화이트 셔츠 + 차콜 팬츠 + 코냑 더비":"Navy blazer + off-white shirt + charcoal pants + cognac derby",n:kr?"남색+차콜":"Navy+charcoal"},
    {c:["ofwht","navy"],d:kr?"오프화이트 셔츠 + 남색 슬랙스 + 코냑 더비 (노 블레이저)":"Off-white shirt + navy trousers + cognac derby (no blazer)",n:kr?"심플":"Simple"},
    {c:["navy","lblu","blk"],d:kr?"남색 블레이저 + 라이트블루 셔츠 + 블랙 슬랙스 + 블랙 더비":"Navy blazer + light blue shirt + black trousers + black derby",n:kr?"파워":"Power"},
    {c:["char","ofwht","char"],d:kr?"차콜 블레이저 + 오프화이트 셔츠 + 차콜 팬츠 + 코냑 더비":"Charcoal blazer + off-white shirt + charcoal pants + cognac derby",n:kr?"톤온톤":"Tonal"},
  ],fw:[
    {c:["camel","char","blk"],d:kr?"카멜 코트 + 차콜 니트 + 오프화이트 셔츠 + 블랙 슬랙스 + 남색 블레이저 + 더비":"Camel coat + charcoal knit + off-white shirt + black trousers + navy blazer + derby",n:kr?"풀 레이어":"Full layer"},
    {c:["blk","navy","char"],d:kr?"블랙 코트 + 남색 니트 + 오프화이트 셔츠 + 차콜 팬츠 + 첼시부츠":"Black coat + navy knit + off-white shirt + charcoal pants + chelsea boots",n:kr?"다크 레이어":"Dark layer"},
    {c:["camel","ofwht","blk"],d:kr?"카멜 코트 + 오프화이트 셔츠 + 블랙 슬랙스 + 남색 블레이저 + 코냑 더비":"Camel coat + off-white shirt + black trousers + navy blazer + cognac derby",n:kr?"카멜 마무리":"Camel finish"},
    {c:["blk","char","navy"],d:kr?"블랙 코트 + 차콜 니트 + 라이트블루 셔츠 + 남색 슬랙스 + 블랙 더비":"Black coat + charcoal knit + light blue shirt + navy trousers + black derby",n:kr?"모노톤":"Monotone"},
    {c:["camel","navy","blk"],d:kr?"카멜 코트 + 남색 니트 + 오프화이트 셔츠 + 블랙 슬랙스 + 첼시부츠":"Camel coat + navy knit + off-white shirt + black trousers + chelsea boots",n:kr?"남색+카멜":"Navy+camel"},
    {c:["blk","ofwht","char"],d:kr?"블랙 코트 + 오프화이트 셔츠 + 차콜 팬츠 + 차콜 블레이저 + 블랙 더비":"Black coat + off-white shirt + charcoal pants + charcoal blazer + black derby",n:kr?"시크":"Chic"},
  ]};
  return (<div>
    <Sec title={kr?"출근 팔레트":"WORK PALETTE"} emoji="🎨"><Pal keys={["blk","ofwht","navy","char","lblu","camel"]} lang={lang}/></Sec>
    <Sec title={kr?"☀️ 봄·여름":"☀️ SPRING·SUMMER"} emoji="">{d.ss.map((o,i)=>(<OCard key={i} n={i+1} colors={o.c} desc={o.d} note={o.n}/>))}</Sec>
    <Sec title={kr?"❄️ 가을·겨울":"❄️ FALL·WINTER"} emoji="">{d.fw.map((o,i)=>(<OCard key={i} n={i+1} colors={o.c} desc={o.d} note={o.n}/>))}</Sec>
  </div>);
}

/* ── SEASON TAB ── */
function SeasonTab({data,lang}) {
  const kr=lang==="kr";
  const cats=kr?["🧥 아우터","👔 상의","👖 하의","👞 신발"]:["🧥 OUTER","👔 TOP","👖 BOTTOM","👞 SHOES"];
  const ck=["outer","top","bottom","shoe"];
  return (<div>
    <Sec title={kr?"시즌 팔레트":"SEASON PALETTE"} emoji="🎨"><Pal keys={data.palette} lang={lang}/></Sec>
    <Sec title={kr?"아이템":"KEY ITEMS"} emoji="🏷️">
      {ck.map((k,ci)=>data.items[lang][k]?(<div key={k}><div style={{fontSize:9,fontWeight:700,color:"#a09080",marginTop:ci>0?10:0,marginBottom:4}}>{cats[ci]}</div>{data.items[lang][k].map(([e,n,c],i)=>(<IRow key={i} emoji={e} name={n} colors={c}/>))}</div>):null)}
    </Sec>
    <Sec title={kr?"20벌 코디":"20 OUTFITS"} emoji="👔">
      {data.outfits.map((o,i)=>(<OCard key={i} n={i+1} colors={o.c} desc={o.d[lang]} note={o.n[lang]}/>))}
    </Sec>
  </div>);
}

/* ── CLOSET ── */
function ClosetTab({lang}) {
  const kr=lang==="kr";
  const groups=[
    {emoji:"🧥",title:kr?"아우터":"OUTERWEAR",items:[
      [kr?"카멜 코튼 자켓 (봄)":"Camel Cotton Jacket (spring)",["camel"]],[kr?"카멜 울 오버코트":"Camel Wool Overcoat",["camel"]],
      [kr?"남색 하프코트 (봄)":"Navy Half Coat (spring)",["navy"]],[kr?"남색 피코트 (겨울)":"Navy Peacoat (winter)",["navy"]],
      [kr?"블랙 울 롱코트":"Black Wool Long Coat",["blk"]],[kr?"블랙 울 피코트":"Black Wool Peacoat",["blk"]],
      [kr?"다크브라운 가죽 자켓":"Dark Brown Leather Jacket",["brn"]],[kr?"블랙 가죽 자켓 (겨울 안에)":"Black Leather Jacket (winter inner)",["blk"]],
      [kr?"올리브 봄버 자켓":"Olive Bomber Jacket",["olv"]],[kr?"올리브 필드 자켓":"Olive Field Jacket",["olv"]],
      [kr?"남색 울 블레이저":"Navy Wool Blazer",["navy"]],[kr?"남색 린넨 자켓 (여름)":"Navy Linen Jacket (summer)",["navy"]],
    ]},
    {emoji:"👔",title:kr?"상의":"TOPS",items:[
      [kr?"버건디 V넥 울 니트":"Burgundy V-Neck Wool Knit",["burg"]],[kr?"버건디 울 터틀넥":"Burgundy Wool Turtleneck",["burg"]],
      [kr?"머스터드 크루넥 니트":"Mustard Crewneck Knit",["must"]],[kr?"머스터드 캐시미어":"Mustard Cashmere",["must"]],
      [kr?"주얼그린 터틀넥":"Jewel Green Turtleneck",["jgrn"]],[kr?"주얼그린 울 니트":"Jewel Green Wool Knit",["jgrn"]],
      [kr?"블랙 터틀넥 (캐시미어)":"Black Turtleneck (cashmere)",["blk"]],[kr?"블랙 헨리넥":"Black Henley",["blk"]],
      [kr?"블랙 V넥 티 (여름)":"Black V-Neck Tee (summer)",["blk"]],[kr?"차콜 V넥 니트":"Charcoal V-Neck Knit",["char"]],
      [kr?"차콜 V넥 티 (여름)":"Charcoal V-Neck Tee (summer)",["char"]],
      [kr?"오프화이트 옥스포드 셔츠":"Off-White Oxford Shirt",["ofwht"]],[kr?"오프화이트 린넨 셔츠":"Off-White Linen Shirt",["ofwht"]],
      [kr?"오프화이트 케이블니트":"Off-White Cable Knit",["ofwht"]],
      [kr?"남색 린넨 셔츠":"Navy Linen Shirt",["navy"]],[kr?"남색 린넨 반팔":"Navy Linen Short-Sleeve",["navy"]],
      [kr?"남색 플란넬 셔츠":"Navy Flannel Shirt",["navy"]],[kr?"라이트블루 셔츠 (출근)":"Light Blue Shirt (work)",["lblu"]],
      [kr?"올리브 헨리넥 (여름)":"Olive Henley (summer)",["olv"]],[kr?"테라코타 폴로 (여름)":"Terracotta Polo (summer)",["terra"]],
    ]},
    {emoji:"👖",title:kr?"하의":"BOTTOMS",items:[
      [kr?"블랙 치노":"Black Chinos",["blk"]],[kr?"블랙 울 슬랙스 (겨울)":"Black Wool Trousers (winter)",["blk"]],
      [kr?"블랙 린넨 팬츠 (여름)":"Black Linen Pants (summer)",["blk"]],
      [kr?"차콜 울 팬츠":"Charcoal Wool Pants",["char"]],[kr?"다크인디고 데님":"Dark Indigo Denim",["dindigo"]],
      [kr?"남색 치노":"Navy Chinos",["navy"]],[kr?"남색 울 팬츠 (겨울)":"Navy Wool Pants (winter)",["navy"]],
      [kr?"올리브 치노":"Olive Chinos",["olv"]],[kr?"올리브 쇼츠 (여름)":"Olive Shorts (summer)",["olv"]],
      [kr?"버건디 코듀로이":"Burgundy Corduroy",["burg"]],
    ]},
    {emoji:"👞",title:kr?"신발":"SHOES",items:[
      [kr?"다크브라운 가죽 첼시부츠":"Dark Brown Chelsea Boots",["brn"]],[kr?"다크브라운 레이스업 부츠":"Dark Brown Lace-Up Boots",["brn"]],
      [kr?"블랙 가죽 부츠":"Black Leather Boots",["blk"]],[kr?"블랙 첼시부츠":"Black Chelsea Boots",["blk"]],
      [kr?"블랙 방한부츠":"Black Winter Boots",["blk"]],[kr?"블랙 가죽 로퍼":"Black Leather Loafers",["blk"]],
      [kr?"코냑 더비슈즈":"Cognac Derby Shoes",["cognac"]],[kr?"블랙 더비슈즈 (출근)":"Black Derby Shoes (work)",["blk"]],
      [kr?"화이트 가죽 스니커즈":"White Leather Sneakers",["wht"]],[kr?"다크브라운 샌들 (여름)":"Dark Brown Sandals (summer)",["brn"]],
      [kr?"남색 에스파드리유 (여름)":"Navy Espadrilles (summer)",["navy"]],
    ]},
    {emoji:"🧣",title:kr?"악세서리":"ACCESSORIES",items:[
      [kr?"버건디 울 머플러":"Burgundy Wool Scarf",["burg"]],[kr?"머스터드 울 머플러":"Mustard Wool Scarf",["must"]],
      [kr?"차콜 캐시미어 머플러":"Charcoal Cashmere Scarf",["char"]],[kr?"남색 울 머플러":"Navy Wool Scarf",["navy"]],
      [kr?"주얼그린 머플러":"Jewel Green Scarf",["jgrn"]],[kr?"카멜 머플러":"Camel Scarf",["camel"]],
      [kr?"블랙 울 비니":"Black Wool Beanie",["blk"]],[kr?"올리브 비니":"Olive Beanie",["olv"]],
      [kr?"버건디 비니":"Burgundy Beanie",["burg"]],[kr?"블랙 볼캡":"Black Cap",["blk"]],
      [kr?"블랙 가죽 장갑":"Black Leather Gloves",["blk"]],[kr?"다크브라운 가죽 장갑":"Dark Brown Leather Gloves",["brn"]],
      [kr?"웨이퍼러 선글라스 (블랙)":"Wayfarer Sunglasses (black)",["blk"]],
      [kr?"다크 다이얼 시계 (브라운 스트랩)":"Dark Dial Watch (brown strap)",["brn"]],
      [kr?"실버 미니멀 반지 ×2":"Silver Minimal Rings ×2",["char"]],
      [kr?"블랙 가죽 벨트":"Black Leather Belt",["blk"]],[kr?"다크브라운 가죽 벨트":"Dark Brown Leather Belt",["brn"]],
    ]},
    {emoji:"🎒",title:kr?"가방":"BAGS",items:[
      [kr?"블랙 가죽 백팩":"Black Leather Backpack",["blk"]],
      [kr?"다크브라운 메신저백":"Dark Brown Messenger Bag",["brn"]],
      [kr?"남색 캔버스 토트":"Navy Canvas Tote",["navy"]],
    ]},
  ];
  const total=groups.reduce((s,g)=>s+g.items.length,0);
  return (<div>
    <div style={{textAlign:"center",padding:"14px 0 18px"}}>
      <div style={{fontSize:28}}>👔</div>
      <div style={{fontSize:11,fontWeight:700,color:"#303030",marginTop:4}}>{kr?`전체 ${total}개 아이템`:`${total} Total Items`}</div>
      <div style={{fontSize:9,color:"#a0a0a0",marginTop:2}}>{kr?"모든 계절 · 출근 · 악세서리 통합":"All seasons · work · accessories combined"}</div>
    </div>
    {groups.map(g=>(<Sec key={g.title} title={`${g.title} (${g.items.length})`} emoji={g.emoji}>{g.items.map(([n,c],i)=>(<IRow key={i} name={n} colors={c}/>))}</Sec>))}
  </div>);
}

/* ── GUIDE ── */
function GuideTab({lang}) {
  const kr=lang==="kr";
  const combos=[
    {a:"burg",b:"blk",n:kr?"버건디+블랙":"Burgundy+Black",d:kr?"가장 강렬":"Most powerful"},
    {a:"burg",b:"camel",n:kr?"버건디+카멜":"Burgundy+Camel",d:kr?"따뜻하고 고급":"Warm+luxe"},
    {a:"must",b:"navy",n:kr?"머스터드+남색":"Mustard+Navy",d:kr?"클래식 보색":"Classic complementary"},
    {a:"must",b:"blk",n:kr?"머스터드+블랙":"Mustard+Black",d:kr?"올블랙에 포인트":"All-black accent"},
    {a:"jgrn",b:"blk",n:kr?"주얼그린+블랙":"Green+Black",d:kr?"깊고 시크":"Deep+chic"},
    {a:"jgrn",b:"camel",n:kr?"주얼그린+카멜":"Green+Camel",d:kr?"자연+럭셔리":"Nature+luxury"},
    {a:"olv",b:"blk",n:kr?"올리브+블랙":"Olive+Black",d:kr?"밀리터리 시크":"Military chic"},
    {a:"terra",b:"navy",n:kr?"테라코타+남색":"Terracotta+Navy",d:kr?"어스+쿨 대비":"Earth+cool contrast"},
    {a:"camel",b:"blk",n:kr?"카멜+블랙":"Camel+Black",d:kr?"럭셔리 베이직":"Luxury basic"},
  ];
  return (<div>
    <Sec title={kr?"컬러 조합 가이드":"COLOR COMBO GUIDE"} emoji="🎨">
      {combos.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #eae6e0"}}>
        <div style={{display:"flex",gap:2}}><Dot c={C[c.a]} size={20}/><Dot c={C[c.b]} size={20}/></div>
        <div><div style={{fontSize:10.5,fontWeight:600,color:"#303030"}}>{c.n}</div><div style={{fontSize:9,color:"#a09880"}}>✦ {c.d}</div></div>
      </div>))}
    </Sec>
    <Sec title={kr?"핏 가이드":"FIT GUIDE"} emoji="📏">
      <T><B>{kr?"상의":"Top"}</B> — XL~XXL. {kr?"어깨 맞고 몸통 레귤러. 길이 벨트 아래 5~8cm.":"Shoulder fit, regular body. Length 5-8cm below belt."}</T>
      <T><B>{kr?"하의":"Bottom"}</B> — 34~36. {kr?"슬림 스트레이트 or 레귤러. 노브레이크~하프브레이크.":"Slim straight or regular. No break to half break."}</T>
      <T><B>{kr?"아우터":"Outer"}</B> — {kr?"히프 덮는 길이 이상. 코트는 무릎 or 무릎 아래.":"Hip-length minimum. Coats at or below knee."}</T>
    </Sec>
    <Sec title={kr?"쇼핑 우선순위":"SHOPPING PRIORITY"} emoji="🛒">
      <T>🥇 {kr?"카멜 울 코트 · 블랙 울 코트 · 다크브라운 첼시부츠 · 버건디 V넥 니트":"Camel wool coat · Black wool coat · Brown chelsea boots · Burgundy V-neck knit"}</T>
      <T>🥈 {kr?"남색 블레이저 · 머스터드 니트 · 블랙 터틀넥 · 블랙 울 슬랙스":"Navy blazer · Mustard knit · Black turtleneck · Black wool trousers"}</T>
      <T>🥉 {kr?"주얼그린 터틀넥 · 올리브 필드자켓 · 버건디 코듀로이 · 가죽자켓":"Jewel green turtleneck · Olive field jacket · Burgundy corduroy · Leather jacket"}</T>
    </Sec>
    <Sec title={kr?"1분 체크리스트":"1-MIN CHECKLIST"} emoji="✅">
      <T>☐ {kr?"핏 괜찮나? (타이트하면 바꾸기)":"Fit OK? (change if tight)"}<br/>
        ☐ {kr?"색 3색 이내? (신발/벨트 포함)":"Max 3 colors? (incl. shoes/belt)"}<br/>
        ☐ {kr?"레이어링 했나? (한 장보다 셔츠+니트)":"Layered? (shirt+knit > single)"}<br/>
        ☐ {kr?"수염 정돈됐나?":"Beard groomed?"}<br/>
        ☐ {kr?"신발이 코디와 맞나?":"Shoes match outfit?"}</T>
    </Sec>
  </div>);
}

/* ── MAIN ── */
const TABS_KR=["프로필","봄","여름","가을","겨울","출근","옷장","가이드"];
const TABS_EN=["Profile","Spring","Summer","Fall","Winter","Work","Closet","Guide"];
const TABS_EMOJI=["👤","🌿","☀️","🍂","❄️","💼","🗄️","📖"];
const TAB_COLORS=["#8B7050","#4A6741","#B85C38","#722F37","#1B3A5C","#3A3A3A","#5C3A1E","#8B7050"];

export default function MensStyleBibleV2() {
  const [tab,setTab] = useState(0);
  const [lang,setLang] = useState("kr");
  const tabs = lang==="kr" ? TABS_KR : TABS_EN;

  const content = () => {
    switch(tab) {
      case 0: return (<ProfileTab lang={lang}/>);
      case 1: return (<SeasonTab data={SP} lang={lang}/>);
      case 2: return (<SeasonTab data={SU} lang={lang}/>);
      case 3: return (<SeasonTab data={FA} lang={lang}/>);
      case 4: return (<SeasonTab data={WI} lang={lang}/>);
      case 5: return (<WorkTab lang={lang}/>);
      case 6: return (<ClosetTab lang={lang}/>);
      case 7: return (<GuideTab lang={lang}/>);
      default: return (<ProfileTab lang={lang}/>);
    }
  };

  return (
    <div style={{fontFamily:"'Karla','Noto Sans KR',sans-serif",maxWidth:480,margin:"0 auto",padding:"20px 14px 40px",background:"linear-gradient(180deg,#FAF8F4 0%,#F4F0EA 100%)",minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Karla:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:10}}>
          {["KR","EN"].map(l=>(<button key={l} onClick={()=>setLang(l.toLowerCase())} style={{
            padding:"4px 12px",border:"none",borderRadius:20,fontSize:9,fontWeight:700,cursor:"pointer",letterSpacing:1.5,
            background:lang===l.toLowerCase()?"linear-gradient(135deg,#303030,#505050)":"transparent",
            color:lang===l.toLowerCase()?"#fff":"#c0b8b0",transition:"all 0.2s",
          }}>{l}</button>))}
        </div>
        <div style={{fontSize:8,fontWeight:600,letterSpacing:4,color:"#8B7050"}}>✦ MEN'S STYLE BIBLE ✦</div>
        <h1 style={{margin:"4px 0",fontSize:28,fontWeight:700,fontFamily:"'Cormorant Garamond',serif"}}>
          <span style={{background:"linear-gradient(135deg,#722F37,#D4A017,#1B5E20)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Roberto</span>
        </h1>
        <div style={{fontSize:9,color:"#a09888"}}>{lang==="kr"?"5장 분석 · 딥 오텀 · 185cm · 95kg":"5 Photos · Deep Autumn · 185cm · 95kg"}</div>
      </div>

      <div style={{display:"flex",gap:2,marginBottom:18,overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:2}}>
        {tabs.map((label,i)=>(<button key={i} onClick={()=>setTab(i)} style={{
          padding:"7px 10px",border:"none",borderRadius:10,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",
          fontSize:9.5,fontWeight:tab===i?700:500,
          background:tab===i?`${TAB_COLORS[i]}18`:"transparent",
          color:tab===i?TAB_COLORS[i]:"#b0a8a0",
          fontFamily:"'Karla','Noto Sans KR',sans-serif",
        }}>
          <span style={{marginRight:3}}>{TABS_EMOJI[i]}</span>{label}
        </button>))}
      </div>

      <div style={{fontFamily:"'Noto Sans KR','Karla',sans-serif"}}>{content()}</div>

      <div style={{marginTop:28,textAlign:"center",fontSize:7,letterSpacing:3,color:"#d0c8c0"}}>
        ✦ DEEP AUTUMN · URBAN BOHEMIAN · BERLIN 2026 ✦
      </div>
    </div>
  );
}