const { CronJob } = require('cron');
const linkRepo = require('../repositories/link-repo');

exports.deleteInFrequentlyLinksJob = () => {
    console.log('Before job instantiation');
    // Run every day at 1:00:00 AM
    const job = new CronJob('00 00 01 * * 1-7', deleteInFrequentlyLinks);
    // const job = new CronJob('*/5 * * * * *', deleteInFrequentlyLinks);
    console.log('After job instantiation');
    job.start();
};

async function deleteInFrequentlyLinks() {
    console.log('-----------------------------------------');
    const deletedAt = new Date();
    deletedAt.setDate(deletedAt.getDate() - 6);
    console.log('Deleting all links that have been visited before : ', deletedAt);
    await linkRepo.deleteLinksByLastVisit(deletedAt);
    console.log("Completed deleted in frequently links");
    console.log('------------------------------------------');
}