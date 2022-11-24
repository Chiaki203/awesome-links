// auth0


const fetch = require('node-fetch')

exports.onExecutePostLogin = async (event, api) => {
  const SECRET = event.secrets.AUTH0_HOOK_SECRET
  if (event.user.app_metadata.localUserCreated) {
    return
  }
  const email = event.user.email
  const request = await fetch('http://f2e6-95-90-237-97.ngrok.io/api/auth/hook', {
    method: 'post',
    body: JSON.stringify({email, secret:SECRET}),
    headers: {'Content-Type': 'application/json'}
  })
  const response = await request.json()
  api.user.setAppMetadata('localUserCreated', true)
};
