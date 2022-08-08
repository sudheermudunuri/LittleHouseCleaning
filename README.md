# Little House Cleaning
Is your Gmail mailbox full? Are you fed up with Gmail delete action? Where it cannot delete all emails in one go. I have a solution, which I'm following for a very long time. Feel free to use it for FREE :) #littlehousecleaning

## What is the Problem?
At some point, we all come to a state, where there is no storage left for emails in the mailbox. We all know even gmail won’t complete this job of deleting selected emails. We can’t keep selecting the small group of emails and deleting as this may take several hours or even days if there are more emails in your mailbox/inbox.

## How am I solving this problem?
Google introduced App scripts, these app scripts can control several G Suite applications like spreadsheet, presentations, documents and your Gmail. Using App scripts, we can automate certain tasks like deleting emails/threads that match the given criteria.


**Examples:** 
- from:promotions
- subject:Promotional emails
- to: anyemailaddress@domain.com
- larger:1mb 
    
![Gmail_Search](https://user-images.githubusercontent.com/15116653/183530621-1c9a77e8-336e-4806-95c9-6ba8338e9185.png)

**Note: You can give any condition that supports in Gmail search**

## Process flow
1. Give search string to delete matching emails.
2. We will have two crons
    - Cron that runs **every day at midnight** between 12am to 1am:
        - Cron will trigger every day at midnight to create another 5 mins cron job.
    - Cron that runs **every 5 mins**, after it is created by the above cron to delete the given criteria of emails.
        - When all emails are deleted for that criteria, the 5 mins cron job will be deleted automatically. It will get created again the next day.

![TwoTriggers](https://user-images.githubusercontent.com/15116653/183531544-cb9b36d5-7d06-4c9d-9028-a2cedda537bb.png)

**When 5 mins cron is executed**
   - It gets the first 500 threads which are matching for given search criteria.
   - Mark those threads as read [optional, when we delete emails without opening, the domain reputation of that from domain will be reduced, to avoid, we can first mark thread as read and then delete]
   - Move those threads to trash
   - When all the threads are deleted, then the 5 mins cron job will get deleted for the day. It will get created again the next day.

**Steps to follow**
- Open URL https://script.google.com/home
- Click on button New Project, enter project name
- File Code.gs will be opened by default
- Copy & paste the code from this file to code.gs file in App script
- Now save the file
- It opens the Oauth2 window asking permission to ask your mailbox emails to find and delete. Allow this permission.
- Give a value for the search string as shown below.
- Now select the run method and click on the run button as shown below.
![Final](https://user-images.githubusercontent.com/15116653/183533563-0f2ea539-2288-4f83-b63d-1a37c4f7d586.png)

## That’s it folks, sit back and relax, let Google Apps script, take care of automation.


**Note:**
- All emails/threads will be moved to the Trash folder, as App scripts cannot permanently delete. You can delete empty trash now with the option to delete all emails from the trash folder, or Gmail will only clear the emails after 30 days.
- App scripts triggers can run only for 6 hours per day. So we are deleting cron job at 7am.


**References:**
- [App script Quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [App script documentation](https://developers.google.com/apps-script/overview)


