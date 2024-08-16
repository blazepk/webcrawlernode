const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window._document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //   Relative URL
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(`${baseURL}${linkElement.href}`);
      } catch (e) {
        console.log("error with relative url ", e.message);
      }
    } else {
      // Absolute url
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(linkElement.href);
      } catch (e) {
        console.log("error with absolute url ", e.message);
      }
      urls.push(linkElement.href);
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

async function crawlPage(currentURL) {
  console.log(`actively crawling ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code : ${resp.status} on page ${currentURL}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response , contentType ${contentType} on page ${currentURL}`
      );
      return;
    }
    console.log(await resp.text());
  } catch (e) {
    console.log(`error in fetching html : ${e.message} on page ${currentURL}`);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
