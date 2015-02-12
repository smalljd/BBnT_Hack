<h1><%= user.firstName %> <%= user.lastName %></h1>
<ul>
<% for(var i=0; i<accounts.length; i++) { %>
    <li>
    <a href='account/<%= accounts[i].id %>/'>
    <%= <%= accounts[i].accountType %>
    </a>
    </li>
    <% } %>
</ul>