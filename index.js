const Discord = require('discord.js');
const bot = new Discord.Client();
const commandes = require('./commandes.json')
const token = require('./token.json')

bot.login(token.token)D8")

bot.on("ready", async() =>{
    console.log("Bot on")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("est presque fini");
    },100);
});

prefix = "$"
bot.on("message", message =>{
    if (message.content.startsWith(prefix + "play") || message.content.startsWith(prefix + "p")){
        if (message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                let audio = commandes[args[1]]
                let dispatcher;
                eval (`dispatcher = connection.play("${audio}")`);
                

                dispatcher.on("finish", () =>{
                    console.log("musique fini !")
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err =>{
                    console.log("erreur de dispatcher : " + err);
                })


            }).catch(err =>{
                message.reply("Erreur lors de la connection : " + err);
            });
        } else {
            message.reply("Vous n'êtes pas dans un salon vocal.");
        }
    }
});
