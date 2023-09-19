import { useState } from 'react';
import styles from './style.less'
import Title from './Title'
import Menu from './Menu'
import Theme from './Theme'
const Index = () => {
    return (
        <div className={styles.themeManage}>
            <Title />
            <Menu />
            <Theme />
        </div>
    );
};
export default Index