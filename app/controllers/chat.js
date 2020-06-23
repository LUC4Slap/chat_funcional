const { emit } = require("../../config/server");

module.exports.iniciaChat = function (application, req, res) {
  let dadosForm = req.body;
  req.assert("apelido", "Nome ou Apelido é obrigatório").notEmpty();
  req
    .assert("apelido", "Nome ou Apelido deve conter 3 e 15 caracteres")
    .len(3, 15);

  let erros = req.validationErrors();

  if (erros) {
    res.render("index", { validacao: erros });
    return;
  }
  application.get("io").emit(
      "msgParaCliente",
      { apelido: dadosForm.apelido, mensagem: ' Acabou de entrar no chat' }
    );
  res.render("chat", { dadosForm });
};
