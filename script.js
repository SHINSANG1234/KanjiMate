const kanjiList = [
  {
    kanji: "学",
    meaning: "배우다",
    onyomi: "がく",
    kunyomi: "まなぶ",
    words: [
      "学校（がっこう） - 학교",
      "学生（がくせい） - 학생",
      "大学（だいがく） - 대학"
    ]
  },
  {
    kanji: "生",
    meaning: "살다, 태어나다",
    onyomi: "せい",
    kunyomi: "いきる",
    words: [
      "先生（せんせい） - 선생님",
      "学生（がくせい） - 학생",
      "人生（じんせい） - 인생"
    ]
  },
  {
    kanji: "時",
    meaning: "시간",
    onyomi: "じ",
    kunyomi: "とき",
    words: [
      "時間（じかん） - 시간",
      "時計（とけい） - 시계",
      "時々（ときどき） - 가끔"
    ]
  }
];

let current = 0;


function nextKanji(){

  current++;

  if(current >= kanjiList.length){
    current = 0;
  }


  const item = kanjiList[current];


  document.querySelector(".kanji").innerHTML = item.kanji;

  document.querySelector(".card h3").innerHTML = item.meaning;


  const text = `
  음독 : ${item.onyomi}<br>
  훈독 : ${item.kunyomi}<br><br>

  ${item.words.join("<br>")}
  `;


  document.querySelector(".card").innerHTML += 
  `<p>${text}</p>`;

}
