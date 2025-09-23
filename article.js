const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");


const container = document.getElementById("articlecontainer");

if (!container) {
  console.error("Cannot find container with id 'article-container'");
}

fetch("./Data/articles.json")
  .then(res => res.json())
  .then(data => {
    const article = data.find(a => String(a.id) === articleId);
    if (!article) {
      console.error("No article found with id=", articleId);
      container.innerHTML = "<p>⚠️ Article not found.</p>";
      return;
    }

    if (!article.sections || !Array.isArray(article.sections)) {
      console.error("Article sections missing or invalid for id=", articleId);
      container.innerHTML = "<p>⚠️ Article has no sections.</p>";
      return;
    }

    let sectionsHTML = "";
    article.sections.forEach(sec => {
      sectionsHTML += `<section><h2>${sec.heading}</h2><p>${sec.content}</p></section>`;
    });

    container.innerHTML = `
      <article>
        <header>
          <h1 class="post-title">${article.title}</h1>
          <p class="date"><strong class="label">Published:</strong> ${article.date}</p>
          <img src="${article.image}" alt="${article.title}" class="post-image">
        </header>

        ${sectionsHTML}

        <footer>
          <p><em>Written by:</em> ${article.author}</p>
          <p><a href="index.html">← Back to Home</a></p>
        </footer>
      </article>
    `;
  })
  .catch(err => {
    console.error("Error fetching JSON:", err);
    container.innerHTML = "<p>⚠️ Failed to load article. Check console.</p>";
  });
