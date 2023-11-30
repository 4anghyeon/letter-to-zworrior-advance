class Warrior {
  constructor(id, name, enName, separatedName) {
    this.id = id;
    this.name = name;
    this.enName = enName;
    this.separatedName = separatedName;
  }
}

export const warriors = [
  new Warrior(9, '크리링', 'krillin', [
    ['ㅋ', '크'],
    ['ㄹ', '리'],
    ['ㄹ', '리', '링'],
  ]),
  new Warrior(7, '피콜로', 'piccolo', [
    ['ㅍ', '피'],
    ['ㅋ', '코', '콜'],
    ['ㄹ', '로'],
  ]),
  new Warrior(4, '트랭크스', 'trunks', [
    ['ㅌ', '트'],
    ['ㄹ', '래', '랭'],
    ['ㅋ', '크'],
    ['ㅅ', '스'],
  ]),
  new Warrior(3, '손오반', 'songohan', [
    ['ㅅ', '소', '손'],
    ['ㅇ', '오'],
    ['ㅂ', '바', '반'],
  ]),
  new Warrior(1, '손오공', 'songoku', [
    ['ㅅ', '소', '손'],
    ['ㅇ', '오'],
    ['ㄱ', '고', '공'],
  ]),
  new Warrior(2, '베지터', 'vegeta', [
    ['ㅂ', '베'],
    ['ㅈ', '지'],
    ['ㅌ', '터'],
  ]),
  new Warrior(5, '손오천', 'songoten', [
    ['ㅅ', '소', '손'],
    ['ㅇ', '오'],
    ['ㅊ', '처', '천'],
  ]),
  new Warrior(6, '인조인간 18호', 'android18', [
    ['ㅇ', '이', '인'],
    ['ㅈ', '조'],
    ['ㅇ', '이', '인'],
    ['ㄱ', '가', '간'],
    [' '],
    ['1'],
    ['8'],
    ['ㅎ', '호'],
  ]),
  new Warrior(8, '천진반', 'tenshinhan', [
    ['ㅊ', '처', '천'],
    ['ㅈ', '지', '진'],
    ['ㅂ', '바', '반'],
  ]),
];
