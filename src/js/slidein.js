// 対象のクラス配列
const slideinClasses = ['slidein-left', 'slidein-right', 'slidein-bottom', 'slidein-top'];

function handleSlideIn() {
    slideinClasses.forEach(cls => {
        document.querySelectorAll('.' + cls).forEach(el => {
            // 発火条件
            const slideInAt = (window.scrollY + window.innerHeight) - el.offsetHeight / 2;
            const isHalfShown = slideInAt > el.offsetTop;
            const rect = el.getBoundingClientRect();
            // const isNotScrolledPast = window.scrollY < elBottom;
            // const elBottom = el.offsetTop + el.offsetHeight;

            const isShown = rect.top < window.innerHeight - 100;

            //  可視化
            if (isShown) {
                el.classList.add('is-visible');
            }
            // 非可視化
            // else {
            //     el.classList.remove('is-visible');
            // }
        });
    });
}

window.addEventListener('scroll', handleSlideIn);
window.addEventListener('load', handleSlideIn); 