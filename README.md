# How to start ?

1- clone the repo
2- ``` cd Back-end-delivery-food-mobile-app ```<br/>
3- ``` npm install ```<br/>
4- create .env file<br/>
5- npm run dev<br/>

# Important notes

## lezem taaml .env file bch el project yekdem

## ki tbadel haja fi schema mt3 prisma lezm texecuti el commands hedhom : 
1- ``` npx prisma migrate dev ```<br/>
2- ``` npx prisma generate ```<br/>


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
