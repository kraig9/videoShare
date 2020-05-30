module RoomHelper
    def generate_random_string(length=4)
        string = ""
        chars = ("A".."Z").to_a
        length.times do
          string << chars[rand(chars.length-1)]
        end
        string
      end
end
