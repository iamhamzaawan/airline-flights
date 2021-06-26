module v1
  module api
    class AirlineController < ApplicationController
      before_action :find_airline, only: [:show, :update,  :destroy]
      
      def index
        airlines = Airline.all

        render json: AirlineSerializer.new(airlines).serialized_json
      end

      def show
        render json: AirlineSerializer.new(@airline, options).serialized_json
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
          render json: AirlineSerializer.new(@airline, options).serialized_json
        else
          render json: { error: @airline.errors.full_messages }, status: 422
        end
      end

      def destroy
        if @airline.destroy
          head :no_content
        else
          render json: { error: @airline.errors.full_messages }, status: 422
        end
      end

      private
        def find_airline
          @airline = Airline.find_by(slug: params[:slug]) if params[:slug]
        end

        def airline_params
          params.require(:airline).permit(:name, :image_url)
        end

        def options
          options ||= { include: %i[:reviews]}
        end
    end
  end
end
