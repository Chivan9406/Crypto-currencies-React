import CryptoSearchForm from './components/CryptoSearchForm'
import { useCryptoStore } from './store.ts'
import { useEffect } from 'react'
import CryptoPriceDisplay from './components/CryptoPriceDisplay.tsx'

function App() {
  const fetchCryptos = useCryptoStore(state => state.fetchCryptos)

  useEffect(() => {
    fetchCryptos()
  }, [])

  return (
    <>
      <div className='container'>
        <h1 className='app-title'>
          Cotizador de <span>Crypto monedas</span>
        </h1>

        <div className='content'>
          <CryptoSearchForm />
          <CryptoPriceDisplay />
        </div>
      </div>
    </>
  )
}

export default App
