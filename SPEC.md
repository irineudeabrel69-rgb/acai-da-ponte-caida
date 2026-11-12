# Especificação do site — Açaí da Ponte

## 1. Objetivo

Criar um site simples e rápido para a açaiteria de bairro Açaí da Ponte, em Sena Madureira (AC). A pessoa deve conseguir consultar se a loja está aberta, montar um pedido para retirada e enviá-lo à loja pelo WhatsApp, com poucos toques e usando principalmente o celular.

## 2. Público e contexto de uso

- Clientes locais ou visitantes que acessam o site pelo celular, inclusive na rua e com apenas uma mão disponível.
- O fluxo deve funcionar bem em telas pequenas, com texto legível, áreas de toque generosas e sem exigir cadastro.
- O site deve informar claramente que o pedido é para retirada na loja.

## 3. Conteúdo e configuração do negócio

Manter os dados variáveis do negócio em um único local de configuração, separado da apresentação das páginas. Esse local deve conter:

- Nome da loja: **Açaí da Ponte**.
- Cidade/UF: **Sena Madureira (AC)**.
- Número de WhatsApp da loja, em formato internacional apropriado para gerar o link de conversa.
- Horários de funcionamento por dia da semana, incluindo dias fechados.
- Fuso horário usado para calcular o estado aberto/fechado: horário local de Sena Madureira (AC).
- Tamanhos disponíveis, nomes, descrições opcionais e preços.
- Complementos disponíveis, nomes, descrições opcionais e preços.
- Limite de complementos por pedido: **3**.
- Eventuais avisos de disponibilidade ou observações da loja.

Os preços e itens do cardápio não devem estar espalhados por componentes ou telas. Alterar a configuração do cardápio deve atualizar a listagem, os seletores, os totais e a mensagem do pedido.

### Dados ainda necessários antes da publicação

O número de WhatsApp já foi informado e consta na seção 12. Permanecem pendentes os horários por dia, os preços e a confirmação dos tamanhos e complementos que a loja realmente oferece. Por padrão, nenhum item inicia selecionado. A seção 12 define o comportamento enquanto os horários ainda não estiverem configurados.

## 4. Estrutura da página

Uma página única, em ordem vertical, otimizada para rolagem no celular:

1. **Topo da loja** — nome/logo textual, indicador de estado aberto/fechado e horário de funcionamento de hoje.
2. **Cardápio** — seção de tamanhos de copo e seção de complementos, com preços visíveis.
3. **Montagem do pedido** — escolha do tamanho e de até três complementos, resumo e total atualizado.
4. **Ação de envio** — botão para enviar o pedido pelo WhatsApp para retirada.
5. **Informação de retirada** — deixar explícito que o pedido será retirado na loja; não oferecer entrega sem configuração específica.

Não é necessário criar conta, carrinho persistente, pagamento online ou painel administrativo para esta primeira versão.

## 5. Estado da loja e horário

- Exibir perto do nome da loja um rótulo textual: **Aberta** ou **Fechada**. A cor pode reforçar o estado, mas não deve ser o único sinal.
- Mostrar o horário de funcionamento do dia atual. Se a loja não abrir naquele dia, informar **Fechado hoje**.
- Calcular o estado com base nos horários configurados e no fuso local de Sena Madureira. Considerar corretamente intervalos que atravessem a meia-noite, caso sejam configurados.
- Se não houver horário configurado, informar que o horário ainda não está disponível e não calcular um estado presumido.

## 6. Cardápio e montagem do pedido

### Tamanhos

- Mostrar cada tamanho como uma opção selecionável, com nome e preço em destaque.
- O pedido exige a escolha de exatamente um tamanho.
- O tamanho escolhido deve ficar visualmente evidente e expor seu estado selecionado a tecnologias assistivas.

### Complementos

- Mostrar cada complemento com nome e preço.
- Permitir selecionar de zero a três complementos.
- Informar o limite antes ou durante a seleção (por exemplo, **Escolha até 3 complementos**).
- Ao atingir três seleções, impedir uma quarta e explicar de forma breve que o limite foi alcançado. Não apagar seleções já feitas.
- Cada complemento é cobrado conforme o preço configurado; mostrar esse valor junto à opção.

### Total e controles

- Atualizar o total imediatamente a cada seleção ou remoção.
- Fórmula: **preço do tamanho + soma dos preços dos complementos selecionados**.
- Exibir o total em reais (R$), usando formatação brasileira.
- Oferecer um controle claro para remover complementos individualmente e trocar o tamanho.
- Oferecer **Limpar pedido** (ou **Recomeçar pedido**) para remover o tamanho e todos os complementos. Pedir confirmação não é necessário; a ação deve ser fácil de desfazer refazendo as escolhas.
- O botão de envio fica desabilitado até haver tamanho selecionado e WhatsApp configurado. Se não houver um tamanho selecionado, orientar a pessoa sobre o que falta.
- Se os dados essenciais do cardápio não estiverem configurados, não permitir enviar um pedido incompleto ou com preço incorreto.

