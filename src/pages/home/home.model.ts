export class Synop {
  key;

  data;
  hora;


  periodo: string;

  chuvaStatus: number;
  qtdChuva;
  tempPassado: number; // °
  tempPresente: number; // °
  alturaNuvens;
  visibilidade: number; //%

  qtdNuvens: number;
  direcaoNuvens;
  direcaoVento;

  tempAmbiente: number; // %

  pontoOrvalho: number; // Float

  pressaoAtmosferica: number; // Float

  neboluzidade: number;

  tiposNuvens = new Tipos();

  tempMax: number;
  tempMin: number;
  humidade: number;
  insolacao: number;

  pressao = new Pressao();

  constructor() {
    this.tiposNuvens = new Tipos();
  }
}

export class Tipos {
  nh: number;
  cl: number;
  ch: number;
  cn: number;

  constructor() {
    this.nh = 0;
    this.cl = 0;
    this.ch = 0;
    this.cn = 0;
  }
}

export class Pressao {
  n1: number;
  n2: number;
  n3: number;
  n4: number;
}
