desc "Remind users if they haven't completed registration"
task :remind_of_registration => :environment do
  puts "Change state of Games"
  Gameworker.new.perform
  puts "done."
end