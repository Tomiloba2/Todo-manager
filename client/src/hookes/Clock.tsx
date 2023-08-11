import * as React from 'react';

export function useClock() {
  const [clock, setClock] = React.useState('')
  React.useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setClock(date.toLocaleTimeString())
    }, 1000)
    return (
      ()=>clearInterval(interval)
    )
  }, [clock])
  return clock
    
}
