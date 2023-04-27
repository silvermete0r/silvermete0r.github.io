let form = document.forms.calculator;

form.money.oninput = calculate;
form.months.onchange = calculate;
form.interest.oninput = calculate;
form.banks.onchange = changeInterest;

function changeInterest() {
  form.interest.value = form.banks.value;
  calculate();
}

function calculate() {
  let initial = +form.money.value;
  if (!initial) return;

  let interest = form.interest.value * 0.01;

  if (!interest) return;

  let years = form.months.value / 12;
  if (!years) return;

  let result = Math.round(initial * (1 + interest) ** years);

  let height = result / form.money.value * 100 + 'px';
  document.getElementById('height-after').style.height = height;
  document.getElementById('money-before').innerHTML = form.money.value  + ' ₸';
  document.getElementById('money-after').innerHTML = result + ' ₸';
  document.getElementById("result").innerHTML = result - form.money.value  + ' ₸';
}

calculate();