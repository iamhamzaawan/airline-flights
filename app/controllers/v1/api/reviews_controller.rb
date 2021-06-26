module v1
  module api
    class ReviewsController < ApplicationController
      before_action :find_review, only: [:destroy]

      def create
        reviews = Review.create(reviews_params)

        if reviews.errors.blank?
          render json: ReviewSerializer.new(reviews).serialized_json
        else
          render json: { error: reviews.errors.full_messages }, status: 422
        end
      end

      def destroy
        if @review.destroy
          head :no_content
        else
          render json: { error: @review.errors.full_messages }, status: 422
        end
      end

      private
        def find_review
          @review = Reviews.find(params[:id]) if params[:id]
        end

        def reviews_params
          params.require(:airline).permit(:title, :description, :score, :airline_id)
        end
    end
  end
end