"use strict";

function titleClickHandler(event) {
  const clickedElement = this;
  console.log("Link was clicked!");
  event.preventDefault();

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".tiles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add("active");
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts .active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  //articleSelector value is'#article-1' targetArticle id is id=article-1, values not 100% the same, # missing in id value
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
  console.log(targetArticle);
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  // Nie rozumiem po co mam to ukrywac jak za chwile kaza mi to fizycznie wykasowac z htmla
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = "";
  for (let article of articles) {
    console.log(article);
    /* get the article id */
    const articleId = article.getAttribute("id");
    console.log(articleId);
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).textContent;
    console.log(articleTitle);
    /* create HTML of the link */
    //przystepniejsze sie wydaje to podjescie
    const linkHtml = `<li><a href="#${articleId}">${articleTitle}</a></li>`;
    console.log(linkHtml);
    /* insert link into titleList */
    html = html + linkHtml;
  }
  titleList.innerHTML = html;
  console.log(titleList);
}

generateTitleLinks();

const links = document.querySelectorAll(".titles a");
for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
