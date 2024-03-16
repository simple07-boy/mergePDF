//  Step -1: In terminal, npm init -y : by this we get the package.json and the folder work as a node js project.
// Step 2: In terminal,npm i express by this we use express
const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')  //  This will added from npm multer in google
const { mergePdfs } = require('./merge')       //  This is added
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
app.use('/static', express.static('public'))  //  This is added from express and copy from static files.
const port = 3001

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 3), async (req, res, next) => {
  // console.log(req.files)
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), path.join(__dirname, req.files[2].path))
  // res.send({ data: req.files })
  // Delete uploaded PDF files after merging

  
  
  res.redirect(`http://localhost:${port}/static/${d}.pdf`)  //  Added
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  req.files.forEach(file => {
    fs.unlinkSync(file.path);
  });

  fs.unlinkSync(d)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
// After downloading, npm i -g nodemon in terminal then we use as nodemon {filename.js}

//  npm i multer is used to upload the file in node js
//  After uploading the pdf we go to google add a chrome extension called json formatter

//  Make a new file testPdf.js and go to pdf Merger js in google and copy from npm pdf Merger async node.js

//  write npm i pdf-merger-js in terminal