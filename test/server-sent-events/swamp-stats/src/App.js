import React from 'react'
import EventStream from './EventStream'
import ChuckNorris from './ChuckNorris'

import './App.scss'

export default function App() {
    return <div>
        <EventStream/>
        <ChuckNorris/>
    </div>
}