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
    all = renderTheShoeList(arr_shoes, stt, all);

    // update content for adidas shoe section
    let adidas_arr_shoes = filterCategory(arr_shoes, "adidas");
    adidas = renderTheShoeList(adidas_arr_shoes, stt, adidas);

    // update content for nike shoe section
    let nike_arr_shoes = filterCategory(arr_shoes, "nike");
    nike = renderTheShoeList(nike_arr_shoes, stt, nike);

    // update content for converse shoe section
    let converse_arr_shoes = filterCategory(arr_shoes, "vans_converse");
    converse = renderTheShoeList(converse_arr_shoes, stt, converse);

    // update content for vans shoe section
    let vans_arr_shoes = filterCategory(arr_shoes, "vans_converse");
    vans = renderTheShoeList(vans_arr_shoes, stt, vans);

    renderShoes([all, nike, adidas, converse, vans]);
  })
  .catch((err) => {
    console.log(err);
  });

function renderTheShoeList(arr, stt, content) {
  for (let item of arr) {
    content += `
    <div class="product_item col-12 col-md-6 col-lg-4 col-xl-3 animate__animated animate__zoomIn">
        <div class="item_img">
            <img src="${item.image}" alt=""Shoes Pic ${stt}"" />
            <div class="item_icon">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-image"></i>
            </div>
            <div class="item_price">
                <h4 class="mb-0">${item.price}💲</h4>
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
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
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
