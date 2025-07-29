defmodule MtgWeb.PageController do
  use MtgWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def counter(conn, _params) do
    render(conn, :counter, layout: false)
  end
end
