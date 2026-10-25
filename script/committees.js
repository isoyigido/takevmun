// Select all the grid boxes
const items = document.querySelectorAll('.grid-item');

items.forEach(item => {
    item.addEventListener('click', (event) => {
        // Toggle the 'active' class on the clicked box
        item.classList.toggle('active');

        // Optional: Close any *other* open descriptions when a new one is clicked
        items.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});