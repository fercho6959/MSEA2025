const audio = document.getElementById('audioPlayer');
const audioIcon = document.querySelector('.audio-icon');
const loveAudio = document.getElementById('loveAudio');
const promiseAudio = document.getElementById('promiseAudio');

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    audioIcon.style.opacity = 0.8;
    audioIcon.textContent = '🔊';
  } else {
    audio.pause();
    audioIcon.style.opacity = 0.5;
    audioIcon.textContent = '🔈';
  }
}

function stopAllAudio() {
  [loveAudio, promiseAudio].forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
}

function showImages() {
  const container = document.querySelector('.image-container');
  container.innerHTML = '';
  document.getElementById('bottomRightContent').innerHTML = '';
  stopAllAudio();

  document.querySelector('.top-right').style.height = '';
  document.getElementById('bottomRightContent').style.height = '';

  document.querySelector('.arrow-left').style.display = 'block';
  document.querySelector('.arrow-right').style.display = 'block';

  for (let i = 1; i <= 23; i++) {
    const img = document.createElement('img');
    img.src = `img${i}.jpg`;
    img.onclick = () => {
      document.getElementById('bottomRightContent').innerHTML = `<img src="${img.src}" class="large-image">`;
    };
    container.appendChild(img);
  }
}

function showVideos() {
  const container = document.querySelector('.image-container');
  container.innerHTML = '';
  document.getElementById('bottomRightContent').innerHTML = '';
  stopAllAudio();

  document.querySelector('.top-right').style.height = '';
  document.getElementById('bottomRightContent').style.height = '';

  document.querySelector('.arrow-left').style.display = 'block';
  document.querySelector('.arrow-right').style.display = 'block';

  for (let i = 1; i <= 23; i++) {
    const video = document.createElement('video');
    video.src = `video${i}.mp4`;
    video.muted = true;
    video.onmouseover = () => video.play();
    video.onmouseout = () => { video.pause(); video.currentTime = 0; };
    video.onclick = () => {
      document.getElementById('bottomRightContent').innerHTML = `<video class="large-image" src="${video.src}" controls autoplay></video>`;
    };
    container.appendChild(video);
  }
}

function scrollImages(direction) {
  document.querySelector('.image-container').scrollLeft += direction * 200;
}

function showPasswordPrompt() {
  const imageContainer = document.querySelector('.image-container');
  const bottomRightContent = document.getElementById('bottomRightContent');
  imageContainer.innerHTML = '';
  bottomRightContent.innerHTML = '';
  stopAllAudio();

  document.querySelector('.arrow-left').style.display = 'none';
  document.querySelector('.arrow-right').style.display = 'none';

  bottomRightContent.innerHTML = `
    <div class="password-form-inline">
      <input type="password" id="passwordInput" placeholder="Introduce la contraseña" class="password-input">
      <button class="magic-btn" onclick="checkPassword()">Acceder</button>
      <p id="passwordError" style="color: red; display: none;">Contraseña incorrecta</p>
    </div>`;
}

