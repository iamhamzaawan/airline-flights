class AirlineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :image_url, :slug, :avg_score, :reviews
end
