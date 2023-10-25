function createElement(type, props, ...children) {
    return {
         type,
         props: {
              ...props,
             children: children.flatMap(child => {
                if (typeof child === 'string' || typeof child === 'number' || typeof child === 'object') {
                    return child;
                }
            }),
        },
        toString: function() {
            return `{"type": '${this.type}',\n "props": ${JSON.stringify(this.props, null, 2)}}`;
        },
    };
}

function elementToString(createdElement) {
    console.log(createdElement.toString());
}

let a = createElement("div");
let b = createElement("div", { id: "home" }, "a", a);
let c = createElement("div", null, 1, 6, [b]);

a1 = elementToString(a);
b1 = elementToString(b);
c1 = elementToString(c);


