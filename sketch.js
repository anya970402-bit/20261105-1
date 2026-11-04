// 宣告飛行小精靈的精靈圖變數。
let flySheet;
// 設定精靈圖包含的動畫影格數量。
const FRAME_COUNT = 9;
// 設定英文與中文依序使用 Playfair Display 和 Noto Serif TC。
const FONT_STACK = '"Playfair Display", "Noto Serif TC", serif';
// 設定小精靈動畫切換影格的速度。
const ANIMATION_INTERVAL = 8;
// 設定測驗使用的主色、輔色、答對色與答錯色。
const THEME = {
  // 設定整個畫布的淡藍色背景。
  background: '#bde0fe',
  // 設定題幹與選項的深棕色文字。
  text: '#432818',
  // 設定少量使用的淡黃色輔色。
  accent: '#fff3b0',
  // 設定答對時使用的淺綠色。
  correct: '#b5e48c',
  // 設定答錯時使用的淺粉色。
  incorrect: '#ffcad4',
  // 設定一般卡片使用的淡藍白色。
  surface: '#f4faff',
  // 設定一般邊線使用的柔和藍灰色。
  border: '#a9c7dc',
  // 設定次要文字使用的柔和棕色。
  muted: '#765b45'
};
// 設定每關五題、共四關的國中會考動物分類辨析題。
const quizStages = [
  // 設定第一關：依照脊椎動物特徵判斷動物綱別。
  {
    // 設定第一關的關卡名稱。
    title: '第一關｜脊椎動物分綱',
    // 設定第一關拼圖完成後的脊椎動物辨別重點。
    summary: '判斷脊椎動物要看關鍵特徵，不只看棲地：鯨用肺呼吸並哺乳；企鵝有羽毛、不會飛仍是鳥；海馬有鰓與鰭；兩生類常經歷變態。',
    // 設定第一關容易混淆的脊椎動物分類題目。
    questions: [
      // 根據鯨在水中生活但用肺呼吸並哺乳，辨認其所屬綱別。
      { clue: '鯨在海中游泳，需浮出水面用肺呼吸，幼鯨喝母乳；屬於哪一綱？', answer: '哺乳綱', explanation: '鯨用肺呼吸，且幼體喝母乳；生活在海中不會改變哺乳類特徵。' },
      // 根據企鵝具有羽毛與喙的特徵，排除不會飛就不是鳥的迷思。
      { clue: '企鵝不會飛，卻有羽毛、喙，並以卵繁殖；屬於哪一綱？', answer: '鳥綱', explanation: '羽毛是鳥類的重要特徵；會不會飛不是判斷鳥類的依據。' },
      // 根據海龜用肺呼吸與具有角質鱗片等特徵辨認其綱別。
      { clue: '海龜生活在海中，仍須浮出水面用肺呼吸；身體有角質鱗片，雌龜上岸產卵。牠屬於哪一綱？', answer: '爬蟲綱', explanation: '海龜屬爬蟲綱中的龜鱉目；用肺呼吸、具有角質鱗片是辨認線索。生活在海裡不會使牠變成魚類，而上岸產卵也不代表牠是兩生類。' },
      // 根據青蛙幼體用鰓、成體用肺與皮膚呼吸的生活史辨認綱別。
      { clue: '青蛙幼體住水中用鰓，長大後長出四肢，可用肺與皮膚呼吸；屬於哪一綱？', answer: '兩生綱', explanation: '青蛙一生經歷水生蝌蚪與成蛙階段，是兩生類的典型特徵。' },
      // 根據海馬有鰓、鰭及硬骨骨骼辨認魚類分類。
      { clue: '海馬由雄性育兒袋孵育幼魚，仍以鰓呼吸、有鰭且具硬骨；屬於哪一類？', answer: '硬骨魚綱', explanation: '海馬具有魚類的鰓與鰭，骨骼為硬骨；雄性育兒不改變分類。' }
    ],
    // 設定第一關五個可拖曳答案，並打亂顯示順序。
    options: ['兩生綱', '硬骨魚綱', '鳥綱', '哺乳綱', '爬蟲綱']
  },
  // 設定第二關：比較容易混淆的無脊椎動物類群。
  {
    // 設定第二關的關卡名稱。
    title: '第二關｜無脊椎動物辨認',
    // 設定第二關拼圖完成後的無脊椎動物辨別重點。
    summary: '昆蟲有六隻腳、身體分頭胸腹；蜘蛛等蛛形類有八隻腳、沒有觸角；蝦蟹屬甲殼類；章魚屬軟體動物；蜈蚣屬多足類。',
    // 設定第二關容易混淆的無脊椎動物分類題目。
    questions: [
      // 根據蜘蛛有八隻腳且沒有觸角，與六腳昆蟲區分。
      { clue: '家中出現八隻腳、沒有觸角且身體分頭胸部的動物；屬於哪一綱？', answer: '蛛形綱', explanation: '蛛形類有四對腳、沒有觸角；昆蟲則有六隻腳與一對觸角。' },
      // 根據螃蟹有兩對觸角與分節附肢，辨認甲殼類。
      { clue: '螃蟹有硬殼、兩對觸角，生活在水邊；屬於哪一類？', answer: '甲殼類', explanation: '螃蟹屬甲殼類節肢動物；硬殼與兩對觸角是辨認線索。' },
      // 根據蝴蝶六隻腳與頭胸腹三部分辨認昆蟲。
      { clue: '蝴蝶有六隻腳，身體分頭、胸、腹三部分；屬於哪一綱？', answer: '昆蟲綱', explanation: '成蟲有三對腳，身體分頭、胸、腹，是昆蟲的典型特徵。' },
      // 根據蜈蚣每一體節有一至兩對腳辨認多足類。
      { clue: '蜈蚣身體由許多體節組成，幾乎每節都有一對腳；屬於哪一類？', answer: '多足類', explanation: '蜈蚣有許多體節與多對腳，和只有三對腳的昆蟲不同。' },
      // 根據章魚柔軟身體、外套膜與腕足辨認軟體動物。
      { clue: '章魚沒有脊椎骨，身體柔軟，有外套膜與八隻腕足；屬於哪一門？', answer: '軟體動物門', explanation: '章魚身體柔軟、有外套膜，符合軟體動物特徵，不是魚類。' }
    ],
    // 設定第二關五個可拖曳答案，並打亂顯示順序。
    options: ['昆蟲綱', '蛛形綱', '軟體動物門', '多足類', '甲殼類']
  },
  // 設定第三關：辨析外形相似或生活環境相近的動物。
  {
    // 設定第三關的關卡名稱。
    title: '第三關｜外形相似，分類不同',
    // 設定第三關拼圖完成後的動物分類辨析重點。
    summary: '外形或棲地不一定能決定類群：蝙蝠有毛、胎生並哺乳；飛魚仍用鰓呼吸；鯨鯊是軟骨魚；珊瑚是刺絲胞動物；蚯蚓屬環節動物。',
    // 設定第三關外形容易造成誤判的動物分類題目。
    questions: [
      // 根據蝙蝠有毛髮、胎生與哺乳，排除牠是鳥類的常見誤解。
      { clue: '蝙蝠會飛且有翅膀，但身上有毛、胎生，幼體喝母乳；屬於哪一綱？', answer: '哺乳綱', explanation: '蝙蝠有毛、胎生且哺乳；翅膀與飛行能力不代表牠是鳥。' },
      // 根據飛魚以鰓呼吸並有魚鰭，排除牠是鳥類的誤判。
      { clue: '飛魚能滑翔離水，但用鰓呼吸、以鰭游泳，身體覆有鱗片；屬於哪一類？', answer: '硬骨魚綱', explanation: '飛魚以鰓呼吸並用鰭游泳；短暫滑翔不會讓牠變成鳥類。' },
      // 根據鯨鯊骨骼主要由軟骨構成，與鯨類哺乳動物區分。
      { clue: '鯨鯊名字有「鯨」，但用鰓呼吸、骨骼主要由軟骨構成；屬於哪一類？', answer: '軟骨魚綱', explanation: '鯨鯊用鰓呼吸、骨骼以軟骨為主；名稱中的「鯨」不代表是哺乳類。' },
      // 根據珊瑚由許多有觸手的刺絲胞動物個體組成，判斷其門別。
      { clue: '珊瑚看似海底的石頭或植物，其實由有觸手、具刺絲胞的動物組成；屬於哪一門？', answer: '刺絲胞動物門', explanation: '珊瑚由許多刺絲胞動物個體組成，是動物而非植物或岩石。' },
      // 根據蚯蚓具有許多相似環狀體節辨認環節動物。
      { clue: '蚯蚓沒有腳，身體由許多相似的環狀體節組成；屬於哪一門？', answer: '環節動物門', explanation: '蚯蚓身體有許多相似環節，屬環節動物；沒有腳不等於軟體動物。' }
    ],
    // 設定第三關五個可拖曳答案，並打亂顯示順序。
    options: ['刺絲胞動物門', '軟骨魚綱', '環節動物門', '哺乳綱', '硬骨魚綱']
  },
  // 設定第四關：用不同動物案例複習容易混淆的脊椎動物綱別。
  {
    // 設定第四關的關卡名稱。
    title: '第四關｜脊椎動物易混淆分類',
    // 設定第四關完成後的重點整理。
    summary: '判斷動物分類要依據身體構造與生理特徵：哺乳類會哺乳，鳥類有羽毛，爬蟲類有角質鱗片，兩生類常經歷變態，軟骨魚的骨骼以軟骨為主。',
    // 設定第四關五道辨析不同脊椎動物的應用題。
    questions: [
      // 根據海豚用肺呼吸並哺乳，辨認海洋哺乳類。
      { clue: '海豚生活在海中，需浮出水面呼吸，幼豚會喝母乳；屬於哪一綱？', answer: '哺乳綱', explanation: '海豚用肺呼吸並哺乳，和鯨相同，都是哺乳類，不是魚類。' },
      // 根據鴕鳥有羽毛與喙，排除不會飛就不是鳥的誤解。
      { clue: '鴕鳥不會飛，但身體覆有羽毛、有喙，並以卵繁殖；屬於哪一綱？', answer: '鳥綱', explanation: '羽毛是鳥類的重要分類特徵；飛行能力不是必要條件。' },
      // 根據鱷魚乾燥角質鱗片與肺呼吸辨認爬蟲類。
      { clue: '鱷魚在水中活動，身體覆有角質鱗片，用肺呼吸；屬於哪一綱？', answer: '爬蟲綱', explanation: '鱷魚有角質鱗片並用肺呼吸，屬爬蟲類；棲水不代表是魚或兩生類。' },
      // 根據蠑螈幼體與成體的生活型態辨認兩生類。
      { clue: '蠑螈皮膚濕潤，幼體多在水中用鰓，成體可用肺與皮膚呼吸；屬於哪一綱？', answer: '兩生綱', explanation: '蠑螈的生活史包含水生幼體與成體階段，皮膚也可參與呼吸，屬兩生類。' },
      // 根據魟魚骨骼由軟骨構成且用鰓呼吸，辨認魚類分類。
      { clue: '魟魚身體扁平，用鰓呼吸，骨骼主要由軟骨構成；屬於哪一綱？', answer: '軟骨魚綱', explanation: '魟魚骨骼以軟骨為主，和骨骼主要由硬骨構成的硬骨魚不同。' }
    ],
    // 設定第四關五個可拖曳答案。
    options: ['兩生綱', '軟骨魚綱', '鳥綱', '哺乳綱', '爬蟲綱']
  }
];
// 設定每關的題目數量。
const QUESTIONS_PER_STAGE = 5;
// 根據關卡數量計算整份測驗的總題數。
const TOTAL_QUESTIONS = QUESTIONS_PER_STAGE * quizStages.length;
// 設定整份二十題測驗的作答時間為五分鐘。
const QUIZ_TIME_LIMIT = 5 * 60;
// 記錄目前關卡的題目清單。
let questions = [];
// 記錄目前關卡的可拖曳答案清單。
let answerOptions = [];
// 記錄每個拼圖位置目前是否已經完成。
let solvedSlots = [];
// 記錄每題是否已經顯示即時解析。
let explanationShown = [];
// 記錄目前已經答對的總題數。
let correctCount = 0;
// 記錄使用者拖錯答案的次數。
let mistakeCount = 0;
// 記錄目前所在的關卡索引。
let currentStage = 0;
// 記錄使用者是否已按下開始測驗按鈕。
let quizStarted = false;
// 記錄五分鐘倒數開始的時間。
let quizStartedAt = 0;
// 記錄目前剩餘的秒數。
let timeLeftSeconds = QUIZ_TIME_LIMIT;
// 記錄時間到時是否自動交卷。
let timeExpired = false;
// 記錄目前正在拖曳的答案選項索引。
let draggedOption = -1;
// 記錄所有答案是否已經拼完。
let puzzleComplete = false;
// 記錄使用者是否已經交卷查看成績。
let hasSubmitted = false;
// 記錄目前顯示的操作提示文字。
let feedbackMessage = '';
// 記錄目前顯示的操作提示顏色。
let feedbackColor = THEME.correct;
// 記錄正在播放的彩帶粒子。
let confettiParticles = [];
// 記錄最後一次計算出的畫面配置。
let screenLayout;
// 記錄結果畫面上的重新挑戰按鈕位置。
let resultButton;

