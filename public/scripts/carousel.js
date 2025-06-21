document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const items = track.querySelectorAll(".carousel-item");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let centerIndex = 0;

  function getItemWidth() {
    const item = items[0];
    const style = window.getComputedStyle(item);
    const width = item.offsetWidth;
    const margin =
      parseFloat(style.marginLeft || 0) + parseFloat(style.marginRight || 0);
    return width + margin;
  }

  function updateCarousel() {
    const itemWidth = getItemWidth();
    const offset =
      centerIndex * itemWidth -
      track.parentElement.offsetWidth / 2 +
      itemWidth / 2;

    track.style.transform = `translateX(-${offset}px)`;

    items.forEach((item, index) => {
      const img = item.querySelector("img");
      img.classList.remove("scale-110", "opacity-50");
      item.style.zIndex = index === centerIndex ? 10 : 1;

      if (index === centerIndex) {
        img.classList.add("scale-110");
      } else {
        img.classList.add("opacity-50");
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    if (centerIndex < items.length - 1) {
      centerIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (centerIndex > 0) {
      centerIndex--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel(); // Inicializar al cargar
});
