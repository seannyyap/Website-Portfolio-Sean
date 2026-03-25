import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fcfaf5',
          color: '#0d0d0d',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -1 }}>
            Sean Yap
          </div>
          <div style={{ fontSize: 40, fontWeight: 650, opacity: 0.95 }}>
            Full Stack Software Engineer
          </div>
          <div style={{ fontSize: 28, opacity: 0.8, maxWidth: 980 }}>
            Backend systems · AI · Real-time apps
          </div>
        </div>
      </div>
    ),
    size
  )
}

