import { rest } from 'msw';
const baseURL = "https://drestf-api-8914bba56128.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}/dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({ id: 1, username: 'testuser', profile_id: 1 }));
    }),
    rest.post(`${baseURL}/dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
