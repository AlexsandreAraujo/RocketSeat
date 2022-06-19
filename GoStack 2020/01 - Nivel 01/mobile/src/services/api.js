import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;

/**
 * IOS com Emulador: localhost
 * IOS com Físico: ip da máquina
 * Android com Emulador: localhost (adb reverse tcp:3333 tcp:3333)
 * Android com Emulador: 10.0.2.2 (android studio)
 * Android com Emulador: 10.0.3.2 (genymotion)
 * Android com Físico: ip da máquina
 */