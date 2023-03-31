const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const port = process.env.PORT || 8000;

const puppeteer = require('puppeteer');



const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs")
app.set("views",template_path);
hbs.registerPartials(partial_path);

// console.log(process.env.SECRET_KEY);


app.get("/",(req,res)=>{
    // res.send("This is our website");
    res.render("index");
})

app.get("/ipec",(req,res)=>{
    const loginlink='http://ipeclive.ipec.org.in/Login.aspx';

    const email='1910127';
    const password='areeb1224';
    (async function(){
        try{
            let browserInstance=await puppeteer.launch({
                headless:false,
                args:['--start-maximized'],
                defaultViewport:null
        })
    
        let newTab= await browserInstance.newPage();
        
        await newTab.goto(loginlink);
        await newTab.type(".form-control.username",email,{delay:50});
        await newTab.type(".form-control.password",password,{delay:50});
        await newTab.click(".btn.btn-primary.btn-customized",{delay:50});
        await waitAndClick("a[href='../Students/StudentWiseAttendance.aspx']",newTab);
        await waitAndClick(`input[type="submit"]`,newTab);
        }catch(error){
            console.log(error);
        }
    })()
    
    async function waitAndClick(selector,cpage)
    {
        await cpage.waitForSelector(selector);
        let selectorClick=cpage.click(selector);
        return selectorClick;
    }
    
})

app.get("/instagram",(req,res)=>{
    const loginlink='https://www.instagram.com/accounts/login/';

    const email='areeb6002';
    const password='areeb1224';

    (async function(){
        try{
            let browserInstance=await puppeteer.launch({
                headless:false,
                args:['--start-maximized'],
                defaultViewport:null
        })
    
        let newTab= await browserInstance.newPage();
        
        await newTab.goto(loginlink);
        const f=await newTab.$('[name="username"]');
        f.type(email);
        // await newTab.type(".form-control.password",password,{delay:50});
        // await newTab.click(".btn.btn-primary.btn-customized",{delay:50});
        // await waitAndClick("a[href='../Students/StudentWiseAttendance.aspx']",newTab);
        // await waitAndClick(`input[type="submit"]`,newTab);
        }catch(error){
            console.log(error);
        }
    })()
    
    async function waitAndClick(selector,cpage)
    {
        await cpage.waitForSelector(selector);
        let selectorClick=cpage.click(selector);
        return selectorClick;
    }

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.instagram.com/accounts/login/');
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', email);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');
        // Add a wait for some selector on the home page to load to ensure the next step works correctly
        await page.pdf({path: 'page.pdf', format: 'A4'});
        await browser.close();
      })();
    

   
    
})

app.get("/facebook",(req,res)=>{
    const loginlink='https://www.facebook.com/';

    const email='mohdareeb.1224@gmail.com';
    const password='engineer@ipec';

    (async function(){
        try{
            let browserInstance=await puppeteer.launch({
                headless:false,
                args:['--start-maximized'],
                defaultViewport:null
        })
    
        let newTab= await browserInstance.newPage();
        
        await newTab.goto(loginlink);
        await newTab.type('#email',email,{delay:50});
        await newTab.type('#pass',password,{delay:50});
        // await newTab.type(".form-control.password",password,{delay:50});
        // await newTab.click(".btn.btn-primary.btn-customized",{delay:50});
        // await waitAndClick("a[href='../Students/StudentWiseAttendance.aspx']",newTab);
        // await waitAndClick(`input[type="submit"]`,newTab);
        await newTab.click('button[type="submit"]');
    }catch(error){
            console.log(error);
        }
    })()

})


app.listen(port,(res,req)=>{
    console.log("This website starts at port number 8000");
});