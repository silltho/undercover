import React from 'react'

 // const App = {} hier cable intitialisieren

class CommentList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      message: {
        comments: [{
          id: 1,
          user: {
            name: 'user1'
          },
          body: 'wow hallo'
        }]
      },
      message_id: null
    }
  }

  componentDidMount() {
    this.setupSubscription()
  }

  setupSubscription = () => {
    /* App.comments = App.cable.subscriptions.create('MessageChannel', {
      message_id: this.state.message.id,

      connected() {
        // Timeout here is needed to make sure Subscription
        // is setup properly, before we do any actions.
        setTimeout(() => this.perform('follow', { message_id: this.message_id }), 1000)
      },

      received(data) {
        this.updateCommentList(data.comment)
      },

      updateCommentList: this.updateCommentList
    }) */
  }

  updateCommentList = (comment) => {
    const message = JSON.parse(comment)
    this.setState({ message })
  }

  renderComment = (comment) => (
    <article key={comment.id}>
      <h3>Comment by { comment.user.name } </h3>
      <p>{ comment.body }</p>
    </article>
  )

  render() {
    const comments = this.state.message.comments.map((comment) => this.renderComment(comment))

    return (
      <div>{comments}</div>
    )
  }
}

export default CommentList
