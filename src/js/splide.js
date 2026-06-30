import { Splide } from "https://esm.sh/@splidejs/splide";
import { AutoScroll } from "https://esm.sh/@splidejs/splide-extension-auto-scroll";

const splideTarget = document.querySelector('.splide');
const splideOptions = {
  type: 'loop',
  autoWidth: true,
  arrows: false,
  pagination: false,
  autoScroll: {
    speed: 1,
    pauseOnHover: true, // スライダーの上にマウスカーソルが乗ったとき、スクロールを停止するかどうか
    pauseOnFocus: true, // スライダー内にフォーカスされた要素がある場合、スクロールを停止するかどうか
  },
};

if (splideTarget) {
  const splide = new Splide(splideTarget, splideOptions);
  splide.mount({ AutoScroll });
}

// 自動横スクロール
// asset/js/splide.js に追記

document.addEventListener('DOMContentLoaded', function() {
    // Aboutセクションのスライダー要素を取得
    const aboutSliderElem = document.querySelector('#about-slider');

    // 要素が存在する場合のみ実行
    if (aboutSliderElem) {
        new Splide(aboutSliderElem, {
            type   : 'loop',       // 無限ループさせる
            drag   : 'free',       // 自由にドラッグ・スワイプ可能にする
            focus  : 'center',     // 中央の画像を基準にする
            autoWidth: true,       // 画像の幅をCSSに依存させる
            gap    : '16px',       // 画像と画像の隙間
            arrows : false,        // 左右の矢印ボタンを消す
            pagination: false,     // 下のドットボタンを消す
            autoScroll: {
                speed: 1,          // 流れる速度（数値を大きくすると速くなる）
                pauseOnHover: true, // ホバー（またはタップ）で一時停止
                pauseOnFocus: false, // フォーカス時の停止設定
            },
        }).mount( window.splide.Extensions ); // AutoScroll拡張を読み込んで起動
    }
});