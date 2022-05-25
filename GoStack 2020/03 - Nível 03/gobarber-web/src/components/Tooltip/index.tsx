import React from 'react';
import Conteiner from './styles';

interface TooltipProps {
    title: string;
    className?: string;
}
const Tooltip: React.FC<TooltipProps> = ({
    title,
    className = '',
    // eslint-disable-next-line
    //@ts-ignore
    children,
}) => {
    return (
        <Conteiner className={className}>
            {children}
            <span>{title}</span>
        </Conteiner>
    );
};

export default Tooltip;
