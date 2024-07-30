const promise = axios({
  method: "GET",
  url: "https://shop.cyberlearn.vn/api/Product",
});

promise
  .then((res) => {
    let arr_shoes = res.data.content;
    console.log(res.data.content);

    let stt = 1;
    let all = "";
    let nike = "";
    let adidas = "";
    let converse = "";
    let vans = "";

    // update content for all shoe section
    all = renderContentShoes(arr_shoes, stt, all);

    // update content for adidas shoe section
    let adidas_arr_shoes = filterCategory(arr_shoes, "adidas");
    adidas = renderContentShoes(adidas_arr_shoes, stt, adidas);

    // update content for nike shoe section
    let nike_arr_shoes = filterCategory(arr_shoes, "nike");
    nike = renderContentShoes(nike_arr_shoes, stt, nike);

    // update content for converse shoe section
    let converse_arr_shoes = filterCategory(arr_shoes, "vans_converse");
    converse = renderContentShoes(converse_arr_shoes, stt, converse);

    // update content for vans shoe section
    let vans_arr_shoes = filterCategory(arr_shoes, "vans_converse");
    vans = renderContentShoes(vans_arr_shoes, stt, vans);

    renderShoes([all, nike, adidas, converse, vans]);
  })
  .catch((err) => {
    console.log(err);
  });

function renderContentShoes(arr, stt, content) {
  for (let item of arr) {
    content += `
    <div class="product_item col-12 col-md-6 col-lg-4 col-xl-3 animate__animated animate__zoomIn">
        <div class="item_img">
            <a href="detail.html?id=${item.id}">
              <img src="${item.image}" alt=""Shoes Pic ${stt}"" />
            </a>
            <div class="item_icon">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-image"></i>
            </div>
            <div class="item_price">
                <h4 class="mb-0">💲${item.price}</h4>
            </div>
        </div>
        <div class="item_info mt-4 ps-3">
            <a href="detail.html?id=${item.id}">
                <h4>${item.name}</h4>
            </a>
            <div class="info_star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
            </div>
        </div>
    </div>
    `;
    stt++;
  }
  return content;
}

function filterCategory(shoeArr, category) {
  let result = [];
  for (let item of shoeArr) {
    let categories = JSON.parse(item.categories);
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category.toLowerCase() == category) {
        result.push(item);
      }
    }
  }
  return result;
}

function renderShoes(arr) {
  let categories_list = [
    "pills-all",
    "pills-nike",
    "pills-adidas",
    "pills-converse",
    "pills-vans",
  ];
  for (let i = 0; i < categories_list.length; i++) {
    document.querySelector(`#${categories_list[i]} .row`).innerHTML = arr[i];
  }
}
