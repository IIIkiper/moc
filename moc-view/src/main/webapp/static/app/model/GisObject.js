Ext.define('CS.model.GisObject', {
	extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', useNull: true},
        {name: 'name', type: 'string'},
        {name: 'longitude', type: 'string'},
        {name: 'latitude', type: 'string'}
	],
	idProperty: 'id'
});