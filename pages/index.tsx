import type { NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../src/contexts/authContext'

const Home: NextPage = () => {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={e => setEmail(e.target.value)} value={email} id='email' />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} id='password' />

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Home

