function changeValue(id, buocNhay = 1) {
  let input = document.querySelector(id + " input");
  // console.log("input", input);
  document.querySelector(id + " .increase").onclick = () => {
    console.log("tăng", id);
    input.value * 1 >= 1
      ? (input.value = input.value * 1 + buocNhay * 1)
      : (input.value = 1);
  };
  document.querySelector(id + " .decrease").onclick = () => {
    console.log("giảm", id);
    input.value * 1 >= 1
      ? (input.value = input.value * 1 - buocNhay * 1)
      : (input.value = 0);
  };
}

function selectSize() {
  const sizes = document.querySelectorAll(".product_info .size button");
  let selectedSize = document.getElementById("selectedSize");
  sizes.forEach((size, index1) => {
    size.addEventListener("click", (e) => {
      selectedSize.innerHTML = size.innerHTML;
      sizes.forEach((size, index2) => {
        index1 == index2
          ? size.classList.add("selected")
          : size.classList.remove("selected");
      });
    });
  });
}

function selectRating() {
  const stars = document.querySelectorAll("#select-rating i");
  stars.forEach((star, index1) => {
    // mouse hover
    star.addEventListener("mouseover", () => {
      // khi click duyệt lại mảng check lại
      stars.forEach((star, index2) => {
        index1 >= index2
          ? star.classList.add("hover")
          : star.classList.remove("hover");
      });
    });

    // mouse out
    star.addEventListener("mouseout", () => {
      // khi click duyệt lại mảng check lại
      stars.forEach((star, index2) => {
        star.classList.remove("hover");
      });
    });

    // click
    star.addEventListener("click", () => {
      // khi click duyệt lại mảng check lại
      stars.forEach((star, index2) => {
        index1 >= index2
          ? star.classList.add("selected")
          : star.classList.remove("selected");
      });
    });
  });
}

changeValue("#actionCart");
selectSize();
selectRating();
