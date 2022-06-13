import React from 'react';
import { useTransition } from 'react-spring';
import Toast from './Toast';
import Container from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(messages, {
        from: { right: '-120%' },
        enter: { right: '0%' },
        leave: { right: '-120%' },
    });
    return (
        <Container>
            {messagesWithTransitions((props, item) => {
                return <Toast style={props} message={item} />;
            })}
        </Container>
    );
};

export default ToastContainer;
