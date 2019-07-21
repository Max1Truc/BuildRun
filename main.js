function getCurrentFileExtension() {
  var currentEditor = graviton.getCurrentEditor();
  if (currentEditor != null) {
    var filename = currentEditor.path.split("/").pop(),
        extension = filename.split(".").pop();
    return extension;
  } else {
    return "";
  }
}

function run() {
  var extension = getCurrentFileExtension();
}

const myPluginDropMenu = new dropMenu({
  id:"my_plugin_dm"
});
myPluginDropMenu.setList({
  "button": "My Plugin!",
  "list":{
    "Click me!":{
      click:function(){
        new Notification('Whoah!!','A notification!');
      }
    }
  }
})
