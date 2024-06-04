const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');


const tempOverview = fs.readFileSync(`${__dirname}/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`,'utf-8');
const tempproduct = fs.readFileSync(`${__dirname}/template-product.html`,'utf-8');


const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataobj = JSON.parse(data);


const server = http.createServer((req,res)=>{
const {query, pathname} =  url.parse(req.url, true);

//overview page
if(pathname==='/' || pathname==='/overview'){
    res.writeHead(200,{'content-type':'text/html'})

const cardshtml = dataobj.map(el => replaceTemplate(tempCard, el)).join('');
const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml);
res.end(output);

    //product page
}else if(pathname==='/product'){
res.writeHead(200,{'content-type':'text/html'})
const product = dataobj[query.id];
const output = replaceTemplate(tempproduct, product);
res.end(output);

    //api page
}else if(pathname==='/api'){

    //__dirname(directory name) || ./
    //get data from data.json and show on localhost server
    //console.log(__dirname);
    //parse is a static method which converts all text into string format 
    // console.log(productData);
    res.writeHead(200,{'content-type':'application/json'})
    res.end(data);
// });


//not found
} else{
    res.writeHead(404,{
        'content-type' : 'text/html',
        'my-own-header' : 'hello world'
    });
    res.end('<h1>page not found</h1>');
}

});

server.listen(8000,'127.0.0.1', ()=>{
    console.log('listenining to requests on port 8000'); 
});