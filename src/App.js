import { useRef, useState } from 'react';
import './App.css';
import { SVGBodyArray } from './SVG';
import * as htmlToImage from 'html-to-image';
import { ReactComponent as Logo } from './logo.svg';

function App() {
    const [text, setText] = useState('a');
    const [pose, setPose] = useState(0);
    const [logo, setLogo] = useState('orange');
    const [indicator, setIndicator] = useState('Save image');
    const [openImg, setOpenImg] = useState('');
    const [srcImg, setSrcImg] = useState('');
    const imageRef = useRef(null);
    const poseHandler = () => {
        if (pose >= SVGBodyArray.length - 1) {
            setPose(0);
            return;
        }
        setPose((pose) => pose + 1);
    };
    const imageHandler = async () => {
        const bgColor = getComputedStyle(document.body).backgroundColor;
        const options = {
            backgroundColor: bgColor,
            canvasWidth: 1000,
            canvasHeight: 1000,
        };
        await wait(500);
        await htmlToImage.toPng(imageRef.current, options);
        await htmlToImage.toPng(imageRef.current, options);
        await htmlToImage.toPng(imageRef.current, options);
        await htmlToImage.toPng(imageRef.current, options);
        await htmlToImage
            .toPng(imageRef.current, options)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `your-tramdot-people.png`;
                link.href = dataUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
                //
                setSrcImg(dataUrl);
                setIndicator('scroll down to save!');
                setOpenImg('open');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const backgroundHandler = (color, logocolor) => {
        document.body.style.backgroundColor = color;
        setLogo(logocolor);
    };
    return (
        <>
            <main>
                <div className="input">
                    <input
                        placeholder="type here"
                        spellCheck="false"
                        maxLength="5"
                        onChange={({ target: { value } }) =>
                            setText(value === '' ? '?' : value)
                        }
                    ></input>
                </div>
                <div className="sectionwrapper">
                    <section>
                        <div className="artwork">
                            {SVGBodyArray[pose]({ text: text })}
                        </div>
                    </section>
                </div>
                <div className="imagewrapper">
                    <section ref={imageRef}>
                        <div className="artwork">
                            {SVGBodyArray[pose]({ text: text })}
                        </div>
                        <Logo className={`logo ${logo}`} />
                    </section>
                </div>
                <div className="bgcolorsection">
                    <div className="button green">
                        <button
                            onClick={() =>
                                backgroundHandler(
                                    'var(--color-green)',
                                    'orange'
                                )
                            }
                        ></button>
                    </div>
                    <div className="button blue">
                        <button
                            onClick={() =>
                                backgroundHandler('var(--color-blue)', 'white')
                            }
                        ></button>
                    </div>
                    <div className="button pink">
                        <button
                            onClick={() =>
                                backgroundHandler('var(--color-pink)', 'white')
                            }
                        ></button>
                    </div>
                    <div className="button greendam">
                        <button
                            onClick={() =>
                                backgroundHandler(
                                    'var(--color-greendam)',
                                    'white'
                                )
                            }
                        ></button>
                    </div>
                    <div className="button purple">
                        <button
                            onClick={() =>
                                backgroundHandler(
                                    'var(--color-purple)',
                                    'white'
                                )
                            }
                        ></button>
                    </div>
                    <div className="button orange">
                        <button
                            onClick={() =>
                                backgroundHandler(
                                    'var(--color-orange)',
                                    'white'
                                )
                            }
                        ></button>
                    </div>
                </div>
                <div className="buttonsection">
                    <div className="button">
                        <button onClick={poseHandler}>Different pose</button>
                    </div>
                    <div className="button">
                        <button onClick={imageHandler}>{indicator}</button>
                    </div>
                </div>
            </main>
            <div className={`canvasimage ${openImg}`}>
                <img src={srcImg} />
            </div>
        </>
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

export function SVGPath({ children, className = '', solid = <></>, ...rest }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            className={`${className} body`}
            {...rest}
        >
            <g>{solid}</g>
            <g>{Array.from({ length: 4 }).map((e, k) => children)}</g>
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
