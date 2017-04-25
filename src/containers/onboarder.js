import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Overlay from '~/src/containers/overlay'
import { colors } from '~/src/styles/constants'

export default connect(s => s, null)(({overlay, user}) => (
  <div class="row">
    <Overlay overlay={user.onboarding ? true : false}/>
    <div style={{position: 'fixed'}} class="col-12 mt-5">
      lflfkjasldj
    </div>
  </div>
))

function solution() {
    const type = document.querySelector('input[type="radio"]:checked').value
    const config = [
        {
            id: '#first_name',
            form: ['person'],
            validate: (str) => /[\w\s]{1,}/i.test(str)
        },
        {
            id: '#last_name',
            form: ['person'],
            validate: (str) => /[\w\s]{1,}/i.test(str)
        },
        {
            id: '#email',
            form: ['person'],
            validate: (str) => {
                const isNotBlank = str !== '' 
                const hasAt = str.indexOf('@') > -1
                const split = str.split('@')
                const splitIsOk = split.reduce((acc, s) => {
                    if (acc === false)
                        return false
                    if (s.length > 0 && /[a-zA-Z0-9\.]/.test(s))
                        return true
                }, true)
                return isNotBlank
                    && hasAt
                    && split.length === 2
                    && splitIsOk
            }
        },
        {
            id: '#company_name',
            form: ['company'],
            validate: (str) => str !== ''
        },
        {
            id: '#phone',
            form: ['company'],
            validate: (str) => {
                const isNotBlank = str !== ''
                const isLen = str.length >= 6
                const isValidChar = /[0-9\s-]/.test(str)
                return isNotBlank
                  && isLen
                  && isValidChar
            }
        },
    ]
    return config.reduce((acc, {id, form, validate}) => {
        if (form.indexOf(type) < 0)
            return acc
        return !acc ? acc : validate(document.querySelector(id).value)
    }, true)  
}
