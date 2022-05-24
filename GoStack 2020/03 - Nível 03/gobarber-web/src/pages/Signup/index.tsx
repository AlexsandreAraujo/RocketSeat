import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import React, { useCallback } from 'react';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SingUp: React.FC = () => {
    const handlesubmit = useCallback(async (data: object) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string()
                    .required('E-mail Obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, { abortEarly: false });
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handlesubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="Login">
                    <FiArrowLeft />
                    Voltar para o logon
                </a>
            </Content>
        </Container>
    );
};

export default SingUp;
