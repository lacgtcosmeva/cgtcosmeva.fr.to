let api_url = 'https://api.github.com/repos/lacgtcosmeva/documents/git/trees/main?recursive=1'
let file_url = 'https://github.com/lacgtcosmeva/documents/raw/main/'

function error() {
	document.getElementById("file-loading").innerHTML = '<a href="https://github.com/lacgtcosmeva/lacgtcosmeva.github.io/tree/main/documents"><br>Network Error. clicker ici pour voir les fichiers</a>'
}

let tractsYear = document.getElementById("tracts-year")
let content = document.querySelector('.card > .tractslist.list-content')
const currentYear = new Date().getFullYear()
tractsYear.value = 2014
while (tractsYear.value <= currentYear) {
	content.innerHTML += `<ul class="list-content tracts tracts${tractsYear.value}"></ul>`
	tractsYear.valueAsNumber++
}
tractsYear.max = currentYear
tractsYear.value = currentYear
function changetracts() {
	if (tractsYear.value < tractsYear.min) {
		tractsYear.value = tractsYear.min
	} else if (tractsYear.value > currentYear) {
		tractsYear.value = currentYear
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
