export default function useResponsiveBreakpoints(elRef, breakpoints) {
  const firstQuery = Object.keys(breakpoints[0])[0]
  const [breakSize, setBreakSize] = React.useState(firstQuery)

  const observer = React.useRef(
    new ResizeObserver(entries => {
      // Only care about the first element, we expect one element ot be watched
      const { width } = entries[0].contentRect

      setBreakSize(findBreakPoint(breakpoints, width))
    })
  )

  React.useEffect(() => {
    if (elRef.current) {
      observer.current.observe(elRef.current)
    }

    return () => {
      observer.current.unobserve()
    }
  }, [elRef, observer])

  return breakSize
}