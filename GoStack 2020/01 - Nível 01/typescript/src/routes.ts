import {Request, Response} from 'express';
import createUser from './services/CreateUser';

export function helloword (request:Request, response:Response){
    const user = createUser({
        name: 'Alexsandre',
        email: 'alexsandre@bola.com',
        password:'12345',
        techs: [
            'Node.Js',
            'React Native',
            'React Js',
            {title: 'Javascript', experience: 100}
        ]
    });

    return response.json({message: 'Hello World'})
}