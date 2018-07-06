const ws = new WebSocket('ws://192.168.70.131:10060')

ws.sendJson = (json) => {
  ws.send(JSON.stringify(json))
}

ws.onopen = () => {
  console.log('ws连接已开启.....')
  if (ws.onConnect) ws.onConnect()
}

ws.onmessage = (e) => {
  if (ws.onMessage) ws.onMessage(e)
}

ws.onclose = function () {
  console.log("连接已关闭...")
  if (ws.onClose) ws.onClose()
}

export default ws
