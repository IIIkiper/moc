Ext.define('Moc.gis.filter.Operator', {
	extend: 'Ext.panel.Panel',
	title: 'Операторы',
	layout: 'form',
	border: false,
	bodyStyle: {
		padding: '5px'
	},
	initComponent: function() {
		
		this.items = [
			Ext.create('Ext.form.FieldSet', {
				title: 'Выберите оператора',
				layout: 'anchor',
				defaults: {
					anchor: '100%'
				},
				items: [
					Ext.create('Ext.form.RadioGroup', {
						columns: 1,
						vertical: true,
						items: [
							{boxLabel: 'Любой оператор', name: 'operator', inputValue: 0, checked: map.getOperatorServices()[0].visible},
							{boxLabel: 'Только Yota', name: 'operator', inputValue: 1, checked: map.getOperatorServices()[1].visible},
							{boxLabel: 'Только Мегафон', name: 'operator', inputValue: 2, checked: map.getOperatorServices()[2].visible}
						],
						listeners: {
							change: function(self, newValue) {
								Ext.each(map.getOperatorServices(), function(service, index) {
									service.setVisibility(newValue.operator === index);
								});
							}
						}
					})
				]
			})
		];
				
		this.callParent();
	}
});