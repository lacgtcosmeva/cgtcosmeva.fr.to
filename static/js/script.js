let api_url = 'https://api.github.com/repos/lacgtcosmeva/documents/git/trees/main?recursive=1'
let file_url = 'https://github.com/lacgtcosmeva/documents/raw/main/'

function error() {
  document.getElementById("file-loading").innerHTML = '<a href="https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/tree/main/documents"><br>Network Error. clicker ici pour voir les fichiers</a>'
  alert("connection erreur");
}

let tractsYear = document.getElementById("tracts-year")
function changetracts() {
  if (tractsYear.value < 2015) {
    tractsYear.value = 2015
  } else if (tractsYear > 2021) {
    tractsYear.value = 2020
  }
  document.querySelectorAll(".tracts").forEach(e => {
    e.className += " hidden"
  }) 
  document.querySelector(".tracts"+tractsYear.value).classList.remove("hidden")
}

try {
  fetch(api_url).then(response =>  {
    if(response.ok) {
      response.json().then(data => {
        for (classname of [ "historique", "statuts", "comptes", "tracts", "brochures" ]) {
          for (let file = 0; file < data.tree.length; file++) {
            if (RegExp("^documents/" + classname + "/").test(data.tree[file].path) && data.tree[file].type == "blob") {
              let link_shown = data.tree[file].path
              let link_href = link_shown.replace(/ /g, "%20")
              link_shown = link_shown.replace("documents/" + classname + "/", "")
              if (classname == "tracts") {
                document.getElementsByClassName(classname+data.tree[file].path.split("/")[2])[0].innerHTML  += `<li><a target="_blank" href=${file_url}${link_href}>${link_shown}</a></li>`
              } else {
                document.getElementsByClassName(classname)[0].innerHTML  += `<li><a target="_blank" href=${file_url}${link_href}>${link_shown}</a></li>`
              }
            }
          }
        }
        changetracts()
        document.getElementById("file-loading").innerHTML = ""
      });
    } else {
      error()
    }
  })
  .catch(function(error) {
    error()
  });
} catch(e) { error() }
