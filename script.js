const BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    subject: "Literary Fiction",
    publishDate: "1925-04-10",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    subject: "Classic Literature",
    publishDate: "1960-07-11",
  },
];
// Constants
const BOOKS_PER_PAGE = 10;
const FILTER_DEBOUNCE_TIME = 500;

// Variables
let books = BOOKS;
let filteredBooks = books;
let currentPage = 1;
let totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
let titleFilter = "";
let authorFilter = "";
let subjectFilter = "";
let publishDateFilter = "";
let titleCount = 0;
let authorCount = 0;
let subjectCount = 0;
let publishDateCount = 0;

// DOM Elements
const bookList = document.getElementById("book-list");
const pagination = document.getElementById("pagination");
const titleFilterInput = document.getElementById("title-filter");
const authorFilterInput = document.getElementById("author-filter");
const subjectFilterInput = document.getElementById("subject-filter");
const publishDateFilterInput = document.getElementById("publish-date-filter");
const applyFiltersBtn = document.getElementById("apply-filters-btn");
const clearFiltersBtn = document.getElementById("clear-filters-btn");
const totalCountElement = document.getElementById("total-count");
const titleCountElement = document.getElementById("title-count");
const authorCountElement = document.getElementById("author-count");
const subjectCountElement = document.getElementById("subject-count");
const publishDateCountElement = document.getElementById("publish-date-count");

// Functions
function renderBookList() {
  // Clear previous book list
  bookList.innerHTML = "";

  // Calculate start and end index of books to display
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  // Render book list
  booksToDisplay.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
			<h3>${book.title}</h3>
			<p>Author: ${book.author}</p>
			<p>Subject: ${book.subject}</p>
			<p>Publish Date: ${book.publishDate}</p>
		`;
    bookList.appendChild(li);
  });

  // Render pagination
  totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pageLink.addEventListener("click", () => {
      currentPage = i;
      renderBookList();
    });
    pagination.appendChild(pageLink);
  }
}

function renderCounts() {
  totalCountElement.textContent = filteredBooks.length;
  titleCountElement.textContent = titleCount;
  authorCountElement.textContent = authorCount;
  subjectCountElement.textContent = subjectCount;
  publishDateCountElement.textContent = publishDateCount;
}

function applyFilters() {
  // Get filter values
  titleFilter = titleFilterInput.value.trim().toLowerCase();
  authorFilter = authorFilterInput.value.trim().toLowerCase();
  subjectFilter = subjectFilterInput.value.trim().toLowerCase();
  publishDateFilter = publishDateFilterInput.value.trim();

  // Filter books
  filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(titleFilter);
    const authorMatch = book.author.toLowerCase().includes(authorFilter);
    const subjectMatch = book.subject.toLowerCase().includes(subjectFilter);
    const publishDateMatch =
      new Date(book.publishDate) >= new Date(publishDateFilter);
    if (titleMatch) titleCount++;

    if (authorMatch) {
      authorCount++;
      if (subjectMatch) {
        subjectCount++;
      }
      if (publishDateMatch) {
        publishDateCount++;
      }
      return titleMatch && authorMatch && subjectMatch && publishDateMatch;
    }
  });

  // Render book list and counts
  currentPage = 1;
  renderBookList();
  renderCounts();
}

function clearFilters() {
  // Clear filter values
  titleFilterInput.value = "";
  authorFilterInput.value = "";
  subjectFilterInput.value = "";
  publishDateFilterInput.value = "";

  // Reset variables
  filteredBooks = books;
  currentPage = 1;
  titleCount = 0;
  authorCount = 0;
  subjectCount = 0;
  publishDateCount = 0;

  // Render book list and counts
  renderBookList();
  renderCounts();
}

// Event listeners
titleFilterInput.addEventListener("input", () => {
  setTimeout(() => applyFilters(), FILTER_DEBOUNCE_TIME);
});

authorFilterInput.addEventListener("input", () => {
  setTimeout(() => applyFilters(), FILTER_DEBOUNCE_TIME);
});

subjectFilterInput.addEventListener("input", () => {
  setTimeout(() => applyFilters(), FILTER_DEBOUNCE_TIME);
});

publishDateFilterInput.addEventListener("change", () => {
  applyFilters();
});

applyFiltersBtn.addEventListener("click", () => {
  applyFilters();
});

clearFiltersBtn.addEventListener("click", () => {
  clearFilters();
});

// Initial render
renderBookList();
renderCounts();
