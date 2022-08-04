# IgNews - App criado com NextJs
![alt text](https://github.com/webstylus/ignews/blob/main/src/img/cover.jpg?raw=true)


Bibliotecas implementadas no projeto

* [next](https://nextjs.org/)
* [next-auth](https://next-auth.js.org/)
* [stripe](https://stripe.com/)
* [sass]()
* [react-icons]()
* [prettier]()
* [faunadb](https://fauna.com/)
* [prismic](https://prismic.io)


Figma do projeto [ig.news](https://www.figma.com/file/mW8AfUKeRwXwLAAxLOOC22/ig.news?node-id=1%3A2)
 
Instalação

```bash
 
$ yarn install ou npm run install
$ yarn dev ou npm run dev
$ touch .env.local e configure seu dotenv
 
 ```

```dotenv

#Stripe
STRIPE_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SUCCESS_URL=
STRIPE_CANCEL_URL=
STRIPE_WEBHOOK_SECRET=

#Github
GITHUB_ID=
GITHUB_SECRET=
GITHUB_REDIRECT_URI=

#FaunaDB
FAUNADB_KEY=
FAUNADB_LOCATION=db.us.fauna.com

#Prismic CMS
PRISMIC_ENDPOINT=
PRISMIC_ACCESS_TOKEN=

```
