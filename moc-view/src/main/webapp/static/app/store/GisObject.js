Ext.define('Moc.store.GisObject', {
    extend: 'Ext.data.Store',
    requires: [
    	'Ext.data.proxy.Rest'
    ],
    model: 'Moc.model.GisObject',
    autoSync: true,
    autoLoad: false,
    proxy: Ext.create('Ext.data.proxy.Rest', {
    	url: '',
    	reader: {
    		type: 'json',
    		root: 'list'
    	}
    })
});