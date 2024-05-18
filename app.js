//elementos de lista que recebem os valores da API

const cleanForm = (endereco) => {
    
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
    document.getElementById('complemento').value = ''
    document.getElementById('ibge').value = ''
}


const completeCep = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
    document.getElementById('complemento').value = endereco.complemento
    document.getElementById('ibge').value = endereco.ibge
}

const validateCep = (cep) => 
    cep.length == 8 && /^[0-9]+$/.test(cep)

// busca pelas informações na API
const consultaCep = async() => {
   const cep = document.querySelector('#cep').value 
   const url = (`https://viacep.com.br/ws/${cep}/json/`)
   if (validateCep(cep)){
   const data = await fetch(url)
   const endereco = await data.json();

    //caso o Cep nao exista
        if (endereco.hasOwnProperty('erro')){
            console.log(endereco)
            alert('CEP não encontrado!')
            cleanForm(endereco)
        }else {
            completeCep(endereco)
        }   
    } else {
        alert('CEP Incorreto ou Incompleto!')
        cleanForm(endereco)
    }
}