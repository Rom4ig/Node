function add() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    $.post(
        "/add",
        {
            name: name,
            phone: phone
        },
    ).success(() => {
        document.location.href = "/";
    });
}

function update() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let regex = /id=([0-9]*)/;
    let id = location.href.match(regex)[1];
    $.post(
        "/update",
        {
            id: id,
            name: name,
            phone: phone
        },
    ).success(() => {
        document.location.href = "/";
    });
}

function del() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let regex = /id=([0-9]*)/;
    let id = location.href.match(regex)[1];
    $.post(
        "/delete",
        {
            id:id,
            name: name,
            phone: phone
        },
    ).success(() => {
        document.location.href = "/";
    });
}

function change() {
    document.getElementById('delete').disabled = true;
}