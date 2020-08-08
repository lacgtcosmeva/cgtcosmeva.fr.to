let xhr = new XMLHttpRequest();
let list_url = 'https://api.github.com/repos/lacgtcosmeva/lacgtcosmeva.github.io/git/trees/master?recursive=1'
let file_url = 'https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/raw/master/'
xhr.open("GET", list_url)
xhr.responseType = 'json';
xhr.send()
xhr.onload = function() {
  document.getElementById("file-loading").innerHTML = ""
  ul_list_file("statuts")
  ul_list_file("comptes")
  ul_list_file("tracts")
  ul_list_file("brochures")
};

xhr.onerror = function() {
  document.getElementById("file-loading").innerHTML = '<a href="https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/tree/master/documents"><br>Network Error. clicker ici pour voir les fichiers</a>'
  alert("Network Error");
  ul_list_file("statuts")
  ul_list_file("comptes")
  ul_list_file("tracts")
  ul_list_file("brochures")
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    document.getElementById("file-loading").textContent = `Chargement des fichiers... ${event.loaded} sur ${event.total} bytes`
  } else {
    document.getElementById("file-loading").textContent = `Chargement des fichiers... ${event.loaded} bytes`
  }

};

function ul_list_file(classname) {
  for (let file=0; file<xhr.response.tree.length; file++) {
    if (RegExp("^documents/"+classname+"/").test(xhr.response.tree[file].path)) {
      console.log("match : "+xhr.response.tree[file].path)
      // let link_shown = xhr.response.tree[file].path
      let link_shown = xhr.response.tree[file].path
      let link_href = link_shown.replace(/ /g, "%20")
      link_shown = link_shown.replace("documents/"+classname+"/", "")
      document.getElementsByClassName(classname)[0].innerHTML += `<li><a href=${file_url}${link_href}>${link_shown}</a></li>`
    }
  }
}
