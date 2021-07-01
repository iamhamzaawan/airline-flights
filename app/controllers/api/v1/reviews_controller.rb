module Api
  module V1
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
          render json: { message: "Deleted Successfully" }
        else
          render json: { error: @review.errors.full_messages }, status: 422
        end
      end

      private
        def find_review
          @review = Review.find(params[:id]) if params[:id]
          render json: { error: ["Review not found"] }, status: 404 if @review.blank?
        end

        def reviews_params
          params.require(:review).permit(:title, :description, :score, :airline_id)
        end
    end
  end
end