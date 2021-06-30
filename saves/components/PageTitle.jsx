import React from 'react'
import './components.css'

const PageTitle = ({ title }) => {

    return (
        <div className="pagetitle">
            <p className="title">{title}</p>
        </div>
    )
}

export default PageTitle