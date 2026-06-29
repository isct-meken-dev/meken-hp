document.addEventListener('DOMContentLoaded', () => {
    // フィルターボタンと、ブログ記事の要素をすべて取得
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogItems = document.querySelectorAll('.blog-item');

    // 各ボタンにクリックイベントを設定
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. アクティブなボタンの見た目を切り替える
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            // 2. クリックされたボタンの target (all, creation, analysis) を取得
            const targetFilter = btn.getAttribute('data-filter');

            // 3. 全ての記事に対して表示/非表示を判定
            blogItems.forEach(item => {
                // アニメーションのために一度フェードアウトさせる
                item.classList.add('fade-out');

                setTimeout(() => {
                    if (targetFilter === 'all') {
                        // 'all' なら全て表示
                        item.classList.remove('hide');
                    } else {
                        // ターゲットのクラス（'creation' 等）を持っていれば表示、なければ隠す
                        if (item.classList.contains(targetFilter)) {
                            item.classList.remove('hide');
                        } else {
                            item.classList.add('hide');
                        }
                    }
                    // フェードインさせる
                    item.classList.remove('fade-out');
                }, 300); // CSSのtransition時間と合わせる
            });
        });
    });
});