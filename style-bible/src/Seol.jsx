import { useState } from "react";

const C = {
  red:"#D94040",dred:"#A82828",burg:"#7A2E38",pink:"#E8A0A8",dpink:"#C8888C",peach:"#E4B8A8",
  blue:"#4068C0",turq:"#38B0A8",pblu:"#A0C8D8",blk:"#181818",wht:"#FAFAF8",ivory:"#F0E8DC",
  navy:"#203858",char:"#404040",camel:"#C09868",brn:"#7A5838",gold:"#C0A040",cream:"#F8F0E4",denim:"#6888A8",
};
const CN={kr:{red:"레드",dred:"딥레드",burg:"버건디",pink:"핑크",dpink:"더스티로즈",peach:"피치핑크",blue:"로열블루",turq:"터콰이즈",pblu:"파스텔블루",blk:"블랙",wht:"화이트",ivory:"아이보리",navy:"네이비",char:"차콜",camel:"카멜",brn:"브라운",gold:"골드",cream:"크림",denim:"데님"},en:{red:"Red",dred:"Deep Red",burg:"Burgundy",pink:"Pink",dpink:"Dusty Rose",peach:"Peach",blue:"Royal Blue",turq:"Turquoise",pblu:"Pastel Blue",blk:"Black",wht:"White",ivory:"Ivory",navy:"Navy",char:"Charcoal",camel:"Camel",brn:"Brown",gold:"Gold",cream:"Cream",denim:"Denim"}};

function Dot({c,size=16}){const l=parseInt(c.slice(1,3),16)*.299+parseInt(c.slice(3,5),16)*.587+parseInt(c.slice(5,7),16)*.114>180;return (<div style={{width:size,height:size,borderRadius:"50%",background:c,border:l?"1px solid #d4d0cc":"1px solid transparent",flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}/>);}
function Pal({keys,lang}){return (<div style={{display:"flex",flexWrap:"wrap",gap:8,margin:"8px 0 14px"}}>{keys.map(k=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><Dot c={C[k]} size={14}/><span style={{fontSize:9.5,color:"#888"}}>{CN[lang][k]}</span></div>)}</div>);}
function CBar({colors}){return (<div style={{display:"flex",gap:0,marginRight:8,borderRadius:4,overflow:"hidden",boxShadow:"0 1px 2px rgba(0,0,0,0.06)"}}>{colors.map((c,i)=><div key={i} style={{width:18,height:18,background:C[c]}}/>)}</div>);}

function OCard({n,colors,desc,note}){
  return(<div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #f0ece6"}}>
    <span style={{fontSize:9,fontWeight:700,color:"#c0a880",minWidth:18,fontFamily:"'Karla',sans-serif"}}>{String(n).padStart(2,'0')}</span>
    <CBar colors={colors}/>
    <div style={{flex:1}}><div style={{fontSize:10.5,color:"#303030",lineHeight:1.5}}>{desc}</div>
    {note&&<div style={{fontSize:9,color:"#a8a098",marginTop:1}}>✦ {note}</div>}</div>
  </div>);
}

function Sec({title,emoji,children}){
  return(<div style={{marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
      {emoji&&<span style={{fontSize:14}}>{emoji}</span>}
      <div style={{fontSize:9.5,fontWeight:700,letterSpacing:2,color:"#c0a880",fontFamily:"'Karla',sans-serif"}}>{title}</div>
    </div>
    {children}
  </div>);
}

function IRow({name,colors,emoji}){
  return(<div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:8,marginBottom:3,background:"#faf8f5",border:"1px solid #f4f0ea"}}>
    {emoji&&<span style={{fontSize:11}}>{emoji}</span>}
    <div style={{display:"flex",gap:2}}>{colors.map((c,i)=><Dot key={i} c={C[c]} size={12}/>)}</div>
    <span style={{fontSize:10,color:"#404040",flex:1}}>{name}</span>
  </div>);
}

function T({children}){return (<div style={{fontSize:10.5,color:"#404040",lineHeight:1.7,marginBottom:6}}>{children}</div>);}
function B({children}){return (<strong style={{color:"#202020"}}>{children}</strong>);}
function Tag({children,bg="#f8f0e8",color="#a08860"}){return (<span style={{padding:"3px 9px",borderRadius:20,fontSize:8.5,fontWeight:500,background:bg,color,display:"inline-block",margin:"2px 2px"}}>{children}</span>);}

/* ─── PROFILE ─── */
function ProfileTab({lang}){
  const kr=lang==="kr";
  return(<div>
    <Sec title={kr?"퍼스널 컬러":"PERSONAL COLOR"} emoji="🎨">
      <T><B>{kr?"봄 브라이트 (Spring Bright)":"Spring Bright"}</B> · {kr?"웜 뉴트럴 60:40 · 중~고대비":"Warm Neutral 60:40 · Mid-High Contrast"}</T>
      <T>{kr?"선명하고 깊은 색 모두 소화. 탁한 색만 ❌":"Handles vivid & deep colors. Only muddy ❌"}</T>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginTop:12,marginBottom:4}}>🔥 {kr?"파워 컬러":"POWER COLORS"}</div>
      <Pal keys={["red","dred","burg","pink","dpink","peach","blue","turq"]} lang={lang}/>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginBottom:4}}>🪨 {kr?"베이스":"BASE"}</div>
      <Pal keys={["blk","wht","ivory","navy","char","camel"]} lang={lang}/>
      <div style={{fontSize:9,fontWeight:600,color:"#a0a0a0",marginBottom:4}}>✨ {kr?"포인트":"ACCENT"}</div>
      <Pal keys={["pblu","gold","brn","cream"]} lang={lang}/>
    </Sec>
    <Sec title={kr?"체형 & 실루엣":"BODY & SILHOUETTE"} emoji="📐">
      <T><B>{kr?"균형형 · 허리 잘록 · 힙 볼륨":"Balanced · Defined Waist · Hip Volume"}</B></T>
      <T>👉 {kr?"핵심: 허리를 보여줘라":"Core: Show the waist"}</T>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,margin:"8px 0"}}>
        {(kr?["✂️ 피티드 미디","⬆️ 하이웨스트","🔻 V넥/스퀘어넥","🅰️ A라인","🔄 랩","📏 크롭+하이웨","🧅 레이어링"]:["✂️ Fitted Midi","⬆️ High-Waist","🔻 V/Square Neck","🅰️ A-Line","🔄 Wrap","📏 Crop+High-W","🧅 Layering"]).map(t=><Tag key={t}>{t}</Tag>)}
      </div>
    </Sec>
    <Sec title={kr?"두 가지 무드":"TWO MOODS"} emoji="🎭">
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1,padding:14,background:"linear-gradient(135deg,#fdf4f2,#fce8e4)",borderRadius:12,textAlign:"center",border:"1px solid #f0dcd8"}}>
          <div style={{fontSize:20,marginBottom:4}}>🌹</div>
          <div style={{fontSize:11,fontWeight:700,color:"#c07068"}}>{kr?"로맨틱 글램":"Romantic Glam"}</div>
          <div style={{fontSize:8.5,color:"#b08080",marginTop:4}}>{kr?"핑크새틴 · 벨벳 · 플로럴 · 펄 · 힐":"Satin · Velvet · Floral · Pearl · Heels"}</div>
        </div>
        <div style={{flex:1,padding:14,background:"linear-gradient(135deg,#f4f4f8,#eaeaef)",borderRadius:12,textAlign:"center",border:"1px solid #dcdce4"}}>
          <div style={{fontSize:20,marginBottom:4}}>🗡️</div>
          <div style={{fontSize:11,fontWeight:700,color:"#505060"}}>{kr?"구조적 시크":"Structural Chic"}</div>
          <div style={{fontSize:8.5,color:"#808090",marginTop:4}}>{kr?"블랙피티드 · 블레이저 · 조끼 · 넥타이":"Black Fitted · Blazer · Vest · Tie"}</div>
        </div>
      </div>
    </Sec>
    <Sec title={kr?"메이크업":"MAKEUP"} emoji="💄">
      <div style={{display:"flex",gap:16,margin:"8px 0"}}>
        {[{l:"LIP",cs:["#E88070","#D04030","#C02030"]},{l:"EYE",cs:["#F0C8A0","#C08860","#C0A040"]},{l:"CHEEK",cs:["#E88878","#F0C0A0"]}].map(g=>
          <div key={g.l}><div style={{fontSize:8,color:"#aaa",marginBottom:4}}>{g.l}</div><div style={{display:"flex",gap:3}}>{g.cs.map((c,i)=><Dot key={i} c={c} size={16}/>)}</div></div>
        )}
      </div>
    </Sec>
    <Sec title={kr?"헤어":"HAIR"} emoji="💇‍♀️">
      <T><B>{kr?"금발 시그니처":"Blonde Signature"}</B> — {kr?"허니~골든 블론드 · 3~4주 관리":"Honey-Golden · Touch-up 3-4 weeks"}</T>
      <Pal keys={["gold","camel","brn"]} lang={lang}/>
    </Sec>
  </div>);
}

