let api_url = 'https://api.github.com/repos/lacgtcosmeva/documents/git/trees/main?recursive=1'
let file_url = 'https://github.com/lacgtcosmeva/documents/raw/main/'
fetch(api_url).then(response =>  {
  if(response.ok) {
    response.json().then(data => {
      document.getElementById("file-loading").innerHTML = ""
      for (classname of [ "historique", "statuts", "comptes", "tracts", "brochures" ]) {
        for (let file = 0; file < data.tree.length; file++) {
          if (RegExp("^documents/" + classname + "/").test(data.tree[file].path)) {
            console.log("match : " + data.tree[file].path)
            let link_shown = data.tree[file].path
            let link_href = link_shown.replace(/ /g, "%20")
            link_shown = link_shown.replace("documents/" + classname + "/", "")
            document.getElementsByClassName(classname)[0].innerHTML  += `<li><a target="_blank" href=${file_url}${link_href}>${link_shown}</a></li>`
          }
        }
      }
    });
  } else {
    document.getElementById("file-loading").innerHTML = '<a href="https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/tree/main/documents"><br>Network Error. clicker ici pour voir les fichiers</a>'
    alert("Network Error");
  }
})
  .catch(function(error) {
    document.getElementById("file-loading").innerHTML = '<a href="https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/tree/main/documents"><br>Network Error. clicker ici pour voir les fichiers</a>'
    alert("Network Error : " + error);
  });
