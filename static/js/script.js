let xhr = new XMLHttpRequest();
let list_url = 'https://api.github.com/repos/lacgtcosmeva/lacgtcosmeva.github.io/git/trees/master?recursive=1'
let file_url = 'https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/raw/master/'
xhr.open("GET", list_url)
xhr.responseType = 'json';
xhr.send()
xhr.onload = function() {
  ul_list_file("statuts")
  ul_list_file("comptes")
  ul_list_file("tracts")
  ul_list_file("brochures")
};

xhr.onerror = function() {
  alert("Network Error");
  ul_list_file("statuts")
  ul_list_file("comptes")
  ul_list_file("tracts")
  ul_list_file("brochures")
};

function ul_list_file(classname) {
  for (let file=0; file<xhr.response.tree.length; file++) {
    if (RegExp("^documents/"+classname+"/").test(xhr.response.tree[file].path)) {
      console.log("match : "+xhr.response.tree[file].path)
      // let link_shown = xhr.response.tree[file].path
      let link_shown = xhr.response.tree[file].path.replace("documents/"+classname+"/", "")
      let link_href = link_shown.replace(/ /g, "%20")
      document.getElementsByClassName(classname)[0].innerHTML += `<li><a href=${file_url}${link_href}>${link_shown}</a></li>`
    }
  }
}
