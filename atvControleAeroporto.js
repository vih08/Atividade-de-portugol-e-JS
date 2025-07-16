const readline = require('readline-sync');

class Passageiro {
  constructor(nome, doc) {
    this.nome = nome;
    this.doc = doc;
    this.status = false;
    this.bagagemOK = true;
  }
}

class Voo {
  constructor(num, dest, hora, cap) {
    this.num = num;
    this.dest = dest;
    this.hora = hora;
    this.cap = cap;
    this.embarcados = 0;
  }
}

class Bagagem {
  constructor(peso, tipo) {
    this.peso = peso;
    this.tipo = tipo;
    this.autorizada = false;
  }
}

let pass = [];
let bags = [];
let voos = [];
let tot = 0;

function inicializarVoos() {
  voos = [
    new Voo("101", "SP", "10h", 5),
    new Voo("202", "RJ", "12h", 5),
    new Voo("303", "BSB", "15h", 5)
  ];
}

function cadastrar() {
  if (tot >= 10) {
    console.log("Limite de passageiros atingido.");
    return;
  }

  const nome = readline.question("Nome: ");
  const doc = readline.question("Doc: ");
  const peso = parseFloat(readline.question("Peso da bagagem: "));
  const tipo = readline.question("Tipo (mão/despachada): ").toLowerCase();

  const passageiro = new Passageiro(nome, doc);
  const bagagem = new Bagagem(peso, tipo);

  if ((tipo === "mão" && peso <= 10) || (tipo === "despachada" && peso <= 23)) {
    bagagem.autorizada = true;
    console.log("Bagagem OK");
  } else {
    bagagem.autorizada = false;
    console.log("Bagagem NEGADA");
  }

  pass.push(passageiro);
  bags.push(bagagem);
  tot++;
}

function consultarVoos() {
  voos.forEach(v => {
    console.log(`${v.num} - ${v.dest} - ${v.hora}`);
  });
}

function embarcar() {
  const doc = readline.question("Doc: ");
  const num = readline.question("Voo: ");

  for (let i = 0; i < tot; i++) {
    if (pass[i].doc === doc) {
      for (let j = 0; j < voos.length; j++) {
        if (voos[j].num === num && voos[j].embarcados < voos[j].cap) {
          pass[i].status = true;
          voos[j].embarcados++;
          console.log("Embarcado!");
          return;
        }
      }
    }
  }
}

function bilhete() {
  const doc = readline.question("Doc: ");
  for (let i = 0; i < tot; i++) {
    if (pass[i].doc === doc) {
      console.log(`Nome: ${pass[i].nome} Embarque: ${pass[i].status ? "SIM" : "NÃO"}`);
    }
  }
}

inicializarVoos();

let op;
do {
  op = parseInt(readline.question("\n1-Cadastrar 2-Voos 3-Embarque 4-Bilhete 5-Sair: "));
  switch (op) {
    case 1: cadastrar(); break;
    case 2: consultarVoos(); break;
    case 3: embarcar(); break;
    case 4: bilhete(); break;
  }
} while (op !== 5);

console.log("Sistema encerrado.");