// 預先載入小精靈圖片，確保開始繪圖前圖片已經載入。
function preload() {
  // 載入專案中既有的飛行動畫精靈圖。
  flySheet = loadImage('libraries/1/fly/fly.png');
}

// 建立全螢幕畫布並初始化測驗狀態。
function setup() {
  // 建立符合瀏覽器視窗大小的畫布。
  createCanvas(windowWidth, windowHeight);
  // 設定畫布使用一般左上角座標模式。
  rectMode(CORNER);
  // 設定文字的垂直對齊方式為置中。
  textAlign(LEFT, CENTER);
  // 先設定英文優先使用 Playfair Display、中文使用 Noto Serif TC。
  textFont(FONT_STACK);
  // 等待兩款網頁字型載入後再套用至 p5.js 畫布。
  Promise.all([
    // 確保繁體中文字型載入題目與標題所需字元。
    document.fonts.load('600 16px "Noto Serif TC"', '國中會考動物分類挑戰'),
    // 確保英文字型載入英文字母與數字。
    document.fonts.load('600 16px "Playfair Display"', 'Quiz 123')
  ]).then(() => {
    // 字型載入完成後更新畫布字型，避免整個測驗停留在後備字型。
    textFont(FONT_STACK);
  }).catch((error) => console.error('載入測驗字型失敗，將使用系統後備字型：', error));
  // 清空所有拼圖位置的完成狀態。
  resetQuiz();
}

// 每一影格繪製測驗介面、角色與動畫效果。
function draw() {
  // 計算目前視窗尺寸適用的介面配置。
  screenLayout = getScreenLayout();
  // 更新五分鐘倒數，時間結束時自動交卷。
  updateQuizTimer();
  // 使用溫暖的淡黃色填滿畫布背景。
  background(THEME.background);
  // 更新並繪製彩帶粒子動畫。
  drawConfetti();
  // 繪製測驗標題與作答進度。
  drawHeader();
  // 在筆電與桌面版顯示全螢幕切換按鈕。
  drawFullscreenButton();
  // 繪製目前關卡的應用題與拼圖放置區。
  drawPuzzleBoard();
  // 繪製目前關卡的可拖曳答案或概念整理。
  drawAnswerArea();
  // 繪製交卷或重新作答按鈕。
  drawActionButton();
  // 若已經交卷，顯示最後成績與重新挑戰選項。
  if (hasSubmitted) {
    // 繪製成績結果畫面。
    drawResults();
    // 在置中的成績卡片上方顯示完成挑戰的小精靈。
    drawFairy();
  // 尚未交卷時將小精靈放在作答進度條上。
  } else {
    // 依作答進度繪製移動中的飛行小精靈。
    drawFairy();
  }
}

// 繪製筆電與桌面版的全螢幕切換按鈕。
function drawFullscreenButton() {
  // 手機版不顯示桌面專用按鈕，保留標題區空間。
  if (screenLayout.isNarrow) {
    // 結束手機版全螢幕按鈕繪製。
    return;
  }
  // 設定全螢幕按鈕的寬度。
  const buttonWidth = 112;
  // 設定全螢幕按鈕的高度。
  const buttonHeight = 32;
  // 設定全螢幕按鈕的水平位置。
  const buttonX = width - screenLayout.padding - buttonWidth;
  // 設定全螢幕按鈕的垂直位置。
  const buttonY = 14;
  // 以淡黃色繪製全螢幕按鈕底色。
  fill(THEME.accent);
  // 繪製圓角全螢幕切換按鈕。
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
  // 設定按鈕標籤文字顏色。
  fill(THEME.text);
  // 設定按鈕標籤文字大小。
  textSize(17);
  // 將按鈕標籤置中顯示。
  textAlign(CENTER, CENTER);
  // 依目前狀態顯示進入或離開全螢幕的文字。
  text(
    fullscreen() ? '退出全螢幕' : '筆電全螢幕',
    buttonX + buttonWidth / 2,
    buttonY + buttonHeight / 2
  );
  // 還原文字靠左對齊設定。
  textAlign(LEFT, CENTER);
}

