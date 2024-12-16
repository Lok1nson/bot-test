const TelegramApi = require('node-telegram-bot-api')
const { text } = require('stream/consumers')
const {gameOptions ,againOptions} = require ('./options')
const token = '7966789748:AAHQBFERx9FP7fgBPT-IJesC32lnpgqqLrw'

const bot = new TelegramApi(token , {polling :true})

const chats = {}





//функція грати ще раз
const startGame = async (chatId) =>{
            await bot.sendMessage (chatId , `Зараз я загадаю цифру від 0 до 9 а ти спробуй відгадати`);
            const randomNumber = Math.floor(Math.random()*10);
            chats[chatId] = randomNumber;
            await bot.sendMessage (chatId ,`Відгадуй!`, gameOptions);

}

//menu options
const start = () =>{

    bot.setMyCommands ([
        {command: `/start`, description: `Початкове привітання`},
        {command: `/info`, description: `Отримати інформацію користувача`},
        {command: `/game`, description: `Вгадай цифру`},
    ])
    
    bot.on('message', async msg => 
    {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendSticker(chatId , 'https://tlgrm.eu/_/stickers/232/efc/232efc5a-b6eb-4d09-abf4-4252d60747f5/1.webp');
            return bot.sendMessage(chatId , 'Вітаю на моєму каналі')   
        }
        
        if (text===`/info`) {
            return bot.sendMessage(chatId , `Тебе звати ${msg.from.first_name} ${msg.from.last_name}`)
            
        }
        if (text === `/game`){
            return startGame(chatId)
        }
        return bot.sendMessage (chatId ,`Я Вас не зрозумів.Спробуйте ще раз!`)
        console.log(msg);
         
    });
    //обробка з кнопок гри
    bot.on('callback_query', msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (Number(data) === chats[chatId]){
            return bot.sendMessage (chatId , `Вітаю , ти вгадав число ${chats[chatId]}`,againOptions);
        }else{
            return bot.sendMessage (chatId , `Прикро , але я загадав число ${chats[chatId]}`,againOptions);
        }

    

    })
}

start()