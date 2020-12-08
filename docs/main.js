(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/matt/GitHub/angular-cli-esri-map-unit-testing/src/main.ts */"zUnb");


/***/ }),

/***/ "1i8C":
/*!*****************************************!*\
  !*** ./src/app/services/map.service.ts ***!
  \*****************************************/
/*! exports provided: MapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapService", function() { return MapService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_esriLoaderWrapper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/esriLoaderWrapper.service */ "7A6l");
/* harmony import */ var _environment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environment.service */ "qmmW");





// This class encapsulates the Esri MapView and methods to manipulate the map. It is a singleton service, provided in
// the application root so that it can be injected into any component which needs to access the ArcGIS map.
var MapService = /** @class */ (function () {
    function MapService(esriLoaderWrapperService, environment) {
        this.esriLoaderWrapperService = esriLoaderWrapperService;
        this.environment = environment;
    }
    // Initialize a default Map object for the app, which is rendered with a MapView that is bound to the DOM
    // element inside parameter 'mapElementRef'
    MapService.prototype.initDefaultMap = function (basemap, centerLon, centerLat, zoomLevel, mapElementRef) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, Map, MapView;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.defaultCenterLat = centerLat;
                        this.defaultCenterLon = centerLon;
                        this.defaultZoom = zoomLevel;
                        return [4 /*yield*/, this.esriLoaderWrapperService.loadModules(['esri/Map', 'esri/views/MapView'])];
                    case 1:
                        _a = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"].apply(void 0, [_b.sent(), 2]), Map = _a[0], MapView = _a[1];
                        this.map = this.esriLoaderWrapperService.getInstance(Map, { basemap: basemap });
                        this.mapView = this.esriLoaderWrapperService.getInstance(MapView, {
                            map: this.map,
                            center: [centerLon, centerLat],
                            zoom: zoomLevel,
                            container: mapElementRef === null || mapElementRef === void 0 ? void 0 : mapElementRef.nativeElement,
                            ui: {
                                components: ['attribution'],
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // Creates instances of widgets and add them to the MapView
    MapService.prototype.addAllMapWidgets = function (basemapToggleId, basemapTogglePosition, zoomPosition) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _c, BasemapToggle, Zoom, toggle, zoom;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.esriLoaderWrapperService.loadModules([
                            'esri/widgets/BasemapToggle',
                            'esri/widgets/Zoom',
                        ])];
                    case 1:
                        _c = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"].apply(void 0, [_d.sent(), 2]), BasemapToggle = _c[0], Zoom = _c[1];
                        toggle = this.esriLoaderWrapperService.getInstance(BasemapToggle, {
                            view: this.mapView,
                            nextBasemap: basemapToggleId.toString(),
                        });
                        zoom = this.esriLoaderWrapperService.getInstance(Zoom, {
                            view: this.mapView,
                        });
                        (_a = this.mapView) === null || _a === void 0 ? void 0 : _a.ui.add(toggle, basemapTogglePosition.toString());
                        (_b = this.mapView) === null || _b === void 0 ? void 0 : _b.ui.add(zoom, zoomPosition.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    MapService.prototype.removeAllPoints = function (zoomToDefaultExtent) {
        var _a, _b;
        (_a = this.map) === null || _a === void 0 ? void 0 : _a.removeAll();
        if (zoomToDefaultExtent) {
            (_b = this.mapView) === null || _b === void 0 ? void 0 : _b.goTo({
                center: [this.defaultCenterLon, this.defaultCenterLat],
                zoom: this.defaultZoom,
            });
        }
    };
    MapService.prototype.addPointsToMap = function (mapPoints) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _c, Graphic, FeatureLayer, graphics, randomPointsLayer;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (_a = this.map) === null || _a === void 0 ? void 0 : _a.removeAll();
                        return [4 /*yield*/, this.esriLoaderWrapperService.loadModules([
                                'esri/Graphic',
                                'esri/layers/FeatureLayer',
                            ])];
                    case 1:
                        _c = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"].apply(void 0, [_d.sent(), 2]), Graphic = _c[0], FeatureLayer = _c[1];
                        graphics = mapPoints.map(function (point, i) {
                            return new Graphic({
                                attributes: {
                                    ObjectId: i + 1,
                                    location: point.location,
                                },
                                geometry: {
                                    type: 'point',
                                    longitude: point.lon,
                                    latitude: point.lat,
                                },
                            });
                        });
                        randomPointsLayer = new FeatureLayer({
                            source: graphics,
                            objectIdField: 'OBJECTID',
                            renderer: {
                                type: 'simple',
                                symbol: {
                                    type: 'simple-marker',
                                    color: '#ffff00',
                                    size: '12px',
                                    outline: {
                                        color: '#0d0d0d',
                                        width: 1.5,
                                    },
                                },
                            },
                            popupTemplate: {
                                title: 'Map points',
                                content: [
                                    {
                                        type: 'fields',
                                        fieldInfos: [
                                            {
                                                fieldName: 'location',
                                                label: 'Location',
                                                visible: true,
                                            },
                                            {
                                                fieldName: 'latitude',
                                                label: 'Latitude',
                                                visible: true,
                                            },
                                            {
                                                fieldName: 'longitude',
                                                label: 'longitude',
                                                visible: true,
                                            },
                                        ],
                                    },
                                ],
                            },
                        });
                        (_b = this.map) === null || _b === void 0 ? void 0 : _b.layers.add(randomPointsLayer);
                        return [4 /*yield*/, this.zoomToLayer(randomPointsLayer)];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MapService.prototype.zoomToLayer = function (layer) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _b, _c, _d;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!((_a = this.mapView) === null || _a === void 0)) return [3 /*break*/, 1];
                        _b = void 0;
                        return [3 /*break*/, 3];
                    case 1:
                        _d = (_c = _a).goTo;
                        return [4 /*yield*/, layer.queryExtent()];
                    case 2:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 3;
                    case 3:
                        _b;
                        return [2 /*return*/];
                }
            });
        });
    };
    MapService.ɵfac = function MapService_Factory(t) { return new (t || MapService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_services_esriLoaderWrapper_service__WEBPACK_IMPORTED_MODULE_2__["EsriLoaderWrapperService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_environment_service__WEBPACK_IMPORTED_MODULE_3__["EnvironmentService"])); };
    MapService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MapService, factory: MapService.ɵfac, providedIn: 'root' });
    return MapService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MapService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: src_app_services_esriLoaderWrapper_service__WEBPACK_IMPORTED_MODULE_2__["EsriLoaderWrapperService"] }, { type: _environment_service__WEBPACK_IMPORTED_MODULE_3__["EnvironmentService"] }]; }, null); })();


