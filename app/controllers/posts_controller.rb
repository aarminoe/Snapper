class PostsController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        posts = Post.all
        render json: posts, include: ['comments.comment_replies', 'comments.comment_replies.comment_reply_likes','comments.comment_likes', 'user', 'post_likes', 'tags']
    end

    def create
        post = Post.create(post_params)
        if post.valid?
            render json: post, status: :created
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        post = Post.find_by(id:params[:id])
        if post 
            post.update(post_params)
            render json: post
        else 
            render json: { error: 'Post Not Found' }, status: :not_found
        end
    end

    def destroy 
        post = Post.find_by(id: params[:id])
        if post 
            post.destroy 
            head :no_content
        else 
            render json: { error: 'Post not found' }, status: :not_found
        end
    end

    private

    def post_params
        params.permit(:title, :image_url, :user_id, :edit)
    end

end
