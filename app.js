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


function saveData() {
    // Criando linha
    const newRow = document.createElement('tr');
    
    // Criando colunas
    const cepTd = document.createElement('td');
    const enderecoTd = document.createElement('td');
    const complementoTd = document.createElement('td');
    const bairroTd = document.createElement('td');
    const cidadeTd = document.createElement('td');
    const estadoTd = document.createElement('td');
    const ibgeTd = document.createElement('td');

    // Obtendo os valores dos campos de formulário
    const cepValue = document.getElementById('cep').value;
    const enderecoValue = document.getElementById('endereco').value;
    const complementoValue = document.getElementById('complemento').value;
    const bairroValue = document.getElementById('bairro').value;
    const cidadeValue = document.getElementById('cidade').value;
    const estadoValue = document.getElementById('estado').value;
    const ibgeValue = document.getElementById('ibge').value;

    // Adicionando conteúdos nas colunas
    cepTd.textContent = cepValue;
    enderecoTd.textContent = enderecoValue;
    complementoTd.textContent = complementoValue;
    bairroTd.textContent = bairroValue;
    cidadeTd.textContent = cidadeValue;
    estadoTd.textContent = estadoValue;
    ibgeTd.textContent = ibgeValue;

    // Adicionando as colunas como filhos na linha
    newRow.appendChild(cepTd);
    newRow.appendChild(enderecoTd);
    newRow.appendChild(complementoTd);
    newRow.appendChild(bairroTd);
    newRow.appendChild(cidadeTd);
    newRow.appendChild(estadoTd);
    newRow.appendChild(ibgeTd);

    // Adicionando a linha filha na tabela
    document.getElementById('corpoTabela').appendChild(newRow);
    salvarTabela();
}

function salvarTabela(){
    const saveData = []; // Renomeie para evitar conflito com a variável saveData definida anteriormente
    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.querySelectorAll("tr").forEach(item => { 
        const endereco = item.querySelector("td:nth-child(2)").textContent; // Corrigido para selecionar o texto da segunda coluna (endereço)
        saveData.push({ texto: endereco }); // Corrigido para adicionar o objeto com o texto do endereço
    });
    localStorage.setItem('corpoTabela', JSON.stringify(saveData)); // Corrigido para salvar saveData no localStorage
}

function carregarCep() {
    const corpoTabela = document.getElementById("corpoTabela");
    const savedData = JSON.parse(localStorage.getItem('corpoTabela')) || [];
    savedData.forEach(item => { // Iterar sobre os itens salvos e adicioná-los à tabela
        const newRow = document.createElement('tr');
        const enderecoTd = document.createElement('td');
        enderecoTd.textContent = item.texto; // Adiciona o texto do endereço na célula
        newRow.appendChild(enderecoTd);
        corpoTabela.appendChild(newRow); // Adiciona a nova linha à tabela
    });    
}

document.addEventListener("DOMContentLoaded", function() {
    carregarCep();
});
