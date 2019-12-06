const arw = require('./arw');
const CronJob = require('cron').CronJob;
let Parser = require('rss-parser');
let parser = new Parser({
  customFields: {
    item: ['description'],
  }
});

const rssParser = async () => {
  try {
    let feed = await parser.parseURL('http://feeds.bbci.co.uk/news/science_and_environment/rss.xml');

    feed.items.forEach(item => {
      arw.sendData(item.title, item.link, item.description);
      console.log('Now on the permaweb...\n' + item.title + '\n' + item.link + '\n' + item.description + '\n' + '*****************\n')
    });
    console.log('Done RSS Parser')

  } catch (ex) {
    console.log(' Exception: ', ex);
  }
}

const run = async () => {
  console.log('Started Perma Climate Change...');
  console.log('Before job instantiaion');
  new CronJob('00 00 22 * * *', rssParser, null, true, 'Europe/London');
  console.log('After job instantiation');
}

run();