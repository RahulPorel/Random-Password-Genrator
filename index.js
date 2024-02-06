const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const form = document.getElementById("passGeneratorForm");
const passwordDisplay = document.getElementById("password-display");

const UpperCase_Char_Codes = arrayFromLowToHigh(65, 90);
const LowerCase_Char_Codes = arrayFromLowToHigh(97, 122);
const Numbers_Char_Codes = arrayFromLowToHigh(48, 57);
const Symbols_Char_Codes = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCode = LowerCase_Char_Codes;
  if (includeUppercase) charCode = charCode.concat(UpperCase_Char_Codes);
  if (includeNumbers) charCode = charCode.concat(Numbers_Char_Codes);
  if (includeSymbols) charCode = charCode.concat(Symbols_Char_Codes);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCode[Math.floor(Math.random() * charCode.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}
