'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  let currentNum = 0;

  // mainの中のimgタグを取得して、src属性にimageを代入する関数
  function setMainImage(image) {
    document.querySelector('main img').src = image;
  }

  // 選択した画像をメイン画像にセット
  setMainImage(images[currentNum]);

  // currentクラスを取り除く関数
  function removeCurrentClass() {
    document.querySelectorAll('.thumbnails li')[currentNum]
      .classList.remove('current');
  }

  // currentクラスを付ける関数
  function addCurrentClass() {
    document.querySelectorAll('.thumbnails li')[currentNum]
      .classList.add('current');
  }

  const thumbnails = document.querySelector('.thumbnails');
  // imagesを順番にサムネイルに入れていく
  images.forEach((image, index) => {
    const li = document.createElement('li');
    if (index === currentNum) {
      li.classList.add('current');
    }

    li.addEventListener('click', () => {
      setMainImage(image);
      removeCurrentClass();
      currentNum = index;
      addCurrentClass();
    });

    const img = document.createElement('img');
    img.src = image;
    // imgをliの子要素として追加
    li.appendChild(img);
    // liをthumbnailsの子要素として追加
    thumbnails.appendChild(li);
  });

  // nextボタンを押すと、currentクラスが入れ替わる
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    removeCurrentClass();
    currentNum++;
    // 最後の画像に達したら最初に戻る条件分岐
    if (currentNum === images.length) {
      currentNum = 0;
    }
    addCurrentClass();
    setMainImage(images[currentNum]);
  });

  // 戻るボタン
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    removeCurrentClass();
    currentNum--;
    // 最初の画像の時に戻るを押したら最後の画像にいく条件分岐
    if (currentNum < 0) {
      currentNum = images.length - 1;
    }
    addCurrentClass();
    setMainImage(images[currentNum]);
  });

  let timeoutId;

  // 一定時間ごとに画像を次のものに差し替える関数
  function playSlideshow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideshow();
    }, 1000);
  }

  const play = document.getElementById('play');
  const pause = document.getElementById('pause');

  play.addEventListener('click', () => {
    // playを押すとplayが消え、pauseが表示される
    play.classList.add('hidden');
    pause.classList.remove('hidden');
    playSlideshow();
  });

  pause.addEventListener('click', () => {
    // pauseを押すとpauseが消え、playが表示される
    play.classList.remove('hidden');
    pause.classList.add('hidden');
    clearTimeout(timeoutId);
  });
}
