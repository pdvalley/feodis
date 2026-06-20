export default function Home() {
  return (
    <main style={{
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f3f4f6',
      color: '#111827',
      padding: '2rem',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '640px',
        width: '100%',
        borderRadius: '24px',
        background: '#ffffff',
        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
        padding: '3rem'
      }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', margin: 0 }}>
          Feodis Tracker
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginTop: '1.5rem' }}>
          Minimal location event tracker. Submit events to <code>/track</code> and view them at <code>/events</code>.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/events" style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: '#2563eb',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: '9999px'
          }}>
            View events
          </a>
          <a href="/api" style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: '#e5e7eb',
            color: '#111827',
            padding: '0.75rem 1.25rem',
            borderRadius: '9999px'
          }}>
            API docs
          </a>
        </div>
      </div>
    </main>
  );
}
