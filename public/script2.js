window.addEventListener("load", function () {
  var image = document.getElementById("image");
  var mask = document.getElementById("mask");
  var background = document.getElementById("background");

  var canvas = document.getElementById("canvaVideo");
  var context = canvas.getContext("2d");

  var width = 500;
  var height = 650;

  context.drawImage(mask, 0, 0, width, height);
  var data = context.getImageData(0, 0, width, height);
  var i = 0;

  while (i < data.data.length) {
    var rgb = data.data[i++] + data.data[i++] + data.data[i++];
    data.data[i++] = rgb / 3;
  }

  context.putImageData(data, 0, 0);
  context.globalCompositeOperation = "source-out";
  context.drawImage(image, 0, 0, width, height);
  context.globalCompositeOperation = "destination-over";
  context.drawImage(background, 0, 0, width, height);
});
