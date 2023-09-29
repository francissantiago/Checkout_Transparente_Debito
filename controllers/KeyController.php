<?php
/*
* Geração de chave pública
*/
class KeyController{
    private $token;
    private $url;

    function __construct($token, $url){
        $this->token = $token;
        $this->url = $url;
    }
	public function getPublicKey(){
		$data['type'] = "card";
		$curl = curl_init($this->url);
		curl_setopt($curl,CURLOPT_HTTPHEADER,Array(
			'Content-Type: application/json',
			'Authorization: '.$this->token
		));
		curl_setopt($curl,CURLOPT_POST,true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER,false);
		curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

		$retorno = curl_exec($curl);
		$err = curl_error($curl);

	    curl_close($curl);

        if ($err){
           return $err;
        } else {
            if(isset(json_decode($retorno)->public_key)){
                return json_decode($retorno)->public_key;
            } else {
                return "Chave pública não localizada!";
            }
        }

	}
}
?>