// url pour la méthode GET simple
const url = "http://localhost:3000/api/cameras/"

function remplirListeProduits(cameras) {
  // ancre => destination dans le .html
  const myAnchor = document.getElementById('listCamera')
  // ajout de division 
  // une div pour une camera
  // taille variant suivant le format de l'ecran
  for (let index = 0; index < cameras.length; index++){
    let newElement = document.createElement('div')
    newElement.classList.add("col-12")
    newElement.classList.add("col-md-6")
    newElement.classList.add("col-lg-4")
    newElement.classList.add("spacing")
    // ajout de composant à la division tel que l'image, nom et prix
    newElement.innerHTML = "<a href=\"./produit.html?id="+cameras[index]._id+"\" class=\"card\"><img class=\"card-img-top\" src=\""+cameras[index].imageUrl+"\" alt=\"photo de l'appareil photo\" width=\"100%\" height=\"220px\"><div class=\"card-body\"><p class=\"card-title h3 text-center text-dark\">"+cameras[index].name+"</p><p class=\"card-text font-italic text-weight-light text-info text-center\">"+cameras[index].price/100+"€</p></div></div>"
    console.log(cameras[index])
    myAnchor.appendChild(newElement)
  }
}
  
async function fillProducts() {
  await fetch(url) 
    .then((response) => response.json()) 
    .then((cameras) => remplirListeProduits(cameras)) 
  }
  
fillProducts()


