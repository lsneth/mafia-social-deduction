import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const speechFile = path.resolve('./assets/audio/test.mp3')

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'onyx',
    input: 'Everyone: wake up.',
  })
  console.log(speechFile)
  // eslint-disable-next-line no-undef -- not sure what it is complaining about, but it's working.
  const buffer = Buffer.from(await mp3.arrayBuffer())
  await fs.promises.writeFile(speechFile, buffer)
}
main()
