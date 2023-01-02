# instalation 

 from this web ste : 
```bash
https://docs.docker.com/desktop/install/windows-install/
```

## create the docker file into the back-end file  : 
 
```bash
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3001
CMD ["node","index"]

```
## create network for the back-end named :  marhaba-back-net
```bash
docker network create marhaba-back-net
```
##  run  docker container named  marhaba-back-db  using the network marhaba-back-net

```bash
docker container run -d --name marhaba-back-db -v marhaba-back-db:/data/db --network marhaba-back-net mongo
```

##  create image named marhaba-back-docker:test 

```bash
docker build -t marhaba-back-docker:test .
```

##  run  the docker container 

```bash
docker container run -d --name marhaba-back -v ${pwd}:/app -v /app/node_modules --network marhaba-back-net -p 3001:3001 marhaba-back-docker:test
```

for the front-end  part   :
```bash
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm","start"]
```


```bash
docker network create marhaba-back-net
```

```bash
docker build -t marhaba-back-docker:test .
```
```bash
docker container run -d --name marhaba-back -v ${pwd}:/app -v /app/node_modules --network marhaba-back-net -p 3001:3001 marhaba-back-docker:test
```

## other command you can need :
to show the all images 
```bash
docker images
```
delete image with the spesific ID : exemple c06
```bash
docker rmi c06
```
delete container stil runing 
```bash
docker rm  nameContainer -f
```
delete all networks 
```bash
docker network prune
```

# test with Jest 

first step
```bash
npm i jest supertest
```

## require supertest et le fihier de   : 
 
```bash
const request = require('supertest')
const app = require('./index');

```
## create the function describe for the backend traitement 
```bash
describe('test login', () => {
      let body ={
        email : '',
        password : ''
      }
      

      describe('fill field !!', () => {
        test('fill field !!',async()=>{
          const response = await request(app).post('/api/auth/login').send(body);
          expect(response.statusCode).toBe(400);
          
        })
      })
 
})
