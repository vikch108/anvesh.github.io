// Get elements
const searchInput = document.getElementById("search");
const searchIcon = document.getElementById("searchicon");
const resultsDiv = document.getElementById("results");

// Collect article titles and links
const articles = Array.from(document.querySelectorAll("article h3 a")).map(a => ({
  title: a.innerText,
  link: a.getAttribute("href")
}));

// Function to toggle search input
function togglesearh() {
  if (searchInput.style.display === "none" || searchInput.style.display === "") {
    searchInput.style.display = "inline-block";
    searchInput.focus();
  } else {
    searchInput.style.display = "none";
    resultsDiv.innerHTML = ""; // clear results
  }
}

// Event listener for search typing
searchInput.addEventListener("keyup", function () {
  let query = searchInput.value.toLowerCase();
  resultsDiv.innerHTML = ""; // clear old results

  if (query.length > 0) {
    let filtered = articles.filter(article =>
      article.title.toLowerCase().startsWith(query) // prefix match
    );

    if (filtered.length > 0) {
      filtered.forEach(article => {
        let div = document.createElement("div");
        div.classList.add("result-item");
        div.innerHTML = `<a href="${article.link}">${article.title}</a>`;
        resultsDiv.appendChild(div);
      });
    } else {
      resultsDiv.innerHTML = "<div class='result-item'>No matches</div>";
    }
  }
});
