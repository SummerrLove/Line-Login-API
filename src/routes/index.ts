import Router from 'koa-router';
// import * as LineConstants from '../constants/line_constants';
import * as LineAPI from '../lineAPI';
import jwt from 'jsonwebtoken';



const channelid = process.env.line_channel_id || '';
const channel_secret = process.env.line_channel_secret || '';
// const redirect_url = 'https://node-tester-sv20220215.herokuapp.com/authenticated';

declare module 'jsonwebtoken' {
    export interface LineJwtPayload extends jwt.JwtPayload {
        "auth_time": number;
        "nonce": string;
        "amr": string[];
        "name": string;
        "picture": string;
        "email": string;
    }
}

// interface LineUserInfo {
//     "iss": string;
//     "sub": string;
//     "aud": string;
//     "exp": number;
//     "iat": number;
//     "auth_time": number;
//     "nonce": string;
//     "amr": string[];
//     "name": string;
//     "picture": string;
//     "email": string;
// }

const router = new Router();

router.get('/', async ctx => {
    // ctx.cookies.set('myid', '1324');
    // ctx.redirect("https://access.line.me/oauth2/v2.1/authorize?response_type=code"
    // + "&client_id=" + channelid
    // + "&redirect_uri=" + redirect_url
    // + "&state=" + state
    // + "&scope=" + scope
    // );
    ctx.body = "No index page!";
});

// Redirect to Line Login
// reference: https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/
// router.get('/login', async ctx => {
//     ctx.redirect("https://access.line.me/oauth2/v2.1/authorize?response_type=code"
//     + "&client_id=" + channelid
//     + "&redirect_uri=" + redirect_url
//     + "&state=" + state
//     + "&scope=" + scope
//     );
// })

// Callback url for Line Login
// router.get('/authenticated', async ctx => {
//     // ctx.body = 'Line Login authenticated!!';
//     console.log(ctx.request)
//     let auth_code:string = ctx.request.query.code as string;
//     let auth_state = ctx.request.query.state;
//     let content = 'code='+auth_code+' and state='+auth_state;
//     ctx.body = content;
//     if (state == auth_state){
//         console.log("received same state: "+state);

//         let my_url = "https://api.line.me/oauth2/v2.1/token";

//         let data2 = new URLSearchParams({
//             grant_type: "authorization_code",
//             code: auth_code,
//             redirect_uri: redirect_url,
//             client_id: channelid,
//             client_secret: channel_secret
//         });
//         let my_data = {
//             grant_type: "authorization_code",
//             code: auth_code,
//             redirect_uri: redirect_url,
//             client_id: channelid,
//             client_secret: channel_secret
//         };

//         let my_config = {
//             headers: {
//                 'content-type': 'application/x-www-form-urlencoded'
//             }
//         };

//         await LineAPI.apiGetAccessToken(data2)
//         .then( res => {
//             console.log(res.data);
//             let data_idtoken = <jwt.LineJwtPayload>jwt.verify(res.data.id_token, channel_secret);
//             console.log(data_idtoken);
//             ctx.body = res.data;
            
//             // check db for user email
//             // if user exists, 

//         })
//         .catch( err => {
//             console.log(err);
//             throw err;
//         });

//     } else {
//         console.log("different state");
//         ctx.body = "unknown state variable";
//     }

// });

// rereieve user info from Line with provided code
router.post('/line-verify', async ctx => {

    console.log("==============");
    console.log(ctx.request.body.code);
    console.log(ctx.request.body.callback_url);
    console.log("==============");
    let auth_code = ctx.request.body.code;
    let auth_state = ctx.request.query.state;
    let callback_url = ctx.request.body.callback_url;

    // ctx.body = ctx.query;
    let data2 = new URLSearchParams({
        grant_type: "authorization_code",
        code: auth_code,
        redirect_uri: callback_url as string,
        client_id: channelid,
        client_secret: channel_secret
    });

    // ctx.body = data2.toString();
    await LineAPI.apiGetAccessToken(data2)
    .then( res => {
        console.log(res.data);
        let data_idtoken = <jwt.LineJwtPayload>jwt.verify(res.data.id_token, channel_secret);
        console.log(data_idtoken);

        ctx.body = data_idtoken;
    //     // let greeting = "Greetings, " + data_idtoken.name;
    //     // ctx.body = greeting;
        
    })
    .catch( err => {
        console.log(err);
    });

});

router.post('/test', async ctx => {
    console.log("print params: ");
    console.log(ctx.request.body);
    ctx.body = ctx.request.query;
});

export default router;