### TEMA: Sistemas de dados da saúde

Entender o comportamento de dados relacionados à saúde é fundamental para criar políticas públicas relacionadas a essa área. Existem diversas fontes de informação com dados sobre saúde: internações do Sistema Único de Saúde (SUS), acidentes de trânsito, infecções/mortes por COVID-19 e dengue. Os dados contidos nesses datasets podem variar, mas em geral contém as informações do endereço, coordenadas (latitude e longitude), uma categoria (tipo de doença, especialidade, etc) e alguma descrição.
A proposta é desenvolver um sistema de visualização geográfica de dados relacionados à saúde usando fontes de dados conhecidas.

O sistema deve possuir as seguintes funcionalidades e requisitos:
- [ ] Visualização de dados da saúde em um mapa.
- [ ] Os dados devem ser apresentados no mapa com a localização individual de cada ponto.
- [ ] Cada ponto do mapa deve mostrar mais informações quando o usuário passar o mouse sobre ele.
- [ ] Os dados devem ser apresentados no mapa agrupados através do uso de mapa de calor/densidade.
- [ ] O mapa deve conter filtros para selecionar dados por tipo de doença, especialidade, por região ou por data.
- [ ] Gráficos com dados de saúde: por exemplo, quantidade de casos da doença/acidentes/internações por região ou por data.
- [ ] O sistema só deve ser acessado por usuários cadastrados.
- [ ] Cada tipo de dataset no mapa deve possuir um ícone próprio para facilitar sua identificação.

****Dados de internações do SUS:****
https://dados.gov.br/dataset/internacoes-hospitalares-do-sus<br>
****Óbitos por dengue:****
https://dados.gov.br/dataset/odm6_dengue/resource/039e2581-3cc1-4aa9-98a2-47df0096ca7c<br>
****COVID-19:****
https://www.saopaulo.sp.gov.br/planosp/simi/dados-abertos/<br>
****Acidentes de trânsito:****
https://mobilidade.estadao.com.br/mobilidade-com-seguranca/transito/<br>


Observações gerais:
O sistema deve atender às boas práticas de usabilidade.
O sistema deve conter uma página inicial com uma descrição do sistema e um ou mais menus com as opções disponíveis para seu uso.
O sistema deve ter uma área de ajuda para auxiliar o usuário.
O conteúdo geolocalizado dos sistemas pode ter como escopo a cidade de São Paulo.