// 計算桌面與窄螢幕適用的版面及互動區域。
function getScreenLayout() {
  // 讀取畫布目前的寬度。
  const canvasWidth = width;
  // 讀取畫布目前的高度。
  const canvasHeight = height;
  // 只在窄幅直向畫面使用手機直式版面，橫向手機仍採左右分欄。
  const isNarrow = canvasWidth < 760 && canvasWidth <= canvasHeight;
  // 判斷目前是否需要使用緊湊版面。
  const isCompact = canvasHeight < 650;
  // 設定介面與畫布邊緣之間的留白。
  const padding = isNarrow ? 16 : 28;
  // 設定主要操作按鈕的高度。
  const buttonHeight = isCompact ? 42 : 48;
  // 設定主要操作按鈕的垂直位置。
  const buttonY = canvasHeight - buttonHeight - 12;
  // 設定拼圖題目區域的起始位置，為標題與進度資訊預留較寬鬆的垂直間距。
  const boardTop = isNarrow ? (isCompact ? 150 : 148) : isCompact ? 144 : 148;
  // 建立所有拼圖目標區的清單。
  const targets = [];
  // 建立所有答案選項互動區的清單。
  const options = [];
  // 宣告答案區標題的垂直位置。
  let answerTitleY;
  // 宣告答案區中每個選項的高度。
  let optionHeight;
  // 宣告答案選項之間的間距。
  let optionGap;
  // 宣告每個拼圖題目的高度。
  let rowHeight;
  // 宣告拼圖題目之間的垂直間距。
  let rowGap;
  // 宣告拼圖題目區域的水平位置與寬度。
  let boardX;
  // 宣告答案區域的水平位置與寬度。
  let answerX;
  // 宣告拼圖題目區域的寬度。
  let boardWidth;
  // 宣告答案區域的寬度。
  let answerWidth;

  // 根據窄螢幕的垂直空間安排拼圖與答案區。
  if (isNarrow) {
    // 設定窄螢幕拼圖區使用畫布的大部分寬度。
    boardX = padding;
    // 設定窄螢幕拼圖區寬度。
    boardWidth = canvasWidth - padding * 2;
    // 設定窄螢幕答案區沿用拼圖區的水平位置。
    answerX = padding;
    // 設定窄螢幕答案區沿用拼圖區的寬度。
    answerWidth = boardWidth;
    // 設定窄螢幕選項高度，短畫面會使用較緊湊的按鈕。
    optionHeight = isCompact ? 29 : 38;
    // 設定窄螢幕答案選項的間距。
    optionGap = isCompact ? 5 : 8;
    // 計算答案區標題的垂直位置。
    answerTitleY = buttonY - (optionHeight * 3 + optionGap * 2) - 25;
    // 設定窄螢幕拼圖題目之間的間距。
    rowGap = isCompact ? 4 : 6;
    // 根據可用高度計算每個拼圖題目的高度。
    rowHeight = min(
      isCompact ? 55 : 68,
      (answerTitleY - boardTop - 30 - rowGap * 4) / questions.length
    );
    // 確保拼圖題目不會因為狹小視窗而小於最低可操作高度。
    rowHeight = max(34, rowHeight);
  // 根據寬螢幕的水平空間安排左右兩個區域。
  } else {
    // 設定寬螢幕拼圖區的左側位置。
    boardX = padding;
    // 計算寬螢幕拼圖區的可用寬度。
    boardWidth = (canvasWidth - padding * 2 - 24) * 0.58;
    // 設定答案區與拼圖區之間的間距。
    answerX = boardX + boardWidth + 24;
    // 計算寬螢幕答案區的寬度。
    answerWidth = canvasWidth - answerX - padding;
    // 設定寬螢幕答案選項的高度。
    optionHeight = isCompact ? 34 : 56;
    // 設定寬螢幕答案選項的垂直間距。
    optionGap = isCompact ? 6 : 9;
    // 將答案區標題放在拼圖題目上方。
    answerTitleY = boardTop - 16;
    // 設定寬螢幕拼圖題目的垂直間距。
    rowGap = isCompact ? 4 : 9;
    // 根據畫布高度計算拼圖題目的高度。
    rowHeight = min(
      isCompact ? 58 : 76,
      (buttonY - boardTop - 30 - rowGap * 4) / questions.length
    );
    // 確保拼圖題目不會因為矮視窗而低於最低可操作高度。
    rowHeight = max(isCompact ? 34 : 38, rowHeight);
  }

  // 逐一計算每個拼圖題目與答案放置區的位置。
  for (let index = 0; index < questions.length; index += 1) {
    // 計算目前拼圖題目的垂直位置。
    const rowY = boardTop + index * (rowHeight + rowGap);
    // 計算目前答案放置區的寬度。
    const targetWidth = isNarrow
      ? min(104, boardWidth * 0.34)
      : min(136, boardWidth * 0.32);
    // 計算目前答案放置區的水平位置。
    const targetX = boardX + boardWidth - targetWidth;
    // 記錄目前拼圖題目的卡片範圍與答案放置範圍。
    targets.push({
      // 設定目前拼圖卡片的左側座標。
      x: boardX,
      // 設定目前拼圖卡片的頂部座標。
      y: rowY,
      // 設定目前拼圖卡片的寬度。
      w: boardWidth,
      // 設定目前拼圖卡片的高度。
      h: rowHeight,
      // 設定目前答案放置區的左側座標。
      targetX: targetX,
      // 設定目前答案放置區的寬度。
      targetW: targetWidth
    });
  }

  // 計算窄螢幕兩欄排列的答案選項位置。
  if (isNarrow) {
    // 逐一計算每個可拖曳答案的互動區域。
    for (let index = 0; index < answerOptions.length; index += 1) {
      // 計算目前選項所在的欄位。
      const column = index % 2;
      // 計算目前選項所在的列數。
      const row = floor(index / 2);
      // 計算兩欄答案選項的寬度。
      const optionWidth = (answerWidth - optionGap) / 2;
      // 記錄目前答案選項的文字與互動範圍。
      options.push({
        // 設定目前答案選項的文字。
        label: answerOptions[index],
        // 設定目前答案選項的左側座標。
        x: answerX + column * (optionWidth + optionGap),
        // 設定目前答案選項的頂部座標。
        y: answerTitleY + 19 + row * (optionHeight + optionGap),
        // 設定目前答案選項的寬度。
        w: optionWidth,
        // 設定目前答案選項的高度。
        h: optionHeight
      });
    }
  // 計算寬螢幕直向排列的答案選項位置。
  } else {
    // 逐一計算每個可拖曳答案的互動區域。
    for (let index = 0; index < answerOptions.length; index += 1) {
      // 緊湊橫向畫面使用兩欄排列以配合較矮的視窗。
      const useGrid = isCompact;
      // 計算答案選項所在的欄位。
      const column = useGrid ? index % 2 : 0;
      // 計算答案選項所在的列數。
      const row = useGrid ? floor(index / 2) : index;
      // 計算目前選項所在版面的寬度。
      const optionWidth = useGrid
        ? (answerWidth - optionGap) / 2
        : answerWidth;
      // 記錄目前答案選項的文字與互動範圍。
      options.push({
        // 設定目前答案選項的文字。
        label: answerOptions[index],
        // 設定目前答案選項的左側座標。
        x: answerX + column * (optionWidth + optionGap),
        // 設定目前答案選項的頂部座標。
        y: useGrid
          ? answerTitleY + 19 + row * (optionHeight + optionGap)
          : boardTop + row * (optionHeight + optionGap),
        // 設定目前答案選項的寬度。
        w: optionWidth,
        // 設定目前答案選項的高度。
        h: optionHeight
      });
    }
  }

  // 回傳目前畫布尺寸對應的所有版面與互動範圍。
  return {
    // 回傳是否使用窄螢幕排列。
    isNarrow: isNarrow,
    // 回傳目前是否使用緊湊排列。
    isCompact: isCompact,
    // 回傳介面邊界留白尺寸。
    padding: padding,
    // 回傳按鈕的垂直位置。
    buttonY: buttonY,
    // 回傳按鈕的高度。
    buttonHeight: buttonHeight,
    // 回傳拼圖區的頂部位置。
    boardTop: boardTop,
    // 回傳拼圖區的水平位置。
    boardX: boardX,
    // 回傳拼圖區的寬度。
    boardWidth: boardWidth,
    // 回傳答案區的水平位置。
    answerX: answerX,
    // 回傳答案區的寬度。
    answerWidth: answerWidth,
    // 回傳答案區標題的垂直位置。
    answerTitleY: answerTitleY,
    // 回傳所有拼圖卡片與放置區範圍。
    targets: targets,
    // 回傳所有答案選項的互動範圍。
    options: options
  };
}

// 繪製標題、操作說明與目前答題進度。
function drawHeader() {
  // 設定標題的文字大小。
  textSize(screenLayout.isNarrow ? 24 : 30);
  // 設定標題文字顏色。
  fill(THEME.text);
  // 設定標題文字為粗體。
  textStyle(BOLD);
  // 設定標題靠左並垂直置中，讓字距繪製位置一致。
  textAlign(LEFT, CENTER);
  // 以加寬字距繪製標題，並預留畫面右側空間。
  drawSpacedText(
    '國中會考｜動物分類挑戰',
    screenLayout.padding,
    30,
    width - screenLayout.padding * 2 - 54,
    screenLayout.isNarrow ? 2 : 3
  );
  // 設定副標題的文字大小。
  textSize(screenLayout.isCompact ? 16 : 19);
  // 設定副標題文字顏色。
  fill(THEME.muted);
  // 設定副標題使用一般字重。
  textStyle(NORMAL);
  // 繪製二十題五分鐘的操作提示。
  text(`${quizStages.length} 關共 ${TOTAL_QUESTIONS} 題｜限時 5 分鐘｜拖曳作答`, screenLayout.padding, 59);
  // 設定進度資訊的文字大小。
  textSize(screenLayout.isNarrow ? 15 : 17);
  // 設定進度資訊的文字顏色。
  fill(THEME.muted);
  // 計算目前關卡已經完成的拼圖數量。
  const stageSolvedCount = solvedSlots.filter(Boolean).length;
  // 繪製總作答進度與目前關卡進度。
  text(`總進度 ${correctCount}/${TOTAL_QUESTIONS}　｜　第 ${currentStage + 1}/${quizStages.length} 關（${stageSolvedCount}/${QUESTIONS_PER_STAGE}）`, screenLayout.padding, 81);
  // 設定倒數時間的文字大小與粗細。
  textSize(19);
  // 設定倒數時間靠右顯示。
  textAlign(RIGHT, CENTER);
  // 剩餘一分鐘時在倒數文字後方顯示答錯粉色提醒底框。
  if (quizStarted && timeLeftSeconds <= 60) {
    // 設定提醒底框顏色。
    fill(THEME.incorrect);
    // 繪製倒數提醒底框。
    rect(
      width - screenLayout.padding - textWidth(`剩餘 ${formatTime(timeLeftSeconds)}`) - 12,
      69,
      textWidth(`剩餘 ${formatTime(timeLeftSeconds)}`) + 12,
      24,
      8
    );
  }
  // 設定倒數文字顏色。
  fill(THEME.text);
  // 繪製五分鐘倒數計時。
  text(
    quizStarted ? `剩餘 ${formatTime(timeLeftSeconds)}` : '按下開始後倒數',
    width - screenLayout.padding,
    81
  );
  // 還原文字靠左對齊設定。
  textAlign(LEFT, CENTER);
  // 設定進度條背景的淡灰綠色。
  fill(THEME.accent);
  // 繪製圓角進度條背景。
  rect(screenLayout.padding, 111, width - screenLayout.padding * 2, 7, 4);
  // 設定已完成進度的深綠色。
  fill(THEME.correct);
  // 根據二十題的總答對數計算進度條的填滿寬度。
  const progressWidth = (width - screenLayout.padding * 2) * correctCount / TOTAL_QUESTIONS;
  // 繪製圓角進度條完成部分。
  rect(screenLayout.padding, 111, progressWidth, 7, 4);
}

// 計算指定字級下文字換行後所需的行數。
function getWrappedLineCount(content, maxWidth, fontSize) {
  // 設定文字測量使用的字級。
  textSize(fontSize);
  // 初始化需要繪製的文字行數。
  let lineCount = 1;
  // 初始化目前正在累積的文字行。
  let currentLine = '';
  // 逐字計算文字換行後的總行數。
  for (const character of content) {
    // 合併目前行與準備加入的文字。
    const candidateLine = currentLine + character;
    // 當文字超出可用寬度時開始新的一行。
    if (textWidth(candidateLine) > maxWidth && currentLine) {
      // 增加一行並將目前字元設為新行內容。
      lineCount += 1;
      currentLine = character;
    // 尚未超出寬度時繼續累積文字。
    } else {
      // 將目前字元加入正在累積的文字行。
      currentLine = candidateLine;
    }
  }
  // 回傳顯示完整文字所需的行數。
  return lineCount;
}

// 逐字繪製標題並加入固定字距，避免標題文字顯得擁擠。
function drawSpacedText(content, x, centerY, maxWidth, letterSpacing) {
  // 將標題切成個別字元以便調整字元間距。
  const characters = [...content];
  // 計算所有字元原本的總寬度。
  const textWidthTotal = characters.reduce((totalWidth, character) => totalWidth + textWidth(character), 0);
  // 計算加入字距後的標題總寬度。
  const spacedWidth = textWidthTotal + letterSpacing * (characters.length - 1);
  // 當標題放不下時等比例縮小字距與字寬。
  const horizontalScale = min(1, maxWidth / spacedWidth);
  // 設定第一個字元的繪製水平位置。
  let characterX = 0;
  // 儲存畫布目前的繪圖狀態。
  push();
  // 將繪製原點移到標題起始位置。
  translate(x, centerY);
  // 需要縮小標題時套用水平縮放。
  scale(horizontalScale, 1);
  // 逐一繪製標題中的每個字元。
  for (const character of characters) {
    // 繪製目前的字元。
    text(character, characterX, 0);
    // 加上字元寬度與指定字距，準備繪製下一個字元。
    characterX += textWidth(character) + letterSpacing;
  }
  // 還原標題繪製前的畫布狀態。
  pop();
}

