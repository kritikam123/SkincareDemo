document.addEventListener("productsLoaded", function () {
  const productsContainer = document.getElementById("products-container");
  const resultCountEl = document.getElementById("results-count");
  const noResultEl = document.getElementById("no-result");
  const sortSelect = document.getElementById("sort-select");
  const paginationEl = document.getElementById("pagination");

  const baseProducts =
    typeof PAGE_CATEGORY !== "undefined"
      ? products.filter((product) => product.category === PAGE_CATEGORY)
      : products;

  function renderProducts(list) {
    productsContainer.innerHTML = "";

    if (list.length === 0) {
      noResultEl.style.display = "block";
      resultCountEl.textContent = "Showing 0 products";
      if (paginationEl) paginationEl.innerHTML = "";
      return;
    }

    noResultEl.style.display = "none";
    resultCountEl.textContent = `Showing ${list.length} product${list.length > 1 ? "s" : ""}`;

    list.forEach((product) => {
      const inStock = product.inStock !== false;

      productsContainer.innerHTML += `
         <div class="card ${inStock ? "" : "out-of-stock"}" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3 class="product-info-details" data-id="${product.id}">${product.name}</h3>
                <p>${product.description}</p>
                <h4>रु.${product.price}</h4>

                <div class="action-area" id="action-area-${product.id}">
                    ${
                      inStock
                        ? `<button class="add-btn" data-id="${product.id}">Add to cart</button>`
                        : `<button class="add-btn" data-id="${product.id}" disabled>Out of stock</button>`
                    }
                </div>
            </div>
        `;
    });

    if (typeof cart !== "undefined") {
      cart.forEach((item) => {
        if (typeof markAsAdded === "function") markAsAdded(item.id);
      });
    }

    if (paginationEl && typeof paginate === "function") {
      paginate(productsContainer, paginationEl);
    }
  }

  function applyFilterAndSort() {
    currentPage = 1;

    const checkedCategories = Array.from(
      document.querySelectorAll(".filter-category:checked"),
    ).map((el) => el.value);
    const checkedConcerns = Array.from(
      document.querySelectorAll(".filter-concern:checked"),
    ).map((el) => el.value);
    const minPrice =
      parseFloat(document.getElementById("price-min").value) || 0;
    const maxPrice =
      parseFloat(document.getElementById("price-max").value) || Infinity;

    let filtered = baseProducts.filter((product) => {
      const matchesCategory =
        checkedCategories.length === 0 ||
        checkedCategories.includes(product.category);
      const matchesConcern =
        checkedConcerns.length === 0 ||
        checkedConcerns.includes(product.concern);
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;
      return matchesCategory && matchesConcern && matchesPrice;
    });

    const sortValue = sortSelect.value;

    if (sortValue === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name-az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderProducts(filtered);
  }

  document
    .querySelectorAll(".filter-category, .filter-concern")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", applyFilterAndSort);
    });

  document
    .getElementById("price-min")
    .addEventListener("input", applyFilterAndSort);
  document
    .getElementById("price-max")
    .addEventListener("input", applyFilterAndSort);
  sortSelect.addEventListener("change", applyFilterAndSort);

  document
    .getElementById("clear-filters")
    .addEventListener("click", function () {
      document
        .querySelectorAll(".filter-category, .filter-concern")
        .forEach((cb) => (cb.checked = false));
      document.getElementById("price-min").value = "";
      document.getElementById("price-max").value = "";
      sortSelect.value = "featured";
      applyFilterAndSort();
    });

  const filterSidebar = document.getElementById("filter-sidebar");
  const openFilterBtn = document.getElementById("open-filter-sidebar");
  const filterOverlay = document.getElementById("filter-overlay");

  function openFilterSidebar() {
    filterSidebar.classList.add("open");
    if (filterOverlay) filterOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeFilterSidebar() {
    filterSidebar.classList.remove("open");
    if (filterOverlay) filterOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (openFilterBtn) {
    openFilterBtn.addEventListener("click", function () {
      if (filterSidebar.classList.contains("open")) {
        closeFilterSidebar();
      } else {
        openFilterSidebar();
      }
    });
  }

  if (filterOverlay) {
    filterOverlay.addEventListener("click", closeFilterSidebar);
  }

  document.addEventListener("click", function (e) {
    if (!filterSidebar.classList.contains("open")) return;
    const clickedInsideSidebar = filterSidebar.contains(e.target);
    const clickedToggleBtn = openFilterBtn && openFilterBtn.contains(e.target);
    if (!clickedInsideSidebar && !clickedToggleBtn) {
      closeFilterSidebar();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      closeFilterSidebar();
    }
  });

  productsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-btn") && !e.target.disabled) {
      const card = e.target.closest(".card");
      const id = Number(card.dataset.id);
      if (typeof addToCart === "function") addToCart(id);
    }
  });

  renderProducts(baseProducts);
});