/* ─── SEASONS ─── */
const SP={palette:["pink","peach","ivory","wht","camel","pblu","dpink","blk","red"],
  items:{kr:{outer:[["🧥","피치핑크 카디건",["peach"]],["🧥","카멜 트렌치",["camel"]],["🧥","블랙 블레이저(얇은)",["blk"]],["🧥","아이보리 카디건",["ivory"]]],top:[["👚","아이보리 V넥 니트",["ivory"]],["👚","웜핑크 블라우스",["peach"]],["👚","화이트 린넨 셔츠",["wht"]],["👚","레드 크롭 오프숄더",["red"]],["👚","파스텔블루 탑",["pblu"]],["👚","더스티로즈 니트",["dpink"]]],bottom:[["👖","핑크 니트 스커트",["peach"]],["👖","아이보리 와이드 팬츠",["ivory"]],["👖","데님 하이웨스트",["denim"]],["👖","카멜 A라인 스커트",["camel"]]],dress:[["👗","더스티로즈 플로럴 미디",["dpink"]],["👗","핑크 새틴 슬립",["pink"]],["👗","아이보리 랩 원피스",["ivory"]]],shoe:[["👟","화이트 스니커즈",["wht"]],["👟","베이지 뮬/로퍼",["camel"]],["👟","핑크 스트랩 힐",["pink"]]]},
  en:{outer:[["🧥","Peach-Pink Cardigan",["peach"]],["🧥","Camel Trench",["camel"]],["🧥","Black Blazer (light)",["blk"]],["🧥","Ivory Cardigan",["ivory"]]],top:[["👚","Ivory V-Neck Knit",["ivory"]],["👚","Warm Pink Blouse",["peach"]],["👚","White Linen Shirt",["wht"]],["👚","Red Off-Shoulder",["red"]],["👚","Pastel Blue Top",["pblu"]],["👚","Dusty Rose Knit",["dpink"]]],bottom:[["👖","Pink Knit Skirt",["peach"]],["👖","Ivory Wide Pants",["ivory"]],["👖","Denim High-Waist",["denim"]],["👖","Camel A-Line Skirt",["camel"]]],dress:[["👗","Dusty Rose Floral Midi",["dpink"]],["👗","Pink Satin Slip",["pink"]],["👗","Ivory Wrap Dress",["ivory"]]],shoe:[["👟","White Sneakers",["wht"]],["👟","Beige Mules",["camel"]],["👟","Pink Strap Heels",["pink"]]]}},
  outfits:[
    {c:["peach","wht","peach"],d:{kr:"피치핑크 카디건 + 화이트 셔츠 + 핑크 스커트 + 로퍼",en:"Peach cardigan + white shirt + pink skirt + loafers"},n:{kr:"벚꽃 시그니처",en:"Cherry blossom"}},
    {c:["camel","dpink","dpink"],d:{kr:"카멜 트렌치 + 더스티로즈 미디 드레스",en:"Camel trench + dusty rose dress"},n:{kr:"원피스",en:"One dress"}},
    {c:["ivory","red","ivory"],d:{kr:"아이보리 카디건 + 레드 오프숄더 + 아이보리 와이드",en:"Ivory cardigan + red off-shoulder + ivory wide"},n:{kr:"레드 포인트",en:"Red accent"}},
    {c:["blk","ivory","denim"],d:{kr:"블랙 블레이저 + 아이보리 니트 + 데님",en:"Black blazer + ivory knit + denim"},n:{kr:"시크 캐주얼",en:"Chic casual"}},
    {c:["peach","dpink","ivory"],d:{kr:"피치핑크 카디건 + 더스티로즈 니트 + 아이보리 와이드",en:"Peach cardigan + dusty rose knit + ivory wide"},n:{kr:"웜톤 풀셋",en:"Full warm set"}},
    {c:["camel","wht","camel"],d:{kr:"카멜 트렌치 + 화이트 셔츠 + 카멜 스커트",en:"Camel trench + white shirt + camel skirt"},n:{kr:"봄비",en:"Spring rain"}},
    {c:["blk","dpink","blk"],d:{kr:"블랙 블레이저 + 더스티로즈 드레스",en:"Black blazer + dusty rose dress"},n:{kr:"시크 전환",en:"Chic shift"}},
    {c:["ivory","pblu","denim"],d:{kr:"아이보리 카디건 + 파스텔블루 탑 + 데님",en:"Ivory cardigan + pastel blue top + denim"},n:{kr:"파스텔 레이어",en:"Pastel layer"}},
    {c:["peach","pink","pink"],d:{kr:"피치핑크 카디건 + 핑크 슬립 + 핑크 힐",en:"Peach cardigan + pink slip + pink heels"},n:{kr:"봄 파티",en:"Spring party"}},
    {c:["blk","red","ivory"],d:{kr:"블랙 블레이저 + 레드 오프숄더 + 아이보리 와이드",en:"Black blazer + red off-shoulder + ivory wide"},n:{kr:"밤 외출",en:"Night out"}},
    {c:["camel","ivory","camel"],d:{kr:"카멜 트렌치 + 아이보리 니트 + 카멜 스커트",en:"Camel trench + ivory knit + camel skirt"},n:{kr:"데이트",en:"Date"}},
    {c:["blk","ivory","blk"],d:{kr:"블랙 블레이저 + 아이보리 랩 원피스",en:"Black blazer + ivory wrap dress"},n:{kr:"시크 원피스",en:"Chic dress"}},
    {c:["camel","peach","denim"],d:{kr:"카멜 트렌치 + 웜핑크 블라우스 + 데님 + 스니커즈",en:"Camel trench + warm pink blouse + denim"},n:{kr:"주말",en:"Weekend"}},
    {c:["peach","pblu","ivory"],d:{kr:"피치핑크 카디건 + 파스텔블루 탑 + 아이보리 와이드",en:"Peach cardigan + pastel blue top + ivory wide"},n:{kr:"파스텔 믹스",en:"Pastel mix"}},
    {c:["blk","pink","blk"],d:{kr:"블랙 블레이저 + 핑크 슬립 + 블랙 힐",en:"Black blazer + pink slip + black heels"},n:{kr:"시크 글램",en:"Chic glam"}},
    {c:["camel","wht","ivory"],d:{kr:"카멜 트렌치 + 화이트 셔츠 + 아이보리 와이드",en:"Camel trench + white shirt + ivory wide"},n:{kr:"톤온톤",en:"Tonal"}},
    {c:["ivory","dpink","camel"],d:{kr:"아이보리 카디건 + 더스티로즈 니트 + 카멜 스커트",en:"Ivory cardigan + dusty rose knit + camel skirt"},n:{kr:"웜 믹스",en:"Warm mix"}},
    {c:["peach","wht","denim"],d:{kr:"피치핑크 카디건 + 화이트 셔츠 + 데님",en:"Peach cardigan + white shirt + denim"},n:{kr:"캐주얼 핑크",en:"Casual pink"}},
    {c:["blk","wht","blk"],d:{kr:"블랙 블레이저 + 화이트 셔츠 + 블랙 슬랙스 + 골드",en:"Black blazer + white shirt + black trousers + gold"},n:{kr:"모노톤",en:"Monotone"}},
    {c:["camel","dpink","dpink"],d:{kr:"카멜 트렌치 + 더스티로즈 드레스 + 브라운 부츠",en:"Camel trench + dusty rose dress + brown boots"},n:{kr:"산책",en:"Walk"}},
  ]};

