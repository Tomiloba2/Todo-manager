import * as React from 'react';

export interface IModalProps {
    children: React.ReactNode
}

export function Modal(props: IModalProps) {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <section className='bg-gray-500 text-white border-2 rounded-lg p-5 shadow-2xl opacity-100'>
                {props.children}
            </section>
        </div>
    );
}
