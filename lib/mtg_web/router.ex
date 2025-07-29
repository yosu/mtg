defmodule MtgWeb.Router do
  use MtgWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {MtgWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MtgWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/counter", PageController, :counter
  end

  # Other scopes may use custom stacks.
  # scope "/api", MtgWeb do
  #   pipe_through :api
  # end
end