// 依照文字框寬度計算可容納且盡量大的單行字級。
function getFittedTextSize(content, maxWidth, preferredSize) {
  // 先以預設最大字級測量文字寬度。
  textSize(preferredSize);
  // 取得文字以預設字級繪製時所需的寬度。
  const measuredWidth = textWidth(content);
  // 文字寬度為零時直接採用預設字級。
  if (measuredWidth <= 0) {
    // 回傳預設字級。
    return preferredSize;
  }
  // 按照可用寬度等比例縮小，確保文字不會超出框線。
  const fittedSize = min(preferredSize, preferredSize * maxWidth / measuredWidth);
  // 回傳可完整放入文字框的最大字級。
  return fittedSize;
}

// 繪製動物分類題目與可拼上的答案區。
function drawPuzzleBoard() {
  // 設定題目文字顏色。
  fill(THEME.text);
  // 設定題目文字大小。
  textSize(screenLayout.isCompact ? 18 : 21);
  // 設定題目文字使用粗體。
  textStyle(BOLD);
  // 繪製目前關卡的名稱。
  text(quizStages[currentStage].title, screenLayout.boardX, screenLayout.boardTop - 16);

  // 逐一繪製題目卡片與答案拼圖位置。
  for (let index = 0; index < questions.length; index += 1) {
    // 取得目前題目的版面範圍。
    const slot = screenLayout.targets[index];
    // 設定未完成題目的卡片底色。
    fill(solvedSlots[index]
      ? THEME.correct
      : explanationShown[index] ? THEME.incorrect : THEME.surface);
    // 設定已完成題目的綠色邊線。
    stroke(solvedSlots[index]
      ? THEME.correct
      : explanationShown[index] ? THEME.incorrect : THEME.border);
    // 設定卡片邊線粗細。
    strokeWeight(solvedSlots[index] ? 2 : 1);
    // 繪製圓角題目卡片。
    rect(slot.x, slot.y, slot.w, slot.h, 12);
    // 移除卡片完成後的邊線設定。
    noStroke();
    // 設定題號圓點的底色。
    fill(solvedSlots[index] ? THEME.correct : THEME.accent);
    // 繪製題號圓點。
    ellipse(slot.x + 18, slot.y + slot.h / 2, 24, 24);
    // 設定題號的文字顏色。
    fill(THEME.text);
    // 設定題號的文字大小。
    textSize(15);
    // 設定題號置中對齊。
    textAlign(CENTER, CENTER);
    // 繪製目前題目在二十題中的順序編號。
    text(`${currentStage * QUESTIONS_PER_STAGE + index + 1}`, slot.x + 18, slot.y + slot.h / 2);
    // 已答對的題目顯示解析色彩，尚未作答的題目維持原文字色彩。
    fill(THEME.text);
    // 解析使用稍小字級以便在題目卡片內清楚呈現。
    // 依卡片高度限制文字大小，讓解析與題目都留在框內。
    const clueText = explanationShown[index]
      ? solvedSlots[index]
        ? `解析：${questions[index].explanation}`
        : `答錯，正確答案：${questions[index].answer}。解析：${questions[index].explanation}`
      : questions[index].clue;
    // 設定比原本更大的題目或解析預設字級。
    const preferredClueSize = explanationShown[index]
      ? screenLayout.isCompact ? (width < 600 ? 15 : 17) : 20
      : screenLayout.isCompact ? (width < 600 ? 17 : 19) : 23;
    // 計算題目提示可使用的文字寬度。
    const clueWidth = slot.targetX - slot.x - (screenLayout.isNarrow ? 38 : 54);
    // 先以預設字級排版，並確認整段題目或解析都能放入卡片。
    let clueFontSize = preferredClueSize;
    // 設定題目文字與卡片邊緣之間的可用高度。
    const clueHeight = slot.h - 8;
    // 依卡片高度逐步縮小字體，直到完整文字可見。
    while (
      clueFontSize > 9 &&
      getWrappedLineCount(clueText, clueWidth, clueFontSize) * (clueFontSize + 2) > clueHeight
    ) {
      // 每次縮小半個字級以保留盡可能大的文字。
      clueFontSize -= 0.5;
    }
    // 取得目前字級下題目或解析需要顯示的完整行數。
    const clueLineCount = getWrappedLineCount(clueText, clueWidth, clueFontSize);
    // 套用符合卡片高度的題目或解析字級。
    textSize(clueFontSize);
    // 設定題目提示靠左並垂直置中。
    textAlign(LEFT, CENTER);
    // 作答前顯示題目提示，答對後改為顯示該題專屬解析。
    drawWrappedText(
      clueText,
      slot.x + (screenLayout.isNarrow ? 34 : 48),
      slot.y + slot.h / 2,
      clueWidth,
      clueFontSize + 2,
      clueLineCount
    );
    // 設定答案拼圖的完成或待作答底色。
    fill(solvedSlots[index] ? THEME.correct : THEME.accent);
    // 設定答案拼圖的完成或待作答邊線顏色。
    stroke(solvedSlots[index] ? THEME.correct : THEME.border);
    // 設定答案拼圖的邊線粗細。
    strokeWeight(1);
    // 繪製圓角答案放置區。
    rect(slot.targetX, slot.y + 5, slot.targetW, slot.h - 10, 10);
    // 移除答案放置區的邊線設定。
    noStroke();
    // 設定答案拼圖內的文字顏色。
    fill(THEME.text);
    // 設定答案拼圖內的文字大小。
    // 依答案框寬度自動縮小字體，避免分類名稱超出框線。
    textSize(getFittedTextSize(
      solvedSlots[index] ? questions[index].answer : '放入答案',
      slot.targetW - 12,
      screenLayout.isCompact ? 16 : 21
    ));
    // 設定答案文字置中對齊。
    textAlign(CENTER, CENTER);
    // 繪製已拼上的答案或放置提示。
    text(
      solvedSlots[index] ? questions[index].answer : '放入答案',
      slot.targetX + slot.targetW / 2,
      slot.y + slot.h / 2
    );
  }

  // 還原文字對齊方式，避免影響其他介面元件。
  textAlign(LEFT, CENTER);
  // 還原一般字重，避免影響其他介面元件。
  textStyle(NORMAL);
}

// 繪製可拖曳答案選項與完成後的知識整理。
function drawAnswerArea() {
  // 設定答案區標題的文字顏色。
  fill(THEME.text);
  // 設定答案區標題的文字大小。
  textSize(screenLayout.isCompact ? 18 : 21);
  // 設定答案區標題使用粗體。
  textStyle(BOLD);
  // 設定標題靠左對齊。
  textAlign(LEFT, CENTER);
  // 有作答回饋時以回饋文字取代答案區標題，避免擠壓窄螢幕選項。
  if (feedbackMessage && !puzzleComplete) {
    // 以答對綠或答錯粉色底標示目前的作答回饋。
    fill(feedbackColor);
    // 繪製答案區回饋提示底框。
    rect(
      screenLayout.answerX,
      screenLayout.answerTitleY - 12,
      screenLayout.answerWidth,
      24,
      8
    );
  }
  // 以深棕色繪製操作提示，確保在柔和底色上清楚易讀。
  fill(THEME.text);
  text(
    puzzleComplete ? '本關重點整理' : feedbackMessage || '拖曳答案到正確位置',
    screenLayout.answerX,
    screenLayout.answerTitleY
  );

  // 拼圖完成時改為顯示目前關卡的分類概念總結。
  if (puzzleComplete) {
    // 設定知識整理卡片的底色。
    fill(THEME.surface);
    // 繪製圓角知識整理卡片。
    rect(
      screenLayout.answerX,
      screenLayout.answerTitleY + 21,
      screenLayout.answerWidth,
      screenLayout.isNarrow ? 53 : 110,
      12
    );
    // 設定知識整理文字顏色。
    fill(THEME.text);
    // 設定知識整理文字大小。
    textSize(screenLayout.isCompact ? 16 : 19);
    // 設定知識整理文字靠左並垂直置中。
    textAlign(LEFT, CENTER);
    // 逐字換行繪製目前關卡的概念整理。
    drawWrappedText(
      quizStages[currentStage].summary,
      screenLayout.answerX + 12,
      screenLayout.answerTitleY + (screenLayout.isNarrow ? 47 : 76),
      screenLayout.answerWidth - 24,
      screenLayout.isNarrow ? 12 : 18,
      screenLayout.isNarrow ? 4 : 5
    );
  // 尚未完成時繪製還未拼上的答案選項。
  } else {
    // 逐一繪製每一個尚未使用的答案選項。
    for (let index = 0; index < screenLayout.options.length; index += 1) {
      // 取得目前答案選項的位置與文字。
      const option = screenLayout.options[index];
      // 判斷目前選項是否已經拼到題目上。
      const isUsed = isOptionUsed(option.label);
      // 跳過已經拼上的答案選項。
      if (isUsed) {
        // 略過已完成拼圖所對應的答案選項。
        continue;
      }
      // 設定被拖曳答案的淡黃色底色。
      fill(draggedOption === index ? THEME.accent : THEME.surface);
      // 設定答案選項的邊線顏色。
      stroke(draggedOption === index ? THEME.text : THEME.border);
      // 設定答案選項的邊線粗細。
      strokeWeight(1);
      // 取得答案選項的圓角卡片範圍。
      const optionRect = option;
      // 設定一般狀態下的答案選項位置。
      let optionX = optionRect.x;
      // 設定一般狀態下的答案選項垂直位置。
      let optionY = optionRect.y;
      // 將正在拖曳的答案選項移到滑鼠或手指位置。
      if (draggedOption === index) {
        // 將拖曳中選項的左側置於指標中心。
        optionX = mouseX - optionRect.w / 2;
        // 將拖曳中選項的上方置於指標中心。
        optionY = mouseY - optionRect.h / 2;
      }
      // 繪製可拖曳的圓角答案選項。
      rect(optionX, optionY, optionRect.w, optionRect.h, 10);
      // 根據選項卡片大小設定生物圖示尺寸。
      const iconSize = screenLayout.isCompact ? 17 : screenLayout.isNarrow ? 22 : 26;
      // 計算圖示右側可供答案文字使用的寬度。
      const labelWidth = optionRect.w - iconSize - 14;
      // 設定答案選項文字顏色。
      fill(THEME.text);
      // 設定答案選項文字大小。
      textSize(getFittedTextSize(
        option.label,
        labelWidth,
        screenLayout.isCompact ? (width < 600 ? 19 : 21) : screenLayout.isNarrow ? 24 : 26
      ));
      // 設定答案選項文字置中對齊。
      textAlign(CENTER, CENTER);
      // 在選項文字左側繪製對應的生物分類圖示。
      drawOrganismIcon(
        option.label,
        optionX + iconSize / 2 + 6,
        optionY +         optionRect.h / 2,
        iconSize
      );
      // 設定答案文字在剩餘卡片空間內置中。
      const labelCenterX = optionX + iconSize + 8 + labelWidth / 2;
      // 繪製圖示旁的答案選項文字。
      text(
        option.label,
        labelCenterX,
        optionY + optionRect.h / 2
      );
    }
  }

  // 還原答案區繪圖使用的邊線設定。
  noStroke();
  // 還原答案區文字的粗細設定。
  textStyle(NORMAL);
  // 還原答案區文字的靠左對齊設定。
  textAlign(LEFT, CENTER);
}

