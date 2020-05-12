class Book {
    constructor(name, year, review) {
      this.name = name;
      this.year = year;
      this.review = review;
    }
  }
  
  class UI {
    addBookToList(book) {
      
      const list = document.getElementById('book-list');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.year}</td>
        <td>${book.review}</td>
        <td><a href=""  class="delete" ><span  class="fas fa-2x fa-trash-alt"></span></a></td>
      `;
    
      list.appendChild(row);
  
    }
  
    showAlert(message) {
      document.querySelector('.error').style.display=('block');
      document.querySelector('.error').innerHTML=`${message}`;
      setTimeout(function(){
        document.querySelector('.error').remove();
      }, 3000);
    }
  
    deleteBook(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('name').value = '';
      document.getElementById('year').value = '';
      document.getElementById('review').value = '';
    }
  }
  
  // Local Storage Class
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach(function(book){
        const ui  = new UI;
        ui.addBookToList(book);
      });
    }
  
    static addBook(book) {
      const books = Store.getBooks();
  
      books.push(book);
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(review) {
      const books = Store.getBooks();
  
      books.forEach(function(book, index){
       if(book.review === review) {
        books.splice(index, 1);
       }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayBooks);

  document.getElementById('book-form').addEventListener('submit', function(e){
    const name = document.getElementById('name').value,
          year = document.getElementById('year').value,
          review = document.getElementById('review').value;


    const book = new Book(name, year, review);
   
    const ui = new UI();
    if(name === '' || year === '' || review === '') {
      ui.showAlert('Please fill in all fields');

    } else {
      ui.addBookToList(book);
  
      // Add to LS
      Store.addBook(book);
  
      ui.clearFields();
    }
   
    e.preventDefault();
  });

  document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
  
    // Remove from LS
    Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
    //console.log(e.target.parentElement.parentElement.previousElementSibling)
    ui.showAlert('Film Removed');
    e.preventDefault();
  });