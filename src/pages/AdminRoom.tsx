import {useHistory, useParams} from 'react-router-dom'
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import logoImg from '../assets/images/logo.svg';
import logoLightImg from '../assets/images/logo-light.svg'
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';
import { useTheme } from '../hooks/useTheme';
import { Toggle } from '../components/Toggle';

type RoomParams = {
  id: string;
}

export function AdminRoom(){
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId)
    const {theme} = useTheme();

    console.log(questions);

    async function handleEndRoom(){
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      })

      history.push('/');
    } 

    async function handleDeleteQuestion(questionId: string) {
      if (window.confirm('Tem certeza que você deseja encerrar esta sala?')){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      }
    }

    async function handleCheckQuestion(questionId: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      })
    }

    return(
        <div id='page-room' className={theme}>
					<header>
						<div className='content'>
							<img src={theme === 'light' ? logoImg : logoLightImg} alt="Letmeask" />
							<div>
								<RoomCode code={roomId}/>
								<Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
							</div>
						</div>
					</header>

					<main className="content">
						<div className='room-title'>
							<h1>Sala {title}</h1>
              <Toggle />
							{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
						</div>

             <div className="question-list">
              {questions.map(question => {
                return(
                  <Question 
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
                  >
                    {!question.isAnswered && (
                      <>
                      <button type='button' onClick={() => handleCheckQuestion(question.id)}>
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
  
                      <button type='button' onClick={() => handleHighlightQuestion(question.id)}>
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                      </>
                      )}
                    <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                      <img src={deleteImg} alt="Deletar pergunta" />
                    </button>           
                    
                  </Question>
                );
              })}
             </div>
					</main>
				</div>
    )
}