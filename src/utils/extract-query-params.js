// '?name=Luiz&age=27

export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((acc, currentQuery) => {
    const [key, value] = currentQuery.split('=')

    acc[key] = value

    return acc
  }, {})
}