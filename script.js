// ==========================
// KanjiMate Main System
// FINAL VERSION 1 / 4
// ==========================



// ==========================
// 한자 데이터
// ==========================


const kanjiList =
(typeof n3Kanji !== "undefined")
?
n3Kanji
:
[];




// ==========================
// 현재 위치
// ==========================


let current = 0;





// ==========================
// 사용자 데이터
// ==========================


let userData;


try{


userData =
JSON.parse(
localStorage.getItem("kanjiMate")
);



}
catch(e){


userData = null;


}




if(
!userData ||
!Array.isArray(userData.learned)
){


userData =
{

level:1,

exp:0,

learned:[]

};


}








// ==========================
// 저장
// ==========================


function saveData(){


localStorage.setItem(

"kanjiMate",

JSON.stringify(userData)

);


}









// ==========================
// 화면 업데이트
// ==========================


function updateScreen(){



let level =
document.getElementById(
"level"
);



let exp =
document.getElementById(
"exp"
);



let learned =
document.getElementById(
"learnedCount"
);



let progress =
document.getElementById(
"progressBar"
);





if(level){

level.innerText =
userData.level;

}





if(exp){

exp.innerText =
userData.exp;

}





if(learned){

learned.innerText =
userData.learned.length;

}





if(progress){


let percent = 0;



if(kanjiList.length > 0){


percent =
(
userData.learned.length
/
kanjiList.length
)
*
100;


}



progress.style.width =
percent+"%";


}






if(
document.getElementById(
"kanji"
)
){


showKanji();


}





showBook();


updateGrowth();



}









// ==========================
// 한자 표시
// ==========================


function showKanji(){



let data =
kanjiList[current];



if(!data) return;





let ids = {


kanji:"kanji",

meaning:"meaning",

onyomi:"onyomi",

kunyomi:"kunyomi",

words:"words",

example:"example"


};





if(
document.getElementById(ids.kanji)
){

document.getElementById(ids.kanji)
.innerText =
data.kanji;


}





if(
document.getElementById(ids.meaning)
){

document.getElementById(ids.meaning)
.innerText =
data.meaning;


}





if(
document.getElementById(ids.onyomi)
){

document.getElementById(ids.onyomi)
.innerText =
data.onyomi;


}





if(
document.getElementById(ids.kunyomi)
){

document.getElementById(ids.kunyomi)
.innerText =
data.kunyomi || "없음";


}





if(
document.getElementById(ids.words)
){

document.getElementById(ids.words)
.innerHTML =
(data.words || [])
.join("<br>");


}





if(
document.getElementById(ids.example)
){

document.getElementById(ids.example)
.innerText =
data.example || "";


}



}









// ==========================
// 다음 한자
// ==========================


function nextKanji(){



current++;




if(
current >= kanjiList.length
){


current = 0;


}



showKanji();



}









// ==========================
// 한자 학습 완료
// ==========================


function remember(isKnow){



let data =
kanjiList[current];



if(!data) return;





if(!isKnow){


alert(
"📖 다시 복습해봐요!"
);


return;


}






if(
userData.learned.includes(
data.kanji
)
){


alert(
"이미 학습한 한자입니다."
);



return;


}






userData.learned.push(
data.kanji
);




addExp(10);




alert(

"📚 "
+
data.kanji
+
" 학습 완료!\n+10 EXP"

);




saveData();


updateScreen();



}

// ==========================
// KanjiMate Main System
// FINAL VERSION 2 / 4
// ==========================





// ==========================
// 한자 도감
// ==========================


function showBook(){



let book =
document.getElementById(
"book"
);



if(!book) return;





if(
userData.learned.length === 0
){


book.innerHTML =
"아직 학습한 한자가 없습니다.";


return;


}





book.innerHTML =

userData.learned

.map(

item =>

"✅ " + item

)

.join("<br>");



}








// ==========================
// 학습 화면
// ==========================



let studyIndex = 0;






function loadStudy(){



let data =
kanjiList[studyIndex];



let box =
document.getElementById(
"studyList"
);



if(
!box ||
!data
){

return;

}






box.innerHTML = `



<div class="study-box">



<h1>

${data.kanji}

</h1>




<h2>

${data.meaning}

</h2>




<p>

음독 : ${data.onyomi}

</p>




<p>

훈독 : ${data.kunyomi || "없음"}

</p>




<h3>

단어

</h3>




<p>

${(data.words || []).join("<br>")}

</p>




<p>

예문 :
${data.example || ""}

</p>




<button onclick="completeStudy()">

✅ 학습 완료

</button>




<p>

${studyIndex + 1}
/
${kanjiList.length}

</p>




</div>





<button onclick="prevStudy()">

⬅ 이전

</button>




<button onclick="nextStudy()">

다음 ➡

</button>



`;




}









function nextStudy(){



if(
studyIndex < kanjiList.length - 1
){


studyIndex++;


}



loadStudy();



}









function prevStudy(){



if(
studyIndex > 0
){


studyIndex--;


}



loadStudy();



}









// ==========================
// 학습 완료 처리
// ==========================


