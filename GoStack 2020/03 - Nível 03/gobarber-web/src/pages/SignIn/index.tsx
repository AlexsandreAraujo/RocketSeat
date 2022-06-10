import React, { useRef, useCallback, useContext } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.svg';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SingInFormData {
    email: string;
    password: string;
}

const SingIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { user, signIn } = useContext(AuthContext);

    console.log(user);

    const handlesubmit = useCallback(
        async (data: SingInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail Obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha Obrigatória'),
                });

                await schema.validate(data, { abortEarly: false });
                signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                // eslint-disable-next-line
            //@ts-ignore
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [signIn],
    );

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handlesubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Entrar</Button>

                    <a href="ToDo">Esqueci minha senha</a>
                </Form>

                <a href="ToDo">
                    <FiLogIn />
                    Criar Conta
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SingIn;
