const servers = null
const channelName = 'name'
const dataChannelOptions = {
    ordered: true,
    negotiated: true,
    id: 0
}
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/rtc',
    headers: {'Content-Type': 'application/json'},
})

// 1. Alice creates an RTCPeerConnection object.
const connection = new RTCPeerConnection(servers)

const channel = connection.createDataChannel(channelName, dataChannelOptions)

channel.onopen = () => {
    console.log('channel open readyState', channel.readyState)
    channel.send('Connection initiated')
}
channel.onclose = () => {
    console.log('channel close readyState', channel.readyState)
}
channel.onmessage = event => {
    console.log('Alice data received', event.data)
}

window.rtcSendMessage = msg => {
    channel.send(msg)
}

// 10. Alice creates an RTCPeerConnection object with an onicecandidate handler.
// 11. The handler is called when network candidates become available.
connection.onicecandidate = ({candidate}) => {
    if(!candidate) { return }
// 12. In the handler, Alice sends stringified candidate data to Eve, via their signaling channel.
    console.log('send this candidate to Eve\n', JSON.stringify(candidate))
    axiosInstance({
        method: 'post',
        url: '/candidate',
        data: candidate
    }).then(console.log).catch(console.error)
}

connection.onicecandidateerror = console.error
connection.oniceconnectionstatechange = event =>
    console.log('localConnection change', event)

// 2. Alice creates an offer (an SDP session description) with the RTCPeerConnection createOffer() method.
rtcCreateOffer = async () => {
    const offer = await connection.createOffer()
// 3. Alice calls setLocalDescription() with her offer.
    connection.setLocalDescription(offer)
// 4. Alice stringifies the offer and uses a signaling mechanism to send it to Eve.
    console.log('send this Offer to Eve\n', JSON.stringify(offer))
    return offer
}

rtcAcceptOffer = async (offer) => {
// 5. Eve calls setRemoteDescription() with Alice's offer, so that her RTCPeerConnection knows about Alice's setup.
    await connection.setRemoteDescription(offer)
// 6. Eve calls createAnswer(), and the success callback for this is passed a local session description: Eve's answer.
    const answer = await connection.createAnswer()
// 7.  Eve sets her answer as the local description by calling setLocalDescription().
    connection.setLocalDescription(answer)
// 8. Eve then uses the signaling mechanism to send her stringified answer back to Alice.
    console.log('send this Answer to Alice\n', JSON.stringify(answer))
    return answer
}

rtcAcceptAnswer = async (answer) => {
// 9. Alice sets Eve's answer as the remote session description using setRemoteDescription().
    await connection.setRemoteDescription(answer)
}

// 13. When Eve gets a candidate message from Alice, she calls addIceCandidate(), to add the candidate to the remote peer description.
rtcAcceptCandidate = async (candidate) => {
    await connection.addIceCandidate(candidate)
}


window.rtcAlice = async () => {
    const offer = await rtcCreateOffer()
    await axiosInstance({
        method: 'post',
        url: '/offer',
        data: offer
    }).catch(console.warn)


    const answerInterval = setInterval(() => {
        axiosInstance({
            method: 'get',
            url: '/answer'
        }).then(({data}) => {
            clearInterval(answerInterval)
            rtcAcceptAnswer(data)
        }).catch(console.warn)
    }, 500)
}

window.rtcEve = async () => {
    const offerInterval = setInterval(() => {
        axiosInstance({
            method: 'get',
            url: '/offer'
        }).then(async ({data}) => {
            clearInterval(offerInterval)
            const answer = await rtcAcceptOffer(data)
            axiosInstance({
                method: 'post',
                url: '/answer',
                data: answer
            }).then(console.log).catch(console.warn)

            const candidateInterval = setInterval(() => {
                axiosInstance({
                    method: 'get',
                    url: '/candidate'
                }).then(({data}) => {
                    clearInterval(candidateInterval)
                    rtcAcceptCandidate(data)
                }).catch(console.warn)
            }, 500)

        }).catch(console.warn)
    }, 500)
}