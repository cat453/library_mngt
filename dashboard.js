(() => {
  const MAX_BORROWED = 5;
  // A compact, balanced mix of titles for the Overview shelf.
  const overviewRecommendationIds = new Set([
    "python-crash-course",
    "brief-history-of-time",
    "cosmos",
    "to-kill-a-mockingbird",
    "sapiens",
  ]);
  const books = [
    {
      id: "python-crash-course",
      bookId: "LIB-0001",
      pages: 560,
      title: "Python Crash Course",
      author: "Eric Matthes",
      published: "2019",
      category: "IT",
      description: "A hands-on introduction to Python that teaches programming fundamentals through practical projects, including games, data visualizations, and web applications.",
      tag: "IT",
      cover: "#28527a",
      coverBg: "#eaf1f7",
      accent: "#f2c14e",
      art: "circle",
    },
    {
      id: "automate-boring-stuff",
      bookId: "LIB-0002",
      pages: 592,
      title: "Automate the Boring Stuff with Python",
      author: "Al Sweigart",
      published: "2019",
      category: "IT",
      description: "A practical guide to using Python to automate everyday computer tasks, from working with files and spreadsheets to web browsing and data entry.",
      tag: "IT",
      cover: "#3b6b4f",
      coverBg: "#edf4ee",
      accent: "#e3c46b",
      art: "moon",
    },
    {
      id: "clean-code",
      bookId: "LIB-0003",
      pages: 464,
      title: "Clean Code",
      author: "Robert C. Martin",
      published: "2008",
      category: "IT",
      description: "A guide to writing readable, maintainable software, with principles and examples for naming, functions, testing, and improving code safely.",
      tag: "IT",
      cover: "#364152",
      coverBg: "#edf0f4",
      accent: "#83b0a4",
      art: "sun",
    },
    {
      id: "computer-networking-top-down",
      bookId: "LIB-0004",
      pages: 864,
      title: "Computer Networking: A Top-Down Approach",
      author: "James Kurose and Keith Ross",
      published: "2021",
      category: "IT",
      description: "An introduction to computer networks that explains internet protocols and network applications from the top down, connecting concepts to real-world examples.",
      tag: "IT",
      cover: "#28527a",
      coverBg: "#e9f0f8",
      accent: "#7cb8d2",
      art: "circle",
    },
    {
      id: "head-first-java",
      bookId: "LIB-0005",
      pages: 720,
      title: "Head First Java",
      author: "Kathy Sierra and Bert Bates",
      published: "2022",
      category: "IT",
      description: "A visual, project-based introduction to Java programming, covering core language concepts, object-oriented design, and building useful applications.",
      tag: "IT",
      cover: "#70538c",
      coverBg: "#f1edf7",
      accent: "#e1b85f",
      art: "moon",
    },
    {
      id: "brief-history-of-time",
      bookId: "LIB-0006",
      pages: 256,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      published: "1988",
      category: "Science",
      description: "Stephen Hawking introduces big questions about the universe, including the nature of space and time, black holes, and the origins of the cosmos.",
      tag: "Science",
      cover: "#24365b",
      coverBg: "#ebeff7",
      accent: "#d7a965",
      art: "moon",
    },
    {
      id: "cosmos",
      bookId: "LIB-0007",
      pages: 384,
      title: "Cosmos",
      author: "Carl Sagan",
      published: "1980",
      category: "Science",
      description: "Carl Sagan explores the history of scientific discovery and humanity's place in the universe, from the scale of the cosmos to life on Earth.",
      tag: "Science",
      cover: "#235b73",
      coverBg: "#e7f1f4",
      accent: "#e4bb6d",
      art: "circle",
    },
    {
      id: "selfish-gene",
      bookId: "LIB-0008",
      pages: 360,
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      published: "1976",
      category: "Science",
      description: "An influential explanation of evolution that examines natural selection through the lens of genes and how traits spread across generations.",
      tag: "Science",
      cover: "#54744b",
      coverBg: "#edf2e9",
      accent: "#d9b66c",
      art: "sun",
    },
    {
      id: "the-gene",
      bookId: "LIB-0009",
      pages: 608,
      title: "The Gene: An Intimate History",
      author: "Siddhartha Mukherjee",
      published: "2016",
      category: "Science",
      description: "A history of genetics that follows the scientists, discoveries, and ethical questions that have shaped our understanding of heredity.",
      tag: "Science",
      cover: "#874e53",
      coverBg: "#f6eded",
      accent: "#dfb76d",
      art: "circle",
    },
    {
      id: "elegant-universe",
      bookId: "LIB-0010",
      pages: 448,
      title: "The Elegant Universe",
      author: "Brian Greene",
      published: "1999",
      category: "Science",
      description: "Brian Greene introduces modern physics and string theory, explaining how researchers seek a unified account of the fundamental forces of nature.",
      tag: "Science",
      cover: "#304d72",
      coverBg: "#eaf0f7",
      accent: "#d5ae70",
      art: "moon",
    },
    {
      id: "to-kill-a-mockingbird",
      bookId: "LIB-0011",
      pages: 336,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      published: "1960",
      category: "English",
      description: "Through Scout Finch's childhood in the American South, Harper Lee explores justice, empathy, family, and the consequences of prejudice.",
      tag: "English",
      cover: "#8a6b43",
      coverBg: "#f4efe7",
      accent: "#d2b676",
      art: "sun",
    },
    {
      id: "pride-and-prejudice",
      bookId: "LIB-0012",
      pages: 432,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      published: "1813",
      category: "English",
      description: "Elizabeth Bennet navigates family expectations, first impressions, and questions of class and marriage in Jane Austen's classic novel.",
      tag: "English",
      cover: "#9a6472",
      coverBg: "#f7edf0",
      accent: "#d6b26f",
      art: "circle",
    },
    {
      id: "great-gatsby",
      bookId: "LIB-0013",
      pages: 180,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      published: "1925",
      category: "English",
      description: "Set during the Jazz Age, this novel follows Nick Carraway's encounters with Jay Gatsby and explores ambition, love, and the American Dream.",
      tag: "English",
      cover: "#365f61",
      coverBg: "#eaf2f0",
      accent: "#ddbd70",
      art: "moon",
    },
    {
      id: "1984",
      bookId: "LIB-0014",
      pages: 328,
      title: "1984",
      author: "George Orwell",
      published: "1949",
      category: "English",
      description: "George Orwell's dystopian novel follows Winston Smith as he struggles to think and act freely under an all-seeing political regime.",
      tag: "English",
      cover: "#7a4144",
      coverBg: "#f5ebeb",
      accent: "#d6ad6c",
      art: "sun",
    },
    {
      id: "the-hobbit",
      bookId: "LIB-0015",
      pages: 310,
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      published: "1937",
      category: "English",
      description: "Bilbo Baggins leaves his quiet home on an unexpected journey with a company of dwarves, discovering courage, friendship, and adventure.",
      tag: "English",
      cover: "#55714a",
      coverBg: "#edf2e8",
      accent: "#dfbb6a",
      art: "circle",
    },
    {
      id: "sapiens",
      bookId: "LIB-0016",
      pages: 464,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      published: "2011",
      category: "Social Studies",
      description: "A broad overview of human history, tracing how shared beliefs, agriculture, science, and political systems shaped societies.",
      tag: "Social Studies",
      cover: "#8b6843",
      coverBg: "#f4efe7",
      accent: "#d9b773",
      art: "sun",
    },
    {
      id: "factfulness",
      bookId: "LIB-0017",
      pages: 352,
      title: "Factfulness",
      author: "Hans Rosling, Ola Rosling, and Anna Rosling Rönnlund",
      published: "2018",
      category: "Social Studies",
      description: "A data-informed guide to understanding global trends, challenging common misconceptions about health, poverty, education, and development.",
      tag: "Social Studies",
      cover: "#3f776f",
      coverBg: "#eaf3f0",
      accent: "#e3bf70",
      art: "circle",
    },
    {
      id: "silk-roads",
      bookId: "LIB-0018",
      pages: 656,
      title: "The Silk Roads: A New History of the World",
      author: "Peter Frankopan",
      published: "2015",
      category: "Social Studies",
      description: "A world history centered on the networks linking Europe and Asia, showing how trade, culture, and power moved across the Silk Roads.",
      tag: "Social Studies",
      cover: "#805c44",
      coverBg: "#f4eee8",
      accent: "#d6ae6c",
      art: "moon",
    },
    {
      id: "little-history-of-world",
      bookId: "LIB-0019",
      pages: 304,
      title: "A Little History of the World",
      author: "E. H. Gombrich",
      published: "1935",
      category: "Social Studies",
      description: "A lively, accessible introduction to world history that moves from early civilizations through major events and cultural changes.",
      tag: "Social Studies",
      cover: "#496b84",
      coverBg: "#eaf0f5",
      accent: "#d9b870",
      art: "sun",
    },
    {
      id: "why-nations-fail",
      bookId: "LIB-0020",
      pages: 544,
      title: "Why Nations Fail",
      author: "Daron Acemoglu and James A. Robinson",
      published: "2012",
      category: "Social Studies",
      description: "An examination of how political and economic institutions shape prosperity, opportunity, and the long-term development of nations.",
      tag: "Social Studies",
      cover: "#61537a",
      coverBg: "#f0edf5",
      accent: "#d7b36c",
      art: "circle",
    },
  ];
  const customBooksKey = "libraryhub-custom-books-v1";
  const catalogStateKey = "libraryhub-catalog-state-v1";
  function loadCustomBooks() {
    try {
      const saved = JSON.parse(localStorage.getItem(customBooksKey) || "[]");
      return Array.isArray(saved)
        ? saved.filter((book) => book && book.id && book.title && /^data:image\/(jpeg|png|webp);base64,/i.test(book.coverImage || ""))
        : [];
    } catch {
      return [];
    }
  }
  books.push(...loadCustomBooks());
  function loadCatalogState() {
    try {
      const value = JSON.parse(localStorage.getItem(catalogStateKey) || "{}");
      return {
        removedBookIds: Array.isArray(value.removedBookIds) ? value.removedBookIds : [],
        quantities: value.quantities && typeof value.quantities === "object" ? value.quantities : {},
      };
    } catch {
      return { removedBookIds: [], quantities: {} };
    }
  }
  let catalogState = loadCatalogState();
  function getTotalCopies(bookId) {
    const quantity = catalogState.quantities[bookId];
    return Number.isInteger(quantity) && quantity >= 0 ? quantity : 1;
  }
  function getAvailableCopies(bookId) {
    return Math.max(0, getTotalCopies(bookId) - borrowed.filter((id) => id === bookId).length);
  }
  const storageKey = "libraryhub-borrowed-v1";
  const favoritesKey = "libraryhub-favorites-v1";
  const readBooksKey = "libraryhub-read-books-v1";
  const returnHistoryKey = "libraryhub-return-history-v1";
  const requestsKey = "libraryhub-book-requests-v1";
  const notificationsKey = "libraryhub-notifications-v1";
  const sharedCover = new URL("../images/cover.jpeg", document.baseURI).href;
  const grid = document.getElementById("book-grid");
  const borrowedGrid = document.getElementById("borrowed-grid");
  const browseGrid = document.getElementById("browse-grid");
  const browseSearch = document.getElementById("browse-search");
  const browseResultCount = document.getElementById("browse-result-count");
  const browseEmpty = document.getElementById("browse-empty");
  const clearBrowseFilters = document.getElementById("clear-browse-filters");
  const favoritesGrid = document.getElementById("favorites-grid");
  const onTimeGrid = document.getElementById("on-time-grid");
  const toast = document.getElementById("toast");
  let dueDates = loadDueDates();
  const viewTitles = {
    overview: "Overview",
    browse: "Browse books",
    borrowed: "My borrowed books",
    requests: "Book requests",
    favorites: "Favorites",
    "log-books": "Returned on time",
    settings: "Settings",
  };
  let currentView = "overview";
  const expandedBrowseCategories = new Set();
  let toastTimer;
  let borrowed = loadBorrowed();
  let favorites = loadFavorites();
  let readBooks = loadReadBooks();
  let returnHistory = loadReturnHistory();
  let requests = loadStoredArray(requestsKey);
  let notifications = loadStoredArray(notificationsKey);
  function loadStoredArray(key) {
    try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; }
  }
  function saveStoredArray(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage unavailable. */ } }
  function addNotification(message) {
    notifications.unshift({ message, createdAt: new Date().toISOString(), read: false });
    notifications = notifications.slice(0, 30);
    saveStoredArray(notificationsKey, notifications);
    renderNotifications();
  }
  function renderNotifications() {
    const list = document.getElementById("notification-list");
    const count = document.getElementById("notification-count");
    if (!list || !count) return;
    const unread = notifications.filter((item) => !item.read).length;
    count.textContent = unread; count.hidden = unread === 0;
    list.innerHTML = notifications.length ? notifications.map((item) => {
      const timestamp = new Date(item.createdAt);
      const date = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(timestamp);
      const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(timestamp);
      return `<article class="notification-item"><p>${esc(item.message)}</p><small>${date} · ${time}</small></article>`;
    }).join("") : `<p class="notification-empty">No notifications yet. Updates about your book requests will appear here.</p>`;
  }

  function loadBorrowed() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(value)
        ? value.filter((id) => books.some((book) => book.id === id))
        : [];
    } catch {
      return [];
    }
  }
  function loadFavorites() {
    try {
      const value = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
      return Array.isArray(value)
        ? value.filter((id) => books.some((book) => book.id === id))
        : [];
    } catch {
      return [];
    }
  }
  function loadReturnHistory() {
    try {
      const value = JSON.parse(localStorage.getItem(returnHistoryKey) || "[]");
      return Array.isArray(value)
        ? value.filter(
            (record) =>
              record &&
              books.some((book) => book.id === record.bookId) &&
              typeof record.returnedAt === "string",
          )
        : [];
    } catch {
      return [];
    }
  }
  function saveReturnHistory() {
    try {
      localStorage.setItem(returnHistoryKey, JSON.stringify(returnHistory));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }
  function recordReturn(bookId, dueAt) {
    const returnedAt = new Date().toISOString();
    const isOnTime = Boolean(dueAt) && new Date(returnedAt) <= new Date(dueAt);
    const record = { bookId, returnedAt, dueAt: dueAt || null, isOnTime };
    returnHistory.push(record);
    saveReturnHistory();
    return record;
  }
  function loadReadBooks() {
    try {
      const value = JSON.parse(localStorage.getItem(readBooksKey) || "{}");
      return value && typeof value === "object" && !Array.isArray(value)
        ? value
        : {};
    } catch {
      return {};
    }
  }
  function saveReadBooks() {
    try {
      localStorage.setItem(readBooksKey, JSON.stringify(readBooks));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }
  function recordBookAsRead(bookId) {
    readBooks[bookId] = new Date().toISOString();
    saveReadBooks();
  }
  function saveFavorites() {
    try {
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }
  function saveBorrowed() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(borrowed));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }
  function loadDueDates() {
    try {
      const value = JSON.parse(
        localStorage.getItem("libraryhub-due-dates-v1") || "{}",
      );
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }
  function saveDueDates() {
    try {
      localStorage.setItem("libraryhub-due-dates-v1", JSON.stringify(dueDates));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }
  function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  }
  function dateInputValue(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  function chosenDueDate(dateValue) {
    const [year, month, day] = dateValue.split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59).toISOString();
  }
  function prepareReturnDate() {
    const input = document.getElementById("borrow-return-date");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    input.min = dateInputValue(tomorrow);
    input.max = dateInputValue(oneWeek);
    input.value = dateInputValue(defaultDate);
    updateReturnDatePreview();
  }
  function getReturnDate() {
    const input = document.getElementById("borrow-return-date");
    if (!input.value || input.value < input.min || input.value > input.max) {
      prepareReturnDate();
    }
    return chosenDueDate(input.value);
  }
  function updateReturnDatePreview() {
    const input = document.getElementById("borrow-return-date");
    document.getElementById("return-date-preview").textContent = input.value
      ? formatDate(chosenDueDate(input.value))
      : "Choose a date";
  }
  function esc(value) {
    return String(value).replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );
  }
  function cardMarkup(book, isShelf = false, isBrowse = false) {
    const isBorrowed = borrowed.includes(book.id);
    const removedFromCatalog = catalogState.removedBookIds.includes(book.id);
    const outOfStock = !isShelf && !isBorrowed && (removedFromCatalog || getAvailableCopies(book.id) <= 0);
    const action = isShelf
      ? `<button class="borrow-button return-button" data-return="${esc(book.id)}">Return book</button>`
      : `<button class="borrow-button" data-borrow="${esc(book.id)}" ${isBorrowed || borrowed.length >= MAX_BORROWED || outOfStock ? "disabled" : ""}>${isBorrowed ? "Borrowed" : removedFromCatalog ? "Unavailable" : outOfStock ? "Out of stock" : borrowed.length >= MAX_BORROWED ? "Limit reached" : "Borrow"}</button>`;
    const viewAction =
      isShelf || isBorrowed || isBrowse
        ? `<button class="view-book-button" data-view-book="${esc(book.id)}">View</button>`
        : "";
    const coverMarkup = `<img class="cover-photo" src="${book.coverImage || sharedCover}" alt="Cover of ${esc(book.title)}">`;
    const isFavorite = favorites.includes(book.id);
    const favoriteButton = `<button class="favorite-toggle${isFavorite ? " is-favorite" : ""}" type="button" data-favorite="${esc(book.id)}" aria-label="${isFavorite ? "Remove from" : "Add to"} favorites" aria-pressed="${isFavorite}" title="${isFavorite ? "Remove from" : "Add to"} favorites">${isFavorite ? "♥" : "♡"}</button>`;
    const description = `<p class="book-overlay-description">${esc(book.description)}</p>`;
    const shelfDue = isShelf && dueDates[book.id] ? `<p class="shelf-due-date">Return by ${esc(new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(dueDates[book.id])))}</p>` : "";
    const stockNote = !isShelf && !isBorrowed ? `<p class="book-stock-status${outOfStock ? " out-of-stock" : ""}">${removedFromCatalog ? "No longer in the catalog" : outOfStock ? "No copies available" : `${getAvailableCopies(book.id)} ${getAvailableCopies(book.id) === 1 ? "copy" : "copies"} available`}</p>` : "";
    const cardState = isShelf ? " is-shelf" : isBorrowed ? " is-borrowed" : "";

    const tagLabel = book.tag === "IT" ? "IT (Information Technology)" : book.tag;
    return `<article class="book-card${cardState}"><div class="cover-wrap" style="background:${book.coverBg}">${book.tag ? `<span class="cover-badge">${esc(tagLabel)}</span>` : ""}${favoriteButton}${coverMarkup}<div class="book-overlay"><div class="book-overlay-copy"><h3 class="book-title" title="${esc(book.title)}">${esc(book.title)}</h3><div class="book-author">By ${esc(book.author)}</div>${stockNote}${shelfDue}${description}</div><div class="book-overlay-actions">${viewAction}${action}</div></div></div></article>`;
  }
  function render() {
    grid.innerHTML = books.filter((book) => !catalogState.removedBookIds.includes(book.id) && overviewRecommendationIds.has(book.id)).map((book) => cardMarkup(book)).join("");
    const sortMode = document.getElementById("browse-sort").value;
    const selectedCategory = document.querySelector("[data-category-filter].is-active")?.dataset.categoryFilter || "all";
    const query = browseSearch.value.trim().toLocaleLowerCase();
    const browseBooks = books.filter((book) => {
      if (catalogState.removedBookIds.includes(book.id)) return false;
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
      const matchesQuery = !query || book.title.toLocaleLowerCase().includes(query) || book.author.toLocaleLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    const titleOrder = (a, b) => a.title.localeCompare(b.title);
    if (sortMode === "title-asc") browseBooks.sort(titleOrder);
    if (sortMode === "title-desc") browseBooks.sort((a, b) => titleOrder(b, a));
    if (sortMode === "author") {
      browseBooks.sort(
        (a, b) => a.author.localeCompare(b.author) || titleOrder(a, b),
      );
    }
    if (sortMode === "genre") {
      browseBooks.sort(
        (a, b) => a.category.localeCompare(b.category) || titleOrder(a, b),
      );
    }
    const categories = [...new Set(browseBooks.map((book) => book.category))];
    browseGrid.innerHTML = categories.map((category) => {
      const categoryBooks = browseBooks.filter((book) => book.category === category);
      const expanded = expandedBrowseCategories.has(category);
      const visibleBooks = expanded ? categoryBooks : categoryBooks.slice(0, 5);
      const categoryLabel = category === "IT" ? "IT (Information Technology)" : category;
      return `<section class="browse-category-row"><div class="browse-category-heading"><h3>${esc(categoryLabel)}</h3>${categoryBooks.length > 5 ? `<button class="browse-see-all" type="button" data-see-all-category="${esc(category)}">${expanded ? "Show less ↑" : "See all →"}</button>` : ""}</div><div class="browse-category-books">${visibleBooks.map((book) => cardMarkup(book, false, true)).join("")}</div></section>`;
    }).join("");
    browseGrid.hidden = browseBooks.length === 0;
    browseEmpty.hidden = browseBooks.length > 0;
    browseResultCount.textContent = `${browseBooks.length} ${browseBooks.length === 1 ? "book" : "books"}`;
    const hasBrowseFilters = Boolean(query) || selectedCategory !== "all" || sortMode !== "featured";
    clearBrowseFilters.hidden = !hasBrowseFilters;
    const shelfBooks = books.filter((book) => borrowed.includes(book.id));
    borrowedGrid.innerHTML = shelfBooks
      .map((book) => cardMarkup(book, true))
      .join("");
    const requestList = document.getElementById("request-list");
    const visibleRequests = [...requests].sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
    requestList.innerHTML = visibleRequests.map((request) => {
      const book = books.find((item) => item.id === request.bookId);
      if (!book) return "";
      const requestStatus = request.status === "rejected" ? "declined" : request.status;
      return `<article class="request-card"><div><strong>${esc(book.title)}</strong><p>Return requested by ${formatDate(request.dueAt)}</p></div><div class="request-card-actions"><span class="request-status ${esc(request.status)}">${esc(requestStatus)}</span>${request.status === "pending" ? `<button class="cancel-request-button" type="button" data-cancel-request="${esc(request.id)}" aria-label="Cancel request for ${esc(book.title)}">Cancel</button>` : ""}</div></article>`;
    }).join("");
    document.getElementById("requests-empty").hidden = visibleRequests.length > 0;
    document.getElementById("request-count").textContent = requests.filter((r) => r.status === "pending").length;
    const favoriteBooks = books.filter((book) => favorites.includes(book.id));
    favoritesGrid.innerHTML = favoriteBooks
      .map((book) => cardMarkup(book))
      .join("");
    const sortedReturns = [...returnHistory].sort(
      (a, b) => new Date(b.returnedAt) - new Date(a.returnedAt),
    );
    const visibleReturns = sortedReturns;
    onTimeGrid.innerHTML = visibleReturns
      .map((record) => {
        const book = books.find((item) => item.id === record.bookId);
        const status = record.isOnTime ? "Returned on time" : "Returned late";
        return `<article class="book-card return-history-card"><div class="cover-wrap" style="background:${book.coverBg}"><img class="cover-photo" src="${sharedCover}" alt="Cover of ${esc(book.title)}"></div><div class="book-info"><div class="book-category">${esc(book.category)}</div><h3 class="book-title" title="${esc(book.title)}">${esc(book.title)}</h3><div class="book-author">${esc(book.author)}</div><div class="book-meta"><span class="availability"><i></i>${status}</span></div><div class="due-date">Returned ${formatDate(record.returnedAt)}</div></div></article>`;
      })
      .join("");
    document.getElementById("on-time-empty").hidden = visibleReturns.length > 0;
    document.getElementById("on-time-count").textContent = sortedReturns.length;
document.getElementById("on-time-total").textContent =
      `${visibleReturns.length} ${visibleReturns.length === 1 ? "book" : "books"}`;
document.getElementById("favorites-empty").hidden =
      favoriteBooks.length > 0;
    document.getElementById("favorites-count").textContent = favorites.length;
    document.getElementById("favorites-total").textContent =
      `${favorites.length} ${favorites.length === 1 ? "book" : "books"}`;
    document.getElementById("borrowed-count").textContent =
      `${shelfBooks.length} ${shelfBooks.length === 1 ? "book" : "books"}`;
    document.getElementById("borrowed-empty").hidden = shelfBooks.length > 0;
    updateSummary();
  }
  function updateSummary() {
    document.getElementById("borrowed-total").innerHTML =
      `${borrowed.length} <small>/ ${MAX_BORROWED}</small>`;
    document.getElementById("nav-count").textContent = borrowed.length;
    document.getElementById("borrow-progress").style.width =
      `${Math.min(100, (borrowed.length / MAX_BORROWED) * 100)}%`;
    const weekAhead = new Date();
    weekAhead.setDate(weekAhead.getDate() + 7);
    document.getElementById("due-total").textContent = borrowed.filter(
      (id) => dueDates[id] && new Date(dueDates[id]) <= weekAhead,
    ).length;
    const now = new Date();
    const readDates = Object.values(readBooks)
      .map((value) => new Date(value))
      .filter((date) => !Number.isNaN(date.getTime()));
    const readThisYear = readDates.filter(
      (date) => date.getFullYear() === now.getFullYear(),
    ).length;
    const readThisMonth = readDates.filter(
      (date) =>
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth(),
    ).length;
    document.getElementById("books-read-total").textContent = readThisYear;
    document.getElementById("books-read-month").textContent =
      `+${readThisMonth} this month`;
  }
  function notify(message) {
    addNotification(message);
    document.getElementById("toast-message").textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
  }
  function showView(view) {
    currentView = view;
    document
      .querySelectorAll("[data-view-link]")
      .forEach((link) =>
        link.classList.toggle("active", link.dataset.viewLink === view),
      );
    document.querySelector(".breadcrumb strong").textContent = viewTitles[view];
    document.querySelector(".welcome-row").hidden = view !== "overview";
    document.querySelector(".stats-grid").hidden = view !== "overview";
    document.querySelector(".featured-banner").hidden = view !== "overview";
    document.querySelector(".catalog-section#catalog").hidden =
      view === "borrowed" ||
      view === "favorites" ||
      view === "browse" ||
      view === "log-books" ||
      view === "settings";
    document.getElementById("my-books").hidden = view !== "borrowed";
    document.getElementById("favorites-section").hidden = view !== "favorites";
    document.getElementById("browse-section").hidden = view !== "browse";
    document.getElementById("on-time-section").hidden = view !== "log-books";
    document.getElementById("settings-page").hidden = view !== "settings";
    document.getElementById("my-books").hidden = view !== "borrowed" && view !== "requests";
    document.getElementById("my-books").classList.toggle("requests-only", view === "requests");
    document.querySelector(".request-section").hidden = view !== "requests" && view !== "borrowed";
    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-view-link]");
    if (!link) return;
    event.preventDefault();
    showView(link.dataset.viewLink);
    if (link.getAttribute("href")?.startsWith("#")) {
      window.history.replaceState(null, "", link.getAttribute("href"));
    }
  });
  function toggleFavorite(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;
    favorites = favorites.includes(bookId)
      ? favorites.filter((id) => id !== bookId)
      : [...favorites, bookId];
    saveFavorites();
    render();
    notify(
      favorites.includes(bookId)
        ? `“${book.title}” saved to Favorites.`
        : `“${book.title}” removed from Favorites.`,
    );
  }
  borrowedGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-return]");
    if (!button) return;
    const book = books.find((item) => item.id === button.dataset.return);
    const dueAt = dueDates[button.dataset.return];
    const returnRecord = recordReturn(book.id, dueAt);
    borrowed = borrowed.filter((id) => id !== button.dataset.return);
    delete dueDates[button.dataset.return];
    recordBookAsRead(book.id);
    saveBorrowed();
    saveDueDates();
    render();
    notify(
      returnRecord.isOnTime
        ? `“${book.title}” was returned on time.`
        : `“${book.title}” was returned after its due date.`,
    );
  });
  document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }
    const button = event.target.closest("[data-view-book], [data-borrow]");
    if (!button || button.disabled) return;
    const bookId = button.dataset.viewBook || button.dataset.borrow;
    const book = books.find((item) => item.id === bookId);
    if (!book) return;
    const cover = document.getElementById("dialog-cover");
    cover.style.background = book.cover;
    cover.innerHTML = `<img class="dialog-cover-image" src="${book.coverImage || sharedCover}" alt="Cover of ${esc(book.title)}">`;
    document.getElementById("dialog-cover-wrap").style.background =
      book.coverBg;
    document.getElementById("dialog-category").textContent = book.category;
    document.getElementById("dialog-title").textContent = book.title;
    document.getElementById("dialog-author").textContent = `by ${book.author}`;
    document.getElementById("dialog-cover-author").textContent = book.author;
    document.getElementById("dialog-published").textContent = book.published;
    document.getElementById("dialog-book-id").textContent = book.bookId;
    document.getElementById("dialog-pages").textContent = `${book.pages} pages`;
    document.getElementById("dialog-genre").textContent = book.category;
    document.getElementById("dialog-description").textContent =
      book.description;
    const readToggle = document.getElementById("dialog-read-toggle");
    const hasBeenRead = Boolean(readBooks[book.id]);
    readToggle.textContent = hasBeenRead ? "Mark as unread" : "Mark as read";
    readToggle.classList.toggle("is-read", hasBeenRead);
    readToggle.setAttribute("aria-pressed", String(hasBeenRead));
    readToggle.dataset.bookId = book.id;
    const isBorrowed = borrowed.includes(book.id);
    const existingRequest = requests.find((item) => item.bookId === book.id && item.status === "pending");
    const availableCopies = getAvailableCopies(book.id);
    const removedFromCatalog = catalogState.removedBookIds.includes(book.id);
    document.getElementById("dialog-availability").innerHTML =
      `<i></i>${isBorrowed ? `On your shelf · Return by ${dueDates[book.id] ? formatDate(dueDates[book.id]) : "—"}` : existingRequest ? "Request pending librarian approval" : removedFromCatalog ? "This book is no longer in the catalog" : availableCopies ? `${availableCopies} ${availableCopies === 1 ? "copy" : "copies"} available to request` : "No copies available"}`;
    const borrowButton = document.getElementById("dialog-borrow");
    borrowButton.disabled = !isBorrowed && (borrowed.length >= MAX_BORROWED || availableCopies <= 0 || Boolean(existingRequest) || removedFromCatalog);
    borrowButton.textContent = isBorrowed
      ? "Return this book"
      : existingRequest
        ? "Request pending"
      : removedFromCatalog
        ? "Unavailable"
      : availableCopies <= 0
        ? "Out of stock"
      : borrowed.length >= MAX_BORROWED
        ? "Borrowing limit reached"
      : "Request to borrow";
    borrowButton.classList.toggle("return-action", isBorrowed);
    borrowButton.dataset.bookId = book.id;
    document.getElementById("borrow-period-controls").hidden = isBorrowed;
    if (!isBorrowed) prepareReturnDate();
    document.getElementById("book-dialog").showModal();
  });
  document
    .getElementById("dialog-borrow")
    .addEventListener("click", (event) => {
      const book = books.find(
        (item) => item.id === event.currentTarget.dataset.bookId,
      );
      if (!book) return;
      if (borrowed.includes(book.id)) {
        const dueAt = dueDates[book.id];
        const returnRecord = recordReturn(book.id, dueAt);
        borrowed = borrowed.filter((id) => id !== book.id);
        delete dueDates[book.id];
        recordBookAsRead(book.id);
        saveBorrowed();
        saveDueDates();
        render();
        document.getElementById("book-dialog").close();
        notify(
          returnRecord.isOnTime
            ? `“${book.title}” was returned on time.`
            : `“${book.title}” was returned after its due date.`,
        );
        return;
      }
      if (borrowed.length >= MAX_BORROWED) return;
      const returnDate = getReturnDate();
      if (requests.some((item) => item.bookId === book.id && item.status === "pending") || getAvailableCopies(book.id) <= 0) return;
      const studentName = localStorage.getItem("libraryhub-profile-name") || document.getElementById("user-display-name")?.textContent.trim() || "Student";
      requests.push({ id: crypto.randomUUID(), bookId: book.id, bookTitle: book.title, bookAuthor: book.author, studentName, dueAt: returnDate, requestedAt: new Date().toISOString(), status: "pending" });
      saveStoredArray(requestsKey, requests);
      render();
      document.getElementById("book-dialog").close();
      notify(`Request sent. “${book.title}” is pending approval.`);
    });
  document
    .getElementById("borrow-return-date")
    .addEventListener("input", updateReturnDatePreview);
  document.getElementById("browse-sort").addEventListener("change", render);
  browseGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-see-all-category]");
    if (!button) return;
    const category = button.dataset.seeAllCategory;
    if (expandedBrowseCategories.has(category)) expandedBrowseCategories.delete(category);
    else expandedBrowseCategories.add(category);
    render();
  });
  document.querySelector(".notification-button").addEventListener("click", () => {
    const panel = document.getElementById("notification-panel");
    panel.hidden = !panel.hidden;
    if (!panel.hidden) { notifications = notifications.map((item) => ({ ...item, read: true })); saveStoredArray(notificationsKey, notifications); renderNotifications(); }
  });
  document.getElementById("request-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-cancel-request]");
    if (!button) return;
    const request = requests.find((item) => item.id === button.dataset.cancelRequest);
    if (!request) return;
    const book = books.find((item) => item.id === request.bookId);
    document.getElementById("cancel-request-title").textContent = book?.title || "this book";
    document.getElementById("confirm-cancel-request").dataset.requestId = request.id;
    document.getElementById("cancel-request-dialog").showModal();
  });
  document.getElementById("confirm-cancel-request").addEventListener("click", (event) => {
    const requestId = event.currentTarget.dataset.requestId;
    const request = requests.find((item) => item.id === requestId);
    if (!request) return;
    requests = requests.filter((item) => item.id !== requestId);
    saveStoredArray(requestsKey, requests);
    document.getElementById("cancel-request-dialog").close();
    render();
    notify(`Your request for “${title}” was cancelled.`);
  });
  document.getElementById("dismiss-cancel-request").addEventListener("click", () => document.getElementById("cancel-request-dialog").close());
  document.getElementById("open-clear-data").addEventListener("click", () => document.getElementById("clear-data-dialog").showModal());
  document.getElementById("keep-saved-data").addEventListener("click", () => document.getElementById("clear-data-dialog").close());
  document.getElementById("confirm-clear-data").addEventListener("click", () => {
    for (let index = localStorage.length - 1; index >= 0; index -= 1) {
      const key = localStorage.key(index);
      if (key?.startsWith("libraryhub-")) localStorage.removeItem(key);
    }
    borrowed = []; favorites = []; readBooks = {}; returnHistory = []; dueDates = {}; requests = []; notifications = [];
    applyProfileName("rene baterbonia");
    document.getElementById("clear-data-dialog").close();
    render(); renderNotifications();
    document.getElementById("toast-message").textContent = "All saved library data was deleted.";
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
  });
  browseSearch.addEventListener("input", render);
  document.getElementById("browse-categories").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-category-filter]");
    if (!chip) return;
    document.querySelectorAll("[data-category-filter]").forEach((item) => {
      const isActive = item === chip;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    render();
  });
  clearBrowseFilters.addEventListener("click", () => {
    browseSearch.value = "";
    document.getElementById("browse-sort").value = "featured";
    document.querySelectorAll("[data-category-filter]").forEach((item) => {
      const isActive = item.dataset.categoryFilter === "all";
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    render();
  });
  document
    .getElementById("dialog-read-toggle")
    .addEventListener("click", (event) => {
      const bookId = event.currentTarget.dataset.bookId;
      const book = books.find((item) => item.id === bookId);
      if (!book) return;
      if (readBooks[bookId]) {
        delete readBooks[bookId];
      } else {
        readBooks[bookId] = new Date().toISOString();
      }
      saveReadBooks();
      updateSummary();
      const hasBeenRead = Boolean(readBooks[bookId]);
      event.currentTarget.textContent = hasBeenRead
        ? "Mark as unread"
        : "Mark as read";
      event.currentTarget.classList.toggle("is-read", hasBeenRead);
      event.currentTarget.setAttribute("aria-pressed", String(hasBeenRead));
      notify(
        hasBeenRead
          ? `“${book.title}” added to your reading log.`
          : `“${book.title}” removed from your reading log.`,
      );
    });
  document
    .getElementById("book-dialog-close")
    .addEventListener("click", () =>
      document.getElementById("book-dialog").close(),
    );
  document
    .getElementById("browse-from-empty")
    .addEventListener("click", () => showView("browse"));
  document
    .getElementById("browse-from-favorites")
    .addEventListener("click", () => showView("browse"));
  document
    .getElementById("menu-toggle")
    .addEventListener("click", () =>
      document.getElementById("sidebar").classList.toggle("open"),
    );
  const now = new Date();
  document.getElementById("today-date").textContent = new Intl.DateTimeFormat(
    undefined,
    { weekday: "long", month: "long", day: "numeric", year: "numeric" },
  ).format(now);
  const profileNameKey = "libraryhub-profile-name";
  const passwordRecordKey = "libraryhub-password-record";
  const nameInput = document.getElementById("account-name");
  let profileName = localStorage.getItem(profileNameKey) || "rene baterbonia";
  if (profileName === "Jamie Davis") {
    profileName = "rene baterbonia";
    localStorage.setItem(profileNameKey, profileName);
  }
  function applyProfileName(name) {
    const normalizedName = name.trim() || "rene baterbonia";
    document.getElementById("user-display-name").textContent = normalizedName;
    document.getElementById("user-avatar").textContent = normalizedName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
    document.getElementById("welcome-heading").firstChild.textContent =
      `Good morning, ${normalizedName.split(/\s+/)[0]} `;
    nameInput.value = normalizedName;
  }
  applyProfileName(profileName);
  async function hashPassword(password, saltHex) {
    const salt = new Uint8Array(
      saltHex.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)),
    );
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const digest = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
      key,
      256,
    );
    return btoa(String.fromCharCode(...new Uint8Array(digest)));
  }
  const textSetting = document.getElementById("text-size-setting");
  const savedTextScale = localStorage.getItem("libraryhub-text-scale") || "1";
  document.body.style.zoom = savedTextScale;
  textSetting.value = savedTextScale;
  document.getElementById("settings-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const feedback = document.getElementById("settings-feedback");
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const hasPasswordInput = Boolean(currentPassword || newPassword || confirmPassword);
    feedback.textContent = "";
    if (!nameInput.value.trim()) {
      feedback.textContent = "Enter your name.";
      nameInput.focus();
      return;
    }
    if (hasPasswordInput) {
      if (newPassword.length < 8) {
        feedback.textContent = "Your new password must be at least 8 characters.";
        document.getElementById("new-password").focus();
        return;
      }
      if (newPassword !== confirmPassword) {
        feedback.textContent = "The new passwords do not match.";
        document.getElementById("confirm-password").focus();
        return;
      }
      try {
        const savedRecord = JSON.parse(
          localStorage.getItem(passwordRecordKey) || "null",
        );
        if (savedRecord) {
          if (!currentPassword) {
            feedback.textContent = "Enter your current password to change it.";
            document.getElementById("current-password").focus();
            return;
          }
          const currentHash = await hashPassword(currentPassword, savedRecord.salt);
          if (currentHash !== savedRecord.hash) {
            feedback.textContent = "Your current password is incorrect.";
            document.getElementById("current-password").focus();
            return;
          }
        }
        const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        const hash = await hashPassword(newPassword, salt);
        localStorage.setItem(passwordRecordKey, JSON.stringify({ salt, hash }));
      } catch {
        feedback.textContent = "Password update failed. Please try again.";
        return;
      }
    }
    const updatedName = nameInput.value.trim();
    localStorage.setItem(profileNameKey, updatedName);
    applyProfileName(updatedName);
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-password").value = "";
    showView("settings");
    notify(hasPasswordInput ? "Profile and password updated." : "Profile updated.");
  });
  textSetting.addEventListener("change", () => {
    document.body.style.zoom = textSetting.value;
    localStorage.setItem("libraryhub-text-scale", textSetting.value);
  });
  render();
  renderNotifications();
  window.addEventListener("storage", (event) => {
    if (event.key === customBooksKey) {
      const builtInBooks = books.filter((book) => !book.custom);
      books.splice(0, books.length, ...builtInBooks, ...loadCustomBooks().map((book) => ({ ...book, custom: true })));
      render();
      return;
    }
    if (![requestsKey, storageKey, "libraryhub-due-dates-v1", catalogStateKey].includes(event.key)) return;
    const previousRequests = requests;
    if (event.key === requestsKey) requests = loadStoredArray(requestsKey);
    if (event.key === storageKey) borrowed = loadBorrowed();
    if (event.key === "libraryhub-due-dates-v1") dueDates = loadDueDates();
    if (event.key === catalogStateKey) catalogState = loadCatalogState();
    render();
    const updatedRequest = requests.find((request) => {
      const previous = previousRequests.find((item) => item.id === request.id);
      return previous && previous.status !== request.status && ["approved", "rejected"].includes(request.status);
    });
    if (updatedRequest) {
      const book = books.find((item) => item.id === updatedRequest.bookId);
      notify(`Your request for “${book?.title || updatedRequest.bookTitle || "a book"}” was ${updatedRequest.status === "approved" ? "approved" : "declined"}.`);
    }
  });
  if (window.location.hash === "#my-books") showView("borrowed");
  if (window.location.hash === "#favorites") showView("favorites");
  if (window.location.hash === "#browse") showView("browse");
  if (window.location.hash === "#log-books") showView("log-books");
  if (window.location.hash === "#on-time") showView("log-books");
  if (window.location.hash === "#settings") showView("settings");
})();