function checkPassword() {
  const password = document.getElementById('passwordInput').value;
  const bottom = document.getElementById('bottomRightContent');

  if (password === '8ocho') {
    bottom.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <button class="magic-btn" onclick="showLoveMessage()">Mensaje</button>
        <button class="magic-btn" onclick="showPromise()">Promesa</button>
      </div>`;
  } else {
    stopAllAudio();
    bottom.innerHTML = `<img src="a.jpg" class="large-image" alt="Imagen Error">`;
  }
}

function showLoveMessage() {
  stopAllAudio();
  loveAudio.currentTime = 0;
  loveAudio.play();

  const bottom = document.getElementById('bottomRightContent');
  bottom.innerHTML = `<div id="typewriter"></div>`;

  const message = `
  <p>Mi amor</p>
  <p>"Hoy quiero recordarte cuánto te amo y todo lo que hemos vivido juntos. Desde ese primer encuentro que parecía una simple casualidad, hasta los momentos más difíciles y los más felices.</p>
  <p>A lo largo de todo este tiempo, hemos enfrentado obstáculos que nos separaron, días en los que no pudimos vernos, ni hablar, pero también hemos vivido días de alegría, de caminar juntos con nuestra hija, de crear recuerdos que guardamos con cariño.</p>
  <p>Hemos arriesgado más de una vez, hemos tomado decisiones que no siempre fueron las mejores, pero cada momento se ha convertido en una anécdota, en una historia que solo nosotros entendemos y atesoramos.</p>
  <p>A pesar de las dificultades, seguimos aquí, juntos. Porque lo que sentimos el uno por el otro va más allá de las circunstancias, de lo que podamos o no podamos hacer.</p>
  <p>Mi amor por ti, no depende de la distancia ni de los momentos complicados.</p>
  <p>No importa que no siempre podamos vernos o hablar, lo que importa es que siempre estaré a tu lado. Estoy aquí para ti, en los días buenos y en los difíciles, para apoyarte, para amarte y ser tu refugio cuando lo necesites.</p>
  <p>Lo que tenemos es verdadero, y mi compromiso contigo es más fuerte que nunca.</p>
  <p>Te amo más de lo que las palabras pueden expresar, y siempre estaré para ti, sin importar lo que venga.</p>
  <p>Eres mi compañera, mi amor, y no hay nada que me haga dudar de lo que siento.</p>
  <p>Siempre a tu lado, sin importar las circunstancias.</p>
  <p>Con todo mi amor."</p>
`;

  const processed = message.replace(/<p>(.*?)<\/p>/g, '$1\n').replace(/<br\s*\/?>/g, '\n');
  typeWriterEffect(processed, "typewriter", 30);
}

let promiseInterval; // para evitar múltiples intervalos

function showPromise() {
  stopAllAudio();
  promiseAudio.currentTime = 0;
  promiseAudio.play();
  clearInterval(promiseInterval);

  const bottom = document.getElementById('bottomRightContent');
  const imageContainer = document.querySelector('.image-container');
  imageContainer.innerHTML = '';
  bottom.innerHTML = '';

  document.querySelector('.top-right').style.height = '';
  bottom.style.height = '100%';

  const container = document.createElement('div');
container.style = `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  height: 90vh; /* casi toda la pantalla */
  padding: 20px;
  font-family: 'HarryP', cursive;
  color: black;
  overflow: hidden;
  position: relative;
`;

container.innerHTML = `
  
<div class="promise-message" style="
    flex: 0 0 35%;
    font-size: clamp(1rem, 2.5vw, 3rem);
    text-align: center;
    overflow-y: auto;
    line-height: 1.2;
    padding: 10px 20px;
    border: 0px solid #ccc;
    border-radius: 0px;
    width: 90%;
    max-height: 40vh;
  ">
  <p style="margin-bottom: 0.3em; margin-top: 0;"> ..........</p>
    <p style="margin-bottom: 0.3em; margin-top: 0;">Con este cuadro, donde están mis dos amores</p> 
    <p style="margin-bottom: 0.1em; margin-top: 0;">TE PROMETO MISHEL:</p>
    <p style="margin-bottom: 0.1em; margin-top: 0;">Cuidarte, protegerte, estar en todo momento para las dos, sin importar las circunstancias.</p>
  </div>
  <div id="promiseImageContainer" style="
    flex: 1 1 auto;
    width: 100%;
    max-height: 50vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;
  ">
    <img id="currentPromiseImg" src="promesa1.jpg" class="large-image"
      style="position: absolute; transition: opacity 1s ease-in-out; opacity: 1; height: 100%; width: auto;">
    <img id="nextPromiseImg" src="" class="large-image"
      style="position: absolute; transition: opacity 1s ease-in-out; opacity: 0; height: 100%; width: auto;">
  </div>
`;


  bottom.appendChild(container);

  const imageList = [];
  for (let i = 1; i <= 6; i++) {
    imageList.push(`promesa${i}.jpg`);
  }

  let currentImage = 0;
  const currentImg = container.querySelector('#currentPromiseImg');
  const nextImg = container.querySelector('#nextPromiseImg');

  promiseInterval = setInterval(() => {
    const nextIndex = (currentImage + 1) % imageList.length;
    const nextImageSrc = imageList[nextIndex];

    nextImg.src = nextImageSrc;

    nextImg.onload = () => {
      nextImg.style.opacity = 1;
      currentImg.style.opacity = 0;

      setTimeout(() => {
        currentImg.src = nextImageSrc;
        currentImg.style.opacity = 1;
        nextImg.style.opacity = 0;
        currentImage = nextIndex;
      }, 1000);
    };
  }, 3000);
}



function typeWriterEffect(text, elementId, speed = 40) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      const char = text.charAt(i);
      element.innerHTML += char === '\n' ? '<br>' : char;
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
