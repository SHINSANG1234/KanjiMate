// KanjiMate 앱 데이터 연결

const kanjiList = n3Kanji;


// 현재 한자 위치

let current = 0;



// 사용자 저장 데이터

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
percent + "%";



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


if(data.words){


document.getElementById("words").innerHTML =
data.words.join("<br>");


}


}





// 다음 한자

function nextKanji(){


current++;


if(current >= kanjiList.length){

current = 0;

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


userData.exp += 10;


levelCheck();


saveData();


alert(
"🎉 "+data.kanji+" 학습 완료!\n+10 EXP"
);


}


}


else{


alert(
"📚 다시 복습해봐요!"
);


}



updateScreen();


}







// 레벨업

function levelCheck(){


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
.map(item=>"✅ "+item)
.join("<br>");



}





// 시작

updateScreen();
