const Discord = require('discord.js');
require('dotenv').config()
const data = require('./data.json')
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
})




client.on('ready', () => {
  console.clear();
  console.log('Logged in as: '+client.user.tag)


  const onlinechannelid = '931250109298147348';
  const channel = client.channels.cache.get(onlinechannelid);
  channel.send({ content: 'Ich bin Online 🦦'})
        .then(msg => {
          setTimeout(() => msg.delete(), 100000)
        })
        .catch(console.error());
});


client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.startsWith('!otter')) {
     
    //debug
    randomNumber=Math.floor(Math.random() * 4);
    console.log('number was: '+randomNumber)
    console.log(messageCreate.author)
    

    //actuall code
    messageCreate.channel.send((data)[randomNumber].picture); 
  }




  if (messageCreate.content.startsWith('!add')) {
  let options = {
    max: 2,
    time: 15000
  }
  let add = messageCreate.channel.createMessageCollector(options)

  add.on('collect',(messageCreate)  => {
    console.log(`added ${messageCreate.content}`)
  })

  add.on('end', (added)=>{
    console.log(`Collected ${added} item`)
    messageCreate.reply(`added ${added}` )
  })

  
}
});

client.login(process.env.TOKEN);




