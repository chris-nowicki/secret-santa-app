export const getMetaData = async (website: string) => {
  let title
  let description
  let ogImage

  await fetch(website)
    .then((response) => response.text())
    .then((html) => {
      // Create a DOMParser to parse the HTML
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // Extract metadata
      title = doc.querySelector('title')?.textContent
      description = doc
        .querySelector('meta[name="description"]')
        ?.getAttribute('content')

      // Extract Open Graph (OG) image
      ogImage = doc
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content')
    })
    .catch((error) => {
      console.error('Error fetching metadata:', error)
    })

  return { title, description, ogImage }
}
