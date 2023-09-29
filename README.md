# Checkout_Transparente_Debito
Checkout Transparente PagSeguro - Cartão de Débito<br>
<br>
Este sistema é uma demonstração da implementação do checkout transparente do PagSeguro, utilizando o meio de pagamento 'Cartão de débito'.<br>
<br>
◘ Informações do PHP:<br>
→ Versão: 8.2.0<br>
• Configuração: <br>
→ curl<br>
→ json<br>
→ mbstring<br>
→ session<br>
→ SimpleXML<br>
<br>
◘ Bibliotecas utilizadas:<br>
• Javascript:<br>
→ Bootstrap 5.3.2<br>
→ Jquery 3.7.1<br>
→ PagSeguro<br>
<br>
• CSS:<br>
→ Boostrap 5.3.2<br>
<br>
Como utilizar:<br>
Altere seu `token` e seu `e-mail` utilizado em sua conta PAGSEGURO no arquivo `configurations/vars.php`, além de definir na variável `$ps_billIdentification` o nome que aparecerá na fatura do cartão do cliente.<br>
No navegador, acesse a página inicial e insira os dados de cartão e usuários para testar.<br>
<br>
Todos os log's solicitados pela homologação do PagSeguro estão disponíveis na pasta `logs`<br>
<br>
Referências da Documentação Oficial PagSeguro:<br>
https://dev.pagbank.uol.com.br/reference/introducao-chaves-publicas<br>
https://dev.pagbank.uol.com.br/reference/criar-pedido-simples<br>
https://dev.pagbank.uol.com.br/reference/criar-pagar-pedido-com-cartao<br>
https://dev.pagbank.uol.com.br/reference/criar-pagar-pedido-com-3ds-validacao-pagbank<br>
