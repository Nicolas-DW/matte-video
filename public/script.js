window.addEventListener("load", function () {
  const canvas = document.querySelector("canvas");
  const mask = document.getElementById("maskVideo");
  const video = document.getElementById("colorVideo");
  var background = document.getElementById("background");

  var context = canvas.getContext("2d");


  const fps = 60;
  const width = 500;
  const height = 650;
  let canvasInterval = null;

  video.play();
  mask.play();

  function drawImage() {
      context.drawImage(mask, 0, 0, width, height);
      var data = context.getImageData(0, 0, width, height);
      var i = 0;
      while (i < data.data.length) {
        var rgb = data.data[i++] + data.data[i++] + data.data[i++];
        data.data[i++] = rgb / 3;
      }
      context.putImageData(data, 0, 0);
      context.globalCompositeOperation = "source-out";
      context.drawImage(video, 0, 0, width, height);
      context.globalCompositeOperation = "destination-over";
      context.drawImage(background, 0, 0, width, height);
  }



  //  ------------------
  // context.drawImage(mask, 0, 0, width, height);
  // var data = context.getImageData(0, 0, width, height);
  // var i = 0;

  // while (i < data.data.length) {
  //   var rgb = data.data[i++] + data.data[i++] + data.data[i++];
  //   data.data[i++] = rgb / 3;
  // }
  //  ------------------



  canvasInterval = window.setInterval(() => {
    drawImage(video, mask);
  }, 1000 / fps);

  video.onloadstart = function (e) {
    video.play();
  };

  video.onpause = function () {
    clearInterval(canvasInterval);
  };
  video.onended = function () {
    clearInterval(canvasInterval);
  };
  video.onplay = function () {
    clearInterval(canvasInterval);
    canvasInterval = window.setInterval(() => {
      drawImage(video, mask);
    }, 1000 / fps);
  };
});
