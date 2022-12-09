const typingText = document.querySelector(".typing-text p"),
titleText = document.querySelector(".title h2"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer, wpm,
maxTime = 2,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
	let randIndex = Math.floor(Math.random() * paragraphs.length);
	typingText.innerHTML = "";
	paragraphs[randIndex].split("").forEach(span => {
		let spanTag = `<span>${span}</span>`;
		typingText.innerHTML += spanTag;
	});
	typingText.querySelectorAll("span")[0].classList.add("active");
	document.addEventListener("keydown", () => inpField.focus());
	typingText.addEventListener("click", () => inpField.focus());
	titleText.innerText = titles[randIndex];
}

function initTyping() {
	const characters = typingText.querySelectorAll("span");
	let typedChar = inpField.value.split("")[charIndex];
	
	if(charIndex < characters.length - 1 && timeLeft > 0) {
		if(!isTyping) {
			timer = setInterval(initTimer, 1000);
			isTyping = true;
		}
		if(typedChar == null) {
			charIndex--;
			if(characters[charIndex].classList.contains("incorrect")){
				mistakes--;
			}
			characters[charIndex].classList.remove("correct", "incorrect");
		} else {
			if(characters[charIndex].innerText === typedChar) {
				characters[charIndex].classList.add("correct");
			} else {
				mistakes++;
				characters[charIndex].classList.add("incorrect");
			}
			charIndex++;
		}

		characters.forEach(span => span.classList.remove("active"));
		characters[charIndex].classList.add("active");

		wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
		wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
		mistakeTag.innerText = mistakes;
		wpmTag.innerText = wpm;
		cpmTag.innerText = charIndex - mistakes;
	} else {
		let accuracy = ((charIndex - mistakes) * 100 / charIndex).toFixed(1);
		let resultText = 'Дәлдік деңгейі: <b>' + accuracy + '</b>% <br>Минутына Терілген Сөз саны: <b>' + wpm + '</b> сөз<br>Минутына Терілген Таңба саны: <b>' + (charIndex - mistakes) + '</b> таңба';
		let resultTitle = '';
		if(wpm < 40) {
			resultTitle = '<strong>Жарайсыз, Жақсы Нәтиже!</strong>';
		} else if(wpm < 60) {
			resultTitle = '<strong>Жарайсыз, Керемет Нәтиже!</strong>';
		} else {
			resultTitle = '<strong>Жарайсыз, Таңғаларлық Нәтиже!</strong>';
		}
		Swal.fire({
		  title: resultTitle,
		  icon: 'success',
		  html: resultText,
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:'Жалғастыру'
		});
		inpField.value = "";
		clearInterval(timer);
	}
}

function initTimer() {
	if(timeLeft > 0){
		timeLeft--;
		timeTag.innerText = timeLeft;
	} else {
		clearInterval(timer);
	}
}

function resetGame() {
	randomParagraph();
	inpField.value = "";
	clearInterval(timer);
	timeLeft = maxTime,
	charIndex = mistakes = isTyping = 0;
	timeTag.innerText = timeLeft;
	mistakeTag.innerText = mistakes;
	wpmTag.innerText = 0;
	cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);