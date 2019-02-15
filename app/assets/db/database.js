const JsStore = require('jsstore');
var connection = new JsStore.Instance(new Worker('vendor/jsstore.worker.min.js'));

var DbName = 'TabSuspension_IndexDb';
// DataBase Schema
function getDbSchema() {
 var tabberList = {
  name: "tabberList",
  columns: [{
    name: "Id",
    primaryKey: true,
    autoIncrement: true
   },
   {
    name: "Folder",
    notNull: true,
    dataType: JsStore.DATA_TYPE.String
   },
   {
    name: "Url",
    notNull: true,
    unique: true,
    dataType: JsStore.DATA_TYPE.String
   },
   {
    name: "Favicon",
    dataType: JsStore.DATA_TYPE.String
   },
   {
    name: "Title",
    dataType: JsStore.DATA_TYPE.String
   },
   {
    name: "Timeline",
    dataType: JsStore.DATA_TYPE.String
   }
  ]
 };

 var db = {
  name: DbName,
  tables: [tabberList]
 }
 return db;
}
// Initial Function for Database
async function initJsStore() {
 let isExist = await connection.isDbExist(DbName);
 if (isExist) {
  connection.openDb(DbName);
 } else {
  var database = getDbSchema();
  let tables = await connection.createDb(database);
 }
}
// Initial DB
initJsStore();
// read DB
async function Read(FROM, WHERE, GROUP) {
 let rowsRead;
 if (GROUP == undefined) {
  rowsRead = await connection.select({
   from: FROM,
   where: WHERE,
  });
 } else {
  rowsRead = await connection.select({
   from: FROM,
   groupBy: GROUP
  });
 }
 if (rowsRead.length) {
  return rowsRead;
 } else {
  return [];
 }
}
// Update DB
async function Update(IN, WHERE, SET) {
 let rowsUpdated = await connection.update({ in: IN,
  where: WHERE,
  set: SET
 });

 if (typeof rowsUpdated == "number") {
  return true;
 } else {
  return false;
 }
}
// add Item DB
async function Add(INTO, VALUES) {
 let rowsInserted = await connection.insert({
  into: INTO,
  values: VALUES,
  return: true
 });

 if (rowsInserted.length) {
  return rowsInserted;
 } else {
  return [];
 }
}
// Remove Item DB
async function Remove(FROM, WHERE) {
 let rowsDeleted = await connection.remove({
  from: FROM,
  where: WHERE,
 });

 if (typeof rowsDeleted == "number") {
  return true;
 } else {
  return false;
 }

}
// Drop DB
async function Reset() {
 let isDropped = await connection.dropDb();
 if (isDropped) {
  return true;
 } else {
  return false;
 }
}

export {
 Read,
 Update,
 Add,
 Remove,
 Reset
};