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
				title: 'Основные операторы',
				layout: 'anchor',
				defaults: {
					anchor: '100%'
				},
				items: [
					Ext.create('Ext.form.CheckboxGroup', {
						columns: 1,
						vertical: true,
						defaults: {
							name: 'operator'
						},
						items: [
							{
								boxLabel: '<div class="moc-operator moc-operator-any"></div>Любой оператор', 
								inputValue: 0, 
								checked: map.getOperatorServices()[0].visible
							}, {
								boxLabel: '<div class="moc-operator moc-operator-yota"></div>Yota', 
								inputValue: 1, 
								checked: map.getOperatorServices()[1].visible
							}, {
								boxLabel: '<div class="moc-operator moc-operator-megafon"></div>Мегафон', 
								inputValue: 2, 
								checked: map.getOperatorServices()[2].visible
							}, {
								boxLabel: '<div class="moc-operator moc-operator-beeline"></div>Вымпелком', 
								inputValue: 3, 
								checked: false,
								disabled: true
							}, {
								boxLabel: '<div class="moc-operator moc-operator-mts"></div>МТС', 
								inputValue: 4, 
								checked: false,
								disabled: true
							}, {
								boxLabel: '<div class="moc-operator moc-operator-rtc"></div>Ростелеком', 
								inputValue: 5, 
								checked: false,
								disabled: true
							}
						],
						listeners: {
							change: function(self, newValue) {
								Ext.each(map.getOperatorServices(), function(service, index) {
									var visibility = false;
									if (typeof newValue.operator !== 'undefined') {
										if (newValue.operator instanceof Array) {
											visibility = newValue.operator.indexOf(index) !== -1;
										} else {
											visibility = newValue.operator === index;
										}
									}
									service.setVisibility(visibility);
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