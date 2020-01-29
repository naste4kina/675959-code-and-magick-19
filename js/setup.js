'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
  SURNAME:[
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
};

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var wizards = [];

for (var i = 0; i < wizardsFeatures.QUANTITY; i++) {
  wizards.push({
    name: getRandomItem(wizardsFeatures.NAME) + ' ' + getRandomItem(wizardsFeatures.SURNAME),
    coatColor: getRandomItem(wizardsFeatures.COAT_COLOR),
    eyesColor: getRandomItem(wizardsFeatures.EYES_COLOR)
  });
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

var similarListElement = userDialog.querySelector('.setup-similar-list');

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
