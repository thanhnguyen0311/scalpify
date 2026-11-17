import { useEffect, useState } from 'react'
import { Database, Server, RefreshCw } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadProducts() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/products`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      setProducts(await response.json())
    } catch (err) {
      setError(err.message || 'Could not connect to backend')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProducts() }, [])

  return (
    <main className="page">
      <header className="hero">
        <div className="eyebrow">FULL-STACK STARTER</div>
        <h1>React + Spring Boot</h1>
        <p>A simple frontend connected to a Java REST API.</p>
        <div className="stack">
          <span><Server size={16} /> React + Vite</span>
          <span><Database size={16} /> Spring Boot API</span>
        </div>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Sample products</h2>
            <p>Loaded from GET /api/products</p>
          </div>
          <button onClick={loadProducts} aria-label="Refresh products">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {loading && <p className="muted">Loading products…</p>}
        {error && <p className="error">API connection error: {error}. Make sure Spring Boot is running on port 8080.</p>}
        {!loading && !error && (
          <div className="products">
            {products.map(product => (
              <article className="product" key={product.id}>
                <div className="product-icon">P{product.id}</div>
                <div className="product-info">
                  <strong>{product.name}</strong>
                  <span>Product #{product.id}</span>
                </div>
                <b>${Number(product.price).toFixed(2)}</b>
              </article>
            ))}
          </div>
        )}
      </section>
      <footer>Sample project · React frontend · Java Spring Boot backend</footer>
    </main>
  )
}
