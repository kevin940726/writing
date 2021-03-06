---
title: 'Write your commit messages in the right way'
date: 2017-03-05 11:56:05
layout: Post
---

要怎麼寫 `commit messages` 一直是爭論不休的議題，每個 team 有自己偏好的方式，以及所謂的 _best practices_，像是知名的 [AngularJS commit convensions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)，在這裡我不想討論哪個標準才是最好的，因為實際上還是要根據自己的團隊去選擇適合的標準，只要內部統一了且每個人都能遵守那個規範的話，我覺得沒有必要為了達到完美而拖慢或限制了團隊的步伐。

說是這麼說⋯⋯但你會想看到這樣的 `commit log` 嗎？

```bash
[5f25bbe] hide loading-word too
[3c80512] finally
[9578933] trying important
[1f65c26] hide loading wrapper
```

沒錯，以前我的 `commit` 真的是這樣寫給自己看的，但其實實際上現在來看連我自己都看不懂，這樣的 `commit messages` 沒有任何意義就只是為了 `commit` 而 `commit` 而已，對於個人的小專案的話也許還不會有影響，但若是在團隊中的話可是會讓 Code Review 和 Changelog 有很大的困擾。

所以縱使我並不喜歡 over engineering 的 `commit` 設計，但裡面有許多實用的大重點是我認為應該要遵守的。

### Use English whenever possible

盡可能地寫英文。

