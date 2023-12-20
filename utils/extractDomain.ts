export function extractDomain(url: string): string {
  const parsedUrl = new URL(url)
  let domain = parsedUrl.hostname

  // Removing subdomain (if it exists), assuming the subdomain is 'www'
  if (domain.startsWith('www.')) {
    domain = domain.substring(4)
  }

  return domain
}
