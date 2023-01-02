const request = require('supertest')
const app = require('./index');



describe('test login', () => {
    
      
      describe('fill field !!', () => {
        test('fill field !!',async()=>{
          const response = await request(app).post('/api/auth/login').send(body ={
            email : '',
            password : ''
          });
          expect(response.text).toBe('{\"message\":\"fill field !!\"}');
          
        })
      })

      describe('user not found', () => {
        test('user not found',async()=>{
          const response = await request(app).post('/api/auth/login').send(body ={
            email : 'fatihaxxx@gmail.com',
            password : 'scdcsd'
          }
          );
          expect(response.text).toBe('{\"message\":\"user not found\"}');
          
        })
      })


      // describe('password wrong', () => {
      //   test('password wrong',async()=>{
      //     const response = await request(app).post('/api/auth/login').send(body ={
      //       email : 'fatihhaa27@gmail.com',
      //       password : '1324354'
      //     });
      //     expect(response.text).toBe('{\"message\":\"password wrong\"}');
          
      //   })
      // })
})


//  register 


describe('test register', () => {
 
  
  describe('email already exist', () => {
    test('email already exist',async()=>{
      const response = await request(app).post('/api/auth/register').send(body ={
        fullName : 'sahtfatiha',
        email : 'fatihhaa27@gmail.com',
        password : '12345'
      });
      expect(response.text).toBe('{\"message\":\"email already exist\"}');
    })
  })

  // describe('created successfully ! verify your email', () => {
  //   test('created successfully ! verify your email',async()=>{
  //     const response = await request(app).post('/api/auth/register').send(body ={
  //       fullName : 'sahtfatiha',
  //       email : 'fatihhaa@gmail.com',
  //       password : '12345'
  //     });
  //     expect(response.text).toBe('{\"message\":\"created successfully ! verify your email\"}');
  //   })
  // })




})