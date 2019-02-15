import {
 extension
} from '../extension.js';

var plusIcon = extension.extension.getURL("images/plus.png");

var node = document.createElement("DIV");
node.style = "position:fixed; z-index: 9999; bottom: 20px; right: 20px;";
node.innerHTML = `
<div id="tabber_plusIcon_options" style="display:none;
    background: #ea2027;
    padding: 10px;
    border-radius: 6px;
    width: 150px;
    position: absolute;
    bottom: 14px;
right: 10px;">
 <select name="" id="tabber_plusIcon_select" style="width: 100%;
 margin-bottom: 5px;
 padding: 5px;
 height: 25px;
 border-radius: 6px;
 border: 0;
 font-size: 12px;">
 </select>
 <input type="text" id="tabber_plusIcon_input" placeholder="Enter new folder name" style="width: 100%;
 margin-bottom: 5px;
 padding: 5px;
 height: 25px;
 border-radius: 6px;
 border: 0;
 box-sizing: border-box;
 font-size: 12px;">
 <button type="button" id="tabber_plusIcon_save" style="border-radius: 6px;
 border: 0;
 font-size: 12px;
 padding: 5px 10px;
 background: transparent;
border: 1px solid #fff;
color: #fff;
cursor:pointer;
 text-transform: lowercase;">Save</button>
</div>
<img src="${plusIcon}" alt="" style="width: 20px;cursor:pointer" id="tabber_plusIcon"/>
`;

document.body.append(node);

document.body.addEventListener("click", (e) => {
 if (e.target.id == "tabber_plusIcon") {
  extension.runtime.sendMessage({
   message: "tabber_getFolder_list"
  });
  document.querySelector("#tabber_plusIcon_options").style.display = "block";
 } else if (e.target.id == "tabber_plusIcon_save") {
  var tabberFolderInput = document.querySelector("#tabber_plusIcon_input").value;
  if (tabberFolderInput != "") {
   extension.runtime.sendMessage({
    message: "tabber_add_url",
    data: tabberFolderInput
   });
  } else {
   var tabberFolderSelect = document.querySelector("#tabber_plusIcon_select").value;
   extension.runtime.sendMessage({
    message: "tabber_add_url",
    data: tabberFolderSelect
   });
  }
  document.querySelector("#tabber_plusIcon_options").style.display = "none";
 }
});

extension.runtime.onMessage.addListener(onMessage);

function onMessage(message, sender, sendResponse) {
 switch (message.message) {
  case "tabber_takeFolder_List":
   if (message.data.length) {
    document.querySelector("#tabber_plusIcon_select").innerHTML = "";
    document.querySelector("#tabber_plusIcon_input").value = "";

    for (let item of message.data) {
     document.querySelector("#tabber_plusIcon_select").innerHTML += `<option for="${item.Folder}">${item.Folder}</option>`;
    }
   }
   break;
 }
}