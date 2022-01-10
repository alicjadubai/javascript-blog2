"use strict";

function titleClickHandler(event) {
  const clickedElement = this;
  //console.log("Link was clicked!");
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
  //console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
  //console.log(targetArticle);
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  customerSelector = "",
  optArtcieAuthorSelector = ".post .post-author",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log(titleList);
  // Nie rozumiem po co mam to ukrywac jak za chwile kaza mi to fizycznie wykasowac z htmla
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customerSelector
  );
  let html = "";
  for (let article of articles) {
    //console.log(article);
    /* get the article id */
    const articleId = article.getAttribute("id");
    //console.log(articleId);
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).textContent;
    //console.log(articleTitle);
    /* create HTML of the link */
    //przystepniejsze sie wydaje to podjescie
    const linkHtml = `<li><a href="#${articleId}">${articleTitle}</a></li>`;
    //console.log(linkHtml);
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

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("tag clickedElement", clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log("taghref", href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  console.log("tag", tag);

  /* find all tag links with class active */
  //znajduje
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log("active tags:", activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active DONE */
    activeTag.classList.remove("active");
    console.log("active tag:", activeTag);
  } /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log("taglinks", tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add("active");
    console.log("tag link", tagLink);
  } /* END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log("tags articles", articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);
    /* END LOOP: for every article: */
  }
}

generateTags();

/* find all links to tags */
const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
console.log("listener", tagLinks);
/* START LOOP: for each link */
for (let tagLink of tagLinks) {
  /* add tagClickHandler as event listener for that link */
  tagLink.addEventListener("click", tagClickHandler);
} /* END LOOP: for each link */

//generate authors. o jakich linkach do autora mowia we wskazowkach. Autora mamy przechwycic z "data-author" i wstawic do <p class="post-author"></p>? gdzie tu jest link? Ostanie polecenie to wykasowanie tego fragmentu kodu <p class="post-author"></p>. to co w takim razie bedzie moim wrapperem? co mam umiescic w zmiennej 'optArtcieAuthorSelector'? co ta funkcja ma na celu? wygenerowanie autora artykulu pod tytulem? czyli handler ma byc przypisany do listy autorow po prawej stronie? jak widzisz, ja w ogole nie rozumiem scenariusza. nie podolam. nie rozumiem tych selektorow

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log("authors", articles);
  let html = "";
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArtcieAuthorSelector);
    // console.log(authorWrapper);

    const authorData = article.getAttribute("data-author");
    //console.log(authorData);
    authorWrapper.innerHTML = html + authorData;
    // console.log(authorWrapper);
  }
}
generateAuthors();
