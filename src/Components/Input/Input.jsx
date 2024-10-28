import React from 'react'
import './style.css'

function Input({label ,state="",setState,placeholder,type }) {
  return (
    <> <div className='input-wrapper  '>
    <label htmlFor={label} className='label-input '>{label}</label>
    <input  type={type} value={state} placeholder={placeholder} onChange={(e)=>setState(e.target.value)} className='custom-input ' style={{padding:'0.5rem 0 3px'}} id={`${label}`} />
</div>
    </>
  )
}

export default Input