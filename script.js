const APP_URL = "https://kabukura-lab.github.io/kabukura-nickname/";

const dimensions = ["握力","損切り力","高値掴み度","ナンピン度","SNS依存度"];

const questions = [
  {
    q:"含み損が20％になったら？",
    a:[
      ["ルール通り損切り",[1,5,0,0,0]],
      ["迷わずナンピン",[5,0,1,5,0]],
      ["いつか戻ると信じる",[5,0,2,0,0]],
      ["SNSで助けを求める",[2,1,1,1,5]]
    ]
  },
  {
    q:"株を買うタイミングは？",
    a:[
      ["押し目をじっくり待つ",[3,3,0,0,0]],
      ["高値ブレイクで飛び乗る",[2,1,5,0,1]],
      ["急騰ランキングを見て買う",[1,1,5,1,4]],
      ["自分の分析を信じて買う",[4,3,1,1,0]]
    ]
  },
  {
    q:"含み益が20％になったら？",
    a:[
      ["すぐに利益確定",[1,5,0,0,0]],
      ["まだまだ握る",[5,1,0,0,0]],
      ["もっと買い増す",[4,1,1,5,0]],
      ["Xにスクショを投稿",[3,1,1,1,5]]
    ]
  },
  {
    q:"決算発表の前日は？",
    a:[
      ["数字を徹底的に調べる",[3,4,0,0,0]],
      ["期待を込めて買う",[3,1,4,1,0]],
      ["SNSの予想を読み漁る",[2,2,2,0,5]],
      ["何も考えず持ち越す",[5,0,2,1,0]]
    ]
  },
  {
    q:"暴落相場でのあなたは？",
    a:[
      ["冷静に現金を温存",[2,5,0,0,0]],
      ["ここぞとばかりに買う",[5,1,1,5,0]],
      ["怖くて全部売る",[0,5,0,0,1]],
      ["株クラの投稿を巡回",[2,2,1,1,5]]
    ]
  },
  {
    q:"あなたの投資で一番多い失敗は？",
    a:[
      ["利確が早すぎる",[1,5,0,0,0]],
      ["高値で買ってしまう",[2,1,5,0,1]],
      ["損切りできない",[5,0,1,1,0]],
      ["他人の意見に流される",[2,2,2,0,5]]
    ]
  }
];

const nicknameBank = {
  "握力":[
    ["含み損界の永久就職者","株を買ったはずが、いつの間にか株に人生を握られています。"],
    ["塩漬け界の名誉会長","売るという選択肢だけ、あなたの辞書から消えています。"],
    ["含み損の管理人","毎日株価を確認しているのに、何も変わりません。"],
    ["握力だけ億り人","利益は小さいのに、含み損だけは大きく育ちます。"],
    ["株式の人質","もはや売買ではなく、解放交渉です。"]
  ],
  "損切り力":[
    ["損切りの早撃ちマック","利益まで逃げ足が速い。もう少し待ってもよかったのでは。"],
    ["利確恐怖症の患者","含み益は幻。確定した利益だけが現実です。"],
    ["秒速の撤退職人","逃げる判断だけは誰よりも早い。"],
    ["利益の取りこぼし名人","売った瞬間に上がる。それも才能です。"],
    ["小銭回収のプロ","大勝ちは知らない。でも小さな勝ちは見逃しません。"]
  ],
  "高値掴み度":[
    ["天井の常連客","あなたが買うと株価が落ち着く。市場の休憩係です。"],
    ["高値掴み界のVIP","なぜいつもそこが天井なのか。もはや特等席です。"],
    ["ジャンピングキャッチ名人","落ちてくるナイフではなく、上がった株をつかみに行きます。"],
    ["寄り天の申し子","朝の期待感だけは誰にも負けません。"],
    ["最後の買い手","あなたが買ったところで、なぜか祭りが終わります。"]
  ],
  "ナンピン度":[
    ["ナンピン界の名誉会長","下がれば買う。さらに下がれば、もっと買う。"],
    ["買い増しの無限機関","平均取得単価と一緒に資金も下がっています。"],
    ["下落株のスポンサー","企業よりもあなたの資金繰りが心配です。"],
    ["株価の逆張り応援団","市場が嫌がるほど、あなたは買いたくなります。"],
    ["ナンピン不動明王","含み損が増えても、信念だけは揺るぎません。"]
  ],
  "SNS依存度":[
    ["株クラの巡回警備員","株価よりタイムラインのチェック回数が多い。"],
    ["他人の爆益で情緒不安定","知らない人の利益で、なぜか自分が落ち込みます。"],
    ["SNS相場の養分係","誰かの買い煽りが、あなたの買い注文を動かします。"],
    ["情報収集という名の徘徊者","調べている時間の割に、売買は直感です。"],
    ["通知待ちの投資家","株価より通知音に反応する毎日です。"]
  ]
};

