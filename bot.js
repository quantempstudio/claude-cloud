const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')

const bot = mineflayer.createBot({
  host: process.env.MC_HOST || 'localhost',
  port: Number(process.env.MC_PORT) || 25565,
  username: process.env.MC_USER || 'Bot',
  auth: process.env.MC_AUTH || 'offline', // 'microsoft' for online-mode servers
})

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  bot.pathfinder.setMovements(new Movements(bot))
  bot.chat('Hi! Commands: come, follow, stop, jump, where')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  const player = bot.players[username]?.entity
  switch (message.trim().toLowerCase()) {
    case 'come':
      if (!player) return bot.chat("I can't see you")
      bot.pathfinder.setGoal(new goals.GoalNear(player.position.x, player.position.y, player.position.z, 1))
      break
    case 'follow':
      if (!player) return bot.chat("I can't see you")
      bot.pathfinder.setGoal(new goals.GoalFollow(player, 2), true)
      break
    case 'stop':
      bot.pathfinder.setGoal(null)
      break
    case 'jump':
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      break
    case 'where': {
      const p = bot.entity.position
      bot.chat(`I'm at ${p.x.toFixed(0)} ${p.y.toFixed(0)} ${p.z.toFixed(0)}`)
      break
    }
  }
})

bot.on('kicked', reason => console.log('Kicked:', reason))
bot.on('error', err => console.log('Error:', err.message))
bot.on('end', () => console.log('Disconnected'))
