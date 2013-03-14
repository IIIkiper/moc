Ext.define('Moc.view.gisobject.Panel', {
	extend: 'Ext.container.Container',
	requires: [
		'Moc.view.gisobject.Filter',
		'Moc.view.gisobject.Grid'
	],
	layout: 'border',
	initComponent: function() {
		
		this.height = Ext.get(this.renderTo).getHeight();
		
		var _filter = Ext.create('Moc.view.gisobject.Filter');
		var _grid = Ext.create('Moc.view.gisobject.Grid');
		
		this.items = [_filter, _grid];
		
		this.callParent(arguments);
	}
});