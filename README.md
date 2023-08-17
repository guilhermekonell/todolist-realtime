# To Do List - Realtime

Desafio técnico que consiste em criar um app To-Do List Realtime utilizando Firebase.

## Get Starting

Clone este projeto.

Instale as dependências:

```console
npm install
```

Preencha as variáveis de ambiente no arquivo `.env.local`:

```
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

NEXTAUTH_SECRET=<secret-hash>
NEXTAUTH_URL=<next-auth-url>

NEXT_PUBLIC_FIREBASE_APIKEY=<your-firebase-apikey>
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=<your-firebase-authdomain>
NEXT_PUBLIC_FIREBASE_PROJECTID=<your-firebase-projectid>
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=<your-firebase-storagebucket>
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=<your-firebase-messagingsenderid>
NEXT_PUBLIC_FIREBASE_APPID=<your-firebase-appid>
NEXT_PUBLIC_FIREBASE_MEASUREMENTID=<your-firebase-measurementid>
```

Execute o app:

```console
npm run dev
```

## Necessidade

Em um squad composto por três pessoas, os membros identificaram um desafio recorrente de organização em suas atividades diárias. Eles notaram que as tarefas frequentemente se perdiam, resultando em atrasos e dificuldades na comunicação interna, também não sabendo qual atividade estava com qual pessoa e se estava sendo executada ou não.

## Solução

- Desenvolver um aplicativo de "to-do list" para aprimorar a gestão das tarefas.
- Precisamos saber os usuários que temos no board e quais estão online ou offline.
- A lista deve ser colaborativa, portando vários usuários veem a mesma lista.
- O Usuário pode bloquear um item que ele criou para que outras pessoas não possam editá-lo, concluí-lo ou excluí-lo
- Deve conter filtros

### Especificações

- [x] Utilizar Firebase para desenvolvimento do projeto
- [x] A autenticação deve ser com login da Google
- [x] Deve ser feito utilizando React Hooks
- [x] Deve ser utilizado FireStore como banco de dados
- [ ] Deve ser publicado no serverless do firebase
- [x] Quando um usuário fazer alguma ação deve ser atualizado em tempo real para outros usuários
- [ ] Colocar CI/CD com GitHub Actions
- [ ] Deve conter testes
