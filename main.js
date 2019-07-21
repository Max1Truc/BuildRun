function getCurrentFile() {
  var currentEditor = graviton.getCurrentEditor();
  if (currentEditor != null) {
    var name = currentEditor.path.split("/").pop(),
        extension = name.split(".").pop();
    return {name, extension};
  } else {
    return "";
  }
}

function exec(command) {
  current_screen.terminal.xterm.emit("data", command + "\n");
}

function resetTerminal() {
  commanders.terminal();
  current_screen.terminal.xterm.clear()
}

function run() {
  var file = getCurrentFile();

  if (file.extension == "rb") {
    exec("ruby " + file.name)
  }
}

const CompileRunDropMenu = new dropMenu({
  id:"compile_run_dm"
});

CompileRunDropMenu.setList({
  "button": "🔨",
  "list": {
    "Run": {
      click: function(){
        resetTerminal();
        run();
      }
    }
  }
})
