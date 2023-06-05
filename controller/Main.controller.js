sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                /*//vamos criar um modelo
                //antes, as variáveis que vão no modelo
                var dadosGerais = {
                    rodada : '10a',
                    campeonato : "Brasileirão 2023 do canal FioriNET"
                };

                //agora sim vamos criar o modelo
                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                var view = this.getView();
                view.setModel(dadosModel, "ModeloDadosGerais");*/

                //3 objetos vazios
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                //3 modelos
                //variável dentro do parênteses substitui o comando setData
                var dadosModel = new JSONModel(dadosGerais);
                var classificacaoModel = new JSONModel(classificacao);
                var partidasModel = new JSONModel(partidas);

                //atribuimos 3 modelos à tela - view
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                this.buscarDadosGerais();
                this.buscarClassificacao();
                this.buscarPartidas();
            },

            buscarDadosGerais: function(){
                //obter o model a ser atualizado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_5bd8b94dbc5ce47c82316861918e64"
                    }

                };
                //fazemos a chamada à API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta){
                    dadosModel2.setData(resposta);
                    this.buscarPartidas(resposta.rodada_atual.rodada);
                }.bind(this))

                //erro
                .fail(function(erro){
                    
                });
            },

            buscarClassificacao: function(){
                //obter o model a ser atualizado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_5bd8b94dbc5ce47c82316861918e64"
                    }

                };
                //fazemos a chamada à API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta){
                    classificacaoModel2.setData({"Classificacao" : resposta});
                    
                })

                //erro
                .fail(function(erro){
                    
                });
            },

            buscarPartidas: function(rodada){
                //obter o model a ser atualizado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_5bd8b94dbc5ce47c82316861918e64"
                    }

                };
                //fazemos a chamada à API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta){
                    partidasModel2.setData(resposta);
                    
                })

                //erro
                .fail(function(erro){
                    
                });
            }
        });
    });
