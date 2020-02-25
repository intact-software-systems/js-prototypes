import React, {useState} from 'react'
import PropTypes from 'prop-types'

export default function Input(props) {
    const [msg, setMsg] = useState('')

    return <div>
        <label>
            <span>Skriv melding</span>

            <input
                type='text'
                value={msg}
                onChange={event => {
                    console.log(event.target.value)
                    setMsg(event.target.value)
                }}
                onKeyDown={event => {
                    if (event.which === 13) {
                        props.onMessage(msg)
                        setMsg('')
                    }
                }}
            />
        </label>
    </div>
}

Input.propTypes = {
    onMessage: PropTypes.func.isRequired
}