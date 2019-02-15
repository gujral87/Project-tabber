"use strict";

import './component/messages.js';
import {
 extension
} from './extension.js';


// Open popup html in new tab
extension.browserAction.onClicked.addListener((tab) => {
 extension.tabs.create({
  url: extension.extension.getURL("popup.html")
 });
});