export default function Home() {
  return (
    <div className="product-grid">
      <div className="product-card">
        <img 
          src="https://via.placeholder.com/300"
          alt="Test Product"
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-title">Test Produs</h3>
          <p className="product-price">99.99 RON</p>
          <button className="buy-button">
            SHUT UP AND TAKE MY MONEY!
          </button>
        </div>
      </div>
    </div>
  )
}
