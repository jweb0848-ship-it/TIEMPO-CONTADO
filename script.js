/* === PARTE 1: CONVERSOR === */
const inputTop = document.getElementById('inputTop');
const unitTop = document.getElementById('unitTop');
const inputBottom = document.getElementById('inputBottom');
const unitBottom = document.getElementById('unitBottom');
const timeRates = { seconds: 1, minutes: 60, hours: 3600, days: 86400 };
let rawValTop = 0, rawValBottom = 0;

function formatHumanTime(val, unit) {
    if (!val && val !== 0) return "";
    val = parseFloat(val.toFixed(4)); 
    if (unit === 'hours') {
        const hrs = Math.floor(val);
        const mins = Math.round((val - hrs) * 60);
        if (mins === 60) return `${hrs + 1} horas`;
        if (hrs === 0) return `${mins} minutos`;
        if (mins === 0) return `${hrs} horas`;
        return `${hrs} hrs y ${mins} min`;
    }
    if (unit === 'days') {
        const days = Math.floor(val);
        const hrs = Math.round((val - days) * 24);
        if (hrs === 24) return `${days + 1} días`;
        if (days === 0) return `${hrs} horas`;
        if (hrs === 0) return `${days} días`;
        return `${days} días y ${hrs} hrs`;
    }
    if (unit === 'minutes') return `${val} minutos`;
    if (unit === 'seconds') return `${val} segundos`;
    return val;
}

function calculateDown() {
    let val = parseFloat(inputTop.value);
    if (isNaN(val)) { inputBottom.value = ""; return; }
    rawValTop = val;
    const result = (val * timeRates[unitTop.value]) / timeRates[unitBottom.value];
    rawValBottom = result;
    inputBottom.value = formatHumanTime(result, unitBottom.value);
    inputBottom.classList.add('is-result');
    inputTop.classList.remove('is-result');
}

function calculateUp() {
    let val = parseFloat(inputBottom.value);
    if (isNaN(val)) { inputTop.value = ""; return; }
    rawValBottom = val;
    const result = (val * timeRates[unitBottom.value]) / timeRates[unitTop.value];
    rawValTop = result;
    inputTop.value = formatHumanTime(result, unitTop.value);
    inputTop.classList.add('is-result');
    inputBottom.classList.remove('is-result');
}

inputTop.addEventListener('focus', () => {
    if (inputTop.classList.contains('is-result')) { inputTop.value = rawValTop; inputTop.classList.remove('is-result'); inputTop.select(); }
});
inputBottom.addEventListener('focus', () => {
    if (inputBottom.classList.contains('is-result')) { inputBottom.value = rawValBottom; inputBottom.classList.remove('is-result'); inputBottom.select(); }
});
inputTop.addEventListener('input', calculateDown);
inputBottom.addEventListener('input', calculateUp);
unitTop.addEventListener('change', calculateDown);
unitBottom.addEventListener('change', calculateDown);

/* === PARTE 2: SUMAR HORAS === */
const startTimeInput = document.getElementById('startTime');
const addHoursInput = document.getElementById('addHours');
const addMinutesInput = document.getElementById('addMinutes');
const endTimeResult = document.getElementById('endTimeResult');

function calculateEndTime() {
    const timeValue = startTimeInput.value; 
    if (!timeValue) return;
    let [baseH, baseM] = timeValue.split(':').map(Number);
    const addH = parseInt(addHoursInput.value) || 0;
    const addM = parseInt(addMinutesInput.value) || 0;
    const date = new Date();
    date.setHours(baseH); date.setMinutes(baseM);
    date.setHours(date.getHours() + addH);
    date.setMinutes(date.getMinutes() + addM);
    let finalH = date.getHours().toString().padStart(2, '0');
    let finalM = date.getMinutes().toString().padStart(2, '0');
    endTimeResult.textContent = `${finalH}:${finalM}`;
}
startTimeInput.addEventListener('input', calculateEndTime);
addHoursInput.addEventListener('input', calculateEndTime);
addMinutesInput.addEventListener('input', calculateEndTime);
calculateEndTime();

/* === PARTE 3: ESTACIONAMIENTO === */
const parkingInput = document.getElementById('parkingInput');
const parkingResult = document.getElementById('parkingResult');
const pricePerHour = 10; 

function calculateParking() {
    let hours = parseFloat(parkingInput.value);
    if (isNaN(hours) || hours < 0) { parkingResult.textContent = "$ 0.00"; return; }
    const totalCost = hours * pricePerHour;
    parkingResult.textContent = `$ ${totalCost.toFixed(2)}`;
}
parkingInput.addEventListener('input', calculateParking);
calculateParking();