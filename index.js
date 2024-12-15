const TelegranmApi = require('node-telegram-bot-api')

const token = '7966789748:AAHQBFERx9FP7fgBPT-IJesC32lnpgqqLrw'

const bot = new TelegranmApi(token , {polling :true})





const start = () =>{

    bot.setMyCommands ([
        {command: `/start`, description: `Початкове привітання`},
        {command: `/info`, description: `Отримати інформацію користувача`},
        
    ])
    
    bot.on('message', async msg => 
    {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendSticker(chatId , 'https://tlgrm.eu/_/stickers/232/efc/232efc5a-b6eb-4d09-abf4-4252d60747f5/1.webp')
            return bot.sendMessage(chatId , 'Вітаю на моєму каналі');   
        }
        
        if (text===`/info`) {
            return bot.sendMessage(chatId , `Тебе звати ${msg.from.first_name} ${msg.from.last_name}`)
            
        }
        
        return bot.sendMessage (chatId ,`Я Вас не зрозумів.Спробуйте ще раз!`)
        console.log(msg);
         
    });

}

start()