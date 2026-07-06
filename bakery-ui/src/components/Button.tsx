
interface ButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    type?: 'primary' | 'secondary';
    disabled?: boolean;
}

const BASE_CLASS_NAME = 'cursor-pointer rounded-md px-3.5 py-1.5 transition-colors [font:inherit] hover:border-(--accent-border) disabled:cursor-not-allowed disabled:opacity-50';

const VARIANT_CLASS_NAME = {
    primary: 'border-2 border-transparent bg-(--accent-bg) text-(--accent)',
    secondary: 'border border-(--border) bg-transparent text-(--text)',
};

const Button = ({ onClick, children, type = 'primary', disabled = false }: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={() => onClick()}
            className={`${BASE_CLASS_NAME} ${VARIANT_CLASS_NAME[type]}`}
            disabled={disabled}
        >
            {children}
        </button>
    );

};

export default Button;