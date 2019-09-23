#!/usr/bin/env node

const program = require('commander');
const { execSync } = require('child_process') 
const path = require('path');

function excute (code, position, message) {
 let res = execSync(code, { cwd: path.join(process.cwd(), position) })
 res = JSON.stringify(res.toString().trim())
 if(res) {
  console.log(res,'\n')
  console.log(message, '执行完毕\n')
 } else {
   console.log('自动初始化出现了错误，请手动安装依赖')
 }
}

// 不把方法写死，未来可扩展
program
  .option('init', '初始化')
  .parse(process.argv);

if (program.init) {
  console.log('正在执行初始化程序，请勿关闭窗口...')
  excute('npm install','','前端依赖安装')
  excute('npm install','server','后端依赖安装')
  excute('node database.js','server','数据库初始化')
  console.log('初始化完毕')
}