/***/ }),

/***/ "7A6l":
/*!*******************************************************!*\
  !*** ./src/app/services/esriLoaderWrapper.service.ts ***!
  \*******************************************************/
/*! exports provided: EsriLoaderWrapperService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EsriLoaderWrapperService", function() { return EsriLoaderWrapperService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var esri_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri-loader */ "r6rm");
/* harmony import */ var esri_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(esri_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environment.service */ "qmmW");





// This class acts as a wrapper for methods available in the esri-loader npm package so that they can be
// more easily mocked during testing.
var EsriLoaderWrapperService = /** @class */ (function () {
    function EsriLoaderWrapperService(environment) {
        this.environment = environment;
    }
    EsriLoaderWrapperService.prototype.loadCss = function (url, before) {
        Object(esri_loader__WEBPACK_IMPORTED_MODULE_2__["loadCss"])(url, before);
    };
    EsriLoaderWrapperService.prototype.loadModules = function (modules) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(esri_loader__WEBPACK_IMPORTED_MODULE_2__["loadModules"])(modules, {
                            url: this.environment.baseConfigs.arcgisJsApiSettings.apiUrl,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // This generic method accepts a constructor as a parameter and and optional object parameter, and returns
    // an instance of Type <T>. See this link for more information about the mixin pattern:
    // https://devblogs.microsoft.com/typescript/announcing-typescript-2-2-rc/
    EsriLoaderWrapperService.prototype.getInstance = function (type, paramObj) {
        return new type(paramObj);
    };
    EsriLoaderWrapperService.ɵfac = function EsriLoaderWrapperService_Factory(t) { return new (t || EsriLoaderWrapperService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_environment_service__WEBPACK_IMPORTED_MODULE_3__["EnvironmentService"])); };
    EsriLoaderWrapperService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EsriLoaderWrapperService, factory: EsriLoaderWrapperService.ɵfac, providedIn: 'root' });
    return EsriLoaderWrapperService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EsriLoaderWrapperService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _environment_service__WEBPACK_IMPORTED_MODULE_3__["EnvironmentService"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var _environment_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment.base */ "fDkO");

var environment = {
    production: false,
    baseConfigs: _environment_base__WEBPACK_IMPORTED_MODULE_0__["baseConfigs"],
    randomPtsPhxUrl: 'https://mfcallahan-homepage-dev.azurewebsites.net/api/MockData/RandomPointsPhx',
};


/***/ }),

