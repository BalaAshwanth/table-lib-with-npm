export function testTemplate() {
  return `
    <div>
      <h1>{{template}}</h1>
      <strong>{{ test }}!!!!</strong>
    </div>
    <u>{{ name}} </u>
    <div>
      <a href="{{link}}">Link text</a>
    </div>
  `;
}
