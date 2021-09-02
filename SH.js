class CSH{

    _find(selector){
        let target = document.querySelectorAll(selector);

        if(target.length === 1){
            target = target[0];
        } else if(target.length === 0){
            target = undefined;
        }
        return target;
    }

    _isFreeName(name, callback){
        if(!this[name]){
            callback();
        } else {
            console.warn(`Имя ${name} уже занято. Выберите иное имя`);
        }
    }

    _setGetValue(name, selector){
        Object.defineProperty(this, name, {
            get: () => {
                const target = this._find(selector);
                if (target === undefined) {
                    console.warn(`Элемент ${name} по селектору ${selector} не найдет. Возвращено значение undefined`);
                }
                return target;
            },
            configurable: true,
        })
    }

    _setSelector(name, selector, deferred, checkForFree){
        if(typeof name === "string"){
            let target = this._find(selector);
            //если ничего не нашли и поиск не отложенный, то выводим предупреждение.
            if(target === undefined && deferred !== "deferred"){
                console.warn(`Селектор ${selector} не найдет. \n Если хотите задать отложенный поиск, передайте аргумент \"deferred\"`);
            } else {
                //проверяем не занято ли уже имя и добаляем геттер
                if(checkForFree){
                    this._isFreeName(name, () => {
                        //добавляем геттер
                        this._setGetValue(name, selector);
                    })
                } else {
                    this._setGetValue(name, selector);
                }

            }
        } else {
            console.warn("Неверно указано имя");
        }
    }

    set(...selectors){
        this._setSelector(selectors[0], selectors[1], selectors[2], true);
    }

    update(...selectors){
        this._setSelector(selectors[0], selectors[1], selectors[2], false);
    }

    local(){
        return new CSH();
    }

    group(name){
        if(typeof name === "string"){
            this._isFreeName(name, ()=>{
                this[name] = new CSH();
            });
        } else {
            console.warn(`Некоррекно заданное имя ${name}. На вход требуется строка, получен ${typeof name}`)
        }

    }
}

const SH = new CSH();
