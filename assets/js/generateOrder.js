function genOrderDebitPS(cardData, cc_encrypted, sessionID){
	console.log("Gerando ordem de pagamento!");
	const request = {
		data: {
			customer: {
				name: cardData.input_customer_name,
				email: cardData.input_customer_email,
				phones: [
					{
						country: '55',
						area: cardData.input_customer_ddd,
						number: cardData.input_customer_phone,
						type: 'MOBILE'
					}
				]
			},
			paymentMethod: {
				type: 'DEBIT_CARD',
				installments: 1,
				card: {
					number: cardData.input_cc_number,
					expMonth: cardData.input_cc_month,
					expYear: cardData.input_cc_year,
					holder: {
						name: cardData.input_customer_name
					}
				}
			},
			amount: {
				value: cardData.input_orderValue,
				currency: 'BRL'
			},
			billingAddress: {
				street: cardData.input_customer_address,
				number: cardData.input_customer_address_number,
				complement: cardData.input_customer_complement,
				regionCode: 'MG',
				country: 'BRA',
				city: cardData.input_customer_city,
				postalCode: cardData.input_customer_cep
			},
			dataOnly: false
		}
	}

	console.log("Abrindo sessão de pagamento");
	console.log("Sessão: " + sessionID);
	PagSeguro.setUp({
		session: sessionID,
		env: 'SANDBOX'
	});

	console.log("Iniciando requisição 3DS");
	PagSeguro.authenticate3DS(request).then(result => {
		console.log("Resultados 3DS recebidos!");
		console.log(result);
			let paymentStatus = result.status;
			let authenticationStatus = result.authenticationStatus;
			switch (paymentStatus) {
				case 'AUTH_FLOW_COMPLETED':
					let cc_autenthication_code = result.id;  // Seguir o fluxo para cobrança repassando o authenticationId para a API de Cobrança.
					console.log(cc_autenthication_code);
					if(authenticationStatus === 'AUTHENTICATED'){
						payTransactionDebitPS(cardData, cc_encrypted, cc_autenthication_code);
					} else {
						alert("CARTÃO NÃO VALIDADO!</b><br>Pedido cancelado! Favor realizar novo pedido.");
					}
				break;
				case 'AUTH_NOT_SUPPORTED':   // Cartão não elegível ao 3DS. Para o meio de pagamento `DÉBITO` a transação deve ser finalizada após este retorno.
					alert("CARTÃO NÃO SUPORTADO!</b><br> Por favor, realize um novo pedido.");
				break;
				case 'CHANGE_PAYMENT_METHOD':  // Solicite que o comprador troque o meio de pagamento, pois o mesmo não será aceito na cobrança.
					alert("Erro ao processar pagamento, por favor altere seu cartão e tente novamente!<")
				break;
			}
	}).catch(err => {
		console.log("Erro fatal!");
		if (err instanceof PagSeguro.PagSeguroError) {   // No objeto de err podem ser encontrados mais detalhes sobre o erro.
			console.log(err.message)
		}
		alert("Pedido cancelado! Favor realizar novo pedido.");
	});
};