const SU={palette:["red","blue","turq","wht","ivory","pink","dpink","gold","denim"],
  items:{kr:{outer:[["🧥","화이트 린넨 셔츠(오픈)",["wht"]]],top:[["👚","레드 오프숄더",["red"]],["👚","터콰이즈 크롭",["turq"]],["👚","아이보리 V넥 탑",["ivory"]],["👚","파스텔블루 원숄더",["pblu"]],["👚","화이트 탱크",["wht"]],["👚","더스티로즈 블라우스",["dpink"]]],bottom:[["👖","아이보리 린넨 와이드",["ivory"]],["👖","화이트 린넨 스커트",["wht"]],["👖","데님 쇼츠",["denim"]],["👖","레드 미디 스커트",["red"]]],dress:[["👗","더스티로즈 미디",["dpink"]],["👗","핑크 슬립",["pink"]],["👗","터콰이즈 미디",["turq"]],["👗","레드 비키니+사롱",["red"]]],shoe:[["👟","브라운 샌들",["brn"]],["👟","골드 스트랩 샌들",["gold"]],["👟","화이트 스니커즈",["wht"]],["👟","핑크 힐",["pink"]]]},
  en:{outer:[["🧥","White Linen Shirt (open)",["wht"]]],top:[["👚","Red Off-Shoulder",["red"]],["👚","Turquoise Crop",["turq"]],["👚","Ivory V-Neck",["ivory"]],["👚","Pastel Blue One-Shoulder",["pblu"]],["👚","White Tank",["wht"]],["👚","Dusty Rose Blouse",["dpink"]]],bottom:[["👖","Ivory Linen Wide",["ivory"]],["👖","White Linen Skirt",["wht"]],["👖","Denim Shorts",["denim"]],["👖","Red Midi Skirt",["red"]]],dress:[["👗","Dusty Rose Midi",["dpink"]],["👗","Pink Slip",["pink"]],["👗","Turquoise Midi",["turq"]],["👗","Red Bikini+Sarong",["red"]]],shoe:[["👟","Brown Sandals",["brn"]],["👟","Gold Strap Sandals",["gold"]],["👟","White Sneakers",["wht"]],["👟","Pink Heels",["pink"]]]}},
  outfits:[
    {c:["red","red"],d:{kr:"레드 비키니 + 사롱 + 밀짚모자",en:"Red bikini + sarong + straw hat"},n:{kr:"비치",en:"Beach"}},
    {c:["wht","red","ivory"],d:{kr:"화이트 셔츠(오픈) + 레드 오프숄더 + 아이보리 와이드",en:"White shirt + red off-shoulder + ivory wide"},n:{kr:"여행",en:"Travel"}},
    {c:["turq","wht"],d:{kr:"터콰이즈 크롭 + 화이트 스커트 + 골드 악세",en:"Turquoise crop + white skirt + gold acc."},n:{kr:"선명 여행",en:"Vivid travel"}},
    {c:["ivory","dpink"],d:{kr:"아이보리 탑 + 더스티로즈 스커트 + 골드 샌들",en:"Ivory top + dusty rose skirt + gold sandals"},n:{kr:"데이트",en:"Date"}},
    {c:["dpink","dpink"],d:{kr:"더스티로즈 미디 드레스 + 브라운 샌들",en:"Dusty rose midi dress + brown sandals"},n:{kr:"유럽 마을",en:"European village"}},
    {c:["pink","pink"],d:{kr:"핑크 슬립 + 핑크 힐 + 골드 체인",en:"Pink slip + pink heels + gold chain"},n:{kr:"파티",en:"Party"}},
    {c:["pblu","denim"],d:{kr:"파스텔블루 원숄더 + 데님 쇼츠 + 스니커즈",en:"Pastel blue + denim shorts + sneakers"},n:{kr:"캐주얼",en:"Casual"}},
    {c:["wht","red"],d:{kr:"화이트 탱크 + 레드 미디 스커트 + 스니커즈",en:"White tank + red midi skirt + sneakers"},n:{kr:"도시 산책",en:"City walk"}},
    {c:["dpink","ivory"],d:{kr:"더스티로즈 블라우스 + 아이보리 와이드 + 골드 샌들",en:"Dusty rose blouse + ivory wide + gold sandals"},n:{kr:"나들이",en:"Outing"}},
    {c:["turq","turq"],d:{kr:"터콰이즈 미디 드레스 + 브라운 샌들",en:"Turquoise midi dress + brown sandals"},n:{kr:"원피스",en:"One dress"}},
    {c:["red","denim"],d:{kr:"레드 오프숄더 + 데님 쇼츠 + 스니커즈",en:"Red off-shoulder + denim shorts + sneakers"},n:{kr:"캐주얼 레드",en:"Casual red"}},
    {c:["ivory","wht"],d:{kr:"아이보리 탑 + 화이트 스커트 + 골드 풀셋",en:"Ivory top + white skirt + full gold"},n:{kr:"올 화이트",en:"All white"}},
    {c:["wht","pink","wht"],d:{kr:"화이트 셔츠 + 핑크 슬립 + 샌들",en:"White shirt + pink slip + sandals"},n:{kr:"비치→저녁",en:"Beach→dinner"}},
    {c:["dpink","denim"],d:{kr:"더스티로즈 블라우스 + 데님 쇼츠",en:"Dusty rose blouse + denim shorts"},n:{kr:"주말",en:"Weekend"}},
    {c:["dpink","dpink"],d:{kr:"더스티로즈 드레스 + 골드 샌들 + 펄",en:"Dusty rose dress + gold sandals + pearl"},n:{kr:"저녁",en:"Dinner"}},
    {c:["wht","turq","denim"],d:{kr:"화이트 셔츠 + 터콰이즈 크롭 + 데님 쇼츠",en:"White shirt + turquoise crop + denim shorts"},n:{kr:"레이어",en:"Layered"}},
    {c:["pblu","ivory"],d:{kr:"파스텔블루 원숄더 + 아이보리 와이드",en:"Pastel blue + ivory wide pants"},n:{kr:"파스텔 여행",en:"Pastel travel"}},
    {c:["wht","dpink"],d:{kr:"화이트 탱크 + 더스티로즈 스커트 + 브라운 샌들",en:"White tank + dusty rose skirt + brown sandals"},n:{kr:"컬러 매치",en:"Color match"}},
    {c:["turq","denim"],d:{kr:"터콰이즈 크롭 + 데님 쇼츠 + 스니커즈",en:"Turquoise crop + denim shorts + sneakers"},n:{kr:"터콰이즈",en:"Turquoise"}},
    {c:["red","ivory"],d:{kr:"레드 오프숄더 + 아이보리 와이드 + 골드",en:"Red off-shoulder + ivory wide + gold"},n:{kr:"밤 외출",en:"Night out"}},
  ]};

