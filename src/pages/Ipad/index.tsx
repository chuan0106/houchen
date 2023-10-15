import { FC } from 'react';
import { Outlet } from 'umi';
const menu = [
    { name: '首页', instructions: '首页', id: 1 },
    { name: '全貌', instructions: '全貌', id: 2 },
]

type Props = {
    dispatch: any
}
const Index: FC<Props> = () => {
    const channel = new BroadcastChannel('houchen')

    const onclick = (instructions: string) => {
        channel.postMessage(instructions)
    }
    return (
        <div >
            <ul>
                {menu.map((item => (
                    <li><button key={item.id} onClick={() => { onclick(item.instructions) }}>{item.name}</button></li>
                )))}
            </ul>
            <Outlet />
        </div>
    );
};

export default Index