# SH
selectors handler for vanilla Js code

SH (selectors handler) – плагин, который позволяет удобнее работать с селекторами в ванильном Js.
SH решает следующие проблемы:
1)	Разбросанные по всему файлу селекты 
2)	Случайные перезаписи 
3)	Отсутствие live update при получении nodeList querySelectorAll
4)	Неструктурированные селекты 
5)	Отсутствие предупреждений при получении undefined 

### Методы:
        
#### Добавление селектора 
	SH.set(name, selector, option)
        
– задаёт новый селектор в системе SH.   

name, selector, option – type string <br/>

Выведет предупреждение и откажет в действии, если параметр name не будет строкой.<br/>
Выведет предупреждение и откажет в действии при попытке перезаписи существующего селектора. Решается вызовом метода 

        SH.update(name, selector, option)
Выведет предупреждение и откажет в действии, если элемент по селектору не будет найдет. Решается передачей параметра option в значении “deferred” (отложенный).

---
#### Обновление селектора 
	SH.update(name, selector, option)
– обновляет уже существующий селектор в системе SH.

name, selector, option – type string 

Выведет предупреждение и откажет в действии, если параметр name не будет строкой.<br/>
Выведет предупреждение и откажет в действии, если элемент по селектору не будет найдет. Решается передачей параметра option в значении “deferred” (отложенный).

---
#### Создание группы
	SH.group(name) 
– создаёт группу в системе SH.

name – type string 

Выведет предупреждение и откажет в действии, если параметр name не будет строкой.
Пример: 

        SH.group(“buttons”)
        SH.buttons.set(…)
        SH.buttons.update(…)
        SH.buttons.group(“header”)
        SH.buttons.header.set(…);

---        
#### Создание локальной копии
	SH.local() 
– Возвращает экземпляр класса и позволяет работать с селекторами локально в текущем файле.

#### Пример:
	const selectors = SH.local();
	selectors.set(…);
---

### Получение селекторов. 

Чтобы получить селектор нужно обратиться к свойству объекта SH через точечную нотацию 
#### Пример: 

        SH.set(“box”, “.box”)
        SH.box.innerHTML = “my box”;
   
---
### Модульный файл

Файл SH.module.js является модульным, то есть экспортирует объект SH

Файл SH.js является обычным js файлом, внутри которого создаётся обект SH и в дальнейшем используется