/***/ "H+bZ":
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _environment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environment.service */ "qmmW");





var ApiService = /** @class */ (function () {
    function ApiService(environment, httpClient) {
        this.environment = environment;
        this.httpClient = httpClient;
    }
    ApiService.prototype.getRandomPointsInPhx = function (numPoints) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('numPoints', numPoints.toString());
        return this.httpClient.get(this.environment.randomPtsPhxUrl, { params: params });
    };
    ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_environment_service__WEBPACK_IMPORTED_MODULE_2__["EnvironmentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
    return ApiService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _environment_service__WEBPACK_IMPORTED_MODULE_2__["EnvironmentService"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "RRIf":
/*!*****************************************!*\
  !*** ./src/app/enums/widgetPosition.ts ***!
  \*****************************************/
/*! exports provided: WidgetPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetPosition", function() { return WidgetPosition; });
var WidgetPosition;
(function (WidgetPosition) {
    WidgetPosition["bottomLeading"] = "bottom-leading";
    WidgetPosition["bottomLeft"] = "bottom-left";
    WidgetPosition["bottomRight"] = "bottom-right";
    WidgetPosition["bottomTrailing"] = "bottom-trailing";
    WidgetPosition["topLeading"] = "top-leading";
    WidgetPosition["topLeft"] = "top-left";
    WidgetPosition["topRight"] = "top-right";
    WidgetPosition["topTrailing"] = "top-trailing";
    WidgetPosition["manual"] = "manual";
})(WidgetPosition || (WidgetPosition = {}));


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_environment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/environment.service */ "qmmW");
/* harmony import */ var src_app_services_esriLoaderWrapper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/esriLoaderWrapper.service */ "7A6l");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header/header.component */ "fECr");
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./map/map.component */ "cNoH");







