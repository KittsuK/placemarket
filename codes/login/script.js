function login(){
    var name = $('#user').val();
    var password = $('#password').val();


    if(name && password && name === "admin" && password === "admin"){
        const user = {
            name: name,
            antryDate: format(new Date()),
            id: Math.floor(Math.random() * 100000),
        }
        localStorage.setItem("name", JSON.stringify(name))
        window.location.href = "../store/index.html"
        console.log("deu boa")
        
    }else{
        document.getElementById("error-modal").style.display = "flex";
        document.getElementById("name").style.border = "2px solid red";
        document.getElementById("password").style.border = "2 solid red";
    }
}

function closeError(){
    document.getElementById("error-modal").style.display = "none";
    document.getElementById("user").style.border = "2px solid rgb(118, 0, 145)";
    document.getElementById("password").style.border = "2px solid rgb(118, 0, 145)";
}

function showPassword(){
    var inputPassword = document.getElementById("password");
    console.log(new Date())



    if(inputPassword.getAttribute("type") === "password"){
        inputPassword.setAttribute("type", "text")
    }else{
        inputPassword.setAttribute("type", "password")
    }
}

function format(item){
    var options = {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
    return item.tolocaleString("pt-BR", options)
}