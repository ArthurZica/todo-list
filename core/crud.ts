import fs from 'fs';
const DB_FILE_PATH = "./core/db"
console.log("CRUD");

function create(content: string){
    fs.writeFileSync(DB_FILE_PATH,content);
    return content;
}

create("Criando cruds com qualidade!");