{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookImages: '.book__image',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  function render(){
    for(let book of dataSource.books){
    /* generate HTML based on template */
      const generatedHTML = templates.bookTemplate(book);

      /* create element using utils.createElementFromHTML */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      /* find book container */
      const bookContainer = document.querySelector(select.containerOf.bookList);

      /* add book to menu */
      bookContainer.appendChild(generatedDOM);
    }
  }
  render();
  

  const favoriteBooks = [];

  function initActions(){

    const booksList = document.querySelector(select.containerOf.bookList);
    console.log('booksList', booksList);

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const image = event.target.offsetParent;
      const bookId = image.getAttribute('data-id');
      console.log('bookId', bookId);

      if(!favoriteBooks.includes(bookId)){
        image.classList.add('favorite');
        favoriteBooks.push(bookId);

      } else {
        const indexBooks = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexBooks);
        image.classList.remove('favorite');

      }

      console.log('favoriteBooks', favoriteBooks);

    });
  }

  initActions();

} 