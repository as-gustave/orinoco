if( localStorage.getItem('articlePanier')){
    const ancreMess = document.getElementById('messageRemerciement')
    const mess = document.createElement('div')
    mess.classList.add('col')
    mess.innerHTML = '<p class="text-center text-success">Détail de la commande : <br /> Identifiant de votre commande : <span id="numeroCommande"></span>&nbsp; Prix de votre commande : <span id="prixCommande"></span> </p>'
    ancreMess.appendChild(mess)
    
    const ancreMess2 = document.getElementById('messageRemerciement2')
    let mess2 = document.createElement('div')
    mess2.classList.add('col')
    mess2.innerHTML = '<p class="text-center text-success mt-4">En vous remerciant de votre commande. Nous espérons que votre commande sur le site Orinoco vous à plu !<br />A la prochaine sur notre site <a href="./index.html">Orinoco.com</a></p>'
    ancreMess2.appendChild(mess2)
    
    document.getElementById('numeroCommande').textContent = localStorage.getItem('numero de commande')
    
    document.getElementById('prixCommande').textContent = localStorage.getItem('prix commande') + ' €'
    
    localStorage.removeItem('prix commande')
    localStorage.removeItem('numero de commande')
    localStorage.removeItem('articlePanier')
}

else{
    const ancreMess = document.getElementById('messageRemerciement')
    const mess = document.createElement('div')
    mess.classList.add('col')
    mess.innerHTML = '<p class="text-center text-success">Votre commande a déja été validé. Nous vous souhaitons une bonne réception de votre commande</p>'
    ancreMess.appendChild(mess)
    
    const ancreMess2 = document.getElementById('messageRemerciement2')
    let mess2 = document.createElement('div')
    mess2.classList.add('col')
    mess2.innerHTML = '<p class="text-center text-success mt-4">A très bientot sur notre site <a href="./index.html">Orinoco.com</a></p>'
    ancreMess2.appendChild(mess2)

    setTimeout(function(){
        window.location = 'index.html'
    }, 6000)
    
    
}