## 7. Envio pelo WhatsApp

- Ao tocar em **Enviar pedido pelo WhatsApp**, abrir uma conversa com o número configurado da loja e preencher uma mensagem pronta, codificada corretamente para uso em URL.
- A mensagem deve conter, em texto legível:
  - identificação de que é um pedido para retirada;
  - nome do tamanho e respectivo preço;
  - lista de complementos escolhidos e respectivos preços, ou indicação de que não foram escolhidos;
  - total calculado;
  - uma frase curta solicitando confirmação do pedido pela loja.
- Abrir o WhatsApp (aplicativo ou versão web, conforme o dispositivo). O cliente ainda confirma/envia a mensagem dentro do WhatsApp; o site não deve afirmar que o pedido já foi recebido sem essa confirmação.
- Se o número não estiver configurado, explicar que o contato ainda não está disponível e não criar um link inválido.

## 8. Direção visual e acessibilidade

Usar somente a paleta indicada como base visual:

- **Fundo claro:** `#FAF7F2`.
- **Cor principal / títulos e ações secundárias:** `#4B1F5E`.
- **Destaque de status aberto e confirmação:** `#2E7D32`.

Garantir contraste suficiente entre texto e fundo; não usar o verde como único indicador de que a loja está aberta. Reservar o roxo para hierarquia e ações, e manter preços e total fáceis de localizar. A interface deve ter foco visível para navegação por teclado, rótulos acessíveis para seletores e controles, e não depender apenas de cor para indicar seleção, erro ou estado.

## 9. Requisitos de experiência móvel

- Priorizar uma coluna e leitura vertical em telas estreitas.
- Usar botões e opções com área de toque confortável e espaçamento suficiente para evitar toques acidentais.
- Manter o total e a ação principal fáceis de encontrar durante a montagem do pedido, sem cobrir o conteúdo nem impedir a rolagem.
- Usar linguagem curta e direta em português do Brasil.
- Evitar etapas, modais e campos desnecessários; o envio não deve exigir nome, endereço ou cadastro.
- Apresentar os preços junto das opções, sem depender de abrir detalhes.

## 10. Requisitos funcionais resumidos

1. Exibir estado aberto/fechado e horário de hoje com base na configuração.
2. Apresentar tamanhos, complementos e preços a partir de uma única fonte de dados.
3. Exigir um tamanho e permitir até três complementos.
4. Recalcular o total em tempo real.
5. Permitir trocar/remover escolhas e limpar o pedido por completo.
6. Enviar uma mensagem preenchida ao WhatsApp configurado, para retirada.
7. Bloquear ou explicar claramente ações quando dados obrigatórios estiverem ausentes.

## 11. Critérios de aceite

- No celular, é possível identificar rapidamente o estado da loja e o horário de hoje.
- Todos os tamanhos e complementos apresentam seus preços.
- Não é possível manter mais de três complementos selecionados.
- A escolha ou remoção de qualquer item atualiza o total corretamente em reais.
- É possível remover um complemento, trocar o tamanho e limpar o pedido.
- O botão de WhatsApp só fica disponível com tamanho escolhido e telefone configurado.
- A mensagem pronta inclui itens, preços, total e indicação de retirada, e abre a conversa da loja.
- Com dados de horário ausentes, a interface não inventa o estado da loja.
- Com cardápio ou contato incompletos, a interface não envia um pedido com dados inválidos.
- A página é utilizável em tela pequena, com uma mão, e os estados não dependem apenas de cor.

## 12. Dados confirmados e decisões de configuração

Esta seção atualiza os dados e pendências anotados anteriormente.

- WhatsApp da loja: **+55 68 99941-1587**. Para o link `wa.me`, usar apenas os dígitos no formato internacional: `5568999411587`.
- Cidade/UF: **Sena Madureira (AC)**.
- CEP informado: **69940-000**.
- O endereço completo e um ponto de referência ainda precisam ser informados. O CEP sozinho não deve ser apresentado como endereço de retirada.
- Os horários de funcionamento continuam pendentes.
- Os preços continuam pendentes e devem ser definidos pelo dono; nenhuma pesquisa de outros cardápios substitui os preços reais da loja.
- A primeira versão terá um arquivo central de configuração do cardápio, sem painel administrativo. A spec deve deixar claro que alterar esse arquivo pode exigir ajuda técnica.
- A disponibilidade de cada tamanho e complemento será configurável como disponível/esgotado. Itens esgotados permanecem visíveis com indicação textual e não podem ser selecionados; o dono pode reativá-los na configuração.
- Com horário não configurado, mostrar **Horário não informado** e permitir a montagem e envio pelo WhatsApp, pois o cliente pode conversar com a loja. A mensagem deve pedir confirmação de disponibilidade. Com a loja fora do horário configurado, manter o envio possível e avisar que a resposta pode demorar.

