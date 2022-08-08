/**
 * Function to create two required cron jobs. 
 * Run this function only once
 */
function run(){
  createTrigger();
  createCronJobToDeleteThreadTrigger();
}

/**
 * Function runs every midnight once (Runs every midnight once between 12am to 1am)
 */
function createTrigger(){
  ScriptApp.newTrigger("createTriggerFor5Min").timeBased().atHour(1).everyDays(1).inTimezone('Asia/Kolkata').create();
}

/**
 * Function runs every day at morning 7-8am to delete the cron job
 * because cron job can run only for 6 hours (total execution time for the day cannot be more than 6 hours)
 */
function createCronJobToDeleteThreadTrigger(){
  ScriptApp.newTrigger("deleteThreadTrigger").timeBased().atHour(6).everyDays(1).inTimezone('Asia/Kolkata').create();
}

/**
 * Function create a trigger that runs every 5 mins to delete batch of threads configured in batchDeleteThreads() method
 */
function createTriggerFor5Min(){
  ScriptApp.newTrigger("batchDeleteThreads").timeBased().everyMinutes(5).inTimezone('Asia/Kolkata').create();
}

/**
 * Function to delete given search criteria threads after marking as read.
 */
function batchDeleteThreads() {
  return new Promise((resolve,reject)=>{
    // Modify search string to your requirement, it can be any format which works in your gmail.
    var searchString = 'from:promotions'; 

    var batchSize = 100 // Process up to 100 threads at once
    var searchSize = 500 // Max 500 is the limit
    var threads = GmailApp.search(searchString,0, searchSize);
    if(threads && threads.length > 0){
      GmailApp.markThreadsRead(threads.slice(j,j+batchSize));
      for (var j = 0; j < threads.length; j+=batchSize) {
        // If you want to Mark thread as read before deleting, to retain domain reputation.
        // GmailApp.markThreadsRead(threads.slice(j,j+batchSize));

        // Move threads to trash folder
        GmailApp.moveThreadsToTrash(threads.slice(j, j+batchSize));
        console.log("trashed "+j);
      }
      resolve('marked as trashed');   
    }else {
      // If there are no more threads left to delete, then delete the trigger.
      deleteThreadTrigger();
    }
  });
}

/**
 * Function to delete thread trigger if there are no more threads left to delete.
 */
function deleteThreadTrigger(){
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    var triggerMethod = allTriggers[i].getHandlerFunction();
    if(triggerMethod == 'batchDeleteThreads'){
      ScriptApp.deleteTrigger(allTriggers[i]);
      break;
    }
  }
}

/**
 * Function to know custom folders created by the user.
 * Select getLabels method and click on Run button.
 */
function getLabels(){
  var allLabels = GmailApp.getUserLabels();
  for(i=0;i<allLabels.length;i++){
    console.log(allLabels[i].getName());
  }
}
