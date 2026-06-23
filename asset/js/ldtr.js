// ローディングアニメーションを実行する関数
function loadingAnimation() {
  const setAnimation = lottie.loadAnimation({
    container: document.querySelector(".loading-wrapper"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "./loading-animation.json", // ★後述：jsonファイルのパス
  });

  // アニメーション終了時に非表示クラスを付与
  setAnimation.addEventListener("complete", function () {
    const loadingElement = document.querySelector(".loading");
    loadingElement.classList.add("isLoaded");
  });
}

// 初回訪問時のみアニメーションを実行する判定
if (!sessionStorage.getItem("visited")) {
  // 初回訪問時
  sessionStorage.setItem("visited", "first");
  loadingAnimation();
} else {
  // 2回目以降の訪問時（最初から非表示にする）
  const loadingElement = document.querySelector(".loading");
  loadingElement.classList.add("isLoaded");
}