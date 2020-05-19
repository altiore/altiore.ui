# Altiore UI [Storybook](https://altiore.github.io/altiore.ui)

## Трекер задач и времени

![Auto-тесты](https://github.com//altiore/altiore.ui/workflows/CI/badge.svg) ![Staging Deployment](https://github.com//altiore/altiore.ui/workflows/Staging%20Deployment/badge.svg) ![Production Deployment](https://github.com//altiore/altiore.ui/workflows/Production%20Deployment/badge.svg)

### Установка

##### 1. Скопируй файл .env.example -> .env

```bash
$ cp .env.example .env
```

##### 2. Для локальной работы необходимо установить [пакетный менеджер npm](https://www.npmjs.com/get-npm) и [node.js server](https://nodejs.org/en/) (обычно устанавливаются вместе)

##### 3. Установите локальные зависимости при помощи пакетного менеджера npm

```bash
$ npm install
```

##### 4. Запустите проект локально при помощи пакетного менеджера npm

```bash
$ npm start
```
##### 5. Приложение должно автоматически открыться в браузере и автоматически обновляться при любом изменении кода

### Именование файлов и папок

#### Общие положения

1. Все папки и файлы в них, структурированы по принципу "все нужное внутри". Это означает, что необходимый компонент/вспомогательная функция/файл хранилища расположен именно там, где он используется. Например, если компонент `HiHeader` используется ТОЛЬКО в файле `./src/#/#hi/Hi.tsx`, то он ДОЛЖЕН находится в папке `./src/#/#hi/HiHeader`, т.е. папка компонента должна находиться рядом с файлом, где этот компонент используется.
2. _@_ модификатор папки. Если компонент, вспомогательнай функция или любой другой полезный файл используется в нескольких местах, то он должен быть вынесен в одну из папок, помеченных модификатором _@_. Или наоборот: если папка помечена модификатором _@_, значит ее содержимое используется минимум в 2 местах
3. _#_ модификатор папки. Если компонент представляет собой страницу проекта (роут), то папка с таким компонентом содержит модификатор _#_. (Например, файлы компонентов для роута `/p/f2c6742e-2394-4982-8979-5f01c5ab2a50` находятся в папке `./src/#/#p/#-projectId`). Иногда группа страниц может содержать общую часть вида (лейаут), - файл общего вида для группы страниц (роутов) содержится в этом случае в промежуточной папке c модификатором _#_, соответсвующей общей части роута. Например, для залогиненного пользователя для страниц `/` и `/projects/53/tasks` есть общий вид. Этот общий вид содержится в файле `./src/#/Main.tsx`, а сами страницы (роуты) соотвественно в папках `./src/#/#` и `./src/#/#projects/#-projectId`. В свою очередь у страниц `/projects/53/tasks` и `/projects/53/members` есть общая часть вида, содержащаяся в файле `./src/#/#projects/Projects.tsx`. Такимо образом модификаторы папок позволяют легко понимать, какого рода файлы где находятся и одновременно оставляют структуру достаточно плоской и понятной.

#### Структура папок

1. _#_ - содержит все страницы сайта (роуты), подписанные на изменения глобальных данных проекта

   1.1. _#/@store_ - содержит сущности данных, используемые в проекте глобально (в любом из файлов внутри _#_ папки)

   1.2. _#/@common_ - содержит компоненты подписанные на изменения глобальных данных проекта, которые используются на 2х и более разных страницах (роутах) в любом из файлов внутри _#_ папки

2. _@components_ - содержит переиспльзуемые компоненты, которые ничего не знают о данных проекта
3. _@hooks_ - содержит переиспользуемые хуки и компоненты высшего порядка, которые ничего не знают о данных проекта
4. _@styles_ - содержит общие стили. [смотри стилизацию темы для material-ui библиотеки](https://material-ui.com/customization/theming/)
5. _@types_ - общие типы данных в проекте
6. _@utils_ - полезные утилиты, используемые в проекте

#### [Участие в разработке](https://github.com/altiore/altiore.ui/blob/master/CONTRIBUTING.md)
