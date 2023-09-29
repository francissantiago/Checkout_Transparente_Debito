<?php
header("Content-Type: application/json; charset=UTF-8");
$localPath = $_SERVER['DOCUMENT_ROOT'];
require_once($localPath.'/configurations/vars.php');
require_once($localPath.'/controllers/LogsController.php');
$msg = array();
if(isset($_POST['cc_encrypted'])){
	// Dados do pedido
	$input_orderID = $_POST['input_orderID'];
	$input_orderValue = $_POST['input_orderValue'];

	// Dados do cliente
	$input_customerID = $_POST['input_customerID'];
	$input_customer_name = $_POST['input_customer_name'];
	$input_customer_cpf = strval($_POST['input_customer_cpf']);
	$input_customer_email = $_POST['input_customer_email'];
	$input_customer_ddd = $_POST['input_customer_ddd'];
	$input_customer_phone = $_POST['input_customer_phone'];

	// Dados do cartão
	$cc_encrypted = $_POST['cc_encrypted']; // Retorno com dados do cartão encriptado
	$input_cc_cvv = strval($_POST['input_cc_cvv']);
	$cc_autenthication_code = $_POST['cc_autenthication_code']; // Retorno do ID 3DS criado após confirmação do cliente na tela

	$input_customer_address = $_POST['input_customer_address'];
	$input_customer_address_number = strval($_POST['input_customer_address_number']);
	$input_customer_complement = $_POST['input_customer_complement'];
	$input_customer_district = $_POST['input_customer_district'];
	$input_customer_city = $_POST['input_customer_city'];
	$input_customer_cep = strval($_POST['input_customer_cep']);

	$data["reference_id"] = $input_orderID;
	$data["customer"] = [
		"name"=> $input_customer_name,
		"email"=> $input_customer_email,
		"tax_id"=> $input_customer_cpf,
		"phones"=> [
			[
				"country"=> "55",
				"area"=> $input_customer_ddd,
				"number"=> $input_customer_phone,
				"type"=> "MOBILE"
			]
		]
	];
	$data["items"]=[
		[
			"reference_id"=> $input_orderID,
			"name"=> "Pedido #000".$input_orderID,
			"quantity"=> 1,
			"unit_amount"=> $input_orderValue
		]
	];
	$data["shipping"]= [
		"address"=> [
			"street"=> $input_customer_address,
			"number"=> $input_customer_address_number,
			"complement"=> $input_customer_complement,
			"locality"=> $input_customer_district,
			"city"=> $input_customer_city,
			"region_code"=> "MG",
			"country"=> "BRA",
			"postal_code"=> $input_customer_cep
		]
	];
	$data["charges"] = [
		[
			"reference_id"=> $input_orderID,
			"description"=> "Pedido: ".$input_orderID,
			"amount"=> [
				"value"=> $input_orderValue,
				"currency"=> "BRL"
			],
			"payment_method"=> [
				"soft_descriptor"=>$ps_billIdentification,
				"type"=> "DEBIT_CARD",
				"installments"=> 1,
				"capture"=> true,
				"card"=> [
					"encrypted"=>$cc_encrypted,
					"security_code"=> $input_cc_cvv,
					"holder"=> [
						"name"=> $input_customer_name
					],
					"store"=> false
				],
				"authentication_method" => [
				 "type" => "THREEDS",
				 "id" => $cc_autenthication_code
			 ]
			]
		]
	];
	$curl = curl_init($ps_ordersURL);
	curl_setopt($curl, CURLOPT_HTTPHEADER, Array(
		'Content-Type: application/json; charset=UTF-8',
		'Authorization: '.$ps_Token
	));
	curl_setopt($curl ,CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

	$retorno = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);

	$payloadLog = new LogsController(json_encode($data));
	$payloadLog->log_payload();

	if ($err){
		$msg = "Ocorreu um erro! Detalhes no log.";
		$err_log = new LogsController($err);
		$err_log->err_log();
	} else {
		$msg = 200;
		$log = new LogsController($retorno);
		$log->log();
	}
} else {
	$msg = "Criptografia de cartão não executada!";
}

echo json_encode($msg);
?>