// 繪製交卷或重新挑戰按鈕。
function drawActionButton() {
  // 成績結果已經顯示時隱藏底部按鈕，避免和結果卡片的按鈕重複。
  if (hasSubmitted) {
    // 結束本次底部按鈕繪製。
    return;
  }
  // 設定操作按鈕的水平位置。
  const buttonX = screenLayout.isNarrow ? screenLayout.padding : width * 0.32;
  // 設定操作按鈕的寬度。
  const buttonWidth = screenLayout.isNarrow ? width - screenLayout.padding * 2 : width * 0.36;
  // 設定按鈕的背景顏色。
  fill(!quizStarted || puzzleComplete ? THEME.accent : THEME.muted);
  // 繪製圓角操作按鈕。
  rect(buttonX, screenLayout.buttonY, buttonWidth, screenLayout.buttonHeight, 14);
  // 設定按鈕文字顏色。
  fill(THEME.text);
  // 設定按鈕文字大小。
  textSize(screenLayout.isCompact ? 18 : 20);
  // 設定按鈕文字使用粗體。
  textStyle(BOLD);
  // 設定按鈕文字水平置中。
  textAlign(CENTER, CENTER);
  // 繪製符合目前測驗狀態的按鈕文字。
  text(
    !quizStarted
      ? '開始測驗（按下後開始倒數）'
      : hasSubmitted
      ? '重新挑戰'
      : puzzleComplete
        ? currentStage < quizStages.length - 1
          ? '進入下一關'
          : '交卷看成績'
        : '完成本關五題後繼續',
    buttonX + buttonWidth / 2,
    screenLayout.buttonY + screenLayout.buttonHeight / 2
  );
  // 還原按鈕文字使用的一般字重。
  textStyle(NORMAL);
  // 還原按鈕文字靠左的預設對齊方式。
  textAlign(LEFT, CENTER);
}

