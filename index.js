const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")

const Database = require("@replit/database")

const db = new Database()
const client = new Discord.Client()

const marcoUser = ["Marco", "marco", "MARCO"]

const poloBot = ["POLO!"]

const marshallUser = ["Marshal", "marshal", "MARSHAL"]

const lillyBot = ["LILLY!", "LILLYYY!", "LILLY!!"]

const userChoice = ["$rock", "$Rock", "$paper", "$Paper", "$scissors", "$Scissors", "$scissor", "$Scissor"]

const botChoice = ["Rock", "Paper", "Scissors"]

const swearWords = ["Fuck", "fuck", "shit", "Shit", "ass", "Ass", "Butt", "butt", "Bastard", "bastard", "Damn", "damn", "Bitch", "bitch"]

const responseToSwears = ["HEY! LANGUAGE!", "A little too slippery tongue, eh?", "Could you say that again with grown-up language?", "I would insult you back, but I’m afraid it might be incomprehensible to you.","do you kiss your mother with that mouth?", "you were raised like a wild animal"]

const sadWords = ["sad", "depressed", "unhappy", "angry", "Sad", "Depressed", "Unhappy", "Angry", "gloomy", "Gloomy"]

const starterEncouragements = [
  "Cheer up!",
  "This is what you're going through, not who you are.",
  "You are a great person/bot!"
]

const jokeCommands = ["$Joke", "$JOKE", "$joke"]

const starterJokes = [
"How did the two cars start dating? One of them swiped the other.", 
"What do you call a popstar’s group of friends? Britney’s peers!", 
"Why are giraffes so slow to apologise? It takes them a long time to swallow their pride.",
"What do diapers and Politicians have in common? They both need changing regularly - for exactly the same reason.", 
"I could tell you a joke about a broken pencil but nevermind, it's pointless.", 
"I don't know why I love bad puns so much. It's just how eye roll.", 
"How do meteorologists go up a mountain? They climate.", "I don't often tell dad jokes. But when I do he usually laughs.", 
"Tell you a joke about potassium? K.", 
"I stayed up all night wondering where the sun went. Then it dawned on me."
]

const fortuneCommands = ["$fortune", "$FORTUNE", "$Fortune"]

const fortuneTeller = ["So let’s take your doubts away. The answer is, totally!", "Really? You wanna take my advice?", "Haha, sure!", "I don't admit it often, but for my part-time job, I scam people for money.", "I guess.", "Obvious much?", "Signs point to yes.", "Don't rely on it.", 'Remember in Toy Story when woody throws the ball in frustration and it says “don’t count on it”?', "Better not tell you now.", "Seems sus to me.", "You tell me"]

db.get("encouragements").then(encouragements => {
  if (!encouragements || encouragements.length < 1){
    db.set("encouragements", starterEncouragements)
  }
})

db.get("jokes").then(jokes => {
  if (!jokes || jokes.length < 1){
    db.set("jokes", starterJokes)
  }
})

db.get("swears").then(swears => {
  if (!swears || swears.length < 1){
    db.set("swears", responseToSwears)
  }
})

db.get("fortunes").then(fortunes => {
  if (!fortunes || fortunes.length < 1){
    db.set("fortunes", fortuneTeller)
  }
})

db.get("rocks").then(rocks => {
  if (!rocks || rocks.length < 1){
    db.set("rocks", botChoice)
  }
})

db.get("marcoPolos").then(marcoPolos => {
  if (!marcoPolos || marcoPolos.length < 1){
    db.set("marcoPolos", poloBot)
  }
})

db.get("marshallLillys").then(marshallLillys => {
  if (!marshallLillys || marshallLillys.length < 1){
    db.set("marshallLillys", lillyBot)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

function updateEncouragements(encouragingMessage) {
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function updateJokes(newJoke) {
  db.get("jokes").then(jokes => {
    jokes.push([newJoke])
    db.set("jokes", jokes)
  })
}

function deleteEncouragement(index) {
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1)
      db.set("encouragements", encouragements)
    }
  })
}

function deleteJoke(index) {
  db.get("jokes").then(jokes => {
    if (jokes.length > index) {
      jokes.splice(index, 1)
      db.set("jokes", jokes)
    }
  })
}

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data[0]["q"] + " -" + data[0]["a"]
  })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
if (msg.author.bot) return

  if(msg.content === "$inspire"){
    getQuote().then(quote => msg.channel.send(quote))
  }

db.get("responding").then(responding => {
 if (responding && sadWords.some(word => msg.content.includes(word))) {
    db.get("encouragements").then(encouragements => {
      const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
      msg.reply(encouragement)
    })
  }

  else if (responding && jokeCommands.some(word => msg.content.includes(word))) {
    db.get("jokes").then(jokes => {
      const joke = jokes[Math.floor(Math.random() * jokes.length)]
      msg.reply(joke)
    })
  }

else if (responding && swearWords.some(word => msg.content.includes(word))) {
    db.get("swears").then(swears => {
      const swear = swears[Math.floor(Math.random() * swears.length)]
      msg.reply(swear)
    })
  }

  else if (responding && fortuneCommands.some(word => msg.content.includes(word))) {
    db.get("fortunes").then(fortunes => {
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
      msg.reply(fortune)
    })
  }

  else if (responding && userChoice.some(word => msg.content.includes(word))) {
    db.get("rocks").then(rocks => {
      const rock = rocks[Math.floor(Math.random() * rocks.length)]
      msg.reply(rock)
    })
  }

  else if (responding && marcoUser.some(word => msg.content.includes(word))) {
    db.get("marcoPolos").then(marcoPolos => {
      const marcoPolo = marcoPolos[Math.floor(Math.random() * marcoPolos.length)]
      msg.reply(marcoPolo)
    })
  }

  else if (responding && marshallUser.some(word => msg.content.includes(word))) {
    db.get("marshallLillys").then(marshallLillys => {
      const marshallLilly = marshallLillys[Math.floor(Math.random() * marshallLillys.length)]
      msg.reply(marshallLilly)
    })
  }

})
  
db.get("responding").then(responding => {
  if (responding && msg.content.startsWith("$new")) {
    encouragingMessage = msg.content.split("$new ")[1]
    updateEncouragements(encouragingMessage)
    msg.channel.send("New encouraging message added.")
  }

  if (responding && msg.content.startsWith("$add")) {
    newJoke = msg.content.split("$add ")[1]
    updateJokes(newJoke)
    msg.channel.send("New joke added.")
  }

  if (responding && msg.content.startsWith("$del")) {
    index = parseInt(msg.content.split("$del ")[1])
    deleteEncouragement(index)
    msg.channel.send("Encouraging message deleted.")
  }

  if (responding && msg.content.startsWith("$remove")) {
    index = parseInt(msg.content.split("$remove ")[1])
    deleteJoke(index)
    msg.channel.send("Joke deleted.")
  }

  if (responding && msg.content.startsWith("$list")) {
    db.get("encouragements").then(encouragements => {
      msg.channel.send(encouragements)
    })
  }

  if (responding && msg.content.startsWith("$catalogue")) {
    db.get("jokes").then(jokes => {
      msg.channel.send(jokes)
    })
  }
  })

  if (msg.content.startsWith("$responding")) {
    value = msg.content.split("$responding ")[1]

    if (value.toLowerCase() == "true") {
      db.set("responding", true)
      msg.channel.send("Responding is on.")
    }
    else{
      db.set("responding", false)
      msg.channel.send("Responding is off.")
    }
  }

})
keepAlive()
client.login(process.env.TOKEN)