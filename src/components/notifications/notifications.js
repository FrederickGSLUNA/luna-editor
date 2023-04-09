import { toast } from 'react-toastify'

export const notifyVimActivate = () =>
  toast('✔️ Vim Activado', {
    position: 'top-right',
    autoClose: 50,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })

export const notifyVimDesactivate = () =>
  toast('❌ Vim Desactivado', {
    position: 'top-right',
    autoClose: 50,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })

export const notifyShare = () =>
  toast('✔️ La URL se copió al portapapeles', {
    position: 'top-right',
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })

export const notifyNotShareable = () =>
  toast('❌ La URL es damasiado larga', {
    position: 'top-right',
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  })
