import { NextResponse } from 'next/server'
import ImageKit from 'imagekit'

export async function POST(request) {
  try {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT
    if (!publicKey || !privateKey || !urlEndpoint) {
      return NextResponse.json(
        { error: 'ImageKit is not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT.' },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalName = file.name || 'image'
    const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg'
    const safeExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg'
    const fileName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`

    const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint })
    const result = await new Promise((resolve, reject) => {
      imagekit.upload({ file: buffer, fileName, useUniqueFileName: true }, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })

    const url = result?.url
    if (!url) {
      return NextResponse.json({ error: 'Upload response missing URL.' }, { status: 502 })
    }

    return NextResponse.json({ url })
  } catch (err) {
    console.error('Upload image error:', err)
    return NextResponse.json(
      { error: err?.message || 'Failed to upload image.' },
      { status: 502 }
    )
  }
}
