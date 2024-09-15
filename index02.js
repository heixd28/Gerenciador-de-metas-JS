// Arrays, objetos
let meta = {
    value: 'Estudar 1 hora por dia',
    checked: true
};

let metas = {
    meta: {
        value: 'Beber 2L de água',
        checked: false
    }
};
console.log(meta.value,metas.meta.value)

// While (laços de repetição) e functions
const contagem = () => {
    let numero = 0
    while(numero <= 100){
        console.log(numero)
        numero = numero + 1
    }
}

contagem()

// Condicionais
const menu = () => {
    let opção = 'Sair'
    switch(opção) {
        case 'Cadastrar':
            console.log('Vamos cadastrar!')
            break
        case 'Listar':
            console.log('Vamos listar!')
            break
        case 'Sair':
            console.log('Tchau!')
            return
    }

}
menu()