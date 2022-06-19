import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
    name: string;
    password: string;
    email: string;
}

const SingUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handlesubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome Obrigatório'),
                    email: Yup.string()
                        .required('E-mail Obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                });

                await schema.validate(data, { abortEarly: false });

                await api.post('/users', data);

                navigate('/');

                addToast({
                    type: 'success',
                    title: 'Cadastro Realizado!',
                    description: 'Você já pode fazer seu logon no GoBarber!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    // eslint-disable-next-line
                //@ts-ignore
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }
                // disparar um toast
                addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description:
                        'Ocorreu um erro ao fazer o cadastro, tente novamente.',
                });
            }
        },
        [addToast, navigate],
    );
    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handlesubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input name="name" icon={FiUser} placeholder="Nome" />

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />

                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />

                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para o logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SingUp;
