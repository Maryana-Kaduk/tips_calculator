const billInput = document.querySelector('#billInput');
const numberOfPeopleInput = document.querySelector('#numberOfPeopleInput');

const customPersantage = document.querySelector('.custom');

const tipAmount = document.querySelector('#tipAmount .sum');
const total = document.querySelector('#total .sum');

const calculate = document.querySelector('.calculate');
const tipRadios = document.querySelectorAll('input[type="radio"]');

const numberOfPeopleSection = document.querySelector('.number__of-people')


for(const radio of tipRadios) {
    customPersantage.addEventListener('focus', function() {
        if(anyRadioButtonChecked()) {
            radio.checked = false;
        } 
        buttonNotDisabled()
    })

    radio.addEventListener('click', function() {
        buttonNotDisabled()
        customPersantage.value = ''
    })

}

for(const input of [customPersantage, billInput, numberOfPeopleInput]) {
    input.addEventListener('input', function() {
        buttonNotDisabled()
    })
}

numberOfPeopleInput.addEventListener('input', function() {
    error()
    // buttonNotDisabled()
})

function error() {
    if(+numberOfPeopleInput.value == 0) {
        numberOfPeopleSection.classList.add('error')
    } else {
        numberOfPeopleSection.classList.remove('error')
    }
}

function buttonNotDisabled() {
    if((billInput.value !== '0' && billInput.value !== '') && (numberOfPeopleInput.value !== '0' && numberOfPeopleInput.value !== '') && (anyRadioButtonChecked() || (customPersantage.value !== '' && customPersantage.value !== '0'))) {
        calculate.disabled = false;
    } else {
        calculate.disabled = true;
    }
}

function anyRadioButtonChecked() {
    let result;

    for(const input of tipRadios) {
        if(input.checked) {
            result = true;
        }
    }

    return result
}


function calculation() {
    let tipPersantage;
    let tipPerPerson;
    let totalPerPerson;
    
    const billAmount = parseFloat(billInput.value)
    const numberOfPeople = parseFloat(numberOfPeopleInput.value)
    const selectedRadioTip = document.querySelector('input[type="radio"]:checked')?.value || customPersantage.value || 0
    
    if(selectedRadioTip === document.querySelector('input[type="radio"]:checked')?.value) {
        tipPersantage = Number(selectedRadioTip.slice(0, -1)) / 100
    
        totalPerPerson = (Math.round((billAmount + billAmount*tipPersantage)/numberOfPeople *100)/100).toFixed(2)
        total.textContent = totalPerPerson
    
        tipPerPerson = (Math.round(billAmount*tipPersantage/numberOfPeople *100)/100).toFixed(2)
        tipAmount.textContent = tipPerPerson
    
    } else if(selectedRadioTip === customPersantage.value) {
        tipPersantage = Number(selectedRadioTip) / 100
    
        totalPerPerson = (Math.round((billAmount + billAmount*tipPersantage)/numberOfPeople *100)/100).toFixed(2)
        total.textContent = totalPerPerson
    
        tipPerPerson = (Math.round(billAmount*tipPersantage/numberOfPeople *100)/100).toFixed(2)
        tipAmount.textContent = tipPerPerson
    } else {
        total.textContent = (Math.round(billAmount/numberOfPeople *100)/100).toFixed(2)
    }
}

calculate.addEventListener('click', function() {
    calculation()
})