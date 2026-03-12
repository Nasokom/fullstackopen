import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })


  function testAction(assertion,state,action,field={}){

    test(assertion,()=>{
      deepFreeze(state)
      const newState = counterReducer(state,action)
      expect(newState).toEqual({...initialState,...field})
    })
  }

  testAction('good is incremented',initialState,{type:'GOOD'},{good:1})
  testAction('ok is incremented',initialState,{type:'BAD'},{bad:1})
  testAction('bad is incremented',initialState,{type:'OK'},{ok:1})
  testAction('state is reseted',initialState,{type:'RESET'})
  
})
