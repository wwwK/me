const express = require('express')
const fs = require("fs");
const app = express()
const path = require('path')
const multer = require('multer')
const multerObj = multer({
    dest: 'uploads/'
}) //上传中间件

var router = express.Router();

app.use(multerObj.any())

// 允许直接访问静态文件
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/display', (req, res, next) => {
   res.setHeader('Content-Type', 'text/html')
   res.sendFile(path.join(__dirname, 'display.html'))
})

app.post('/upload', (req, res, next) => {
    console.log(req.files)
    file = req.files
    resArr = []; // 返给前端做回显 link 
    // 多图：修改文件后缀
    file.forEach((item) => {
        //以下代码得到文件后缀
        name = item.originalname;
        nameArray = name.split('');
        var nameMime = [];
        l = nameArray.pop();
        nameMime.unshift(l);
        while (nameArray.length != 0 && l != '.') {
            l = nameArray.pop();
            nameMime.unshift(l);
        }
        //Mime是文件的后缀
        Mime = nameMime.join('');
        //重命名文件 加上文件后缀
        // 这里的路径问题一定要注意：本瓜反复测试了很多才发现是“路径问题导致不能正常修改文件名”
        fs.rename('./uploads/' + item.filename, './uploads/' + item.filename + Mime, (err) => {
            if (err) {
                console.log(err)
            }
        });
        resArr.push(`/uploads/${item.filename + Mime}`)
    });
    res.send(200, {
        'code': 1,
        message: resArr
    })
})

app.get('/getImgs', (req, res, next) => {
    var readDir = fs.readdirSync("./uploads/");
    res.send(200, {
        code: 1,
        message: readDir
    });
})

app.listen(3000)