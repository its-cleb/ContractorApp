const useGoogleCalendarLink = (title, details1, details2, location, start, end) => {
  
  let startDate = new Date(Date(start))
  let endDate = startDate

  console.log('start:', encodeURIComponent(startDate.toString()))

  const gTitle = Boolean(title === null) ? '' : `text=` + encodeURIComponent(title) + `&`
  const gStart = Boolean(start === null) ? '' : `dates=` + encodeURIComponent(start) + `/`
  const gEnd = Boolean(end === null) ? '' : encodeURIComponent(end) + `&`
  const gLocation = Boolean(location === null) ? '' : `location=` + encodeURIComponent(location) + `&`

  const gDetails = 
    Boolean(details1 === null) ? '' : `details=` + encodeURIComponent(details1) + 
    Boolean(details2 === null) ? '' : encodeURIComponent(details2)

  const gLink = `https://www.google.com/calendar/render?action=TEMPLATE&${gStart}${gEnd}${gTitle}${gLocation}${gDetails}`

  return (gLink)
}

export default useGoogleCalendarLink