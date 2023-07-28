let Library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addbtn = document.querySelector('.add');
addbtn.addEventListener('click', addBook);

let MainTitle;
let MainAuthor;
let MainPages;
let MainFilePath;

function addBook() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const popup = document.createElement('div');
    popup.classList.add('book-input');

    const popupInner = document.createElement('div');
    popupInner.classList.add('popup-inner');

    const addTitle = document.createElement('h1');
    addTitle.classList.add('add-title');
    addTitle.innerHTML = 'Add Book';

    const bookCover = document.createElement('img')
    bookCover.classList.add('cover-input')

    const addImage = document.createElement('input');
    addImage.type = 'file';
    addImage.innerHTML = 'Add Cover';

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    const title = document.createElement('span');
    title.classList.add('info-input');
    title.innerHTML = 'Title:';

    const titleInput = document.createElement('input')
    titleInput.type = 'text';
    titleInput.classList.add('TAP');

    const author = document.createElement('span');
    author.classList.add('info-input');
    author.innerHTML = 'Author';

    const authorInput = document.createElement('input')
    authorInput.type = 'text';
    authorInput.classList.add('TAP');

    const pages = document.createElement('span');
    pages.classList.add('info-input');
    pages.innerHTML = 'Pages';

    const pagesInput = document.createElement('input')
    pagesInput.type = 'text';
    pagesInput.classList.add('TAP');

    const scbtn = document.createElement('div');
    scbtn.classList.add('sc-btn');

    const cancel = document.createElement('Button');
    cancel.innerHTML = 'Cancel';
    cancel.classList.add('sc-btns');
    cancel.classList.add('cancel');

    const submit = document.createElement('Button');
    submit.innerHTML = 'Add';
    submit.classList.add('sc-btns');
    submit.classList.add('Submit');

    document.body.appendChild(overlay);
    overlay.appendChild(popup);
    popup.appendChild(popupInner);
    popupInner.appendChild(addTitle);
    popupInner.appendChild(bookCover);
    popupInner.appendChild(addImage);
    popupInner.appendChild(bookInfo)
    bookInfo.appendChild(title);
    bookInfo.appendChild(titleInput);
    bookInfo.appendChild(author);
    bookInfo.appendChild(authorInput);
    bookInfo.appendChild(pages);
    bookInfo.appendChild(pagesInput);
    popupInner.appendChild(scbtn);
    scbtn.appendChild(cancel);
    scbtn.appendChild(submit);

    addImage.addEventListener('change', function() {
        const selectedFile = addImage.files[0];
        if (selectedFile) {
            const filePath = URL.createObjectURL(selectedFile);
            bookCover.src = filePath;
        }
    })

    submit.addEventListener('click', function() {
        MainTitle = titleInput.value;
        MainAuthor = authorInput.value;
        MainPages = pagesInput.value;
        const selectedFile = addImage.files[0];
        MainFilePath = URL.createObjectURL(selectedFile);
        removePopup();
    })

    cancel.addEventListener('click', function() {
        removePopup();
    })
}