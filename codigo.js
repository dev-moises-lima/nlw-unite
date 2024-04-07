//alert('funcionou')

let participantes = [
        {
            nome: 'José Moisés',
            email: 'josemoises@gmail.com',
            dataInscricao: new Date(2024, 2, 22, 19, 30),
            dataCheckIn: new Date(2024, 2, 31, 10, 15)
        },
        {
            nome: 'Ana Clara',
            email: 'anaclara@gmail.com',
            dataInscricao: new Date(2024, 0, 23, 13, 56),
            dataCheckIn: new Date(2024, 2, 11, 10, 15)
        },
        {
            nome: 'Carlos Gabriel',
            email: 'carlosgabriel945@gmail.com',
            dataInscricao: new Date(2024, 0, 22, 19, 30),
            dataCheckIn: new Date(2024, 1, 31, 10, 15)
        },
        {
            nome: 'Maria Alice',
            email: 'mariaalice@gmail.com',
            dataInscricao: new Date(2023, 9, 22, 19, 30),
            dataCheckIn: new Date(2024, 2, 31, 10, 15)
        },
        {
            nome: 'João Victor',
            email: 'joaovictor945@gmail.com',
            dataInscricao: new Date(2023, 11, 22, 19, 30),
            dataCheckIn: null
        },
        {
            nome: 'Ana Rute',
            email: 'anarute@gmail.com',
            dataInscricao: new Date(2023, 2, 22, 19, 30),
            dataCheckIn: new Date(2024, 2, 31, 10, 15)
        },
        {
            nome: 'Daniel Sousa',
            email: 'danielsousa@gmail.com',
            dataInscricao: new Date(2024, 2, 22, 19, 30),
            dataCheckIn: new Date(2024, 3, 3, 10, 15)
        },
        {
            nome: 'Mateus Silva',
            email: 'mateussilva@gmail.com',
            dataInscricao: new Date(2024, 2, 22, 19, 30),
            dataCheckIn: null
        },
        {
            nome: 'Julliane Sousa',
            email: 'jujusousa@gmail.com',
            dataInscricao: new Date(2023, 5, 21, 18, 30),
            dataCheckIn: null
        },
        {
            nome: 'Francisca Helena',
            email: 'tiafrancisca@gmail.com',
            dataInscricao: new Date(2024, 2, 22, 19, 30),
            dataCheckIn: new Date(2024, 2, 31, 10, 15)
        },
        {
            nome: 'Marcos Vidal',
            email: 'theredmon945@gmail.com',
            dataInscricao: new Date(2024, 2, 22, 19, 30),
            dataCheckIn: new Date(2024, 2, 31, 10, 15)
        },
    ]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
    
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
                Confirmar check-in
            </button>
        `
    }
    
    return `
        <tr>
            <td><strong>${participante.nome}</strong><br>
            <small>${participante.email}<small></td>
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
        `
}

const atualizarLista = (participantes) => {
    
    let output = ""
    
    for(let participante of participantes) 
    {
        output += criarNovoParticipante(participante)
    }
    
    document.querySelector('tbody').innerHTML = output
}

const adicionarParticipante = (event) => {
    event.preventDefault() // evita que o evento execute a ação padrão - no caso o furmulário não irá submeter as informações para o action como padrão
    const dadosDoFormulario = new FormData(event.target) // pega os dados do formulário com base no argumento event passado pelo formulário na hora em que ele tenta submeter os dados no click do botão - O atributo target se refere ao elemento em que o evento foi disparado, nesse caso o formulário de inscrição
    //para acessar o valor de um campo especifico em um objeto FormData use o metodo get que leva como argumento o valor do atributo name inserido dentro do input
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(), // data do momento da execução da função
        dataCheckIn: null // não aconteceu ainda
    }
    
    const participanteExiste = participantes.find((p) => p.email == participante.email)
    
    if(participanteExiste) {
        alert('Participante com mesmo email já cadastrado')
        return
    }
    
    participantes = [participante, ...participantes] // ...participantes inclue dentro do array todos os elementos dentro do array participantes
    
    atualizarLista(participantes)
    
    // limpar campos do formulário
    event.target.querySelector('[name="nome"]').value = ''
    event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckIn = (event) => {
    //confirmar se realmente quer fazer check-in
    if(!confirm('Deseja fazer check-in do participante')) {
        return // retorna o controle para a parte do programa que chamou a função
    }
        
    // encontrar o participante dentro da lista de participantes
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email // resgata o valor do atributo data-email do botão que disparou o evento que executa a funçao e compara com o email do participante no array
    }) // o método find percorre os elementos de um array executando uma função que se utiliza de cada elemento do array por meio de um parâmetro que recebe os elementos a cada iteração - parece com o loop fot(let value of array) {...} - outra coisa importante sobre o find é que ele retorna o elemento do array em que a função retornar true
        
    // atualizar o ckeck-in do participante
    participante.dataCheckIn = new Date()
    
    // atualizar a lista de participantes
    atualizarLista(participantes)
}

atualizarLista(participantes)