const FA={palette:["burg","dred","camel","brn","blk","ivory","dpink","pink","peach"],
  items:{kr:{outer:[["🧥","블랙 블레이저",["blk"]],["🧥","카멜 트렌치/코트",["camel"]],["🧥","피치핑크 카디건",["peach"]],["🧥","블랙 가죽 자켓",["blk"]]],top:[["👚","아이보리 터틀넥",["ivory"]],["👚","딥레드 V넥 니트",["dred"]],["👚","더스티로즈 니트",["dpink"]],["👚","파스텔핑크 니트",["pink"]],["👚","화이트 셔츠",["wht"]],["👚","아이보리 블라우스",["ivory"]]],bottom:[["👖","블랙 슬랙스",["blk"]],["👖","카멜 울 스커트",["camel"]],["👖","블랙 미디 스커트",["blk"]],["👖","카멜 와이드",["camel"]],["👖","데님",["denim"]]],dress:[["👗","버건디 벨벳 미디",["burg"]],["👗","더스티로즈 미디",["dpink"]],["👗","블랙 피티드 미디",["blk"]]],shoe:[["👟","블랙 앵클부츠",["blk"]],["👟","블랙 로퍼",["blk"]],["👟","브라운 앵클부츠",["brn"]],["👟","블랙 힐",["blk"]]]},
  en:{outer:[["🧥","Black Blazer",["blk"]],["🧥","Camel Trench/Coat",["camel"]],["🧥","Peach-Pink Cardigan",["peach"]],["🧥","Black Leather Jacket",["blk"]]],top:[["👚","Ivory Turtleneck",["ivory"]],["👚","Deep Red V-Neck",["dred"]],["👚","Dusty Rose Knit",["dpink"]],["👚","Pastel Pink Knit",["pink"]],["👚","White Shirt",["wht"]],["👚","Ivory Blouse",["ivory"]]],bottom:[["👖","Black Trousers",["blk"]],["👖","Camel Wool Skirt",["camel"]],["👖","Black Midi Skirt",["blk"]],["👖","Camel Wide Pants",["camel"]],["👖","Denim",["denim"]]],dress:[["👗","Burgundy Velvet Midi",["burg"]],["👗","Dusty Rose Midi",["dpink"]],["👗","Black Fitted Midi",["blk"]]],shoe:[["👟","Black Ankle Boots",["blk"]],["👟","Black Loafers",["blk"]],["👟","Brown Ankle Boots",["brn"]],["👟","Black Heels",["blk"]]]}},
  outfits:[
    {c:["blk","burg","burg"],d:{kr:"블랙 블레이저 + 버건디 벨벳 드레스 + 블랙 힐",en:"Black blazer + burgundy velvet dress + heels"},n:{kr:"킬링룩",en:"Killer look"}},
    {c:["camel","ivory","camel"],d:{kr:"카멜 코트 + 아이보리 터틀넥 + 카멜 스커트 + 부츠",en:"Camel coat + ivory turtleneck + camel skirt + boots"},n:{kr:"기본",en:"Basic"}},
    {c:["blk","dpink","blk"],d:{kr:"블랙 블레이저 + 더스티로즈 니트 + 블랙 슬랙스",en:"Black blazer + dusty rose knit + black trousers"},n:{kr:"포인트",en:"Accent"}},
    {c:["peach","wht","denim"],d:{kr:"피치핑크 카디건 + 화이트 이너 + 데님",en:"Peach cardigan + white inner + denim"},n:{kr:"초가을",en:"Early fall"}},
    {c:["blk","dred","blk"],d:{kr:"블랙 자켓 + 딥레드 니트 + 블랙 스커트 + 부츠",en:"Black jacket + deep red knit + black skirt + boots"},n:{kr:"레드 시크",en:"Red chic"}},
    {c:["camel","ivory","camel"],d:{kr:"카멜 코트 + 아이보리 블라우스 + 카멜 와이드 + 벨트",en:"Camel coat + ivory blouse + camel wide + belt"},n:{kr:"톤온톤",en:"Tonal"}},
    {c:["blk","pink","blk"],d:{kr:"블랙 블레이저 + 파스텔핑크 니트 + 블랙 슬랙스",en:"Black blazer + pastel pink knit + black trousers"},n:{kr:"핑크+블랙",en:"Pink+black"}},
    {c:["blk","wht","denim"],d:{kr:"블랙 조끼 + 화이트 셔츠 + 데님 + 로퍼",en:"Black vest + white shirt + denim + loafers"},n:{kr:"구조적",en:"Structural"}},
    {c:["camel","dred","camel"],d:{kr:"카멜 코트 + 딥레드 니트 + 카멜 스커트",en:"Camel coat + deep red knit + camel skirt"},n:{kr:"레드+카멜",en:"Red+camel"}},
    {c:["blk","blk","blk"],d:{kr:"블랙 가죽자켓 + 블랙 드레스 + 부츠 + 골드",en:"Black leather jacket + black dress + boots + gold"},n:{kr:"올블랙",en:"All black"}},
    {c:["blk","ivory","blk"],d:{kr:"블랙 블레이저 + 아이보리 터틀넥 + 블랙 슬랙스",en:"Black blazer + ivory turtleneck + black trousers"},n:{kr:"모노톤",en:"Monotone"}},
    {c:["camel","dpink","dpink"],d:{kr:"카멜 트렌치 + 더스티로즈 드레스 + 브라운 부츠",en:"Camel trench + dusty rose dress + brown boots"},n:{kr:"산책",en:"Walk"}},
    {c:["blk","burg","blk"],d:{kr:"버건디 드레스 + 골드 풀셋 + 힐",en:"Burgundy dress + full gold + heels"},n:{kr:"파티",en:"Party"}},
    {c:["blk","wht","blk"],d:{kr:"블랙 블레이저 + 화이트 셔츠 + 블랙 스커트",en:"Black blazer + white shirt + black skirt"},n:{kr:"시크 스커트",en:"Chic skirt"}},
    {c:["camel","pink","camel"],d:{kr:"카멜 코트 + 파스텔핑크 니트 + 카멜 스커트 + 부츠",en:"Camel coat + pastel pink knit + camel skirt"},n:{kr:"핑크+카멜",en:"Pink+camel"}},
    {c:["peach","ivory","denim"],d:{kr:"피치핑크 카디건 + 아이보리 터틀넥 + 데님",en:"Peach cardigan + ivory turtleneck + denim"},n:{kr:"카페",en:"Café"}},
    {c:["blk","dred","blk"],d:{kr:"블랙 가죽자켓 + 딥레드 니트 + 블랙 슬랙스",en:"Black leather jacket + deep red knit + black trousers"},n:{kr:"시크 레드",en:"Chic red"}},
    {c:["blk","ivory","blk"],d:{kr:"블랙 블레이저 + 아이보리 블라우스 + 블랙 슬랙스 + 레드 토트",en:"Black blazer + ivory blouse + trousers + red tote"},n:{kr:"모노+레드백",en:"Mono+red bag"}},
    {c:["camel","dpink","camel"],d:{kr:"카멜 코트 + 더스티로즈 니트 + 카멜 와이드",en:"Camel coat + dusty rose knit + camel wide"},n:{kr:"웜+로즈",en:"Warm+rose"}},
    {c:["blk","dpink","blk"],d:{kr:"블랙 블레이저 + 더스티로즈 드레스 + 부츠",en:"Black blazer + dusty rose dress + boots"},n:{kr:"저녁",en:"Evening"}},
  ]};

