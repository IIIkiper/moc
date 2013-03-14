Ext.define('Moc.view.gisobject.Grid', {
	extend: 'Ext.grid.Panel',
	requires: [
		'Moc.store.GisObject'
	],
	region: 'center',
	columns: [
		{header: 'Название', dataIndex: 'name', flex: 1},
		{header: 'Широта', dataIndex: 'longitude', flex: 1},
		{header: 'Долгота', dataIndex: 'latitude', flex: 1}
	],
	store: Ext.create('Moc.store.GisObject'),
	initComponent: function() {
				
		this.callParent(arguments);
	}
});