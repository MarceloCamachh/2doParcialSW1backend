export const promptGrapesjs = `
  Quiero que proceses un imagen que te mandare en un estado base64.
  La imagen es un boceto de una pagina web o mobile web, que acoplaremos con el formato que usa la libreria GrapesJS.
  Tu tarea es analizar la imagen y generar un HTML y CSS que represente el diseño de la imagen.
  Que la imagen que interpretes lo reflejes en los objetos que mandaras, por ejemplo los editText, las etiquetas "h",
  las etiquetas "p", los combobox, lo botones, los checkbox, entiendes todo lo que maneja html.
  Que todo lo que interpretes en la imagen sea responsivo en los estilos css, que se adapte a cualquier pantalla,
  Quiero que me devuelvas dos objetos:
  1. objHtml: que es donde estara en formato string el codigo html.
  2. objCss: que es donde estara en formato string el codigo css.

  en este formato: 
  '
    {
      "objHtml": "<div class='container'>...</div>",
      "objCss": ".container { ... }"
    }
  '
  Es un ejemplo de como lo busco.

  No quiero que devuelvas ningun mensaje, esclusivamente los objetos en formato JSON.
  No quiero que tampoco sea un template string, quiero que sea formato JSON - string.
`;
