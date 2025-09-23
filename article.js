const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

fetch("Data/articles.json")
  .then(response => response.json())
  .then(articles => {
    const article = articles.find(a => a.id == articleId);
    const container = document.getElementById("article-container");

    if (article) {
      container.innerHTML = `
        <h2 class="post-title">${article.title}</h2>
        <p class="date"><strong>Published: ${article.date}</strong></p>
        <img src="${article.image}" alt="${article.title}" class="post-image">
        <div class="post-content">${article.content}</div>
      `;
    } else {
      container.innerHTML = "<p>Article not found.</p>";
    }
  })
  .catch(error => console.error("Error loading article:", error));
