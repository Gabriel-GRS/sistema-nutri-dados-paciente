var btnAdicionar = document.querySelector("#adicionar-paciente")
btnAdicionar.addEventListener("click", function(event){
    //Para a página não dar refresh ao clicar no btn
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    
    //Extraindo informações do paciente do form
    var paciente = obtemPacienteDoFormulario(form)

    //Cria a tr e a td do paciente
    var pacienteTr = montaTr(paciente);

    
    var erros = validaPaciente(paciente);
  
    //Validação dos erros
    if (erros.length > 0) {
        exibeMensagemErro(erros);
        return;
    }
    //Adicionando o paciente na tabela
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    //Limpar os campos do formulário
    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro")
    mensagensErro.innerHTML = "";

});

function exibeMensagemErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente
}

function montaTr(paciente){

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
 
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    
    return pacienteTr;

}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;

}

function validaPaciente(paciente){
    var erros = [];
    
    if(paciente.nome.length == 0) erros.push("Insira o nome do paciente");

    if(paciente.gordura.length == 0) erros.push("Insira a gordura do paciente");
    
    if(paciente.peso == 0) erros.push("Insira o peso do paciente");
    
    if(paciente.altura== 0) erros.push("Insira a altura do paciente");

    if (!validaPeso(paciente.peso)) erros.push("Peso é inválido");

    if (!validaAltura(paciente.altura)) erros.push("Altura é inválida");

    return erros;
}