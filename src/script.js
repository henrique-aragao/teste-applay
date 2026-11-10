//ler do local storage aqui
const historicoCandidatos = localStorage.getItem("candidatos");
let  listaInicial  = [];

let candidatos = [
  { id: "1", cpf: "426.046.108-76", nome: "Lucas Vieira Dias", celular: "(11) 95777-0782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  { id: "2", cpf: "529.982.247-25", nome: "Nelson Santana", celular: "(11) 98888-1234", email: "nelson.santana@gmail.com", sexo: "Masculino", nascimento: "15/05/1999", skills: { html: true, css: true, js: true } },
];

if (historicoCandidatos !== null) {
  listaInicial = JSON.parse(historicoCandidatos);
} else {
  listaInicial = candidatos;
}

candidatos = listaInicial;

function abrirModal(candidato) {
  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if(candidato.sexo=='Masculino'){
      document.getElementById("sexoMasculino").checked = true;
    }else{
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento.split('/').reverse().join('-');
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
    document.getElementById("skillBoot").checked = candidato.skills.boot;
    document.getElementById("skillNode").checked = candidato.skills.node;
    document.getElementById("skillReact").checked = candidato.skills.react;
  }

  $('#candidatoModal').modal('show');
}

function fecharModal() {
  $('#candidatoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('body').removeAttr('style');
  $('.modal-backdrop').remove();

  document.getElementById("id").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("sexoMasculino").checked = true;
  document.getElementById("nascimento").value = '';
  document.getElementById("skillHtml").checked = false;
  document.getElementById("skillCss").checked = false;
  document.getElementById("skillJs").checked = false;
  document.getElementById("skillBoot").checked = false;
  document.getElementById("skillNode").checked = false;
  document.getElementById("skillReact").checked = false;
}

function salvar() {
  let id = document.getElementById("id").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;
  let email = document.getElementById("email").value;
  let nascimento = document.getElementById("nascimento").value.split('-').reverse().join('/');
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;
  let skillBoot = document.getElementById("skillBoot").checked
  let skillNode = document.getElementById("skillNode").checked
  let skillReact = document.getElementById("skillReact").checked

  // Fazer validações aqui
  if(cpf.trim() === '') {
    document.getElementById("cpf").classList.add("is-invalid");
    return;
  } else {
    let verificarCpf = cpf.replace(/[.-]/g, "");
    let primeirosNum = verificarCpf.slice(0, 9);
    let ultimosNum = verificarCpf.slice(-2);
    let somaPrimeiro = 0
    let somaUltimos = 0
    let digito1
    let digito2
    let todosIguais = true

    for(let i = 0; i < verificarCpf.length; i ++){
      if (verificarCpf[i] !== verificarCpf[0]){
        todosIguais = false
      }
    }

    if(todosIguais === false){
      for (let p = 0; p < primeirosNum.length; p ++){
      somaPrimeiro += primeirosNum[p] * (10 - p)
      }

      let resto1 = somaPrimeiro % 11

      if (resto1 === 0 || resto1 === 1){
        digito1 = 0
      } else{
        digito1 = 11 - resto1
      }

      for(let s = 0; s < (primeirosNum.length + 1); s ++){
        if(s < 9){
          somaUltimos += primeirosNum[s] * (11 - s)
        } else{
          somaUltimos += digito1 * 2
        }
      }

      let resto2 = somaUltimos % 11

      if (resto2 === 0 || resto2 === 1){
        digito2 = 0
      } else{
        digito2 = 11 - resto2
      }

      if(digito1 === Number(ultimosNum[0]) && digito2 === Number(ultimosNum[1])){
        let cpfDuplicado = candidatos.some(duplicado => duplicado.cpf === cpf && duplicado.id != id)

        if(cpfDuplicado === true){
          document.getElementById("cpf").classList.add("is-invalid");
          document.getElementById("cpf").setCustomValidity('CPF já cadastrado!');
          return
        }else{
          document.getElementById("cpf").classList.remove("is-invalid");
          document.getElementById("cpf").setCustomValidity('');
        }
      } else{
        document.getElementById("cpf").classList.add("is-invalid");
        document.getElementById("cpf").setCustomValidity('CPF invalido!');
        return
      }
    } else{
      document.getElementById("cpf").classList.add("is-invalid");
      document.getElementById("cpf").setCustomValidity('Números iguais não são válidos!');
      return
    }
  }

  let nomeCompleto = nome.trim().split(' ').filter(Boolean);
  
  if(nome.trim() === '') {
    document.getElementById("nome").classList.add("is-invalid");
    return;
  } else if(nomeCompleto.length < 2){
    document.getElementById("nome").classList.add("is-invalid");
    document.getElementById("nome").setCustomValidity('Nome Incompleto');
    return;
  } else {
    document.getElementById("nome").classList.remove("is-invalid");
    document.getElementById("nome").setCustomValidity('');
  }

  if(celular.trim() === '') {
    document.getElementById("celular").classList.add("is-invalid");
    return;
  } else {
    document.getElementById("celular").classList.remove("is-invalid");
  }

  if(email.trim() === '') {
    document.getElementById("email").classList.add("is-invalid");
    return;
  } else {
    document.getElementById("email").classList.remove("is-invalid");
  }

  if(nascimento.trim() === '') {
    document.getElementById("nascimento").classList.add("is-invalid");
    return;
  } else {
    let data = new Date();
    let diaAtual = data.getDate();
    let mesAtual = data.getMonth() + 1;
    let anoAtual = data.getFullYear();
    let dataNascimento = nascimento.split('/');
    let diaNascimento = Number(dataNascimento[0]);
    let mesNascimento = Number(dataNascimento[1]);
    let anoNascimento = Number(dataNascimento[2]);
    let idadeAtual;

    if (mesAtual > mesNascimento){
      idadeAtual = anoAtual - anoNascimento;
    } else if (mesAtual < mesNascimento){
      idadeAtual = anoAtual - anoNascimento - 1;
    } else{
      if (diaAtual > diaNascimento){
        idadeAtual = anoAtual - anoNascimento;
      } else if (diaAtual < diaNascimento){
        idadeAtual = anoAtual - anoNascimento - 1;
      } else{
        idadeAtual = anoAtual - anoNascimento;
      }
    }

    if (idadeAtual > 16){
      document.getElementById("nascimento").classList.remove("is-invalid");
      document.getElementById("nascimento").setCustomValidity('');
    } else{
      document.getElementById("nascimento").classList.add("is-invalid");
      document.getElementById("nascimento").setCustomValidity('O candidato deve ter mais de 16 anos!');
      return;
    }
  }

  let habilidades = [skillHtml, skillCss, skillJs, skillBoot, skillNode, skillReact];
  let valido = habilidades.some(Boolean);
  let habilidade = [document.getElementById("skillHtml"), document.getElementById("skillCss"), document.getElementById("skillJs"), document.getElementById("skillBoot"), document.getElementById("skillNode"), document.getElementById("skillReact")];
  
  if (valido === false){
    for (let i = 0; i < habilidade.length; i++){
      habilidade[i].classList.add("is-invalid");
    }
    habilidade[0].setCustomValidity('Escolha no mínimo uma habilidade');
    return;
  } else {
   for (let i = 0; i < habilidade.length; i++){
      habilidade[i].classList.remove("is-invalid");
    }
    habilidade[0].setCustomValidity('');
  }
  // Fazer validações aqui

  let candidato = {
    id: id!=''?id:new Date().getTime(),
    cpf: cpf,
    nome: nome,
    celular: celular,
    email: email,
    sexo: sexo?'Masculino':'Feminino',
    nascimento: nascimento,
    skills: {
      html: skillHtml,
      css: skillCss,
      js: skillJs,
      boot: skillBoot,
      node: skillNode,
      react: skillReact
    }
  };

  if(id!=''){
    let checkCandidato = candidatos.find(e=>e.id == candidato.id);
    checkCandidato.cpf = candidato.cpf;
    checkCandidato.nome = candidato.nome;
    checkCandidato.celular = candidato.celular;
    checkCandidato.email = candidato.email;
    checkCandidato.sexo = candidato.sexo;
    checkCandidato.nascimento = candidato.nascimento;
    checkCandidato.skills = candidato.skills;
  }else{
    candidatos.push(candidato);
  }

  //salvar a lista de canditatos atualizada no local storage
  localStorage.setItem("candidatos", JSON.stringify(candidatos));

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Candidato salvo com sucesso!",
    width: "400px",
    customClass: {
      title: "titulo"
    },
    showConfirmButton: false,
    timer: 1600
  });

  fecharModal();
  listarCandidatos();
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = '';

  for (let candidato of candidatos) {
    let linha = document.createElement("tr");

    let colunaCpf = document.createElement("td");
    let colunaNome = document.createElement("td");
    let colunaCelular = document.createElement("td");
    let colunaEmail = document.createElement("td");
    let colunaSexo = document.createElement("td");
    let colunaNascimento = document.createElement("td");
    let colunaSkills = document.createElement("td");
    let colunaEditar = document.createElement("td");
    let colunaRemover = document.createElement("td");

    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    botaoEditar.setAttribute("aria-label", "Editar");
    botaoEditar.classList.toggle('editar');
    botaoEditar.onclick = function () {
      console.log('editar');
      abrirModal(candidato);
    }

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
    botaoRemover.setAttribute("aria-label", "Remover");
    botaoRemover.classList.toggle('remover');
    botaoRemover.onclick = function () {
      let indice = candidatos.findIndex(e => e.id == candidato.id)

      Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter essa decisão!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, quero excluir"
      }).then((result) => {

        if (result.isConfirmed) {

          candidatos.splice(indice, 1);
          localStorage.setItem("candidatos", JSON.stringify(candidatos));
          listarCandidatos();

          Swal.fire({
            title: "Candidato excluído!!",
            text: "O candidato foi removido com sucesso.",
            icon: "success"
          });
        }
      });
    }

    let arrSkills = [];
    if(candidato.skills.html){
      arrSkills.push('HTML');
    }
    if(candidato.skills.css){
      arrSkills.push('CSS');
    }
    if(candidato.skills.js){
      arrSkills.push('JS');
    }
    if(candidato.skills.boot){
      arrSkills.push('Bootstrap');
    }
    if(candidato.skills.node){
      arrSkills.push('Node.js');
    }
    if(candidato.skills.react){
      arrSkills.push('React');
    }

    colunaCpf.appendChild(document.createTextNode(candidato.cpf));
    colunaNome.appendChild(document.createTextNode(candidato.nome));
    colunaCelular.appendChild(document.createTextNode(candidato.celular));
    colunaEmail.appendChild(document.createTextNode(candidato.email));
    colunaSexo.appendChild(document.createTextNode(candidato.sexo));
    colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
    colunaSkills.appendChild(document.createTextNode(arrSkills.join(', ')));
    colunaEditar.appendChild(botaoEditar);
    colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditar);
    linha.appendChild(colunaRemover);

    tabela.appendChild(linha);
  }
}

listarCandidatos();

//Trecho resposável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  $('#cpf').mask('000.000.000-00', {reverse: true});
  $('#celular').mask('(00) 00000-0000');
});
