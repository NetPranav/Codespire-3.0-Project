import React from 'react'

export default function Loading() {
  return (
    <div className={`h-screen w-screen fixed backdrop-blur-sm z-99 top-0`}>
        <div id={`loader`}></div>
    </div>
  )
}
