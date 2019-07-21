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
