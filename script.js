let Library = [];

function Book(title, author, pages, file) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.file = file;
}

const addbtn = document.querySelector('.add');
addbtn.addEventListener('click', addBook);

let title;
let author;
let pages;
let filePath;
let selectedFile;

// Displays Cover in Add Book Pop up
const addImage = document.querySelector('.addImage');
const bookCover = document.querySelector('.cover-input');
addImage.addEventListener('change', function() {
    const selectedFile = addImage.files[0];
    if (selectedFile) {
        const filePath = URL.createObjectURL(selectedFile);
        bookCover.src = filePath;
    }
})

// Add Book 
const submit = document.querySelector('.submit');
submit.addEventListener('click', function() {
    //Get Values from input 
    title = document.querySelector('.title-input').value;
    author = document.querySelector('.author-input').value;
    pages = document.querySelector('.pages-input').value;
    selectedFile = addImage.files[0];
    filePath = URL.createObjectURL(selectedFile);
    //Create Object
    let book = new Book(title, author, pages, filePath);
    //Save Library to local
    let existingLibrary = localStorage.getItem('Library');
    if (existingLibrary) {
        existingLibrary = JSON.parse(existingLibrary);
        for (let existBook in existingLibrary) {
            Library.push(existingLibrary[existBook]);
        }
    } else {
    existingLibrary = [];
    }
    Library.push(book);
    localStorage.setItem('Library', JSON.stringify(Library));
    displayBook();
    removePopup();
})

const cancel = document.querySelector('.cancel');
cancel.addEventListener('click', function() {
    removePopup();
})

function addBook() {
    document.getElementById('modal').classList.add('overlay')
    document.getElementById('modal').style = 'display:grid;'
}

//Remvove Pop up and reset values
function removePopup() {
    document.querySelector('.title-input').value = '';
    document.querySelector('.author-input').value = '';
    document.querySelector('.pages-input').value = '';
    const selectedFile = addImage.files[0];
    addImage.value = '';
    bookCover.src = '';
    document.getElementById('modal').style = 'display:none;';
}

//Display the books in page load
function onPageLoad() {
    let books = JSON.parse(localStorage.getItem('Library'));
    console.log(typeof books)
    for (let book in books) {
        const card = document.createElement('div');
        card.classList.add('book');
    
        const top = document.createElement('div');
        top.classList.add('top');
    
        const cover = document.createElement('div');
        cover.classList.add('cover');
    
        const img = document.createElement('img');
        img.src = books[book].file;
    
        const status = document.createElement('div');
        status.classList.add('status');
        status.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>';
    
        const h1 = document.createElement('h1');
        h1.innerHTML = books[book].title
    
        const h2 = document.createElement('h2');
        h2.innerHTML = books[book].author;
    
        const h3 = document.createElement('h3');
        h3.innerHTML = books[book].pages;
    
        card.appendChild(top);
        top.appendChild(cover);
        cover.appendChild(img);
        top.appendChild(status);
        card.appendChild(h1);
        card.appendChild(h2);
        card.appendChild(h3);
    
        const inner = document.querySelector('.book-display-inner');
        inner.appendChild(card);
    }
}
window.onload = onPageLoad;

function displayBook() {
    let book = Library[Library.length - 1];
    const card = document.createElement('div');
        card.classList.add('book');
    
        const top = document.createElement('div');
        top.classList.add('top');
    
        const cover = document.createElement('div');
        cover.classList.add('cover');
    
        const img = document.createElement('img');
        img.src = book.file;
    
        const status = document.createElement('div');
        status.classList.add('status');
        status.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>';
    
        const h1 = document.createElement('h1');
        h1.innerHTML = book.title
    
        const h2 = document.createElement('h2');
        h2.innerHTML = book.author;
    
        const h3 = document.createElement('h3');
        h3.innerHTML = book.pages;
    
        card.appendChild(top);
        top.appendChild(cover);
        cover.appendChild(img);
        top.appendChild(status);
        card.appendChild(h1);
        card.appendChild(h2);
        card.appendChild(h3);
    
        const inner = document.querySelector('.book-display-inner');
        inner.appendChild(card);
}
