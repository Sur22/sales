/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("sales.states.order", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.order_head', {
                'url': '/order_head',
                'templateUrl': templateRoot + '/masters/order/order_head.html',
                'controller': 'OrderHeadController'
            });
            $stateProvider.state('admin.order_details', {
                'url': '/:orderHeadId/order_details',
                'templateUrl': templateRoot + '/masters/order/order_detail.html',
                'controller': 'OrderDetailsController'
            });
            $stateProvider.state('admin.order_details.order_delete', {
                'url': '/:orderDetailId/delete',
                'templateUrl': templateRoot + '/masters/order/order_detail_delete.html',
                'controller': 'OrderDetailDeleteController'
            });
        })
        .controller('OrderHeadController', function ($scope, $state, $rootScope, OrderHeadService, UserService) {
            $scope.editableOrderHead = {};
            $scope.editableOrderHead.billingFloorNum = 0;
            $scope.showLift = false;
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                $scope.userObject = userObject;
            });
            $scope.editableOrderHead.orderDate = new Date();
            $scope.$watch('editableOrderHead.billingFloorNum', function (floorNum) {
                if (floorNum === 0) {
                    $scope.showLift = false;
                } else {
                    $scope.showLift = true;
                }
            });
            $scope.$watch('sameAsBilling', function (billingdeliverySame) {
                if (billingdeliverySame === true) {
                    $scope.editableOrderHead.deliveryFloorNum = $scope.editableOrderHead.billingFloorNum;
                    $scope.editableOrderHead.deliveryLift = $scope.editableOrderHead.billingLift;
                    $scope.editableOrderHead.deliveryAdd1 = $scope.editableOrderHead.billingAdd1;
                    $scope.editableOrderHead.deliveryAdd2 = $scope.editableOrderHead.billingAdd2;
                    $scope.editableOrderHead.deliveryAdd3 = $scope.editableOrderHead.billingAdd3;
                    $scope.editableOrderHead.deliveryPostalCode = $scope.editableOrderHead.billingPostalCode;
                    $scope.editableOrderHead.deliveryCity = $scope.editableOrderHead.billingCity;
                    $scope.editableOrderHead.deliveryState = $scope.editableOrderHead.billingState;
                } else if (billingdeliverySame === false) {
                    $scope.editableOrderHead.deliveryFloorNum = 0;
                    $scope.editableOrderHead.deliveryLift = '';
                    $scope.editableOrderHead.deliveryAdd1 = '';
                    $scope.editableOrderHead.deliveryAdd2 = '';
                    $scope.editableOrderHead.deliveryAdd3 = '';
                    $scope.editableOrderHead.deliveryPostalCode = '';
                    $scope.editableOrderHead.deliveryCity = '';
                    $scope.editableOrderHead.deliveryState = '';
                }
                ;
            });

            $scope.saveOrderHead = function (orderHead) {
                orderHead.createdBy = $scope.userObject.id;
                OrderHeadService.save(orderHead, function (orderH) {
                    $state.go('admin.order_details', {
                        'orderHeadId': orderH.id
                    }, {'reload': true});
                });
            };

        })
        .controller('OrderDetailsController', function ($state, OrderDetailsService, SkuStockService, OrderHeadService, $stateParams, $rootScope, $scope, UserService) {
            $scope.editableOrderHead = {};
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHeadObject = orderHeadObject;
                $scope.editableOrderHead = orderHeadObject;
                $scope.editableOrderHead.transportationCharges = 750;
            });

            $scope.orderDetailsList = OrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            });

