// CRUD JS by Dea Afrizal

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')


app.use(bodyParser.json())

app.get('/', (req, res) => {

  const sql = "SELECT * FROM ms_data_kry"
  
  db.query(sql,(err,result)=>{
    if(err) throw err
    response(200, result,'Get data karyawan',res)

  })
})

app.get('/cari',(req,res)=>{

  // Mencari data menggunakan query
  const sql = `SELECT * FROM ms_data_kry WHERE nik = ${req.query.nik}`
  
  db.query(sql,(err,result)=>{
    if(err) throw err
    response(200, result,'Get data karyawan by NIK',res)
  
  })
})

app.get('/temukan/:nik',(req,res)=>{

  // Mencari data menggunakan parameter
  const nik = req.params.nik
  const sql = `SELECT * FROM ms_data_kry WHERE nik = ${nik}`
  
  db.query(sql,(err,result)=>{
    if(err) throw err
    response(200, result,'Get data karyawan by NIK spesifik',res)
  
  })
})

app.post('/tambah',(req,res)=>{
    const{nik,nama_kry,jenis_kel,tempat_lhr,tgl_lahir,alamat,telp} = req.body
    const sql = `INSERT INTO ms_data_kry (nik,nama_kry,jenis_kel,tempat_lhr,tgl_lahir,alamat,telp)
    VALUES ('${nik}','${nama_kry}','${jenis_kel}','${tempat_lhr}','${tgl_lahir}','${alamat}','${telp}')`

    db.query(sql,(err,result)=>{
      if(err) response(500,'Invalid Request','Error',res)

      if(result?.affectedRows){
        const data = {
          isSuccess : result.affectedRows,
          id : result.insertId
        }
        response(200,data,'Data berhasil ditambahkan..',res)
        
      }else{
        console.log('Data tidak masuk..')
      }
    })
})

app.put('/ubah',(req,res)=>{
    const {nik,nama_kry,jenis_kel,tempat_lhr,tgl_lahir,alamat,telp} = req.body
    const sql = `UPDATE ms_data_kry SET nama_kry ='${nama_kry}',jenis_kel='${jenis_kel}',tempat_lhr='${tempat_lhr}',tgl_lahir='${tgl_lahir}',alamat='${alamat}',telp='${telp}' WHERE nik='${nik}'`

  db.query(sql,(err,result)=>{
    if(err) throw err

    if(result?.affectedRows){
      const data = {
        isSuccess : result.affectedRows,
        message : result.message,
      }
      response(200,data,'Data berhasil diubah..',res)
      
    }else{
      response(404,'User not found..','Data gagal diubah..',res)
    }

  })

})

app.delete('/hapus',(req,res)=>{
  const{nik} = req.body
  const sql = `DELETE FROM ms_data_kry WHERE nik = ${nik}`

  db.query(sql,(err,result)=>{
    if(err) throw err

    if(result?.affectedRows){
      const data = {
        isDeleted : result.affectedRows,
      }
      response(200,data,'Data berhasil dihapus..',res)

    }else{
      response(404,'Not Found..','Data gagal dihapus..',res)
    }
  })
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})