function createSessionDebitPS(cardData, cc_encrypted){
	console.log('Criando sessão de pagamento!');
	$.ajax({
		type: "POST",
		url: "controllers/CreateSession.php",
		success: function (response) {
			console.log("Criação de sessão realizada com sucesso!");
			jsonReturn = JSON.parse(JSON.stringify(response));
			sessionID = jsonReturn;
			genOrderDebitPS(cardData, cc_encrypted, sessionID);
		},
		error: function (error) {
			jsonReturn = JSON.parse(JSON.stringify(error));
			console.error("Erro na criação da sessão");
			console.log(jsonReturn);
            alert("Erro ao criar sessão de pagamento!");
		}
	});
};