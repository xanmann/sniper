const discord = require('discord.js-selfbot-v13')
const client = new discord.Client({checkUpdate: false})

const request = require('request')

const consolecolor = require('gradient-string')

const config = require('./config')
const token = config.token || process.env.token
const password = config.password || process.env.password

if (!config.username) throw new TypeError("Please enter a username in the config file")
if (!config.tag) throw new TypeError("Please enter a tag like (0001) in the config file")
if (config.tag.includes("#")) throw new TypeError("The tag in the config file must don't have a # (0001 only for example)")
if (!password) throw new TypeError('Please provide your password in the config file')

if (!token) client.QRLogin()
else client.login(token).catch(() => console.log(consolecolor.instagram("Invalid token !")))

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.on('ready', async () => {

    if (client.user.nitroType === "NONE") nitroType = 'No Nitro'
    if (client.user.nitroType === "NITRO_BASIC") nitroType = "Nitro Basic"
    if (client.user.nitroType === "NITRO_CLASSIC") nitroType = "Nitro Classic"
    if (client.user.nitroType === "NITRO_BOOST") nitroType = "Nitro Boost" 

    console.clear()
    console.log(consolecolor.retro(`



                        ██╗   ██╗███████╗███████╗██████╗ ███╗   ██╗ █████╗ ███╗   ███╗███████╗
                        ██║   ██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔══██╗████╗ ████║██╔════╝
                        ██║   ██║███████╗█████╗  ██████╔╝██╔██╗ ██║███████║██╔████╔██║█████╗  
                        ██║   ██║╚════██║██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝  
                        ╚██████╔╝███████║███████╗██║  ██║██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗
                         ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
                                                                      
                                        ███████╗███╗   ██╗██╗██████╗ ███████╗██████╗                          
                                        ██╔════╝████╗  ██║██║██╔══██╗██╔════╝██╔══██╗                         
                                        ███████╗██╔██╗ ██║██║██████╔╝█████╗  ██████╔╝                         
                                        ╚════██║██║╚██╗██║██║██╔═══╝ ██╔══╝  ██╔══██╗                         
                                        ███████║██║ ╚████║██║██║     ███████╗██║  ██║                         
                                        ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
                            
                            
                            
                                                Connected as: ${client.user.username}
                                                Discriminator: ${client.user.discriminator}
                                                ID: ${client.user.id}
                                                Nitro: ${nitroType}
                                                Futur Name: ${config.username}#${config.tag}
                                                
`))
})

client.on('ready', async () => {
    setInterval(async() => {
        if (client.user.tag === config.username + "#" + config.tag){
            console.log(consolecolor.instagram("You now have the nickname and the # you wanted"))
            process.exit(1)
        }

                client.user.setUsername(config.username, password)
                .then(() => console.log(consolecolor.retro(`[+] Your new username is ${config.username}`)))
                .catch(() => false)
               if (client.user.nitroType !== "NONE") client.user.setDiscriminator(config.tag, password)
               .then(() => console.log(consolecolor.retro(`[+] Your new tag is: ${config.tag}`)))
               .catch(() => false)


}, 1);
})