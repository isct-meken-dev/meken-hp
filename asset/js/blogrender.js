// blog.jsonからデータを取得してHTMLを生成する関数
async function renderBlog() {
  try {
    // 1. JSONファイルを読み込む
    const response = await fetch('asset/json/blog.json');
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
      container.insertAdjacentHTML('beforeend', htmlString);
      // 4. 最新の3件をトップにも表示する
      if (top_container && top_container.children.length < 3) {
        top_container.insertAdjacentHTML('beforeend', htmlString);
      }
    });
  } catch (error) {
    console.error("ブログデータの読み込みに失敗しました", error);
  }
}

// ページが読み込まれたら実行
renderBlog();