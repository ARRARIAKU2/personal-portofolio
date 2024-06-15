function fadeIn(direction: string, delay: number) {
    return {
        hidden: {
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            opacity: 0,
            x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        },
        show: {
            y: 0,
            opacity: 1,
            x: 0,
            transition: {
                type: 'tween',
                delay: delay,
                duration: 1.2,
                ease: [0.25, 0.25, 0.25, 0.75],
            }
        }
    }
}

export { fadeIn }