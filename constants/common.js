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

// "application/pdf"   "audio/mpeg"   "image/jpeg"    "application/pdf"  "application/doc"  "application/docx" "video/mp4"

export const msgFormat = {
    TXT: 'text',
    IMG: 'image',
    PDF: 'pdf',
    DOC: 'doc',
    VID: 'video',
    'image/jpeg': 'image',
    'image/png': 'image',
    'video/mp4': 'video',
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'doc',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'doc',
    'application/msword': 'doc',
    'application/plainText': 'doc'
}

export const generateResponse = (msg) => {
    if (msg) {
        const formattedMsg = msg.toLowerCase().trim();
        const res = responses[formattedMsg] ? responses[formattedMsg] : 'Your reply';
        return { id: 'receive' + Date.now(), type: msgType.RECEIVED, format: msgFormat.TXT, data: res }
    }
}