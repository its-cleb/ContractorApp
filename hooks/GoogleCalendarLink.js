function useGoogleCalendarLink(title, details1, details2, location, start, end) {
  
  // Rearrange Date & set End Date
  let [month, day, year] = start.split('/')
  let startDate = new Date(+year, +month-1, +day)
  let endDate = new Date(+year, +month-1, +day +1)

  // Convert to Google Calendar API accepted date format
  let s = Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(startDate).replace(/[^\w ]/g, '')
  let e = Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(endDate).replace(/[^\w ]/g, '')

  // Check for empty values, if not add encoded text to link
  const gTitle = Boolean(title === null) ? '' : `text=` + encodeURIComponent(title) + `&`
  const gStart = Boolean(start === null) ? '' : `dates=` + encodeURIComponent(s) + `/`
  const gEnd = encodeURIComponent(e) + `&`
  const gLocation = Boolean(location === null) ? '' : `location=` + encodeURIComponent(location) + `&`

  // Check if Details2 is an array, then format it into a string
  let details2joined
  Boolean(Array.isArray(details2)) ? 
    details2joined = details2.toString().split(',').join(', ')
    :
    details2joined = details2

  const gDetails = 
    (Boolean(details1 === null) ? '' : `details=` + encodeURIComponent(details1)) + encodeURIComponent(': ') +
    (Boolean(details2 === null) ? '' : encodeURIComponent(details2joined))

  // Assemble Google Calendar Link
  const gLink = `https://www.google.com/calendar/render?action=TEMPLATE&${gStart}${gEnd}${gTitle}${gLocation}${gDetails}`

  return (gLink)
}

export default useGoogleCalendarLink