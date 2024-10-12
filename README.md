# How to start ?

1- clone the repo
2- ``` cd Back-end-delivery-food-mobile-app ```
3- ``` npm install ```
4- create .env file
5- npm run dev

# Important notes

## lezem taaml .env file bch el project yekdem

## ki tbadel haja fi schema mt3 prisma lezm texecuti el commands hedhom : 
1- ``` npx prisma migrate dev ```
2- ``` prisma generate ```


## chnya @root ?

ki tal9a import tebda b @root no9sdou biha el root folder mt3 el project , par example 3ana dossier esmou prisma fil project ki nheb naa3ml import mn haja fi westou naaml
<br>
<strong>import ... from @root/prisma/(esm fichiee bch taaml mnou import)</strong>
<br/>

## endpoints

POST /api/products

GET /api/products

GET /api/products/:id

POST /api/categories

GET /api/categories

GET /api/categories/:id
