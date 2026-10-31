(() => {
  const requestsKey = "libraryhub-book-requests-v1";
  const borrowedKey = "libraryhub-borrowed-v1";
  const dueDatesKey = "libraryhub-due-dates-v1";
  const customBooksKey = "libraryhub-custom-books-v1";
  const catalogStateKey = "libraryhub-catalog-state-v1";
  const books = [
    ["python-crash-course", "Python Crash Course", "Eric Matthes", "IT"],
    [
      "automate-boring-stuff",
      "Automate the Boring Stuff with Python",
      "Al Sweigart",
      "IT",
    ],
    ["clean-code", "Clean Code", "Robert C. Martin", "IT"],
    [
      "computer-networking-top-down",
      "Computer Networking: A Top-Down Approach",
      "James Kurose and Keith Ross",
      "IT",
    ],
    ["head-first-java", "Head First Java", "Kathy Sierra and Bert Bates", "IT"],
    [
      "brief-history-of-time",
      "A Brief History of Time",
      "Stephen Hawking",
      "Science",
    ],
    ["cosmos", "Cosmos", "Carl Sagan", "Science"],
    ["selfish-gene", "The Selfish Gene", "Richard Dawkins", "Science"],
    [
      "the-gene",
      "The Gene: An Intimate History",
      "Siddhartha Mukherjee",
      "Science",
    ],
    ["elegant-universe", "The Elegant Universe", "Brian Greene", "Science"],
    ["to-kill-a-mockingbird", "To Kill a Mockingbird", "Harper Lee", "English"],
    ["pride-and-prejudice", "Pride and Prejudice", "Jane Austen", "English"],
    ["great-gatsby", "The Great Gatsby", "F. Scott Fitzgerald", "English"],
    ["1984", "1984", "George Orwell", "English"],
    ["the-hobbit", "The Hobbit", "J. R. R. Tolkien", "English"],
    [
      "sapiens",
      "Sapiens: A Brief History of Humankind",
      "Yuval Noah Harari",
      "Social Studies",
    ],
    [
      "factfulness",
      "Factfulness",
      "Hans Rosling, Ola Rosling, and Anna Rosling Rönnlund",
      "Social Studies",
    ],
    [
      "silk-roads",
      "The Silk Roads: A New History of the World",
      "Peter Frankopan",
      "Social Studies",
    ],
    [
      "little-history-of-world",
      "A Little History of the World",
      "E. H. Gombrich",
      "Social Studies",
    ],
    [
      "why-nations-fail",
      "Why Nations Fail",
      "Daron Acemoglu and James A. Robinson",
      "Social Studies",
    ],
  ].map(([id, title, author, category]) => ({ id, title, author, category }));
  const loadCustomBooks = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(customBooksKey) || "[]");
      return Array.isArray(saved)
        ? saved.filter(
            (book) =>
              book &&
              book.id &&
              book.title &&
              book.coverImage?.startsWith("data:image/"),
          )
        : [];
    } catch {
      return [];
    }
  };
  books.push(...loadCustomBooks());
  const bookCodes = {
    "python-crash-course": "LIB-0001",
    "automate-boring-stuff": "LIB-0002",
    "clean-code": "LIB-0003",
    "computer-networking-top-down": "LIB-0004",
    "head-first-java": "LIB-0005",
    "brief-history-of-time": "LIB-0006",
    cosmos: "LIB-0007",
    "selfish-gene": "LIB-0008",
    "the-gene": "LIB-0009",
    "elegant-universe": "LIB-0010",
    "to-kill-a-mockingbird": "LIB-0011",
    "pride-and-prejudice": "LIB-0012",
    "great-gatsby": "LIB-0013",
    1984: "LIB-0014",
    "the-hobbit": "LIB-0015",
    sapiens: "LIB-0016",
    factfulness: "LIB-0017",
    "silk-roads": "LIB-0018",
    "little-history-of-world": "LIB-0019",
    "why-nations-fail": "LIB-0020",
  };
  books.forEach((book) => {
    book.bookId ||= bookCodes[book.id] || "—";
  });
  const byId = new Map(books.map((book) => [book.id, book]));
  const loadCatalogState = () => {
    try {
      const value = JSON.parse(localStorage.getItem(catalogStateKey) || "{}");
      return {
        removedBookIds: Array.isArray(value.removedBookIds)
          ? value.removedBookIds
          : [],
        quantities:
          value.quantities && typeof value.quantities === "object"
            ? value.quantities
            : {},
      };
    } catch {
      return { removedBookIds: [], quantities: {} };
    }
  };
  let catalogState = loadCatalogState();
  const getTotalCopies = (bookId) =>
    Number.isInteger(catalogState.quantities[bookId]) &&
    catalogState.quantities[bookId] >= 0
      ? catalogState.quantities[bookId]
      : 1;
  const getAvailableCopies = (bookId, borrowed = null) => {
    let currentBorrowed = borrowed;
    if (!currentBorrowed) {
      try {
        currentBorrowed = JSON.parse(localStorage.getItem(borrowedKey) || "[]");
      } catch {
        currentBorrowed = [];
      }
    }
    if (!Array.isArray(currentBorrowed)) currentBorrowed = [];
    return Math.max(
      0,
      getTotalCopies(bookId) -
        currentBorrowed.filter((id) => id === bookId).length,
    );
  };
  const saveCatalogState = () =>
    localStorage.setItem(catalogStateKey, JSON.stringify(catalogState));
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  const readRequests = () => {
    try {
      const value = JSON.parse(localStorage.getItem(requestsKey) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  const writeRequests = (requests) =>
    localStorage.setItem(requestsKey, JSON.stringify(requests));
  const formatDate = (value, options = { dateStyle: "medium" }) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "—"
      : new Intl.DateTimeFormat(undefined, options).format(date);
  };
  const getBook = (request) =>
    byId.get(request.bookId) || {
      title: request.bookTitle || "Unknown book",
      author: request.bookAuthor || "",
      category: "Library collection",
      bookId: request.bookCode || "—",
    };
  const requestRows = (requests) =>
    requests
      .map((request) => {
        const book = getBook(request);
        const savedProfileName = localStorage.getItem(
          "libraryhub-profile-name",
        );
        const storedName = request.studentName?.trim();
        const student =
          storedName &&
          !["Library member", "Student", "Student account"].includes(storedName)
            ? storedName
            : savedProfileName || "rene baterbonia";
        const status = ["pending", "approved", "rejected"].includes(
          request.status,
        )
          ? request.status
          : "pending";
        const requested = formatDate(request.requestedAt, {
          dateStyle: "medium",
          timeStyle: "short",
        });
        return `<tr><td><strong>${esc(student)}</strong><small>Requester</small></td><td><strong>${esc(book.title)}</strong><small>${esc(book.author)}</small></td><td class="book-id-cell">${esc(book.bookId)}</td><td>${esc(requested)}</td><td>${esc(formatDate(request.dueAt))}</td><td><span class="request-status ${status}">${status === "rejected" ? "Declined" : esc(status)}</span></td><td>${status === "pending" ? `<div class="request-actions"><button class="approve-request" type="button" data-decision="approved" data-request-id="${esc(request.id)}">Approve</button><button class="reject-request" type="button" data-decision="rejected" data-request-id="${esc(request.id)}">Decline</button></div>` : "—"}</td></tr>`;
      })
      .join("");
  const render = () => {
    const requests = readRequests().sort(
      (a, b) => new Date(b.requestedAt) - new Date(a.requestedAt),
    );
    const pending = requests.filter(
      (request) => !request.status || request.status === "pending",
    );
    const approved = requests.filter(
      (request) => request.status === "approved",
    );
    $("#pending-total").textContent = pending.length;
    $("#approved-total").textContent = approved.length;
    $("#all-total").textContent = requests.length;
    $("#pending-nav-count").textContent = pending.length;
    const latest = requests.slice(0, 5);
    $("#recent-request-rows").innerHTML = requestRows(latest);
    $("#recent-empty").hidden = requests.length > 0;
    const filter = $("#request-filter").value;
    const filtered =
      filter === "all"
        ? requests
        : requests.filter(
            (request) => (request.status || "pending") === filter,
          );
    $("#all-request-rows").innerHTML = requestRows(filtered);
    $("#requests-empty").hidden = filtered.length > 0;
    $("#request-result-count").textContent =
      `${filtered.length} ${filtered.length === 1 ? "request" : "requests"}`;
  };
  const renderCollection = () => {
    const visibleBooks = books.filter(
      (book) => !catalogState.removedBookIds.includes(book.id),
    );
    const categories = [
      ...new Set(visibleBooks.map((book) => book.category)),
    ].sort((a, b) => a.localeCompare(b));
    if (!visibleBooks.length) {
      $("#collection-list").innerHTML =
        `<div class="librarian-empty"><span>▤</span><h3>The catalog is empty</h3><p>Upload a book to add it back to the student catalog.</p></div>`;
      return;
    }
    $("#collection-list").innerHTML = categories
      .map((category) => {
        const categoryBooks = visibleBooks.filter(
          (book) => book.category === category,
        );
        return `<section class="collection-category"><div class="collection-category-heading"><h3>${esc(category === "IT" ? "IT (Information Technology)" : category)}</h3><span>${categoryBooks.length} ${categoryBooks.length === 1 ? "book" : "books"}</span></div><div class="collection-category-books">${categoryBooks.map((book) => `<article class="collection-book">${book.coverImage ? `<img class="collection-book-cover" src="${book.coverImage}" alt="Cover of ${esc(book.title)}">` : `<span class="collection-book-icon" aria-hidden="true">▤</span>`}<div class="collection-book-copy"><strong>${esc(book.title)}</strong><span>${esc(book.author)} · ${esc(book.published || "")}</span><small class="stock-summary">${getAvailableCopies(book.id)} available of ${getTotalCopies(book.id)}</small></div><div class="collection-book-controls"><div class="quantity-stepper"><button class="quantity-step-button" type="button" data-quantity-step="-1" aria-label="Remove one copy of ${esc(book.title)}">−</button><label>Copies<input type="number" min="0" step="1" value="${getTotalCopies(book.id)}" data-book-quantity="${esc(book.id)}" aria-label="Total copies of ${esc(book.title)}"></label><button class="quantity-step-button" type="button" data-quantity-step="1" aria-label="Add one copy of ${esc(book.title)}">+</button></div><button class="remove-book-button" type="button" data-remove-book="${esc(book.id)}" aria-label="Remove ${esc(book.title)} from the catalog" title="Remove book"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7m4 4v5m4-5v5"/></svg></button></div></article>`).join("")}</div></section>`;
      })
      .join("");
  };
  const showView = (view) => {
    const labels = {
      overview: "Overview",
      requests: "Student requests",
      books: "Book collection",
      settings: "Settings",
    };
    document.querySelectorAll("[data-view]").forEach((section) => {
      section.hidden = section.dataset.view !== view;
    });
    document.querySelectorAll("[data-view-link]").forEach((link) => {
      const active = link.dataset.viewLink === view;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    $("#breadcrumb-title").textContent = labels[view] || labels.overview;
    $("#sidebar").classList.remove("open");
    if (location.hash !== `#${view}`)
      history.replaceState(null, "", `#${view}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const notify = (message) => {
    $("#toast-message").textContent = message;
    $("#toast").classList.add("visible");
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(
      () => $("#toast").classList.remove("visible"),
      2600,
    );
  };
  const uploadDialog = $("#upload-book-dialog");
  const uploadForm = $("#upload-book-form");
  const coverFile = $("#book-cover-file");
  let previewUrl = "";
  const resetUploadForm = () => {
    $("#open-upload-form").setAttribute("aria-expanded", "false");
    uploadForm.reset();
    $("#cover-preview-image").hidden = true;
    $("#cover-preview-placeholder").hidden = false;
    $("#upload-feedback").textContent = "";
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = "";
  };
  const closeUploadForm = () => {
    if (uploadDialog.open) uploadDialog.close();
    else resetUploadForm();
  };
  $("#open-upload-form").addEventListener("click", () => {
    if (uploadDialog.open) return;
    uploadDialog.showModal();
    $("#open-upload-form").setAttribute("aria-expanded", "true");
    $("#upload-title").focus();
  });
  uploadDialog.addEventListener("close", resetUploadForm);
  uploadDialog.addEventListener("click", (event) => {
    if (event.target === uploadDialog) closeUploadForm();
  });
  $("#close-upload-form").addEventListener("click", closeUploadForm);
  $("#cancel-upload").addEventListener("click", closeUploadForm);
  $("#upload-year").max = String(new Date().getFullYear());
  coverFile.addEventListener("change", () => {
    const file = coverFile.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);
    $("#cover-preview-image").src = previewUrl;
    $("#cover-preview-image").hidden = false;
    $("#cover-preview-placeholder").hidden = true;
  });
  const compressCover = async (file) => {
    const image = await createImageBitmap(file);
    const scale = Math.min(1, 900 / image.width, 1200 / image.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.close();
    return canvas.toDataURL("image/jpeg", 0.82);
  };
  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const feedback = $("#upload-feedback");
    feedback.classList.remove("success");
    feedback.textContent = "";
    const file = coverFile.files?.[0];
    if (!file) {
      feedback.textContent = "Choose a cover photo before saving.";
      coverFile.focus();
      return;
    }
    const submitButton = uploadForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Saving…";
    try {
      const title = $("#upload-title").value.trim();
      const author = $("#upload-author").value.trim();
      const description = $("#upload-description").value.trim();
      const category = $("#upload-genre").value.trim();
      const pages = Number($("#upload-pages").value);
      const published = String(Number($("#upload-year").value));
      const quantity = Number($("#upload-quantity").value);
      const coverImage = await compressCover(file);
      const book = {
        id: `custom-${crypto.randomUUID()}`,
        bookId: `LIB-${Date.now()}`,
        title,
        author,
        description,
        category,
        tag: category,
        pages,
        published,
        coverImage,
        coverBg: "#e9eef7",
        cover: "#28527a",
        accent: "#d7b36c",
        custom: true,
      };
      const customBooks = loadCustomBooks();
      customBooks.push(book);
      localStorage.setItem(customBooksKey, JSON.stringify(customBooks));
      catalogState.quantities[book.id] = quantity;
      saveCatalogState();
      books.push(book);
      byId.set(book.id, book);
      renderCollection();
      closeUploadForm();
      notify(`Added “${book.title}” to the collection.`);
    } catch (error) {
      feedback.textContent =
        error?.name === "QuotaExceededError"
          ? "This browser has run out of storage. Try a smaller cover image."
          : "Could not save this book. Check the cover image and try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save book";
    }
  });
  const saveQuantity = (input) => {
    const quantity = Number(input.value);
    if (!Number.isInteger(quantity) || quantity < 0) {
      input.value = String(getTotalCopies(input.dataset.bookQuantity));
      return;
    }
    catalogState.quantities[input.dataset.bookQuantity] = quantity;
    saveCatalogState();
    renderCollection();
  };
  $("#collection-list").addEventListener("change", (event) => {
    const input = event.target.closest("[data-book-quantity]");
    if (input) saveQuantity(input);
  });
  $("#collection-list").addEventListener("click", (event) => {
    const stepButton = event.target.closest("[data-quantity-step]");
    if (stepButton) {
      const input = stepButton
        .closest(".collection-book")
        .querySelector("[data-book-quantity]");
      input.value = String(
        Math.max(
          0,
          Number(input.value || 0) + Number(stepButton.dataset.quantityStep),
        ),
      );
      saveQuantity(input);
      return;
    }
    const button = event.target.closest("[data-remove-book]");
    if (!button) return;
    const book = byId.get(button.dataset.removeBook);
    if (!book) return;
    $("#remove-book-title").textContent = book.title;
    $("#remove-book-dialog").dataset.bookId = book.id;
    $("#remove-book-dialog").showModal();
  });
  $("#cancel-remove-book").addEventListener("click", () =>
    $("#remove-book-dialog").close(),
  );
  $("#confirm-remove-book").addEventListener("click", () => {
    const dialog = $("#remove-book-dialog");
    const book = byId.get(dialog.dataset.bookId);
    if (!book) {
      dialog.close();
      return;
    }
    if (!catalogState.removedBookIds.includes(book.id))
      catalogState.removedBookIds.push(book.id);
    saveCatalogState();
    renderCollection();
    dialog.close();
    notify(`Removed “${book.title}” from the catalog.`);
  });
  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-view-link]");
    if (nav) {
      event.preventDefault();
      showView(nav.dataset.viewLink);
      return;
    }
    const jump = event.target.closest("[data-go-view]");
    if (jump) {
      showView(jump.dataset.goView);
      return;
    }
    const decision = event.target.closest("[data-decision]");
    if (!decision) return;
    const requests = readRequests();
    const request = requests.find(
      (item) => item.id === decision.dataset.requestId,
    );
    if (!request || (request.status && request.status !== "pending")) return;
    if (decision.dataset.decision === "approved") {
      if (catalogState.removedBookIds.includes(request.bookId)) {
        notify(
          "This book has been removed from the catalog and cannot be approved.",
        );
        return;
      }
      let borrowed = [];
      let dueDates = {};
      try {
        borrowed = JSON.parse(localStorage.getItem(borrowedKey) || "[]");
      } catch {
        borrowed = [];
      }
      try {
        dueDates = JSON.parse(localStorage.getItem(dueDatesKey) || "{}");
      } catch {
        dueDates = {};
      }
      if (getAvailableCopies(request.bookId, borrowed) <= 0) {
        notify(
          "No copies are currently available. Increase the stock quantity to approve this request.",
        );
        return;
      }
      if (!borrowed.includes(request.bookId) && borrowed.length >= 5) {
        notify(
          "The borrowing limit has been reached. This request was not approved.",
        );
        return;
      }
      if (!borrowed.includes(request.bookId)) borrowed.push(request.bookId);
      if (request.dueAt) dueDates[request.bookId] = request.dueAt;
      localStorage.setItem(borrowedKey, JSON.stringify(borrowed));
      localStorage.setItem(dueDatesKey, JSON.stringify(dueDates));
    }
    request.status = decision.dataset.decision;
    request.reviewedAt = new Date().toISOString();
    request.reviewedBy = "Librarian";
    writeRequests(requests);
    render();
    renderCollection();
    const book = getBook(request);
    notify(
      `${request.status === "approved" ? "Approved" : "Declined"}: ${book.title}`,
    );
  });
  $("#request-filter").addEventListener("change", render);
  $("#menu-toggle").addEventListener("click", () =>
    $("#sidebar").classList.toggle("open"),
  );
  window.addEventListener("storage", (event) => {
    if (event.key === requestsKey) render();
    if (event.key === borrowedKey) renderCollection();
    if (event.key === catalogStateKey) {
      catalogState = loadCatalogState();
      renderCollection();
    }
    if (event.key === customBooksKey) {
      books.splice(
        0,
        books.length,
        ...books.filter((book) => !book.custom),
        ...loadCustomBooks(),
      );
      byId.clear();
      books.forEach((book) => byId.set(book.id, book));
      renderCollection();
    }
  });
  window.addEventListener("focus", render);
  window.addEventListener("hashchange", () =>
    showView(location.hash.slice(1) || "overview"),
  );
  $("#today-date").textContent = formatDate(new Date(), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  renderCollection();
  render();
  showView(location.hash.slice(1) || "overview");
})();
