import '../UI/MenuButton.scss';

const MenuButton = ({children, ...props}) => {
    return (
        <button {...props} >
            {children}
        </button>
    );
};

export default MenuButton;