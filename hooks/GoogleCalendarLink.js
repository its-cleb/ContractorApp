const useGoogleCalendarLink = (title, details, location, start, end) => {
  console.log(start.toISOString())
  const gTitle = Boolean(title === null) ? '' : `text=` + encodeURIComponent(title) + `&`
  const gDetails = Boolean(details === null) ? '' : `details=` + encodeURIComponent(details)
  const gLocation = Boolean(location === null) ? '' : `location=` + encodeURIComponent(location) + `&`
  const gStart = Boolean(start === null) ? '' : `dates=` + encodeURIComponent(start) + `/`
  const gEnd = Boolean(end === null) ? '' : encodeURIComponent(end) + `&`

  const gLink = `https://www.google.com/calendar/render?action=TEMPLATE&${gStart}${gEnd}${gTitle}${gLocation}${gDetails}`
  return (gLink)
}

export default useGoogleCalendarLink