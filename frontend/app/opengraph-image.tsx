import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d0d',
          color: '#fcfaf5',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>
            Sean Yap
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, opacity: 0.95 }}>
            Full Stack Software Engineer
          </div>
          <div style={{ fontSize: 28, opacity: 0.8, maxWidth: 980 }}>
            Backend systems, AI integration, real-time applications
          </div>
        </div>
      </div>
    ),
    size
  )
}

