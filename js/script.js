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

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
  console.log(targetArticle);
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  customerSelector = "",
  optArticleAuthorSelector = ".post .post-author",
  optTagsListSelector = ".tags.list",
  optAuthorsListSelector = ".authors.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  // Nie rozumiem po co mam to ukrywac jak za chwile kaza mi to fizycznie wykasowac z htmla
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customerSelector
  );
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

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + " is used " + tags[tag] + " times");
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  console.log(normalizedCount);
  const normalizedMax = params.max - params.min;
  console.log(normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  console.log(percentage);
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  console.log(classNumber);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
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
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log("tags params", tagsParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = "";
  /* [NEW] START LOOOP for each tag in allTags*/
  for (let tag in allTags) {
    // generalnie tu wychodzi string a nie lista, dodam atrybuty <li> i <href>
    //const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    allTagsHTML +=
      '<a class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '" href="#tag-' +
      tag +
      '">' +
      tag +
      " </a>";
    //allTagsHTML += tagLinkHTML;
    console.log("allTagsHTML", allTagsHTML);
  }
  tagList.innerHTML = allTagsHTML;
  console.log(allTags, "all tags");
}

generateTags();

//wszystko dziala do tego momentu. co ma na celu to klikniecie w tag?  jak ma zachowac sie przegladarka? ma przeszukac wszystkie artykuly, sprawdzic czy sa tam takie same tagi, jak ten klikniety, i pokazac po lewej stronie zawezona liste artykulow? prosze Cie, zebys mi przeslal mi te fragmenty kodu z Twoimi komentarzami pod okreslonymi linijkami.

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
  //ok i co ja robie z tym golym tagiem?

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log("active tags:", activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    console.log("active tag:", activeTag);
    /* remove class active */
    activeTag.classList.remove("active");
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

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(".post-tags .list a");
  console.log("listener", tagLinks);
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    console.log(tagLink, "tagLink");
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);
  } /* END LOOP: for each link */
}

addClickListenersToTags();

function calculateAuthorParams(authors) {
  const params = { max: 0, min: 999999 };
  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
    console.log(author + " is used " + authors[author] + " times");
  }

  return params;
}

function generateAuthors() {
  /*new*/
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  console.log("authors", articles);
  let html = "";
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log("author wrapper", authorWrapper);

    const authorData = article.getAttribute("data-author");
    console.log("author data", authorData);
    const authorLink = `by <a href="#author-${authorData}"><span>${authorData}</span></a>`;
    console.log("author link", authorLink);
    /*new zlicza mi prawidlowo autorow*/
    if (!allAuthors[authorData]) {
      allAuthors[authorData] = 1;
    } else {
      allAuthors[authorData]++;
    }
    authorWrapper.innerHTML = html + authorLink;
    console.log("author wrapper with html", authorWrapper);
  }

  console.log("all authors", allAuthors);
  /*new*/
  const authorList = document.querySelectorAll(optAuthorsListSelector);
  console.log(authorList);
  /*new*/
  const authorsParams = calculateAuthorParams(allAuthors);
  console.log("authors params", authorsParams);
  /*new*/
  let allAuthorsHTML = "";
  /*NEW*/
  for (let authorData in allAuthors) {
    allAuthorsHTML +=
      '<a class="' +
      calculateTagClass(allAuthors[authorData], authorsParams) +
      '" href="#author-' +
      authorData +
      '">' +
      authorData +
      " </a>";
  }
  authorList.innerHTML = allAuthorsHTML;
  //co tu nie gra. nobi w konsoli jest a na stronie sie nie wyswietla
  console.log("all authors html", allAuthorsHTML);
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("author clickedElement", clickedElement);
  const href = clickedElement.getAttribute("href");
  console.log("author href", href);

  const author = href.replace("#author-", "");
  console.log("author", author);
  const tagLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let tagLink of tagLinks) {
    /* remove class active */
    authorLink.classList.remove("active");
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  /* find all links to auhors */
  const authorLinks = document.querySelectorAll(".post-authors .list a");
  console.log("author links", authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }
}
addClickListenersToAuthors();
