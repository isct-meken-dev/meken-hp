// 要素が存在するか確認してから取得する
let tabContainer = document.getElementById('tab-v');
let tabBodyContainer = document.getElementById('tabbody-v');

// 対象のコンテナ（tab-v と tabbody-v）が両方とも存在する場合のみ、処理を実行する
if (tabContainer && tabBodyContainer) {
    
    let tavsV = tabContainer.getElementsByClassName('tab-elem');
    let pagesV = tabBodyContainer.getElementsByClassName('tabbody-elem');

    function displayTabV(targetIdV) {
        for (let i = 0; i < pagesV.length; i++) {
            if (pagesV[i].id != targetIdV) {
                pagesV[i].style.display = "none";
            } else {
                pagesV[i].style.display = "flex";
            }
        }
        for (let i = 0; i < tavsV.length; i++) {
            tavsV[i].classList.remove('active');
            if (tavsV[i].dataset.tabid === targetIdV) {
                tavsV[i].classList.add('active');
            }
        }
    }

    function changeTabV() {
        let targetIdV = this.dataset.tabid;
        window.location.hash = targetIdV;
    }

    for (let i = 0; i < tavsV.length; i++) {
        tavsV[i].onclick = changeTabV;
    }

    window.addEventListener('hashchange', () => {
        let hash = window.location.hash.slice(1);
        if (hash) {
            displayTabV(hash);
        }
    });

    window.addEventListener('load', () => {
        let hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            displayTabV(hash);
        } else if (tavsV.length > 0) {
            displayTabV(tavsV[0].dataset.tabid);
        }
    });
}

// ---------------------------------------------------
// 下半分の DOMContentLoaded の処理（.tab-btn などの処理）は
// 他の場所で使われている可能性があるためそのまま残します
// ---------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
});