const WI={palette:["blk","camel","ivory","dred","burg","pink","pblu","peach","dpink"],
  items:{kr:{outer:[["🧥","카멜 울 코트",["camel"]],["🧥","블랙 울 롱코트",["blk"]],["🧥","블랙 블레이저(울)",["blk"]],["🧥","블랙 조끼(울)",["blk"]]],top:[["👚","아이보리 터틀넥(두꺼운)",["ivory"]],["👚","딥레드 V넥 니트",["dred"]],["👚","더스티로즈 니트",["dpink"]],["👚","파스텔핑크 니트",["pink"]],["👚","피치핑크 캐시미어",["peach"]],["👚","화이트 셔츠",["wht"]]],bottom:[["👖","블랙 울 슬랙스",["blk"]],["👖","카멜 울 와이드",["camel"]],["👖","아이보리 울 팬츠",["ivory"]],["👖","카멜 울 스커트",["camel"]],["👖","블랙 미디 스커트",["blk"]]],dress:[["👗","버건디 벨벳 미디",["burg"]],["👗","블랙 피티드 미디",["blk"]]],shoe:[["👟","블랙 앵클부츠",["blk"]],["👟","블랙 방한부츠",["blk"]],["👟","블랙 힐",["blk"]]]},
  en:{outer:[["🧥","Camel Wool Coat",["camel"]],["🧥","Black Wool Long Coat",["blk"]],["🧥","Black Wool Blazer",["blk"]],["🧥","Black Wool Vest",["blk"]]],top:[["👚","Ivory Turtleneck (heavy)",["ivory"]],["👚","Deep Red V-Neck",["dred"]],["👚","Dusty Rose Knit",["dpink"]],["👚","Pastel Pink Knit",["pink"]],["👚","Peach Cashmere",["peach"]],["👚","White Shirt",["wht"]]],bottom:[["👖","Black Wool Trousers",["blk"]],["👖","Camel Wool Wide",["camel"]],["👖","Ivory Wool Pants",["ivory"]],["👖","Camel Wool Skirt",["camel"]],["👖","Black Midi Skirt",["blk"]]],dress:[["👗","Burgundy Velvet Midi",["burg"]],["👗","Black Fitted Midi",["blk"]]],shoe:[["👟","Black Ankle Boots",["blk"]],["👟","Black Winter Boots",["blk"]],["👟","Black Heels",["blk"]]]}},
  outfits:[
    {c:["camel","ivory","camel"],d:{kr:"카멜 코트 + 아이보리 터틀넥 + 카멜 와이드 + 아이보리 머플러",en:"Camel coat + ivory turtleneck + camel wide + ivory scarf"},n:{kr:"최고 세련",en:"Ultimate chic"}},
    {c:["blk","dred","blk"],d:{kr:"블랙 코트 + 딥레드 니트 + 블랙 슬랙스 + 레드 헤어밴드",en:"Black coat + deep red knit + black trousers + red headband"},n:{kr:"크리스마스",en:"Christmas"}},
    {c:["blk","burg","blk"],d:{kr:"블랙 블레이저 + 버건디 벨벳 + 타이츠 + 힐",en:"Black blazer + burgundy velvet + tights + heels"},n:{kr:"파티",en:"Party"}},
    {c:["blk","dpink","blk"],d:{kr:"블랙 코트 + 더스티로즈 니트 + 블랙 슬랙스 + 파스텔블루 머플러",en:"Black coat + dusty rose knit + trousers + blue scarf"},n:{kr:"더블 포인트",en:"Double point"}},
    {c:["camel","pink","camel"],d:{kr:"카멜 코트 + 파스텔핑크 니트 + 카멜 스커트 + 타이츠",en:"Camel coat + pastel pink knit + camel skirt + tights"},n:{kr:"핑크+카멜",en:"Pink+camel"}},
    {c:["blk","ivory","blk"],d:{kr:"블랙 코트 + 아이보리 터틀넥 + 블랙 스커트 + 부츠",en:"Black coat + ivory turtleneck + black skirt + boots"},n:{kr:"모노톤",en:"Monotone"}},
    {c:["camel","dred","camel"],d:{kr:"카멜 코트 + 딥레드 니트 + 카멜 와이드",en:"Camel coat + deep red knit + camel wide pants"},n:{kr:"레드+카멜",en:"Red+camel"}},
    {c:["blk","wht","blk"],d:{kr:"블랙 코트 + 블랙 조끼 + 화이트 셔츠 + 블랙 슬랙스",en:"Black coat + vest + white shirt + black trousers"},n:{kr:"구조적 시크",en:"Structural chic"}},
    {c:["camel","peach","ivory"],d:{kr:"카멜 코트 + 피치핑크 캐시미어 + 아이보리 울팬츠",en:"Camel coat + peach cashmere + ivory pants"},n:{kr:"소프트",en:"Soft"}},
    {c:["blk","ivory","denim"],d:{kr:"블랙 코트 + 아이보리 터틀넥 + 데님 + 레드 토트",en:"Black coat + ivory turtleneck + denim + red tote"},n:{kr:"주말",en:"Weekend"}},
    {c:["camel","dpink","camel"],d:{kr:"카멜 코트 + 더스티로즈 니트 + 카멜 스커트 + 타이츠",en:"Camel coat + dusty rose knit + camel skirt + tights"},n:{kr:"로즈+웜",en:"Rose+warm"}},
    {c:["blk","burg","blk"],d:{kr:"블랙 코트 + 버건디 벨벳 + 타이츠 + 부츠",en:"Black coat + burgundy dress + tights + boots"},n:{kr:"벨벳 시크",en:"Velvet chic"}},
    {c:["blk","blk","blk"],d:{kr:"블랙 블레이저 + 블랙 드레스 + 타이츠 + 힐 + 골드",en:"Black blazer + black dress + heels + full gold"},n:{kr:"올블랙 글램",en:"All-black glam"}},
    {c:["blk","pink","blk"],d:{kr:"블랙 코트 + 파스텔핑크 니트 + 블랙 슬랙스 + 파스텔블루 머플러",en:"Black coat + pastel pink + trousers + blue scarf"},n:{kr:"파스텔",en:"Pastel"}},
    {c:["blk","ivory","blk"],d:{kr:"블랙 코트+블레이저 + 아이보리 터틀넥 + 블랙 슬랙스 + 레드 머플러",en:"Black coat + ivory turtleneck + trousers + red scarf"},n:{kr:"시크+레드",en:"Chic+red"}},
    {c:["blk","dred","blk"],d:{kr:"블랙 코트 + 딥레드 니트 + 블랙 스커트 + 타이츠 + 부츠",en:"Black coat + deep red + black skirt + boots"},n:{kr:"레드+올블랙",en:"Red+all-black"}},
    {c:["blk","peach","camel"],d:{kr:"블랙 코트 + 피치핑크 캐시미어 + 카멜 울팬츠 + 아이보리 머플러",en:"Black coat + peach cashmere + camel pants + ivory scarf"},n:{kr:"부드러운 믹스",en:"Soft mix"}},
    {c:["camel","wht","camel"],d:{kr:"카멜 코트 + 블랙 조끼 + 화이트 셔츠 + 카멜 팬츠",en:"Camel coat + vest + white shirt + camel pants"},n:{kr:"시크+웜",en:"Chic+warm"}},
    {c:["blk","ivory","camel"],d:{kr:"블랙 코트 + 아이보리 터틀넥 + 카멜 스커트 + 타이츠",en:"Black coat + ivory turtleneck + camel skirt + tights"},n:{kr:"시크 카멜",en:"Chic camel"}},
    {c:["camel","dpink","ivory"],d:{kr:"카멜 코트 + 더스티로즈 니트 + 아이보리 울팬츠 + 골드",en:"Camel coat + dusty rose knit + ivory pants + gold"},n:{kr:"로즈+웜",en:"Rose+warm"}},
  ]};

function SeasonTab({data,lang}){
  const kr=lang==="kr";
  const cats=kr?["🧥 아우터","👚 상의","👖 하의","👗 원피스","👟 신발"]:["🧥 OUTER","👚 TOP","👖 BOTTOM","👗 DRESS","👟 SHOES"];
  const ck=["outer","top","bottom","dress","shoe"];
  return(<div>
    <Sec title={kr?"시즌 팔레트":"SEASON PALETTE"} emoji="🎨"><Pal keys={data.palette} lang={lang}/></Sec>
    <Sec title={kr?"아이템":"KEY ITEMS"} emoji="🏷️">
      {ck.map((k,ci)=>data.items[lang][k]?(<div key={k}><div style={{fontSize:9,fontWeight:700,color:"#b0a090",marginTop:ci>0?10:0,marginBottom:4}}>{cats[ci]}</div>{data.items[lang][k].map(([e,n,c],i)=><IRow key={i} emoji={e} name={n} colors={c}/>)}</div>):null)}
    </Sec>
    <Sec title={kr?"20벌 코디":"20 OUTFITS"} emoji="👗">
      {data.outfits.map((o,i)=><OCard key={i} n={i+1} colors={o.c} desc={o.d[lang]} note={o.n[lang]}/>)}
    </Sec>
  </div>);
}

