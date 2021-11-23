var cuboDashboard = new Object();

cuboDashboard.corItem =
{
    grey: 0,
    white: 1,
    red: 2,
    purple: 3
};

cuboDashboard.CriarItem = function (idDiv, titulo, corItem, conteudo = "") {

    var _titulo = "Sem titulo";

    if (titulo == null || titulo == "" || titulo == undefined) {
        titulo = _titulo;
    }
    var cores = cuboDashboard.ObterCoresItem(corItem);

    var divTopo = $('<div>');
    divTopo.addClass('itemTop');
    divTopo.css('color', cores.corTitulo);

    var divCabecalho = $('<div>');
    divCabecalho.addClass('itemCabecalho');

    var divTitulo = $('<div>');
    divTitulo.text(titulo);
    divTitulo.addClass('itemTitulo');

    var divControles = $('<div>');
    divControles.addClass('ItemControle');

    cuboDashboard.ConfigurarBotoes(idDiv, divControles);

    var divConteudo = $('<div>');
    divConteudo.addClass('itemConteudo');
    divConteudo.attr('id', idDiv + 'Conteudo');
    divConteudo.css('overflow', 'auto');

    $('#' + idDiv).html('');
    $('#' + idDiv).append(divTopo);
    divTopo.append(divCabecalho);
    divCabecalho.append(divTitulo);
    divTitulo.append(divControles);

    divConteudo.css('height', '180px');
    divConteudo.append(conteudo);
    divTopo.append(divConteudo);

    $('#' + idDiv).css('background-color', cores.corFundo);
    $('#' + idDiv).addClass('efeitoDiv');

}

cuboDashboard.ObterCoresItem = function (corItem) {
    var retorno = { corFundo: 'gray' , corTexto: 'white' , corTitulo: 'white' };

    switch (corItem) {

        case cuboDashboard.corItem.grey:
            retorno.corFundo = 'rgb(105,105,105)';
            retorno.corTexto = 'white';
            retorno.corTitulo = 'white';
            break;

            case cuboDashboard.corItem.white:
                retorno.corFundo = 'rgb(248,248,255)';
                retorno.corTexto = 'black';
                retorno.corTitulo = 'black';
                break;

                case cuboDashboard.corItem.red:
                    retorno.corFundo = 'rgb(255,0,0)';
                    retorno.corTexto = 'black';
                    retorno.corTitulo = 'black';
                    break;
                    
                    case cuboDashboard.corItem.purple:
                    retorno.corFundo = 'rgb(128,0,128)';
                    retorno.corTexto = 'black';
                    retorno.corTitulo = 'black';
                    break;
    }

    return retorno;
}

cuboDashboard.ConfigurarBotoes = function (idDiv, divControles) {
    
    var btnMinimizar = cuboDashboard.CriarBotoes(idDiv, divControles, 'img/min.png', 'MinMax', 'itemBotaoMax');
        btnMinimizar.click(function () {
            cuboDashboard.ModoBotao(idDiv, this);
    });

     var btnFechar = cuboDashboard.CriarBotoes(idDiv, divControles, 'img/fechar.png' , 'fechar');

     btnFechar.click(function () {
         $("#" + idDiv).hide('slow' , function () {
             var divCubo = $(this).parent();
             divCubo.remove()
         })
    });

}

cuboDashboard.ModoBotao = function (idDiv, botao) {
   
    var classeNome = $('#' + botao.id).attr('class');
   
    if (classeNome == 'itemBotaoMax') {
    $('#' + idDiv + "Conteudo").hide('slow', function () {
        $('#' + botao.id).attr('src', 'img/max.png');
    });
        
        $('#' + botao.id).removeClass('itemBotaoMax');
        $('#' + botao.id).addClass('itemBotao');
    }

    if (classeNome == 'itemBotao') {
        $('#' + idDiv + "Conteudo").animate({heigth: '180px'}, 500, 'swing', function () {
            $('#' + idDiv + "Conteudo").show('slow');
            $('#' + botao.id).attr('src', 'img/min.png');
            $('#' + botao.id).attr('minimizado', 'false');
        });

            $('#' + botao.id).addClass('itemBotaoMax');
        $('#' + botao.id).removeClass('itemBotao');
    }
}

cuboDashboard.CriarBotoes = function (idDiv, divControles, img, sufixo, classe = "") {

    var novoBotao = $('<img>');
    var idBotao = 'Botao' + idDiv + sufixo;
    novoBotao.attr('id' , idBotao);

    var classeBotao = "itemBotao";

    if (classe != "") {
        classeBotao = classe;
    }

    novoBotao.addClass(classeBotao);
    novoBotao.attr('divContainer' , idDiv);
    novoBotao.attr('src' , img);

    divControles.append(novoBotao);

    return novoBotao;
}