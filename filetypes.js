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

function genBinaryName(path) {
  var binary_name = path
    .split("/")
    .pop()
    .split(".")
  binary_name.pop()
  binary_name = binary_name.join(".")
  return binary_name
}

module.exports = {
  python: { run: template`python ${0}` },
  ruby: { run: template`ruby ${0}` },
  "text/x-csrc": {
    build: path => {
      var binary_name = genBinaryName(path)
      return template`mkdir dist\ngcc ${0} -o ${1}`(path, "dist/" + binary_name)
    }
  },
  "text/x-c++src": {
    build: path => {
      var binary_name = genBinaryName(path)
      return template`mkdir dist\ng++ ${0} -o ${1}`(path, "dist/" + binary_name)
    }
  },
  rust: {
    build: path => {
      var binary_name = genBinaryName(path)
      return template`rustc ${0} -o ${1}`(path, binary_name)
    }
  }
}
