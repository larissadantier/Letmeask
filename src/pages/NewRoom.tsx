import { Link, useHistory } from 'react-router-dom'
import {FormEvent, useState} from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoLightImg from '../assets/images/logo-light.svg'
import { Button } from '../components/Button'

import '../styles/auth.scss'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { Toggle } from '../components/Toggle'


export function NewRoom(){
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom,setNewRoom] = useState('')
  const {theme} = useTheme();
  
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    if (newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`)
  }
  
    return (
        <div id="page-auth" className={theme}>
          <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
              <strong>Crie salas de Q&amp;A ao-vivo </strong>
              <p>Tire as dúvidas da sua audiência em tempo-real</p>
          </aside>

          <main>
            <div className="main-content">
              <div className="toggle-content">
                <img src={theme === 'light' ? logoImg : logoLightImg} alt="Letmeask" />
                <Toggle />
              </div>
								<h2 className="title">Criar uma nova sala</h2>
							<form onSubmit={handleCreateRoom}>
								<input 
									type="text"
									placeholder="Nome da Sala"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
								/>

								<Button type="submit">
									Criar sala
								</Button>
								<p>Quer entrar em uma sala existente? <Link to="/"> clique aqui</Link> </p>
							</form>
            </div> 
         </main>
        </div>
    )
}  