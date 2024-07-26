import { ConditionalField } from './classes'
import { Config } from './types'

function setupConditionalFields(config: Array<Config>) {
    if (!config || !config.length) {
        throw new Error('No configuration provided')
    }

    config.forEach(function (config) {
        try{
            new ConditionalField(config)
        } catch (e) {
            console.error('Error initializing conditional field with config:', config, e)
        }
    })
}

if (typeof (window) !== 'undefined') {
	window.setupConditionalFields = setupConditionalFields
    window.ConditionalField = ConditionalField
}