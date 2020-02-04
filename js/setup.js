'use strict';

var KeyCodes = {
  ENTER: 13,
  ESC: 27
};

var wizardsFeatures = {
  QUANTITY: 4,
  NAME: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  SURNAME: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLOR: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLOR: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  FIREBALL_COLOR: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < wizardsFeatures.QUANTITY; i++) {
    wizards.push({
      name: getRandomItem(wizardsFeatures.NAME) + ' ' + getRandomItem(wizardsFeatures.SURNAME),
      coatColor: getRandomItem(wizardsFeatures.COAT_COLOR),
      eyesColor: getRandomItem(wizardsFeatures.EYES_COLOR)
    });
  }
  return wizards;
};


var createWizard = function (template, wizard) {
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  wizards.forEach(function (wizard) {
    fragment.appendChild(createWizard(similarWizardTemplate, wizard));
  });
  return fragment;
};

var renderSimilarWizard = function () {
  var wizards = generateWizards(wizardsFeatures);
  var similarWizards = getWizards(wizards);
  var wizardContainer = document.querySelector('.setup-similar');
  var similarListElement = wizardContainer.querySelector('.setup-similar-list');
  similarListElement.appendChild(similarWizards);
  wizardContainer.classList.remove('hidden');
};
renderSimilarWizard();

// открытие окна


var setupWindow = document.querySelector('.setup');
var wizardName = setupWindow.querySelector('.setup-user-name');
var openWindow = document.querySelector('.setup-open');
var closeWindow = setupWindow.querySelector('.setup-close');
var escPress = function (evt) {
  if (evt.keyCode === KeyCodes.ESC && evt.target !== wizardName) {
    closeSetup();
  }
};

var openSetup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', escPress);
};
var closeSetup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', escPress);
};
openWindow.addEventListener('click', openSetup);
openWindow.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    openSetup();
  }
});
closeWindow.addEventListener('click', closeSetup);
closeWindow.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    closeSetup();
  }
});

// валидация

wizardName.addEventListener('invalid', function () {
  if (wizardName.validity.tooShort) {
    wizardName.setCustomValidity('В имени должно быть минимум 2 символа');
  } else if (wizardName.validity.tooLong) {
    wizardName.setCustomValidity('В имени должно быть не более 25 символов');
  } else if (wizardName.validity.valueMissing) {
    wizardName.setCustomValidity('Заполните это поле');
  }
});

// настройка
var wizardCoat = setupWindow.querySelector('.wizard-coat');
var wizardEyes = setupWindow.querySelector('.wizard-eyes');
var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');

var setRandomCoatColor = function () {
  wizardCoat.style.fill = getRandomItem(wizardsFeatures.COAT_COLOR);
};
var setRandomEyesColor = function () {
  wizardEyes.style.fill = getRandomItem(wizardsFeatures.EYES_COLOR);
};
var setRandomFireballColor = function () {
  wizardFireball.style.background = getRandomItem(wizardsFeatures.FIREBALL_COLOR);
};
wizardCoat.addEventListener('click', setRandomCoatColor);
wizardEyes.addEventListener('click', setRandomEyesColor);
wizardFireball.addEventListener('click', setRandomFireballColor);
