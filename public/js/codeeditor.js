let editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  value: "function myScript(){return 100;}",
  mode: "text/x-java",
  theme: "oceanic-next",
  lineNumbers: true,
  autoCloseBrackets: true,
  indentUnit: 0,
  lineWrapping : true
});

editor.setSize(null, 500)
