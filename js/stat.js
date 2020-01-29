'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var HORIZONTAL_MARGIN = 55;
var VERTICAL_MARGIN = 15;
var FONT_SIZE = 16;
var LINE_HEIGHT = FONT_SIZE * 1.25;
var BAR_MAX_HEIGHT = 150;
var BAR_MARGIN = 50;
var statX = CLOUD_X + HORIZONTAL_MARGIN;
var statY = CLOUD_Y + VERTICAL_MARGIN;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomNum = function (min, max) {
  return Math.random() * (max - min) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');


  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillText('Ура вы победили!', statX, statY);
  ctx.fillText('Список результатов:', statX, statY + LINE_HEIGHT);

  var maxTime = getMaxElement(times);
  var currentBarHeight;
  var histogramY = statY + LINE_HEIGHT + FONT_SIZE + VERTICAL_MARGIN;

  for (var i = 0; i < names.length; i++) {
    currentBarHeight = BAR_MAX_HEIGHT * Math.round(times[i]) / maxTime;

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText(Math.round(times[i]), statX + (BAR_WIDTH + BAR_MARGIN) * i, histogramY + BAR_MAX_HEIGHT - currentBarHeight);
    ctx.textBaseline = 'bottom';
    ctx.fillText(names[i], statX + (BAR_WIDTH + BAR_MARGIN) * i, histogramY + LINE_HEIGHT + BAR_MAX_HEIGHT + LINE_HEIGHT);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(getRandomNum(0, 100)) + '%, 50%)';
    }

    ctx.fillRect(statX + (BAR_WIDTH + BAR_MARGIN) * i, histogramY + LINE_HEIGHT + BAR_MAX_HEIGHT - currentBarHeight, BAR_WIDTH, currentBarHeight);
  }

};
