
const cardsPerPage = 8;
let currentPage = 1;

function paginate(container, paginationEl) {
    const cards = Array.from(container.getElementsByClassName('card'));
    const totalPages = Math.max(1, Math.ceil(cards.length / cardsPerPage));
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card, i) => {
        card.style.display = (i >= start && i < end) ? '' : 'none';
    });

    paginationEl.innerHTML = `
        <button class="prev-page" id="prev-page" ${currentPage === 1 ? 'disabled' : ''}> < </button>
        <span> ${currentPage}</span>
        <button class="next-page" id="next-page" ${currentPage === totalPages ? 'disabled' : ''}> > </button>
    `;

    document.getElementById('prev-page').onclick = () => {
        currentPage--;
        paginate(container, paginationEl);
    };
    document.getElementById('next-page').onclick = () => {
        currentPage++;
        paginate(container, paginationEl);
    };
}