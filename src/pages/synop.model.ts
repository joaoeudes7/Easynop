import { generate } from 'rxjs/observable/generate';
export class Data {
  key;
  Synops: Synop[]

  constructor() {
    this.Synops = [];
    this.key = new Date().toISOString().substr(0, 10) + "/";
  }
}

export class Synop {
  key;

  // campo informativo
  data: string;
  hora: string;
  lw = 4;

  // campo de identificação
  IdRegiao = 82;
  IdEstacao = 690
  periodo: string;

  // Campo Nuvens e Ventos
  N;
  dI;
  dII;
  fI;
  fII;

  // campo Status do ambiente
  irlx: number;
  h: number;
  visibilidade: number; //%

  // 1. Temperatura do ar (SnTTT)
  // 1
  SnI = 0;
  TI: number;
  TII: number;
  TIII: number;

  // 2. Ponto de Orvalho (SnTdTdTd)
  // 2
  SnII = 0;
  TdI: number;
  TdII: number;
  TdIII: number;

  // Pressão atmosférica a nível da Estação (PoPoPo)
  PoI: number;
  PoII: number;
  PoIII: number;
  PoIV: number;


  // 4. Pressão atmosférica a nível da Mar (PPPP)
  // 4
  PI = 0;
  PII: number;
  PIII: number;
  PIV: number;

  // 7. Fenômenos Observados: Tempo Passado/Presente
  tempPassado: number; // °
  tempPresente: number; // °

  // 8. Tipos de Nuvens (NhClChCn)
  nh = 0;
  cl = 0;
  ch = 0;
  cn = 0;

  // Orvalho
  Orvalho;
  tempMax;
  PEstacao;
  PMar;

  campoInformativo;
  campoIdentidade;
  campoNuvenseVento;
  campoAmbiente;
  // 1. Temperatura do
  camposTemperatura;
  // 2. Ponto de Orval
  campoOrvalho;
  // Pressão atmosféri
  campoPressaoEstacao;
  // 4. Pressão atmosf
  campoPressaoMar;
  // 7. Fenômenos Obse
  tempPassadoPresente;
  // 8. Tipos de Nuven
  tiposdeNuvens;


  generateSynopString() {
    this.campoInformativo = this.data.substr(0, 1) +' '+ this.data.substr(1, 2) +' '+ this.hora.substr(0, 1) +' '+ this.hora.substr(1, 2) +' '+ this.lw;
    this.campoIdentidade = this.IdRegiao +' '+ this.IdEstacao;
    this.campoAmbiente = this.irlx +' '+ this.h +' '+ this.visibilidade;
    this.campoNuvenseVento = this.N +' '+ this.dI +' '+ this.dII +' '+ this.fI +' '+ this.fII
    // 1. Temperatura do ar (SnTTT)
    this.camposTemperatura = this.SnI +' '+ this.TI +' '+ this.TII +' '+ this.TIII;
    // 2. Ponto de Orvalho (SnTdTdTd)
    this.campoOrvalho = this.SnII +' '+ this.TdI +' '+ this.TdII +' '+ this.TdIII;
    // Pressão atmosférica a nível da Estação (PoPoPo)
    this.campoPressaoEstacao = this.PoI +' '+ this.PoII +' '+ this.PoIII +' '+ this.PoIV;
    // 4. Pressão atmosférica a nível da Mar (PPPP)
    this.campoPressaoMar = this.PI +' '+ this.PII +' '+ this.PIII +' '+ this.PIV;
    // 7. Fenômenos Observados: Tempo Passado/Presente
    this.tempPassadoPresente = this.tempPassado +' '+ this.tempPresente;
    // 8. Tipos de Nuvens (NhClChCn)
    this.tiposdeNuvens = this.nh +' '+ this.cl +' '+ this.ch +' '+ this.cn;

    this.Orvalho = '' + this.TdI + this.TdII;
    this.tempMax = '' + this.TI + this.TII;
    this.PEstacao = '' + this.PoII + this.PoIII + this.PoIV;
    this.PMar = '' + this.PII + this.PIII + this.PIV;
  }
}


export class Pressao {
  n1: number;
  n2: number;
  n3: number;
  n4: number;
}
