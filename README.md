# West Or East

郵便番号から、西日本か東日本を判定 (それだけ)

> Zip code to West Japan or East Japan

`v1.0.2`のコードは下記の通り。236バイトなので、気軽に使えます。

```javascript
var a="431412 44 45 46 47 48 49 5 6 7 8 90 91 92 93",b="4980 4988503 51 52 53 54 55 56 57 58 59 6 7 8 90 91 92 93",data={a:a,b:b},index=(a,e="A")=>data[e.toLowerCase()].split(" ").find(e=>0===a.indexOf(e))?"w":"e";export default index;
```

## 導入

```sh
$ npm install west-or-east
```

## 基本的な使い方

```javascript
import westOrEast from 'west-or-east'

const area = westOrEast('1550033')
console.log(area) // You may get 'w' or 'e'
```

## API

```javascript
westOrEast(<zipCode>, [<pattern>])
```

- `zipCode`: 7桁の郵便番号 (ハイフンなし)
- `pattern`: `A` or `B` (省略した場合は`A`) 下記の「判定方法」を参照

## 判定方法

### パターンA

デフォルトでは「新潟県, 長野県, 静岡県」以東を「東日本」として判定します。

```javascript
const nagoya = '4500001'
westOrEast(nagoya) // ==> w
westOrEast(nagoya, 'A') // ==> w
```

> 北海道,
>
> 青森県, 秋田県, 岩手県, 山形県, 宮城県, 福島県,
>
> 群馬県, 栃木県, 茨城県, 埼玉県, 東京都, 神奈川県, 千葉県,
>
> 新潟県, 長野県, 山梨県, 静岡県

### パターンB

パターンとして「B」を指定すると、「愛知県, 岐阜県」以東を「東日本」として判定します。

```javascript
const nagoya = '4500001'
westOrEast(nagoya, 'B') // ==> e
```

> 北海道,
>
> 青森県, 秋田県, 岩手県, 山形県, 宮城県, 福島県,
>
> 群馬県, 栃木県, 茨城県, 埼玉県, 東京都, 神奈川県, 千葉県,
>
> 新潟県, 長野県, 山梨県, 静岡県, 愛知県, 岐阜県

## ライセンス

MIT
