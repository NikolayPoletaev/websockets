const ws = new WebSocket('ws://localhost:3000')

const statusField = document.getElementById('status')
const form = document.getElementById('form')
const input = document.getElementById('send')
const history = document.getElementById('history')
const nickName = document.getElementById('nickname')

function changeStatus(status) {
    statusField.innerHTML = status
}
function saveMessage(message, userNick) {
    const li = document.createElement('li')
    li.textContent = `${userNick}: ${message}`
    history.appendChild(li)
}
form.addEventListener('submit',(event) => {
    event.preventDefault()

    ws.send(JSON.stringify({
        message: input.value,
        userName: nickName.value
    }))

    input.value = ''
})

ws.onopen = () => changeStatus('ONLINE')
ws.onclose = () => changeStatus('OFFLINE')

ws.onmessage = (response) => {
    let newMessage = JSON.parse(response.data)
    saveMessage(newMessage.message,newMessage.userName)
}