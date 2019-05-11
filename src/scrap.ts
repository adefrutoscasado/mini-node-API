// @ts-ignore
const apiClient = require('./api/apiClient')
const databaseService = require('./services/databaseService')

let page = 0

databaseService.createDefaults()

let SCRAP_INTERVAL = 1000 // ms

let timer = setInterval(async () => {
  page++
  let response = await apiClient.getPage(page)
  let { total_pages, data } = response
  page = response.page
  console.log(`Saving data from page ${page}`)
  data.forEach((userData: object)=> databaseService.upsertUser(userData))
  if (page === total_pages) page = 0 // Start again or clearInterval(timer)
}, SCRAP_INTERVAL)
