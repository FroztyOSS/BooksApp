{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list'
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

      /* add book to menu[?] */
      bookContainer.appendChild(generatedDOM);
    }
  }

  render();
} 