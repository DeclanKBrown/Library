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
    MainTitle = document.querySelector('.title-input').value;
    MainAuthor = document.querySelector('.author-input').value;
    MainPages = document.querySelector('.pages-input').value;
    const selectedFile = addImage.files[0];
    MainFilePath = URL.createObjectURL(selectedFile);
    //Create Object
    let book = new Book(MainTitle, MainAuthor, MainPages, MainFilePath);
    //Add to array
    Library.push(book);
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

function removePopup() {
    document.getElementById('modal').style = 'display:none;'
}

function displayBook() {
    for (book in Library) {
        const card = document.createElement('div');
        card.classList.add('book');
    
        const top = document.createElement('div');
        top.classList.add('top');
    
        const cover = document.createElement('div');
        cover.classList.add('cover');
    
        const img = document.createElement('img');
        img.src = Library[book].file;
    
        const status = document.createElement('div');
        status.classList.add('status');
        status.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>';
    
        const h1 = document.createElement('h1');
        h1.innerHTML = Library[book].title
    
        const h2 = document.createElement('h2');
        h2.innerHTML = Library[book].author;
    
        const h3 = document.createElement('h3');
        h3.innerHTML = Library[book].pages;
    
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
