# Minecraft Bot

Free Minecraft (Java Edition) bot built on [mineflayer](https://github.com/PrismarineJS/mineflayer).

## Run

1. Install [Node.js](https://nodejs.org) (free).
2. `npm install`
3. Open your world to LAN (or start a server) and run:

```
MC_HOST=localhost MC_PORT=25565 npm start
```

On Windows PowerShell: `$env:MC_PORT=25565; npm start`

Use the port Minecraft shows when you "Open to LAN". Online-mode servers need `MC_AUTH=microsoft` and a Microsoft account.

## Chat commands

`come` · `follow` · `stop` · `jump` · `where`
