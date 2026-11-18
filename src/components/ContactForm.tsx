import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { site, whatsappLink } from '../content/site'

const projectTypes = [...site.services.map((s) => s.title), 'Outro'] as const

interface FormState {
  name: string
  phone: string
  type: string
  message: string
}

const empty: FormState = { name: '', phone: '', type: '', message: '' }

function compose(f: FormState) {
  return [
    `Olá, Douglas! Meu nome é ${f.name.trim()}.`,
    f.type ? `Tipo de projeto: ${f.type}.` : null,
    f.phone.trim() ? `Telefone: ${f.phone.trim()}.` : null,
    '',
    f.message.trim(),
  ]
    .filter((l): l is string => typeof l === 'string')
    .join('\n')
}

/**
 * Formulário sem servidor: monta a mensagem e abre o WhatsApp (ou o e-mail)
 * do arquiteto já preenchido. Nenhum dado é armazenado pelo site.
 */
export function ContactForm() {
  const uid = useId()
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState('')

  const set = (k: keyof FormState) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (form.name.trim().length < 2) e.name = 'Informe seu nome.'
    if (form.message.trim().length < 10) e.message = 'Conte um pouco sobre o projeto (mínimo de 10 caracteres).'
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`${uid}-${Object.keys(e)[0]}`)?.focus()
      return false
    }
    return true
  }

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!validate()) return
    const via = ((ev.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? 'whatsapp'
    const text = compose(form)
    if (via === 'email') {
      const subject = `Projeto${form.type ? ` ${form.type.toLowerCase()}` : ''} — contato pelo site`
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
      setStatus('Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.')
    } else {
      window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
      setStatus('Abrimos o WhatsApp em uma nova aba com a sua mensagem pronta para envio.')
    }
  }

  const field = (k: keyof FormState) => ({
    id: `${uid}-${k}`,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-error` : undefined,
  })

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Nome</label>
          <input
            {...field('name')}
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
            required
          />
          {errors.name && (
            <p className="field__error" id={`${uid}-name-error`}>
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-phone`}>
            Telefone <span className="field__optional">opcional</span>
          </label>
          <input
            {...field('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set('phone')(e.target.value)}
          />
        </div>
      </div>

      <fieldset className="field field--choices">
        <legend>Tipo de projeto</legend>
        <div className="choices">
          {projectTypes.map((t) => (
            <label key={t} className="choice">
              <input
                type="radio"
                name="type"
                value={t}
                checked={form.type === t}
                onChange={(e) => set('type')(e.target.value)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={`${uid}-message`}>Sobre o projeto</label>
        <textarea
          {...field('message')}
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => set('message')(e.target.value)}
          required
        />
        {errors.message && (
          <p className="field__error" id={`${uid}-message-error`}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="form__actions">
        <button type="submit" value="whatsapp" className="button button--solid">
          Enviar pelo WhatsApp
        </button>
        <button type="submit" value="email" className="button button--line">
          Enviar por e-mail
        </button>
      </div>
      <p className="form__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  )
}
