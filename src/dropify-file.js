(function ($, window, document, undefined) {

	"use strict";

	// Create the defaults once
	var pluginName = "dropifyFile",
		defaults = {
			height: 60,
			showRemove: false,
			allowedFileExtensions: ["xlsx", "xls"],
			showErrors: false,
			dropify: {
				tpl: {
					wrap: '<div class="dropify-wrapper card-box dropify-file touch-fallback"></div>',
					message: '<div class="dropify-message"><p>{{ default }}<span class="file-icon" /></p></div>',
					preview: '<div class="dropify-preview"><span class="dropify-render pull-left"></span><div class="dropify-infos pull-left"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>'
				},
				messages: {
					'default': 'Arrastra y suelta o da clic aquí para agregar',
					'replace': 'Arrastra y suelta o da clic aquí para reemplazar',
					'remove': 'Remover',
					'error': ''
				},
				error: {
					'fileExtension': 'Formato de archivo no permitido ({{ value }} únicamente).'
				}
			},
			useForm: true,
			formBtnText: "Leer archivo",
			form: {
				action: "#",
				method: "post"
			}
		};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;

		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	function camelCase(string) {
		return string.replace(/-([a-z])/ig, function (all, letter) {
			return letter.toUpperCase();
		});
	}

	function mimeTypes(ext) {
		switch (ext) {
			case "xls":
				return "application/vnd.ms-excel";
			case "xlsx":
				return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
			case "doc":
				return "application/msword";
			case "docx":
				return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
			case "ppt":
				return "application/vnd.ms-powerpoint";
			case "pptx":
				return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
			default:
				return "text/plain";
		}
	}
	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			var plugin = this;
			var $elem = $(this.element);
			$elem.attr("data-height", this.settings.height);
			$elem.attr("data-show-remove", this.settings.showRemove);
			$elem.attr("data-allowed-file-extensions", this.settings.allowedFileExtensions.join(" "));
			$elem.attr("accept", $.map(this.settings.allowedFileExtensions, function (str, i) {
				return mimeTypes(str);
			}).join(", "));
			var dr = $elem.dropify(this.settings.dropify);

			if (this.settings.useForm) {
				plugin.addSubmitButton();
				plugin.hideSubmitButton();

				$elem.on("change", function () {
					if ($(this).val() !== "") {
						plugin.showSubmitButton();
					} else {
						plugin.hideSubmitButton();
					}
				});
				dr.on('dropify.errors', function (event, element) {
					plugin.hideSubmitButton();
				});
			}
		},
		help: function () {
			var funcs = $.map(this, function (elem, i) {
				if (typeof elem == "function") {
					return i;
				}
			});
			console.log("defaults");
			console.log(defaults);
			console.log("métodos disponibles");
			console.log(funcs);
			console.log("------------");
			return [JSON.stringify(defaults), JSON.stringify(funcs)];
		},
		getForm: function () {
			return this.$form;
		},
		setActionForm: function (action) {
			this.$form.attr("action", action);
		},
		setMethodForm: function (action) {
			this.$form.attr("method", action);
		},
		setAttrForm: function (attrs) {
			this.$form.attr(attrs);
		},
		addSubmitButton: function () {
			var $form = $("<form>", this.settings.form);
			var $btn = $("<button>", {
				"class": "btn btn-primary pull-left submit-btn",
				type: "submit"
			}).text(this.settings.formBtnText);
			var $elem = $(this.element);
			$elem.closest(".dropify-wrapper.dropify-file").append($form.append($btn));
			$form.append($elem);
			this.$form = $form;
			return $elem;
		},
		removeSubmitButton: function () {
			$(this.element).closest(".dropify-wrapper.dropify-file").find("form").remove();
		},
		showSubmitButton: function () {
			this.$form.find("button[type=submit]").css("display", "");
		},
		hideSubmitButton: function () {
			this.$form.find("button[type=submit]").hide();
		}
	});

	// preventing against multiple instantiations,
	// allowing set an action to do at the initialization
	$.fn[pluginName] = function (action, options) {
		var toReturn;
		if (typeof action !== "string") {
			options = action;
			toReturn = this.each(function (i, elem) {
				if (!$.data(elem, "plugin_" + pluginName)) {
					$.data(elem, "plugin_" +
						pluginName, new Plugin(elem, options));
				}
			});
		} else {
			toReturn = this.map(function (i, elem) {
				var plugin = $.data(elem, "plugin_" + pluginName);
				var tR;
				if (!plugin) {
					plugin = new Plugin(elem, options);
					$.data(elem, "plugin_" + pluginName, plugin);
				}
				if (typeof plugin[camelCase(action)] === "function") {
					tR = plugin[camelCase(action)](options);
				}
				return tR;
			}).get();
			switch (toReturn.length) {
				case 0:
					toReturn = null;
					break;
				case 1:
					toReturn = toReturn[0];
					break;
				default:
			}
		}
		return toReturn;
	};

})(jQuery, window, document);
