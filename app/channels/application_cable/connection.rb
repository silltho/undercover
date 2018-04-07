module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
 
    def connect
      self.current_user = find_verified_user
    end
 
    private
      def find_verified_user
        current_user = Player.find_by(session_id: cookies.signed[:session_id])
        if current_user.nil?
          reject_unauthorized_connection
        else
          current_user
        end
      end
  end
end