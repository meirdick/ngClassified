    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

           var vm = this;

           vm.openSidebar = openSidebar;
           vm.closeSidebar = closeSidebar;
           vm.saveClassified = saveClassified;

           vm.saveEdit = saveEdit;

           vm.classifieds;
           vm.classified;
           vm.categories;
           vm.editing;


           classifiedsFactory.getClassifieds().then(function(classifieds) {
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(vm.classifieds);
            });

           $scope.$on('newClassified', function(event, classified) {
                classified.id = vm.classifieds.length + 1;
                vm.classifieds.push(classified);
                showToast('classifieds saved');
           })
            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            })

            var contact = {
                name: "Ryan Dick",
                phone: "555 555 5555",
                email: "mdk85@gmail.com"
            }

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSidebar();
                    showToast("Classified saved!");
                }
            }



            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast("Edit saved!");
            }





        function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(3000)
                );
        }

        function getCategories(classifieds) {
            var categories = [];

            angular.forEach(classifieds, function(item) {
                angular.forEach(item.categories, function(category) {
                    categories.push(category);
                });
            });
            return _.uniq(categories);
        }

    });
