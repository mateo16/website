import axios from 'axios'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()

const contactApiUrl = `${config.apiBaseUrl}/contact`

export const sendContactRequest = async (
  name: string,
  senderEmail: string,
  company: string,
  message: string
) => {
  await axios.post(contactApiUrl, {
    name,
    from: senderEmail,
    company,
    message
  })
}
