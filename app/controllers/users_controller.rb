class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token  

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render :json => @user
    else
      render :json => { :errors => @user.errors.full_messages }
    end
  end

  def user_params
    params.permit(:nickname, :email, :password, :password_confirmation)
    # params.require(:user).permit(:nickname, :email, :password, :password_confirmation)
  end

end
