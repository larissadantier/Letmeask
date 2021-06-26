import copyImg from "../../assets/images/copy.svg";
import { Button } from "../Button";
import './styles.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps ){

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }
    return(
        <button id="room-code" onClick={copyRoomCodeToClipboard}>
					<div>
						<img src={copyImg} alt="Copy room code" />
					</div>
				 	<p>Sala #{props.code}</p>
        </button>
    )
}