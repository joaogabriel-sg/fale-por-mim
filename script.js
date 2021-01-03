const selectVoices = document.querySelector('select#voices');
const cardsContainer = document.querySelector('.cards');
const btnInsertText = document.querySelector('.btn-insert-text');

const modalContainer = document.querySelector('.modal-container');
const modalTextarea = document.querySelector('textarea#my-message');
const btnModalSpeak = document.querySelector('.btn-modal-speak');
const btnCloseModal = document.querySelector('.close-modal');

const speechSynthesis = window.speechSynthesis;

let voices = [];

const exampleCards = [
  { source: './images/hungry.jpg', name: 'Estou com fome' },
  { source: './images/thirsty.jpg', name: 'Estou com sede' },
  { source: './images/happy.jpg', name: 'Estou feliz' },
  { source: './images/sad.jpg', name: 'Estou triste' },
  { source: './images/angry.jpg', name: 'Estou com raiva' },
  { source: './images/tired.jpg', name: 'Estou cansado' },
  { source: './images/injured.jpg', name: 'Estou machucado' },
  { source: './images/playing.jpg', name: 'Estou brincando' },
  { source: './images/home.jpg', name: 'Quero ir para casa' },
  { source: './images/park.jpg', name: 'Quero ir ao parque' },
  { source: './images/grandmother.jpg', name: 'Quero ir na vovó' },
  { source: './images/grandfather.jpg', name: 'Quero ir no vovô' },
];

const showModal = () => {
  modalContainer.classList.add('show');
}

const hideModal = () => {
  modalContainer.classList.remove('show');
}

const speakThePhrase = (phrase) => {
  const [ lang, voiceName ] = 
    selectVoices.selectedOptions[0].value.split(' | ');
    
  const utterThis = new SpeechSynthesisUtterance(phrase);
  utterThis.lang = lang;

  for (let voice of voices) {
    if (voice.name === voiceName) utterThis.voice = voice;
  }
  
  speechSynthesis.speak(utterThis);
}

const speakModalPhrases = () => {
  const phrase = modalTextarea.value;
  speakThePhrase(phrase);
}

const speakExamplesPhrase = ({ dataset: { phrase } }) => {
  speakThePhrase(phrase);
}

const createOptionsTemplate = (acc, { lang, name }) => {
  return acc += `<option>${lang} | ${name}</option>`;
}

const populateVoicesList = () => {
  voices = speechSynthesis.getVoices();

  const optionsTemplate = voices.reduce(createOptionsTemplate, '');
  selectVoices.innerHTML = optionsTemplate;
}

const createCardsTemplate = (acc, { source, name }) => {
  return acc += `
    <button class="card" data-phrase="${name}" onclick="speakExamplesPhrase(this)">
      <div class="card-img-container">
        <img src="${source}" alt="${name}">
      </div>
      <h2 class="card-title">${name}</h2>
    </button>
  `;
}

const insertCardsIntoDOM = () => {
  const cardsTemplate = exampleCards.reduce(createCardsTemplate, '');
  cardsContainer.innerHTML = cardsTemplate;
}

insertCardsIntoDOM();

speechSynthesis.addEventListener('voiceschanged', populateVoicesList);
btnModalSpeak.addEventListener('click', speakModalPhrases);
btnInsertText.addEventListener('click', showModal);
btnCloseModal.addEventListener('click', hideModal);
