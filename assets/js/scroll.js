
// スクロールシンボル
const symbol = document.querySelector('.scroll-symbol');

if (symbol) {
  symbol.addEventListener('click', (e) => {
    e.preventDefault();
    const curY_bottom = window.scrollY + window.innerHeight; // 現在のスクロール位置の下端
    const scrollamount = 2 * window.innerHeight - curY_bottom; // 画面下端が2*window.innerHeightになるように
    window.scrollBy({
      top: scrollamount,
      behavior: 'smooth'
    });
  });
}

// 自動スクロール
(function firstscroll() {
  let alreadyScrolled = false;

  window.addEventListener('scroll', () => {
    if (alreadyScrolled) return;

    const curY_bottom = window.scrollY + window.innerHeight;
    if (curY_bottom >= window.innerHeight && curY_bottom < 2 * window.innerHeight) {
      
      alreadyScrolled = true;
      window.removeEventListener('scroll', handleFirstScroll);

      const scrollamount = 2 * window.innerHeight - curY_bottom; // 画面下端が2*window.innerHeightになるように
      window.scrollBy({
        top: scrollamount,
        behavior: 'smooth'
      });
    }
  });
})();
