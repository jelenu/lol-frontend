import React from 'react'
import { OverView } from './OverView'

export const Dropdown = ({match}) => {
    console.log(match)
  return (
    <div>
      <OverView match={match}/>
    </div>
  )
}
