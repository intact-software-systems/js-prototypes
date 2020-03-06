const servers = {
    'iceServers': [{
        'url': 'stun:stun.l.google.com:19302'
    }]
}
// const servers = null
const channelName = 'asdf'

// 1. Alice creates an RTCPeerConnection object.
const aliceConnection = new RTCPeerConnection(servers)

const sendChannel = aliceConnection.createDataChannel(channelName)

sendChannel.onopen = () => {
    console.log('sendChannel open readyState', sendChannel.readyState)
    sendChannel.send(JSON.stringify({some: 'data'}))
}
sendChannel.onclose = () => {
    console.log('sendChannel close readyState', sendChannel.readyState)
}
sendChannel.onmessage = event => {
    console.log('Alice data received', event.data)
}

window.rtcSendMessage = msg => {
    sendChannel.send(msg)
}

// 10. Alice creates an RTCPeerConnection object with an onicecandidate handler.
// 11. The handler is called when network candidates become available.
aliceConnection.onicecandidate = ({candidate}) => {
// 12. In the handler, Alice sends stringified candidate data to Eve, via their signaling channel.
    console.log('send this candidate to Eve\n', JSON.stringify(candidate))
}
aliceConnection.onicecandidate = ({candidate}) => {
// 12. In the handler, Alice sends stringified candidate data to Eve, via their signaling channel.
    console.log('send this candidate to Eve\n', JSON.stringify(candidate))
}
aliceConnection.onicecandidateerror = console.error
aliceConnection.oniceconnectionstatechange = event =>
    console.log('localConnection change', event)

// 2. Alice creates an offer (an SDP session description) with the RTCPeerConnection createOffer() method.
window.rtcCreateOffer = async () => {
    const offer = await aliceConnection.createOffer()
// 3. Alice calls setLocalDescription() with her offer.
    aliceConnection.setLocalDescription(offer)
// 4. Alice stringifies the offer and uses a signaling mechanism to send it to Eve.
    console.log('send this Offer to Eve\n', JSON.stringify(offer))
}

window.rtcAcceptOffer = async (offer) => {
// 5. Eve calls setRemoteDescription() with Alice's offer, so that her RTCPeerConnection knows about Alice's setup.
    await aliceConnection.setRemoteDescription(offer)
// 6. Eve calls createAnswer(), and the success callback for this is passed a local session description: Eve's answer.
    const answer = await aliceConnection.createAnswer()
// 7.  Eve sets her answer as the local description by calling setLocalDescription().
    aliceConnection.setLocalDescription(answer)
// 8. Eve then uses the signaling mechanism to send her stringified answer back to Alice.
    console.log('send this Answer to Alice\n', JSON.stringify(answer))
}

window.rtcAcceptAnswer = async (answer) => {
// 9. Alice sets Eve's answer as the remote session description using setRemoteDescription().
    await aliceConnection.setRemoteDescription(answer)
}

// 13. When Eve gets a candidate message from Alice, she calls addIceCandidate(), to add the candidate to the remote peer description.
window.rtcAcceptCandidate = async (candidate) => {
    await aliceConnection.addIceCandidate(candidate)
}