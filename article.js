// Get article ID from URL query (?id=1)
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

// Target container
const container = document.getElementById("article-container");

// Fetch articles.json and load the article
fetch("Data/articles.json")
  .then(response => response.json())
  .then(data => {
    // Find article with matching ID
    const article = data.find(a => String(a.id) === articleId);

    if (article) {
      // Set document title
      document.title = article.title;

      // Inject HTML into page
      container.innerHTML = `
        <article>
          <h1 class="post-title">${article.title}</h1>
          <p class="date">
            <strong class="label">Published:</strong> ${article.date}
          </p>
          <img src="${article.image}" alt="${article.title}" class="post-image">
          <div class="post-content">${article.content}</div>
        </article>
      `;
    } else {
      container.innerHTML = `<p>⚠️ Article not found.</p>`;
    }
  })
  .catch(error => {
    console.error("Error loading article:", error);
    container.innerHTML = `<p>⚠️ Failed to load article. Please try again later.</p>`;
  });
