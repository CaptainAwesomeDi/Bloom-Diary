class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token  

  def create
    @user = User.find_by_email(params[:email].downcase)
    if @user = User.authenticate_with_credentials(params[:email], params[:password])
      session[:user_id] = @user.id
      render :json => {
        status: 200,
        data: @user,
        message: "Successfully Login!"
      }.to_json
    else
      render :json => {
        status: 400,
        message: "Email or passowrd is invalid"
      }.to_json
    end
  end

  def destroy
    session[:user_id] = nil
    render :json => {
      status: 200,
      message: "Successfully Logout!"
    }.to_json
  end


end
