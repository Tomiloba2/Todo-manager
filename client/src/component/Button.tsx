import * as React from 'react'

interface IButton {
    children: React.ReactNode;
    click?: (e: React.FormEvent) => void;
    type: 'button' | "submit" | "reset";
    disabled?: boolean
}

const Button = (props: IButton) => {
    return (
        <div>
            <button className="disabled:bg-gray-600 bg-blue-800 hover:bg-blue-700 text-white rounded-xl w-64 mt-8 p-4 sm:border-2 sm:border-white sm:w-64"
                onClick={props.click} disabled={props.disabled} type={props.type}>
                {props.children}
            </button>
        </div>
    );
}

export default Button;