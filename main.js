const { crawlPage } = require("./crawl.js");

function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit(1);
  }
  console.log("starting crawl");

  const baseURL = process.argv[2];
  crawlPage(baseURL);
  for (const arg of process.argv) {
    console.log(arg);
  }
}

main();
