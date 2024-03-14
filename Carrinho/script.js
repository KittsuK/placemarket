$(document).ready(function(){
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    
    const listaElement = $("#lista")

    const totalElement = $("#total")

    function exibirCarrinho(){
        listaElement.empty()

        let totalPreco = 0;

        $.each(carrinho, function(index, item){
            //criar elemento de lista para cada item
            const listItem = $("<li>").text(
                `${item.descricao} - Preço: R$${item.preco.toFixed(2)}`
            )

            const removeButton = $("<button>")
            .text("❌")
            .css("margin-left", "10px")
            .click(function(){
                removeItemDoCarrinho(index);

            })
            listItem.append(removeButton)
            listaElement.append(listItem)
            totalPreco += item.preco;
        })

        totalElement.text(`Total: R$ ${totalPreco.toFixed(2)}`)
    }
    function removeItemDoCarrinho(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()
})

function gerarDocumentoWord(){
    const listaElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")

    //clona a lista para evitar alterar indiretamente a original
    const listaClone = listaElement.cloneNode(true)

    $(listaClone).find("button").remove()

    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML
    
    const conteudoHtml = `
        <html>
            <head>
                <meta charset="UTF-8" />
            </head>
            <body>
                <h1> Pedido confirmado</h1>
                <h3> Agradecemos a sua preferencia 😇</h3>
                <br/>
                ${listaHtml}
                <br/> <br/>
                ${totalHtml}
            </body>
        </html>
    `

    const blob = new Blob([conteudoHtml],{type: "application/msword"})
    const link = document.createElement("a")

    link.href = URL.createObjectURL(blob)
    link.download = "carrinho.doc"
    link.click()
    document.getElementById("pedido")

    document.getElementById("pedido").style.display = "block"
}

function successClose(){
    document.getElementById("pedido").style.display = "none"
    //pode ser substituido por $("id").css({elemento: "atributo", ..., elemento, "atributo"})
}

