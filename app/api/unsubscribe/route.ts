import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const hash = searchParams.get('hash')

    if (!email || !hash) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe link' },
        { status: 400 }
      )
    }

    // Verify the hash matches
    const expectedHash = Buffer.from(email).toString('base64')
    if (hash !== expectedHash) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe link' },
        { status: 400 }
      )
    }

    // TODO: Add your unsubscribe logic here
    // This could involve updating a database record, etc.
    
    // For now, we'll just return a success response
    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
} 