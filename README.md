Personalización sobre el plugin dropify de jquery para subir archivos en general.
https://joneldiablo.github.io/dropify-file/

parametros default:
```js
  var params={
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
```

usage: `$("input[type=file].selector").dropifyFile(params);`

methods:
 * help
 * getForm
 * setActionForm: string
 * setMethodForm: string
 * setAttrForm: object
 * addSubmitButton
 * removeSubmitButton
 * showSubmitButton
 * hideSubmitButton

ej. `$.dropifyFile().help()`
ej. `$("input[type=file].selector").dropifyFile().setActionForm('/process-file.php');`