let current = 0;
let answers = [];
let resultName = "";
let resultComment = "";

function showQuestion() {
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  document.getElementById("question").textContent = questions[current].q;
  document.getElementById("progress").textContent =
    `${current+1} / ${questions.length} 問`;

  document.getElementById("progressBar").style.width =
    `${current / questions.length * 100}%`;

  const area = document.getElementById("answers");
  area.innerHTML = "";

  questions[current].a.forEach((item,index) => {
    const btn = document.createElement("button");
    btn.textContent = item[0];
    btn.onclick = () => {
      answers.push(item[1]);
      current++;
      if(current < questions.length) showQuestion();
      else showResult();
    };
    area.appendChild(btn);
  });
}

function showResult() {
  const totals = [0,0,0,0,0];

  answers.forEach(answer => {
    answer.forEach((value,i) => totals[i] += value);
  });

  const max = Math.max(...totals);
  const winner = totals.indexOf(max);
  const category = dimensions[winner];
  const choices = nicknameBank[category];
  const result = choices[Math.floor(Math.random()*choices.length)];

  resultName = result[0];
  resultComment = result[1];

  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("nickname").textContent = resultName;
  document.getElementById("comment").textContent = resultComment;
  document.getElementById("rank").textContent =
    `あなたの最大の特徴：${category}`;

  document.getElementById("cardName").textContent = resultName;
  document.getElementById("cardComment").textContent = resultComment;

  const list = document.getElementById("scoreList");
  list.innerHTML = "";

  dimensions.forEach((name,i) => {
    const score = Math.round(totals[i] / (questions.length * 5) * 100);
    const row = document.createElement("div");
    row.className = "score-row";
    row.innerHTML = `
      <div class="score-head">
        <span>${name}</span><span>${score}点</span>
      </div>
      <div class="bar">
        <div class="bar-fill" style="width:${score}%"></div>
      </div>`;
    list.appendChild(row);
  });
}

function shareX() {
  const text = `私の株クラあだ名は「${resultName}」でした🤣\n\n${resultComment}\n\nあなたは何て呼ばれる？\n#株クラあだ名工場 #株クラ`;
  window.open(
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text),
    "_blank"
  );
}

function downloadCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0,0,1080,1080);
  gradient.addColorStop(0,"#263750");
  gradient.addColorStop(1,"#0b1019");

  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,1080,1080);

  ctx.strokeStyle = "#e9bd59";
  ctx.lineWidth = 5;
  ctx.strokeRect(35,35,1010,1010);

  ctx.textAlign = "center";
  ctx.fillStyle = "#f4c75e";
  ctx.font = "bold 48px sans-serif";
  ctx.fillText("📈 株クラあだ名工場",540,160);

  ctx.fillStyle = "#aab6c8";
  ctx.font = "30px sans-serif";
  ctx.fillText("YOUR INVESTOR NICKNAME",540,330);

  ctx.fillStyle = "#f4c75e";
  ctx.font = "bold 76px sans-serif";
  wrapText(ctx,resultName,540,490,900,100);

  ctx.fillStyle = "#ffffff";
  ctx.font = "36px sans-serif";
  wrapText(ctx,resultComment,540,690,850,65);

  ctx.fillStyle = "#aab6c8";
  ctx.font = "26px sans-serif";
  ctx.fillText("あなたの投資人生に、勝手に名前を。",540,940);

  const link = document.createElement("a");
  link.download = "株クラあだ名.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}


function shareX() {
  const text =
    `私の株クラあだ名は「${resultName}」でした🤣\n\n` +
    `${resultComment}\n\n` +
    `あなたは何て呼ばれる？診断してみて👇\n` +
    `${APP_URL}\n\n` +
    `#株クラあだ名工場 #株クラ`;

  const shareUrl =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text);

  window.open(shareUrl, "_blank");
}

showQuestion();
