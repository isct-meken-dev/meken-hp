// hero-videoの再生位置を保存・復元
    document.addEventListener('DOMContentLoaded', function() {
      const video = document.querySelector('.hero-video');
      
      if (!video) return;

      const STORAGE_KEY = 'hero-video-currentTime';
      // 復元
      const savedTime = localStorage.getItem(STORAGE_KEY);
      if (savedTime) {
        video.currentTime = parseFloat(savedTime);
      }
      
      // 定期保存
      let saveInterval = setInterval(() => {
        if (!video.paused && !video.ended) {
          localStorage.setItem(STORAGE_KEY, video.currentTime);
        }
      }, 500);
      // ページ離脱時にも保存
      window.addEventListener('beforeunload', () => {
        localStorage.setItem(STORAGE_KEY, video.currentTime);
      });
    });