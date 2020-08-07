let xhr = new XMLHttpRequest();
let list_url = 'https://api.github.com/repos/lacgtcosmeva/lacgtcosmeva.github.io/git/trees/master?recursive=1'
let file_url = 'https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/raw/master/'
xhr.open("GET", list_url)
xhr.responseType = 'json';
xhr.send()
function list_file(regex, classname) {
  for (let file=0; file<xhr.response.tree.length; file++) {
    if (RegExp(regex).test(xhr.response.tree[file].path)) {
      console.log("match : "+xhr.response.tree[file].path)
    let link_shown = xhr.response.tree[file].path
    let link_href = link_shown.replace(/ /g, "%20")
    document.getElementsByClassName("list "+classname).innerHTML += `<li><a id="href-list" href=${file_url}${link_href}>${link_shown}</a></li>`
    }
    else {
      console.log("don't match : "+xhr.response.tree[file].path)
    }
  };
}

function clearid(elementid) {
  document.getElementById(elementid).innerHTML = ""
}
