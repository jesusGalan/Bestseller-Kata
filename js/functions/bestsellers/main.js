import {bookList} from "./books";

// Wait for midnight to update objects ;)
updateOnMidnight()

// Look for the cookie to update visits, if not there bring initial values
if (!getCookie('productList')) {
  document.cookie = 'productList=' + JSON.stringify(bookList)
}

// Look for the cookie to show bestsellers, if not exist bring productList cookie
if (!getCookie('todayList')) {
  document.cookie = 'todayList=' + JSON.stringify(JSON.parse(getCookie('productList')).sort(compare))
}

// Actions for rendering bestsellers
setBestsellers()

// Render all books for simulate visits
renderAllBooks()

function renderAllBooks() {
  for (let books of bookList) {
    const _separator = document.createElement('br');
    const booklink_element = document.createElement('a');
    booklink_element.innerHTML = books.name

    // Simulate visit
    booklink_element.onclick = function (item) {
      const bookTitle = item.target.textContent;
      updateBestsellersCookie(bookTitle); // Update visits on productList cookie
      console.log('1 more visit to ' + bookTitle + '. Wait for tomorrow to see the update.')
    }

    const _books_wrapper = document.getElementById('books')
    _books_wrapper.append(booklink_element);
    _books_wrapper.append(_separator);
  }
}


function updateOnMidnight() {
  let now = new Date();
  let millisTill00am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1, 0, 0) - now;
  if (millisTill00am < 0) {
    millisTill00am += 86400000; // it's after 00:01am, try tomorrow.
  }
  setTimeout(function () {
    updateBestsellersHomeList()
  }, millisTill00am);
}


function updateBestsellersCookie(title) {
  const bookList = JSON.parse(getCookie('productList'));

  const objIndex = bookList.findIndex((obj => obj.name == title));
  bookList[objIndex].visits++
  document.cookie = 'productList=' + JSON.stringify(bookList)
}


function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}


function updateBestsellersHomeList() {
  const _bestseller_wrapper = document.getElementById('bestseller')
  _bestseller_wrapper.innerHTML = '';

  document.cookie = 'todayList=' + JSON.stringify(JSON.parse(getCookie('productList')).sort(compare));

  setBestsellers();
}


function compare(a, b) {
  const visitsA = a.visits;
  const visitsB = b.visits;

  let comparison = 0;
  if (visitsA > visitsB) {
    comparison = 1;
  } else if (visitsA < visitsB) {
    comparison = -1;
  }
  return comparison * -1;
}

function setBestsellers() {
  const LIMIT = 10;
  let count = 0;
  for (let product of JSON.parse(getCookie('todayList'))) {
    if (count < LIMIT) {
      const _element = document.createElement('div');
      _element.innerHTML = product.name + ', visitas: ' + product.visits

      const _bestseller_wrapper = document.getElementById('bestseller')
      _bestseller_wrapper.append(_element)
    }
    count++;
  }
}
