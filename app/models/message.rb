class Message < ApplicationRecord
  belongs_to :user
  after_commit :broadcast

  def timestamp
    created_at.strftime('%H:%M:%S %d %B')
  end

  private
  def broadcast
    MessageJob.perform_later self
  end

end

