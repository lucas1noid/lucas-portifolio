const isPageRequest = (request, url) =>
  request.method === 'GET' && !url.pathname.split('/').pop().includes('.')

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const response = await env.ASSETS.fetch(request)

    if (response.status !== 404 || !isPageRequest(request, url)) return response

    return env.ASSETS.fetch(new Request(new URL('/index.html', url), request))
  },
}