//            $scope.$watch('orderDetailsList', function (orderDetaisList) {
//                console.log("orderDetails List :%O", $scope.orderDetailsList);
//                var a = 0;
//                angular.forEach(orderDetaisList, function (orderObject) {
//                    a = a + orderObject.price;
//                    console.log("$scope.totalPrice :%O", a);
//                    $scope.editableOrderHead.totalAmount = a;
//                });
//            });

            $scope.searchSku = function (skuString) {
                return SkuStockService.findByNameLike({
                    'name': skuString
                }).$promise;
            };
            $scope.setSku = function (sku) {
                $scope.stockOver = false;
                $scope.disableDetailSave = false;
                $scope.sku = sku.productName;
                $scope.skuObject = sku;
            };

            $scope.$watch('editableOrderDetail.quantity', function (productQuantity) {
                $scope.editableOrderDetail.price = ($scope.skuObject.price * productQuantity);
            });
            $scope.$watch('editableOrderHead.installationCharges', function (installationCharges) {
                console.log("Transporation :" + $scope.editableOrderHead.transportationCharges);
                console.log("Installation :" + installationCharges);
                $scope.orderDetailsArray = OrderDetailsService.findByOrderHeadId({
                    'orderHeadId': $stateParams.orderHeadId
                }, function (orderDetailsList) {
                    var b = 0;
                    angular.forEach(orderDetailsList, function (orderDetail) {
                        b = b + orderDetail.price;
                        $scope.totalOrderPrice = b;
                    });
                });
                console.log("Total Order price :%O", $scope.totalOrderPrice);
                $scope.editableOrderHead.totalAmount = ($scope.editableOrderHead.transportationCharges + installationCharges + $scope.totalOrderPrice);
            });
            $scope.stockOver = false;
            $scope.disableDetailSave = false;
            $scope.saveOrderDetail = function (editableOrderDetail) {
                $scope.t48Stock = $scope.skuObject.t48Stock;
                $scope.nimjiStock = $scope.skuObject.nimjiStock;
                if ($scope.t48Stock >= editableOrderDetail.quantity) {
                    $scope.skuObject.t48Stock = ($scope.skuObject.t48Stock - editableOrderDetail.quantity);
                    $scope.skuObject.totalStock = ($scope.skuObject.totalStock - editableOrderDetail.quantity);
                    editableOrderDetail.productLocation = "T48";
                    $scope.skuObject.$save();
                } else if ($scope.t48Stock <= editableOrderDetail.quantity) {
                    if ($scope.nimjiStock >= editableOrderDetail.quantity) {
                        $scope.skuObject.nimjiStock = ($scope.skuObject.nimjiStock - editableOrderDetail.quantity);
                        $scope.skuObject.totalStock = ($scope.skuObject.totalStock - editableOrderDetail.quantity);
                        editableOrderDetail.productLocation = "NIMJI";
                        $scope.skuObject.$save();
                    } else {
                        $scope.stockOver = true;
                        $scope.disableDetailSave = true;
                    }
                }
                editableOrderDetail.productId = $scope.skuObject.id;
                editableOrderDetail.productCode = $scope.skuObject.sku;
                editableOrderDetail.productName = $scope.skuObject.productDescription;
                editableOrderDetail.productColor = $scope.skuObject.color;
                editableOrderDetail.orderHeadId = $stateParams.orderHeadId;
                OrderDetailsService.save(editableOrderDetail, function (orderD) {
                    $state.go('admin.order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
            };

        })
        .controller('OrderDetailDeleteController', function (SkuStockService, OrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableOrderDetail = OrderDetailsService.get({'id': $stateParams.orderDetailId});
            $scope.deleteOrderDetail = function (orderDetail) {
                if (orderDetail.productLocation === "T48") {
                    $scope.skuObject = SkuStockService.get({
                        'id': orderDetail.productId
                    }, function (skuObject) {
                        $scope.skuObject.t48Stock = ($scope.skuObject.t48Stock + orderDetail.quantity);
                        $scope.skuObject.totalStock = ($scope.skuObject.totalStock + orderDetail.quantity);
                        $scope.skuObject.$save();
                    });
                } else if (orderDetail.productLocation === "NIMJI") {
                    $scope.skuObject = SkuStockService.get({
                        'id': orderDetail.productId
                    }, function (skuObject) {
                        $scope.skuObject.nimjiStock = ($scope.skuObject.nimjiStock + orderDetail.quantity);
                        $scope.skuObject.totalStock = ($scope.skuObject.totalStock + orderDetail.quantity);
                        $scope.skuObject.$save();
                    });
                }
                orderDetail.$delete(function () {
                    $state.go('admin.order_details', {
                        'orderHeadId': $scope.editableOrderDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        });