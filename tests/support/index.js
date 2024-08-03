// Esta classe é responsável por fazer com que a instância 'page'
// do playwright tenha total acesso aos page objects/actions
// Também faz com que a instância 'request' do playwright já receba 
// o token de login no início de qualquer execução apenas uma vez,
// não necessitando informar o token em todas as chamadas de API

const { test: base, expect } = require('@playwright/test')

const { Leads } = require('./actions/Leads')
const { Login } = require('./actions/Login')
const { Movies } = require('./actions/Movies')
const { Tvshows } = require('./actions/Tvshows')
const { Popup } = require('./actions/Components')

const { Api } = require('./api')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['tvshows'] = new Tvshows(page)
        context['popup'] = new Popup(page)

        await use(context)
    },
    request: async ({ request }, use) => {
        const context = request
        context['api'] = new Api(request)
        
        await context['api'].setToken()

        await use(context)
    }
})

export { test, expect }