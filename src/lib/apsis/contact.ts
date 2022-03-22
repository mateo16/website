import axios from 'axios'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()

const contactApiUrl = `${config.apiBaseUrl}/contact`

export const sendContactRequest = async (
  name: string,
  senderEmail: string,
  message: string
) => {
  return await axios.post(contactApiUrl, {
    name: name,
    from: senderEmail,
    message
  })
}