/* ─── WORK ─── */
function WorkTab({lang}){
  const kr=lang==="kr";
  const d={ss:[
    {c:["navy","wht","blk"],d:kr?"화이트 셔츠 + 블랙 피나포어 + 로퍼":"White shirt + black pinafore + loafers",n:kr?"시그니처":"Signature"},
    {c:["blk","blk","blk"],d:kr?"블랙 드레스 + 골드 목걸이 + 힐":"Black dress + gold necklace + heels",n:kr?"미팅":"Meeting"},
    {c:["navy","wht","blk"],d:kr?"화이트 셔츠 + 블랙 슬랙스 + 네이비 블레이저":"White shirt + black trousers + navy blazer",n:kr?"클래식":"Classic"},
    {c:["blk","ivory","navy"],d:kr?"아이보리 블라우스 + 네이비 슬랙스 + 블랙 블레이저":"Ivory blouse + navy trousers + black blazer",n:kr?"변형":"Variation"},
    {c:["wht","char"],d:kr?"화이트 V넥 + 차콜 슬랙스":"White V-neck + charcoal trousers",n:kr?"심플":"Simple"},
    {c:["blk","wht","blk"],d:kr?"화이트 셔츠 + 블랙 넥타이(루즈) + 블랙 슬랙스 + 블레이저":"White shirt + black tie (loose) + trousers + blazer",n:kr?"넥타이 시크":"Tie chic"},
  ],fw:[
    {c:["blk","wht","blk"],d:kr?"화이트 셔츠 + 블랙 피나포어 + 타이츠 + 부츠 + 코트":"White shirt + pinafore + tights + boots + coat",n:kr?"시그니처":"Signature"},
    {c:["blk","blk","blk"],d:kr?"블랙 드레스 + 블레이저 + 타이츠 + 힐":"Black dress + blazer + tights + heels",n:kr?"미팅":"Meeting"},
    {c:["navy","ivory","blk"],d:kr?"아이보리 터틀넥 + 블랙 슬랙스 + 네이비 블레이저 + 코트":"Ivory turtleneck + trousers + navy blazer + coat",n:kr?"클래식":"Classic"},
    {c:["camel","ivory","char"],d:kr?"아이보리 터틀넥 + 차콜 슬랙스 + 카멜 코트":"Ivory turtleneck + charcoal trousers + camel coat",n:kr?"웜 출근":"Warm commute"},
    {c:["blk","wht","blk"],d:kr?"화이트 셔츠 + 블랙 넥타이 + 조끼 + 슬랙스 + 코트":"White shirt + tie + vest + trousers + coat",n:kr?"넥타이 풀":"Full tie"},
    {c:["camel","ivory","blk"],d:kr?"아이보리 블라우스 + 블랙 슬랙스 + 네이비 블레이저 + 카멜 코트":"Ivory blouse + trousers + blazer + camel coat",n:kr?"카멜 마무리":"Camel finish"},
  ]};
  return(<div>
    <Sec title={kr?"출근 팔레트":"WORK PALETTE"} emoji="🎨"><Pal keys={["blk","wht","navy","char","ivory"]} lang={lang}/></Sec>
    <Sec title={kr?"☀️ 봄·여름":"☀️ SPRING·SUMMER"} emoji="">{d.ss.map((o,i)=><OCard key={i} n={i+1} colors={o.c} desc={o.d} note={o.n}/>)}</Sec>
    <Sec title={kr?"❄️ 가을·겨울":"❄️ FALL·WINTER"} emoji="">{d.fw.map((o,i)=><OCard key={i} n={i+1} colors={o.c} desc={o.d} note={o.n}/>)}</Sec>
  </div>);
}

/* ─── EXERCISE ─── */
function ExTab({lang}){
  const kr=lang==="kr";
  const act=[
    {emoji:"⛸️",title:kr?"피겨 스케이팅":"FIGURE SKATING",pal:["red","pink","blk"],
      items:kr?["🔴 레드 피티드 긴팔 ×2","🩷 핑크 피티드 긴팔 ×1","⬛ 블랙 스케이팅 레깅스 ×2","🩷 핑크 경량 집업 ×1","⬛ 블랙 장갑","🩷 핑크 플리스 집업 (겨울)","⬛ 블랙 넥워머 (겨울)"]
        :["🔴 Red fitted long-sleeve ×2","🩷 Pink fitted long-sleeve ×1","⬛ Black skating leggings ×2","🩷 Pink light zip-up ×1","⬛ Black gloves","🩷 Pink fleece zip-up (winter)","⬛ Black neck warmer (winter)"]},
    {emoji:"🩰",title:kr?"발레 / 댄스":"BALLET / DANCE",pal:["pink","blk","peach","ivory"],
      items:kr?["🩷 핑크 레오타드 ×2","⬛ 블랙 레오타드 ×1","🩷 핑크 발레 타이츠 ×2","⬛ 블랙 발레 타이츠 ×2 (겨울용 두꺼운)","🩷 핑크 쉬폰 랩스커트","🍑 피치핑크 니트 랩카디건 (겨울)","🤍 아이보리 니트 레그워머 (겨울)"]
        :["🩷 Pink leotard ×2","⬛ Black leotard ×1","🩷 Pink ballet tights ×2","⬛ Black ballet tights ×2 (heavy, winter)","🩷 Pink chiffon wrap skirt","🍑 Peach knit wrap cardigan (winter)","🤍 Ivory knit leg warmers (winter)"]},
    {emoji:"💪",title:kr?"일반 운동":"GENERAL GYM",pal:["blk","red","pink","pblu"],
      items:kr?["⬛ 블랙 레깅스 ×2","🔴 레드 레깅스 ×1 (봄여름)","🩷 핑크 브라탑 ×2","⬛ 블랙 브라탑 ×1","💙 파스텔블루 탱크탑 (봄여름)","🔴 레드 긴팔 운동복 (가을겨울)","⬛ 블랙 집업 자켓 (가을겨울)"]
        :["⬛ Black leggings ×2","🔴 Red leggings ×1 (S/S)","🩷 Pink sports bra ×2","⬛ Black sports bra ×1","💙 Pastel blue tank (S/S)","🔴 Red long-sleeve (F/W)","⬛ Black zip-up (F/W)"]},
  ];
  return(<div>{act.map(a=>(
    <Sec key={a.title} title={a.title} emoji={a.emoji}>
      <Pal keys={a.pal} lang={lang}/>
      {a.items.map((it,i)=><div key={i} style={{fontSize:10.5,color:"#404040",padding:"4px 0",borderBottom:"1px solid #f4f0ea"}}>{it}</div>)}
    </Sec>
  ))}</div>);
}

