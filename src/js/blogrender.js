// blog.jsonからデータを取得してHTMLを生成する関数
async function renderBlog() {
  try {
    // 1. JSONファイルを読み込む
    const response = await fetch('src/json/blog.json');
    const blogs = await response.json();
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date)); // 日付で降順にソート
    
    const container = document.getElementById('blog-list-container');
    const top_container = document.getElementById('blog-top-container');

    // 2. データ1件ずつに対してHTMLを組み立てる
    blogs.forEach(blog => {
      // 属性がある時だけラベルタグを作る
      const labelHtml = blog.attribute ? `<span class="card-label">${blog.attribute}</span>` : '';

      // HTMLのテンプレート
      const htmlString = `
        <li class="blog-item" ${blog.category ? `data-category="${blog.category}"` : ''}>
          <article class="card">
            <a href="${blog.url}" class="card-link">
              ${labelHtml}
              <img src="${blog.thumbnail}" class="card-image" alt="記事の画像">
              <div class="card-info">
                <time datetime="${blog.date}" class="card-time">${blog.date}</time>
                <h2 class="card-title">${blog.title}</h2>
              </div>
              <dl class="writer">
                <dt class="writer-name">${blog.author}</dt>
                <dd class="writer-icon">
                  <img src="${blog.authorIcon}" alt="筆者のアイコン" class="writer-icon-image" width="50px">
                </dd>
              </dl>
            </a>
          </article>
        </li>
      `;

      // 3. 画面（container）に追加する
      if (container){
        container.insertAdjacentHTML('beforeend', htmlString);
      }
      // 4. 最新の3件をトップにも表示する
      if (top_container && top_container.children.length < 3) {
         top_container.insertAdjacentHTML('beforeend', htmlString);
       }
    });

    // 5. ブログ記事の生成がすべて完了した後に、絞り込み機能をセットアップする
    if (container) {
      setupBlogFilter();
    }

  } catch (error) {
    console.error("ブログデータの読み込みに失敗しました", error);
  }
}

// タブによる絞り込み機能の関数
// タブ（カテゴリ）による絞り込み機能の関数
function setupBlogFilter() {
  const filterTabs = document.querySelectorAll('.tab-elem');
  const blogItems = document.querySelectorAll('.blog-item');

  // タブがないページ（トップページなど）では何もしない
  if (filterTabs.length === 0 || blogItems.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();

      // クリックされた枠の中にある h2（filter-btn）を探す
      const btn = this.querySelector('.filter-btn');
      if (!btn) return;

      // 1. すべてのタブの文字から active クラスを外す
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      
      // 2. クリックされたタブの文字に active クラスを付ける
      btn.classList.add('active');

      // 3. 絞り込み条件を取得
      const targetCategory = btn.getAttribute('data-filter');

      // 4. すべての記事をチェックして、表示/非表示を切り替える（★アニメーション追加）
      blogItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (targetCategory === 'all' || targetCategory === itemCategory) {
           item.style.display = ''; // まず画面に配置する

           // JavaScriptで「ふわっと浮かび上がる」アニメーションを直接かける
           item.animate([
             { opacity: 0, transform: 'translateY(20px)' }, // スタート時の状態（透明＆少し下）
             { opacity: 1, transform: 'translateY(0)' }     // ゴール時の状態（くっきり＆元の位置）
           ], {
             duration: 400,       // 0.4秒かけて動く
             easing: 'ease-out',  // ふわっと減速する自然な動き
             fill: 'forwards'
           });
           
        } else {
           item.style.display = 'none'; // 条件に合わないものは隠す
        }
      });
    });
  });
}renderBlog();