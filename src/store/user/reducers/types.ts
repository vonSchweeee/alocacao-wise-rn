export interface User {
    email: string,
    url_imagem: string
}

export interface UserState {
    user: User,
    token: string
}