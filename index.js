/**включаеm библиотеку Express, здесь идет
 *  создание нового HTTP-сервера. В примере 
 * HTTP-сервер слушает порт 3000, 
 * т.е. localhost:3000. Путь идет к корню, “/”. 
 * Результат возвращается в виде HTML-файла index.html
 * 
 */

var app = require('express')();
var http = require('http').Server(app);
 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
 
http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});

/**код начинается с импорта библиотеки Socket.io.
 *  Это указывается переменной io. Далее, используя
 *  эту переменную, создаем обработчик события с 
 * функцией on. Это событие вызывается 
 * каждый раз, когда клиент подключается к серверу
 * 
 * настроиm Socket.io. Для создания 
 * сервера Socket выполняем следующие команды: 
 */

var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('Client connection received');

    //socket.emit, отправляет сообщение клиенту
    socket.emit('sendToClient', { hello: "world" });

    /**sendToClient — имя события. Именуя события, вы получаете 
     * возможность отправлять разные типы сообщений, так что клиент 
     * сможет интерпретировать их по-разному. */

    /**Еще одно обновление — socket.on, где тоже есть название события: receivedFromClient. 
     * Все это создает функцию, которая принимает данные от клиента. В этом случае они также
     *  записываются в окне консоли.

Выполненные действия завершают подготовку сервера. Теперь он может принимать и отправлять 
данные от любого подключенного клиента.

Давайте завершим этот пример, обновив клиент путем получения ивента sendToClient. Когда 
событие получено, дается ответ receivedFromClient. */
 
     socket.on('receivedFromClient', function (data) {
        console.log(data);
    });
});