var AppComponent = /** @class */ (function () {
    function AppComponent(environment, esriLoaderWrapperService) {
        this.environment = environment;
        this.esriLoaderWrapperService = esriLoaderWrapperService;
    }
    AppComponent.prototype.ngOnInit = function () {
        // Load the ArcGIS JS API styles on app init, inserting the stylesheet link above the first <style> tag on
        // the page so that ArcGIS styles can be overridden, if needed. See this link for more information:
        // https://github.com/Esri/esri-loader#overriding-arcgis-styles
        this.esriLoaderWrapperService.loadCss(this.environment.baseConfigs.arcgisJsApiSettings.cssUrl, 'link[rel="stylesheet"]');
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_environment_service__WEBPACK_IMPORTED_MODULE_1__["EnvironmentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_esriLoaderWrapper_service__WEBPACK_IMPORTED_MODULE_2__["EsriLoaderWrapperService"])); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [["fxLayout", "column", 1, "appContent"], ["fxFlex", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-header");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-map", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__["DefaultLayoutDirective"], _header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _map_map_component__WEBPACK_IMPORTED_MODULE_5__["MapComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__["DefaultFlexDirective"]], styles: [".appContent[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXBwQ29udGVudCB7XG4gIGhlaWdodDogMTAwdmg7XG59XG4iXX0= */"] });
    return AppComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], function () { return [{ type: src_app_services_environment_service__WEBPACK_IMPORTED_MODULE_1__["EnvironmentService"] }, { type: src_app_services_esriLoaderWrapper_service__WEBPACK_IMPORTED_MODULE_2__["EsriLoaderWrapperService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./material.module */ "vvyD");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./map/map.component */ "cNoH");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./header/header.component */ "fECr");










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"], _material_module__WEBPACK_IMPORTED_MODULE_4__["MaterialModule"]]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _map_map_component__WEBPACK_IMPORTED_MODULE_6__["MapComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_8__["HeaderComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"], _material_module__WEBPACK_IMPORTED_MODULE_4__["MaterialModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _map_map_component__WEBPACK_IMPORTED_MODULE_6__["MapComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_8__["HeaderComponent"]],
                imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"], _material_module__WEBPACK_IMPORTED_MODULE_4__["MaterialModule"]],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "cNoH":
/*!**************************************!*\
  !*** ./src/app/map/map.component.ts ***!
  \**************************************/
/*! exports provided: MapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapComponent", function() { return MapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_enums_widgetPosition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/enums/widgetPosition */ "RRIf");
/* harmony import */ var src_app_enums_basemapId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/enums/basemapId */ "nt3k");
/* harmony import */ var src_app_services_map_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/map.service */ "1i8C");






var _c0 = ["mapView"];
var MapComponent = /** @class */ (function () {
    function MapComponent(mapService) {
        this.mapService = mapService;
        // Set default map center and zoom to continental USA
        this.defaultCenterLat = 39.83;
        this.defaultCenterLon = -98.58;
        this.defaultZoom = 5;
        this.defaultBaseMap = 'streets';
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapService.initDefaultMap(this.defaultBaseMap, this.defaultCenterLon, this.defaultCenterLat, this.defaultZoom, this.mapElementRef)];
                    case 1:
                        _a.sent();
                        this.mapService.addAllMapWidgets(src_app_enums_basemapId__WEBPACK_IMPORTED_MODULE_3__["BasemapId"].hybrid, src_app_enums_widgetPosition__WEBPACK_IMPORTED_MODULE_2__["WidgetPosition"].topLeft, src_app_enums_widgetPosition__WEBPACK_IMPORTED_MODULE_2__["WidgetPosition"].topRight);
                        return [2 /*return*/];
                }
            });
        });
    };
    MapComponent.ɵfac = function MapComponent_Factory(t) { return new (t || MapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_map_service__WEBPACK_IMPORTED_MODULE_4__["MapService"])); };
    MapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MapComponent, selectors: [["app-map"]], viewQuery: function MapComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.mapElementRef = _t.first);
        } }, decls: 2, vars: 0, consts: [[1, "mapView"], ["mapView", ""]], template: function MapComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0, 1);
        } }, styles: [".mapView[_ngcontent-%COMP%] {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL21hcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRiIsImZpbGUiOiJtYXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFwVmlldyB7XG4gIGhlaWdodDogMTAwJTtcbn1cbiJdfQ== */"] });
    return MapComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MapComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-map',
                templateUrl: './map.component.html',
                styleUrls: ['./map.component.scss'],
            }]
    }], function () { return [{ type: src_app_services_map_service__WEBPACK_IMPORTED_MODULE_4__["MapService"] }]; }, { mapElementRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['mapView', { static: false }]
        }] }); })();


/***/ }),

/***/ "fDkO":
/*!**********************************************!*\
  !*** ./src/environments/environment.base.ts ***!
  \**********************************************/
/*! exports provided: baseConfigs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseConfigs", function() { return baseConfigs; });
var arcgisVersion = '4.17';
var baseConfigs = {
    arcgisJsApiSettings: {
        apiUrl: "https://js.arcgis.com/" + arcgisVersion + "/",
        cssUrl: "https://js.arcgis.com/" + arcgisVersion + "/esri/css/main.css",
    },
};


/***/ }),

/***/ "fECr":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/api.service */ "H+bZ");
/* harmony import */ var src_app_services_map_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/map.service */ "1i8C");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");










