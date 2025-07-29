defmodule MtgWeb.PageController do
  use MtgWeb, :controller

  def home(conn, _params) do
    redirect(conn, to: ~p"/counter")
  end

  def counter(conn, _params) do
    render(conn |> assign(:page_title, "MtG Counter"), :counter, layout: false)
  end
end
