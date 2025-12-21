/* ========================
   ハンバーガーメニュー
======================== */
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        menuBtn.classList.remove("open");
        overlay.classList.remove("show");
    }
});

document.querySelectorAll(".overlay-menu a").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("open");
        overlay.classList.remove("show");
    });
});


/* ========================
   横スクロールスライダー
   端で止まる + 矢印非表示
======================== */

const scrollAmount = 260;

/* 矢印の表示制御 */
function updateArrowVisibility(slider, leftBtn, rightBtn) {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    // 左端
    if (slider.scrollLeft <= 0) {
        leftBtn.style.display = "none";
    } else {
        leftBtn.style.display = "flex";
    }

    // 右端
    if (slider.scrollLeft >= maxScroll - 1) {
        rightBtn.style.display = "none";
    } else {
        rightBtn.style.display = "flex";
    }
}

/* 各スライダーに対応 */
document.querySelectorAll(".service-slider-wrapper, .voice-slider-wrapper")
    .forEach(wrapper => {

        const slider = wrapper.querySelector(
            ".service-slider, .voice-slider"
        );
        const leftBtn = wrapper.querySelector(".left-btn");
        const rightBtn = wrapper.querySelector(".right-btn");

        if (!slider || !leftBtn || !rightBtn) return;

        // 初期状態チェック
        updateArrowVisibility(slider, leftBtn, rightBtn);

        // ボタンクリック
        rightBtn.addEventListener("click", () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        });

        leftBtn.addEventListener("click", () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });
        });

        // スクロール時にもチェック（スワイプ対応）
        slider.addEventListener("scroll", () => {
            updateArrowVisibility(slider, leftBtn, rightBtn);
        });

        // 画面リサイズ時も再計算
        window.addEventListener("resize", () => {
            updateArrowVisibility(slider, leftBtn, rightBtn);
        });
    });