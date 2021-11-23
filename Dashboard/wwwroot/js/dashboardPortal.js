var objetoDivItemDashboard = new Object();

objetoDivItemDashboard.contator = 0;

objetoDivItemDashboard.CarregaItem = function () {

    cuboDashboard.CriarItem('divItemDashboard1', 'MeuTeste1', cuboDashboard.corItem.white);

    cuboDashboard.CriarItem('divItemDashboard2', 'MeuTeste2', cuboDashboard.corItem.white);

    cuboDashboard.CriarItem('divItemDashboard3', 'MeuTeste3', cuboDashboard.corItem.white);

    cuboDashboard.CriarItem('divItemDashboard4', 'MeuTeste4', cuboDashboard.corItem.red);

    cuboDashboard.CriarItem('divItemDashboard5', 'MeuTeste5', cuboDashboard.corItem.purple);

    cuboDashboard.CriarItem('divItemDashboard6', 'MeuTeste6', cuboDashboard.corItem.grey);


    $("#divItemDashboard1Conteudo").html(objetoDivItemDashboard.CriarTabelaPesquisa());

    objetoDivItemDashboard.AtualizaConteudo();
}


objetoDivItemDashboard.CriarTabelaPesquisa = function () {

    var div = $('<div>');
    var span = $('<span>');
    span.text("Pesquisa: ");

    var input = $('<input>', { id: "txtPesquisa" });
    input.keyup(function () {
        objetoDivItemDashboard.Pesquisa();
    });

    div.append(span);
    div.append(input);

    var tabela = $('<table>', { id: "tabela1", class: "table table-striped table-bordered" });
    var tr = $('<tr>');
    tr.append("<th>Nome</th>")
    tr.append("<th>Valor</th>")
    tabela.append(tr);

    var stringUrl = "/api/ListaProdutos";

    $.ajax({
        type: "POST",
        url: stringUrl,
        dataType: "JSON",        
        success: function (data) {

            data.forEach(function (entidade)
            {
                var row = $('<tr>');
                row.append("<th>" + entidade.nome + " </th>");
                row.append("<th>" + entidade.valor + " </th>");
                tabela.append(row);

            });
        }
    });

            div.append(tabela);

    return div;

}

objetoDivItemDashboard.Pesquisa = function () {

    var tabela = $("#tabela1");

    var tr = $('<tr>');
    tr.append("<th>Nome</th>")
    tr.append("<th>Valor</th>")
    tabela.html(tr);

    var stringUrl = "/api/ListaProdutos";

    var filtro = $("#txtPesquisa").val();

    $.ajax({
        type: "POST",
        url: stringUrl,
        dataType: "JSON",
        data: {filtro: filtro},
        success: function (data) {

            data.forEach(function (entidade) {
                var row = $('<tr>');
                row.append("<th>" + entidade.nome + " </th>");
                row.append("<th>" + entidade.valor + " </th>");
                tabela.append(row);

            });
        }
    });

}

objetoDivItemDashboard.CriarDiv = function (numeroDiv) {

    var div = $('<div>');
    var span = $('<span>');
    span.text("Teste meu teste Conteudo div " + numeroDiv + " - " + objetoDivItemDashboard.contator);
    div.append(span);

    div.css('width', '290px');
    div.css('height', '180px');
    div.css('background-color', 'green');
    div.css('border-radius', '7px');

    return div;
}

objetoDivItemDashboard.AtualizaConteudo = function () {

   // $('#divItemDashboard1Conteudo').html(objetoDivItemDashboard.CriarDiv(1));

    $('#divItemDashboard2Conteudo').html(objetoDivItemDashboard.CriarDiv(2));

    $('#divItemDashboard3Conteudo').html(objetoDivItemDashboard.CriarDiv(3));

    $('#divItemDashboard4Conteudo').html(objetoDivItemDashboard.CriarDiv(4));

    $('#divItemDashboard5Conteudo').html(objetoDivItemDashboard.CriarDiv(5));

    $('#divItemDashboard6Conteudo').html(objetoDivItemDashboard.CriarDiv(6));

    setTimeout(objetoDivItemDashboard.AtualizaConteudo, 3000);
    objetoDivItemDashboard.contator++;

}



$(function () {
    objetoDivItemDashboard.CarregaItem();
});