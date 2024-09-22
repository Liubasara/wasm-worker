export const healthyCheck: ControllerFnType = (ctx, next) => {
  ctx.status = 200
  return next()
}
