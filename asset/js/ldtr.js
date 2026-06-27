document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading");
  const video = document.getElementById("transition-video");
  
  if (!loadingScreen || !video) return;

  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // 外部リンクはスキップ
      if (this.hostname !== window.location.hostname) return;
      
      e.preventDefault();
      const targetUrl = this.getAttribute('href');

      // ローディング画面を表示し、動画再生
      loadingScreen.classList.add('is-active');
      video.currentTime = 0;
      video.play().catch(err => console.log("再生エラー:", err));

      // 動画が終了する直前にページ遷移させる
      video.ontimeupdate = () => {
        // 残り0.1秒になったら動画を一時停止して遷移
        if (video.duration - video.currentTime < 0.1) {
          video.pause(); // 最後のフレームでピタッと止める
          video.ontimeupdate = null; // 監視を解除
          window.location.href = targetUrl; // 次のページへ移動
        }
      };
    });
  });
});