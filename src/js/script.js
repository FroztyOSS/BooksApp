{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookImages: '.book__image',
      bookFilters: '.filters',
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
  
  

  const favoriteBooks = [];

  const filters = [];

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

    const booksFilters = document.querySelector(select.containerOf.bookFilters);
    console.log('booksFilters', booksFilters);

    booksFilters.addEventListener('click', function(callback){
      const clickElement = callback.target;

      if(clickElement.tagName == 'INPUT' && clickElement.type == 'checkbox' && clickElement.name == 'filter'){
        console.log('clickElement', clickElement);

        if(clickElement.checked){
          filters.push(clickElement.value);
          console.log(filters);

        } else {
          const indexValue = filters.indexOf(clickElement.value);
          filters.splice(indexValue, 1);

        }
      }

      filterBooks();

    }); 


  }

  function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden;
      const filterHiddenBooks = document.querySelector('.book__image[data-id="' + book.id + '"]');

      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      if(shouldBeHidden){
        filterHiddenBooks.classList.add('hidden');
      } else {
        filterHiddenBooks.classList.remove('hidden');
      }

    }
  }


  render();
  initActions();
} 