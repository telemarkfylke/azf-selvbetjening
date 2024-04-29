const { app } = require('@azure/functions');
const { default: axios } = require('axios');
const httpResponse = require('../lib/helpers/http-response');
const config = require('../../config');

app.http('idPortenToken', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = JSON.parse(await request.text())

        let params = new URLSearchParams()
        params.append('grant_type', config.IDPORTEN.grant_type)
        params.append('code', body.code)
        params.append('state', body.state)
        params.append('code_verifier', body.verifier)
        params.append('redirect_uri', body.redirect_uri)
        params.append('client_id', config.IDPORTEN.client_id)

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        // const url = 'https://test.idporten.no'
        // const endPoint = 'token'

        const getIdPortenTokens = await axios.post(`${config.IDPORTEN.idporten_url}/${config.IDPORTEN.idporten_token}`, params, headers)

        console.log(getIdPortenTokens.data)
        
        return httpResponse(200, getIdPortenTokens.data)
    }
});
