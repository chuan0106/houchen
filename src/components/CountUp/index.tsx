import { FC, useState, useEffect } from 'react';
import CountUp, { CountUpProps } from 'react-countup';

const flexStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const backgroundStyle = {
    background: 'linear-gradient(to bottom, #f6f6f7, #a6bef1)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    fontWeight: 'bold'
};

const unitStyle = {
    fontWeight: 'normal'
};

type Props = {
    numerical: number;
    unit: string;
    styleA?: Object;
    styleB?: Object;
}

const Index: FC<Props> = ({ numerical, unit, styleA = backgroundStyle, styleB = unitStyle }) => {

    const [animationKey, setAnimationKey] = useState(0);

    // 重置动画
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey((prevKey) => prevKey + 1);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    const countUpProps: CountUpProps = {
        start: 0,
        end: numerical,
        decimals: 0,
        duration: 1.25,
        delay: 0,
        separator: ","
    };
    return (
        <CountUp
            key={animationKey}
            {...countUpProps}  >
            {({ countUpRef }) => (
                <div style={flexStyle}>
                    <span style={{ ...styleA, ...backgroundStyle }} ref={countUpRef}></span>
                    <span style={{ ...styleB, ...unitStyle }}>{unit}</span>
                </div>
            )}
        </CountUp>
    );
};
export default Index