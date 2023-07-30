let Library = [];

function Book(title, author, pages, file, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.file = file
    this.status = status;
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

//Remove Red outline
let title1 = document.querySelector('.title-input');
title1.addEventListener('blur', removeTErr);
let author1 = document.querySelector('.author-input');
author1.addEventListener('blur', removeAErr);
let pages1 = document.querySelector('.pages-input');
pages1.addEventListener('blur', removePErr);
function removeTErr() {
    title1.classList.remove('invalid-input');
}
function removeAErr() {
    author1.classList.remove('invalid-input')
}
function removePErr() {
    pages1.classList.remove('invalid-input')
}

// Add Book 
const submit = document.querySelector('.submit');
submit.addEventListener('click', function() {
    //Get Values from input 
    title = document.querySelector('.title-input').value;
    if (title == '') {
        document.querySelector('.title-input').classList.add('invalid-input')
    }
    author = document.querySelector('.author-input').value;
    if (author == '') {
        document.querySelector('.author-input').classList.add('invalid-input')
    }
    pages = document.querySelector('.pages-input').value;
    if (pages == '') {
        document.querySelector('.pages-input').classList.add('invalid-input')
    }
    selectedFile = addImage.files[0];
    if (typeof selectedFile != 'undefined') {
        filePath = URL.createObjectURL(selectedFile);
    } else {
        addImage.classList.add('invalid-image')
    }
    if (title !== '' && author != '' && pages != '' && typeof filePath != 'undefined') {
        //Create Object
        let book = new Book(title, author, pages, filePath, 'haven\'t read');
        //Save Library to local
        Library.push(book);
        localStorage.setItem('Library', JSON.stringify(Library));
        displayBook();
        removePopup();
    }
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
    document.querySelector('.title-input').classList.remove('invalid-input')
    document.querySelector('.author-input').classList.remove('invalid-input')
    document.querySelector('.pages-input').classList.remove('invalid-input')

}

//Display the books in page load
function onPageLoad() {
    let existingLibrary = localStorage.getItem('Library'); // Get the preexisting items from local sotrage and add to the array
    if (existingLibrary) {                                  
        existingLibrary = JSON.parse(existingLibrary);
        for (let existBook in existingLibrary) {
            Library.push(existingLibrary[existBook]);  
        }
    }

    for (let book in Library) {
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
        // status.innerHTML = `<svg class="${book} read-status havent-read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>`;
        status.innerHTML = getStatus(book);

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
        attachEventList();
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
        
        let index = Library.length - 1;
        status.innerHTML = `<svg class="${index} read-status havent-read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>`;

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
        attachEventList();
}

//CHANGE READ STATUS
function attachEventList() {
    let readStatus = document.querySelectorAll('.read-status');
    readStatus.forEach((element) => {
    element.addEventListener('click', changeStatus);
    });
}

function changeStatus() {
    if (this.classList.contains('have-read')) {
        this.classList.remove('have-read');
        this.classList.add('havent-read');
        let index = parseInt(this.classList[0]);
        Library[index].status = 'haven\'t read';
    } else if (this.classList.contains('havent-read')) {
        this.classList.remove('havent-read');
        this.classList.add('am-reading');
        let index = parseInt(this.classList[0]);
        Library[index].status = 'reading';
    } else if (this.classList.contains('am-reading')) {
        this.classList.remove('am-reading');
        this.classList.add('have-read');
        let index = parseInt(this.classList[0]);
        Library[index].status = 'read';
    }
    localStorage.setItem('Library', JSON.stringify(Library));
}

//GETS READING STATUS AND DISPLAYS 
function getStatus(book) {
    if (Library[book].status == 'read') {
        return `<svg class="${book} read-status have-read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>`;
    } else if (Library[book].status == 'haven\'t read') {
        return `<svg class="${book} read-status havent-read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>`;
    } else if (Library[book].status == 'reading') {
        return `<svg class="${book} read-status am-reading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-full</title><path d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z" /></svg>`;
    }
}
