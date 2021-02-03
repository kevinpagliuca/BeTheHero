# BeTheHero


##### Esse projeto foi construído durante a Semana Omnistack 11.0, dirigia pelo Diego Fernandes da Rocketseat, que particularmente adota uma didática muito clara e passou muitos conhecimentos dessa Stack Reactjs com Nodejs.


# Inicializando o projeto

#### Para conseguir obter uma boa experiência você deve conter o Docker instalado em sua máquina.

Para iniciar a aplicação usar o comando:

#### `git clone https://github.com/KevinPagliuca/BeTheHero/`


Para iniciar o servidor, entre na pasta backend e use o comando:

#### `docker-compose up -d`,

Iniciar o frontend, entre na pasta frontend e use o comando:

#### `npm install && npm start` 

## Banco de dados

O banco de dados que está sendo utilizado é o MySQL, com a ajuda do `knex` que monta as querys SQL para nós a partir do javascript `Query Biulder`

# Funcionalidades

## Login

O login pode ser feito de duas formas, a primeira delas é com o email da sua ONG cadastrada no sistema, e sua senha.
A segunda opção pode ser feita a partir do id que o sistema gerar para sua ONG no próprio cadastro da mesma.

### Obs: Caso você esqueça seu id, será possível consultar fazendo o login com o seu email e verificando em seu perfil!

## Registro

O Registro é feito de forma bem básica, seguindo o formulário.
As senhas cadastradas no banco de dados são criptografadas pela biblioteca bcrypt no backend.

### Obs: É importante informar o seu whatsapp de forma correta, pois esse número estará vinculado à sua ONG e a partir disso, as pessoas poderão te contatar.

## Cadastro de casos

Após estar logado no sistema, você consegue cadastrar novos casos de sua ONG, para que as pessoas possam ver e se interessá-las, realizar um bate-papo com você.

## Listagem de casos e status

Você poderá ver todos os casos cadastrados no sistema com o status "Não concluído", e também verificar todos os casos que sua ONG já realizou.


# Observações
  - O sistema está em construção ainda, algumas funcionalidades podem não estar criadas ainda.

