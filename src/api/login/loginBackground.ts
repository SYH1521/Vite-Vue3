

export const initStarry = () => {
  // 第一个画布
  const canvasDom: HTMLCanvasElement = document.getElementById('canvasDom') as HTMLCanvasElement
  const canvasCtx: CanvasRenderingContext2D = canvasDom.getContext('2d') as CanvasRenderingContext2D
  canvasDom.width = window.innerWidth
  canvasDom.height = window.innerHeight
  let w = window.innerWidth
  let h = window.innerHeight
  var hue = 217
  var stars: any = []
  var count = 0
  var maxStars = 300 // 星星数量

  // 第二个画布
  const canvasDom2: HTMLCanvasElement = document.createElement('canvas')
  const canvasCtx2 = canvasDom2.getContext('2d') as CanvasRenderingContext2D
  canvasDom2.width = 100
  canvasDom2.height = 100

  var half = canvasDom2.width / 2 //星星的大小
  var gradient2 = canvasCtx2.createRadialGradient(half, half, 0, half, half, half)
  gradient2.addColorStop(0.025, '#CCC')
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
  gradient2.addColorStop(1, 'hsl(' + hue + ', 64%, 6%)')
  gradient2.addColorStop(1, 'transparent')
  canvasCtx2.fillStyle = gradient2
  canvasCtx2.beginPath()
  canvasCtx2.arc(half, half, half, 0, Math.PI * 2) //一个个流星的点
  canvasCtx2.fill()

  function random(min: number, max?: number): number {
    // arguments只有正常函数才有
    if (arguments.length < 2) {
      max = min
      min = 0
    }
    if (max) {
      if (min > max) {
        var hold = max
        max = min
        min = hold
      }
    }

    return Math.floor(Math.random() * ((max as number) - min + 1)) + min
  }
  // 运动最外圈的直径
  function maxOrbit(x: number, y: number) {
    var max = Math.max(x, y)
    var diameter = Math.round(Math.sqrt(max * max + max * max))
    return diameter / 2
    // 星星移动范围，值越大范围越小，
  }

  class Star {
    orbitRadius: number
    radius: number
    orbitX: number
    orbitY: number
    timePassed: number
    speed: number
    alpha: number

    constructor() {
      this.orbitRadius = random(maxOrbit(w, h))
      this.radius = random(60, this.orbitRadius) / 20

      // 星星大小
      this.orbitX = w / 2
      this.orbitY = h / 2
      this.timePassed = random(0, maxStars)
      this.speed = random(this.orbitRadius) / 50000
      // 星星移动速度
      this.alpha = random(2, 10) / 10
      count++
      stars[count] = this
    }
    draw() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
      var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
      var twinkle = random(10)

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05
      }

      canvasCtx.globalAlpha = this.alpha
      canvasCtx.drawImage(canvasDom2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)

      this.timePassed += this.speed
    }
  }

  for (var i = 0; i < maxStars; i++) {
    /* eslint-disable no-new */
    new Star()
  }
  function animation() {
    canvasCtx.globalCompositeOperation = 'source-over'
    canvasCtx.globalAlpha = 0.5 // 尾巴
    // canvasCtx.value!.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
    canvasCtx.fillStyle = 'hsla(180,2,89,1)'
    canvasCtx.fillRect(0, 0, w, h) //背景渲染 - 填充

    canvasCtx.globalCompositeOperation = 'lighter'
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw()
    }
    window.requestAnimationFrame(animation)
  }
  animation()
}

// export initStarry