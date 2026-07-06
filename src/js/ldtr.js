document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading");
  const video = document.getElementById("transition-video");
  
  if (!loadingScreen || !video) return;

  // ローディング画面を隠す共通の関数
  const hideLoading = () => {
    loadingScreen.classList.remove('is-active');
  };

  // --------------------------------------------------
  // 1. サイト訪問時（ロード時）のローディング表示
  // --------------------------------------------------
  // 「今、リンクをクリックして移動してきたのか？」をメモから確認する
  const isTransitioning = sessionStorage.getItem("isTransitioning");

  if (isTransitioning === "true") {
    // リンク遷移でやってきた場合は、動画を再生せずにすぐサイトを見せる
    sessionStorage.removeItem("isTransitioning"); // メモを消去
    hideLoading();
  } else {
    // 直接アクセスやリロードの場合は、動画を再生する
    loadingScreen.classList.add('is-active');
    video.currentTime = 0;
    
    // 動画を自動再生
    video.play().catch(err => {
      console.log("自動再生エラー:", err);
      hideLoading();
    });

    video.addEventListener('ended', hideLoading, { once: true });
  }

  // --------------------------------------------------
  // 2. リンククリック時（ページ遷移時）の処理
  // --------------------------------------------------
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // 外部リンクやページ内リンクはスキップ
      if (this.hostname !== window.location.hostname) return;
      
      e.preventDefault();
      const targetUrl = this.getAttribute('href');

      // ★追加：移動先のページに「リンク遷移中だよ」というメモを残す
      sessionStorage.setItem("isTransitioning", "true");

      // 万が一ロード時の動画が終わる前にクリックされた場合、イベントを解除
      video.removeEventListener('ended', hideLoading);
      video.ontimeupdate = null; // 監視を初期化

      // ローディング画面を表示し、動画を頭から再生
      loadingScreen.classList.add('is-active');
      video.currentTime = 0;
      video.play().catch(err => console.log("再生エラー:", err));

      // 動画が終了する直前（残り0.1秒）にページ遷移
      video.ontimeupdate = () => {
        if (video.duration - video.currentTime < 0.1) {
          video.pause(); // 最後のフレームでピタッと止める
          video.ontimeupdate = null;
          window.location.href = targetUrl; // 次のページへ移動
        }
      };
    });
  });
});