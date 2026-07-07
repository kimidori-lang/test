//const problems = [{word:"5",read:"t",meanings:["5"]}]; //eruda.hide();
if (!localStorage.hasOwnProperty("answer")){
　localStorage.answer = "{}";
};
if (!localStorage.hasOwnProperty("answerCount")){
　localStorage.answerCount = "0";
};
if (!localStorage.hasOwnProperty("likes")){
　localStorage.likes = "[]";
};
const page = document.createElement("div");
const startButton = document.createElement("div");
const problemAmountBox = document.createElement("input");
const text1 = document.createElement("div");
const modeChangeButton = document.createElement("div");
const text2 = document.createElement("div");
const likeToggle = document.createElement("div");
const text3 = document.createElement("div");
const continueButton = document.createElement("div");
page.id = "page";
document.body.append(page);
startButton.innerText = "Start";
startButton.style.cssText = "border-radius:15px;color:white;text-align:center;font-size:150%;border:solid;background-color:#0cc3ca;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80%;";
startButton.id = "startButton";
startButton.addEventListener("click",c => {
　const valueBox = document.getElementById("problemAmountBox");
　const problemLength = valueBox.valueAsNumber;
　const mode = document.getElementById("modeChangeButton").ariaLevel;
　if (problemLength === -1005){
　　console.log("debug mode")
　　const meaning = document.createElement("div");
　　const read = document.createElement("div");
　　const debugButton = document.getElementById("problemAmountBox");
　　const duplicate = document.createElement("div");
　　const answerCount = document.createElement("div");
　　const word = document.createElement("div");
　　let meaningCount = 0;
　　let readCount = 0;
　　let wordCount = 0;
　　const missMeaning = [];
　　const missRead = [];
　　const wordList = [];
　　const duplicateWords = [];
　　const missWordBack = [];
　　duplicate.innerText = "not duplicate";
　　for(let i = 0;i < problems.length;++i){
　　　const e = problems[i];
　　　if (e.word){
　　　　wordList.push(e.word);
　　　　++wordCount;
　　　} else missWordBack.push(problems[i - 1]?.word);
　　　if (Array.isArray(e.meanings)) ++meaningCount;
　　　else missMeaning.push(e.word);
　　　if (typeof e.read === "string") ++readCount;
　　　else missRead.push(e.word);
　　};
　　for (i in wordList){
　　　const list = [...wordList];
　　　const word = list[i];
　　　list.splice(i,1);
　　　if (list.includes(word)){
　　　　duplicateWords.push(word);
　　　};
　　};
　　if (duplicateWords.length > 0){
　　　duplicate.innerText = "is duplicate";
　　　duplicate.style.cssText = "background-color:red;";
　　　console.log("duplicateWords:",duplicateWords);
　　};
　　meaning.innerText = `mean:${meaningCount}/${problems.length}`;
　　read.innerText = `read:${readCount}/${problems.length}`;
　　word.innerText = `word:${wordCount}/${problems.length}`;
　　answerCount.innerText = `count:${getStorage("answerCount")}`;
　　debugButton.type = "text";
　　debugButton.value = "";
　　debugButton.addEventListener("selectionchange",ev => {
　　　const t = document.getElementById("startButton");
　　　let isInclude = false;
　　　for (e of problems){
　　　　if (e.word === ev.target.value){
　　　　　isInclude = true;
　　　　　break;
　　　　};
　　　};
　　　if (isInclude){
　　　　t.style.cssText = `${t.style.cssText}background-color:lime;`;
　　　　add(t)
　　　} else {
　　　　t.style.cssText = `${t.style.cssText}background-color:red;`;
　　　　add(t);
　　　};
　　});
　　if (missMeaning.length > 0){
　　　console.log("MissMeaningWords:",missMeaning);
　　　meaning.style.cssText = "background-color:red;";
　　};
　　if (missRead.length > 0){
　　　console.log("MissReadWords:",missRead);
　　　read.style.cssText = "background-color:red;";
　　};
　　if (missWordBack.length > 0){
　　　console.log("missWordsBack:",missWordBack);
　　　word.style.cssText = "background-color:red;";
　　};
　　word.style.cssText = `${word.style.cssText}position:relative;x-index:10;font-weight:1000;-webkit-text-stroke:0.01px black;`;
　　meaning.style.cssText = `${meaning.style.cssText}position:relative;x-index:10;font-weight:1000;-webkit-text-stroke:0.01px black;`;
　　read.style.cssText = `${read.style.cssText}position:relative;x-index:10;font-weight:1000;-webkit-text-stroke:0.01px black;`;
　　duplicate.style.cssText = `${duplicate.style.cssText}position:relative;x-index:10;font-weight:1000;-webkit-text-stroke:0.01px black;`;
　　answerCount.style.cssText = `${answerCount.style.cssText}position:relative;x-index:10;font-weight:1000;-webkit-text-stroke:0.01px black;`;
　　add(word);
　　add(meaning);
　　add(read);
　　add(debugButton);
　　add(duplicate);
　　add(answerCount);
　　return;
　};
　const likeToggle = document.getElementById("likeToggle")?.ariaLevel;
　pageAllClear();
　let newProblems = randomSort(problems);
　if (likeToggle === "on") newProblems = randomSort(problems.filter(e => getStorage("likes").includes(e.word)));
　if (Number.isFinite(problemLength) && problemLength > 0 && problemLength <= newProblems.length) newProblems.length = problemLength;
　showProblem({newProblems:newProblems,failureProblems:[],index:0,success:0,runCount:1,mode:mode,like:likeToggle === "on"});
});
setStorage("likes",getStorage("likes").filter(e => problems.some(E => E.word === e)));
const mostWrongProblems = [];
const answers = getStorage("answer");
for (key in answers){
　if (!problems.some(obj => obj.word === key)){
　　delete answers[key];
　};
};
setStorage("answer",answers);
const keys = Object.keys(answers);
for (let i = 0;i < keys.length;++i){
  const key = keys[i];
	const e = getStorage("answer",key);
	if (e.correct - e.wrong < 0){
		mostWrongProblems.push(problems[problems.findIndex(e => e.word === key)]);
　};
};
mostWrongProblems.sort((a,b) => {
	const answer = getStorage("answer");
	const wordB = answer[b.word];
	const wordA = answer[a.word];
	return (wordB.correct - wordB.wrong) - (wordA.correct - wordA.wrong);
});
if (mostWrongProblems.length > 20) mostWrongProblems.length = 20;
if (mostWrongProblems.length > 0){
	const button = document.createElement("div");
	button.id = "mostWrongProblemButton";
	button.innerText = `最も間違えた問題(${mostWrongProblems.length}問)`;
	button.style.cssText = "border-radius:15px;color:white;text-align:center;font-size:x-large;border:solid;background-color:#0cc3ca;position:absolute;top:95%;left:50%;transform:translate(-50%,-50%);width:80%;";
	button.addEventListener("click",ev => {
		showProblem({newProblems:randomSort(mostWrongProblems),failureProblems:[],index:0,success:0,runCount:1,mode:document.getElementById("modeChangeButton").ariaLevel,mostWrongProblem:true});
　});
　add(button);
};
likeToggle.addEventListener("click",ev => {
　const t = ev.target;
　const text = document.getElementById("text1");
　const box = document.getElementById("problemAmountBox");
　if (t.ariaLevel === "off"){
　　const length = getStorage("likes").length;
　　t.ariaLevel = "on";
　　t.innerText = "ON";
　　text.innerText = `問題数(最大${length})`;
　　box.value = `${length}`;
　} else if (t.ariaLevel === "on"){
　　const length = problems.length;
　　t.ariaLevel = "off";
　　t.innerText = "OFF";
　　text.innerText = `問題数(最大${length})`;
　　box.value = `${length}`;
　};
　pushAnimation(t);
　add(t);
　add(text);
　add(box);
});
if (getStorage("playData")){
　continueButton.id = "continueButton";
　continueButton.innerText = "続きから";
　continueButton.style.cssText = "border-radius:15px;color:white;background-color:#0cc3ca;text-align:center;position:absolute;top:64%;left:50%;border:solid;transform:translate(-50%,-50%);width:100px;";
　continueButton.addEventListener("click",ev => {
　console.log(getStorage("playData"))
　　showProblem(getStorage("playData"));
　});
　add(continueButton);
};
likeToggle.id = "likeToggle";
likeToggle.ariaLevel = "off";
likeToggle.innerText = "OFF";
likeToggle.style.cssText = "align-content:center;height:30px;border-radius:15px;font-size:x-large;text-align:center;position:absolute;top:11%;left:20%;transform:translate(-50%,-50%);background-color:#ff9b00;border:solid;width:100px;color:white;";
if (getStorage("likes").length > 0){
　add(likeToggle);
　add(text3);
};
modeChangeButton.addEventListener("click",ev => {
　const t = ev.target;
　if (t.ariaLevel === "1"){
　　t.ariaLevel = "2";
　　t.innerText = "日➡英";
　} else {
　　t.ariaLevel = "1";
　　t.innerText = "ノーマル";
　};
　pushAnimation(t);
　add(t);
});
modeChangeButton.innerText = "ノーマル";
modeChangeButton.style.cssText = "align-content:center;height:30px;border-radius:15px;color:white;background-color:#ff9b00;font-size:x-large;text-align:center;border:solid;position:absolute;top:11%;left:80%;transform:translate(-50%,-50%);width:100px;";
modeChangeButton.ariaLevel = "1";
modeChangeButton.id = "modeChangeButton";
text1.id = "text1";
text1.innerText = `問題数(最大${problems.length})`;
text1.style.cssText = "position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);";
text2.innerText = "モード";
text2.style.cssText = "position:absolute;top:5%;left:80%;transform:translate(-50%,-50%);";
text3.innerText = "お気に入り";
text3.style.cssText = "position:absolute;top:5%;left:20%;transform:translate(-50%,-50%);";
problemAmountBox.type = "number";
problemAmountBox.id = "problemAmountBox";
problemAmountBox.defaultValue = problems.length;
problemAmountBox.style.cssText = "border-radius:15px;background-color:#dadedf;font-size:large;text-align:center;position:absolute;top:30%;left:50%;transform:translate(-50%,50%);";
add(startButton);
add(problemAmountBox);
add(text1);
add(modeChangeButton);
add(text2);function showProblem(obj){
let i = obj.index;
const newProblems = obj.newProblems;
const failureProblems = obj.failureProblems;
let success = obj.success;
let runCount = obj.runCount;
const mode = obj.mode;
const likeProblem = obj.like;
pageAllClear();
if (i < newProblems.length){
　const word = document.createElement("div");
　const textBox = document.createElement("input");
　const submitButton = document.createElement("button");
　const indexText = document.createElement("div");
　word.id = "word";
　if (mode === "1"){
　　word.innerText = newProblems[i].word;
　　word.style.cssText = "font-size:x-large;position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);";
　} else {
　　const nowProblem = newProblems[i];
　　let wordMeanings = nowProblem.meanings.filter(e => {
　　　let excludeKana = true;
　　　for (str of e){
　　　　const unicode = str.charCodeAt(0);
　　　　if (unicode >= 12450 && unicode <= 12529){
　　　　　excludeKana = false;
　　　　　break;
　　　　};
　　　};
　　　return excludeKana;
　　});
　　if (wordMeanings.length <= 0) word.innerText = nowProblem.meanings.join();
　　else word.innerText = wordMeanings.join();
　　word.style.cssText = `text-align:center;position:absolute;top:30%;left:50%;width:95%;`;
　};
　textBox.id = "textBox";
　textBox.style.cssText = "border-radius:15px;backgound-color:#dadedf;font-size:large;text-align:center;position:absolute;top:30%;left:50%;transform:translate(-50%,50%);";
　submitButton.innerText = "送信";
　submitButton.id = "submitButton";
　submitButton.style.cssText = "border-radius:15px;position:absolute;top:30%;left:50%;transform:translate(128px,14px);height:25px;";
　submitButton.addEventListener("click",() => {
　　const answeredTextBox = document.getElementById("textBox");
　　const button = document.getElementById("submitButton");
　　const meanings = document.createElement("div");
　　const answeredIndexText = document.getElementById("indexText");
　　const nextButton = document.createElement("div");
　　const read = document.createElement("div");
　　const like = document.createElement("div");
　　const nowProblem = newProblems[i];
  　  const storage = getStorage("answer");
　　const filterMeanings = nowProblem.meanings.map(e => e.replaceAll(/\(.*?\)/g,""));
　　let answerCheck = mode === "1" ? filterMeanings.includes(document.getElementById("textBox").value?.trim()) : nowProblem.word === document.getElementById("textBox").value?.trim();
　　if (answerCheck){
　　　button.innerText = "️〇";
　　　button.style.cssText = `${button.style.cssText}background-color:#4dc764;`;
　　　answeredTextBox.style.cssText = `${answeredTextBox.style.cssText}background-color:#4dc764;`;
　　　++success;
　　　if (!storage.hasOwnProperty(nowProblem.word)) storage[nowProblem.word] = {correct:1,wrong:0};
　　　else ++storage[nowProblem.word].correct;
　　} else {
　　　button.innerText = "✖︎";
　　　button.style.cssText = `${button.style.cssText}background-color:#d90429;`;
　　　answeredTextBox.style.cssText = `${answeredTextBox.style.cssText}background-color:#d90429;`;
　　　failureProblems.push(newProblems[i]);
　　　if (!storage.hasOwnProperty(nowProblem.word)) storage[nowProblem.word] = {correct:0,wrong:1};
　　　else ++storage[nowProblem.word].wrong;
　　};
　　setStorage("answer",storage);
　　setStorage("answerCount",getStorage("answerCount") + 1);
　　answeredTextBox.readOnly = true;
　　button.style.cssText
　　meanings.innerText = mode === "1" ? newProblems[i].meanings.join() : newProblems[i].word;
　　meanings.id = "meanings";
　　meanings.style.cssText = "position:absolute;top:41%;left:10%;width:80%;";
　　if (mode === "2") meanings.style.cssText = `${meanings.style.cssText}text-align:center;`;
　　read.innerText = `${newProblems[i].read}`;
　　read.style.cssText = "text-align:center;color:#b8bdbe;font-size:large;position:absolute;top:39%;left:50%;transform:translate(-50%,-50%);width:100%;";
　　answeredIndexText.innerText = `${++i}/${newProblems.length}`;
　　nextButton.innerText = "Next";
　　nextButton.style.cssText = "border-radius:15px;color:white;text-align:center;font-size:xxx-large;border:solid;background-color:#0cc3ca;position:absolute;top:90%;left:50%;transform:translate(-50%,-50%);width:80%;";
　　nextButton.id = "nextButton";
　　const newObj = {newProblems:newProblems,failureProblems:failureProblems,index:i,success:success,runCount:runCount,mode:mode,mostWrongProblem:obj.mostWrongProblem,like:likeProblem};
　　nextButton.addEventListener("click",() => {
　　　showProblem(newObj);
　　},{once:true});
　　if (getStorage("likes").includes(newProblems[i - 1].word)){
　　　like.innerText = "★";
　　　like.ariaLevel = "on";
　　} else {
　　　like.innerText = "☆";
　　　like.ariaLevel = "off";
　　};
　　like.style.cssText = "align-content:center;border-radius:15px;font-size:xx-large;text-align:center;position:absolute;top:10%;left:90%;transform:translate(-50%,-50%);border:solid;color:white;background-color:#ff9b00;width:40px;height:40px;";
　　like.addEventListener("click",ev => {
　　　const t = ev.target;
　　　let likes = getStorage("likes");
　　　const nowWord = newProblems[i - 1].word;
　　　if (t.ariaLevel === "off"){
　　　　t.ariaLevel = "on";
　　　　t.innerText = "★";
　　　　if (!likes.includes(nowWord)) likes.push(nowWord);
　　　} else if (t.ariaLevel === "on"){
　　　　t.ariaLevel = "off";
　　　　t.innerText = "☆";
　　　　if (likes.includes(nowWord)) likes = likes.filter(e => e !== nowWord);
　　　};
　　　pushAnimation(t);
　　　add(t);
　　　setStorage("likes",likes);
　　});
　　add(answeredTextBox);
　　add(button);
　　add(meanings);
　　add(answeredIndexText);
　　add(nextButton);
　　add(read);
　　add(like);
　　setStorage("playData",newObj);
　},{once:true});
　indexText.innerText = `${i}/${newProblems.length}`;
　indexText.cssText = "font-size:large;";
　indexText.id = "indexText";
　add(word);
　add(textBox);
　add(submitButton);
　add(indexText);
　if (mode === "2"){
　　const newWord = document.getElementById("word");
　　newWord.style.cssText = `${newWord.style.cssText}transform:translate(-50%,-${newWord.getBoundingClientRect().height - 5}px)`;
　　add(newWord);
　};
} else {
　const text1 = document.createElement("div");
　const text2 = document.createElement("div");
　const text3 = document.createElement("div");
　const text4 = document.createElement("div");
　const text5 = document.createElement("div");
　text1.innerText = "正解数";
　text1.style.cssText = "position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);";
　text2.innerText = `${success}/${newProblems.length}`;
　text2.style.cssText = "font-size:xxx-large;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);";
　text3.innerText = `${runCount}回目`;
　text3.style.cssText = "font-size:medium;position:absolute;top:40%;left:50%;transform:translate(-50%,-200%);";
　text4.innerText = `${(100*(success/newProblems.length)).toFixed(1)}%`;
　text4.style.cssText = "font-size:xx-large;position:absolute;top:50%;left:50%;transform:translate(-50%,100%);";
　text5.style.cssText = "text-align:center;width:100%;font-size:xxx-large;position:absolute;top:10%;left:50%;transform:translate(-50%,-50%);";
　if (success >= newProblems.length){
　　text2.style.cssText = `${text2.style.cssText}color:#4dc764;`;
　　text4.style.cssText = `${text4.style.cssText}color:#4dc764;font-size:xxx-large;font-weight:bold;`;
　} else if (success <= 0){
　　text4.style.cssText = `${text4.style.cssText}color:#d90429;`;
　};
　if (mode === "1") text5.innerText = "ノーマルモード";
　　else text5.innerText = "日➡英モード";
　if (likeProblem === true) text5.innerText = `${text5.innerText}★`;
　add(text1);
　add(text2);
　add(text3);
　add(text4);
　add(text5);
　if (obj.mostWrongProblem){
　　const subTitle = document.createElement("div");
　　subTitle.innerText = "最も間違えた問題";
　　subTitle.style.cssText = "text-align:center;width:100%;font-size:xx-large;position:absolute;top:20%;left:50%;transform:translate(-50%,-50%);";
　　add(subTitle);
　};
　if (failureProblems.length > 0){
　　const newObj2 = {newProblems:randomSort(failureProblems),failureProblems:[],index:0,success:0,runCount:++runCount,mode:mode,mostWrongProblem:obj.mostWrongProblem,like:likeProblem};
　　const newProblemButton = document.createElement("div");
　　newProblemButton.innerText = "間違えた問題";
　　newProblemButton.style.cssText = "border-radius:15px;color:white;text-align:center;font-size:xxx-large;border:solid;background-color:#0cc3ca;position:absolute;top:90%;left:50%;transform:translate(-50%,-50%);width:80%;";
　　newProblemButton.id = "nextButton";
　　newProblemButton.addEventListener("click",() => {
　　　showProblem(newObj2);
　　},{once:true});
　　add(newProblemButton);
　　setStorage("playData",newObj2);
　} else localStorage.removeItem("playData");
};
};

function getStorage(str,str2){
　if (localStorage[str] == null) return;
　const storage = JSON.parse(localStorage[str]);
　let element;
　if (str2){
　　element = storage[str2];
　} else {
　　element = storage;
　};
　return element;
};

function setStorage(str,e){
　localStorage[str] = JSON.stringify(e);
　return localStorage[str];
};

function randomSort(arr){
const list = [...arr];
for (let i = list.length - 1;i >= 0;i--){
　let set = Math.trunc((Math.random() * (i + 1)));
　const index = list[i];
　list[i] = list[set];
　list[set] = index;
};
return list;
};

function pushAnimation(t){
return t.animate([{offset:0,transform:"translate(-50%,-50%)"},{offset:0.2,scale:0.9,transform:"translate(-55%,-55%)"},{offset:0.6,scale:1.1,transform:"translate(-45%,-45%)"},{offset:1,scale:1,transform:"translate(-50%,-50%)"}],50);
};

function pageAllClear(){
document.getElementById("page").replaceChildren();
};

function add(e){
const page = document.getElementById("page");
page.append(e);
return document.body.append(page);
};