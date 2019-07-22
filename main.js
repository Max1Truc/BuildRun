const COMMANDS = require("./filetypes.js")

function getRunCommand() {
  var currentMode = graviton.getCurrentEditor().editor.options.mode,
    filepath = graviton.getCurrentFile().path,
    command = ""

  if (COMMANDS[currentMode] && COMMANDS[currentMode].run)
    command = COMMANDS[currentMode].run(filepath)

  return command
}

function getBuildCommand() {
  var currentMode = graviton.getCurrentEditor().editor.options.mode,
    filepath = graviton.getCurrentFile().path,
    command = ""

  if (COMMANDS[currentMode] && COMMANDS[currentMode].build)
    command = COMMANDS[currentMode].build(filepath)

  return command
}

function exec(command) {
  window.setTimeout(() => {
    current_screen.terminal.xterm.emit(
      "data",
      (command || "echo && echo File format not supported") + "\n"
    )
  }, 100)
}

function resetTerminal() {
  commanders.closeTerminal()
  commanders.terminal()
}

function run() {
  var command = getRunCommand()
  exec(command)
}

function compile() {
  // Compile
}

const BuildRunDropMenu = new dropMenu({
  id: "build_run_dm"
})

BuildRunDropMenu.setList({
  button: "🔨",
  list: {
    Run: {
      click: function() {
        resetTerminal()
        run()
      }
    },
    Build: {
      click: function() {
        resetTerminal()
        compile()
      }
    }
  }
})
