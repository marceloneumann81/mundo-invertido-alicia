
import { getHellfireClubSubscription, subscribeToHellfireClub } from './firebase/hellfire-club.js';


const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtLevel = document.getElementById('txtLevel');
const txtCharacter = document.getElementById('txtCharacter');
const btnSubscribe = document.getElementById('btnSubscribe');
const subscriptionsList = document.getElementById('subscriptions');


const labelName = document.getElementById('labelName');
const labelEmail = document.getElementById('labelEmail');
const labelLevel = document.getElementById('labelWhats');
const labelCharacter = document.getElementById('labelCharacter');


const messageError = document.getElementById('messageError');
const messageSuccess = document.getElementById('messageSuccess');



txtName.addEventListener('keyup', function() {
    if ( txtName.value.length <= 2 && txtName.value.length > 0) {
        labelName.style.color = 'red';
    }
    else {
        labelName.style.color = '';
    }
    
    
    
})


// VALIDACAO CAMPO E-MAIL
txtEmail.addEventListener('blur', function(){
    const exp = /\S+@\S+\.\S+/
    if ( txtEmail.value.length > 0 && !exp.test(txtEmail.value)) {
        alert('Endereço de e-mail inválido')
        txtEmail.value = '';
    }    
})


txtWhats.addEventListener('blur', function() {
    const exp = /\(\d{2}\)\ \d{5}\-\d{4}/
    console.log(txtWhats.value)
    if(!exp.test(txtWhats.value)) {
        alert('Numero do whats digitado é inválido')
        txtWhats.value = ''        
    }

})

btnSubscribe.addEventListener('click', async () => {
    const subscription = {
        name: txtName.value,
        email: txtEmail.value,
        whats: txtWhats.value,
        character: txtCharacter.value
    }

    const subscriptionId = await subscribeToHellfireClub(subscription);
    console.log(`Inscrito com sucesso: ${subscriptionId}`);

    txtName.value = '';
    txtEmail.value = '';
    txtWhats.value = '';
    txtCharacter.value = '';

    alert('Inscrito com sucesso no nosso clube!!!')

    loadData();

})

async function loadData(){
    const subscriptions = await getHellfireClubSubscription();

    subscriptionsList.innerHTML = subscriptions.map(sub => `
        <li>
            ${sub.name}
        </li>
    `).join('');

console.log(subscriptions)
}


