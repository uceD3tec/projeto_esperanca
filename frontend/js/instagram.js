
const carousel = document.getElementById("carousel");
let currentIndex = 0;
let posts = [];
let autoplayInterval;
const gap = 20;

let itemsToShow = getItemsToShow();

function getItemsToShow() {
    return window.innerWidth < 768 ? 1.1 : 3; // 1.2 permite ver parte dos próximos
}



// ...existing code...
async function loadInstagramPosts() {
    try {
        // Substitua pelo endpoint real do backend
        const response = await fetch("http://localhost:3000/api/instagram/posts");
        posts = await response.json();

        // O restante do código permanece igual
        posts.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("instapost");
            postDiv.style.flex = `0 0 calc(${100 / itemsToShow}% - ${(gap * (itemsToShow - 1)) / itemsToShow}px)`;

            if (index === 0) postDiv.classList.add("active");

            const anchor = document.createElement("a");
            anchor.href = post.link;
            anchor.target = "_blank";

            const img = document.createElement("img");
            img.src = post.img;

            anchor.appendChild(img);
            postDiv.appendChild(anchor);
            carousel.appendChild(postDiv);
        });

        startCarousel();
    } catch (err) {
        console.error("Erro ao Carregar os Posts do Instagram", err);
    }
}

function startCarousel() {
    const item = carousel.querySelector(".instapost");
    const itemWidth = item.offsetWidth + 20; // 20 = gap
    const maxIndex = posts.length - itemsToShow;

    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function startAutoplay() {
        stopAutoplay(); // evita múltiplos intervals
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % (posts.length - itemsToShow + 1);
            goToIndex(currentIndex);
        }, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Inicia autoplay ao carregar
    startAutoplay();

    // DRAG
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    function onDragStart(e) {
        stopAutoplay();
        isDragging = true;
        startX = getPositionX(e);
        prevTranslate = currentTranslate;
        animationID = requestAnimationFrame(animation);
        carousel.classList.add("grabbing");
    }

    function onDrag(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        const delta = currentX - startX;
        currentTranslate = prevTranslate + delta;
    }

    function onDragEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        carousel.classList.remove("grabbing");

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -itemWidth / 4 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (movedBy > itemWidth / 4 && currentIndex > 0) {
            currentIndex--;
        }

        goToIndex(currentIndex);


        startAutoplay(); // Retorna o autoplay imediatamente, pois o timer do autoplay é resetado para 3s
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(e) {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

    // Eventos de mouse/touch
    carousel.addEventListener("mousedown", onDragStart);
    carousel.addEventListener("mousemove", onDrag);
    carousel.addEventListener("mouseup", onDragEnd);
    carousel.addEventListener("mouseleave", () => isDragging && onDragEnd());

    carousel.addEventListener("touchstart", onDragStart);
    carousel.addEventListener("touchmove", onDrag);
    carousel.addEventListener("touchend", onDragEnd);
}

window.addEventListener("resize", () => {
    const newItemsToShow = getItemsToShow();
    if (newItemsToShow !== itemsToShow) {
        itemsToShow = newItemsToShow;
        carousel.innerHTML = "";
        currentIndex = 0;
        loadInstagramPosts(); // Recria com novo layout
    }
});


window.addEventListener("DOMContentLoaded", () => {
    loadInstagramPosts();
});
