const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises
let mensagem = '';
let metas = [ meta ]
const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}
const cadastrarMeta = async () => {
    const meta = await input({ message: 'Qual a sua meta?' })
    if(meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.'
        return
    }
    metas.push(
        { value: meta, checked: false })
    mensagem = 'Meta cadastrada com sucesso!'
}
const listarMeta = async () => {
    if(metas.length == 0) {
        mensagem = 'Nenhuma meta cadastrada'
        return
    }
    const answer = await checkbox ({
    message: 'Use as setas para navegar, espaço para selecionar e ENTER para finalizar',
    choices: [...metas],
    instructions: false
    })
    metas.forEach((m) => {
        m.checked = false
    if(answer.length == 0) {
        mensagem = 'Nenhuma meta selecionada!'
        return
    }
    })
    answer.forEach((answer) => {
        const meta = metas.find((m) => {
            return m.value == answer
        })
        meta.checked = true
    })
    mensagem = 'Alterações realizadas'
}
const metasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = 'Nenhuma meta cadastrada'
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0) {
        mensagem = 'Nenhuma meta realizada!'
        return
    }
    await select({
        message: 'Metas Realizadas',
        choices: [...realizadas]
    })
    
}
const metasAbertas = async () => {
    if(metas.length == 0) {
        mensagem = 'Nenhuma meta cadastrada'
        return
    }
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })
    if(abertas.length == 0) {
        mensagem = 'Nenhuma meta aberta!'
        return
    }
    await select({
        message: 'Metas a serem realizadas: ' + abertas.length,
        choices: [...abertas]
    })   
}
const deletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = 'Nenhuma meta cadastrada'
        return
    }
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checkbox: false}
    })
    const itensDeletar = await checkbox ({
        message: 'SELECIONE PARA DELETAR - Use as setas para navegar, espaço para selecionar e ENTER para finalizar',
        choices: [...metasDesmarcadas], 
        instructions: false,
        })
    if(itensDeletar.length == 0) {
        mensagem = 'Nenhuma meta selecionada'
        return
    }
    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item       
        })
    })
    mensagem = 'Meta(s) deletada(s) com sucesso!'
}
const mostrarMensagem = () => {
    console.clear();
    if(mensagem != '') {
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }
}
const start = async() => {
    await carregarMetas()
    while(true) {
        mostrarMensagem()
        await salvarMetas()
        const opçao = await select({
            message: 'Menu :',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'listar'
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas em aberto',
                    value: 'abertas'
                },
                {
                    name: 'Apagar metas',
                    value: 'apagar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })
        switch(opçao) {
            case 'cadastrar':
                await cadastrarMeta()
                mostrarMensagem()
                break
            case 'listar':
                await listarMeta()
                mostrarMensagem()
                break
            case 'realizadas':
                await metasRealizadas()
                mostrarMensagem()
                break
            case 'abertas':
                await metasAbertas()
                mostrarMensagem()
                break
            case 'apagar':
                await deletarMetas()
                mostrarMensagem()
                break    
            case 'sair':
                mostrarMensagem()
                return
        }
    }
}
start()