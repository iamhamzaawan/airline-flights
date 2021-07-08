module Api
  module V1
    class AirlinesController < ApplicationController
      before_action :find_airline, only: [:show, :update,  :destroy]
      
      def index
        airlines = Airline.all.order(:id)

        render json: AirlineSerializer.new(airlines).serialized_json
      end

      def show
        render json: AirlineSerializer.new(@airline).serialized_json
      end

      def create
        airline = Airline.create(airline_params)

        if airline.errors.blank?
          render json: AirlineSerializer.new(airline).serialized_json
        else
          render json: { error: airline.errors.full_messages }, status: 422
        end
      end

      def update
        if @airline.update(airline_params)
          render json: AirlineSerializer.new(@airline).serialized_json
        else
          render json: { error: @airline.errors.full_messages }, status: 422
        end
      end

      def destroy
        if @airline.destroy
          render json: { message: "Deleted Successfully" }
        else
          render json: { error: @airline.errors.full_messages }, status: 422
        end
      end

      private
        def find_airline
          @airline = Airline.find_by(slug: params[:slug]) if params[:slug]
          render json: { error: ["Airline not found"] }, status: 404 if @airline.blank? 
        end

        def airline_params
          params.require(:airline).permit(:name, :image_url)
        end
    end
  end
end
