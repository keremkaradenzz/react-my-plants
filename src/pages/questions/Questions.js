import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { sorular, bitkiler } from "../../DATA";
import Answer from "./answers/Answer";
import './styles.scss';

const Questions = () => {
    const [data, setData] = useState([]);
    const [state, setState] = useState(0);
    const [results, setResults] = useState({});
    const [plants, setPlants] = useState([]);
    useEffect(() => {
        setData(JSON.parse(JSON.stringify(sorular))
            .slice(state, state + 1));

        if (state === 5) {
            let keys = Object.keys(results);
            let values = Object.values(results);
            let datas = []
            for (let bitki of bitkiler) {
                let count = 0;
                for (let key of keys) {
                    if (bitki[key]) {
                        for (let val of values) {
                            for (let v of val) {
                                if (bitki[key].includes(v)) {
                                    count++;
                                    // let control = false;
                                    // if(datas?.length > 0){
                                    //     for(let k of datas){
                                    //         if(k.bitkiAdi === bitki.bitkiAdi){
                                    //             control = true;
                                    //         }
                                    //     }
                                    // }
                                    // if(!control)datas.push(bitki);
                                }
                            }
                        }
                    }
                }

                if (count >= 5) {
                    datas.push(bitki);
                }
            }
            console.log("data", datas);
            setPlants(datas)
        }
    }, [state])

    const onNext = (e) => {
        e.preventDefault();
        setState(old => old + 1);
    }

    const onPrev = (e) => {
        e.preventDefault();
        setState(old => old - 1);
    }

    const onCheck = (e, result, key) => {
        e.preventDefault();
        setResults({
            ...results,
            [key]: result.split(',')
        });
        //next question
        onNext(e);

    }
    return <div>
        {data && data.map((item, index) =>
            <div key={item.id}>
                <p className="question" >{item.soru}</p>
                <Answer answer={item.siklar} option={item.cevap} onClick={onCheck} i={state} />
            </div>
        )}
        {
            plants.length === 0 && state === 5
                ? <div className="result">İstediğiniz kriterde bitki bulunamadı! Lütfen tekrar seçim yapınız..
                </div> :
                state === 5 && <div className="result">
                    <h2>Size sunduğumuz bitkiler :)</h2>
                    {plants.map((item, index) => <ul key={index}>
                        <li><img src={item.imageUrl} alt={item.bitkiAdi} width='100px' height='100px'/></li>
                        <li>{item.bitkiAdi}</li>
                    </ul>)}
                </div>

        }
        {
            state !== 5 ?
                <div className="btn-group">
                    <Button name="Geri" onClick={onPrev} disabled={state === 0} />
                    <Button name="ileri" onClick={onNext} disabled={state === sorular.length} />
                </div> : state === 5 && <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}><Button name="Başa Dön" onClick={() => setState(0)} /></div>
        }



    </div>
}

export default Questions;