## 13. Cardápio inicial sugerido

Lista de partida baseada em tamanhos comuns de copo e complementos encontrados em cardápios brasileiros. É uma sugestão editável, não uma confirmação de que a loja vende todos esses itens. O dono deve remover o que não oferece, confirmar disponibilidade e informar os preços antes da publicação.

### Tamanhos sugeridos

- **300 ml** — individual pequeno.
- **500 ml** — individual médio.
- **700 ml** — individual grande.

Os volumes são uma proposta de cardápio inicial; podem ser trocados pelos tamanhos e recipientes que a loja realmente usa. O preço de cada tamanho está pendente.

### Complementos sugeridos

Para manter a escolha simples, mostrar uma lista curta por categorias e permitir até três itens no pedido:

- **Frutas:** banana, morango.
- **Clássicos:** granola, leite em pó, leite condensado, paçoca.
- **Outras opções, se a loja oferecer:** amendoim, coco ralado, aveia, tapioca/flocos de tapioca, Ovomaltine.
- **Opção regional a confirmar com o dono:** farinha de tapioca ou farinha de mandioca, servidas à parte. A forma tradicional de consumir açaí varia na região amazônica; não presumir que essa opção integra o preparo doce em copo.

Cada complemento precisa de preço próprio, mesmo quando o preço for R$ 0,00. A lista de produção e disponibilidade deve ficar em um único arquivo de configuração.

## 14. Padrões de compra online como referência

Usar padrões funcionais familiares de grandes lojas online, sem copiar marca, identidade visual ou telas específicas:

- Mostrar preço e disponibilidade junto de cada opção.
- Manter o resumo e o total atualizados enquanto a pessoa escolhe.
- Tornar claro o que foi selecionado e permitir alteração ou remoção sem perder o restante do pedido.
- Evitar obrigar cadastro; a compra termina numa conversa com a loja.
- Indicar os próximos passos e o que acontecerá ao tocar no botão do WhatsApp.
- Não sugerir entrega, pagamento ou prazo que a loja não confirmou.
- Em caso de item esgotado, explicar a indisponibilidade e oferecer outras opções sem apagar escolhas já feitas.
- Tratar endereço de retirada, contato e política de confirmação de forma clara e próxima do fechamento.

## 15. Aplicação das 10 heurísticas de Nielsen

As heurísticas são princípios de avaliação e devem orientar telas, textos e estados do site:

1. **Visibilidade do estado do sistema:** estado aberto/fechado, item selecionado/esgotado, limite de três complementos, total e resultado da ação sempre visíveis e atualizados.
2. **Correspondência entre sistema e mundo real:** usar termos familiares como copo, complemento, retirada e reais; ordenar escolhas como o cliente faz o pedido.
3. **Controle e liberdade do usuário:** permitir trocar tamanho, remover qualquer complemento e limpar/recomeçar o pedido.
4. **Consistência e padrões:** manter o mesmo formato de preço, seleção, botões e mensagens em todo o site; usar convenções comuns de toque e WhatsApp.
5. **Prevenção de erros:** impedir quarta seleção, bloquear item esgotado, validar preço e telefone configurados, e não criar link inválido.
6. **Reconhecimento em vez de memorização:** deixar preço, disponibilidade, itens escolhidos, limite e total na tela, sem exigir que a pessoa lembre escolhas anteriores.
7. **Flexibilidade e eficiência:** permitir pedido direto sem conta ou etapas dispensáveis; manter ação principal acessível no celular.
8. **Design estético e minimalista:** priorizar cardápio, escolhas, total e retirada; evitar banners, pop-ups e informações que não ajudam a concluir o pedido.
9. **Ajudar a reconhecer, diagnosticar e corrigir erros:** mensagens curtas devem dizer o que faltou e como corrigir, por exemplo, “Escolha um tamanho para continuar” ou “Este complemento está esgotado”.
10. **Ajuda e documentação:** incluir instrução breve junto ao fluxo (como funciona a retirada e o envio pelo WhatsApp), sem obrigar a pessoa a consultar uma página de ajuda separada.

## 16. Imagens e licença de uso