// 依答案分類繪製可愛簡明的生物向量圖示。
function drawOrganismIcon(label, centerX, centerY, iconSize) {
  // 根據答案文字判斷要繪製的動物類型。
  let iconType = 'mammal';
  // 將脊椎動物綱別對應到不同的圖示類型。
  if (label === '鳥綱') {
    // 將鳥綱答案設定為鳥類圖示。
    iconType = 'bird';
  // 將爬蟲類答案設定為爬蟲類圖示。
  } else if (label === '爬蟲綱') {
    // 設定爬蟲類圖示類型。
    iconType = 'reptile';
  // 將兩生類答案設定為青蛙圖示。
  } else if (label === '兩生綱') {
    // 設定兩生類圖示類型。
    iconType = 'amphibian';
  // 將魚類答案設定為魚類圖示。
  } else if (label.includes('魚綱')) {
    // 設定魚類圖示類型。
    iconType = 'fish';
  // 將蛛形類答案設定為蜘蛛圖示。
  } else if (label === '蛛形綱') {
    // 設定蛛形類圖示類型。
    iconType = 'arachnid';
  // 將昆蟲答案設定為昆蟲圖示。
  } else if (label === '昆蟲綱') {
    // 設定昆蟲圖示類型。
    iconType = 'insect';
  // 將甲殼類答案設定為螃蟹圖示。
  } else if (label === '甲殼類') {
    // 設定甲殼類圖示類型。
    iconType = 'crustacean';
  // 將多足類答案設定為蜈蚣圖示。
  } else if (label === '多足類') {
    // 設定多足類圖示類型。
    iconType = 'myriapod';
  // 將軟體動物答案設定為章魚圖示。
  } else if (label === '軟體動物門') {
    // 設定軟體動物圖示類型。
    iconType = 'mollusk';
  // 將刺絲胞動物答案設定為珊瑚圖示。
  } else if (label === '刺絲胞動物門') {
    // 設定刺絲胞動物圖示類型。
    iconType = 'cnidarian';
  // 將環節動物答案設定為蚯蚓圖示。
  } else if (label === '環節動物門') {
    // 設定環節動物圖示類型。
    iconType = 'annelid';
  }

  // 儲存畫布目前的繪圖樣式與座標狀態。
  push();
  // 將繪圖原點移至選項圖示中心。
  translate(centerX, centerY);
  // 依指定尺寸縮放標準三十二像素圖示。
  scale(iconSize / 32);
  // 設定圖示線條使用圓角端點。
  strokeCap(ROUND);
  // 設定圖示外框線條粗細。
  strokeWeight(2.2);
  // 設定圖示輪廓的深綠色。
  stroke('#344e41');

  // 依照分類類型繪製對應的動物小圖。
  if (iconType === 'mammal') {
    // 設定哺乳類臉部的橘黃色。
    fill('#e9a23b');
    // 繪製哺乳類左耳。
    ellipse(-8, -8, 10, 11);
    // 繪製哺乳類右耳。
    ellipse(8, -8, 10, 11);
    // 繪製哺乳類圓形臉部。
    ellipse(0, 1, 23, 23);
    // 移除眼睛與鼻子的外框線。
    noStroke();
    // 設定眼睛與鼻子的深色。
    fill('#283618');
    // 繪製左眼。
    ellipse(-5, 0, 2.8, 2.8);
    // 繪製右眼。
    ellipse(5, 0, 2.8, 2.8);
    // 繪製小鼻子。
    ellipse(0, 5, 3.2, 2.5);
  // 繪製羽毛與喙的鳥類圖示。
  } else if (iconType === 'bird') {
    // 設定鳥類身體的藍綠色。
    fill('#56a3a6');
    // 繪製鳥類身體。
    ellipse(-1, 3, 21, 17);
    // 設定翅膀的淺藍色。
    fill('#8ecae6');
    // 繪製鳥類翅膀。
    ellipse(1, 5, 12, 8);
    // 設定鳥喙的橘色。
    fill('#f4a261');
    // 繪製指向右側的鳥喙。
    triangle(8, -2, 16, 1, 8, 4);
    // 移除鳥眼的外框線。
    noStroke();
    // 設定鳥眼的深色。
    fill('#283618');
    // 繪製鳥眼。
    ellipse(5, -4, 2.5, 2.5);
  // 繪製具有龜殼與四肢的爬蟲類圖示。
  } else if (iconType === 'reptile') {
    // 設定龜殼的綠色。
    fill('#789b52');
    // 繪製橢圓形龜殼。
    ellipse(0, 1, 22, 17);
    // 設定龜頭與四肢的淺綠色。
    fill('#a4be73');
    // 繪製伸出的龜頭。
    ellipse(13, -2, 8, 7);
    // 繪製左上方的龜腳。
    ellipse(-8, -8, 5, 5);
    // 繪製左下方的龜腳。
    ellipse(-8, 9, 5, 5);
    // 繪製右下方的龜腳。
    ellipse(6, 9, 5, 5);
    // 移除龜眼外框線。
    noStroke();
    // 設定龜眼的深色。
    fill('#283618');
    // 繪製龜眼。
    ellipse(14, -3, 1.8, 1.8);
  // 繪製有大眼睛的兩生類青蛙圖示。
  } else if (iconType === 'amphibian') {
    // 設定青蛙身體的綠色。
    fill('#83b66b');
    // 繪製青蛙圓圓的身體。
    ellipse(0, 5, 23, 17);
    // 繪製青蛙左眼凸起部分。
    ellipse(-7, -4, 9, 9);
    // 繪製青蛙右眼凸起部分。
    ellipse(7, -4, 9, 9);
    // 移除青蛙眼珠的外框線。
    noStroke();
    // 設定青蛙眼珠的深色。
    fill('#283618');
    // 繪製青蛙左眼珠。
    ellipse(-7, -4, 3, 3);
    // 繪製青蛙右眼珠。
    ellipse(7, -4, 3, 3);
    // 設定青蛙嘴巴的線條樣式。
    stroke('#344e41');
    // 繪製青蛙微笑的嘴巴。
    line(-5, 9, 5, 9);
  // 繪製有尾鰭與魚鰭的魚類圖示。
  } else if (iconType === 'fish') {
    // 設定魚身的藍色。
    fill('#56a3a6');
    // 繪製魚身。
    ellipse(0, 0, 22, 15);
    // 設定魚尾的橘黃色。
    fill('#f4a261');
    // 繪製魚尾鰭。
    triangle(-10, 0, -16, -6, -16, 6);
    // 設定魚背鰭的淺藍色。
    fill('#8ecae6');
    // 繪製魚背上的魚鰭。
    triangle(-3, -6, 2, -13, 6, -6);
    // 移除魚眼外框線。
    noStroke();
    // 設定魚眼的深色。
    fill('#283618');
    // 繪製魚眼。
    ellipse(6, -2, 2.8, 2.8);
  // 繪製六隻腳與觸角的昆蟲圖示。
  } else if (iconType === 'insect') {
    // 設定昆蟲身體的黃橘色。
    fill('#e9a23b');
    // 繪製昆蟲頭部。
    ellipse(0, -8, 8, 8);
    // 繪製昆蟲胸部。
    ellipse(0, 0, 8, 9);
    // 繪製昆蟲腹部。
    ellipse(0, 10, 10, 12);
    // 設定昆蟲六隻腳的線條樣式。
    stroke('#344e41');
    // 繪製左上方的昆蟲腳。
    line(-3, -1, -9, -5);
    // 繪製左中間的昆蟲腳。
    line(-4, 2, -10, 3);
    // 繪製左下方的昆蟲腳。
    line(-3, 6, -8, 11);
    // 繪製右上方的昆蟲腳。
    line(3, -1, 9, -5);
    // 繪製右中間的昆蟲腳。
    line(4, 2, 10, 3);
    // 繪製右下方的昆蟲腳。
    line(3, 6, 8, 11);
    // 繪製左側觸角。
    line(-2, -11, -6, -15);
    // 繪製右側觸角。
    line(2, -11, 6, -15);
    // 移除昆蟲眼睛的外框線。
    noStroke();
    // 設定昆蟲眼睛的深色。
    fill('#283618');
    // 繪製昆蟲左眼。
    ellipse(-2, -8, 1.6, 1.6);
    // 繪製昆蟲右眼。
    ellipse(2, -8, 1.6, 1.6);
  // 繪製八隻腳的蛛形類圖示。
  } else if (iconType === 'arachnid') {
    // 設定蜘蛛身體的紫色。
    fill('#8b6aa8');
    // 繪製蜘蛛頭胸部。
    ellipse(0, -3, 10, 10);
    // 繪製蜘蛛腹部。
    ellipse(0, 7, 13, 12);
    // 設定蜘蛛腳的線條樣式。
    stroke('#57436b');
    // 繪製左側第一隻蜘蛛腳。
    line(-4, -5, -12, -10);
    // 繪製左側第二隻蜘蛛腳。
    line(-5, -2, -14, -3);
    // 繪製左側第三隻蜘蛛腳。
    line(-5, 2, -14, 5);
    // 繪製左側第四隻蜘蛛腳。
    line(-4, 6, -11, 12);
    // 繪製右側第一隻蜘蛛腳。
    line(4, -5, 12, -10);
    // 繪製右側第二隻蜘蛛腳。
    line(5, -2, 14, -3);
    // 繪製右側第三隻蜘蛛腳。
    line(5, 2, 14, 5);
    // 繪製右側第四隻蜘蛛腳。
    line(4, 6, 11, 12);
    // 移除蜘蛛眼睛的外框線。
    noStroke();
    // 設定蜘蛛眼睛的深色。
    fill('#283618');
    // 繪製蜘蛛左眼。
    ellipse(-2, -4, 1.5, 1.5);
    // 繪製蜘蛛右眼。
    ellipse(2, -4, 1.5, 1.5);
  // 繪製大螯與分節身體的甲殼類圖示。
  } else if (iconType === 'crustacean') {
    // 設定螃蟹甲殼的橘紅色。
    fill('#e98553');
    // 繪製螃蟹圓形甲殼。
    ellipse(0, 2, 21, 15);
    // 設定螃蟹螯與腳的線條顏色。
    stroke('#b85d45');
    // 繪製螃蟹左側第一隻腳。
    line(-7, 6, -12, 12);
    // 繪製螃蟹左側第二隻腳。
    line(-3, 8, -5, 14);
    // 繪製螃蟹右側第一隻腳。
    line(3, 8, 5, 14);
    // 繪製螃蟹右側第二隻腳。
    line(7, 6, 12, 12);
    // 繪製螃蟹左側螯腳。
    line(-8, -2, -13, -7);
    // 繪製螃蟹右側螯腳。
    line(8, -2, 13, -7);
    // 設定螃蟹螯的底色。
    fill('#f4a261');
    // 繪製螃蟹左側螯。
    ellipse(-14, -8, 6, 6);
    // 繪製螃蟹右側螯。
    ellipse(14, -8, 6, 6);
    // 移除螃蟹眼睛的外框線。
    noStroke();
    // 設定螃蟹眼睛的深色。
    fill('#283618');
    // 繪製螃蟹左眼。
    ellipse(-4, -1, 1.8, 1.8);
    // 繪製螃蟹右眼。
    ellipse(4, -1, 1.8, 1.8);
  // 繪製多體節與許多腳的蜈蚣圖示。
  } else if (iconType === 'myriapod') {
    // 設定蜈蚣身體的橘色。
    fill('#e98553');
    // 逐一繪製蜈蚣的身體體節。
    for (let segment = 0; segment < 5; segment += 1) {
      // 計算目前體節的水平位置。
      const segmentX = -10 + segment * 5;
      // 繪製目前的橢圓形體節。
      ellipse(segmentX, 0, 7, 9);
      // 設定蜈蚣腳的線條顏色。
      stroke('#b85d45');
      // 繪製目前體節左側的腳。
      line(segmentX - 1, 3, segmentX - 3, 9);
      // 繪製目前體節右側的腳。
      line(segmentX + 1, 3, segmentX + 3, 9);
    }
    // 移除蜈蚣眼睛的外框線。
    noStroke();
    // 設定蜈蚣眼睛的深色。
    fill('#283618');
    // 繪製蜈蚣眼睛。
    ellipse(12, -2, 2, 2);
  // 繪製章魚圓頭與腕足的軟體動物圖示。
  } else if (iconType === 'mollusk') {
    // 設定章魚身體的粉紫色。
    fill('#d98ca3');
    // 繪製章魚圓圓的頭部。
    ellipse(0, -3, 17, 18);
    // 設定章魚腕足的線條顏色。
    stroke('#bd7189');
    // 繪製章魚左側第一隻腕足。
    line(-5, 5, -12, 13);
    // 繪製章魚左側第二隻腕足。
    line(-2, 6, -6, 15);
    // 繪製章魚中間第一隻腕足。
    line(1, 6, 0, 16);
    // 繪製章魚右側第一隻腕足。
    line(4, 5, 7, 15);
    // 繪製章魚右側第二隻腕足。
    line(6, 3, 13, 11);
    // 移除章魚眼睛的外框線。
    noStroke();
    // 設定章魚眼睛的深色。
    fill('#283618');
    // 繪製章魚左眼。
    ellipse(-3, -4, 2, 2);
    // 繪製章魚右眼。
    ellipse(3, -4, 2, 2);
  // 繪製有多條觸手的刺絲胞動物珊瑚圖示。
  } else if (iconType === 'cnidarian') {
    // 設定珊瑚主體的珊瑚紅色。
    stroke('#dc765e');
    // 設定珊瑚分枝的線條粗細。
    strokeWeight(3);
    // 繪製珊瑚主幹。
    line(0, 13, 0, -5);
    // 繪製珊瑚左側分枝。
    line(0, 2, -8, -5);
    // 繪製珊瑚左側枝條。
    line(-8, -5, -9, -12);
    // 繪製珊瑚右側分枝。
    line(0, -2, 8, -9);
    // 繪製珊瑚右側枝條。
    line(8, -9, 9, -15);
    // 繪製珊瑚上方分枝。
    line(0, -5, 1, -14);
    // 設定珊瑚枝端的橘粉色。
    fill('#f4a6a0');
    // 移除珊瑚枝端圓點的外框線。
    noStroke();
    // 繪製左側觸手端點。
    ellipse(-9, -13, 5, 5);
    // 繪製右側觸手端點。
    ellipse(9, -16, 5, 5);
    // 繪製上方觸手端點。
    ellipse(1, -15, 5, 5);
  // 繪製具有環狀體節的蚯蚓圖示。
  } else if (iconType === 'annelid') {
    // 設定蚯蚓身體的橘粉色。
    fill('#db8b72');
    // 繪製蚯蚓彎曲的身體。
    ellipse(0, 1, 27, 12);
    // 設定環節線條的顏色。
    stroke('#b96f5e');
    // 設定環節線條的粗細。
    strokeWeight(1.2);
    // 繪製第一條環節分隔線。
    line(-8, -4, -8, 6);
    // 繪製第二條環節分隔線。
    line(-3, -5, -3, 7);
    // 繪製第三條環節分隔線。
    line(2, -5, 2, 7);
    // 繪製第四條環節分隔線。
    line(7, -4, 7, 6);
    // 移除蚯蚓眼睛的外框線。
    noStroke();
    // 設定蚯蚓眼睛的深色。
    fill('#283618');
    // 繪製蚯蚓眼睛。
    ellipse(12, -1, 2, 2);
  }
  // 還原圖示繪製前的畫布狀態。
  pop();
}

// 在進度條上播放飛行小精靈，並依照答對題數向前移動。
function drawFairy() {
  // 計算目前動畫顯示的精靈影格編號。
  const frameIndex = floor(frameCount / ANIMATION_INTERVAL) % FRAME_COUNT;
  // 計算目前影格在精靈圖中的起始水平像素。
  const sourceX = floor(frameIndex * flySheet.width / FRAME_COUNT);
  // 計算下一影格在精靈圖中的水平像素。
  const sourceRight = floor((frameIndex + 1) * flySheet.width / FRAME_COUNT);
  // 計算目前影格的實際寬度。
  const sourceWidth = sourceRight - sourceX;
  // 設定手機與電腦上小精靈的顯示寬度。
  const fairyWidth = screenLayout.isNarrow ? 22 : 25;
  // 設定手機與電腦上小精靈的顯示高度。
  const fairyHeight = screenLayout.isNarrow ? 21 : 23;
  // 宣告小精靈的水平顯示位置。
  let fairyX;
  // 宣告小精靈的垂直顯示位置。
  let fairyY;
  // 交卷後將小精靈移到置中成績卡片的上方。
  if (hasSubmitted) {
    // 計算置中成績卡片的頂部位置。
    const resultCardY = (height - 290) / 2;
    // 將小精靈置中在成績卡片上方。
    fairyX = width / 2 - fairyWidth / 2;
    // 將小精靈放在成績標題上方。
    fairyY = resultCardY + 3;
  // 作答期間讓小精靈沿進度條依答對比例移動。
  } else {
    // 計算進度軌道可使用的水平寬度。
    const trackWidth = width - screenLayout.padding * 2;
    // 依二十題答對比例計算小精靈沿軌道的水平中心位置。
    const fairyCenterX = screenLayout.padding + trackWidth * correctCount / TOTAL_QUESTIONS;
    // 限制小精靈中心位置，確保整張精靈圖都留在畫布內。
    const boundedCenterX = constrain(
      fairyCenterX,
      screenLayout.padding + fairyWidth / 2,
      width - screenLayout.padding - fairyWidth / 2
    );
    // 將小精靈水平位置設定為進度位置的左側邊緣。
    fairyX = boundedCenterX - fairyWidth / 2;
    // 將小精靈放在進度條上並避開標題與進度文字。
    fairyY = 89;
  }
  // 繪製目前動畫影格的小精靈。
  image(
    flySheet,
    fairyX,
    fairyY,
    fairyWidth,
    fairyHeight,
    sourceX,
    0,
    sourceWidth,
    flySheet.height
  );
}

