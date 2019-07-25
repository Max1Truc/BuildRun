var fs = require("fs")

const FILE_COMMANDS = require("./filetypes.js")
const PROJECT_COMMANDS = require("./projectTypes.js")

function getCommand(command_type) {
  var rootDir = graviton.getCurrentDirectory(),
    command = ""

  if (rootDir) {
    // We're probably inside a project directory
    var rootFiles = fs.readdirSync(rootDir).concat("bin")

    PROJECT_COMMANDS.forEach(projectType => {
      rootFiles.forEach(file => {
        if (
          projectType.files.indexOf(file) != -1 &&
          projectType[command_type]
        ) {
          command = projectType[command_type](rootDir)
        }
      })
    })
  }

  if (!command) {
    var currentMode = graviton.getCurrentEditor().editor.options.mode,
      filepath = graviton.getCurrentFile().path

    if (FILE_COMMANDS[currentMode] && FILE_COMMANDS[currentMode][command_type])
      command = FILE_COMMANDS[currentMode][command_type](filepath)
  }

  return command
}

function exec(command) {
  window.setTimeout(() => {
    current_screen.terminal.xterm.emit(
      "data",
      (command || "echo I cannot do that with your project / file") + "\n"
    )
  }, 100)
}

function resetTerminal() {
  var path =
    graviton.getCurrentDirectory() || graviton.getCurrentFile().path + "/.."
  commanders.closeTerminal()
  commanders.terminal({ path })
}

function run() {
  var command = getCommand("run")
  exec(command)
}

function build() {
  var command = getCommand("build")
  exec(command)
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
        build()
      }
    }
  }
})
