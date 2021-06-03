window.addEventListener("load", function () {

  // creation des éléments
  var canvas = document.createElement("canvas"),
    video = document.createElement("video"),
    mask = document.createElement("video"),
    background = document.createElement("img");

  var context = canvas.getContext("2d");

  // Tous les attributs des éléments créés
  canvas.setAttribute("id", "canvas")
  canvas.setAttribute("width", "500");
  canvas.setAttribute("height", "650");
  background.setAttribute("src", "video/background.png")
  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("id", "colorVideo");
  video.setAttribute("loop", "");
  video.src = "video/color_1.mp4";
  mask.setAttribute("muted", "");
  mask.setAttribute("autoplay", "");
  mask.setAttribute("id", "maskVideo");
  mask.setAttribute("loop", "");
  mask.src = "video/matte_1.mp4";

  var container = document.getElementById("container");

  // On ajoute les éléments ci-dessus au container
  container.appendChild(video);
  container.appendChild(mask);
  container.appendChild(background);
  container.appendChild(canvas);

  // On charge une promesse pour jouer les vidéos (plusieurs éléments ont la baslise video)
  var promise = document.querySelector("video").play();

  const fps = 30; //Vitess de rafraichissement
  const width = 500; //Taille du canvas
  const height = 650;
  let canvasInterval = null;

  function drawImage() {
    // Dans un 1er temps on dessine la vidéo du masque sur le canvas
    context.drawImage(mask, 0, 0, width, height);
    // On récupère toutes les infos des pixels du canvas
    var data = context.getImageData(0, 0, width, height);
    var i = 0;
    // Pour tous les pixels 
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

  // On repeint la vue convas tous les 1 seconde / fps
  canvasInterval = window.setInterval(() => {
    drawImage(video, mask);
  }, 1000 / fps);

  // On utilise la promesse pour jouer les vidéos une fois que les éléments "video" existent
  video.onloadstart = function (e) {
    if (promise !== undefined) {
      promise
        .then((_) => {
          video.play();
          mask.play();
        })
        .catch((error) => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
  };

  // Vide le cache du canvas lors d'une pause
  video.onpause = function () {
    clearInterval(canvasInterval);
  };
  // A la fin de la vidéo on vide le cache
  video.onended = function () {
    clearInterval(canvasInterval);
  };
  // Quand on clic play, on lance la vidéo
  video.onplay = function () {
    clearInterval(canvasInterval);
    canvasInterval = window.setInterval(() => {
      drawImage(video, mask);
    }, 1000 / fps);
  };
});