// 逐字換行繪製題目或結果文字。
function drawWrappedText(content, x, centerY, maxWidth, lineHeight, maxLines) {
  // 建立文字換行後的每一行清單。
  const lines = [];
  // 建立目前累積中的文字行。
  let currentLine = '';
  // 逐字檢查內容是否超出可用寬度。
  for (const character of content) {
    // 合併目前行與準備加入的文字。
    const candidateLine = currentLine + character;
    // 判斷新增文字是否超過行寬。
    if (textWidth(candidateLine) > maxWidth && currentLine) {
      // 將已經完成的文字行加入行清單。
      lines.push(currentLine);
      // 將目前文字設定為新的一行。
      currentLine = character;
    // 若沒有超出行寬則繼續累積文字。
    } else {
      // 將文字加入目前行。
      currentLine = candidateLine;
    }
  }
  // 將最後尚未加入的文字行放入行清單。
  if (currentLine) {
    // 加入最後一行文字。
    lines.push(currentLine);
  }
  // 計算實際需要繪製的行數。
  const visibleLineCount = min(lines.length, maxLines);
  // 計算第一行文字的垂直位置。
  const firstLineY = centerY - (visibleLineCount - 1) * lineHeight / 2;
  // 逐行繪製可用範圍內的文字。
  for (let index = 0; index < visibleLineCount; index += 1) {
    // 繪製目前這一行題目文字。
    text(lines[index], x, firstLineY + index * lineHeight);
  }
}

// 更新並繪製高分時出現的彩帶粒子。
function drawConfetti() {
  // 逐一更新畫面中每一個彩帶粒子。
  for (let index = confettiParticles.length - 1; index >= 0; index -= 1) {
    // 取得目前正在更新的彩帶粒子。
    const particle = confettiParticles[index];
    // 更新彩帶的水平位置。
    particle.x += particle.vx;
    // 更新彩帶的垂直速度並加入重力。
    particle.vy += 0.08;
    // 更新彩帶的垂直位置。
    particle.y += particle.vy;
    // 更新彩帶的旋轉角度。
    particle.rotation += particle.spin;
    // 移除已經離開畫布底部的彩帶粒子。
    if (particle.y > height + 24) {
      // 從粒子清單移除離開畫面的彩帶。
      confettiParticles.splice(index, 1);
    // 繪製仍在畫面中的彩帶粒子。
    } else {
      // 儲存畫布目前的旋轉狀態。
      push();
      // 將繪製原點移至彩帶位置。
      translate(particle.x, particle.y);
      // 旋轉目前的彩帶粒子。
      rotate(particle.rotation);
      // 設定目前粒子的顏色。
      fill(particle.color);
      // 繪製彩帶長方形。
      rect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
      // 還原畫布的旋轉與座標狀態。
      pop();
    }
  }
}

// 在交卷後顯示成績與是否達成高分目標。
function drawResults() {
  // 設定結果卡片的最大寬度。
  const cardWidth = min(440, width - 32);
  // 設定結果卡片的高度。
  const cardHeight = 290;
  // 計算結果卡片的水平位置。
  const cardX = (width - cardWidth) / 2;
  // 計算結果卡片的垂直位置。
  const cardY = (height - cardHeight) / 2;
  // 設定淡色結果卡片底色。
  fill(THEME.surface);
  // 設定結果卡片邊線顏色。
  stroke(THEME.correct);
  // 設定結果卡片邊線粗細。
  strokeWeight(2);
  // 繪製置中的圓角成績卡片。
  rect(cardX, cardY, cardWidth, cardHeight, 22);
  // 移除結果卡片的邊線設定。
  noStroke();
  // 設定成績標題顏色。
  fill(THEME.text);
  // 設定成績標題字體大小。
  textSize(25);
  // 設定成績標題使用粗體。
  textStyle(BOLD);
  // 設定成績標題文字置中。
  textAlign(CENTER, CENTER);
  // 顯示交卷完成或時間到的標題。
  text(timeExpired ? '時間到！測驗已交卷' : '測驗完成！', width / 2, cardY + 42);
  // 根據二十題中的答對題數計算最終百分制成績。
  const finalScore = getScore();
  // 依成績是否超過八十分設定分數徽章底色。
  fill(finalScore > 80 ? THEME.correct : THEME.incorrect);
  // 繪製高分或鼓勵色的分數徽章。
  rect(width / 2 - 110, cardY + 78, 220, 64, 18);
  // 設定分數文字為深棕色以保持對比。
  fill(THEME.text);
  // 設定分數文字大小。
  textSize(54);
  // 顯示百分制測驗成績。
  text(`${finalScore} 分`, width / 2, cardY + 110);
  // 設定答錯次數說明的顏色。
  fill(THEME.muted);
  // 設定答錯次數說明的文字大小。
  textSize(17);
  // 顯示二十題答對題數與錯誤嘗試次數。
  text(`答對 ${correctCount} / ${TOTAL_QUESTIONS} 題　｜　錯誤嘗試 ${mistakeCount} 次`, width / 2, cardY + 157);
  // 設定結果回饋文字顏色。
  fill(THEME.text);
  // 設定結果回饋文字大小。
  textSize(16);
  // 顯示高分或鼓勵再次挑戰的回饋。
  text(
    timeExpired
      ? '可以重新挑戰，試著在五分鐘內完成全部題目。'
      : finalScore > 80
        ? '太棒了！你已能活用動物分類與親緣概念！'
        : '再挑戰一次，練習從分類資料推理動物親緣。',
    width / 2,
    cardY + 190
  );
  // 計算結果卡片內重新挑戰按鈕的寬度。
  const retryWidth = min(220, cardWidth - 48);
  // 計算結果卡片內重新挑戰按鈕的水平位置。
  const retryX = width / 2 - retryWidth / 2;
  // 計算結果卡片內重新挑戰按鈕的垂直位置。
  const retryY = cardY + 218;
  // 設定重新挑戰按鈕的底色。
  fill(THEME.correct);
  // 繪製結果卡片內的重新挑戰按鈕。
  rect(retryX, retryY, retryWidth, 38, 12);
  // 設定重新挑戰文字顏色。
  fill(THEME.text);
  // 設定重新挑戰文字大小。
  textSize(16);
  // 繪製重新挑戰按鈕文字。
  text('重新挑戰', width / 2, retryY + 19);
  // 記錄重新挑戰按鈕的互動範圍。
  resultButton = {
    // 設定重新挑戰按鈕的左側座標。
    x: retryX,
    // 設定重新挑戰按鈕的頂部座標。
    y: retryY,
    // 設定重新挑戰按鈕的寬度。
    w: retryWidth,
    // 設定重新挑戰按鈕的高度。
    h: 38
  };
  // 還原結果文字的粗細設定。
  textStyle(NORMAL);
  // 還原結果文字靠左的預設對齊方式。
  textAlign(LEFT, CENTER);
}

// 判斷同一個答案標籤是否已經配給所有相符題目。
function isOptionUsed(optionLabel) {
  // 計算目前關卡已經使用此答案標籤的題數。
  const solvedCount = solvedSlots.filter((answer) => answer === optionLabel).length;
  // 計算目前關卡需要此答案標籤的題目數量。
  const requiredCount = questions.filter((question) => question.answer === optionLabel).length;
  // 僅在相符題目全部完成後隱藏此答案選項。
  return solvedCount >= requiredCount;
}

// 按下滑鼠或觸控畫面時開始拖曳答案或按下按鈕。
function mousePressed() {
  // 在筆電與桌面版先處理全螢幕按鈕，結果畫面時也能切換。
  if (screenLayout && !screenLayout.isNarrow) {
    // 計算全螢幕按鈕的水平位置。
    const fullscreenButtonWidth = 112;
    // 建立全螢幕按鈕的互動範圍。
    const fullscreenButton = {
      // 設定全螢幕按鈕左側座標。
      x: width - screenLayout.padding - fullscreenButtonWidth,
      // 設定全螢幕按鈕頂部座標。
      y: 14,
      // 設定全螢幕按鈕寬度。
      w: fullscreenButtonWidth,
      // 設定全螢幕按鈕高度。
      h: 32
    };
    // 判斷是否按下全螢幕切換按鈕。
    if (isPointInside(mouseX, mouseY, fullscreenButton)) {
      // 依目前狀態切換進入或離開瀏覽器全螢幕模式。
      fullscreen(!fullscreen());
      // 避免全螢幕按鈕點擊被當成答題操作。
      return false;
    }
  }
  // 畫布初始化首影格尚未完成時忽略滑鼠事件。
  if (!screenLayout) {
    // 避免初次繪製前點擊造成版面存取錯誤。
    return false;
  }
  // 交卷後只接受重新挑戰按鈕的點擊。
  if (hasSubmitted) {
    // 判斷指標是否位於重新挑戰按鈕上。
    if (resultButton && isPointInside(mouseX, mouseY, resultButton)) {
      // 重設拼圖與成績，開始新的挑戰。
      resetQuiz();
    }
    // 交卷結果畫面不再啟動答案拖曳。
    return false;
  }
  // 尚未開始時只接受開始按鈕點擊，避免提前作答。
  if (!quizStarted) {
    // 計算一般操作按鈕的水平位置。
    const buttonX = screenLayout.isNarrow ? screenLayout.padding : width * 0.32;
    // 計算一般操作按鈕的寬度。
    const buttonWidth = screenLayout.isNarrow ? width - screenLayout.padding * 2 : width * 0.36;
    // 建立開始測驗按鈕的互動範圍。
    const startButton = {
      // 設定開始按鈕左側座標。
      x: buttonX,
      // 設定開始按鈕頂部座標。
      y: screenLayout.buttonY,
      // 設定開始按鈕寬度。
      w: buttonWidth,
      // 設定開始按鈕高度。
      h: screenLayout.buttonHeight
    };
    // 判斷指標是否按在開始測驗按鈕上。
    if (isPointInside(mouseX, mouseY, startButton)) {
      // 記錄測驗正式開始。
      quizStarted = true;
      // 從按下按鈕的當下開始計算五分鐘。
      quizStartedAt = millis();
    }
    // 開始前不接受拖曳答案或其他作答操作。
    return false;
  }
  // 拼圖完成後只接受前往下一關或最後交卷的按鈕點擊。
  if (puzzleComplete) {
    // 計算一般操作按鈕的水平位置。
    const buttonX = screenLayout.isNarrow ? screenLayout.padding : width * 0.32;
    // 計算一般操作按鈕的寬度。
    const buttonWidth = screenLayout.isNarrow ? width - screenLayout.padding * 2 : width * 0.36;
    // 建立交卷按鈕的互動範圍。
    const submitButton = {
      // 設定交卷按鈕左側座標。
      x: buttonX,
      // 設定交卷按鈕頂部座標。
      y: screenLayout.buttonY,
      // 設定交卷按鈕寬度。
      w: buttonWidth,
      // 設定交卷按鈕高度。
      h: screenLayout.buttonHeight
    };
    // 判斷指標是否按在交卷按鈕上。
    if (isPointInside(mouseX, mouseY, submitButton)) {
      // 尚有下一關時載入下一組五題。
      if (currentStage < quizStages.length - 1) {
        // 切換到下一關並保留總答對數與倒數時間。
        loadStage(currentStage + 1);
      // 最後一關完成時提交整份測驗。
      } else {
        // 完成二十題測驗並顯示最後成績。
        submitQuiz();
      }
    }
    // 拼圖完成後不再啟動答案拖曳。
    return false;
  }
  // 逐一檢查指標是否按在尚未使用的答案上。
  for (let index = 0; index < screenLayout.options.length; index += 1) {
    // 取得目前答案選項的互動範圍。
    const option = screenLayout.options[index];
    // 判斷目前答案是否已經拼上。
    const isUsed = isOptionUsed(option.label);
    // 只允許從尚未使用的答案選項開始拖曳。
    if (!isUsed && isPointInside(mouseX, mouseY, option)) {
      // 記錄目前開始拖曳的答案索引。
      draggedOption = index;
      // 停止繼續檢查其他答案選項。
      break;
    }
  }
  // 防止使用者拖曳答案時觸發瀏覽器預設操作。
  return false;
}

