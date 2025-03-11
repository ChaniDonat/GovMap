// interface mapOptions {
//     token: '2596da32-3178-4a04-b596-aaaf9a9df2df',
//     visibleLayers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL"],
//     layers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL", "parcel_all"],
//     showXY: true,
//     identifyOnClick: true
// }

export interface GovMapObject {
    // "mapIframeId": "",
    // "mapUrl": "",
    // "urlWithProtocol": "http://",
    // "protocol": "http://",
    // "restBaseUrl": "ags.govmap.gov.il",
    // "routingBaseUrl": "route.govmap.gov.il/proxy/proxy.ashx",
    // "mapLoaded": {},
    // "authData": {
    //     "api_token": "",
    //     "user_token": "",
    //     "domain": "",
    //     "token": ""
    // },
    // "mapFreeToProcess": {},
    // "bMapReceiverAttached": {},
    // "pOnError": {},
    // "authenticated": {},
    // "dictApiCallStatus": {},
    // "aApiCallDelegate": {},
    // "clickBinded": false,
    // "dictSelectFeatures": [],
    // "transportation": {
    //     "startDepartureTime": "00:00",
    //     "endDepartureTime": "23:59",
    //     "numberOfDaysToAdd": 7
    // },
    // "events": {
    //     "PAN": 0,
    //     "EXTENT_CHANGE": 1,
    //     "CLICK": 3,
    //     "DOUBLE_CLICK": 4,
    //     "MOUSE_MOVE": 5,
    //     "MOUSE_OVER": 8
    // },
    // "internalClickEvents": {
    //     "GET_XY_CLICK": 10,
    //     "SELECTION": 11
    // },
    // "locateType": {
    //     "addressToLotParcel": 1,
    //     "lotParcelToAddress": 0
    // },
    // "cursorType": {
    //     "DEFAULT": 0,
    //     "TARGET": 1,
    //     "POLYGON": 3,
    //     "CIRCLE": 4,
    //     "RECTANGLE": 5,
    //     "SELECT_FEATURES": 6
    // },
    // "geometryType": {
    //     "POINT": 0,
    //     "POLYLINE": 1,
    //     "POLYGON": 2,
    //     "LINE": 3,
    //     "CIRCLE": 4
    // },
    // "drawType": {
    //     "Point": 0,
    //     "Polyline": 1,
    //     "Polygon": 2,
    //     "Circle": 3,
    //     "Rectangle": 4,
    //     "FreehandPolygon": 6
    // },
    // "rendererType": {
    //     "Simple": 0,
    //     "SimplePicture": 1,
    //     "JenksNaturalBreaks": 2,
    //     "EqualInterval": 3,
    //     "Quantile": 4,
    //     "ClassBreaks": 5
    // },
    // "geocodeType": {
    //     "FullResult": 0,
    //     "AccuracyOnly": 1
    // },
    // "saveAction": {
    //     "Delete": 1,
    //     "Update": 2,
    //     "New": 3
    // },
    // "saveActionStatus": {
    //     "Failed": 0,
    //     "Deleted": 1,
    //     "Updated": 2,
    //     "Inserted": 3
    // },
    // "costing": {
    //     "auto": "auto",
    //     "auto_shorter": "auto_shorter",
    //     "bicycle": "bicycle",
    //     "multimodal": "multimodal",
    //     "pedestrian": "pedestrian"
    // },
    // "routing_type": {
    //     "routing": "route",
    //     "isochrone": "isochrone"
    // }
    getRoutingServiceRoot: () => void
    getRestServiceRoot: () => void
    getScriptHostUrl: () => void
    getSchema: (src: any) => void
    postMapRequest: (oRequest: any) => void
    post: (url: any, data: any) => void
    getMapIframeWindow: () => void
    getMapIframeId: () => void
    getUrlWithProtocol: () => void
    getProtocol: () => void
    getRequestId: (requestType: any) => void
    checkProcessStatus: (requestId: any) => void
    addDelegateToQueue: (requestParams: any) => void
    hasPromise: (requestId: any) => void
    doProcess: () => void
    validJSON: (json: any) => void
    postError: (errObj: any) => void
    onError: () => void
    authenticatedUser: () => void
    getMapRequest: (request: any, bContinuous: any) => void
    resolvePromise: (requestId: any, data: any, bNotify: any) => void
    is: (func: any) => void
    validBackground: (bg: any) => void
    createMap: (targetDiv: any, options: any) => void
    setAuthData: (data: any) => void
    message_receiver: (e: any) => void
    setToken: (token: any, user_token: any) => void
    onEvent: (event: any, anycontinousMode: any) => void
    unbindEvent: (event: any) => void
    saveLayerEntities: (params: any) => void
    setLayerOpacity: (params: any) => void
    showLabels: (params: any) => void
    getLayerEntities: (params: any) => void
    getAddEntitiesSample: (params: any) => void
    refreshResource: (params: any) => void
    getLayerDef: (params: any) => void
    intersectFeatures: (params: any) => void
    intersectFeaturesByWhereClause: (params: any) => void
    searchAndLocate: (params: any) => void
    setBackground: (backgroundId: any) => void
  setMapCursor: (cursor: any) => void
    setDefaultTool: () => void
    showMeasure: () => void
    showPrint: (height: any, width: any) => void
    showExportMap: () => void
    closeBubble: () => void
    draw: (type: any) => void
    displayGeometries: (data: any) => void
    clearSelection: () => void
    clearDrawings: () => void
    clearGeometriesByName: (names: any) => void
    clearGeometriesById: (ids: any) => void
    zoomToXY: (params: any) => void
    clearMapMarker: () => void
    setMapMarker: (params: any) => void
    getXY: () => void
    geocode: (params: any) => void
    getFreeSearchResult: (params: any) => void
    setDrawPointTooltip: (params: any) => void
    gpsOn: () => void
    gpsOff: () => void
    getGPSLocation: () => void
    setGpsMarker: (gpsdata: any) => void
    removeGPSMarker: () => void
    getInScaleVisibleLayers: () => void
    showBubble: (data: any) => void
    identifyByXYAndLayer: (x: any, y: any, lyrs: any) => void
    identifyByXY: (x: any, y: any) => void
    getMapTolerance: () => void
    setVisibleLayers: (layersOn: any, layersOff: any) => void
    setHeatLayer: (params: any) => void
    removeHeatLayer: () => void
    changeHeatLayerValueField: (valueField: any) => void
    getLayerData: (params: any) => void
    getLayerRenderer: (layers: any) => void
    getResourceLayersInfo: (resourceName: any) => void
    addCustomBackground: (params: any) => void
    addAuthorizedBackground: (bgId: any) => void
    updateAuthData: (authData: any) => void
    getLegend: (params: any) => void
    addOpenSourceLayer: (params: any) => void
    searchInLayer: (params: any) => void
    setMapSelection: (params: any) => void
    intersectFeaturesLongGeom: (params: any) => void
    _selectFeatures: (interfaceName: any, wkt: any, tolerance: any, drawType: any, continous: any, defer: any) => void
    toWKT: (geometry: any) => void
    _pointToWKT: (geometry: any) => void
    _polylineToWKT: (geometry: any) => void
    _polygonToWKT: (geometry: any) => void
    _extentToWKT: (geometry: any) => void
    selectFeaturesOnMap: (interfaceName: any, drawType: any, continous: any) => void
    zoomToDrawing: () => void
    filterLayers: (params: any) => void
    zoomIn: () => void
    zoomOut: () => void
    zoomToExtent: (params: any) => void
    openTransporatationApp: () => void
    findLine: (params: any) => void
    getSpecificLine: (params: any) => void
    getStationArrivalTimes: (params: any) => void
    zoomToTransportationLine: (params: any) => void
    dateFormat: (date: any) => void
    projLocations: (locations: any) => void
    getLocationsFromAdresses: (addresses: any) => void
    getLocations: (params: any) => void
    getRoutingData: (params: any) => void
    getSearchItem: (params: any) => void
    getSearchComponentValues: (params: any) => void
    predefinedsearch: (params: any) => void

}
