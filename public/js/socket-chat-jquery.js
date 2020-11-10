var params = new URLSearchParams(window.location.search)

var divUsuarios = $("#divUsuarios")
var formEnviar = $("#formEnviar")
var txtMensaje = $("#txtMensaje")
var divChatBox = $("#divChatbox")

var nombre = params.get('nombre')
var sala = params.get('sala')

function renderizarMensaje(msg, own) {    
    // console.log(msg)
    let f = new Date(msg.fecha)
    let h = `${f.getHours()}:${f.getMinutes()}`
    var adminClass = 'info';
    if (msg.nombre === 'Admin')
        adminClass = 'danger'
    let html = `<li class="animated fadeIn ${(own) ? "reverse" : ""}">
        ${(!own && msg.nombre != 'Admin') ? '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>' : ''}
        </div>
        <div class="chat-content">
            <h5>${msg.nombre}</h5>
            <div class="box ${(own) ? "bg-light-inverse" : `bg-light-${adminClass}`}">${msg.msg}</div>
        </div>
        ${(own) ? '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>' : ''}
        <div class="chat-time">${h}</div>
    </li>`;     
    divChatBox.append(html)    
    scrollBottom()
}

function renderizarUsuarios(personas) {
    // console.log(personas);

    let html = `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span>${params.get('sala')}</span></a>
            </li>`
    personas.forEach(p => {
        html +=
            `<li>
                <a data-id="${p.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${p.nombre}<small class="text-success">online</small></span></a>
            </li>`
    })
    divUsuarios.html(html)
}
function scrollBottom() {
    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id')
    if (id)
        console.log(id); //no se usa nunca el mensaje privado.

})
formEnviar.on('submit', function (e) {
    e.preventDefault()
    let txt = txtMensaje.val().trim()
    // console.log(txt);
    if (txt) {
        socket.emit('crearMensaje', {
            nombre: nombre,
            msg: txt
        }, function (msg) {
            txtMensaje.val('').focus()
            renderizarMensaje(msg, true)  
        })
    }
})