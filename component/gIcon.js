// Component to display google icon
// Use: <g-icon icon="menu_book"/>
define(
    function(){
        return {
            props:['icon'],
            template:'<span class="material-symbols-outlined">{{icon}}</span>',
          }
    }
)