/* ─── CLOSET ─── */
function ClosetTab({lang}){
  const kr=lang==="kr";
  const groups=[
    {emoji:"🧥",title:kr?"아우터":"OUTERWEAR",items:[
      [kr?"카멜 트렌치코트":"Camel Trench Coat",["camel"]],[kr?"카멜 울 코트 (겨울)":"Camel Wool Coat (winter)",["camel"]],
      [kr?"블랙 울 롱코트":"Black Wool Long Coat",["blk"]],[kr?"블랙 블레이저 (얇은+울)":"Black Blazer (light + wool)",["blk"]],
      [kr?"블랙 가죽 자켓":"Black Leather Jacket",["blk"]],[kr?"블랙 울 조끼":"Black Wool Vest",["blk"]],
      [kr?"피치핑크 카디건":"Peach-Pink Cardigan",["peach"]],[kr?"아이보리 카디건":"Ivory Cardigan",["ivory"]],
    ]},
    {emoji:"👚",title:kr?"상의":"TOPS",items:[
      [kr?"아이보리 V넥 니트":"Ivory V-Neck Knit",["ivory"]],[kr?"아이보리 터틀넥 (두꺼운)":"Ivory Turtleneck (heavy)",["ivory"]],
      [kr?"아이보리 블라우스":"Ivory Blouse",["ivory"]],[kr?"화이트 린넨 셔츠":"White Linen Shirt",["wht"]],
      [kr?"화이트 셔츠 (출근용)":"White Shirt (work)",["wht"]],[kr?"웜핑크 블라우스":"Warm Pink Blouse",["peach"]],
      [kr?"더스티로즈 니트":"Dusty Rose Knit",["dpink"]],[kr?"파스텔핑크 니트":"Pastel Pink Knit",["pink"]],
      [kr?"딥레드 V넥 니트":"Deep Red V-Neck Knit",["dred"]],[kr?"레드 오프숄더 크롭":"Red Off-Shoulder Crop",["red"]],
      [kr?"파스텔블루 탑":"Pastel Blue Top",["pblu"]],[kr?"터콰이즈 크롭":"Turquoise Crop",["turq"]],
      [kr?"화이트 탱크":"White Tank",["wht"]],[kr?"피치핑크 캐시미어 (겨울)":"Peach Cashmere (winter)",["peach"]],
    ]},
    {emoji:"👖",title:kr?"하의":"BOTTOMS",items:[
      [kr?"블랙 슬랙스 (출근겸용)":"Black Trousers (work)",["blk"]],[kr?"블랙 미디 스커트":"Black Midi Skirt",["blk"]],
      [kr?"카멜 A라인 스커트":"Camel A-Line Skirt",["camel"]],[kr?"카멜 울 와이드":"Camel Wool Wide Pants",["camel"]],
      [kr?"아이보리 와이드 팬츠":"Ivory Wide Pants",["ivory"]],[kr?"아이보리 울 팬츠 (겨울)":"Ivory Wool Pants (winter)",["ivory"]],
      [kr?"데님 하이웨스트":"Denim High-Waist",["denim"]],[kr?"데님 쇼츠 (여름)":"Denim Shorts (summer)",["denim"]],
      [kr?"핑크 니트 스커트":"Pink Knit Skirt",["peach"]],[kr?"레드 미디 스커트 (여름)":"Red Midi Skirt (summer)",["red"]],
      [kr?"화이트 린넨 스커트 (여름)":"White Linen Skirt (summer)",["wht"]],
    ]},
    {emoji:"👗",title:kr?"원피스":"DRESSES",items:[
      [kr?"버건디 벨벳 미디":"Burgundy Velvet Midi",["burg"]],[kr?"블랙 피티드 미디":"Black Fitted Midi",["blk"]],
      [kr?"블랙 피나포어 (출근)":"Black Pinafore (work)",["blk"]],[kr?"더스티로즈 플로럴 미디":"Dusty Rose Floral Midi",["dpink"]],
      [kr?"핑크 새틴 슬립":"Pink Satin Slip",["pink"]],[kr?"아이보리 랩 원피스":"Ivory Wrap Dress",["ivory"]],
      [kr?"터콰이즈 미디 (여름)":"Turquoise Midi (summer)",["turq"]],[kr?"레드 비키니+사롱 (여름)":"Red Bikini+Sarong (summer)",["red"]],
    ]},
    {emoji:"👟",title:kr?"신발":"SHOES",items:[
      [kr?"화이트 스니커즈":"White Sneakers",["wht"]],[kr?"베이지 뮬/로퍼":"Beige Mules/Loafers",["camel"]],
      [kr?"블랙 로퍼":"Black Loafers",["blk"]],[kr?"블랙 앵클부츠":"Black Ankle Boots",["blk"]],
      [kr?"브라운 앵클부츠":"Brown Ankle Boots",["brn"]],[kr?"블랙 힐":"Black Heels",["blk"]],
      [kr?"핑크 스트랩 힐":"Pink Strap Heels",["pink"]],[kr?"블랙 방한부츠":"Black Winter Boots",["blk"]],
      [kr?"브라운 샌들 (여름)":"Brown Sandals (summer)",["brn"]],[kr?"골드 스트랩 샌들 (여름)":"Gold Strap Sandals (summer)",["gold"]],
    ]},
    {emoji:"👜",title:kr?"가방":"BAGS",items:[
      [kr?"레드 토트백":"Red Tote",["red"]],[kr?"베이지 숄더백":"Beige Shoulder Bag",["camel"]],
      [kr?"블랙 크로스백":"Black Crossbody",["blk"]],[kr?"크림 퍼 크로스백 (겨울)":"Cream Fur Crossbody (winter)",["cream"]],
      [kr?"내추럴 캔버스 토트":"Natural Canvas Tote",["ivory"]],
    ]},
    {emoji:"✨",title:kr?"주얼리":"JEWELRY",items:[
      [kr?"골드 체인 목걸이 (얇은)":"Gold Chain Necklace (thin)",["gold"]],[kr?"펄 목걸이/초커":"Pearl Necklace/Choker",["cream"]],
      [kr?"골드 레이어드 목걸이":"Gold Layered Necklace",["gold"]],[kr?"골드 뱅글 팔찌":"Gold Bangle",["gold"]],
      [kr?"골드 미니멀 반지 ×2~3":"Gold Minimal Rings ×2-3",["gold"]],[kr?"블랙 가죽 벨트 (골드 버클)":"Black Belt (gold buckle)",["blk"]],
      [kr?"브라운 가죽 벨트":"Brown Leather Belt",["brn"]],[kr?"골드 바디체인 (여름)":"Gold Body Chain (summer)",["gold"]],
    ]},
    {emoji:"🧣",title:kr?"방한 & 헤어":"WINTER ACC. & HAIR",items:[
      [kr?"아이보리 캐시미어 머플러":"Ivory Cashmere Scarf",["ivory"]],[kr?"레드 울 머플러":"Red Wool Scarf",["red"]],
      [kr?"파스텔블루 머플러":"Pastel Blue Scarf",["pblu"]],[kr?"카멜 울 대형 스카프":"Camel Wool Large Scarf",["camel"]],
      [kr?"블랙 가죽 장갑":"Black Leather Gloves",["blk"]],[kr?"카멜 울 장갑":"Camel Wool Gloves",["camel"]],
      [kr?"핑크 퍼 귀마개":"Pink Fur Ear Muffs",["pink"]],[kr?"아이보리 니트 귀마개":"Ivory Knit Ear Muffs",["ivory"]],
      [kr?"카멜 울 베레":"Camel Wool Beret",["camel"]],[kr?"블랙 울 비니":"Black Wool Beanie",["blk"]],
      [kr?"레드 니트 비니":"Red Knit Beanie",["red"]],[kr?"밀짚모자 (여름)":"Straw Hat (summer)",["camel"]],
      [kr?"레드+화이트 니트 헤어밴드":"Red+White Knit Headband",["red"]],[kr?"블랙 벨벳 리본":"Black Velvet Ribbon",["blk"]],
      [kr?"아이보리 새틴 리본":"Ivory Satin Ribbon",["ivory"]],[kr?"골드 헤어핀 세트":"Gold Hairpin Set",["gold"]],
    ]},
  ];
  const total=groups.reduce((s,g)=>s+g.items.length,0);
  return(<div>
    <div style={{textAlign:"center",padding:"14px 0 18px"}}>
      <div style={{fontSize:28}}>👗</div>
      <div style={{fontSize:11,fontWeight:700,color:"#303030",marginTop:4}}>{kr?`전체 ${total}개 아이템`:`${total} Total Items`}</div>
      <div style={{fontSize:9,color:"#a0a0a0",marginTop:2}}>{kr?"모든 계절 · 출근 · 운동 · 악세서리 통합":"All seasons · work · exercise · accessories combined"}</div>
    </div>
    {groups.map(g=>(
      <Sec key={g.title} title={`${g.title} (${g.items.length})`} emoji={g.emoji}>
        {g.items.map(([n,c],i)=><IRow key={i} name={n} colors={c}/>)}
      </Sec>
    ))}
  </div>);
}

