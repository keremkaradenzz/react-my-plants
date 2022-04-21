import './styles.scss'
import { keys } from '../../../DATA';
const Answer = ({ answer, option, onClick, i }) => {
    return (
        <>
            {answer.map((item, index) =>
                <div className='answer' onClick={(e)=> onClick(e,option[index], keys[i])} key={index}>
                    <p>{index + 1}. {item}</p>
                </div>)
            }
        </>
    )
}


export default Answer;
