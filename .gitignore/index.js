const Discord = require("discord.js");

var bot = new Discord.Client();

var prefix = ("/");

const ytdl = require("ytdl-core");

const queue = new Map();

var servers = {};

const FileSync = require('lowdb/adapters/FileSync')

const low = require('lowdb')

const adapters = new FileSync('database.json');

const db = low(adapters);


bot.on("ready", function() {
    bot.user.setGame("MirabeliaBot | /help");
    console.log("Connection : Ok");
})

bot.login("NTA4NjQxNjUxNjkxMDk0MDE4.DsCPbA.v6YtXEGgsKnOgcHlQPK_s6jHHX0")

bot.on("guildMemberAdd", member=> {
    member.guild.channels.find("name", "🏮bienvenue🏮").send(` :arrow_right:️Bienvenue sur Mirabelia ${member} :confetti_ball: ! Fait /ip pour avoir ip du server .`)
    member.addRole("name", "Membre[🎮]")
})

bot.on("guildMemberRemove", member=> {
    member.guild.channels.find("name", "🏮bienvenue🏮").send(`:arrow_left:️Au-revoir ${member}:arrows_counterclockwise:!:arrow_left:️Bonne journée à toi:yin_yang:️ !`)
})


function newFunction() {
    return ".";
}


db.defaults({ histoires : [], xp: []}).write()

bot.on('message', message => {
    
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des XP de : ${message.author.username}`)
                .setColor('#FA00CF')
                .addField("XP", `${xpfinal[1]} xp`)
                .setFooter("By David Fox")
            message.channel.send({embed : xp_embed})
        }
    }
})




bot.on('message', message => {
    if(message.author.bot)return;
        if (message.content === prefix + "help"){
            var embed = new Discord.RichEmbed()
                .setTitle(`Voici les commandes disponibles ${message.author.username}`)
                .setColor('#FA00CF')
                .addField("/ip", 'affiche Ip et le port du serveur')
                .addField("/xp", 'affiche ton xp')
                .addField("/infos", 'affiche les informations du serveurs')
                .setFooter("By David Fox")
            message.channel.send(embed);
            console.log("1 Demandé!")
     }
})

bot.on('message', message => {
    if(message.author.bot)return;
        if (message.content === prefix + "ip"){
            var embed = new Discord.RichEmbed()
                .setTitle(`Tu as demandez Adresse du serveur ${message.author.username}?`)
                .setColor('#FA00CF')
                .addField("La voici!", 'Mirabelia.mcpe.eu')
                .addField("Et son Port", '19140')
                .setFooter("By David Fox")
            message.channel.send(embed);
            console.log(" 2 Demandé!")
     }
})


bot.on('message', message => {
    if(message.author.bot)return;
        if (message.content === prefix + "infos"){
            var embed = new Discord.RichEmbed()
                .setTitle(`Voici les informations du serveur  ${message.author.username}`)
                .setColor('#FA00CF')
                .addField("Nom du serveur", 'Mirabelia - Le Rose')
                .addField("Description du serveur", 'ce serveur discord est un serveur consacré au serveur MCPE Minecraft Mirabelia.Pour en savoir plus , fait /ip')
                .addField("Nombre de joueurs", message.guild.memberCount)
                .addField("Nombre de channel", message.guild.channels.size)
                .setFooter("By David Fox")
            message.channel.send(embed);
            console.log(".Serveur Demandé!")
     }
})
