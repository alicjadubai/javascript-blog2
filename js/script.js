"use strict";
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tag-cloud-link").innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector("#template-tag-link").innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector("#template-author-cloud-link").innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector("#template-author-link").innerHTML
  ),
};

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
  optArtcieAuthorSelector = ".post .post-author",
  optTagsListSelector = ".tags.list",
  optAuthorsListSelector = ".authors.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks(customerSelector = "") {
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
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    // const linkHTMLData = { id: articleId, title: articleTitle };
    // const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
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
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log("tag clickedElement", clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  //console.log("taghref", href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  //console.log("tag", tag);

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
  //console.log("taglinks", tagLinks);
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
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log("tags articles", articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    // console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      //const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li> `;
      const linkHTMLData = { title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      // console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);
      /* END LOOP: for each tag */
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    // console.log(tagsWrapper);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] add html from allTags to tagList */
  //let allTagsHTML = "";
  const allTagsData = { tags: [] };
  /* [NEW] START LOOOP for each tag in allTags*/
  for (let tag in allTags) {
    const tagLinkHTML =
      "<li>" + calculateTagClass(allTags[tag], tagsParams) + "</li>";
    // allTagsHTML +=
    //   '<a class="' +
    //   calculateTagClass(allTags[tag], tagsParams) +
    //   '" href="#tag-' +
    //   tag +
    //   '">' +
    //   tag +
    //   "(" +
    //   allTags[tag] +
    //   ")" +
    //   " </a>";
    //allTagsHTML += tagLinkHTML;

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
    //console.log("allTagsHTML", allTagsData);
  }
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  //console.log(allTags);
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

function calculateAuthorsParams(authors) {
  const params = { max: 0, min: 999999 };
  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
    console.log(author + " is used " + authors[author] + " times");
  }

  return params;
}
function calculateAuthorClass(count, params) {
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

function generateAuthors() {
  //new
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  console.log("authors", articles);
  let html = "";
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArtcieAuthorSelector);
    console.log(authorWrapper);
    const author = article.getAttribute("data-author");
    console.log(author);

    //const linkHTML = `<a href="#author-${author}">${author}</a>`;
    const linkHTMLData = { title: author };
    const linkHTML = templates.authorLink(linkHTMLData);
    html = linkHTML;

    authorWrapper.innerHTML = html;
    console.log(authorWrapper);
    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    const authorList = document.querySelector(optAuthorsListSelector);
    //let allAuthorsHTML = "";
    const allAuthorsData = { authors: [] };
    const authorParams = calculateAuthorsParams(allAuthors);
    for (let author in allAuthors) {
      const authorsParams = calculateAuthorsParams(allAuthors);
      //allAuthorsHTML += author + "(" + allAuthors[author] + ")" + " ";
      // allAuthorsHTML +=
      //   '<a class="' +
      //   calculateAuthorClass(allAuthors[author], authorParams) +
      //   '" href="#author-' +
      //   author +
      //   '">' +
      //   author +
      //   "(" +
      //   allAuthors[author] +
      //   ")" +
      //   "</a>" +
      //   " ";
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorParams),
      });
      console.log("all authors", allAuthorsData.authors);
    }
    //console.log("allAuthorsHtml", allAuthorsHTML);
    //console.log(allAuthors);

    console.log(authorList);
    //authorList.innerHTML = allAuthorsHTML;
    //WSZYSTKO JEST OK FO TEG MOMENTU
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log("all authors data", allAuthorsData);
    console.log(authorList.innerHTML);
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("author clickedElement", clickedElement);
  const href = clickedElement.getAttribute("href");
  console.log("authors href", href);
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace("#author-", "");
  console.log(author);
  /* find all author-links with class active */

  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log("activeLinks", activeLinks);
  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */

    activeLink.classList.remove("active");
    console.log("actibe link", activeLink);

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }

  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
