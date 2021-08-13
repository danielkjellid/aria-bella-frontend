interface ErrorObj {
  response: object
}

export default function $catchError(error: any) {
  const data = error.response.data

  // if the error message is general, e.g. not related to a specific field
  // return the general message
  if (data.detail) {
    if (Array.isArray(data.detail)) {
      return data.detail[0]
    }

    return data.detail
  }

  // is the error is related to a field,
  // return entire response data object
  return data
}
