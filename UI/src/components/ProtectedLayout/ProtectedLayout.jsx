import React from 'react'

export const ProtectedLayout = ({children}) => {
  return (
    <div>
        {/* Aici trebuie adaugat meniul pentru utilizatori conectati */}
        {children}
    </div>
  )
}
