//------------------------1.Aşama - //Question constructor - Soru Kalıbı oluşturma 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
//Question constructor [kanstraktor] // Soru kalıbı yukarıdaki şekilde oluşmuş oldu.


//-------------------------3.Aşama -//Question prototype oluşturma aşaması
//Soruların doğrı cevaplanıp cevaplanmadığını kontrol için prototype oluşturulur.
//Doğru cevap ile verilen cevabın tip değeri true -false olarak karşılaştırılır.
Question.prototype.checkAnswer=function (answer) {
    return this.answer === answer;
}

//console yardımı ile  bu arada cvep kontrolü yapılabilir.
//console.log(q1.checkAnswer("New York"))

//-------------------------5.Aşama -  Quiz Consructor 
// Burada Quiz ouşturuldu. Burada soru dizini oluşturulur ve doğru cevap sayısına göre bir score ortaya çıkacak. 
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;  
}

//-------------------------6.Aşama -  Quiz Prototype
//Quiz proto type ile index değeri baz alınarak soru baştan itibaren sorulmaya başlanır.
//Sorularun sorulması sıra ile ya da random olarak sorulabilir.
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
} 

//-------------------------7.Aşama -  Quiz  isFinish Quizin bitişini kontrol eder. 
//Quizin bitip bitmediği ile ilgili true ya da false değer karşımıza çıkar.
Quiz.prototype.isFinish = function () {
    return this.questions.length=== this.questionIndex
} 

//-------------------------8.Aşama -  Quiz guess metodu - tahmin belirlenmesi
Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();
// Soruyu cevaplayanın o andaki soruya vereceği cevapla doğru cevap karşılaştırılır ve bu skora yansıtılr.
// Bu yolla daha sonraki soruya getQuestion yöntemiile gidilmiş olur.
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
} 

// console.log(quiz.isFinish()); //Quiz bitti mi diye soruyoruz...

// console.log(quiz.getQuestion()); //Quiz kullanıcı karşısına çıkarılıyor. 10 soru olduğu için 10 kere yazıldı.
// quiz.guess('Javascript'); //Bir tahminde bulunup skor değerini değiştirmeye çalışacak.

// console.log(quiz.getQuestion()); //Quiz kullanıcı karşısına çıkarılıyor.
// quiz.guess('Javascript'); //Bir tahminde bulunup skor değerini değiştirmeye çalışacak.

// console.log(quiz.getQuestion()); //Quiz kullanıcı karşısına çıkarılıyor.
// quiz.guess('Javascript'); //Bir tahminde bulunup skor değerini değiştirmeye çalışacak.


// console.log(quiz.score)  //Quiz skorunu soruyoruz..
// console.log(quiz.isFinish()); //Quiz bitti mi diye soruyoruz...



//-------------------------2.Aşama
//
var q1 = new Question("What is the capital city of the USA?", ["New York","Chicago", "Dallas", "Washington D.C."], "Washington D.C.");
var q2 = new Question("What is the capital city of the Kazakhstan?", ["Almatı", "Ulanbatur", "Nur-Sultan", "Cimkent"], "Nur-Sultan");
var q3 = new Question("What is the capital city of the Spain?", ["Zaragoza", "Barcelona", "Madrid", "Sevilla"], "Madrid");
var q4 = new Question("What is the capital city of the Scotland?", ["Edinburgh", "Glasgow", "Dundee", "Aberdeen"],"Edinburgh");
var q5 = new Question("What is the capital city of the Egypt?", ["Alexandria", "Port Said", "Giza", "Cairo"],"Cairo");
var q6 = new Question("What is the capital city of the Australia?", ["Canberra", "Sydney", "Melbourne", "Brisbane"],"Canberra");
var q7 = new Question("What is the capital city of the India?", ["Bombay", "Calcutta", "New Delhi", "Madras"],"New Delhi");
var q8 = new Question("What is the capital city of the Japan?", ["Osaka", "Kyoto", "Tokyo", "Hiroshima"],"Tokyo");
var q9 = new Question("What is the capital city of the Saudi Arabia?", ["Jeddah", "Riyadh", "Mecca", "Medina"],"Riyadh");
var q10 = new Question("What is the capital city of the Brazil", ["Brasília", "Rio de Janeiro", "Curitiba", "São Paulo"],"Brasília");

var questions=[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10] //Questions Array-  Soru Dizisi

//-------------------------4.Aşama ile kontrol edelim
console.log(q1.checkAnswer('New York'));
console.log(q1.checkAnswer('Washington D.C.'));

console.log(q2.checkAnswer('Almatı'));
console.log(q2.checkAnswer('Nur-Sultan'));


//-------------------------9.Aşama -  Start Quiz
//Buradan quiz başlatılarak aşamalar. kontrol edilir.
//isFinish bitmiş mi kontrol edilip ona göre true ve false değerleri aranarak quiz devam ettirilir.
//

var quiz = new Quiz(questions);
loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;
        //console.log(choices);
        document.querySelector('#question').textContent = question.text;
        
        for (var i = 0; i<choices.length; i++){
            console.log(choices[i]);
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess("btn"+i, choices[i])
        }
        showPrpgress();
    }
}

function guess(id,guess) {
    var btn = document.getElementById(id);
    btn.onclick=function () {
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore() {
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    
    document.querySelector('.card-body').innerHTML = html;
}

function showPrpgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;
    document.querySelector('#progress').innerHTML = 'Question ' + questionNumber + ' of ' + totalQuestion;
}
