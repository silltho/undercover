import React from 'react'
import ReactDOM from 'react-dom'
import CommentsList from '../components/CommentsList'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CommentsList />,
    document.body.appendChild(document.createElement('div')),
  )
})
