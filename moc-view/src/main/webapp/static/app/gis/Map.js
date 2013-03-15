/**
 * @author Roman Zaripov
 */
define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/_base/connect',
	'dojo/parser',
	'esri/map',
	'esri/layers/osm',
	'esri/layers/agstiled',
	'esri/layers/agsdynamic',
	'dijit/layout/BorderContainer', 
	'dijit/layout/ContentPane'
	//'dojo/domReady!'
], function(declare, lang, connect, parser) {
	//parser.parse();
	return declare(esri.Map, {
		constructor: function() {
			var _this = this;
			
			var _urlPrefix = 'http://fkdemodb.ibs.ru/arcgis/rest/services/';
			
			// Initial extent
			this.extent = new esri.geometry.Extent({
				xmin: 2170000.0, 
				ymin: 5500000.0, 
				xmax: 15000000.0, 
				ymax: 11000000.0, 
				spatialReference: {
					wkid: 102100
				}
			});
			
			// Defining operator coverage services
			var _yota = new esri.layers.ArcGISTiledMapServiceLayer(_urlPrefix + 'Internet_Coverage_Yota_Web/MapServer', {
				visible: false,
				opacity: .7
			});
			
			var _megafon = new esri.layers.ArcGISTiledMapServiceLayer(_urlPrefix + 'Internet_Coverage_Megafon_Web/MapServer', {
				visible: false,
				opacity: .7
			});
	
			var _anyOperator = new esri.layers.ArcGISTiledMapServiceLayer(_urlPrefix + 'Internet_Coverage_Operators_Web/MapServer', {
				opacity: .7, 
				visible: true
			});
			
			this.getOperatorServices = function() {
				return [_anyOperator, _yota, _megafon];
			};
			
			// Adding services to the map
			this.addLayer(new esri.layers.OpenStreetMapLayer()); // adding base layer first
			this.addLayer(_yota);
			this.addLayer(_megafon);
			this.addLayer(_anyOperator);
			this.addLayer(new esri.layers.ArcGISDynamicMapServiceLayer(_urlPrefix + 'Labels_Internet_Coverage/MapServer'));		
		}
	});
});