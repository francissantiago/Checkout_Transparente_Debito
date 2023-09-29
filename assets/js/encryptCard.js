function encryptCardData(cardData){
	console.log('Encriptando dados do cartão...');
	let card = PagSeguro.encryptCard({
		publicKey: cardData.input_pubKey,
		holder: cardData.input_customer_name,
		number: cardData.input_cc_number,
		expMonth: cardData.input_cc_month,
		expYear: cardData.input_cc_year,
		securityCode: cardData.input_cc_cvv
	});

	const hasErrors = card.hasErrors;
	if(hasErrors === true){
		const errors = card.errors;
		console.log('Erro ao criptografar o cartão!');
		console.log(JSON.stringify({"hasErrors: ":hasErrors, "errors: ":errors}));
		alert("Erro ao encriptar dados do cartão!");
	} else {
		let cc_encrypted = card.encryptedCard;
		console.log('Criptografia realizada com sucesso!');
		createSessionDebitPS(cardData, cc_encrypted);
	}
};