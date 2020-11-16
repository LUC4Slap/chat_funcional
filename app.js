// Importar as configs do servidor
let app = require("./config/server");
// porta de escuta
var server = app.listen(8080, () => {
  console.log("Servidor online");
});

var io = require("socket.io").listen(server);
app.set("io", io);

// Criar a conexao com websocket
io.on("connection", function (socket) {
  console.log("Usuario conectou", socket.id);

  socket.on("disconnect", function () {
    console.log("Usuario desconectou!");
  });

  socket.on("msgParaServidor", function (data) {
    socket.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });
    socket.broadcast.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });
    // Atualizar a relação de participantes
    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit("participantesParaCliente", { apelido: data.apelido });
      socket.broadcast.emit("participantesParaCliente", {
        apelido: data.apelido,
      });
    }
  });
});
