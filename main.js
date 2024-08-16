const { crawlPage } = require("./crawl.js");

async function main() {
  let arguemet = "";
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit(1);
  }

  arguemet = process.argv[2];
  console.log("starting crawl of " + arguemet);
  const pages = await crawlPage(arguemet, arguemet, {});
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
