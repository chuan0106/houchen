import React, { useState, useEffect } from 'react'
import styles from './style.less'
import { Slider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const end = 1440  // 总长度
const stepCount = 60  // 步长
const contentStyle = {  // 是背景渐变 而不是给文字添加颜色 所需要的属性
    cursor: 'pointer',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    // background: 'linear-gradient(to right, rgba(182, 54, 128) 0%, rgba(16, 202, 100, ) 100%)'  // 不知道为何不生效 我单独 在 className 写入了
};
const index = ({ SliderChange }) =>
{
    const [currentTime, setCurrentTime] = useState('18:00')
    useEffect(() =>
    {
        setCurrentTime(ThisTime())
    }, [])
    // 获取实时小时
    const ThisTime = () =>
    {
        let newThisTime = new Date().getHours().toString().padStart(2, '0').padEnd(5, ':00')
        return newThisTime
    }
    // 当数据改变时 得到的是步长数 转换为加工过的时间
    const handleChange = async value =>
    {
        try
        {
            let newValue = parseFloat(tipFormatter(value))  // 当前小时  08:00  => 8
            let newThisTime = parseFloat(ThisTime())  // 实时小时
            if (newValue <= newThisTime)
            {
                setCurrentTime(tipFormatter(value))
                SliderChange(tipFormatter(value))
            }
        } catch (err)
        {
            console.log(err);
        }
    }
    // 时间包装
    const tipFormatter = value =>
    {
        let newValue = (value / 60).toString().padStart(2, '0').padEnd(5, ':00')
        return newValue
    }
    // 时间转为步长
    const TimeToStep = currentTimeStr =>
    {
        let currentTime = currentTimeStr.split(':');
        if (currentTime.length === 2)
        {
            // 最新的步长数
            let newStep = currentTime[0] * 60 + currentTime[1] * 1
            return newStep
        } else
        {
            return 0;
        }
    }
    // 时间减1
    const reduceClick = () =>
    {
        let CurrentStep = TimeToStep(currentTime)  // 当前时间
        let CurrentTimeStep = TimeToStep(ThisTime())  // 实时时间
        if (CurrentStep <= CurrentTimeStep && CurrentStep > 0)
        {

            setCurrentTime(tipFormatter((CurrentStep -= 60)));
            tipFormatter(tipFormatter((CurrentStep -= 60)))
        } else
        {
            setCurrentTime('00:00');
            tipFormatter('00:00')
        }
    }
    // 时间加1
    const subjoinClick = () =>
    {
        let CurrentStep = TimeToStep(currentTime)  // 当前时间
        let CurrentTimeStep = TimeToStep(ThisTime())  // 实时时间
        if (CurrentStep < CurrentTimeStep && CurrentStep >= 0)
        {
            setCurrentTime(tipFormatter(Number((CurrentStep += 60))));
            tipFormatter(Number((CurrentStep += 60)))
        } else
        {
            // 如果当前时间 大于等于时间轴 则显示这个时间
            setCurrentTime(ThisTime());
            tipFormatter(ThisTime())
        }
    }

    const SliderDom = () =>
    {
        const marks = new Array
        let newValue = parseFloat(currentTime)  // 当前小时  08:00  => 8
        let newThisTime = parseFloat(ThisTime())  // 实时小时
        for (let index = 0; index <= end / stepCount; index++)
        {
            let ladder = (end / (end / stepCount)) * Number(index)  // 总长度 / 60 = 24小时
            marks[ladder] = ({
                style: {
                    color: 'red',  // 因为设置过背景颜色颜色了 所以这里不会生效 而且仿佛还只有 color 会生效
                    // textAlign: 'right'  // 没生效 ~ 
                },
                // index 也对应着 所处的每个小时 所以 要拿 index 判断 而不是 newValue !
                label: (<strong style={contentStyle} className={index <= newThisTime ? styles.active : index % 2 === 0 ? styles.marksEven : styles.marksOdd} >
                    {tipFormatter((end / 24) * index)
                    }</strong>),
            })
        }
        return (
            <Slider
                className={styles.Slider}
                marks={marks}
                max={end}
                step={stepCount}
                value={TimeToStep(currentTime)}  // 时间转换后的步长
                onChange={handleChange}
                tipFormatter={tipFormatter}
                disabled={false}  // 禁止点击 否
            />
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.reduce} onClick={reduceClick}>
                <MinusOutlined width={100} />
            </div>
            {SliderDom()}
            <div className={styles.subjoin} onClick={subjoinClick}>
                <PlusOutlined className={styles.subjoin} />
            </div>
        </div>
    )
}

export default index