/* ─── GUIDE ─── */
function GuideTab({lang}){
  const kr=lang==="kr";
  const combos=[
    {a:"red",b:"blk",n:kr?"레드+블랙":"Red+Black",d:kr?"가장 강렬":"Most powerful"},
    {a:"red",b:"camel",n:kr?"레드+카멜":"Red+Camel",d:kr?"따뜻+시선":"Warm+attention"},
    {a:"pink",b:"blk",n:kr?"핑크+블랙":"Pink+Black",d:kr?"로맨틱 글램":"Romantic glam"},
    {a:"pink",b:"camel",n:kr?"핑크+카멜":"Pink+Camel",d:kr?"부드러운 여성미":"Soft feminine"},
    {a:"ivory",b:"camel",n:kr?"아이보리+카멜":"Ivory+Camel",d:kr?"금발에 완벽":"Perfect w/ blonde"},
    {a:"burg",b:"blk",n:kr?"버건디+블랙":"Burgundy+Black",d:kr?"깊고 고급":"Deep+luxe"},
    {a:"turq",b:"wht",n:kr?"터콰이즈+화이트":"Turquoise+White",d:kr?"여름 청량":"Summer fresh"},
    {a:"pblu",b:"blk",n:kr?"파스텔블루+블랙":"Blue+Black",d:kr?"겨울 포인트":"Winter point"},
    {a:"dpink",b:"camel",n:kr?"더스티로즈+카멜":"Rose+Camel",d:kr?"우아한 웜":"Elegant warm"},
  ];
  return(<div>
    <Sec title={kr?"컬러 조합 가이드":"COLOR COMBO GUIDE"} emoji="🎨">
      {combos.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #f0ece6"}}>
        <div style={{display:"flex",gap:2}}><Dot c={C[c.a]} size={20}/><Dot c={C[c.b]} size={20}/></div>
        <div><div style={{fontSize:10.5,fontWeight:600,color:"#303030"}}>{c.n}</div><div style={{fontSize:9,color:"#a0a0a0"}}>✦ {c.d}</div></div>
      </div>))}
    </Sec>
    <Sec title={kr?"쇼핑 우선순위":"SHOPPING PRIORITY"} emoji="🛒">
      <T>🥇 {kr?"카멜 울 코트 · 블랙 블레이저 · 아이보리 터틀넥 · 골드 체인 목걸이":"Camel wool coat · Black blazer · Ivory turtleneck · Gold chain necklace"}</T>
      <T>🥈 {kr?"더스티로즈 니트 · 파스텔핑크 니트 · 블랙 앵클부츠 · 카멜 스커트":"Dusty rose knit · Pastel pink knit · Black ankle boots · Camel skirt"}</T>
      <T>🥉 {kr?"터콰이즈 크롭 · 아이보리 랩 원피스 · 골드 샌들 · 카멜 베레":"Turquoise crop · Ivory wrap dress · Gold sandals · Camel beret"}</T>
    </Sec>
    <Sec title={kr?"1분 체크리스트":"1-MIN CHECKLIST"} emoji="✅">
      <T>☐ {kr?"허리 보이나?":"Waist visible?"}<br/>
        ☐ {kr?"컬러 2~3색 이내?":"2-3 colors max?"}<br/>
        ☐ {kr?"포인트 하나 있나? (레드 가방 or 골드 악세 or 컬러 머플러)":"One accent? (red bag / gold acc. / color scarf)"}<br/>
        ☐ {kr?"로맨틱/시크 둘 중 하나로 통일?":"Romantic or chic — unified?"}<br/>
        ☐ {kr?"금발 톤 괜찮나?":"Blonde tone OK?"}</T>
    </Sec>
  </div>);
}

/* ─── MAIN ─── */
const TABS_KR=["프로필","봄","여름","가을","겨울","출근","운동","옷장","가이드"];
const TABS_EN=["Profile","Spring","Summer","Fall","Winter","Work","Exercise","Closet","Guide"];
const TABS_EMOJI=["👤","🌸","☀️","🍂","❄️","💼","🏋️","🗄️","📖"];
const TAB_COLORS=["#c0a880","#E8A0A8","#D94040","#C09868","#4068C0","#404040","#38B0A8","#7A5838","#c0a880"];

export default function Seol(){
  const [tab,setTab]=useState(0);
  const [lang,setLang]=useState("kr");
  const tabs=lang==="kr"?TABS_KR:TABS_EN;

  const content=()=>{switch(tab){
    case 0: return (<ProfileTab lang={lang}/>);
    case 1: return (<SeasonTab data={SP} lang={lang}/>);
    case 2: return (<SeasonTab data={SU} lang={lang}/>);
    case 3: return (<SeasonTab data={FA} lang={lang}/>);
    case 4: return (<SeasonTab data={WI} lang={lang}/>);
    case 5: return (<WorkTab lang={lang}/>);
    case 6: return (<ExTab lang={lang}/>);
    case 7: return (<ClosetTab lang={lang}/>);
    case 8: return (<GuideTab lang={lang}/>);
    default: return (<ProfileTab lang={lang}/>);
  }};

  return(
    <div style={{fontFamily:"'Karla','Noto Sans KR',sans-serif",maxWidth:480,margin:"0 auto",padding:"20px 14px 40px",background:"linear-gradient(180deg,#FDFCFA 0%,#F8F6F2 100%)",minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Karla:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:10}}>
          {["KR","EN"].map(l=><button key={l} onClick={()=>setLang(l.toLowerCase())} style={{
            padding:"4px 12px",border:"none",borderRadius:20,fontSize:9,fontWeight:700,cursor:"pointer",letterSpacing:1.5,
            background:lang===l.toLowerCase()?"linear-gradient(135deg,#303030,#505050)":"transparent",
            color:lang===l.toLowerCase()?"#fff":"#c0b8b0",transition:"all 0.2s",
          }}>{l}</button>)}
        </div>
        <div style={{fontSize:8,fontWeight:600,letterSpacing:4,color:"#c0a880"}}>✦ PERSONAL STYLE BIBLE ✦</div>
        <h1 style={{margin:"4px 0",fontSize:30,fontWeight:700,fontFamily:"'Cormorant Garamond',serif",color:"#202020"}}>Seol</h1>
        <div style={{fontSize:9,color:"#b0a8a0"}}>{lang==="kr"?"18장 분석 · 봄 브라이트 · 베를린":"18 Photos · Spring Bright · Berlin"}</div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:2,marginBottom:18,overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:2}}>
        {tabs.map((label,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{
            padding:"7px 10px",border:"none",borderRadius:10,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",
            fontSize:9.5,fontWeight:tab===i?700:500,
            background:tab===i?`${TAB_COLORS[i]}18`:"transparent",
            color:tab===i?TAB_COLORS[i]:"#b0a8a0",
            fontFamily:"'Karla','Noto Sans KR',sans-serif",
          }}>
            <span style={{marginRight:3}}>{TABS_EMOJI[i]}</span>{label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{fontFamily:"'Noto Sans KR','Karla',sans-serif"}}>{content()}</div>

      {/* FOOTER */}
      <div style={{marginTop:28,textAlign:"center",fontSize:7,letterSpacing:3,color:"#d8d0c8"}}>
        ✦ SPRING BRIGHT · WARM NEUTRAL · BERLIN 2026 ✦
      </div>
    </div>
  );
}