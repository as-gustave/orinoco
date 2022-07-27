const url = "http://localhost:3000/api/cameras/"

// recupere l'url 
const urlVar = window.location.search;

// recupere les variables
const urlParams = new URLSearchParams(urlVar)

// reecupere la variable id
const idLien = urlParams.get('id')
console.log(idLien) 


let choixCamera
let i = 0;

function remplirFicheCamera(cameras) {
  // recherche de la camera selectionné
    while(idLien != cameras[i]._id){
      i++
    }
    // stocke la camera dans une variable 
    choixCamera = cameras[i]
    // ajout de la photo de la camera au dom
    const myAnchor1 = document.getElementById('photoCamera')
    myAnchor1.innerHTML = '<a href=\"'+choixCamera.imageUrl+'\"><img src=\"'+choixCamera.imageUrl+'" alt=\"photo de la Camera\" width="100%" height="100%"></a><p class=\"text-center text-info font-italic font-weight-light\">agrandir</p>'

    // ajout du nom de la camera au dom
    const myAnchor2 = document.getElementById('nomCamera')
    myAnchor2.textContent = choixCamera.name

    // ajoutde la description de la camera au dom
    const myAnchor3 = document.getElementById('descriptionCamera')
    myAnchor3.textContent = choixCamera.description

    // ajout du prix de la camera au dom
    const myAnchor4 = document.getElementById('prixCamera')
    myAnchor4.textContent = 'PRIX : '+choixCamera.price/100+'€'

    // ajout des lentilles de la camera dans une liste puis au dom
    const myAnchor5 = document.getElementById('lense')
  
    for(let nm = 0 ; nm < choixCamera.lenses.length ; nm ++){
      let newElem = document.createElement('option')
      newElem.value = choixCamera.lenses[nm]
      newElem.innerText = choixCamera.lenses[nm]
      myAnchor5.appendChild(newElem)
    }
}
async function fillProducts() {
  await fetch(url) 
    .then((response) => response.json()) 
    .then((cameras) => remplirFicheCamera(cameras)) 
}
    
fillProducts()

// fonction qui teste la presence de l'identifiant d'une camera dans le panier
// identifiant = propriete de l'objet panier

function idInCart ( objet, idADetecter ){
  if (objet[idADetecter]){
    console.log('je suis déja la ( id ) ')
    return true
  }
  else{
    console.log('je suis pas encore la ( id )')
    return false
  }
}

// fonction qui teste la presence d'une lentille dans le panier
function LenseInCart ( tableau, lenseADetecter){
  for ( let i = 0 ; i < tableau.length ; i++ ){
    if ( tableau[i].lense == lenseADetecter ){
      tableau[i].quantite++
      console.log('je suis déja la ( lentille )')
      return true
    }
  }
  console.log('j\'etais pas encore la ( lentille )')
  return false
}

const monAncrePanier = document.getElementById('panier')
monAncrePanier.addEventListener('click', function(){
  let mesProduits={}

  // si il y a deja quelque dans le local storage on recupere le panier
  if(localStorage.getItem('articlePanier')){
    mesProduits = JSON.parse(localStorage.getItem('articlePanier'))
  }
  addToCart(mesProduits,choixCamera);
})

function addToCart(panier,produit){ 
  // stocke l'id de la camera et la lentille 
  let idAjouter = produit._id                  
  lenseAjouter = document.getElementById('lense').value

  // 3 CAS POSSIBLE

  // LA CAMERA ET LA LENTILLE SONT DANS LE PANIER MAIS PAS 
  // LA CAMERA EST DANS LE PANIER MAIS PAS LA LENTILLE
  // LA CAMERA N'EST PAS DANS LE PANIER
  if(idInCart(panier,idAjouter)){
    if(LenseInCart(panier[idAjouter],lenseAjouter)){
      localStorage.setItem('articlePanier', JSON.stringify(panier))
    }
    else{
    panier[idAjouter].push({lense : lenseAjouter, quantite : 1})
    localStorage.setItem('articlePanier', JSON.stringify(panier))
    }
  }
  else{
    let nvlCamera = { name : idAjouter, value : [{ lense : lenseAjouter, quantite : 1 }]}
    panier[nvlCamera.name] = nvlCamera.value
    localStorage.setItem('articlePanier', JSON.stringify(panier))
  }
  console.log(panier)

  /*
  2eme possibilités
  else {
    lenseAAjouter = document.getElementById('lense').value
    idAAjouter = produit._id;
    Object.defineProperty(mesProduits, [idAAjouter], {
      value : [{lense : lenseAAjouter, quantite : 1}],
      writable : false, 
      enumerable : true,
      configurable : false
    }) 
  }*/
}

