// recuperation des valeurs du formulaire
document.getElementById('validation').addEventListener('click', function(){
    let prenom = document.getElementById('prenom').value
    let nom =  document.getElementById('nom').value
    let email = document.getElementById('mail').value
    let adresse = document.getElementById('adresse').value
    let ville = document.getElementById('ville').value

    // requete POST pour recuperer le numero de commande
    fetch('http://localhost:3000/api/cameras/order',{
        method : "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            contact : {
                firstName : prenom,
                lastName : nom,
                address : adresse,
                city : ville,
                email : email
            },
            products : listPropriete
        })
    }) 
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(value){
        localStorage.setItem('numero de commande', value['orderId'])
    })
    .catch(function(err){
        console.log('erreur')
    })
})
