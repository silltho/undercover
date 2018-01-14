import cable from 'actioncable'

let consumer

function createChannel(...args) {
  if (!consumer) {
    consumer = cable.createConsumer()
  }

  return consumer.subscriptions.create(...args)
}

function removeSubscription(...args) {
  if (consumer) {
    consumer = consumer.subscriptions.remove(...args)
  }
}

export {
  createChannel,
  removeSubscription
}
