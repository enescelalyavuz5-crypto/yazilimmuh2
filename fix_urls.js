const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if(file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('c:/projects/yazilimmuh1/frontend/src/app');
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    
    // Pattern 1: Botched double replacement
    const pattern1 = /\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| `\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5050'`\}\}/g;
    c = c.replace(pattern1, "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}");
    
    // Pattern 2: Botched single quotes
    const pattern2 = /\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| ''http:\/\/localhost:5050''\}/g;
    c = c.replace(pattern2, "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}");

    // Pattern 3: Unmodified strings (just in case)
    c = c.replace(/"http:\/\/localhost:5050([^"]*)"/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}$1`");

    // Fix the syntax error in register/page.tsx:
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}'}/v1/auth/register", {
    // and replace with correct backticks
    c = c.replace(/fetch\(`\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5050'\}'\}\/([^"]*)", \{/g, "fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/$1`, {");
    
    c = c.replace(/'\}\/v1\/auth\/register", \{/g, "/v1/auth/register`, {");

    fs.writeFileSync(f, c);
});
console.log('Fixed URLs in all TSX files.');
