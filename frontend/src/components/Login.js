import React, { useState } from "react"

function Login({ onAuth }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === 'email' ? setEmail(value) : setPassword(value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAuth(password, email);
  }

  return (
      <section className='auth'>
        <div className='auth__container'>
        <h2 className="auth__title">Вход</h2>
            <form className='auth__form' onSubmit={handleSubmit}>
              <div className='auth__form-wrap'>
                <input className='auth__input' id="email-input" type="email" placeholder="Email" name="email" minLength="2" maxLength="200" autoComplete="on" required onChange={handleChange} value={email || ''}/>
                <span className="auth__input-error"></span>
              </div>
              <div className='auth__form-wrap'>
                <input className='auth__input' id="password-input" type="password" placeholder="Пароль" name="password" minLength="2" maxLength="200" autoComplete="on" required onChange={handleChange} value={password || ''}/>
                <span className="auth__input-error"></span>
              </div>
              <button className="auth__save-button" type="submit" onSubmit={handleSubmit}>
              <span className="auth__button-span">Войти</span>
              </button>
            </form>
        </div>
      </section>
  )
}

export default Login