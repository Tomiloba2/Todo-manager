import * as React from 'react'

interface IButton {
    children: React.ReactNode;
    click: (e: React.FormEvent) => void;
    type: 'button'|"submit"|"reset";
    disabled?: boolean
}

const Button = (props: IButton) => {
    return (
        <div>
            <button className="button" onClick={props.click} disabled={props.disabled} type={props.type}>
                {props.children}
            </button>
        </div>
    );
}

export default Button;