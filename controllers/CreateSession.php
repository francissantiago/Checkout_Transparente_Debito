<?php
// Criando Sessões
ini_set('display_errors', 1);
/*
* Criação de Sessão
*/
class CreateSession{
    public function getNewSession(){
        $localPath = $_SERVER['DOCUMENT_ROOT'];
        require_once($localPath.'/configurations/vars.php');
        $msg = array();

        $curl = curl_init($ps_sessionsURL);
        curl_setopt($curl, CURLOPT_HTTPHEADER, Array(
            'Content-Type: application/json',
            'Authorization: '.$ps_Token
        ));
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_ENCODING, "");
        curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                
        $retorno = curl_exec($curl);
        $err = curl_error($curl);
                
        curl_close($curl);

        if ($err) {
            $msg = $err;
        } else {
            $msg = json_decode($retorno)->session;
        }

        return $msg;
    }
}

$newSession = new CreateSession();
echo $newSession->getNewSession();
?>