
const searchBtn = document.getElementById('searchBtn')
const searchInput = document.getElementById('searchInput')
const books = document.getElementById('books')

window.onload = function () {
    searchBooks('programming')
}

searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    if (search === '') {
        alert('Please enter a book name.')
        return
    }
    searchBooks(search)
})

async function searchBooks(search) {
    books.innerHTML = '<h2>Loading...</h2>'
    const response = await fetch(`https://openlibrary.org/search.json?q=${search}`);
    const data = await response.json();
    console.log(data)
    displayBooks(data.docs)
}

function displayBooks(bookList) {
    books.innerHTML = '';

    if (bookList.length === 0) {
        books.innerHTML = "<h2>No Book Found</h2>";
        return
    }
    bookList.forEach((book) => {
        let image = 'https://demofree.sirv.com/nope-not-here.jpg'
        if (book.cover_i) {
            image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }

        books.innerHTML += `
            <div class='book'> <img src=${image}><h2>${book.title}</h2> </div>`
    });
}
