function payTransactionDebitPS(cardData, cc_encrypted, cc_autenthication_code){
	console.log("Enviando dados para a finalização do pagamento...");
	$.ajax({
		url: "controllers/PayControllerDebitCard.php",
		type: "POST",
		data: {
			input_orderID:cardData.input_orderID,
			input_customer_name:cardData.input_customer_name,
			input_customer_cpf:cardData.input_customer_cpf,
			input_customer_email:cardData.input_customer_email,
			input_customerID:cardData.input_customerID,
			input_customer_ddd:cardData.input_customer_ddd,
			input_customer_phone:cardData.input_customer_phone,
			input_orderValue:cardData.input_orderValue,
			cc_encrypted:cc_encrypted,
			input_cc_cvv:cardData.input_cc_cvv,
			input_customer_address:cardData.input_customer_address,
			input_customer_address_number:cardData.input_customer_address_number,
			input_customer_complement:cardData.input_customer_complement,
			input_customer_district:cardData.input_customer_district,
			input_customer_city:cardData.input_customer_city,
			input_customer_cep:cardData.input_customer_cep,
			cc_autenthication_code:cc_autenthication_code
		}, 
		success: function(resultado){
			console.log('Pagamento retornou com sucesso!');
			jsonReturn = JSON.parse(JSON.stringify(resultado));
			if(jsonReturn == 200){
				alert("Pagamento enviado!");
			} else {
				console.log('Pagamento retornou com erro!');
                console.log(resultado);
                alert("Pagamento retornou com erro!");
			}
		},
		error: function(e){
			console.log(e);
            alert("Não foi possível realizar o pagamento! Tente novamente em alguns instantes.");
		}
	});
}