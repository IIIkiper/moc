Ext.define('Moc.gis.Filter', {
	extend: 'Object',
	requires: [
		'Ext.window.Window',
		'Moc.gis.filter.Layer',
		'Moc.gis.filter.Address',
		'Moc.gis.filter.Operator',
		'Moc.gis.filter.Service',
		'Moc.gis.filter.Date'
	],
	/**
	 * Offset from right edge of the map
	 * @type {Number}
	 */
	x: 0,
	/**
	 * Offset from top of the map
	 * @type {Number}
	 */
	y: 0,
	/**
	 * @type {esri.Map}
	 */
	map: null,
	constructor: function() {
		Ext.apply(this, arguments[0]);
		var _this = this;
		var _map = this.map;
		
		var _filterCtr = Ext.get(_map.root.parentNode).createChild({
			style: {
				right: 0,
				top: Ext.get(_map.root).getY() + _this.y + 'px'
			},
			class: 'moc-filter'		
		});
		
		var _classSfxs = ['layer', 'addr', 'oper', 'serv', 'date'];
		
		// Creating tabs
		var _tabs = [];
		for (var i = 0; i < _classSfxs.length; i++) {
			_tabs.push(_filterCtr.createChild({
				class: 'moc-filer-tab moc-filer-tab-' + _classSfxs[i]
			}));
		}
		
		// Creating filter thumbnails
		var _thumbs = [];
		for (var i = 0; i < _tabs.length; i++) {
			var _thumb = _tabs[i].createChild();
			
			_thumb.addListener('click', (function(j) {
				return function() {
					if (_filter.isHidden()) {
						_filter.show();
												
						_filter.animate({
							to: {
								width: _maxWidth,
								x: _filter.x - (_maxWidth - _initWidth),
								opacity: 1
							},
							listeners: {
								afteranimate: function() {
									if (_filter.activeTab !== j) {
										_setActiveFilter(j);
									} else {
										_tabs[j].addCls('moc-filer-tab-' + _classSfxs[j] + '-active');
									}
								}
							}
						});	
					} else { // show window with desired content
						if (_filter.activeTab === j) { // hide window
							_filter.animate({
								to: {
									width: _initWidth,
									x: _filter.x + (_maxWidth - _initWidth),
									opacity: 0
								},
								listeners: {
									afteranimate: function() {
										_tabs[j].removeCls('moc-filer-tab-' + _classSfxs[j] + '-active');
										_filter.hide();
									}
								}
							});							
						} else { // hide current tab and show another one
							_setActiveFilter(j);
						}					
					}
				};
			})(i));

			_thumbs.push(_thumb);
		}
		
		var _setActiveFilter = function(index) {
			var newFilter = null;
			
			_filter.items.each(function(item) {
				if (item.filterIndex === index) {
					newFilter = item;
				}
			});
			
			if (!newFilter) {
				switch(index) {
					case 0: newFilter = Ext.create('Moc.gis.filter.Layer'); break;
					case 1: newFilter = Ext.create('Moc.gis.filter.Address'); break;
					case 2: newFilter = Ext.create('Moc.gis.filter.Operator'); break;
					case 3: newFilter = Ext.create('Moc.gis.filter.Service'); break;
					case 4: newFilter = Ext.create('Moc.gis.filter.Date'); break;
				}
				newFilter.filterIndex = index;
				_filter.add(newFilter);
			}
			
			_filter.getLayout().setActiveItem(newFilter);
			if (_filter.activeTab != null) {
				_tabs[_filter.activeTab].removeCls('moc-filer-tab-' + _classSfxs[_filter.activeTab] + '-active');
			}			
			_filter.activeTab = index;
			_tabs[index].addCls('moc-filer-tab-' + _classSfxs[index] + '-active');
		};
		
		var _initWidth = 10;
		var _maxWidth = 350;
		var _topOffset = 30; // offset above top icon
		var _bottomOffset = 20; // offset below bottom icon
		var _rightOffset = 20; // offset from icons on the right
		
		var _filter = Ext.create('Ext.window.Window', {
			renderTo: _map.root.parentNode,
			width: _initWidth,
			height: _thumbs[4].getBottom() - _thumbs[0].getY() + _topOffset + _bottomOffset,
			x: _thumbs[0].getX() - _initWidth - _rightOffset,
			y: _thumbs[0].getY() - _topOffset,
			modal: false,
			layout: 'card',
			style: {
				opacity: 0 // filter window is invisible by default
			},
			collapsible: false,
			closable: false,
			shadow: false,
			draggable: false,
			resizable: false,
			minWidth: 0,
			/** custom attribute, defines index of current tab */
			activeTab: null
		});
	}
});