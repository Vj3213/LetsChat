const responses = {
    hi: 'hello',
    hello: 'hi',
    hie: 'hey',
    hey: 'hey'
}

export const msgType = {
    SENT: 'sent',
    RECEIVED: 'received'
}

export const msgFormat = {
    TXT: 'text'
}

export const generateResponse = (msg) => {
    if (msg) {
        const formattedMsg = msg.toLowerCase().trim();
        const res = responses[formattedMsg] ? responses[formattedMsg] : 'Your reply';
        return { id: 'receive' + Date.now(), type: msgType.RECEIVED, format: msgFormat.TXT, data: res }
    }
}