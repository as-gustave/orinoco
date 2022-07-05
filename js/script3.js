const ancre = document.getElementById('remplissage')
let child = document.createElement('tr')
child.classList.add('tableTh')

child.innerHTML = '<th>Article</th><th>Taille</th><th>Prix Unitaire</th><th>Quantié</th><th>Prix total</th>'
ancre.appendChild(child)

let panier = JSON.parse(localStorage.getItem('articlePanier'))
let listPropriete = Object.keys(panier)
let prixTotal = 0

if(localStorage.getItem('articlePanier')){
    for( let indexCamera = 0 ; indexCamera < listPropriete.length; indexCamera++){
        fetch('http://localhost:3000/api/cameras/'+listPropriete[indexCamera])
        .then(function(res){
            if (res.ok){
                return res.json();
            }
        })
        .then(function(value){
            for ( let indiceLentille = 0 ; indiceLentille < panier[listPropriete[indexCamera]].length ; indiceLentille++ ){
                let lineProduit = document.createElement('tr')
                lineProduit.classList.add('tableTd')
                    
                let lentille = panier[listPropriete[indexCamera]][indiceLentille]
                prixTotal = prixTotal + lentille.quantite * value.price/100

                lineProduit.innerHTML = '<th>'+value.name+'</th>    <th>'+lentille.lense+'</th>   <th>'+value.price/100+' €</th>  <th>'+lentille.quantite+'</th>    <th>'+lentille.quantite*value.price/100+' €</th>'
                ancre.appendChild(lineProduit)

                let ancrePrix = document.getElementById('ancrePrix')
                ancrePrix.textContent ='Coût total : '+ prixTotal + ' €'
                localStorage.setItem('prix commande', prixTotal)
                ancrePrix.classList.add('text-right')
                ancrePrix.classList.add('mt-4')
                ancrePrix.classList.add('bg-dark')
                ancrePrix.classList.add('text-light')
                ancrePrix.classList.add('font-weight-light')
                ancrePrix.classList.add('font-italic')                    
            }
        })
        .catch(function(err){
            console.log('erreur')
        })
    }
}
else{
    alert('Le panier est vide')
}