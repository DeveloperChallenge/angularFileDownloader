"use strict";
/**
 * file downloader module
 * It download the file using blob and fileSaver
 */

(function() {
    angular.module('downloadFileModule', ["ngFileSaver"])
        .service('downloadFileService', downloadFileService);
    downloadFileService.$inject = ["FileSaver", "Blob", "objectService", "CONFIG", "$http"];

    function downloadFileService(FileSaver, Blob, objectService, CONFIG, $http) {
        var self = this;



        self.downloadFile = function(filename, data) {
            var queryObject = objectService.andQueryToObject(data);

            var url = CONFIG.requestApi + "download";
            $http({
                method: 'POST',
                url: url,
                data: queryObject,
            }).then(function(res) {
                var data = new Blob([res.data], { type: 'text/csv;charset=utf-8' });
                FileSaver.saveAs(data, filename + ".csv");
            }, function(err) {
                console.log(err);
                // Handle error here 
            })
        }

    }


})();
