const FILE_TYPES = require("./filetypes.js");

function getCurrentFileInfo() {
  var currentEditor = graviton.getCurrentEditor();
  if (currentEditor != null) {
    var name = currentEditor.path.split("/").pop(),
        extension = name.split(".").pop(),
        type = "",
        command = "";
    
    for (i in FILE_TYPES) {
      if (FILE_TYPES[i].ext == extension) {
        type = FILE_TYPES[i].name;
        if (FILE_TYPES[i].command != undefined)
          command = FILE_TYPES[i].command(currentEditor.path);
        break;
      }
    }
    
    return {name, extension, type, command};
  } else {
    return "";
  }
}

function exec(command) {
  current_screen.terminal.xterm.emit("data", command + "\n");
}

function resetTerminal() {
  commanders.closeTerminal();
  commanders.terminal();
}

function run() {
  var file = getCurrentFileInfo();
  exec(file.command);
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
    }, "Compile": {
      click: function(){
        resetTerminal();
        compile();
      }
    }
  }
});