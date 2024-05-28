// Função para limpar os campos do formulário
const cleanForm = () => {
    document.getElementById('cep').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('complemento').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('ibge').value = '';
}

// Função para preencher os campos do formulário com os dados do CEP
const completeCep = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro || '';
    document.getElementById('bairro').value = endereco.bairro || '';
    document.getElementById('cidade').value = endereco.localidade || '';
    document.getElementById('estado').value = endereco.uf || '';
    document.getElementById('complemento').value = endereco.complemento || '';
    document.getElementById('ibge').value = endereco.ibge || '';
}

// Função para validar o CEP
const validateCep = (cep) => cep.length === 8 && /^[0-9]+$/.test(cep);

// Função para consultar o CEP na API
const consultaCep = async () => {
    const cep = document.querySelector('#cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (validateCep(cep)) {
        try {
            const response = await fetch(url);
            const endereco = await response.json();

            if (endereco.hasOwnProperty('erro')) {
                alert('CEP não encontrado!');
                cleanForm();
            } else {
                completeCep(endereco);
            }
        } catch (error) {
            console.error('Erro ao consultar CEP:', error);
            alert('Erro ao consultar CEP!');
            cleanForm();
        }
    } else {
        alert('CEP incorreto ou incompleto!');
        cleanForm();
    }
}

// Função para salvar os dados na localStorage
function saveData() {
    const cepValue = document.getElementById('cep').value;
    const enderecoValue = document.getElementById('endereco').value;
    const complementoValue = document.getElementById('complemento').value;
    const bairroValue = document.getElementById('bairro').value;
    const cidadeValue = document.getElementById('cidade').value;
    const estadoValue = document.getElementById('estado').value;
    const ibgeValue = document.getElementById('ibge').value;

    const formData = {
        cep: cepValue,
        endereco: enderecoValue,
        complemento: complementoValue,
        bairro: bairroValue,
        cidade: cidadeValue,
        estado: estadoValue,
        ibge: ibgeValue
    };

    const savedData = JSON.parse(localStorage.getItem('corpoTabela')) || [];
    savedData.push(formData);
    localStorage.setItem('corpoTabela', JSON.stringify(savedData));

    carregarCep();
}

// Função para carregar os dados na tabela
function carregarCep() {
    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = ''; // Limpa o conteúdo atual da tabela
    const savedData = JSON.parse(localStorage.getItem('corpoTabela')) || [];

    savedData.forEach(formData => {
        const newRow = document.createElement('tr');
        Object.values(formData).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            newRow.appendChild(cell);
        });
        corpoTabela.appendChild(newRow);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    carregarCep();
});