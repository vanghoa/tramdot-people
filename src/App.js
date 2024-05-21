import { useRef, useState } from 'react';
import './App.css';
import { SVGBodyArray } from './SVG';
import * as htmlToImage from 'html-to-image';

function App() {
    const [text, setText] = useState('a');
    const [pose, setPose] = useState(0);
    const imageRef = useRef(null);
    const poseHandler = () => {
        if (pose >= SVGBodyArray.length - 1) {
            setPose(0);
            return;
        }
        setPose((pose) => pose + 1);
    };
    const imageHandler = async () => {
        await wait(1000);
        await htmlToImage.toPng(imageRef.current, {
            backgroundColor: '#baff00',
        });
        await htmlToImage.toPng(imageRef.current, {
            backgroundColor: '#baff00',
        });
        await htmlToImage.toPng(imageRef.current, {
            backgroundColor: '#baff00',
        });
        await htmlToImage.toPng(imageRef.current, {
            backgroundColor: '#baff00',
        });
        await htmlToImage
            .toPng(imageRef.current, {
                backgroundColor: '#baff00',
            })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `your-tramdot-people.png`;
                link.href = dataUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <main>
            <div className="input">
                <input
                    placeholder="Gõ tên"
                    spellCheck="false"
                    maxLength="5"
                    onChange={(e) => setText(e.target.value)}
                ></input>
            </div>
            <section ref={imageRef}>
                <div className="artwork">
                    {SVGBodyArray[pose]({ text: text })}
                </div>
            </section>
            <div className="buttonsection">
                <div className="button">
                    <button onClick={poseHandler}>Different pose</button>
                </div>
                <div className="button">
                    <button onClick={imageHandler}>Save image</button>
                </div>
            </div>
        </main>
    );
}

export function SVGText({ children = '', style = {}, className = '' }) {
    const styleArr = children.split('').map((str) => getRandomInteger(-20, 20));
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            className={`${className} head`}
            viewBox="0 0 400 400"
            width={400}
            height={400}
            style={style}
        >
            {Array.from({ length: 4 }).map((e, k) => {
                return (
                    <text
                        key={k}
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        vectorEffect="non-scaling-stroke"
                        className="stroke_default"
                    >
                        {children.split('').map((str, k) => {
                            return (
                                <tspan key={k} rotate={styleArr[k]}>
                                    {str}
                                </tspan>
                            );
                        })}
                    </text>
                );
            })}
        </svg>
    );
}

export function SVGPath({ children, className = '', ...rest }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            className={`${className} body`}
            {...rest}
        >
            {Array.from({ length: 4 }).map((e, k) => children)}
        </svg>
    );
}

export function Path({ ...rest }) {
    return (
        <path
            className="stroke_default"
            x="50%"
            y="50%"
            vectorEffect="non-scaling-stroke"
            fillRule="evenodd"
            clipRule="evenodd"
            {...rest}
        />
    );
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
export default App;
