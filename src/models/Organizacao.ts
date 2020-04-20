class Organizacao {
    nome: string;
    ativo: boolean;
    cep: string;
    tipo: string;
    
    constructor(nome: string, ativo: boolean, cep: string, tipo: string){
        this.nome = nome;
        this.ativo = ativo;
        this.cep = cep;
        this.tipo = tipo;
    }
}
export default Organizacao;