function completeStudy(){



let data =
kanjiList[studyIndex];



if(!data) return;





if(
userData.learned.includes(
data.kanji
)
){



alert(
"이미 학습한 한자입니다."
);



return;



}






userData.learned.push(
data.kanji
);




addExp(10);




alert(
"📚 학습 완료!\n+10 EXP"
);




saveData();


updateScreen();



}









// ==========================
// 퀴즈 시스템
// ==========================



let quizAnswer = "";

let quizScore = 0;

let quizCount = 0;







function startQuiz(){



quizScore = 0;


quizCount = 0;



nextQuiz();



}









function nextQuiz(){



if(
kanjiList.length === 0
){

return;

}






let random =

Math.floor(

Math.random()
*
kanjiList.length

);






let question =

kanjiList[random];






quizAnswer =
question.meaning;







let choices = [

question.meaning

];







while(
choices.length < 4
){



let randomData =

kanjiList[

Math.floor(

Math.random()
*
kanjiList.length

)

];






if(
!choices.includes(
randomData.meaning
)
){


choices.push(
randomData.meaning
);


}



}









choices.sort(

()=>Math.random()-0.5

);








let html = `



<h2>

문제 ${quizCount + 1}

</h2>




<h1>

${question.kanji}

</h1>




<p>

뜻을 선택하세요

</p>




`;









choices.forEach(choice=>{


html += `



<button class="quiz-btn">

${choice}

</button>




<br>




`;



});








let quizBox =

document.getElementById(
"quizBox"
);







if(quizBox){



quizBox.innerHTML =
html;






let buttons =

quizBox.querySelectorAll(
".quiz-btn"
);






buttons.forEach(button=>{



button.onclick = function(){



checkAnswer(
this.innerText
);



};



});





}



}









function checkAnswer(answer){





if(
answer === quizAnswer
){



quizScore++;



addExp(20);




alert(
"🎉 정답!\n+20 EXP"
);



}



else{



alert(

"😢 오답!\n정답 : "

+
quizAnswer

);



}






quizCount++;







if(
quizCount < 10
){



nextQuiz();



}



else{



let quizBox =

document.getElementById(
"quizBox"
);





if(quizBox){



quizBox.innerHTML = `



<h2>

🎉 퀴즈 종료!

</h2>




<p>

점수 :
${quizScore}/10

</p>




<button onclick="startQuiz()">

다시하기

</button>




`;



}



}



}

// ==========================
// KanjiMate Main System
// FINAL VERSION 3 / 4
// ==========================





// ==========================
// EXP / 레벨 시스템
// ==========================



function addExp(amount){



userData.exp += amount;






while(
userData.exp >= 100
){



userData.level++;



userData.exp -= 100;






alert(

"🎉 LEVEL UP!\nLv."

+
userData.level

);



}






saveData();



updateGrowth();



}









// ==========================
// 성장 시스템
// ==========================



function updateGrowth(){



let growthLevel =
userData.level;



let growthExp =
userData.exp;



let learnedCount =
userData.learned.length;








let levelBox =

document.getElementById(
"growthLevel"
);






if(levelBox){



levelBox.innerText =
growthLevel;



}









let expBox =

document.getElementById(
"growthExp"
);






if(expBox){



expBox.innerText =
growthExp;



}









let countBox =

document.getElementById(
"growthCount"
);






if(countBox){



countBox.innerText =
learnedCount;



}









let growthBar =

document.getElementById(
"growthBar"
);






if(growthBar){



growthBar.style.width =
growthExp + "%";



}









let title =

document.getElementById(
"title"
);






if(title){



if(
growthLevel >= 10
){



title.innerText =
"🏆 한자 마스터";



}



else if(
growthLevel >= 5
){



title.innerText =
"📚 N3 도전자";



}



else if(
growthLevel >= 3
){



title.innerText =
"🌱 한자 탐험가";



}



else{



title.innerText =
"🐣 한자 새싹";



}



}



}








// ==========================
// 초기 성장 데이터 표시
// ==========================



function resetGrowth(){



userData.level = 1;


userData.exp = 0;


userData.learned = [];



saveData();



updateScreen();



}

// ==========================
// KanjiMate Main System
// FINAL VERSION 4 / 4
// ==========================





// ==========================
// 화면 이동
// ==========================



const navItems =

document.querySelectorAll(
"nav button"
);






navItems.forEach(item=>{



item.addEventListener(
"click",
()=>{



let page =

item.dataset.page;







document
.querySelectorAll(".page")
.forEach(section=>{



section.style.display =
"none";



});









let target =

document.getElementById(
page
);







if(target){



target.style.display =
"block";



}









if(page === "growth"){



updateGrowth();



}









if(page === "study"){



loadStudy();



}









if(page === "quiz"){



startQuiz();



}







}

);



});









// ==========================
// 버튼 전역 연결
// ==========================



window.startQuiz =

startQuiz;





window.checkAnswer =

checkAnswer;





window.nextKanji =

nextKanji;





window.remember =

function(isKnow){


remember(isKnow);


};





window.nextStudy =

nextStudy;





window.prevStudy =

prevStudy;





window.completeStudy =

completeStudy;









// ==========================
// 페이지 초기 설정
// ==========================



document.addEventListener(
"DOMContentLoaded",
()=>{



updateScreen();





}

);
