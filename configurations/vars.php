<?php
$appName = "Checkout Transparente - Cartão de Débito";

// Defina 1 para 'sandbox' e 2 para 'produção'
$pagSeguroMode = 1;

if($pagSeguroMode == 1){
	$ps_Token = "SEU_TOKEN";
	$ps_pubKeyURL = "https://sandbox.api.pagseguro.com/public-keys/";
	$ps_ordersURL = "https://sandbox.api.pagseguro.com/orders";
	$ps_sessionsURL = "https://sandbox.api.pagseguro.com/checkout-sdk/sessions";
	$ps_clientEmail = "seu_email_pagseguro@mail.com";
	$ps_billIdentification = "MINHALOJA";
	$ps_notificationsURL = "https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/notifications/";
} else if($pagSeguroMode == 2){
	$ps_Token = "SEU_TOKEN";
	$ps_pubKeyURL = "https://api.pagseguro.com/public-keys/";
	$ps_ordersURL = "https://api.pagseguro.com/orders";
	$ps_sessionsURL = "https://api.pagseguro.com/checkout-sdk/sessions";
	$ps_clientEmail = "seu_email_pagseguro@mail.com";
	$ps_billIdentification = "MINHALOJA";
	$ps_notificationsURL = "https://ws.pagseguro.uol.com.br/v2/transactions/notifications/";
}
?>