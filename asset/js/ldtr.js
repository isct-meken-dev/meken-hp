// document.addEventListener("DOMContentLoaded", () => {
//   const loadingScreen = document.querySelector(".loading");
//   const wrapper = document.querySelector(".loading-wrapper");

//   // 1. Lottieアニメーションのセットアップ
//   const animation = lottie.loadAnimation({
//     container: wrapper,
//     renderer: "svg",
//     loop: false,
//     autoplay: false, // 勝手に再生されないように false にする
//     path: "Transition3.json" // 画像の通り一番上の階層にあるのでこのパスでOK
//   });

//   // 2. サイト内のリンクをすべて取得（別タブで開くリンクや、ページ内スクロールは除外）
//   const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

//   links.forEach(link => {
//     link.addEventListener('click', function(e) {
//       e.preventDefault(); // ★ここで通常の「パッ」と切り替わるページ移動をキャンセル！
      
//       const targetUrl = this.getAttribute('href'); // 移動先のURL（about.htmlなど）を記憶

//       // 3. ローディング画面を表示状態にする
//       loadingScreen.classList.add('is-active');
      
//       // 4. アニメーションを最初から再生
//       animation.goToAndPlay(0, true);

//       // 5. アニメーションが完了したら、記憶しておいたURLへ移動！
//       animation.addEventListener('complete', () => {
//         window.location.href = targetUrl;
//       });
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading");
  const video = document.getElementById("transition-video");
  
  // サイト内のリンクをすべて取得（別タブやページ内リンクは除外）
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // 通常のページ移動をキャンセル
      
      const targetUrl = this.getAttribute('href'); // 移動先のURLを記憶

      // ローディング画面の枠を表示
      loadingScreen.classList.add('is-active');
      
      // 動画を最初から再生する
      video.currentTime = 0;
      video.play();

      // 動画の再生が「終わった瞬間」に次のページへ飛ぶ！
      video.addEventListener('ended', () => {
        window.location.href = targetUrl;
      }, { once: true }); // このイベントが1回だけ発火するようにする安全装置
    });
  });
});