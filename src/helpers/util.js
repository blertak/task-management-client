export const axiosError = (err) => {
  let message = err.message
  if (err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message
  }
  return new Error(message)
}
