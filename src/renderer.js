const video = document.getElementById('video')
const canvas = document.getElementById('canvas')


function minimizar(){
    window.actions.minimize();
}
function maximizar(){
    window.actions.maximize();
}
function sair(){
    window.actions.quit();
}

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
        video.srcObject = stream
    }).catch(err=>{
        alert("Erro ao acessar a camera"+err)
    })
}

async function cadastrar(){
    var obj = {
        nome : nome.value,
        email:email.value,
        senha:senha.value,
        cpf:cpf.value,
    }
    await window.actions.save(obj)
    limpar();
}

function limpar(){
    nome.value = "";
    email.value = "";
    senha.value = "";
    cpf.value = "";
}
function teste(){
    window.actions.message();

}

const captura = document.getElementById('captura')

captura.addEventListener("click",()=>{
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'foto.png'
    link.click()
})   

