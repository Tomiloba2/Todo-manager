//import * as React from 'react';

export interface IErrorHandlerProps {
    message: string
}

export function LoadingSpinner() {
    return (
        <div>
            <section className="spinner-container">
                <div className="loader-spinner"></div>
            </section>
        </div>
    );
}


export function ErrorHandler(props: IErrorHandlerProps) {
    return (
        <div>
            <section className="error-container">
                <div className="error-message">
                    {props.message}
                </div>
            </section>
        </div>
    );
}
