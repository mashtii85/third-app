/**
 * AWS
 */

export interface AWSCredentials {
  endpoint: string
  id: string
  key: string
  region: string
}

const AWS_CREDENTIALS = process.env.AWS_CREDENTIALS ? JSON.parse(process.env.AWS_CREDENTIALS) : {}

export const AWS: AWSCredentials = {
  endpoint: AWS_CREDENTIALS?.endpoint,
  id: AWS_CREDENTIALS?.id,
  key: AWS_CREDENTIALS?.key,
  region: AWS_CREDENTIALS?.region
}
