// KanjiMate 학습 데이터
// 나중에 이 부분을 N3 200개 데이터로 확장

const kanjiList = [

{
kanji:"学",
meaning:"배우다",
onyomi:"がく",
kunyomi:"まなぶ"
},

{
kanji:"生",
meaning:"나다, 살다",
onyomi:"せい",
kunyomi:"いきる"
},

{
kanji:"先",
meaning:"먼저",
onyomi:"せん",
kunyomi:"さき"
},

{
kanji:"時",
meaning:"시간",
onyomi:"じ",
kunyomi:"とき"
},

{
kanji:"日",
meaning:"날, 해",
onyomi:"にち",
kunyomi:"ひ"
}

];



// 현재 위치

let current = 0;



// 저장 데이터

let userData = JSON.parse(
localStorage.getItem("kanjiMate")
)
||
{

level:1,
exp:0,
learned:[]

};





// 화면 업데이트

function updateScreen(){


document.getElementById("level").innerText =
userData.level;


document.getElementById("exp").innerText =
userData.exp;


document.getElementById("learnedCount").innerText =
userData.learned.length;



let percent =
(userData.learned.length / 200) * 100;


document.getElementById("progressBar").style.width =
percent+"%";



showKanji();


showBook();


}







// 한자 표시

function showKanji(){


let data = kanjiList[current];


document.getElementById("kanji").innerText =
data.kanji;


document.getElementById("meaning").innerText =
data.meaning;


document.getElementById("onyomi").innerText =
data.onyomi;


document.getElementById("kunyomi").innerText =
data.kunyomi;


}







// 다음 한자

function nextKanji(){


current++;


if(current >= kanjiList.length){

current=0;

}


showKanji();


}







// 학습 완료

function remember(isKnow){


let data =
kanjiList[current];



if(isKnow){



if(!userData.learned.includes(data.kanji)){


userData.learned.push(data.kanji);


userData.exp +=10;


checkLevel();


saveData();


}



alert(
"🎉 "+data.kanji+" 학습 완료!\n+10 EXP"
);



}



else{


alert(
"💪 다시 한번 복습해봐요!"
);


}



updateScreen();


}







// 레벨 시스템

function checkLevel(){


if(userData.exp >=100){


userData.level++;

userData.exp=0;


alert(
"🎉 LEVEL UP!"
);


}


}







// 저장

function saveData(){


localStorage.setItem(

"kanjiMate",

JSON.stringify(userData)

);


}







// 도감

function showBook(){


let book =
document.getElementById("book");


if(userData.learned.length===0){


book.innerHTML =
"아직 학습한 한자가 없습니다.";


return;

}



book.innerHTML =
userData.learned
.map(k=>"✅ "+k)
.join("<br>");



}





// 시작

updateScreen();
