// =========[hiển thị thông tin]=========
function renderDetailApi(obj) {
  // destructuring
  let {
    id,
    name,
    image,
    alias,
    price,
    quantity,
    shortDescription,
    description,
    // array
    size,
    categories,
    relatedProducts,
  } = obj;

  let breadcrumb = `
          <li class="breadcrumb-item"><a href="./index.html">Home</a></li>
          <li class="breadcrumb-item"><a href="./index.html#current_product">Products</a></li>
          <li class="breadcrumb-item"><a href="./index.html#current_product">${categories[0].id}</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            ${name}
          </li>`;
  let product_image = `
            <img src="${image}" alt="${name}" title="${name}" />`;

  let sizeContent = "";
  size.forEach((item) => {
    sizeContent += `<button type="button" class="size_item">${item}</button>`;
  });

  let categoriesContent = "";
  categories.forEach((item) => {
    categoriesContent += `<a href="#${item.id}">${item.category}</a>`;
  });

  let content =
    `
            <h2>${name}</h2>
            <div class="product_metaInfo d-flex">
              <div class="sku">SKU: <span>${categories[0].id.substr(
                0,
                3
              )}-${id}</span></div>
              <div class="qtyStock ${quantity > 0 ? "instock" : "outstock"}">${
      quantity > 0 ? quantity + " in stock" : "Out stock"
    }</div>
              <div class="review_star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <a href="#pills-review-tab" title="View all reviews"
                  >(3 reviews)</a
                >
              </div>
              <div class="social">
                <a class="a2a_dd" href="./"
                  ><i class="fa-solid fa-share-nodes"></i> Share</a
                >
              </div>
            </div>

            <div class="price">${usd(price)}</div>
            <p class="short_description">
              ${shortDescription}
            </p>
            <label for="">Size: <span id="selectedSize">&nbsp;</span></label>
            <div class="size d-flex">` +
    sizeContent +
    `</div>

            <label for="quantity">Quantity:</label>
            <form action="" id="actionCart" class="d-flex flex-wrap py-1 mb-3">
              <div class="inputGroup">
                <span class="decrease">-</span>
                <input
                  type="number"
                  id="quantity"
                  class=""
                  step="1"
                  min="1"
                  max="91"
                  name="quantity"
                  value="1"
                  title="Qty"
                  size="4"
                  placeholder=""
                  inputmode="numeric"
                  autocomplete="off"
                />
                <span class="increase">+</span>
              </div>

              <button type="button" class="add_to_cart">add to cart</button>
              <button type="button" class="add_compare" title="Add to compare">
                <i class="fa-solid fa-code-compare"></i>
              </button>
              <button
                type="button"
                class="add_wish_list"
                title="Add to wishlist"
              >
                <i class="fa-solid fa-heart"></i>
              </button>
            </form>
            <p class="meta_title categories">
              Categories: <span>` +
    categoriesContent +
    `</span>
            </p>
            <p class="meta_title tags">
              Tags:
              <span><a href="#${alias}">${alias}</a></span>
            </p>
            <div class="payment_info">
              <h6 class="fs-sm">guaranteed Safe checkout:</h6>
              <img src="./public/image/payment_info.png" alt="" />
              <ul>
                <li>
                  <i class="fa-regular fa-clock"></i> Orders ship within 5 to 10
                  business days.
                </li>
                <li>
                  <i class="fa-solid fa-truck-fast"></i> Hoorey ! This item
                  ships free to the US
                </li>
              </ul>
            </div>
  `;

  let relatedItems = "";
  relatedProducts.forEach((item, index) => {
    relatedItems += `
        <div class="carousel_item">
          <img src="${item.image}" alt="" />
          <a href="detail.html?id=${item.id}">
              <h4>${item.name}</h4>
          </a>
          <div class="item_icon">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-regular fa-image"></i>
          </div>
          <div class="item_add">
            <a href="detail.html?id=${item.id}">
              <h6>Buy it</h6>
            </a>
          </div>
        </div>
  `;
  });
  console.log(relatedItems);

  // binding data
  nhapData(".breadcrumb", breadcrumb);
  nhapData(".product_image", product_image);
  nhapData(".product_info", content);
  nhapData(".description", description);
  nhapData("#carouselItems", relatedItems);
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("params", id);

  //call api load lên giao diện
  let promise = axios({
    method: "GET",
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
  });

  promise
    .then((res) => {
      // console.log(res.data.content.name);
      document.querySelector(".product_detail").style.display = "block";
      renderDetailApi(res.data.content);
      selectSize();
      changeValue("#actionCart");
      selectRating();
      initializeOwlCarousel();
    })
    .catch((err) => {
      console.log(err.response.data);
      console.log(err.response.status);
      handleError(
        `Có lỗi xảy ra! ${
          err.response.data.id
            ? err.response.data.id
            : err.response.data.message
        }\r
        ${err}`
      );
      document.querySelector(".product_detail").style.display = "none";
      // document.querySelector(".related_products").style.display = "none";
    });
};

// =========[global fn]=========
function nhapData(sel, noiDungNhap) {
  // console.log(sel);
  document.querySelector(sel).innerHTML = noiDungNhap;
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
      stars.forEach((star) => {
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
// hàm format tiền USD
function usd(num) {
  return (num = num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  }));
}
// format vn number
function vnNum(num) {
  return (num = num.toLocaleString("vi-VN"));
}
// format us number
function usNum(num) {
  return (num = num.toLocaleString("en-US"));
}

// Hiển thị thông báo lỗi cho người dùng
function handleError(text, duration = 5000) {
  Toastify({
    // text giúp thông báo lỗi, sử dụng cơ chế từ object literal (ES6)
    text,
    //   thời gian diễn ra thông báo
    duration,
    //destination: click vô thông báo sẽ dẫn tới trang | newWindow mở trên trang mới hay trang hiện tại
    //destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      // background: "linear-gradient(to right, #00b09b, #96c93d)",
      background: "red",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function initializeOwlCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 6,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
}

// EOF =====[global fn]=====
