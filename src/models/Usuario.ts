class Usuario {
    nome: string;
    email: string;
    senha: string;
    urlImagem?: string; 

    constructor(nome: string, email:string, senha: string, urlImagem?: string){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.urlImagem = urlImagem;
    }
}
export default Usuario;