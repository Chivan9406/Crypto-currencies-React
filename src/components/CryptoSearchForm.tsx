import { currencies } from '../data'
import { useCryptoStore } from '../store.ts'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { Pair } from '../types'
import ErrorMessage from './ErrorMessage.tsx'

function CryptoSearchForm() {
  const cryptoCurrencies = useCryptoStore(state => state.cryptoCurrencies)
  const fetchData = useCryptoStore(state => state.fetchData)
  const [pair, setPair] = useState<Pair>({
    currency: '',
    cryptocurrency: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(pair).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    setError('')
    fetchData(pair)
  }

  return (
    <form
      className='form'
      onSubmit={handleSubmit}
    >

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='field'>
        <label htmlFor='currency'>
          Moneda:
          <select
            name='currency'
            id='currency'
            value={pair.currency}
            onChange={handleChange}
          >
            <option value=''>--- Seleccione ---</option>
            {currencies.map(currency => (
              <option
                key={currency.code}
                value={currency.code}
              >
                {currency.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className='field'>
        <label htmlFor='cryptocurrency'>
          Criptomoneda:
          <select
            name='cryptocurrency'
            id='cryptocurrency'
            value={pair.cryptocurrency}
            onChange={handleChange}
          >
            <option value=''>--- Seleccione ---</option>
            {cryptoCurrencies.map(crypto => (
              <option
                key={crypto.CoinInfo.Name}
                value={crypto.CoinInfo.Name}
              >
                {crypto.CoinInfo.FullName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <input type='submit' value='Cotizar' />
    </form>
  )
}

export default CryptoSearchForm