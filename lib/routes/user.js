/* global fetch */

const { Router } = require('express');
const url = require('url');

const VK_REDIRECT_URI = 'https://vwalfa.herokuapp.com/user/vkcallback';

const router = new Router();

router.get('/vkauth', (req, res) => {
  // Redirect на https://oauth.vk.com/authorize
  // Доки: https://vk.com/dev/authcode_flow_user
  const vkUrl = url.format({
    protocol: 'https:',
    host: 'oauth.vk.com',
    pathname: '/authorize',
    query: {
      client_id: process.env.VK_APP_ID,
      redirect_uri: VK_REDIRECT_URI,
      display: 'page',
      scope: 0,
      response_type: 'code',
      v: '5.60',
      state: '',
    },
  });
  res.redirect(vkUrl);
});

router.get('/vkcallback', (req, res) => {
  // Если всё ок сюда придёт редирект от ВК вида /?code=75h57g8gje
  // Если будет ошибка сюда придёт редирект вида
  // /?error=<>&error_description=Invalid+parameter
  const { code, error, error_reason, error_description } = req.query;
  if (error) {
    res.send('Error during vk auth process');
    /* eslint-disable no-console, camelcase */
    console.error(`VK ERROR: ${error}: ${error_reason}, ${error_description}`);
    /*
      TODO: более правильно обработать ответы:
      error=access_denied&error_reason=user_denied
    */
    return;
  }
  const vkAccessTokenUrl = url.format({
    protocol: 'https:',
    host: 'oauth.vk.com',
    pathname: '/access_token',
    query: {
      client_id: process.env.VK_APP_ID,
      client_secret: process.env.VK_APP_KEY,
      redirect_uri: VK_REDIRECT_URI,
      code,
    },
  });
  fetch(vkAccessTokenUrl).then(
    response => response.json()
  ).then((body) => {
    const { access_token, user_id } = body;
    return fetch(`https://api.vk.com/method/users.get?user_ids=${user_id}&fields=photo_50&access_token=${access_token}`).then(
      response => response.json()
    ).then((vkResponse) => {
      const { first_name, last_name, photo_50 } = vkResponse.response[0];
      const html = `
        <h3>Привет, ${first_name} ${last_name}</h3>
        <img src="${photo_50}" />
      `;
      res.set('Content-type: text/html').send(html);
    });
  }).catch((err) => {
    res.json(err.message);
  });
});

module.exports = router;
