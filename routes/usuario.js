const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require('passport')

function isValidCPF(cpf) {
    if (typeof cpf !== "string") {
        return false
    } else {
        cpf = cpf.replace(/[\s.-]*/igm, '')
    }

    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
}

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

router.post("/registro", (req, res) => {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "E-mail inválido" })
    }

    if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
        erros.push({ texto: "CPF inválido" })
    }

    var cpfv = req.body.cpf

    if (isValidCPF(cpfv) == false) {
        erros.push({ texto: "CFP inválido" })
    }


    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha inválida" })
    }

    if (req.body.senha.length < 4) {
        erros.push({ texto: "Senha curta, o minimo são 4 caracteres" })
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "As senhas são distintas, tente novamente" })
    }

    if (erros.length > 0) {
        res.render("usuarios/registro", { erros: erros })
    } else {
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Já existe uma conta com esse e-mail no nosso sistema")
                res.redirect("/usuarios/registro")
            } else {
                Usuario.findOne({ cpf: req.body.cpf }).then((usuario) => {
                    if (usuario) {
                        req.flash("error_msg", "Já existe uma conta com esse cpf no nosso sistema")
                        res.redirect("/usuarios/registro")
                    } else {
                        const newUsuario = new Usuario({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: req.body.senha,
                            cpf: req.body.cpf
                        })

                        bcrypt.genSalt(10, (erro, salt) => {
                            bcrypt.hash(newUsuario.senha, salt, (erro, hash) => {
                                if (erro) {
                                    req.flash("error_msg", "Erro ao salvar usuário")
                                    res.redirect("/")
                                }

                                newUsuario.senha = hash

                                newUsuario.save().then(() => {
                                    req.flash("success_msg", "Usuario cadastrado com sucesso.")
                                    res.redirect("/")
                                }).catch((err) => {
                                    req.flash("error_msg", "Erro ao criar usuário, tente novamente")
                                    res.redirect("/usuarios/registro")
                                })
                            })
                        })
                    }
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })

    }
})


router.get("/login", (req, res) => {
    res.render("usuarios/login")
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect("/")
})


router.get("/edit/:id", (req, res) => {
    Usuario.findOne({ _id: req.params.id }).then((user) => {
        res.render("usuarios/editusuario", { user: user })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao editar usuário")
        res.redirect("/")
    })
})

router.post("/edit", (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "E-mail inválido" })
    }

    if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
        erros.push({ texto: "CPF inválido" })
    }

    let cpfv = req.body.cpf

    if (isValidCPF(cpfv) == false) {
        erros.push({ texto: "CFP inválido" })
    }


    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha inválida" })
    }

    if (req.body.senha.length < 4) {
        erros.push({ texto: "Senha curta, o minimo são 4 caracteres" })
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "As senhas são distintas, tente novamente" })
    }

    if (erros.length > 0) {
        res.render("/editusuario", { erros: erros })
    } else {
        Usuario.findOne({ _id: req.body.id }).then((usuario) => {
            usuario.nome = req.body.nome
            usuario.email = req.body.email
            usuario.senha = req.body.senha
            usuario.cpf = req.body.cpf

            Usuario.findOne({ email: req.body.email }).then((usuario) => {
                if (usuario) {
                    req.flash("error_msg", "Já existe uma conta com esse e-mail no nosso sistema")
                    res.redirect("/")
                } else {
                    Usuario.findOne({ cpf: req.body.cpf }).then((usuario) => {
                        if (usuario) {
                            req.flash("error_msg", "Já existe uma conta com esse cpf no nosso sistema")
                            res.redirect("usuarios/editusuario")
                        } else {
                            bcrypt.genSalt(10, (erro, salt) => {
                                bcrypt.hash(usuario.senha, salt, (erro, hash) => {
                                    if (erro) {
                                        req.flash("error_msg", "Erro ao editar usuário")
                                        res.redirect("usuarios/editusuario")
                                    }

                                })
                                usuario.senha = hash

                                usuario.save().then(() => {
                                    req.flash("success_msg", "Usuario cadastrado com sucesso.")
                                    res.redirect("/")
                                })

                            }).catch((err) => {
                                req.flash("error_msg", "Erro ao criar usuário, tente novamente")
                                res.redirect("/")
                            })
                        }
                    })
                }
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno")
                res.redirect("/")
            })
        })

    }
})


module.exports = router