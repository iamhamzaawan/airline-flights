class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :description, :score, :airline_id
end