// 放開滑鼠或手指時檢查答案是否放入正確拼圖位置。
function mouseReleased() {
  // 沒有正在拖曳答案時不需要處理放置事件。
  if (draggedOption < 0 || !screenLayout) {
    // 結束本次放開事件的處理。
    return false;
  }
  // 取得目前被拖曳的答案文字。
  const draggedLabel = screenLayout.options[draggedOption].label;
  // 逐一檢查答案是否放在某一個尚未完成的拼圖位置。
  for (let index = 0; index < screenLayout.targets.length; index += 1) {
    // 取得目前拼圖位置的互動範圍。
    const target = screenLayout.targets[index];
    // 建立目前答案放置區的矩形範圍。
    const targetBounds = {
      // 設定答案放置區左側座標。
      x: target.targetX,
      // 設定答案放置區頂部座標。
      y: target.y + 5,
      // 設定答案放置區寬度。
      w: target.targetW,
      // 設定答案放置區高度。
      h: target.h - 10
    };
    // 忽略指標未放入或已經完成的拼圖位置。
    if (solvedSlots[index] || !isPointInside(mouseX, mouseY, targetBounds)) {
      // 繼續檢查下一個拼圖位置。
      continue;
    }
    // 判斷拖曳的文字是否符合目前拼圖題目的答案。
    if (draggedLabel === questions[index].answer) {
      // 將正確答案拼入目前位置。
      solvedSlots[index] = draggedLabel;
      // 記錄目前題目已顯示即時解析。
      explanationShown[index] = true;
      // 增加二十題測驗的總答對題數。
      correctCount += 1;
      // 設定正確作答的回饋文字。
      feedbackMessage = '答對了！請看題目卡片中的即時解析。';
      // 設定正確作答的綠色提示。
      feedbackColor = THEME.correct;
      // 判斷所有拼圖是否都已經完成。
      puzzleComplete = solvedSlots.every(Boolean);
      // 全部完成時顯示交卷提示。
      if (puzzleComplete) {
        // 設定完成本關拼圖的回饋文字。
        feedbackMessage = currentStage < quizStages.length - 1
          ? '本關完成！讀完重點整理後，進入下一關。'
          : '二十題全部完成！讀完重點整理後即可交卷。';
      }
    // 拖曳到錯誤拼圖位置時記錄一次答錯。
    } else {
      // 增加一次錯誤作答次數。
      mistakeCount += 1;
      // 記錄目前題目已顯示正確答案與即時解析。
      explanationShown[index] = true;
      // 提示作答者查看卡片中的正確答案與解析。
      feedbackMessage = `答錯了，請看第 ${currentStage * QUESTIONS_PER_STAGE + index + 1} 題解析後再試。`;
      // 設定錯誤作答的橘紅色提示。
      feedbackColor = THEME.incorrect;
    }
    // 每次放入拼圖位置後都結束位置檢查。
    break;
  }
  // 清除目前拖曳答案的索引。
  draggedOption = -1;
  // 阻止瀏覽器接手處理放開事件。
  return false;
}

// 拖曳觸控答案時阻止手機瀏覽器捲動畫面。
function touchMoved() {
  // 保留觸控拖曳給畫布使用，不觸發瀏覽器滑動。
  return false;
}

// 載入指定關卡的五題、答案選項與拼圖狀態。
function loadStage(stageIndex) {
  // 更新目前所在的關卡索引。
  currentStage = stageIndex;
  // 取得目前關卡的完整資料。
  const stage = quizStages[currentStage];
  // 設定目前關卡的題目清單。
  questions = stage.questions;
  // 設定目前關卡的可拖曳答案清單。
  answerOptions = stage.options;
  // 清空目前關卡五個拼圖位置的答案。
  solvedSlots = Array(QUESTIONS_PER_STAGE).fill(null);
  // 清除目前關卡每題的即時解析顯示狀態。
  explanationShown = Array(QUESTIONS_PER_STAGE).fill(false);
  // 清除目前拖曳的答案索引。
  draggedOption = -1;
  // 設定目前關卡的拼圖為尚未完成。
  puzzleComplete = false;
  // 清除上一題或上一關的作答提示文字。
  feedbackMessage = '';
  // 將提示文字顏色恢復為綠色。
  feedbackColor = THEME.correct;
}

// 更新五分鐘倒數，時間用完時自動交卷。
function updateQuizTimer() {
  // 停止已交卷測驗的倒數。
  if (!quizStarted || hasSubmitted) {
    // 結束本次倒數更新。
    return;
  }
  // 計算測驗開始後經過的整秒數。
  const elapsedSeconds = floor((millis() - quizStartedAt) / 1000);
  // 計算剩餘時間並確保不會低於零秒。
  timeLeftSeconds = max(0, QUIZ_TIME_LIMIT - elapsedSeconds);
  // 倒數歸零時自動提交目前成績。
  if (timeLeftSeconds === 0) {
    // 記錄本次測驗因時間用盡而結束。
    timeExpired = true;
    // 依照目前答對題數自動交卷。
    submitQuiz();
  }
}

// 將秒數格式化成分與秒的倒數顯示。
function formatTime(totalSeconds) {
  // 計算剩餘的整分鐘數。
  const minutes = floor(totalSeconds / 60);
  // 計算剩餘的秒數部分。
  const seconds = totalSeconds % 60;
  // 回傳補零後的分秒格式文字。
  return `${nf(minutes, 2)}:${nf(seconds, 2)}`;
}

// 依照二十題的答對數計算百分制成績。
function getScore() {
  // 將答對題數換算成百分比並四捨五入。
  return round(correctCount / TOTAL_QUESTIONS * 100);
}

// 提交測驗並在中央結果出現時播放彩帶。
function submitQuiz() {
  // 設定測驗已交卷並停止拖曳作答。
  hasSubmitted = true;
  // 清除可能仍在拖曳中的答案索引。
  draggedOption = -1;
  // 測驗結束後產生彩帶，搭配畫面中央的成績結果。
  launchConfetti();
}

// 根據測驗狀態清空答案並重設所有作答資訊。
function resetQuiz() {
  // 將目前關卡重設為第一關。
  currentStage = 0;
  // 將總答對題數歸零。
  correctCount = 0;
  // 將錯誤嘗試次數歸零。
  mistakeCount = 0;
  // 設定測驗倒數時間為五分鐘。
  timeLeftSeconds = QUIZ_TIME_LIMIT;
  // 設定本次測驗尚未開始，等待使用者按下開始按鈕。
  quizStarted = false;
  // 清除尚未開始測驗的計時起點。
  quizStartedAt = 0;
  // 清除時間到自動交卷的狀態。
  timeExpired = false;
  // 設定測驗為尚未交卷。
  hasSubmitted = false;
  // 清除上一局尚未消失的彩帶。
  confettiParticles = [];
  // 清除成績畫面按鈕的舊位置。
  resultButton = null;
  // 載入第一關的題目與答案。
  loadStage(0);
}

// 產生高分交卷時使用的彩帶粒子。
function launchConfetti() {
  // 設定慶祝彩帶使用的色彩清單。
  const colors = [THEME.correct, THEME.incorrect, THEME.accent, '#90caf9', '#ffb4a2'];
  // 清除可能殘留的上一批彩帶。
  confettiParticles = [];
  // 逐一建立一百二十個慶祝彩帶粒子。
  for (let index = 0; index < 120; index += 1) {
    // 加入一個具有隨機位置、速度與顏色的彩帶粒子。
    confettiParticles.push({
      // 設定彩帶粒子的隨機水平起始位置。
      x: random(width),
      // 將彩帶粒子放在畫布頂端上方。
      y: random(-height, -20),
      // 設定彩帶粒子的隨機水平速度。
      vx: random(-1.5, 1.5),
      // 設定彩帶粒子的向下初始速度。
      vy: random(1, 4),
      // 設定彩帶粒子的隨機尺寸。
      size: random(6, 12),
      // 從色彩清單隨機選擇彩帶顏色。
      color: random(colors),
      // 設定彩帶粒子的初始旋轉角度。
      rotation: random(TWO_PI),
      // 設定彩帶粒子的旋轉速度。
      spin: random(-0.08, 0.08)
    });
  }
}

// 檢查一個座標是否位於指定的矩形範圍內。
function isPointInside(pointX, pointY, bounds) {
  // 判斷水平位置是否位於矩形左右邊界之間。
  const insideX = pointX >= bounds.x && pointX <= bounds.x + bounds.w;
  // 判斷垂直位置是否位於矩形上下邊界之間。
  const insideY = pointY >= bounds.y && pointY <= bounds.y + bounds.h;
  // 只有水平與垂直都在範圍內才算命中。
  return insideX && insideY;
}

// 瀏覽器視窗尺寸改變時重新調整畫布大小。
function windowResized() {
  // 將畫布調整為最新的瀏覽器視窗大小。
  resizeCanvas(windowWidth, windowHeight);
}
