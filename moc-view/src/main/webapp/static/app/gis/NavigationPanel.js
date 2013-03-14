/**
 * @author Roman Zaripov
 */
define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/dom-construct',
	'dojo/dom-class',
	'dojo/dom-geometry',
	'dojo/on', // TODO
	'dijit/form/VerticalSlider',
	'esri/toolbars/navigation'
], function(declare, lang, domConstruct, domClass, domGeometry, on, VerticalSlider) {
	return declare(null, {
		/**
		 * Managed map
		 * @type {esri.Map}
		 */
		map: null,
		/**
		 * Offset from top of the map
		 * @type {Number}
		 */
		x: 0,
		/**
		 * Offset from left edge of the map
		 * @type {Number}
		 */
		y: 0,
		constructor: function() {
			lang.mixin(this, arguments[0]);
			var _this = this;
			var _map = this.map;
			var _esriNavBar = new esri.toolbars.Navigation(_map);
			
			var _mapPosition = domGeometry.position(_map.root);
			// Panel container with background image.
			var _navPanel = domConstruct.create('div', {
				style: {
					left: _mapPosition.x + _this.x + 'px',
					top: _mapPosition.y + _this.y + 'px'
				},
				class: 'moc-np'
			}, _map.root.parentNode);
			
			// pan left
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-left',
				title: 'Передвинуть влево',
				onclick: function() {
					_map.panLeft();
				}
			}, _navPanel);
			
			// pan up
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-up',
				title: 'Передвинуть вверх',
				onclick: function() {
					_map.panUp();
				}
			}, _navPanel);

			// pan down
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-down',
				title: 'Передвинуть вниз',
				onclick: function() {
					_map.panDown();
				}
			}, _navPanel);
			
			// pan right
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-right',
				title: 'Передвинуть вправо',
				onclick: function() {
					_map.panRight();
				}
			}, _navPanel);
			
			// full map
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-full-map',
				title: 'Полная карта',
				onclick: function() {
					_esriNavBar.zoomToFullExtent();
				}
			}, _navPanel);
			
			// previous extent
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-back',
				title: 'Назад',
				onclick: function() {
					_esriNavBar.zoomToPrevExtent();
				}
			}, _navPanel);
			
			// next extent
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-forward',
				title: 'Вперед',
				onclick: function() {
					_esriNavBar.zoomToNextExtent();
				}
			}, _navPanel);
			
			// zoom in
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-zoom-in',
				title: 'Приблизить',
				onclick: function() {
					_map.setLevel(_map.getLevel() + 1);
				}
			}, _navPanel);
			
			// zoom out
			domConstruct.create('div', {
				class: 'moc-np-tool moc-np-tool-zoom-out',
				title: 'Отдалить',
				onclick: function() {
					_map.setLevel(_map.getLevel() - 1);
				}
			}, _navPanel);
			
			// slider container
			var _sliderCtr = domConstruct.create('div', {
				class: 'moc-np-slider-ctr'
			}, _navPanel);
		    
	    	var _slider = new VerticalSlider({
	    		minimum: _map.getMinZoom(),
	    		maximum: _map.getMaxZoom(),
				discreteValues: _map.getMaxZoom() + 1,
				value: _map.getZoom(),
				showButtons: false,
				style: {
					height: dojo.isOpera ? '165px' : 'inherit',
					margin: 'auto'
				},
				onChange: function(newValue) {
					_map.setZoom(newValue);
				}
			}, domConstruct.create('div', null, _sliderCtr));
			
			dojo.connect(_map, 'onZoomEnd', function() {
				_slider.set('value', _map.getZoom());
			});
			
			var _pan = domConstruct.create('div', {
				class: 'moc-np-tool-pan',
				onclick: function() {
					_esriNavBar.deactivate();
    				_map.setMapCursor('default');
    				domClass.add(_pan, 'moc-np-tool-pan-selected');
    				domClass.remove(_panZoom, 'moc-np-tool-pan-zoom-selected');
				}
			}, _navPanel);
			
			var _panZoom = domConstruct.create('div', {
				class: 'moc-np-tool-pan-zoom',
				onclick: function() {
		    		_esriNavBar.activate(esri.toolbars.Navigation.ZOOM_IN);
		    		_map.setMapCursor('crosshair');
    				domClass.add(_panZoom, 'moc-np-tool-pan-zoom-selected');
    				domClass.remove(_pan, 'moc-np-tool-pan-selected');
				}
			}, _navPanel);
			
			dojo.connect(_esriNavBar, 'onExtentHistoryChange', function() {
		    	_pan.click();
		    });	
			
			_pan.click();
		}		
	});
});