- Usar imagens reais de açaí com licença que permita uso comercial, respeitando as condições da licença vigente no momento da publicação.
- Imagem inicial de referência: foto “Acai bowls with fruit and granola”, de Vicky Ng, disponível no Unsplash: https://unsplash.com/photos/acai-bowls-with-fruit-and-granola-yIh0i6TYGrs . A página identifica a imagem como gratuita sob a Unsplash License. Crédito ao fotógrafo é opcional, mas recomendado.
- Alternativa de catálogo: https://www.pexels.com/photo/close-up-photo-of-acai-bowl-12273052/ . A Pexels informa que suas imagens são licenciadas para uso pessoal e comercial gratuito, sem obrigação de atribuição; verificar a licença e a página específica antes de baixar/publicar.
- Imagens de banco são ilustrativas e não devem ser apresentadas como foto real dos produtos da Açaí da Ponte. Priorizar fotos próprias da loja quando disponíveis.
- Guardar junto ao projeto a URL de origem, nome do fotógrafo e licença consultada para cada imagem utilizada; não hotlinkar a página de busca. Baixar o arquivo permitido e otimizar tamanho/formato para celular.

## 17. Pendências finais antes da publicação

Os dados básicos para montar a primeira versão foram informados na seção 18. Antes da publicação comercial, conferir se todos os complementos sugeridos estão disponíveis e se os três complementos sem custo adicional correspondem à política da loja. A foto de banco é provisória e pode ser substituída por fotos reais dos produtos.

## Referências consultadas

- Nielsen Norman Group, “10 Usability Heuristics for User Interface Design”: https://www.nngroup.com/articles/ten-usability-heuristics/ .
- WhatsApp Help Center, “How to use click to chat”: https://faq.whatsapp.com/5913398998672934 .
- Unsplash Help Center, licença para projetos comerciais: https://help.unsplash.com/en/articles/2612315-can-i-use-unsplash-images-for-personal-or-commercial-projects .
- Pexels Help Center, licença de fotos e vídeos: https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels .
- Exemplo de cardápio brasileiro consultado para tamanhos e complementos: https://casadoacai.com.br/wp-content/uploads/2022/07/Cardapio-Web-Completo-novo.pdf .

## 18. Dados confirmados pelo dono

- Funcionamento: todos os dias, das **15h às 22h**. A interpretação de “a partir das 15, até as 22” é horário diário; caso existam dias fechados, atualizar a configuração.
- Endereço para retirada: **Rua Maranhão, 201, Centro, Sena Madureira - AC, CEP 69940-000**.
- Copo 300 ml: **R$ 12,00**.
- Copo 500 ml: **R$ 18,00**.
- Copo 700 ml: **R$ 21,00**.
- Complementos selecionáveis até o limite de três, incluídos no preço do copo (R$ 0,00 adicional). Esta é uma regra inicial inferida porque foram informados preços dos copos, mas não preços extras.
- Complementos iniciais: banana, morango, granola, leite em pó, leite condensado, paçoca, amendoim, coco ralado, aveia e flocos de tapioca. Confirmar disponibilidade real e manter cada item configurável.
- Endereço e localização devem aparecer no site; oferecer link para abrir busca do endereço no mapa.
- Com os dados acima preenchidos, as pendências impeditivas para a primeira versão estão resolvidas. A loja ainda deve confirmar se os complementos sugeridos estão de fato disponíveis.

## 19. Extras, resumo ao vivo e repetição do pedido

- Permitir até três complementos inclusos por copo. Quando os três estiverem escolhidos, os demais itens continuam selecionáveis como extras cobrados por unidade.
- Valores iniciais sugeridos para extras: banana R$ 2,00; morango R$ 3,00; granola R$ 2,00; leite em pó R$ 2,00; leite condensado R$ 2,00; paçoca R$ 2,00; amendoim R$ 2,00; coco ralado R$ 2,00; aveia R$ 1,50; flocos de tapioca R$ 2,50. São valores propostos e devem ser confirmados pelo dono.
- Mostrar em tempo real no resumo o copo, cada complemento incluso ou extra, preço individual, remoção de itens e total atualizado. A ação de WhatsApp deve conter os mesmos valores do resumo.
- Guardar localmente no navegador o último pedido que o cliente abriu para enviar pelo WhatsApp. O botão **Repetir meu pedido** restaura tamanho e complementos, permite edição e informa quando ainda não existe pedido salvo. O pedido salvo fica somente naquele navegador/aparelho; não é uma conta nem um histórico sincronizado.
- Incluir navegação para uma seção **Nossa história**. A narrativa pode ser apresentada como texto fictício/ilustrativo, com aviso de que alegações orgânicas ou de origem de fornecedores devem ser verificadas antes de serem anunciadas como fatos.
