const canvas = document.querySelector('canvas');
const mask = document.getElementById('mask')
const video = document.getElementById("video");

const fps = 60;
const width = 500;
const height = 650;
let canvasInterval = null;

function drawImage() {
  canvas.getContext('2d', { alpha: false }).drawImage(video, 0, 0, width, height);
}

  var newVid = document.createElement("video");
  newVid.src = video.src;

  






canvasInterval = window.setInterval(() => {
  drawImage(video);
}, 1000 / fps);



video.onloadstart = function (e) {
  video.play();
};

video.onpause = function() {
  clearInterval(canvasInterval);
};
video.onended = function() {
  clearInterval(canvasInterval);
};
video.onplay = function() {
  clearInterval(canvasInterval);
  canvasInterval = window.setInterval(() => {
    drawImage(video);
  }, 1000 / fps);
};