const url = "http://localhost:3000/api/cameras/"

const urlVar = window.location.search;

// ?var1=valeu1&var2=value2

const urlParams = new URLSearchParams(urlVar)
const idLien = urlParams.get('id')

let choixCamera
let i = 0;

function remplirFicheCamera(cameras) {
    while(idLien != cameras[i]._id){
      i++
    }
    choixCamera = cameras[i]
    const myAnchor1 = document.getElementById('photoCamera')
    myAnchor1.innerHTML = '<a href=\"'+choixCamera.imageUrl+'\"><img src=\"'+choixCamera.imageUrl+'" alt=\"photo de la Camera\" width="100%" height="100%"></a><p class=\"text-center text-info font-italic font-weight-light\">Cliquez sur l\'image pour l\'agrandir</p>'

    const myAnchor2 = document.getElementById('nomCamera')
    myAnchor2.textContent = choixCamera.name

    const myAnchor3 = document.getElementById('descriptionCamera')
    myAnchor3.textContent = choixCamera.description

    const myAnchor4 = document.getElementById('prixCamera')
    myAnchor4.textContent = 'PRIX : '+choixCamera.price/100+'€'

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

function idInCart ( objet, idADetecter ){
  if (objet[idADetecter]){
    return true
  }
  else{
    return false
  }
}

function LenseInCart ( tableau, lenseADetecter){
  for ( let i = 0 ; i < tableau.length ; i++ ){
    if ( tableau[i].lense == lenseADetecter ){
      tableau[i].quantite++
      return true
    }
  }
  return false
}

const monAncrePanier = document.getElementById('panier')
monAncrePanier.addEventListener('click', function(){
  let mesProduits={}
  if(localStorage.getItem('articlePanier')){
    mesProduits = JSON.parse(localStorage.getItem('articlePanier'))
  }
  addToCart(mesProduits,choixCamera);
})

function addToCart(panier,produit){ 
  let idAjouter = produit._id                  
  lenseAjouter = document.getElementById('lense').value

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

