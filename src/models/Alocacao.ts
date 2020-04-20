export default class Alocacao {
    nome: string;
    descricao: string;
    uidUsuario: string;
    inicio: Date | string;
    fim: Date | string;
    participantes: Array<string>;
    ativo: boolean;
    id?: number;
    createdAt?: Date;
    constructor(nome: string, descricao: string, uidUsuario: string, inicio: Date | string, fim: Date | string, participantes?: Array<string>){
        this.nome = nome;
        this.descricao = descricao;
        this.uidUsuario = uidUsuario;
        this.inicio = inicio;
        this.fim = fim;
        this.participantes = participantes || [];
        this.ativo = true;
        this.id = undefined;
    }
}