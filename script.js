const currentDateParagraph = document.getElementById("currentDate");
const currentRatesParagraph = document.getElementById("currentRates");
let apiResponse = '';
let eur, usd, cad = 1.50;

const updateTime = () => {
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toLocaleString();
  currentDateParagraph.innerText = currentDateTimeString;
}

updateTime();

setInterval(function(){
    updateTime();
}, 1000);

const apiUrl = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_hg2bXZkgXQu3MJ6HDyCsplvK1NEYjt4NtuUQYevG&currencies=EUR%2CUSD%2CCAD&base_currency=PLN';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    // Work with the JSON data returned by the API
    apiResponse = data;

    eur = apiResponse['data']['EUR']['value'].toFixed(2);
    usd = apiResponse['data']['USD']['value'].toFixed(2);
    cad = apiResponse['data']['CAD']['value'].toFixed(2);

    currentRatesParagraph.innerText = `1PLN = ${eur}EUR\n1PLN = ${usd}USD\n1PLN = ${cad}CAD`;

    document.querySelector('.submitButton').disabled = false;

  })
  .catch(error => {
    console.error('Error:', error);
  });


const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  przelicz();
});

const przelicz = () => {
    const inputValue = document.getElementById('currencyInput');
    let afterComma;
    if(inputValue.value.toString().includes('.')){
      afterComma = inputValue.value.toString().split('.')[1];

      if (afterComma.length>2){
        currentRatesParagraph.innerText = "niepoprawne dane";
      }else{
        const number = inputValue.value;
        currentRatesParagraph.innerText = `${number}PLN = ${(eur*number).toFixed(2)}EUR\n${number}PLN = ${(usd*number).toFixed(2)}USD\n${number}PLN = ${(cad*number).toFixed(2)}CAD`
      }
    }else{
      const number = inputValue.value;
      currentRatesParagraph.innerText = `${number}PLN = ${(eur*number).toFixed(2)}EUR\n${number}PLN = ${(usd*number).toFixed(2)}USD\n${number}PLN = ${(cad*number).toFixed(2)}CAD`
    }
}