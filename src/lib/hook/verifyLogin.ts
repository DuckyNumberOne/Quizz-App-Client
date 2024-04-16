import { PropsDataLogin } from '@/lib/domain/login';

export function verifyLogin({ dataUser, dataLogin }: PropsDataLogin) {
    return dataUser.some((item) => dataLogin.email === item.email && dataLogin.password === item.password);
}
