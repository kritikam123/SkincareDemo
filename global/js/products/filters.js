function initProductFilters({ baseProducts, container, renderCard}) {
    const concernBoxes = document.querySelectorAll(".filter-concern");
    const availabilityBoxes = document.querySelectorAll(".filter-availability");
    const priceMin = document.getElementById("price-min");
    const priceMax = document.getElementById("price-max");
    const sortSelect = document.getElementById("sort-select");
    const clearBtn = document.getElementById("clear-filters");
    const resultsCount = document.getElementById("results-count");
    const noResult = document.getElementById("no-result");

    const getChecked = (list) =>
        Array.from(list).filter(cb => cb.checked).map(cb => cb.value);

    function applyFilters(){
        let filtered = [...baseProducts]; //so original array wont change

        const concerns = getChecked(concernBoxes);
        if(concerns.length){
            filtered = filtered.filter(p => concerns.includes(p.concern));
        }
        const availability = getChecked(availabilityBoxes);
        if(availability.length){
            filtered = filtered.filter(p => {
                const status = p.inStock ? "Instock" : "Outofstock";
                return availability.includes(status);
            });
        }

        const min = parseFloat(priceMin.value);
        const max = parseFloat(priceMax.value);
        if(!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
        if(!isNaN(max)) filtered = filtered.filter(p => p.price <= max);

        switch (sortSelect.value){
            case "price-low": filtered.sort((a,b) => a.price - b.price); break;
            case "price-high": filtered.sort((a,b) => b.price - a.price); break;
            case "name-az": filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
            case "name-za": filtered.sort((a,b) => b.name.localeCompare(a.name)); break;
        }
        render(filtered);
    }

    function render(list) {
        container.querySelectorAll(".card").forEach(c => c.remove());

        if(list.length === 0) {
            noResult.style.display = "block";
        } else{
            noResult.style.display = "none";
            list.forEach(p => container.insertAdjacentHTML("beforeend", renderCard(p)));
        }

        resultsCount.textContent = `Showing ${list.length} product${list.length !== 1 ? "s" : ""}`;

        if (typeof cart !== "undefined"){
            cart.forEach(item => {
                if (typeof markAsAdded === "function") markAsAdded(item.id);
            });
        }
    }

    [...concernBoxes, ...availabilityBoxes].forEach(cb =>
        cb.addEventListener("change", applyFilters)
    );
    priceMin.addEventListener("input", applyFilters);
    priceMax.addEventListener("input", applyFilters);
    sortSelect.addEventListener("change", applyFilters);

    clearBtn.addEventListener("click", () => {
        [...concernBoxes, ...availabilityBoxes].forEach(cb => cb.checked = false);
        priceMin.value = "";
        priceMax.value = "";
        sortSelect.value = "featured";
        applyFilters();
    });

    applyFilters();
}