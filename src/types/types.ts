type SignInDTO = {
    email: string;
    password: string;
}

type SignUpDTO = {
    name: string;
    email: string;
    password: string;
    phone: string;
}

type CreateBookDTO = {
    title: string;
    author: string;
    description?: string;
    publication_year: number
}

type UpdateBookDTO = {
    title: string;
    description?: string;
}

export {
    SignInDTO,
    SignUpDTO,
    CreateBookDTO,
    UpdateBookDTO
}