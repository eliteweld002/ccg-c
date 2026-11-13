import { contactResponse } from '../server/contact-handler.mjs'

export default { fetch: request => contactResponse(request) }
