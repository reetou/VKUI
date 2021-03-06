/**
 * Функция для js анимации
 * @param {number} duration
 * @param {function} timing тайминг функция анимации
 * @param {function} draw коллбэк, в который прокидывается прогресс [0, 1]
 * @returns {void}
 */
export interface TimingInterface {
  (timeFraction: number): number
}

export interface DrawInterface {
  (progress: number): void
}

export interface AnimateArgumentsInterface {
  duration: number,
  timing: TimingInterface,
  draw: DrawInterface
}

export default function animate({ duration, timing, draw }: AnimateArgumentsInterface): void {
  if (typeof window === 'undefined') {
    return;
  }

  const start = window.performance.now();

  window.requestAnimationFrame(function animate(time: number): void {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      window.requestAnimationFrame(animate);
    }
  });
}
