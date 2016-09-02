'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:BandCtrl
 * @description 
 * # BandCtrl
 *
 * Controller for the Band of the musicApp.
 */
function BandCtrl($scope, $state, $stateParams, $timeout, BandService, LabelService) {
    $scope.getOneBand = function(id) {
        $scope.band = BandService.get({ id: id });
        $scope.band.$promise.then(function(result) {
            $scope.band = result;
        });
    }

    // Fetch all bands. Issues a GET to /api/bands
    $scope.getAllBands = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.bands = BandService.query();
        $scope.bands.$promise.then(function(result) {
            $scope.bands = result;
        });
    }

    // Fetch all labels. Issues a GET to /api/labels
    $scope.getAllLabels = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.labels = LabelService.query();
        $scope.labels.$promise.then(function(result) {
            $scope.labels = result;
        });
    }

    // Create a new band. Issues a POST to /api/bands
    $scope.addBand = function() {
        console.log(JSON.stringify($scope.band));
        console.log("selectedLabelId: " + $scope.band.Label);
        $scope.band.$save(
            function(resp, headers) {
                // On success go back to bands.
                //success callback
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Band was created successfully!", "success");
                $state.go('bands');
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to create your band.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Update the edited band. Issues a PUT to /api/bands/:id
    $scope.updateBand = function() {
        $scope.band.$update({ id: $scope.band.BandId },
            function(resp, headers) {
                // On success go back to bands.
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Band was updated successfully!", "success");
                $state.go("bands");
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to update your band.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Delete the specified band. Issues a DELETE to /api/bands/:id
    $scope.deleteBand = function(band) {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this band!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    $timeout(function() {
                        band.$delete({ id: band.BandId },
                            function(resp, headers) {
                                swal("Deleted!", "The band has been deleted.", "success");
                                console.log("success: " + JSON.stringify(resp));
                                // Update the bands that are being shown by ng-repeat.
                                $scope.getAllBands();
                            },
                            function(err) {
                                // error callback
                                swal("Error", "There was an error while tying to delete your band.", "error");
                                console.log("error: " + JSON.stringify(err));
                            });
                    }, 1500);
                } else {
                    swal("Cancelled", "The band is safe :)", "error");
                }
            });
    }

    $scope.band = {};
    $scope.bands = [];
    $scope.labels = [];
    $scope.country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    switch ($stateParams.action) {
        case "view":
            // Should get a specific band.
            $scope.getOneBand($stateParams.id);
            break;
        case "add":
            // Should create new band instance. Properties will be set via ng-model on UI.
            $scope.band = new BandService();
            $scope.getAllLabels();
            break;
        case "edit":
            // Load a band which can be edited on UI.
            $scope.getOneBand($stateParams.id);
            $scope.getAllLabels();
        default:
            // Should get all the bands.
            $scope.getAllBands();
    }
}

angular.module('musicApp').controller('BandCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'BandService', 'LabelService', BandCtrl]);
