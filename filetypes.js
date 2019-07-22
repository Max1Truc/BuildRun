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

module.exports = {
  python: {
    run: path => {
      return "python " + path
    }
  },
  ruby: { run: template`ruby ${0}` }
}
