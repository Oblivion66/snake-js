import React from 'react';
import '../UI//Menu.scss'

const Menu = ({active, setActive, children}) => {
    return (
        <div className={active ? "menu active" : "menu"} onClick={() => setActive(false)}>
            <div className={active ? "menu_content active" : "menu_content"} onClick={e => e.stopPropagation()}>{children}</div>
            
        </div>
    );
};

export default Menu;