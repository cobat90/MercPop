    window.save_button_hide = false;
    window.total_produtos_abertos = 0;
    
    var produto_id_global = 7272175;
    

    /* Conta caracteres do input obj e monta texto para exibir no #tituloCont. */
    function contarCaracter(obj, warning, error, destino) {
        var len = obj.val().length;

        if(len === 0) {
            $(destino).html('0 caracteres');
        } else if (len === 1) {
            $(destino).html('1 caracter');
        } else {
            $(destino).html(len + ' caracteres');
        }

        if(len > warning && len <= error) {
            $(destino).addClass('text-warning').removeClass('text-error');
        } else if (len > error) {
            $(destino).addClass('text-error').removeClass('text-warning')
        } else {
            $(destino).removeClass('text-error text-warning');
        }
    }
    function contarPalavra(obj, warning, error, destino) {
        var number = 0;
        var matches = $(obj).val().split(",");
        number = matches.filter( function(word) { return word.length > 0}).length;
        if(number === 0) {
            $(destino).html('0 palavras');
        } else if (number === 1) {
            $(destino).html('1 palavra');
        } else {
            $(destino).html(number + ' palavras');
        }
        if(number > warning && number <= error) {
            $(destino).addClass('text-warning').removeClass('text-error');
        } else if (number > error) {
            $(destino).addClass('text-error').removeClass('text-warning')
        } else {
            $(destino).removeClass('text-error text-warning');
        }
    }

    function muda_gerenciado() {
        var gerenciado = $('[name=gerenciado]').val();
        if (gerenciado == 'True') {
            $('#bloco-estoque-gerenciado').slideDown()
                .find('input,select').removeAttr('disabled');
            $('#bloco-estoque-nao-gerenciado').slideUp()
                .find('input,select').attr('disabled', 'disabled');
        } else {
            $('#bloco-estoque-gerenciado').slideUp()
                .find('input,select').attr('disabled', 'disabled');
            $('#bloco-estoque-nao-gerenciado').slideDown()
                .find('input,select').removeAttr('disabled');
        }
    }

    function verificaCampoPreenchido() {
      var warning = 0;
      $('.box-dimension .form-group, .box-dimension-filho .form-group:visible').each(function() {
        if($(this).hasClass('warning')) {
          warning = 1;
        }
      });
      if(warning == 0) {
        $('.aviso_preenchimento').slideUp('fast');
      } else {
        $('.aviso_preenchimento').slideDown('fast');
      }
    }

    function getSafetyColor(hex) {
      var n_match = ntc.name(hex);
      var n_hex = n_match[0];
      var n_name = n_match[1];
      var n_exactmatch = n_match[2];
      return [n_hex, n_name, n_exactmatch];
    }

    $(document).ready(function() {
        $('.preco').maskMoney({ thousands:'.', decimal:',' });
        $('.preco').maskMoney({ thousands:'.', decimal:',' });
        $('.preco').maskMoney({ thousands:'.', decimal:',' });
        $('.medida').maskMoney({ thousands:'', decimal:'', precision: 1 });
        $('.peso').maskMoney({ thousands:'', decimal:',', precision: 3 });

        $(".price-box").on("change", ".preco-sob-consulta input", function() {
            var sobConsulta = this.checked;
            if (sobConsulta) {
                $(".price-controls").slideUp();
                $(".price-show").slideUp();
                $(".box-stock").slideUp();
            }
            else {
                $(".price-controls").slideDown();
                $(".price-show").slideDown();
                $(".box-stock").slideDown();
            }
        });


        $('#id_url_video_youtube').on('input', function(event) {
            var valor = $(this).val();
            if (valor.length > 10) {
                $('.ver_video_youtube').fadeIn();
                $('.ver_video_youtube').attr('href', valor);
            } else {
                $('.ver_video_youtube').fadeOut();
            }
        }).trigger('input');

        $('.link_ext').tooltip();
        $('.link_ext').click(function(e) {
            window.open($(this).attr('href'));
            return false;
        });

        

        // grade variacao
        $('.gerar_codigo_grade_variacao').click(function(event) {
            event.preventDefault();
            var variacoes_deste_produto = $(this).parents('tr').find('.grade_variacao');
            var sku_produto = $('#id_sku').val();
            var codigo_produto = [];
            $.each(variacoes_deste_produto, function(o, variacao) {
                codigo_produto.push($(variacao).val().replace('/', '-'));
            });
            var resultado_nome = URLify(codigo_produto.join('-'));
            resultado_nome = sku_produto + '-' + resultado_nome;
            $(this).parents('table').find('#id_sku').val(resultado_nome);

        });

        // remover grade
        $('.remover_grade').click(function(event) {
            var url = $(this).attr('href');
            var nome_grade = $(this).data('nome-grade');
            event.preventDefault();
            $('#RemoverGrade .modal-body').find('.nome_grade').html(nome_grade);
            $('#RemoverGrade .modal-footer').find('a').attr('href', url);
            $('#RemoverGrade').modal('show');
        });

        // escolher cor
        $('.escolher-cor').click(function(event) {
            event.preventDefault();
            var grade_id = $(this).attr('data-grade-id');
            var produto_id = $(this).attr('data-produto-id');
            $('#EscolherCor').attr('data-grade-id', grade_id);
            $('#EscolherCor').attr('data-produto-id', produto_id);
            $('#EscolherCor').modal('show');
        });

        $('#EscolherCor').on('show.bs.modal', function(event) {
            var grade_id = $(this).attr('data-grade-id');
            var produto_id = $(this).attr('data-produto-id');
            var url = "//app.lojaintegrada.com.br/painel/catalogo/grade/cor";
            $.post(url, {grade_id: grade_id, produto_id: produto_id}, function(data) {
                $('#EscolherCor .modal-body').html(data);
                if(produto_id) {
                    $('.ativo').trigger('click');
                }
            });
        });

        $('#EscolherCor').on('click', '.opcao-cor', function(event) {
            event.preventDefault();
            var cor = $(this).data('cor');
            var nome = $(this).data('nome');
            $(this).parents('ul').find('.opcao-cor').removeClass('ativo');
            $(this).addClass('ativo');
            if ($(this).hasClass('principal')) {
                $('#EscolherCor .cor_principal').css('background-color', cor);
                $('#EscolherCor .cor_principal').data('cor', nome);
                $('#EscolherCor .nome_principal').html(nome);
            } else {
                $('#EscolherCor .cor_secundaria').data('cor', nome);
                $('#EscolherCor .cor_secundaria').css('background-color', cor);
                $('#EscolherCor .nome_secundario').html(nome);
            }

        });

        $('#EscolherCor .salvar_cor').click(function(event) {
            event.preventDefault();
            var cor_principal_div = $('#EscolherCor #input-colorpicker1');
            var cor_secundaria_div = $('#EscolherCor #input-colorpicker2');
            var cor_principal = null;
            var cor_secundaria = null;
            var nome_cor = [];
            var grade_id = $('#EscolherCor').attr('data-grade-id');
            var produto_id = $('#EscolherCor').attr('data-produto-id');

            if (cor_principal_div.val()) {
                cor_principal = cor_principal_div.data('cor-nome');
                if (!cor_principal) {
                    alert('Escolha uma cor');
                    return false;
                }
                nome_cor.push(cor_principal);
            }

            if (cor_secundaria_div.val()) {
                cor_secundaria = cor_secundaria_div.data('cor-nome');
                if (!cor_secundaria) {
                    alert('Escolha uma cor');
                    return false;
                }
                nome_cor.push(cor_secundaria);
            }
            var nome_cor = nome_cor.join('/');
            if(produto_id) {
                $('#EscolherCor').removeAttr('data-produto-id');
                $('.prod_' + produto_id  + '_grade_' + grade_id).val(nome_cor);
                $('.produto_'+produto_id+'_grade_variacao-' + grade_id).html(nome_cor);
                $('.prod_' + produto_id  + '_grade_' + grade_id).next().find('.input-group .input-group-addon:eq(0)').css('background-color', cor_principal_div.val());
                if (cor_secundaria_div.val()) {
                  $('.prod_' + produto_id  + '_grade_' + grade_id).next().find('.input-group .input-group-addon:eq(1)').css('background-color', cor_secundaria_div.val());
                }
            }else {
                $('#grade_variacao-' + grade_id).val(nome_cor);
                $('.grade_variacao-' + grade_id).parent().prev().hide();
                $('.grade_variacao-' + grade_id).parent().show();
                $('.grade_variacao-' + grade_id + ' .input-group-addon:eq(0)').css('background-color', cor_principal_div.val());
                if (cor_secundaria_div.val()) {
                  $('.grade_variacao-' + grade_id + ' .input-group-addon:eq(1)').css('background-color', cor_secundaria_div.val()).show();
                }
                //$('.grade_variacao-' + grade_id).html(nome_cor);
            }
            $('#EscolherCor').modal('hide');
        });

        // funciona
        var grades_com_imagens = [];
        $.each($('.pode-ter-imagens'), function(k, v) {
            var obj = $(v);
            var id = obj.attr('id');
            var grade_id = obj.attr('data-variacao-id')

            if ($.inArray(id, grades_com_imagens) < 0) {
                var botao = '<a href="#" class="alterar_imagem_grade glyphicon glyphicon-picture" data-variacao-id="'+grade_id+'"><i class="icon-picture"></a>';
                obj.append(botao);
                grades_com_imagens.push(id);
            }
        });
        // produto grade imagem
        $('.alterar_imagem_grade').click(function(event) {
            event.preventDefault();
            var grade_id = $(this).attr('data-variacao-id');
            $('#ProdutoGradeVariacaoImagem').data('variacao-id', grade_id);
            $('#ProdutoGradeVariacaoImagem').modal('show');
        });
        $('#ProdutoGradeVariacaoImagem').on('show.bs.modal', function(event){
            var imagens = $('.image');
            var body = $(this).find('.modal-body');
            var url_imagens = '//app.lojaintegrada.com.br/painel/catalogo/produto/grade/imagem/listar';
            var variacao_id = $('#ProdutoGradeVariacaoImagem').data('variacao-id');
            $.get(url_imagens, {variacao_id: variacao_id, produto_id: '7272175'}, function(data){

                $.each(imagens, function(k, imagem) {
                    var img = $(imagem).find('img').clone();
                    var id = $(imagem).data('id');
                    if (id) {
                        var a = $('<a href="#" class="imagem_grade">');
                        if($.inArray(id, data) > -1) {
                            a.addClass('ativo');
                        }
                        a.attr('data-id', id);
                        a.html(img);
                        body.append(a);
                    }
                });
            }, 'json')
        }).on('hide.bs.modal', function(event) {
            // lipmpando
            $(this).find('.modal-body').html('');
        });

        $('#ProdutoGradeVariacaoImagem').on('click', '.imagem_grade', function(event) {
            event.preventDefault();
            var imagem_id = $(this).data('id');
            var variacao_id = $('#ProdutoGradeVariacaoImagem').data('variacao-id');
            var produto_id = '7272175';
            var that = $(this);
            if ($(this).hasClass('ativo')) {
                var url = '//app.lojaintegrada.com.br/painel/catalogo/produto/grade/imagem/desassociar';
            } else {
                var url = '//app.lojaintegrada.com.br/painel/catalogo/produto/grade/imagem/associar';
            }
            $.post(url, {imagem_id:imagem_id, produto_id: produto_id, variacao_id: variacao_id}, function(data) {
                if (data.status == 'sucesso') {
                    if (that.hasClass('ativo')) {
                        that.removeClass('ativo');
                    } else {
                        that.addClass('ativo');
                    }
                } else {
                    alert(data.mensagem);
                }
            }, 'json');
        });
        $('.form-produto').on('keypress', function(e) {
            if (e.which == 13) {
                return false;
            }
        });
        $('.form-produto').submit(function() {
            var preco_cheio = $('#id_cheio').val();
            var preco_promocional = $('#id_promocional').val();
            if (preco_cheio && preco_promocional) {
                float_preco_cheio = formatar_decimal(preco_cheio);
                float_preco_promocional = formatar_decimal(preco_promocional);
                if (float_preco_promocional >= float_preco_cheio) {
                    alert('O preço promocional não pode ser maior ou igual que o preço de venda. Só é possível salvar as alterações do produto após corrigir este problema.');
                    return false;
                }
            }
            $('.produto-form-atributo-criar, .produto-atributo-form').find(
                'input, textarea, select').attr('disabled', 'disabled');

            if (!url_editar_fechado) {
                $('#url-remove').click();
            }
        });

        $('#btn-show-table').click(function() {
            $('.block-fade, .block-show-table').hide();
            $('.hide-table').removeClass('hide-table');
            return false;
        });

        contarCaracter($('#id_nome'), 55, 60, $('#tituloCont'));
        contarCaracter($('#id_title'), 60, 70, $('#titleCont'));
        //contarPalavra($('#id_keyword'), 3, 6, $('#keywordCont'));
        contarCaracter($('#id_description'), 150, 160, $('#descrCont'));

        var url_editar_pelo_nome = true;
        $('#url-remove').hide();

        // Ao preencher qualquer conteúdo no nome do produto,
        // transforma o texto usando o URLify.
        $('#id_nome').keyup(function() {
            var self = $(this);

            contarCaracter(self, 55, 60, $('#tituloCont'));

            var slug = URLify(self.val());
            $('#id_apelido').val(slug);

            // A criação do slug só é feita quando é possível
            // editar a URL pelo nome do produto.
            if (!url_editar_pelo_nome) {
                return false;
            } else {
                var url = slug;
                $('.url-slug').text(url);
                $('#id_url').val(url);

                $('#url-remove').show();
            }
        });

        $('#id_title').keyup(function() {
            contarCaracter($(this), 60, 70, $('#titleCont'));
        });
        $('#id_keyword').keyup(function() {
            contarPalavra($(this), 3, 6, $('#keywordCont'));
        });
        $('#id_description').keyup(function() {
            contarCaracter($(this), 150, 160, $('#descrCont'));
        });
        $('#id_peso, #id_altura, #id_largura, #id_profundidade').keyup(function() {
          if($(this).val() != 0 && $(this).val() != "0,000") {
              $(this).parent().parent().parent().removeClass('warning');
          } else {
              $(this).parent().parent().parent().addClass('warning');
          }
          verificaCampoPreenchido();
        });

        $('#id_url').keyup(function(e) {
            var code = e.which;

            if (code == 13) {
                event.preventDefault();
                $('#url-validate').trigger('click');
            }
            var self = $(this);
            var slug = URLify(self.val(), undefined, true);
            $('.url-slug').text(slug);
        });

    $('.marca.dropdown-advanced').dropdownadvanced({
        debug: true,
        success: function(data, callback) {
            post_data = {nome: data.value };
            $.post('/painel/catalogo/marca/criar.json', post_data, function(res) {
                if (res.resposta.estado == 'ERRO') {
                    callback(null, res.resposta.mensagem);
                } else {
                    callback(res.resposta.id);
                }
            }, 'json');
        }
    });

    $('.categoria.dropdown-advanced').dropdownadvanced({
        debug: true,
        success: function(data, callback) {
            post_data = {
                nome: data.value,
                categoria_id_pai: '-' // Categoria na raiz
            };
            $.post('/painel/catalogo/categoria/criar.json', post_data, function(res) {
                if (res.resposta.estado == 'ERRO') {
                    callback(null, res.resposta.mensagem);
                } else {
                    callback(res.resposta.id);
                }
            }, 'json');
        }
    });

        // Mostrando o formulário de edição da URL quando clicar no botão para
        // editar a URL.
        var acao_pagina = 'editar';
        var url_error = false;

        var url_editar_pelo_nome = acao_pagina == 'criar';
        var url_editar_fechado = url_error != true;
        var url_valida = url_error != true;

        var data_url_form = $('#id_url').data('url-form');
        var data_url_original = $('#id_url').data('url-original');

        if (!url_editar_fechado) {
            $('#url-remove').show();
            $('#url-edit').hide();
        } else {
            $('#url-remove').hide();
            $('#url-edit').show();
        }

        $('#url-edit').click(function() {
            $('#form-group-url').slideToggle();
            url_editar_fechado = !url_editar_fechado;

            $('#url-remove').show();

            if (url_editar_fechado) {
                validar_url()
                $('#url-edit').show();
            } else {
                $('#url-edit').hide();
            }

            return false;
        });

        var animar_url = function () {
            var item = $('.control-seamless-editable .control');
            bg_color = item.css('backgroundColor');
            bg_color_2 = '#90ba2c';

            change_color = function(color) {
                item.css('backgroundColor', color);
            }

            setTimeout('change_color(bg_color_2)', 500);
            setTimeout('change_color(bg_color)', 1000);
            setTimeout('change_color(bg_color_2)', 1500);
            setTimeout('change_color(bg_color)', 2000);
            setTimeout('change_color(bg_color_2)', 2500);
            setTimeout('change_color(bg_color)', 3000);
        }

        var mensagem_url_help_text = function(mensagem) {
            var parent = $('#form-group-url');

            if (!parent.find('.help-block').length) {
                var parent_controls = parent.find('.controls');
                $('<div class="help-block"></div>').appendTo(parent_controls);
            }

            parent.find('.help-block').html(mensagem);
        }

        var url_nao_preenchida = function() {
            var parent = $('#form-group-url');
            parent.removeClass('success').addClass('has-error');
            mensagem_url_help_text('É necessário preencher uma URL.');
        }

        var url_validada = function() {
            var parent = $('#form-group-url');
            parent.removeClass('has-error').addClass('success').find('.help-text').remove();
            $('#id_url').data('validada', true);
            url_valida = true;
            parent.slideUp();
            animar_url();
            $('#url-edit').show();
            url_editar_fechado = true;
        }

        var url_nao_validada = function() {
            var parent = $('#form-group-url');
            parent.removeClass('success').addClass('has-error');
            mensagem_url_help_text('A URL não é válida, tente novamente.');
            url_valida = false;
        }

        var validar_url = function() {
            var url = $('#id_url').val();
            $('#id_url').val(url);

            $('#form-group-url .errorlist').remove();
            $('#url-validate').button('loading');

            if (!url) {
                $('#url-validate').button('reset');
                url_nao_preenchida();
            } else {
                var params = {url: url, url_antiga: "2015-11-17-09-42-03"};
                $.post('//app.lojaintegrada.com.br/painel/plataforma/url/validar', params, function (data) {
                    $('#url-validate').button('reset');

                    if (data.sucesso) {
                        if (data.url_valida) {
                            url_validada();
                        } else {
                            url_nao_validada();
                        }
                    } else {
                        alert('Houve um erro ao tentar enviar os dados para validação. Por favor tente novamente.');
                    }
                }, 'json');
            }
        }

        $('#url-validate').click(validar_url);

        $('#url-remove').click(function() {
            var url_original = $('#id_url').data('url-original');

            $('#form-group-url').slideUp();

            $('#id_url').val('');
            $('.url-slug').html(url_original);

            if (!url_original) {
                $('#id_nome').keyup();
            }

            url_editar_fechado = true;
            url_valida = true;

            $('#url-remove').hide();
            $('#url-edit').show();
        });

    
        $('[name=gerenciado]').change(function() {
            var self = $(this);
            var gerenciado = self.val();
            var pai = self.parents('.produto-atributo-form, .produto-form-atributo-criar');

            if (gerenciado == 'True') {
                pai.find('#bloco-estoque-gerenciado').slideDown()
                    .find('input,select').removeAttr('disabled');
                pai.find('#bloco-estoque-nao-gerenciado').slideUp()
                    .find('input,select').attr('disabled', 'disabled');
            } else {
                pai.find('#bloco-estoque-gerenciado').slideUp()
                    .find('input,select').attr('disabled', 'disabled');
                pai.find('#bloco-estoque-nao-gerenciado').slideDown()
                    .find('input,select').removeAttr('disabled');
            }
        }).change();

        $('.produto-atributo-form [type=submit]').click(function() {
            var self = $(this).parents('.produto-atributo-form');
            esconder_alert_opcoes_produto();

            var preco_cheio = $('#id_cheio', self).val();
            var preco_promocional = $('#id_promocional', self).val();
            var status_produto = $('#id_ativo', self).val();
            if (preco_cheio && preco_promocional) {
                float_preco_cheio = formatar_decimal(preco_cheio);
                float_preco_promocional = formatar_decimal(preco_promocional);
                if (float_preco_promocional >= float_preco_cheio) {
                    alert('O preço promocional não pode ser maior ou igual que o preço de venda. Só é possível salvar as alterações do produto após corrigir este problema.');
                    return false;
                }
            }

            $.loader('Salvando alterações da opção do produto', true);

            var produto_id = parseInt(self.find('[name=produto_id]').val(), 10);
            var linha_pai = $('#block-line-prd-atr-' + produto_id);

            var form_data = {};
            $('input, select, textarea', self).each(function() {
                if(!this.disabled) {
                  form_data[this.name] = this.value;
                }
            });
            var url = self.data('action');
            $.post(url, form_data, function(data) {
                // Limpando todos os erros.
                var produto_id = parseInt(self.find('[name=produto_id]').val(), 10);

                self.find('.form-group.has-error').removeClass('has-error');
                self.find('.alert').removeClass('alert-danger').removeClass('alert-success').html('').slideUp();
                if (data.estado == 'ERRO') {
                    self.find('.alert').addClass('alert-danger').html(data.mensagem.replace(/\s--\s/g, '<br/>')).slideDown();
                    // Adicionando a classe '.error' para todos os campos com erro.
                    $(data.campos_com_erro).each(function(i, e) {
                        self.find('[name=' + e + ']').parents('.form-group').addClass('has-error');
                    });
                } else {
                    // Mostrando mensagem de sucesso.
                    // self.find('.alert').addClass('alert-success').html(data.mensagem).slideDown();
                    mostrar_alert_opcoes_produto('success', data.mensagem);
                    // Atualizando valores do produto.
                    self.find('[name=sku]').val();
                }

                if (data.campos_alterados) {
                    // id="prd_atr___"
                    // name="grade_variacao--"
                    $(data.campos_alterados).each(function(i, e) {
                        var id = '[id^=prd_atr_' + produto_id + '_' + e.grade_id + ']';
                        var novo_id = 'prd_atr_' + produto_id + '_' + e.grade_id + '_' + e.grade_variacao_id;
                        var novo_name = 'grade_variacao-' + e.grade_id + '-' + e.grade_variacao_id;
                        self.find(id).attr({'name': novo_name, 'id': novo_id});

                        linha_pai.find('[class^=produto-grade-variacao-' + e.grade_id + ']').attr({'class': 'produto-grade-variacao-' + e.grade_id + '-' +  e.grade_variacao_id});
                    })
                }

                // Atualizando os valores.
                var id = '[id^=prd_atr_' + produto_id + ']';
                $(self.find(id)).each(function(i, e) {
                    var value = $(e).val();

                    var item_id = $(e).attr('id').split('_');
                    var produto_id = item_id[2];
                    var grade_id = item_id[3];

                    linha_pai.find('[class^=produto-grade-variacao-' + grade_id + '-]').text(value);
                });

                // Atualizando código, preço e quantidade.
                codigo_sku = self.find('[name=sku]').val();
                linha_pai.find('.produto-sku').text(codigo_sku);

                gerenciado = self.find('[name=gerenciado]').val()
                if (gerenciado == 'True') {
                    produto_quantidade = self.find('[name=quantidade]').val();
                } else {
                    produto_quantidade = '-';
                }
                linha_pai.find('.produto-quantidade').text(produto_quantidade);
                cheio = parseFloat(self.find('[name=cheio]').val().replace('.', '').replace(',','.'));
                promocional = parseFloat(self.find('[name=promocional]').val().replace('.', '').replace(',','.'));

                if (promocional) {
                    label_preco = '<s>de R$ ' + formatar_decimal_br(cheio) + '</s> por R$ ' + formatar_decimal_br(promocional)
                } else{
                    label_preco = 'R$ ' + formatar_decimal_br(cheio);
                }
                linha_pai.find('.produto-preco-cheio').html(label_preco);

                // atualizando status da variação
                var status_produto_atualizar = linha_pai.find('.produto-status');
                if (status_produto == 'True') {
                    linha_pai.removeClass('inativo');
                    linha_pai.addClass('ativo');
                    status_produto_atualizar.removeClass('off');
                    status_produto_atualizar.addClass('on');
                } else {
                    linha_pai.removeClass('ativo');
                    linha_pai.addClass('inativo');
                    status_produto_atualizar.removeClass('on');
                    status_produto_atualizar.addClass('off');
                }


                if (data.estado == 'SUCESSO') {
                    $('#block-prd-atr-' + produto_id + ', #block-line-prd-atr-' + produto_id).toggle();

                    window.total_produtos_abertos--;
                    if (window.total_produtos_abertos == 0) {
                        $('#saveButton').show();
                        window.save_button_hide = false;
                    }
                }
                $.removeLoader();
            }, 'json');
            return false;
        });

        $('.produto-form-atributo-criar [type=submit]').click(function() {
            var self = $(this).parents('.produto-form-atributo-criar');

            var preco_cheio = $('#id_cheio', self).val();
            var preco_promocional = $('#id_promocional', self).val();
            if (preco_cheio && preco_promocional) {
                float_preco_cheio = formatar_decimal(preco_cheio);
                float_preco_promocional = formatar_decimal(preco_promocional);
                if (float_preco_promocional >= float_preco_cheio) {
                    alert('O preço promocional não pode ser maior ou igual que o preço de venda. Só é possível salvar as alterações do produto após corrigir este problema.');
                    return false;
                }
            }

            // var produto_id = parseInt(self.find('[name=produto_id]').val(), 10);
            // var linha_pai = $('#block-line-prd-atr-' + produto_id);

            $.loader('Criando a opção do produto', true);

            if (!self.find('[name=sku]').val()) {
                mensagem = 'O código do produto é obrigatório.';
                self.find('.alert').addClass('alert-danger').html(mensagem).slideDown();
                // Adicionando a classe '.error' para todos os campos com erro.
                self.find('[name=sku]').parents('.form-group').addClass('has-error');
                $.removeLoader();
                return false;
            }

            var form_data = self.find('input, textarea, select').serialize();
            
            var url = '//app.lojaintegrada.com.br/painel/catalogo/produto/7272175/grade/variacao/vincular';
            

            // Limpando o alerta.
            self.find('.alert').removeClass('alert-danger').text('').slideUp();

            $.post(url, form_data, function(data) {
                if (data.estado != 'SUCESSO') {
                    self.find('.alert').addClass('alert-danger').text(data.mensagem).slideDown();
                    $.removeLoader();
                } else {
                    // Recarregando a página.
                    var produto_filho_id = data.id;
                    var url_edicao_produto_principal = '//app.lojaintegrada.com.br/painel/catalogo/produto/7272175/editar';
                    // Trocando a URL de edição para a URL do filho.
                    var url_edicao_produto_filho = url_edicao_produto_principal.replace(/\/\d+\/editar/g, '/' + produto_filho_id + '/editar');
                    $.post(url_edicao_produto_filho, form_data, function(data) {
                        if (data.estado == 'ERRO') {
                            self.find('.alert').addClass('alert-danger').html(data.mensagem.replace(/\s--\s/g, '<br/>')).slideDown();
                            // Adicionando a classe '.error' para todos os campos com erro.
                            $(data.campos_com_erro).each(function(i, e) {
                                self.find('[name=' + e + ']').parents('.form-group').addClass('has-error');
                            });
                        } else {
                            // Mostrando mensagem de sucesso.
                            // self.find('.alert').addClass('alert-success').html(data.mensagem).slideDown();
                            mostrar_alert_opcoes_produto('success', data.mensagem);
                            // Atualizando valores do produto.
                            self.find('[name=sku]').val();

                            var url_redirect;
                            if (window.location.href.split('#').length > 1) {
                                url_redirect = window.location.href.split('#')[0];
                            } else {
                                url_redirect = window.location.href;
                            }
                            window.location.href = url_redirect;
                        }
                    }, 'json');
                }
            }, 'json');
            return false;
        });
    

        bind_save_button = function(tipo_produto) {
            var saveButtonIsVisible = false;
            var botao_salvar = $('.btn-save');
            
            if ($('#saveButton .button-container').length) {
                $(window).scroll(function() {
                    if (($(window).scrollTop() + window.innerHeight) < (document.body.offsetHeight - 150) && !window.save_button_hide && window.total_produtos_abertos == 0) {
                        $('#saveButton').show();
                    } else {
                        $('#saveButton').hide();
                    }
                });
            }
        }

        if ($('[name=tipo]').length && !$('[name=tipo]:checked').length) {
            $('.tipo-produto').siblings().hide();
        } else {
            bind_save_button();
        }

        $('#EscolherCategoriaGlobal').on('click', '.categoria-global', function(event) {
            event.preventDefault();
            var categoria_global_id = $(this).data('categoria');
            $.get('//app.lojaintegrada.com.br/painel/catalogo/categoria_global', {categoria_global_id: categoria_global_id} ,function(data) {
                $('#EscolherCategoriaGlobal  .modal-body').html(data);
            });
        });
        
        $('#EscolherCategoriaGlobal').on('click', '.ecolher-categoria-global', function(event) {
            var categoria_global_id = $(this).data('categoria');
            $.get('//app.lojaintegrada.com.br/painel/catalogo/categoria_global/detalhar', {
                categoria_global_id: categoria_global_id,
                produto_id: produto_id_global
            } ,function(data) {
                $('.box-categoria-global > .box-content').html(data);
                $('.box-categoria-global > .box-content').show();
                $("#EscolherCategoriaGlobal").modal('hide');
            });
        });


        $('[name=tipo]').change(function() {
            var self = $('[name=tipo] option:selected');
            var tipo = self.val();
            
            $('.produto-normal,.produto-atributo').hide().find('input, textarea, select').attr('disabled', 'disabled');
            $('.produto-' + tipo).show().find('input, textarea, select').removeAttr('disabled');
            muda_gerenciado();
            bind_save_button(tipo);
        }).change();

        $('.form-produto-vincular-grade [type=submit]').click(function() {
            var self = $(this).parents('.form-produto-vincular-grade');
            var form_data = self.find("select, textarea, input").serializeArray();
            var url = self.data('action');
            var method = self.data('method');

            var form = $('<form action="' + url + '" method="' + method + '">');
            for (var i in form_data) {
                input = form_data[i];
                form.append($('<input type="hidden" name="' + input.name + '" value="' + input.value + '" />'));
            }
            form.appendTo($('body'));
            form.submit();

            return false;
        });

        // $('#visivel_facebook').click(visivel_facebook);
        // Desabilitando os controles que estão escondidos para evitar que sejam
        // enviados sem necessidade.
        $('.produto-form-atributo-criar, .produto-atributo-form').find(
            'input, textarea, select').attr('disabled', 'disabled');

        /*
         * Impedindo que a variação do produto seja enviada com enter, isso causa
         * conflito com o form do produto pai.
         */
        $('.produto-form-atributo-criar input, .produto-form-atributo-criar select, .produto-atributo-form input, .produto-atributo-form select').keypress(function(e){
            if ( e.which == 13 ) e.preventDefault();
        });
        $('#gerar-sku').click(function(event){
            event.preventDefault();
            var text = "";
            var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

            for( var i=0; i < 9; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            $('#id_sku').val(text)
        });
        $('.remover_produto_filho').click(function(event) {
            if(confirm('Deseja realmente remover este atributo?')) {
                return true
            } else {
                event.preventDefault();
            }
        });
        $('.image-widget .image').tooltip({
            placement: 'top'
        });
        $('.image-widget .image:first-child').tooltip('destroy');

        $('#id_destaque').change(function() {
            if ($(this).attr('checked')) {
                $('.destaque-disclaimer').show();
                $('.produto-destaque-icon-star').removeClass('off');
            } else {
                $('.destaque-disclaimer').hide();
                $('.produto-destaque-icon-star').addClass('off');
            }
        }).change()
        // animação da HASH
        if (window.location.hash) {
            var hash = window.location.hash;
            scroll_para_elemento(hash);
        }
        

        if ($('#modal-categorias').length) {
            var mostrar_criar_categoria = function() {
                $('#body-criar-categoria').find('input, select').val('');
                $('#body-criar-categoria, #footer-criar-categoria').show();
                $('#body-selecionar-categoria, #footer-selecionar-categoria').hide();
                return false;
            }

            var esconder_criar_categoria = function() {
                // Reseta o formulário.
                $('#body-criar-categoria').find('input, select').val('');
                $('#body-criar-categoria, #footer-criar-categoria').hide();
                $('#body-selecionar-categoria, #footer-selecionar-categoria').show();
                return false;
            }

            var inserir_a_categoria = function(data) {
                // Insere a categoria na lista de categorias secundárias.
                var ul = $('#categorias-secundarias .controls ul');
                var margin = 'margin-left: ' + (parseInt(data.level) * 20) + 'px';
                var item = $('<li>').addClass('checkbox').attr({'style': margin}).append(
                    $('<label>').append(
                        $('<input>').attr({'type': 'checkbox',
                                           'name': 'categoria_secundaria',
                                           'data-level': '0',
                                           'value': data.id,
                                           'checked': 'checked'})
                    ).append(
                        data.nome
                    )
                );
                if (data.parent_id == null) {
                    ul.append(item);
                } else {
                    item.insertAfter(ul.find('[value=' + data.parent_id + ']').parents('li'));
                }

                // Insere a categoria nos formulários.
                var selects = $('[id=id_categorias]');
                // Insere a quantidade certa de "--"" para indentar a categoria.
                var dashes = Array(data.level + 1).join("-- ");
                var option = $('<option>').attr({'value': data.id}).html(dashes + data.nome);
                selects.each(function(index, element) {
                    select = $(element);
                    if (data.parent_id == null) {
                        option.insertBefore(select.find('.divider'));
                    } else {
                        var _find = '[value=' + data.parent_id + ']';
                        option.insertAfter(select.find(_find));
                    }
                    select.val(data.id);
                    select.change();
                });
                if (selects.find(':checked').length > 1) {
                    $('#modal-categorias #link-categorias-secundarias').click();
                }
            }

            $('#footer-criar-categoria button.button').click(esconder_criar_categoria);

            $('#footer-criar-categoria button.submit').click(function() {
                var nome = $('#body-criar-categoria [name=nome]').val();
                var params = {nome: nome};

                var categoria_pai = $('#body-criar-categoria [name=categorias]').val();
                if (parseInt(categoria_pai)) {
                    params.parent = categoria_pai;
                }

                // Cria a categoria.
                $.post('//app.lojaintegrada.com.br/painel/catalogo/categoria/criar.json', params, function(data) {
                    if (data.estado == 'SUCESSO') {
                        alert('Categoria criada com sucesso.');
                        inserir_a_categoria(data.resposta);
                        esconder_criar_categoria();
                    } else {
                        alert('Erro: ' + data.mensagem + '.');
                    }
                }, 'json');
            });

            var mostrar_categoria_pai = function() {
                $('.texto-categoria-principal').hide();
                $('#controle-categoria-pai').show();
                return false;
            }

            var esconder_categoria_pai = function() {
                $('.texto-categoria-principal').show();
                $('#controle-categoria-pai').hide();
                return false;
            }

            $('#selecionar-categoria-pai').click(mostrar_categoria_pai);

            $('#modal-categorias #id_categorias').append(
                $('<option>').attr({'disabled': 'disabled'}).addClass('divider')
            ).append(
                $('<optgroup label="Nova categoria">').append(
                    $('<option>').attr({'id': 'criar-nova-categoria', 'value': '0'}).html('Criar nova categoria')
                )
            );

            var locked_by_item = function(item_locked, by_id) {
                // "Trava" um item por um outro item.
                itens_ids = item_locked.data('locked_ids');
                if (!itens_ids) {
                    itens_ids = {};
                }
                itens_ids[by_id] = true;
                item_locked.data('locked_ids', itens_ids);
            }

            var remove_lock = function(item_locked, by_id) {
                // "Trava" um item por um outro item.
                itens_ids = item_locked.data('locked_ids');
                if (!itens_ids) {
                    item_locked.data('locked_ids', {});
                } else {
                    if (by_id in itens_ids) {
                        delete itens_ids[by_id];
                    }
                    if (item_locked.val() in itens_ids && item_locked.val() != $('#modal-categorias #body-selecionar-categoria #id_categorias').val()) {
                        delete itens_ids[item_locked.val()];
                    }
                    item_locked.data('locked_ids', itens_ids);
                }
            }

            var update_locked_items = function() {
              var selected_value = $('#modal-categorias #body-selecionar-categoria #id_categorias').val();

              if (selected_value) {
                var locked_items = $('#modal-categorias #body-selecionar-categoria [type=checkbox]:disabled:not([value=' + selected_value + '])').toArray();
                locked_items = locked_items.reverse();

                for (var item in locked_items) {
                  item = $(locked_items[item]);
                  var locked_ids = Object.keys(item.data('locked_ids'));
                  var unlock = true;

                  for (var locked_id in locked_ids) {
                    locked_id = locked_ids[locked_id];
                    if ($('#modal-categorias #body-selecionar-categoria [type=checkbox][value=' + locked_id + ']').attr('checked')) {
                      unlock = false;
                    }
                  }

                  if (unlock) {
                    item.removeAttr('disabled').removeAttr('checked');
                  }
                }
              }
            };

            $('#modal-categorias #body-selecionar-categoria #id_categorias').change(function() {
              var self = $(this);
              var value = self.val();
              var categoria_principal_recem_selecionada_id = $('#modal-categorias #body-selecionar-categoria #id_categorias').val();

              if (self.children().find('#criar-nova-categoria:selected').length) {
                mostrar_criar_categoria();
              }

              if (value) {
                $('#modal-categorias input[type=checkbox][value=' + value + ']').removeAttr('disabled');
                $('#modal-categorias input[type=checkbox][value=' + categoria_principal_recem_selecionada_id + ']').removeAttr('disabled');
                var selected = $('#modal-categorias input[type=checkbox][value=' + value + ']');

                if (!selected.attr('checked')) {
                  $('#modal-categorias input[type=checkbox][value=' + categoria_principal_recem_selecionada_id + ']').removeAttr('checked');
                  categoria_principal_recem_selecionada_id = value;
                }
                selected.attr({disabled: 'disabled', checked: 'checked'}).change();
                selected.parents('ul').find('li').removeClass('principal').find('small').remove();
                selected.parents('li').addClass('principal').find('label').append($('<small>').text('Principal').addClass('label label-success'));
                update_locked_items();
              };
            }).change();

            $('#modal-categorias #link-categorias-secundarias').click(function () {
                var self = $(this);
                if (self.hasClass('item-opened')) {
                    self.html('<span class="glyphicon glyphicon-chevron-right"></span> Adicionar mais categorias ao produto').addClass('item-closed').removeClass('item-opened');
                    var principal_id = $('#modal-categorias #body-selecionar-categoria #id_categorias').val();
                    $('#categorias-secundarias').hide().find(':checked:not([value=' + principal_id + '])').removeAttr('checked').removeAttr('disabled');
                    $('#modal-categorias #id_categorias').change();
                } else {
                    self.html('<span class="glyphicon glyphicon-chevron-down"></span> Remover categorias adicionais do produto').addClass('item-opened').removeClass('item-closed');
                    $('#categorias-secundarias').show();
                    $('#modal-categorias #id_categorias').change();
                }
                return false;
            });

            $('#abrir-modal-categorias').click(function () {
                $('#categorias-secundarias :checked').change()
                $('#modal-categorias').modal('show');
                return false;
            });

            $('#modal-categorias [name=categoria_secundaria]').change(function () {
                var self = $(this);
                var item = self;
                var contador = 0;
                var nivel_atual = self.attr('data-level');
                if (self.attr('checked')) {
                    while (true) {
                        var nivel_item = item.attr('data-level');
                        if (nivel_atual > nivel_item || contador == 0) {
                            item.attr({'checked': 'checked'});
                            locked_by_item(item, self.val());
                            if (contador != 0) {
                                item.attr({'disabled': 'disabled'});
                            }
                            nivel_atual = nivel_item;
                        }
                        if (parseInt(nivel_item) === 0) {
                            break;
                        }

                        item = item.parents('li').prev().find('input');

                        if (contador > 100) {
                            break;
                        }
                        contador++;
                    }
                } else {
                    while (true) {
                        var nivel_item = item.attr('data-level');
                        if (nivel_atual > nivel_item && item.attr('disabled') && !item.parents('li').hasClass('principal')) {
                            remove_lock(item, self.val());
                            if (Object.keys(item.data('locked_ids')).length == 0) {
                                item.removeAttr('disabled');
                                item.removeAttr('checked');
                            }
                            nivel_atual = nivel_item;
                        }
                        if (parseInt(nivel_item) === 0) {
                            break;
                        }

                        item = item.parents('li').prev().find('input');

                        if (contador > 100) {
                            break;
                        }
                        contador++;
                    }
                }
                update_locked_items();
                return false;
            });

            var atualizar_seletor_categorias = function() {
                var categoria_principal = $('#modal-categorias #body-selecionar-categoria #id_categorias');
                var categoria_principal_id = categoria_principal.val();
                var categoria_principal_nome = categoria_principal.find(':selected').text();
                categoria_principal_nome = categoria_principal_nome.replace(/\-\- /g, '');

                var categorias_secundarias_itens = $('#modal-categorias #body-selecionar-categoria [name=categoria_secundaria][disabled!=disabled]:checked');
                var categorias_secundarias_quantidade = categorias_secundarias_itens.length;

                if (categorias_secundarias_quantidade) {
                    var categorias_secundarias_texto = ' <small  style="font-size: 11px; color: #888">(+' + categorias_secundarias_quantidade + ' categoria' + ((categorias_secundarias_quantidade > 1) ? 's' : '') + ')</small>';
                } else {
                    var categorias_secundarias_texto = '';
                }
                $('#selecao-categoria .dropdown-label').html(categoria_principal_nome + categorias_secundarias_texto);
                categoria_principal.change();
            }

            $('#modal-categorias form').submit(function () {
                var self = $(this);
                var params = self.serialize();
                $.post('//app.lojaintegrada.com.br/painel/catalogo/produto/editar/categoria/7272175', params, function(data) {
                    if (data.estado == 'SUCESSO') {
                        atualizar_seletor_categorias();
                        $('#modal-categorias').modal('hide');
                    } else {
                        alert(data.mensagem);
                    }
                }, 'json');
                return false;
            });

            $('#modal-categorias.acao-criar #footer-selecionar-categoria [type=submit]').click(function(){
                // Esta função é usada quando o produto ainda não foi criado.
                // Ela deve injetar hidden inputs dentro do formulário do produto.
                var categoria_principal = $('#modal-categorias #body-selecionar-categoria #id_categorias');
                var categoria_principal_id = categoria_principal.val();
                var categorias = $('<input>').attr({'type': 'hidden', 'name': 'categorias[]'}).val(categoria_principal_id);

                var categorias_secundarias_itens = $('#modal-categorias #body-selecionar-categoria [name=categoria_secundaria][disabled!=disabled]:checked');
                var categorias_secundarias = [];
                for (var i = 0; i < categorias_secundarias_itens.length; i++) {
                    var item = categorias_secundarias_itens.eq(i);
                    var input = $('<input>').attr({'type': 'hidden', 'name': 'categoria_secundaria[]'}).val(item.val());
                    categorias_secundarias.push(input);
                }

                $('#categorias_inputs').remove();

                $('.form-produto').append(
                    $('<div>').attr({'id': 'categorias_inputs'}).append(categorias).append(categorias_secundarias)
                );

                atualizar_seletor_categorias();

                $('#modal-categorias').modal('hide');
            });
        }

        var marcas = (function() {
            var arr_marcas = [];
            var marca_option = $('#id_marca option');
            var j = 0;
            for (var i = 0; i < marca_option.length; i++) {
              if (marca_option[i].value !== "") {
                arr_marcas[j] = {
                  "id": marca_option[i].value,
                  "nome": marca_option[i].text
                }
                j++;
              }
            }
            return arr_marcas;
        }) ();

        var categorias = (function() {
          var arr_categorias = [];
          var categoria_option = $('#modal-categorias #body-selecionar-categoria #id_categorias option');
          var j = 0;
          for (var i = 0; i < categoria_option.length; i++) {
            if (categoria_option[i].value !== "" && categoria_option[i].value !== "0") {
              arr_categorias[j] = {
                "id": categoria_option[i].value,
                "nome": categoria_option[i].text
              }
              j++;
            }
          }
          return arr_categorias;
        }) ();


        $('#buscaMarca').typeahead({
          source: function() {
            var r_marcas = [];
            for (var i = 0; i < marcas.length; i++) {
              r_marcas[i] = marcas[i].nome;
            }
            return r_marcas;
          },
          updater: function(item) {
            var id;
            for (var i = 0; i < marcas.length; i++) {
              if (marcas[i].nome === item) {
                id = marcas[i].id;
                break;
              }
            }
            $('#id_marca option[value=' + id + ']').attr('selected', 'selected');
            $('.marca ul.dropdown-options').find('li a[value=' + id + ']').click();
          }
        });

        $('#buscaCategoria').typeahead({
          source: function() {
            var r_categorias = [];
            for (var i = 0; i < categorias.length; i++) {
              r_categorias[i] = categorias[i].nome;
            }
            return r_categorias;
          },
          updater: function(item) {
            var id;
            var acao = "editar";
            var select_categoria = $('#modal-categorias #body-selecionar-categoria #id_categorias');
            var categoria_principal = select_categoria.val();
            for (var i = 0; i < categorias.length; i++) {
              if (categorias[i].nome === item) {
                id = categorias[i].id;
                break;
              }
            }
            if (categoria_principal) {
              $('#categorias-secundarias input[value='+ id + ']').click();
            } else {
              // Seta a primeira como categoria principal
              select_categoria.find('option[value=' + id + ']').attr('selected', 'selected');
            }
            atualizar_seletor_categorias();
            // salva as alterações.
            if (acao == 'editar'){
                $('#modal-categorias form').submit();
            } else {
                $('#modal-categorias.acao-criar #footer-selecionar-categoria [type=submit]').click();
            }

          }
        });
    });

    var scroll_para_elemento = function(elemento) {
        $('html, body').animate({
            scrollTop: $(elemento).offset().top - 60
        }, 1000);
    };

    var mostrar_criar_nova_variacao = function() {
        $('.produto-form-atributo-criar').find('input, textarea, select').removeAttr('disabled');
        $('#block-new').show();

        $('#saveButton').hide();
        window.save_button_hide = true;
        window.total_produtos_abertos++;

        return false;
    };

    var esconder_criar_nova_variacao = function() {
        $('.produto-form-atributo-criar').find('input, textarea, select').attr('disabled', 'disabled');
        $('#block-new').hide();

        window.total_produtos_abertos--;
        if (window.total_produtos_abertos == 0) {
            $('#saveButton').show();
            window.save_button_hide = false;
        }
        scroll_para_elemento('.produto-opcoes');
        return false;
    };

    var mostrar_editar_opcao = function(produto_id) {
        $('#block-prd-atr-' + produto_id + ' .produto-atributo-form').find('input, textarea, select').removeAttr('disabled');
        $('#block-prd-atr-' + produto_id + ', #block-line-prd-atr-' + produto_id).toggle();

        muda_gerenciado();

        $('#block-prd-atr-' + produto_id + ' .produto-atributo-form').find('[name=gerenciado]').change()

        $('#saveButton').hide();
        window.save_button_hide = true;
        window.total_produtos_abertos++;

        return false;
    };

    var duplicar_opcao = function(produto_id) {
        var linha = $('#block-prd-atr-' + produto_id);
        var nova_linha
        var campos = [
            'id_cheio', 'id_promocional', 'id_peso', 'id_altura', 'id_largura',
            'id_profundidade', 'id_gerenciado', 'id_situacao_em_estoque',
            'id_quantidade', 'id_situacao_sem_estoque']

        mostrar_criar_nova_variacao();
        var nova_linha = $('#block-new');

        for (var i in campos) {
            var campo = campos[i];
            var _id = '#' + campo;
            nova_linha.find(_id).val(linha.find(_id).val()).change()
        }

        return false;
    };

    var esconder_editar_opcao = function(produto_id) {
        $('#block-prd-atr-' + produto_id + ' .produto-atributo-form').find('input, textarea, select').attr('disabled', 'disabled');
        $('#block-prd-atr-' + produto_id + ', #block-line-prd-atr-' + produto_id).toggle();

        window.total_produtos_abertos--;
        if (window.total_produtos_abertos == 0) {
            $('#saveButton').show();
            window.save_button_hide = false;
        }
        scroll_para_elemento('.produto-opcoes');
        return false;
    };

    mostrar_alert_opcoes_produto = function (tipo, mensagem) {
        var tipos = ['success', 'error', 'info', 'warning'];
        if ($.inArray(tipo, tipos) < 0) {
            alert('Erro ao tentar mostrar alert do produto com variação. ' +
                  'O tipo "' + tipo + '" não existe.');
        }
        // Remove qualquer class anterior do alert.
        $.each(tipos, function(i, e) { $('.alert-opcoes-produto').removeClass('alert-' + e); });
        // Adiciona a nova classe e a mensagem.
        $('.alert-opcoes-produto').addClass('alert-' + tipo).html(mensagem).show();
        // Rola a tela para mostrar o alert.
        scroll_para_elemento('.alert-opcoes-produto');
    };

    esconder_alert_opcoes_produto = function () {
        $('.alert-opcoes-produto').hide().html('');
    };

    
</script>


    

    
      



<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-35405092-1']);
  _gaq.push(['_setDomainName', 'lojaintegrada.com.br']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();