function HeaderComponent_mat_spinner_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-spinner", 5);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("diameter", 35);
} }
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(apiService, mapService) {
        this.apiService = apiService;
        this.mapService = mapService;
        this.showSpinner = false;
        this.dataLoaded = false;
    }
    HeaderComponent.prototype.loadDataClick = function () {
        var _this = this;
        this.showSpinner = true;
        var numPointsToLoad = 100;
        if (this.dataLoaded) {
            this.mapService.removeAllPoints(false);
        }
        this.apiService.getRandomPointsInPhx(numPointsToLoad).subscribe(function (response) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapService.addPointsToMap(response)];
                    case 1:
                        _a.sent();
                        this.showSpinner = false;
                        this.dataLoaded = true;
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HeaderComponent.prototype.clearDataClick = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapService.removeAllPoints(true)];
                    case 1:
                        _a.sent();
                        this.dataLoaded = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_map_service__WEBPACK_IMPORTED_MODULE_3__["MapService"])); };
    HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 9, vars: 3, consts: [["color", "primary", "fxLayout", "row"], ["fxFlex", "", "fxLayoutAlign", "start none"], ["fxFlex", "", "fxLayoutAlign", "end none", "fxLayoutGap", "20px"], ["color", "accent", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["href", "#", "mat-raised-button", "", "color", "accent", 3, "disabled", "click"], ["color", "accent", "mode", "indeterminate", 3, "diameter"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-toolbar", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Angular CLI & Esri");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, HeaderComponent_mat_spinner_4_Template, 1, 1, "mat-spinner", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_5_listener() { return ctx.loadDataClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Load Data");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "a", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_7_listener() { return ctx.clearDataClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Clear Data");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showSpinner);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.showSpinner);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.dataLoaded || ctx.showSpinner);
        } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbar"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultFlexDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultLayoutGapDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatAnchor"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__["MatSpinner"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MifQ== */"] });
    return HeaderComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.scss'],
            }]
    }], function () { return [{ type: src_app_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }, { type: src_app_services_map_service__WEBPACK_IMPORTED_MODULE_3__["MapService"] }]; }, null); })();


/***/ }),

/***/ "nt3k":
/*!************************************!*\
  !*** ./src/app/enums/basemapId.ts ***!
  \************************************/
/*! exports provided: BasemapId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasemapId", function() { return BasemapId; });
var BasemapId;
(function (BasemapId) {
    BasemapId["topo"] = "topo";
    BasemapId["streets"] = "streets";
    BasemapId["satellite"] = "satellite";
    BasemapId["hybrid"] = "hybrid";
    BasemapId["darkGray"] = "dark-gray";
    BasemapId["gray"] = "gray";
    BasemapId["nationalGeographic"] = "national-geographic";
    BasemapId["oceans"] = "oceans";
    BasemapId["osm"] = "osm";
    BasemapId["terrain"] = "terrain";
    BasemapId["darkGrayVector"] = "dark-gray-vector";
    BasemapId["grayVector"] = "gray-vector";
    BasemapId["streetsVector"] = "streets-vector";
    BasemapId["streetsNightVector"] = "streets-night-vector";
    BasemapId["streetsNavigationVector"] = "streets-navigation-vector";
    BasemapId["topoVector"] = "topo-vector";
    BasemapId["streetsReliefVector"] = "streets-relief-vector";
})(BasemapId || (BasemapId = {}));


/***/ }),

/***/ "qmmW":
/*!*************************************************!*\
  !*** ./src/app/services/environment.service.ts ***!
  \*************************************************/
/*! exports provided: EnvironmentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentService", function() { return EnvironmentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");



var EnvironmentService = /** @class */ (function () {
    function EnvironmentService() {
    }
    Object.defineProperty(EnvironmentService.prototype, "production", {
        get: function () {
            return src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentService.prototype, "baseConfigs", {
        get: function () {
            return src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].baseConfigs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvironmentService.prototype, "randomPtsPhxUrl", {
        get: function () {
            return src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].randomPtsPhxUrl;
        },
        enumerable: false,
        configurable: true
    });
    EnvironmentService.ɵfac = function EnvironmentService_Factory(t) { return new (t || EnvironmentService)(); };
    EnvironmentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: EnvironmentService, factory: EnvironmentService.ɵfac, providedIn: 'root' });
    return EnvironmentService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EnvironmentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();


/***/ }),

/***/ "vvyD":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");








var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MaterialModule });
    MaterialModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MaterialModule_Factory(t) { return new (t || MaterialModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__["MatDividerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"]] });
    return MaterialModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MaterialModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], exports: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__["MatDividerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaterialModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                exports: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_5__["MatDividerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map