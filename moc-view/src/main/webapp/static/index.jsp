<%@page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
	<head>
		<title>Супер карта</title>
		<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">		
		<style type="text/css">
			@import url(${pageContext.servletContext.contextPath}/static/css/moc.css);
			@import url(/extjs4/resources/css/ext-all.css);
			@import url(http://serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/esri/css/esri.css);
			@import url(http://serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/dojo/dijit/themes/claro/claro.css);			
		</style>
		<script type="text/javascript">		
			var dojoConfig = {
				async: true,
				packages: [
					{name: 'moc', location: '${pageContext.servletContext.contextPath}/static/app'}
				],
				cacheBust: true,
				deps: [
 					'moc/gis/Map',
 					'moc/gis/NavigationPanel',
 					'dojo/ready'
				],
				callback: function(Map, NavigationPanel, ready) {
					ready(function() {
						map = new Map('moc-map-container', {
							showAttribution: false,
							slider: false,
							logo: false
						});
												
						new NavigationPanel({map: map, x: 20, y: 100});
						
						Ext.Loader.setConfig({
							enabled: true,
							disableCaching: true,
							paths: {
								Ext: '/extjs4/src',
								Moc: '${pageContext.servletContext.contextPath}/static/app'
							}
						});
						
						if (Ext.isOpera) {
							Ext.resetElement = Ext.getBody();
						}
						
						Ext.require(['Moc.gis.Filter', 'Moc.view.gisobject.Panel']);
						Ext.create('Moc.gis.Filter', {map: map, x: 0, y: 90});
						Ext.create('Moc.view.gisobject.Panel', {renderTo: 'moc-table-container'});
					});
				}
			};		
		</script>
		<script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/3.3/"></script>
		<script type="text/javascript" src="/extjs4/ext-all.js"></script>
	</head>
	<body class="claro">	
		<input name="moc-folder" type="radio" id="moc-folder-1" checked="checked"/>
		<label for="moc-folder-1"></label>
		<input name="moc-folder" type="radio" id="moc-folder-2"/>
		<label for="moc-folder-2"></label>
<!-- 		<input name="moc-folder" type="radio" id="moc-folder-3"/> -->
<!-- 		<label for="moc-folder-3">????</label> -->
		
		<div class="moc-header">
			<div></div>
			<div></div>
			<div></div>
		</div>
		
		<div id="moc-map-container"></div>
		<div id="moc-table-container"></div>
		<div></div>
	</body>
</html>