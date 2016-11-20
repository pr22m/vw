const { Router } = require('express');
const url = require('url');

const router = new Router();

router.get('/vkauth', (req, res) => {
  // Redirect на https://oauth.vk.com/authorize
  // Доки: https://vk.com/dev/authcode_flow_user
  const urlObject = {
    protocol: 'https:',
    host: 'oauth.vk.com',
    pathname: '/authorize',
    query: {
      client_id: process.env.VK_APP_ID,
      redirect_uri: 'https://vwalfa.herokuapp.com/user/vkcallback',
      display: 'page',
      scope: 0,
      response_type: 'code',
      v: '5.60',
      state: '',
    },
  };
  const vkUrl = url.format(urlObject);
  res.redirect(vkUrl);
});

router.get('/vkcallback', (req, res) => {
  // Если всё ок сюда придёт редирект от ВК вида /?code=75h57g8gje
  // Если будет ошибка сюда придёт редирект вида
  // /?error=<>&error_description=Invalid+parameter
  const { code, error, error_description } = req.query;
  if (error) {
    res.send('Error during vk auth process');
    /* eslint-disable no-console, camelcase */
    console.error(`VK ERROR: ${error}: ${error_description}`);
    return;
  }
  console.log(`Got vk code: ${code}`);
  res.send(`Получен код доступа от Вконтакте: ${code}`);
});

module.exports = router;
