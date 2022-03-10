import axios from 'axios';


const lineRequest = axios.create({
    baseURL: 'https://api.line.me/oauth2/v2.1/'
});

const lineLogin = axios.create({
    baseURL: 'https://access.line.me/oauth2/v2.1',
});

export const apiGetAccessToken = (data: any) => lineRequest.post('/token', data);
// export const apiRefreshToken = (data: any) => lineRequest.get('/accessToken', data);
// export const apiRevokeToken = (data: any) => lineRequest.get('/accessToken', data);
