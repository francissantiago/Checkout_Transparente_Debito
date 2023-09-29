$(document).ready(function(){
	$('#payBTN').on('click', function(){
		console.log('Validando dados do formulário...');
		let cardData = {
			// Dados do cartão
			input_orderType : $("#input_orderType").val(),
			input_pubKey : $("#input_pubKey").val(),
			input_cc_number : $("#input_cc_number").val().replace(/\s+/g, ''),
			input_cc_month : $("#input_cc_month").val(),
			input_cc_year : $("#input_cc_year").val(),
			input_cc_cvv : $("#input_cc_cvv").val(),
			input_customer_name : $("#input_customer_name").val(),

			// Dados do cliente
			input_customerID : $("#input_customerID").val(),
			input_customer_email : $("#input_customer_email").val(),
			input_customer_ddd : $("#input_customer_ddd").val(),
			input_customer_phone : $("#input_customer_phone").val().replace(/[-\s]/g, ''),
			input_customer_cpf : $("#input_customer_cpf").val().replace(/[.-]/g, ''),
			input_customer_address : $("#input_customer_address").val(),
			input_customer_address_number : $("#input_customer_address_number").val(),
			input_customer_complement : $("#input_customer_complement").val(),
			input_customer_district : $("#input_customer_district").val(),
			input_customer_city : $("#input_customer_city").val(),
			input_customer_cep : $("#input_customer_cep").val(),

			// ID do pedido
			input_orderID : $("#input_orderID").val(),
			input_orderValue : $("#input_orderValue").val().replace(/\./g, ''),
		}

		if(!cardData.input_orderType){
			alert("Tipo do cartão em branco!");
		} else if(!cardData.input_pubKey){
            alert("PublicKey em branco!");
		} else if(!cardData.input_cc_number){
            alert("Número de cartão em branco!");
		} else if(!cardData.input_cc_month){
            alert("Mês de validade em branco!");
		} else if(!cardData.input_cc_year){
            alert("Ano de validade em branco!");
		} else if(!cardData.input_cc_cvv){
            alert("CVV em branco!");
		} else if(!cardData.input_customer_name){
            alert("Nome do Titular em branco!");
		} else if(!cardData.input_customerID){
            alert("ID de cliente em branco!");
		} else if(!cardData.input_customer_email){
            alert("E-mail em branco!");
		} else if(!cardData.input_customer_ddd){
            alert("DDD em branco!");
		} else if(!cardData.input_customer_phone){
            alert("Telefone em branco!");
		} else if(!cardData.input_customer_cpf){
			alert("CPF em branco!");
		} else if(!cardData.input_customer_address){
			alert("Endereço em branco!");
		} else if(!cardData.input_customer_address_number){
			alert("Nº da Residencia em branco!");
		} else if(!cardData.input_customer_complement){
			alert("Complemento em branco!");
		} else if(!cardData.input_customer_district){
			alert("Bairro em branco!");
		} else if(!cardData.input_customer_city){
			alert("Cidade em branco!");
		} else if(!cardData.input_customer_cep){
			alert("CEP em branco!");
		} else if(!cardData.input_orderID){
			alert("ID de Pedido em branco!");
		} else if(!cardData.input_orderValue){
			alert("Valor do pedido em branco!");
		} else {
            // Chamar função de encriptação de dados
            if (validaCPF($("#input_customer_cpf").val())) {
                encryptCardData(cardData);
            } else {
                alert("CPF inválido!");
            }
		}
	});
	
	// Validar CPF
	function validaCPF(cpf) {
		exp = /\.|-/g;
		cpf = cpf.toString().replace(exp, "");
		var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
		var soma1 = 0,
				soma2 = 0;
		var vlr = 11;
		for (i = 0; i < 9; i++) {
			soma1 += eval(cpf.charAt(i) * (vlr - 1));
			soma2 += eval(cpf.charAt(i) * vlr);
			vlr--;
		}
		soma1 = (((soma1 * 10) % 11) === 10 ? 0 : ((soma1 * 10) % 11));
		soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
		if (cpf === "11111111111" || cpf === "22222222222" || cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" || cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" || cpf === "99999999999" || cpf === "00000000000") {
			var digitoGerado = null;
		} else {
			var digitoGerado = (soma1 * 10) + soma2;
		}
		if (digitoGerado !== digitoDigitado) {
			return false;
		}
		return true;
	}
});