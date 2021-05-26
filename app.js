//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose");
const session = require("express-session")
const flash = require('connect-flash');
require("./models/Postagem");
const Postagem = mongoose.model("postagens");
require("./models/Categoria");
const Categoria = mongoose.model("categorias");
const usuarios = require("./routes/usuario");
const passport = require('passport');
require("./config/auth")(passport)
// const bodyParser = require('body-parser') - substituido por express


// Configurações
//Sessão
app.use(session({
    secret: "dadoseguro",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next) => {
    //Variável global
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null;
    next()
})

//Body Parser - substituido por express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')
// Mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/sosnear", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao conectar: " + erro)
})

//Public
//Informa que todos arquivos estáticos está na pasta public
app.use(express.static(path.join(__dirname, "public")))


//Rotas
app.get('/', (req, res) => {
    Postagem.find().populate("categoria").sort({ data: "desc" }).then((postagens) => {
        res.render("index", { postagens: postagens })
    }).catch((err) => {
        req.flash("error_msg", "Erro interno")
        res.redirect("/404")
    })

})

app.get('/404', (req, res) => {
    res.send("Erro 404")
})

app.get("/postagem/:slug", (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).then((postagens) => {
        if (postagens) {
            res.render("postagem/index", { postagens: postagens })
        } else {
            req.flash("error_msg", "Essa postagem não existe")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Erro interno")
        res.redirect("/")
    })
})

app.get('/categorias', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("categoria/index", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "Erro interno ao listar categorias")
        res.redirect("/")
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).then((categorias) => {
        if (categorias) {
            Postagem.find({ categoria: categorias._id }).then((postagens) => {
                res.render("categoria/postagens", { postagens: postagens, categorias: categorias })
            }).catch((err) => {
                req.flash("error_msg", "Erro interno ao carregar página da categorias")
                res.redirect("/")
            })
        } else {
            req.flash("error_msg", "Categoria não existe")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Erro interno ao carregar página da  categorias")
        res.redirect("/")
    })
})

app.use('/admin', admin)
app.use("/usuarios", usuarios)



//Outros
const PORT = 8088;
app.listen(PORT, () => {
    console.log("Servidor rodando!")
})