let tiposGentilezas = [
  { "descricao": "Zap", "xp": 5 },
  { "descricao": "Bom dia", "xp": 7 },
  { "descricao": "Ligação", "xp": 7 },
  { "descricao": "Aperto de mãos", "xp": 7 },
  { "descricao": "Abraço", "xp": 10 },
  { "descricao": "Doce", "xp": 15 },
  { "descricao": "Presente", "xp": 20 }
];

let destinatarios = [
   { "descricao": "Pais" },
   { "descricao": "Irmãos" },
   { "descricao": "Filhos" },
   { "descricao": "Parceiros" },
   { "descricao": "Amigos" },
   { "descricao": "Colegas" },
   { "descricao": "Desconhecidos" }
];

let usuario = {
   "email": "usuario@site.com.br",
   "senha": "secreta",
   "nome": "Fulano",
   "xp": 7,
   "cor": "#4a148c",
   "gentilezas": [{
       "tipo": { "descricao": "Zap", "xp": 5 },
       "destinatario": { "descricao": "Filhos" },
       "descricao": "Zap para filhos!",
       "likes": 2,
       "timestamp": "2017-06-10T22:05:22-03:00"
   }]
};