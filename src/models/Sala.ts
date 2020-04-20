export default class Sala {
    nome: string;
    lugares: number;
    ac: boolean;
    multimidia: boolean;
    ativo: boolean;
    urlImagem?: string;
    recursos?: Array<string>;
    localizacao?: string;
    geoLocation?: Array<number>;
    id?: string;

    constructor(nome: string, lugares: number, ac: boolean, multimidia: boolean, ativo?: boolean, urlImagem?: string, recursos?: Array<string>, localizacao?: string, geoLocation?: Array<number>){
        this.nome = nome;
        this.lugares = lugares;
        this.ac = ac;
        this.multimidia = multimidia;
        this.ativo = ativo || true;
        this.urlImagem = urlImagem || '';
        this.recursos = recursos || [];
        this.localizacao = localizacao || '';
        this.geoLocation = geoLocation || [];
    }


}