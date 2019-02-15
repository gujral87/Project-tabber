import '../style/popup.scss';

import angular from 'angular';

import * as db from '../../assets/db/database.js';

import {
 extension
} from '../../assets/js/extension.js';

const angularModule = angular.module('tabber', []);

angularModule.controller("appController", ['$scope', function($scope) {
 $scope.folders = [];
 $scope.folderItems = [];

 $scope.renderFolder = async function() {
  $scope.folders = await db.Read("tabberList", '', {
   groupBy: "Folder",
  });

  $scope.$digest();
 }
 $scope.renderFolder();


 $scope.showFolderData = async function(folderName) {
  var folderItems = await db.Read("tabberList", {
   "Folder": folderName
  });
  $scope.folderItems = folderItems;
  $scope.$digest();
 }


 // Open single Url
 $scope.openLink = function(url) {
  extension.tabs.create({
   url: url
  });
 };

 // Remove single Url
 $scope.removeLink = function(id, folder) {
  db.Remove("tabberList", {
   Id: id
  });
  $scope.showFolderData(folder);
 };

 // Open all Url from Folder
 $scope.openAllLink = function(folder) {
  for (let a of folder) {
   extension.tabs.create({
    url: a.Url
   });
  }
 };

 // Remove All Url from Folder
 $scope.removeAllLink = function(folder) {
  db.Remove("tabberList", {
   Folder: folder[0].Folder
  });
  $scope.showFolderData(folder);
 };

}]);