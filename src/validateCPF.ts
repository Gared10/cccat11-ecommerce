function removeNonDigits(cpf: string){
  return cpf.replace(/\D/g,"");
}

function isValidLength(cpf: string){
  return cpf.length === 11;
}

function allDigitsTheSame(cpf: string){
  return cpf.split("").every(c => c === cpf[0])
}

function calculateDigit(cpf: string, factor: number){
  let total: number = 0
  for(const digit of cpf){
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const rest: number = total % 11
  return rest < 2 ? 0 : 11 - rest 
}

function isUndefinedValue(cpf: string){
  return cpf === null || cpf === undefined;
}

export function validate (cpf: string) {
  if(isUndefinedValue(cpf)) return false;
  cpf = removeNonDigits(cpf);
  if (!(isValidLength(cpf))) return false;
  if (allDigitsTheSame(cpf)) return false;  
  const firstDigit: number = calculateDigit(cpf, 10);
  const secondDigit: number = calculateDigit(cpf, 11);
  let actualCheckDigit = cpf.slice(9);
  const calculatedDigit = `${firstDigit}${secondDigit}`  
  return actualCheckDigit === calculatedDigit;
}