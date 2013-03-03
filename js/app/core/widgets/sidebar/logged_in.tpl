<div id='sr_sidebar_logged_in'>
  <a id='sr_sidebar_img' target='blank' href='<%= user.link %>'><img src='<%= user.picture %>' width='50' height='50' alt='<%= user.name %>'/></a>
  <div id='sr_sidebar_right'>
    <div id='sr_sidebar_name'>
      <a target='blank' href="<%= user.link %>" ><%= user.name %></a>
    </div>
    <div id='sr_sidebar_promo'><%= options.login_meta %></div>
    <div id='sr_sidebar_logout'><a><%= options.logout %></a></div>
  </div>
  <div class='clear'>
  </div>
  <div id='sr_sidebar_bottom'>
    <% if (auto_sharing) { %>
      <div class='sr_sidebar_toggle sr_sidebar_toggled_on'>
        <a title='Auto sharing to Facebook is enabled'><%= options.auto_sharing_on %></a>
      </div>
    <% } else { %>
      <div class='sr_sidebar_toggle sr_sidebar_toggled_off'>
        <a title='Auto sharing to Facebook is disabled'><%= options.auto_sharing_off %></a>
      </div>
    <% } %>
    <div id='sr_sidebar_activity'>
      <a><%= options.activity %></a>
    </div>
  </div>
</div>