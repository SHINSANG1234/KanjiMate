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

// 하단 메뉴 이동 기능

const navItems = document.querySelectorAll(".bottom-nav button");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        document.querySelectorAll(".page").forEach(section=>{
            section.style.display="none";
        });


        const target = document.getElementById(page);

        if(target){
            target.style.display="block";
        }

    });

});

// ==========================
// 학습 탭 기능
// ==========================

let studyIndex = 0;

let learnedKanji = JSON.parse(
localStorage.getItem("learnedKanji")
) || [];



function loadStudy(){

const data = n3Kanji[studyIndex];


document.getElementById("studyList").innerHTML = `

<div class="study-box">

<h1>${data.kanji}</h1>

<h2>${data.meaning}</h2>


<p>
음독 : ${data.onyomi}
</p>


<p>
훈독 : ${data.kunyomi || "없음"}
</p>


<h3>단어</h3>

<p>
${data.words.join("<br>")}
</p>


<p>
예문 :
${data.example}
</p>


<button onclick="completeStudy()">
✅ 학습 완료
</button>


<p>
${studyIndex + 1} / ${n3Kanji.length}
</p>


</div>


<button onclick="prevKanji()">
⬅ 이전
</button>


<button onclick="nextStudyKanji()">
다음 ➡
</button>

`;

}




function nextStudyKanji(){

if(studyIndex < n3Kanji.length-1){

studyIndex++;

}

loadStudy();

}




function prevKanji(){

if(studyIndex > 0){

studyIndex--;

}

loadStudy();

}




function completeStudy(){

let current = n3Kanji[studyIndex].kanji;


if(!learnedKanji.includes(current)){

learnedKanji.push(current);

localStorage.setItem(
"learnedKanji",
JSON.stringify(learnedKanji)
);

}


updateGrowth();


alert("학습 완료! 🎉");

}




function updateGrowth(){

let count = learnedKanji.length;


document.getElementById("learnedCount").innerText=count;


document.getElementById("progressBar").style.width =
(count / n3Kanji.length * 100)+"%";

}




// 학습 버튼 클릭 시 실행

document.querySelector(
'[data-page="study"]'
).addEventListener(
"click",
function(){

loadStudy();

});

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


let randomIndex = 
Math.floor(Math.random()*n3Kanji.length);


let question = n3Kanji[randomIndex];


quizAnswer = question.meaning;



let choices = [
question.meaning
];



while(choices.length < 4){

let random =
n3Kanji[
Math.floor(Math.random()*n3Kanji.length)
].meaning;


if(!choices.includes(random)){

choices.push(random);

}

}



choices.sort(
()=>Math.random()-0.5
);



let html = `


<h2>
문제 ${quizCount+1}
</h2>


<h1>
${question.kanji}
</h1>


<p>
뜻을 고르세요
</p>



`;



choices.forEach(choice=>{


html += `

<button onclick="checkAnswer('${choice}')">

${choice}

</button>

<br>

`;

});



document.getElementById("quizBox").innerHTML = html;



}




function checkAnswer(answer){


if(answer === quizAnswer){


quizScore++;


addExp(20);


alert(
"🎉 정답! +20 EXP"
);


}else{


alert(
"😢 오답!\n정답: "
+ quizAnswer
);


}



quizCount++;



if(quizCount < 10){

nextQuiz();


}else{


document.getElementById("quizBox").innerHTML = `


<h2>
퀴즈 종료!
</h2>


<p>
점수:
${quizScore} / 10
</p>


<button onclick="startQuiz()">

다시하기

</button>


`;

}


}

function addExp(amount){

let exp =
Number(
localStorage.getItem("exp")
) || 0;


exp += amount;


localStorage.setItem(
"exp",
exp
);


let expBox =
document.getElementById("exp");


if(expBox){

expBox.innerText = exp;

}

}


// 버튼 연결
window.startQuiz = startQuiz;
window.checkAnswer = checkAnswer;
