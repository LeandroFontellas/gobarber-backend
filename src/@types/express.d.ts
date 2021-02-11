declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
// aqui queremos adicionar uma tipagem
// no express pq a gente no middleware/EnsureAuthenticated quer colocar
// request.user = alguma coisa e ele n deixa pq n existe
// o user dentro do express.
