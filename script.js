function get() {
    fetch('https://facec-webapi-2022.herokuapp.com/clientes/', {
        method: "GET"
    }).then(response =>
        response.json()
    ).then(data => {
        document.getElementById("table").classList.remove("visually-hidden");
        let list = document.querySelector("#fill_list tbody")
        data.map((item) => {
            let tr = document.createElement('tr');
            let tdNome = document.createElement('td');
            let tdDocumento = document.createElement('td');
            let tdId = document.createElement('td');
            let tdDeletar = document.createElement('td');
            let linkDeletar = document.createElement('a');

            linkDeletar.addEventListener('click', deletar);
            linkDeletar.classList.add('teste')

            tdNome.innerHTML = item.nome;
            tdDocumento.innerHTML = item.documento;
            tdId.innerHTML = item.id;
            linkDeletar.dataset.id = item.id;
            linkDeletar.innerHTML = "X";

            tdDeletar.appendChild(linkDeletar);
            tr.appendChild(tdNome);
            tr.appendChild(tdDocumento);
            tr.appendChild(tdId);
            tr.appendChild(tdDeletar);
            list.appendChild(tr);
        })
    })
    
}

function clean() {
    self.location = "./index.html";
}

function cadastro(){
    document.getElementById("form").classList.remove("visually-hidden");
}

function register() {
    const myForm = document.getElementById('myForm');

    myForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        document.getElementById("form").classList.add("visually-hidden");
        alert("Cadastro com Problema de CORS! Contate o Professor Juliano.");

        fetch('https://facec-webapi-2022.herokuapp.com/clientes/', {
            method: "POST",
            headers: getHeaders(),
            body: formData
        }).then(function (response) {
            response.text();
        }).then(function (text) {
            alert("Cadastro com Problema");
        }).catch(function (error) {
            console.log(error)
        })
    })
}

function getHeaders(){
    let myHeaders = new Headers({
            "Content-Type": "application/json",
            "accept": "*/*",
        });
    return myHeaders;
}

function deletar(){
    let id = this.dataset.id
    fetch('https://facec-webapi-2022.herokuapp.com/clientes/' + id, {
        method: "DELETE",
        headers: getHeaders(),
    }).then(response =>
        response.json(),
        alert("Delete com Problema de CORS! Contate o Professor Juliano.")
    )
}

register();