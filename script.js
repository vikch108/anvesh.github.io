fetch("Data/articles.json")
    .then(response => response.json())
    .then(articles => {
        const container = document.getElementById("articlelist");
        articles.forEach(article => {
            const div = document.createElement("div");
            div.classList.add("articlepreview");
            div.innerHTML = `
            <article>
            <a href="article.html?id=${article.id}"><img src="${article.thumbnail}" alt="${article.title}" height="250" width="10% " class="post-image"</a>
            <h2><a href="article.html?id=${article.id}">${article.title}</a></h2>
            <p class="date"><strong class="date">Published:</strong> ${article.date}</p>
            <p class="article">${article.summary} <a href="article.html?id=${article.id}" class="readme">Read more</a></p>
            </article>
            <hr>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => console.error("Error loading articles:", error));

    articles.id