「可是我的團隊都是台灣人呀？為什麼 `commit messages` 不能用自己的母語呢？」你可能會這麼想，但是當你們的專案 open source 以後，來自世界各地的人要怎麼讀懂你們的母語呢？現實上來說英文確實是在工程師之間最廣泛使用的語言，用英文來寫 `commit` 可以確保有最多的人可以看得懂，就算你們的專案是公司的產品並沒有打算要開源，但誰也不能保證往後的日子哪一天突然就決定要開源了，畢竟連 [Apollo 11](https://github.com/chrislgarry/Apollo-11) 都開源了。

### Use the imperative mood in the subject line

標題使用祈使語句。

簡單來說就是以現在式動詞為開頭的句子，在這裡不探討文法之類的問題，單純就結構來看祈使句看起來更直接更簡單，直接代表了這個 `commit` **如果套用後會做什麼**，而不是做了些什麼，用一句英文來表達的話會是像這樣。

> If applied, this commit will [_**commit subject**_]

將 `commit subject` 代換成你的 `commit` 標題後如果能形成一個正確的句子的話就是好的標題。

另外在標題的最後，也要避免使用句號來做結尾，這在標題的使用上顯得多餘，但若是 `commit` 的內文的話則寫一般的英文語法即可，不需要使用祈使句也不需要省略句號。

### Use a list of types to categorize the commit

將 `commit` 歸類於一個種類清單。

每個 `commit` 都會有一個主要的目標，而那個目標大致可以歸類在一個種類清單中，一個清單的例子可以是：

- `Feat`: A new feature
- `Fix`: A bug fix
- `Docs`: Documentation only changes
- `Style`: Changes that do not affect the meaning of the code
- `Refactor`: A code change that neither fixes a bug nor adds a feature
- `Perf`: A code change that improves performance
- `Test`: Adding missing tests or correcting existing tests

清單的選擇可以直接使用社群上現有的清單，也可以自己針對需求去做改變，如此一來整個團隊就有統一的 `commit` 歸類，在 log 上就可以很清楚看出每個 `commit` 的種類，在日後產生 changelog 時也很方便。

找出 `commit` 的 `type` 以後，將它放在 `commit` 標題的前面，像是：

> refactor: format and lint code

格式可以自己決定，冒號只是一般的表現方式，後面就接原本 subject 的祈使句。


## Commitizen

身為開發者，當然是所有東西都可以自動化的話越好，又或者在不同專案中要使用不同的 `commit` 規則，這時就會需要一些工具來幫忙了。[Commitizen](https://github.com/commitizen/cz-cli) 是其中一個相當受歡迎的工具，尤其和 Node.js 的專案相容性很高。

### Getting Started

首先安裝 `Commitizen`（或是使用 npm 安裝，以下皆使用 yarn 做示範）。
```bash
yarn global add commitizen
# npm install -g commitizen
```

之後安裝其中一個 `adapter`，可以把它當作一種預設的規範，你可以選擇直接使用現有的或是自己寫一個適合團隊的，在這裡我用我自己寫的 [`emoji-cz`](https://github.com/kevin940726/emoji-cz) `adapter` 來做示範，這是一個基於以上我推薦的大原則之下在 subject 前面加上 type 對應的 emoji 的 `adapter`。

```bash
yarn global add emoji-cz
```

接下來指定將 `emoji-cz` 作為 `Commitizen` 的 global `adapter`。
```bash
echo '{ "path": "emoji-cz" }' > ~/.czrc
```

完成後往後的 `commit` 都用 `git cz` 來取代原本的 `git commit` 指令。
```text
> git cz
? Select the type of change that you're committing: (Use arrow keys)
❯ ✨  Feat:      A new feature
  🐛  Fix:       A bug fix
  📚  Docs:      Documentation only changes
  🎨  Style:     Changes that do not affect the meaning of the code
  🔨  Refactor:  A code change that neither fixes a bug nor adds a feature
  🚀  Perf:      A code change that improves performance
  🚨  Test:      Adding missing tests or correcting existing tests
```

以 `emoji-cz` 為例就會讓你從預設的清單中選擇這次 `commit` 的 type，之後再輸入標題、內文和 issues 後就會自動產生對應的 `commit message`。

> 📚 Docs: update readme to show a simple demo

### Setup locally

如果有需求要在不同的 project 使用不同的 `adapter`，`Commitizen` 也有提供簡單地設定方式，只要在專案的 `package.json` 中加入以下：

```json
"config": {
  "commitizen": {
    "path": "emoji-cz"
  }
}
```

在該專案目錄底下的 `git cz` 也會套用對應的 `adapter` 了。

官方文件中提供了許多傑出的 [`adapter`](https://github.com/commitizen/cz-cli#adapters) 可供選擇，但你也可以選擇自己寫一個 `adapter` 來符合自己的需求，任意 fork 一個與自己的架構相似的 `adapter` 後拿來改寫吧，邏輯非常的簡單而且能夠自定義的地方也很自由，我鼓勵每個人都可以試試看。

### Adding alias

藉由一些 `alias` 的技巧可以將指令設定的更加符合個人需求，npm script 是最簡單的方式，例如將 `commit` 的指令加入 `package.json` 的 `scripts` 中：

```json
"scripts": {
  "commit": "git cz"
}
```

或是更簡單的使用 [`git alias`](https://git-scm.com/book/zh-tw/v1/Git-%E5%9F%BA%E7%A4%8E-%E6%8F%90%E7%A4%BA%E5%92%8C%E6%8A%80%E5%B7%A7#Git-命令別名) 的功能來做全域設定：
```bash
git config --global alias.c cz
git c # equals to 'git cz'
```

如果想要更進一步防止團隊中的人不小心 `commit` 了錯誤的格式，可以使用 git hook 像是 [`pre-commit`](https://github.com/observing/pre-commit) 來做更進一步的檢查。

## Summary

維護好的 `commit` 訊息人人有責！以上的原則雖然不是絕對，但遵守多一點點規則卻可以大幅的增加整體訊息的可讀性，希望大家看了以後也可以在自己的專案或是團隊中嘗試導入這些系統。當然如果喜歡我的 [`emoji-cz`](https://github.com/kevin940726/emoji-cz) 的風格也不要吝嗇地幫我跟 [Commitizen](https://github.com/commitizen/cz-cli) 點個 star 分享給更多人哦～

## Reference
- [How to Write a Git Commit Message - Chris Beams](https://chris.beams.io/posts/git-commit/)
- [AngularJS Git Commit Message Conventions - stephenparish](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [emoji-cz](https://github.com/kevin940726/emoji-cz)
