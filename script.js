let Library = [];

function Book(title, author, pages, file) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.file = file;
}

const addbtn = document.querySelector('.add');
addbtn.addEventListener('click', showBook);

let title;
let author;
let pages;
let filePath;


const addImage = document.querySelector('.addImage');
const bookCover = document.querySelector('.cover-input');
addImage.addEventListener('change', function() {
    const selectedFile = addImage.files[0];
    if (selectedFile) {
        const filePath = URL.createObjectURL(selectedFile);
        bookCover.src = filePath;
    }
})

const submit = document.querySelector('.submit');
submit.addEventListener('click', function() {
    //GetValues from input 
    MainTitle = titleInput.value;
    MainAuthor = authorInput.value;
    MainPages = pagesInput.value;
    const selectedFile = addImage.files[0];
    MainFilePath = URL.createObjectURL(selectedFile);
    //Create Object
    let book = Book(MainTitle, MainAuthor, MainPages, MainFilePath);
    //Add to array
    Library.push(book);
    removePopup();
})

const cancel = document.querySelector('.cancel');
cancel.addEventListener('click', function() {
    removePopup();
})

function showBook() {
    document.getElementById('modal').classList.add('overlay')
    document.getElementById('modal').style = 'display:grid;'
}

function removePopup() {
    document.getElementById('modal').style = 'display:none;'
}