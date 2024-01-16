// Accepts array, checks each value for blank
function useValidateForm(field) {
  const status = field.includes('') || field.includes(' ')
  return (!status)
}

export default useValidateForm