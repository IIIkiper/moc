Ext.define('Moc.view.gisobject.Filter', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Moc.gis.filter.Layer',
		'Moc.gis.filter.Address',
		'Moc.gis.filter.Operator',
		'Moc.gis.filter.Service',
		'Moc.gis.filter.Date',
		'Ext.toolbar.Toolbar',
		'Ext.button.Button'
	],
	region: 'west',
	layout: 'accordion',
	collapsible: true,
	split: true,
	width: 400,
	minWidth: 400,
	maxWidth: 600,
	title: 'Фильтер',
	initComponent: function() {
		this.tbar = Ext.create('Ext.toolbar.Toolbar', {
			items: [
				Ext.create('Ext.button.Button', {
					text: 'Найти',
					handler: function() { }
				}),
				Ext.create('Ext.button.Button', {
					text: 'Сбросить',
					handler: function() { }
				})				
			]
		});		
		
		var _layer = Ext.create('Moc.gis.filter.Layer');
		var _address = Ext.create('Moc.gis.filter.Address');
		var _operator = Ext.create('Moc.gis.filter.Operator');
		var _service = Ext.create('Moc.gis.filter.Service');
		var _date = Ext.create('Moc.gis.filter.Date');
		
		this.items = [_layer, _address, _operator, _service, _date];
		
		this.callParent(arguments);	
	}
});