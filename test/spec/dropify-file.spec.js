( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.module( "dropify-file", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {

		assert.equal( typeof $.fn.dropify-file, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.dropify-file, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.dropify-file().on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.dropify-file();
		assert.ok(
			$fixture.data( "plugin_dropify-file" ),
			"has cached it into a jQuery data"
		);
	} );

	QUnit.test( "enable custom config", function( assert ) {
		$fixture.dropify-file( {
			foo: "bar"
		} );

		var pluginData = $fixture.data( "plugin_dropify-file" );

		assert.deepEqual(
			pluginData.settings,
			{
				propertyName: "value",
				foo: "bar"
			},
			"extend plugin settings"
		);

	} );

	QUnit.test( "changes the element text", function( assert ) {
		$fixture.dropify-file();

		assert.equal( $fixture.text(), "hola mundo" );
	} );

	QUnit.test(
		"has #helloW working as expected",
		function( assert ) {
			$fixture.dropify-file();

			var instance = $fixture.data( "plugin_dropify-file" ),
				expectedText = "foobar";

			instance.helloW( expectedText );
			assert.equal( $fixture.text(), expectedText );
		}
	);

}( jQuery, QUnit ) );
