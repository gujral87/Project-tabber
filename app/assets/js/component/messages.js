import * as db from '../../db/database.js';
import {
 extension
} from '../extension.js';

extension.runtime.onMessage.addListener(onMessage);

async function onMessage(message, sender, sendResponse) {
 switch (message.message) {
  case "tabber_add_url":
   await db.Add("tabberList", [{
    "Folder": message.data,
    "Url": sender.tab.url,
    "Favicon": sender.tab.favIconUrl,
    "Title": sender.tab.title,
    "Timeline": `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
   }]);
   break;
  case "tabber_getFolder_list":
   var folderList = await db.Read("tabberList", '', {
    groupBy: "Folder",
   });

   extension.tabs.sendMessage(sender.tab.id, {
    message: "tabber_takeFolder_List",
    data: folderList
   });
   break;
 }
}