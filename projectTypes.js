var fs = require("fs")

// To make template strings
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
function template(strings, ...keys) {
  return function(...values) {
    var dict = values[values.length - 1] || {}
    var result = [strings[0]]
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key]
      result.push(value, strings[i + 1])
    })
    return result.join("")
  }
}

function getFileExtension(path) {
  return path
    .split("/")
    .pop()
    .split(".")
    .pop()
    .toLowerCase()
}

function isExecutable(path) {
  if (graviton.currentOS().name == "Windows") {
    if (getFileExtension(path) == "exe") return true
  } else {
    try {
      fs.accessSync(path, fs.constants.X_OK)
      return true
    } catch (err) {}
  }
  return false
}

function searchExecutables(directory) {
  var executables = []

  try {
    var files = fs.readdirSync(directory)
    files.forEach(element => {
      if (isExecutable(directory + "/" + element)) {
        executables.push(element)
      }
    })
  } catch (err) {}

  return executables
}

function searchBuild(projectDir) {
  var bin_dirs = [
      ".",
      "bin",
      "dist",
      "dist/Release",
      "dist/release",
      "dist/Debug",
      "dist/debug",
      "target/debug",
      "target/release"
    ],
    binaries = []

  bin_dirs.forEach(dir => {
    dir = projectDir + "/" + dir
    binaries = binaries.concat(searchExecutables(dir))
    console.log(binaries)
  })

  return binaries[0] || ""
}

module.exports = [
  {
    name: "Make",
    files: ["Makefile"],
    build: template`make clean\nmake`
  },
  {
    name: "Binary release project",
    files: ["Makefile", "dist", "bin", "target"],
    run: path => {
      var binary = searchBuild(path) || ""
      return graviton.currentOS().name == "Windows" || !binary
        ? binary
        : "./" + binary
    }
  },
  {
    name: "Node Module",
    files: ["package.json"],
    build: template`npm run build`,
    run: template`npm start`
  },
  {
    name: "Rust",
    files: ["Cargo.toml"],
    build: template`cargo build`,
    run: template`cargo run`
  }
]
