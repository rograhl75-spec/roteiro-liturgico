/* Adaptador de dados para a arquitetura nova.
 *
 * A migração dos textos existentes é deliberadamente compatível: a aplicação
 * usa o catálogo estruturado quando disponível e mantém o objeto legado como
 * fonte de leitura até que todos os textos sejam transferidos.
 */
(function () {
  'use strict';

  window.liturgiaData = window.liturgiaData || {};
  window.liturgiaData.semanas = window.liturgiaSemanas || [];
  window.liturgiaData.leituras = window.readingsData || {};

  window.LiturgiaData = Object.freeze(window.liturgiaData);
})();
