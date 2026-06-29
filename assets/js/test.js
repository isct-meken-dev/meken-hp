window.addEventListener('load', function () {
	const marquee = document.querySelectorAll('.aboutus-images img-box'); // ul要素
	const items = Array.from(marquee.children);             // 子要素
	const speedSeconds = 20;                                // スクロール1回にかかる秒数
	const direction = 'left';                               // 'left' または 'right'

	// 無限スクロール用に複製
	items.forEach(item => marquee.appendChild(item.cloneNode(true)));

	let marqueeWidth = marquee.scrollWidth / 2;
	let pos = direction === 'left' ? 0 : -marqueeWidth;
	const pixelsPerFrame = marqueeWidth / (speedSeconds * 60);

	function animate() {
		pos += direction === 'left' ? -pixelsPerFrame : pixelsPerFrame;

		// 無限ループ
		if (pos <= -marqueeWidth) pos += marqueeWidth;
		if (pos >= 0) pos -= marqueeWidth;

		marquee.style.transform = `translateX(${pos}px)`;
		requestAnimationFrame(animate);
	}

	animate();
});


window.addEventListener('load', function () {
	const marquee = document.querySelector('.marqueer ul'); // ul要素
	const items = Array.from(marquee.children);             // 子要素
	const speedSeconds = 20;                                // スクロール1回にかかる秒数
	const direction = 'left';                               // 'left' または 'right'

	// 無限スクロール用に複製
	items.forEach(item => marquee.appendChild(item.cloneNode(true)));

	let marqueeWidth = marquee.scrollWidth / 2;
	let pos = direction === 'left' ? 0 : -marqueeWidth;
	const pixelsPerFrame = marqueeWidth / (speedSeconds * 60);

	function animate() {
		pos += direction === 'left' ? -pixelsPerFrame : pixelsPerFrame;

		// 無限ループ
		if (pos <= -marqueeWidth) pos += marqueeWidth;
		if (pos >= 0) pos -= marqueeWidth;

		marquee.style.transform = `translateX(${pos}px)`;
		requestAnimationFrame(animate);
	}

	animate();
});

// アニメーション用のテキストデータ（HTMLから抽出）
const aboutUsData = `科学大アニメーション研究会は、アニメーション制作の全てのプロセスを研究し、実践する団体です。脚本、キャラクターデザイン、コンテ、原画、動画、仕上げ、背景、撮影、編集まで、一貫した制作体制を持ちます。

各セクションへの理解を深め、より高度な表現を追求すること。そして、創作の喜びを共有し、アニメーションの可能性を広げることを目指しています。MEKENは、一人一人の創造力を、世界に届く形へと昇華させるための、技術と情熱が集う場所です。`;

// DOM要素の取得
const aboutTextElement = document.getElementById('aboutDataText');
const scanFrame = document.querySelector('.scan-frame');
const triggerBtn = document.getElementById('startAboutScan');
const resetBtn = document.getElementById('resetAboutScan');

// タイピングエフェクトの状態管理
let isScanning = false;
let currentTextIndex = 0;
let typingTimeout = null;
const typingSpeed = 30; // 文字表示速度 (ms)

// タイピングアニメーション関数
function typeText() {
    if (currentTextIndex < aboutUsData.length) {
        aboutTextElement.textContent += aboutUsData[currentTextIndex];
        currentTextIndex++;
        typingTimeout = setTimeout(typeText, typingSpeed);
    } else {
        // タイピング完了後、ボタン表示を切り替え
        isScanning = false;
        // スキャンアニメーションは継続させるか、停止するか、好みで
        // 今回は停止させる
        scanFrame.classList.remove('scanning');
        
        triggerBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
    }
}

// スキャン開始イベント
triggerBtn.addEventListener('click', () => {
    if (isScanning) return;
    
    isScanning = true;
    aboutTextElement.textContent = '';
    currentTextIndex = 0;
    
    // スキャン演出の開始
    scanFrame.classList.add('scanning');
    
    // テキスト展開開始
    clearTimeout(typingTimeout);
    typeText();
});

// リセットイベント
resetBtn.addEventListener('click', () => {
    // 全ての状態をリセット
    aboutTextElement.textContent = '';
    currentTextIndex = 0;
    clearTimeout(typingTimeout);
    scanFrame.classList.remove('scanning');
    
    resetBtn.style.display = 'none';
    triggerBtn.style.display = 'inline-block';
});