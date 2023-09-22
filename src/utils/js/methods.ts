export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    } as T;
}

// 示例用法
const throttledMouseMove = throttle((event: MouseEvent) => {
    // 处理鼠标移动事件
    console.log("Mouse moved");
}, 200);

