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


  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.bookContainer = document.querySelector(select.containerOf.bookList);
    }

    render(){
      const thisBooksList = this;
      
      for(let book of dataSource.books){
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        /* generate HTML based on template */
        const generatedHTML = templates.bookTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });

        /* create element using utils.createElementFromHTML */
        thisBooksList.elem = utils.createDOMFromHTML(generatedHTML);

        /* find book container */
        const bookContainer = document.querySelector(select.containerOf.bookList);

        /* add book to menu[?] */
        bookContainer.appendChild(thisBooksList.elem);
      }
    }


    initActions(){
      const thisBooksList = this;

      //const booksList = document.querySelector(select.containerOf.bookList);
      //console.log('booksList', booksList);

      thisBooksList.bookContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id');
        console.log('bookId', bookId);

        if(!thisBooksList.favoriteBooks.includes(bookId)){
          image.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);

        } else {
          const indexBook = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(indexBook, 1);
          image.classList.remove('favorite');
        }

        console.log('favoriteBooks', thisBooksList.favoriteBooks);

      });

      const booksFilters = document.querySelector(select.containerOf.bookFilters);
      console.log('booksFilters', booksFilters);

      booksFilters.addEventListener('click', function(callback){
        const clickElement = callback.target;

        if(clickElement.tagName == 'INPUT' && clickElement.type == 'checkbox' && clickElement.name == 'filter'){
          console.log('clickElement', clickElement);

          if(clickElement.checked){
            thisBooksList.filters.push(clickElement.value);
          } else {
            const indexOfValue = thisBooksList.filters.indexOf(clickElement.value);
            thisBooksList.filters.splice(indexOfValue, 1);
          }
        }

        thisBooksList.filterBooks();
      });

    }

    filterBooks(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden;
        const filterHiddenBooks = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for(const filter of thisBooksList.filters){
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

    determineRatingBgc(rating){
      let background = '';

      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    }
  }

  const app = new BooksList();

  app;
}