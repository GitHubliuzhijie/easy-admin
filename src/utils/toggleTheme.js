import { useDark, useToggle } from '@vueuse/core'

// 使用 VueUse 的 useDark 函数来管理暗黑模式状态
const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light'
})

// 使用 useToggle 函数来切换暗黑模式
const toggleDark = useToggle(isDark)


// 主题切换函数
export const toggleTheme = (event) => {
    // 获取点击位置坐标
    const x = event.clientX
    const y = event.clientY

    // 计算结束半径（从点击位置到屏幕最远点的距离）
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    )

    // 兼容性处理：如果浏览器不支持 View Transitions API，则直接切换主题
    if (!document.startViewTransition) {
        toggleDark()
        return
    }

    // 使用 View Transitions API 创建过渡效果
    const transition = document.startViewTransition(async () => {
        toggleDark()
    })

    // 过渡准备就绪后，执行动画
    transition.ready.then(() => {
        // 定义圆形裁剪路径
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ]

        // 根据当前主题状态决定动画方向
        document.documentElement.animate(
            {
                clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
            },
            {
                duration: 400,
                easing: "ease-in",
                pseudoElement: isDark.value
                    ? "::view-transition-old(root)"
                    : "::view-transition-new(root)",
            }
        )
    })
}